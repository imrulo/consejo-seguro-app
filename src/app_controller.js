/**
 * Application Orchestrator (Controller)
 * Version: 1.0.0
 * 
 * Orchestrates:
 * 1. Guardian (Security/State Interlock) - Read Only
 * 2. NIP Engine (Intent/Urgency) - Deterministic
 * 3. Flow Engine (Procedural Logic) - Declarative execution
 * 
 * Primary Responsibility: Single Source of Truth for System State.
 */

const NIPEngine = require('./nip_engine');
const FlowEngine = require('./flow_engine');
const fs = require('fs');
const path = require('path');

class AppController {
    constructor() {
        this.nip = new NIPEngine();
        this.flowEngine = new FlowEngine();

        // Preload known flows or lazy load. 
        // For this implementation, we map IDs to locations.
        this.FLOW_REGISTRY = {
            'renewal_residency': '../data/flows/renewal_residency_flow.json',
            // Add others as they are implemented
        };
    }

    /**
     * Main Entry Point
     * @param {Object} input - Unified input { user_input, guardian_state, context }
     */
    process(input) {
        const { user_input, guardian_state, context } = input;

        // ---------------------------------------------------------
        // 1. GUARDIAN CHECK (Top Priority)
        // ---------------------------------------------------------
        // Hard rule: Admin Block stops everything.
        const activeStates = guardian_state?.active_states || [];
        if (activeStates.includes('admin_block')) {
            return this._buildOutput({
                system_state: 'blocked',
                blocked_reason: 'GUARDIAN_ADMIN_BLOCK',
                presentation_mode: 'blocked'
            });
        }

        // ---------------------------------------------------------
        // 2. NIP EXECUTION (Intent & Initial Urgency)
        // ---------------------------------------------------------
        // Construct NIP input format strict to contract
        const nipInput = {
            user_text: user_input,
            guardian_active_states: activeStates,
            context: context
        };

        const nipResult = this.nip.run(nipInput);

        // ---------------------------------------------------------
        // 3. FLOW EXECUTION (If applicable)
        // ---------------------------------------------------------
        let flowResult = null;
        let flowJSON = null;

        if (nipResult.selected_flow_id) {
            flowJSON = this._loadFlow(nipResult.selected_flow_id);
            if (flowJSON) {
                // Prepare context for Flow Engine
                // Flow Engine needs 'days_remaining' and 'checks'
                // We rely on what's passed in 'context' plus calculated stuff
                const flowContext = {
                    days_remaining: context.days_remaining_legal, // Mapping global context to flow context
                    checks: context.checks || {}
                };

                try {
                    flowResult = this.flowEngine.execute(flowJSON, flowContext);
                } catch (e) {
                    console.error("Flow Execution Error:", e);
                    // Fallback to NIP result only if flow crashes, but mark error
                    return this._buildOutput({
                        system_state: 'error',
                        blocked_reason: 'FLOW_EXECUTION_FAILURE',
                        priority_output: nipResult
                    });
                }
            }
        }

        // ---------------------------------------------------------
        // 4. SYNTHESIS & PRIORITIZATION
        // ---------------------------------------------------------
        return this._synthesize(nipResult, flowResult);
    }

    _loadFlow(flowId) {
        const relativePath = this.FLOW_REGISTRY[flowId];
        if (!relativePath) return null;

        try {
            const fullPath = path.join(__dirname, relativePath);
            const raw = fs.readFileSync(fullPath, 'utf8');
            return JSON.parse(raw);
        } catch (e) {
            console.error(`Failed to load flow ${flowId}:`, e);
            return null;
        }
    }

    _synthesize(nip, flow) {
        // Default base: NIP
        const output = {
            system_state: 'ok',
            urgency: nip.urgency_level,
            zone: nip.urgency_zone,
            flow_id: nip.selected_flow_id,
            blocked_reason: null,
            steps: [],
            next_action: null,
            presentation_mode: nip.presentation_mode
        };

        // If Flow exists, it refines logic
        if (flow) {
            // Priority 1: Flow Blocking
            if (flow.blocked) {
                output.system_state = 'blocked';
                output.blocked_reason = flow.blocking_reason;
                output.presentation_mode = 'blocked'; // Flow block forces UI block mainly
            }

            // Priority 2: Flow Urgency Update (Flow Engine logic is more specific than NIP)
            // If flow determined a zone, we trust Flow Engine (it has specific days logic)
            if (flow.current_zone) {
                // Map Flow Zone ID to generic Zone Label if needed, or use label directly
                output.zone = flow.current_zone.label;
                // We might need to map Generic Zone to Urgency Int if we want to sync them perfectly
                // For now, if Flow says CRISIS/ROJO, we respect that override for presentation
                if (flow.current_zone.guardian_override) {
                    output.presentation_mode = 'forced_alert';
                }
            }

            // Steps & Actions
            output.steps = flow.available_steps;
            output.next_action = flow.next_recommended_action;
        }
        // Fallback if no flow but High Urgency (e.g. Health)
        else {
            if (output.zone === 'crisis' || output.zone === 'rojo') {
                output.presentation_mode = 'forced_alert';
                // Generic action from NIP context if available, or static fallback
                if (output.urgency === 10) output.next_action = "BUSCAR AYUDA INMEDIATA";
            }
        }

        // Final consistency check
        if (output.urgency >= 8 && output.presentation_mode === 'normal') {
            output.presentation_mode = 'alert';
        }

        return output;
    }

    _buildOutput(overrides) {
        const defaults = {
            system_state: 'ok',
            urgency: 0,
            zone: 'verde',
            flow_id: null,
            blocked_reason: null,
            steps: [],
            next_action: null,
            presentation_mode: 'normal'
        };
        return { ...defaults, ...overrides };
    }
}

module.exports = AppController;
