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
        this.DATA_DIR = path.join(__dirname, '../data/live');
    }

    load(domain) {
        if (this.cache[domain]) return this.cache[domain];

        const filePath = path.join(this.DATA_DIR, `${domain}.json`);
        try {
            if (fs.existsSync(filePath)) {
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
            const data = this.load(domain);
            if (!data || !data.data) return match; // Keep placeholder if data not found

            // Traverse path
            const keys = pathStr.split('.');
            let current = data.data;
            for (const key of keys) {
                if (current && typeof current === 'object' && key in current) {
                    current = current[key];
                } else {
                    return match; // Path failed
                }
            }

            return current;
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

