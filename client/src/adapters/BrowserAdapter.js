/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * The Core Logic (AppController, Engines) uses Node.js 'fs' to load JSONs.
 * In the browser, we must override these loading mechanisms to use imported JSONs.
 */

// Core Imports via Namespace (To avoid 'default not exported' errors)
import * as AppControllerModule from '@core/app_controller';
import * as LiveDataResolverModule from '@core/live_data_resolver';
import * as DailyProblemEngineModule from '@core/daily_problem_engine';
import frictionDB from '@data/atlas/friction_db.json';

// Helper to unwrap default exports (Vite/Rollup CJS Interop)
const unwrap = (mod) => (mod && mod.__esModule) ? mod.default : (mod.default || mod);

// Robust extraction helper
const extractClass = (mod, className) => {
    const unwrapped = unwrap(mod);
    if (unwrapped && unwrapped.prototype) return unwrapped;
    if (mod && mod[className] && mod[className].prototype) return mod[className];
    return unwrapped; // Return whatever we found for debug
};

const AppController = extractClass(AppControllerModule, 'AppController');

if (!AppController || !AppController.prototype) {
    const keys = Object.keys(AppControllerModule || []).join(', ');
    // Safe stringify
    let valueStr = "unknown";
    try { valueStr = JSON.stringify(AppController); } catch (e) { valueStr = typeof AppController; }

    throw new Error(`[Debug] AppController failed to load. Keys: [${keys}]. Value: ${valueStr}`);
}

const LiveDataResolver = extractClass(LiveDataResolverModule, 'LiveDataResolver');
const DailyProblemEngine = extractClass(DailyProblemEngineModule, 'DailyProblemEngine');

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
