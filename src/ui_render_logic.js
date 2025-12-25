/**
 * UI Render Logic (Pure Functions)
 * 
 * Implements the UI Rendering Contract.
 * Maps AppController Output -> UI Render Instructions.
 * 
 * usage:
 * const uiState = deriveUIState(appControllerOutput);
 * if (uiState.showBlock) renderBlock(uiState.blockReason);
 */

const UI_MODES = {
    BLOCKED: 'BLOCKED',
    CRISIS: 'CRISIS',
    OK: 'OK'
};

function deriveUIState(appOutput) {
    if (!appOutput) throw new Error("UI Render Logic: Missing AppOutput");

    // 1. Determine Root Mode
    let mode = UI_MODES.OK;

    if (appOutput.system_state === 'blocked') {
        mode = UI_MODES.BLOCKED;
    } else if (appOutput.zone === 'CRISIS' || appOutput.presentation_mode === 'forced_alert') {
        mode = UI_MODES.CRISIS;
    }

    // 2. Compute Component Visibility Flags based on Rules

    // Rule B: Block Imperative
    // If BLOCKED, hide content.
    const isBlocked = (mode === UI_MODES.BLOCKED);

    // Rule C: Crisis Precedence
    // If CRISIS, show alert.
    const isCrisis = (mode === UI_MODES.CRISIS);

    // Rule A: Exclusion Principle
    // If active flow, suppress idle/generic content.
    const hasActiveFlow = !!appOutput.has_active_flow;
    const suppressGeneric = !!appOutput.suppress_legacy_checklists;

    // If Blocked, Flow is hidden/replaced by Block Screen effectively?
    // Contract says: "HIDE: All inputs, flows...". 
    // So showFlow is false if blocked.
    const showFlow = hasActiveFlow && !isBlocked;

    // Show Idle only if NOT blocked AND NOT having active flow.
    const showIdle = !isBlocked && !hasActiveFlow;

    return {
        mode: mode,
        components: {
            blockScreen: {
                visible: isBlocked,
                reason: appOutput.blocked_reason,
                safeAction: "Contactar Soporte / Revisar Guardian" // Default or from outputs
            },
            crisisAlert: {
                visible: isCrisis,
                urgency: appOutput.urgency,
                action: appOutput.next_action
            },
            flowRenderer: {
                visible: showFlow,
                data: {
                    steps: appOutput.steps,
                    flowId: appOutput.flow_id,
                    zone: appOutput.zone
                }
            },
            idleState: {
                visible: showIdle
            }
        }
    };
}

module.exports = {
    UI_MODES,
    deriveUIState
};
