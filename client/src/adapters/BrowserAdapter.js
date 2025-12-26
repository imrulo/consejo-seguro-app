/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * SOLUCIÓN FINAL: Instancia directa con verificación explícita
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
if (LiveDataResolver && LiveDataResolver.prototype) {
    LiveDataResolver.prototype.load = function (domain) {
        if (this.cache && this.cache[domain]) return this.cache[domain];
        
        console.log(`[BrowserAdapter] Loading Live Data: ${domain}`);
        let data = null;
        if (domain === 'belgrade_transport') {
            data = belgradeTransportData;
            if (this.cache) this.cache[domain] = data;
        }
        return data;
    }
}

// Override AppController._loadFlow BEFORE instantiation
if (AppControllerBase && AppControllerBase.prototype) {
    AppControllerBase.prototype._loadFlow = function (flowId) {
        console.log(`[BrowserAdapter] Loading Flow: ${flowId}`);
        switch (flowId) {
            case 'renewal_residency': return renewalFlow;
            case 'transport_belgrade': return transportFlow;
            default: return null;
        }
    }
}

// Verificar que DailyProblemEngine sea una función antes de instanciar
if (typeof DailyProblemEngine !== 'function') {
    throw new Error('DailyProblemEngine is not a constructor');
}

// Verificar que AppControllerBase sea una función antes de instanciar
if (typeof AppControllerBase !== 'function') {
    throw new Error('AppControllerBase is not a constructor');
}

// Crear instancia directamente con verificaciones
const browserDPE = new DailyProblemEngine(frictionDB);
const appControllerInstance = new AppControllerBase({ dpe: browserDPE });

// Verificar que la instancia tenga el método process
if (!appControllerInstance || typeof appControllerInstance.process !== 'function') {
    throw new Error('AppController instance is invalid or missing process method');
}

// Exportar de múltiples formas para máxima compatibilidad
export { appControllerInstance };
export default appControllerInstance;
