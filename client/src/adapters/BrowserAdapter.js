/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * SOLUCIÓN RADICAL: Factory function en lugar de class extension
 * para evitar problemas de minificación en producción.
 */

// Core Imports (ESM - Direct)
import AppController from '../core_esm/AppController.js';
import LiveDataResolver from '../core_esm/LiveDataResolver.js';
import DailyProblemEngine from '../core_esm/DailyProblemEngine.js';
import frictionDB from '@data/atlas/friction_db.json';

// Import Data (Vite will bundle these as JSON)
import renewalFlow from '@data/flows/renewal_residency_flow.json'
import transportFlow from '@data/flows/transport_belgrade_flow.json'
import belgradeTransportData from '@data/live/belgrade_transport.json'

// Override LiveDataResolver.load BEFORE FlowEngine uses it
LiveDataResolver.prototype.load = function (domain) {
    if (this.cache[domain]) return this.cache[domain];
    
    console.log(`[BrowserAdapter] Loading Live Data: ${domain}`);
    let data = null;
    if (domain === 'belgrade_transport') {
        data = belgradeTransportData;
        this.cache[domain] = data;
    }
    return data;
}

// Override AppController._loadFlow BEFORE instantiation
AppController.prototype._loadFlow = function (flowId) {
    console.log(`[BrowserAdapter] Loading Flow: ${flowId}`);
    switch (flowId) {
        case 'renewal_residency': return renewalFlow;
        case 'transport_belgrade': return transportFlow;
        default: return null;
    }
}

// Factory function - más confiable que class extension
function createBrowserAppController() {
    const browserDPE = new DailyProblemEngine(frictionDB);
    const instance = new AppController({ dpe: browserDPE });
    return instance;
}

// Export explícito - asegurar que funcione con minificación
const createAppController = createBrowserAppController;
export { createAppController };
export default createAppController;
