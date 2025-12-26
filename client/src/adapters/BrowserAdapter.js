/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * The Core Logic (AppController, Engines) uses Node.js 'fs' to load JSONs.
 * In the browser, we must override these loading mechanisms to use imported JSONs.
 */

// Core Imports (ESM - Direct)
import AppController from '../core_esm/AppController.js';
import LiveDataResolver from '../core_esm/LiveDataResolver.js';
import DailyProblemEngine from '../core_esm/DailyProblemEngine.js';
import frictionDB from '@data/atlas/friction_db.json';

// (Removed unwrap/extractClass logic as we now use pure ESM)

// Import Data (Vite will bundle these as JSON)
import renewalFlow from '@data/flows/renewal_residency_flow.json'
import transportFlow from '@data/flows/transport_belgrade_flow.json'
import belgradeTransportData from '@data/live/belgrade_transport.json'

// 1. Override AppController._loadFlow
AppController.prototype._loadFlow = function (flowId) {
    console.log(`[BrowserAdapter] Loading Flow: ${flowId}`);
    switch (flowId) {
        case 'renewal_residency': return renewalFlow;
        case 'transport_belgrade': return transportFlow;
        default: return null;
    }
}

// 2. Override LiveDataResolver.load
LiveDataResolver.prototype.load = function (domain) {
    // Check cache first (consistent with original implementation)
    if (this.cache[domain]) return this.cache[domain];
    
    console.log(`[BrowserAdapter] Loading Live Data: ${domain}`);
    // Extract domain name if it matches our files
    let data = null;
    if (domain === 'belgrade_transport') {
        data = belgradeTransportData;
        // Cache it for future use
        this.cache[domain] = data;
    }
    return data;
}

// 3. Browser-Specific AppController Factory
// We need to inject the DPE with the Vite-imported JSON
class BrowserAppController extends AppController {
    constructor() {
        // Inject DPE with browser-loaded DB
        const browserDPE = new DailyProblemEngine(frictionDB);
        super({ dpe: browserDPE });
    }
}

export { BrowserAppController as AppController };
