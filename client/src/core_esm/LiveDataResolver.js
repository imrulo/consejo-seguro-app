/**
 * Live Data Resolver
 * 
 * Responsibilities:
 * 1. Load JSON data from data/live/
 * 2. Resolve placeholders like {{live.transport.ticket_90min_zone_a.value}}
 * 3. Fail gracefully (return placeholder key) if data missing.
 */

import fs from 'fs';
import path from 'path';

export default class LiveDataResolver {
    constructor() {
        this.cache = {};
        // Browser-safe: Only set DATA_DIR if __dirname is available (Node.js environment)
        // In browser, this will be overridden by BrowserAdapter anyway
        try {
            if (typeof __dirname !== 'undefined' && __dirname) {
                this.DATA_DIR = path.join(__dirname, '../data/live');
            } else {
                this.DATA_DIR = null; // Browser environment
            }
        } catch (e) {
            this.DATA_DIR = null; // Browser environment
        }
    }

    load(domain) {
        if (this.cache[domain]) return this.cache[domain];

        // Browser-safe: If DATA_DIR is not set (browser env), return null early
        // Note: BrowserAdapter will override this entire method, so this code path
        // only runs in Node.js environment or if override hasn't happened yet
        if (!this.DATA_DIR) {
            return null;
        }

        // Node.js path: Use fs to load files
        const filePath = path.join(this.DATA_DIR, `${domain}.json`);
        try {
            if (fs.existsSync && fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(raw);
                this.cache[domain] = json;
                return json;
            }
        } catch (e) {
            console.warn(`LiveDataResolver: Failed to load domain '${domain}'`, e.message);
        }
        return null;
    }

    /**
     * Replaces {{live.domain.key.subkey}} in a string.
     */
    resolveString(text) {
        if (!text || typeof text !== 'string') return text;

        return text.replace(/\{\{live\.(\w+)\.([^\}]+)\}\}/g, (match, domain, pathStr) => {
            try {
                const data = this.load(domain);
                if (!data || !data.data) {
                    console.warn(`[LiveDataResolver] Data not found for domain: ${domain}`);
                    return match; // Keep placeholder if data not found
                }

                // Traverse path
                const keys = pathStr.split('.');
                let current = data.data;
                for (const key of keys) {
                    if (current && typeof current === 'object' && key in current) {
                        current = current[key];
                    } else {
                        console.warn(`[LiveDataResolver] Path failed: ${domain}.${pathStr} at key: ${key}`);
                        return match; // Path failed
                    }
                }

                // Verify we got a string/number, not an object
                if (typeof current === 'string' || typeof current === 'number') {
                    return String(current);
                } else {
                    console.warn(`[LiveDataResolver] Resolved value is not a primitive: ${domain}.${pathStr}`);
                    return match;
                }
            } catch (error) {
                console.error(`[LiveDataResolver] Error resolving ${match}:`, error);
                return match; // Fail safe: return placeholder
            }
        });
    }

    /**
     * Revolves all strings within an object/array recursively.
     */
    resolveObject(obj) {
        if (typeof obj === 'string') return this.resolveString(obj);
        if (typeof obj !== 'object' || obj === null) return obj;

        if (Array.isArray(obj)) {
            return obj.map(item => this.resolveObject(item));
        }

        const resolved = {};
        for (const [key, value] of Object.entries(obj)) {
            resolved[key] = this.resolveObject(value);
        }
        return resolved;
    }
}

// Export for usage

