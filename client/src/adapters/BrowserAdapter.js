/**
 * Browser Adapter for ConsejoSeguro Core Logic
 * 
 * PRODUCTION FIX: Simplified instantiation without runtime checks
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

// Create custom LiveDataResolver class that handles browser data loading
class BrowserLiveDataResolver extends LiveDataResolver {
    load(domain) {
        // Check cache first
        if (this.cache && this.cache[domain]) {
            return this.cache[domain];
        }
        
        console.log(`[BrowserAdapter] Loading Live Data: ${domain}`);
        let data = null;
        
        // Map domain names to imported data
        if (domain === 'belgrade_transport') {
            data = belgradeTransportData;
            // Verify data structure
            if (data && data.data) {
                if (this.cache) {
                    this.cache[domain] = data;
                }
                return data;
            } else {
                console.error(`[BrowserAdapter] Invalid data structure for ${domain}`);
                return null;
            }
        }
        
        console.warn(`[BrowserAdapter] Unknown domain: ${domain}`);
        return null;
    }
}

// Create custom AppController class that handles browser flow loading
class BrowserAppController extends AppControllerBase {
    _loadFlow(flowId) {
        console.log(`[BrowserAdapter] Loading Flow: ${flowId}`);
        switch (flowId) {
            case 'renewal_residency': return renewalFlow;
            case 'transport_belgrade': return transportFlow;
            default: return null;
        }
    }
}

// Create instances - no runtime type checking to avoid minification issues
const browserLiveDataResolver = new BrowserLiveDataResolver();
const browserDPE = new DailyProblemEngine(frictionDB);
const appControllerInstance = new BrowserAppController({ 
    dpe: browserDPE,
    liveDataResolver: browserLiveDataResolver 
});

// Simple export pattern for minification compatibility
export default appControllerInstance;
