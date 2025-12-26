/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * The Core Logic (AppController, Engines) uses Node.js 'fs' to load JSONs.
 * In the browser, we must override these loading mechanisms to use imported JSONs.
 */

// Core Imports (ESM - Direct)
import AppControllerBase from '../core_esm/AppController.js';
import LiveDataResolver from '../core_esm/LiveDataResolver.js';
import DailyProblemEngine from '../core_esm/DailyProblemEngine.js';
import frictionDB from '@data/atlas/friction_db.json';

// Import Data (Vite will bundle these as JSON)
import renewalFlow from '@data/flows/renewal_residency_flow.json'
import transportFlow from '@data/flows/transport_belgrade_flow.json'
import belgradeTransportData from '@data/live/belgrade_transport.json'

// Override LiveDataResolver.load BEFORE FlowEngine uses it
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

// Browser-Specific AppController
// Override methods directly in subclass instead of modifying parent prototype
class BrowserAppController extends AppControllerBase {
    constructor() {
        // Inject DPE with browser-loaded DB
        const browserDPE = new DailyProblemEngine(frictionDB);
        super({ dpe: browserDPE });
    }

    // Override _loadFlow method directly
    _loadFlow(flowId) {
        console.log(`[BrowserAdapter] Loading Flow: ${flowId}`);
        switch (flowId) {
            case 'renewal_residency': return renewalFlow;
            case 'transport_belgrade': return transportFlow;
            default: return null;
        }
    }
}

// Export as default
export default BrowserAppController;
