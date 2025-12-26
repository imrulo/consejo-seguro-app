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

const NIP = require('./nip_engine.cjs');
const Flow = require('./flow_engine.cjs');
const DPE = require('./daily_problem_engine.cjs');
const fs = require('fs');
const path = require('path');

class AppController {
    constructor(dependencies = {}) {
        this.nip = new NIPEngine();
        this.flowEngine = new FlowEngine();
        this.dpe = dependencies.dpe || new DailyProblemEngine();

        // Preload known flows or lazy load. 
        // For this implementation, we map IDs to locations.
        this.FLOW_REGISTRY = {
            'renewal_residency': '../data/flows/renewal_residency_flow.json',
            'transport_belgrade': '../data/flows/transport_belgrade_flow.json'
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
        return this._synthesize(nipResult, flowResult, context);
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

    _synthesize(nip, flow, context) {
        // Default base: NIP
        const output = {
            system_state: 'ok',
            urgency: nip.urgency_level,
            zone: nip.urgency_zone,
            flow_id: nip.selected_flow_id,
            blocked_reason: null,
            steps: [],
            next_action: null,
            presentation_mode: nip.presentation_mode,
            daily_problems: null // Default null (STABLE)
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

            // PRIORITY FIX: Explicitly mark that a flow is active to suppress legacy checklists
            output.has_active_flow = true;
            output.suppress_legacy_checklists = true;
        }
        // Fallback if no flow but High Urgency (e.g. Health)
        else {
            if (output.zone === 'crisis' || output.zone === 'rojo') {
                output.presentation_mode = 'forced_alert';
                // Generic action from NIP context if available, or static fallback
                if (output.urgency === 10) output.next_action = "BUSCAR AYUDA INMEDIATA";
            }
            output.has_active_flow = false; // Corrected: If no flow, then no active flow.
            output.suppress_legacy_checklists = false; // If no flow, don't suppress.
        }

        // Final consistency check
        if (output.urgency >= 8 && output.presentation_mode === 'normal') {
            output.presentation_mode = 'alert';
        }

        // ---------------------------------------------------------
        // 5. DAILY PROBLEM ENGINE (DPE) INTEGRATION
        // ---------------------------------------------------------
        // Only run if not blocked
        if (output.system_state !== 'blocked') {
            const dpeResult = this.dpe.assess(context);
            console.log("DEBUG: DPE Result:", JSON.stringify(dpeResult, null, 2));

            if (dpeResult.status === 'BUSY' && dpeResult.problems.length > 0) {
                let allowedProblems = dpeResult.problems;

                // RULE 1: FLOW SUPPRESSION
                // If active flow AND (CRISIS or ALERT/FORCED_ALERT) -> Max 1 CRITICAL Only
                const isHighStressFlow = output.has_active_flow &&
                    (output.zone === 'CRISIS' || output.presentation_mode === 'forced_alert');

                if (isHighStressFlow) {
                    // Filter: Only Critical
                    const criticals = allowedProblems.filter(p => p.priority === 'critical');
                    // Cap: Max 1
                    allowedProblems = criticals.slice(0, 1);
                }

                // RULE 2: DETERMINISTIC ORDER (Already done by DPE, but enforcing safeguards)
                // Filter out if empty after suppression
                if (allowedProblems.length > 0) {
                    output.daily_problems = allowedProblems;
                }
            }
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
            presentation_mode: 'normal',
            daily_problems: null
        };
        return { ...defaults, ...overrides };
    }
}

module.exports = AppController;

