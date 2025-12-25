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

// 3. Shim 'fs' and 'path' requirements if they are top-level calls in other files (rare but possible).
// Fortunately, our core classes only require them. Since we override the methods that USE them,
// we might get away with it if the bundler doesn't choke on the require('fs') statement itself.
// Vite handling of CJS 'require' calls to node builtins might need a plugin or simple ignore if execution flow is patched.
// If Vite fails on "Module 'fs' has been externalized...", we need a vite plugin-node-polyfills.
// For now, let's try direct patching.

export { AppController };
