/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * The Core Logic (AppController, Engines) uses Node.js 'fs' to load JSONs.
 * In the browser, we must override these loading mechanisms to use imported JSONs.
 */

// Import logic files directly as we have CJS plugin
// But typically for CJS 'module.exports = Class', we might need to be careful.
// Let's rely on the plugin transforming or use specific syntax.
// Actually, if we use the plugin, it should allow require or import default.
// Let's try requiring them since this is an adapter file.
const AppController = require('@core/app_controller');
const LiveDataResolver = require('@core/live_data_resolver');

// Import Data (Vite will bundle these as JSON)
const DailyProblemEngine = require('@core/daily_problem_engine');
import frictionDB from '@data/atlas/friction_db.json';

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
    console.log(`[BrowserAdapter] Loading Live Data: ${domain}`);
    // Extract domain name if it matches our files
    if (domain === 'belgrade_transport') return belgradeTransportData;
    return null;
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
