// Viewer Logic - Orchestrated Version
// Uses AppController as the single point of truth.

const app = new AppController();

function setInput(text, days, blocked, checks = {}) {
    document.getElementById('userText').value = text;
    document.getElementById('daysRemaining').value = days;
    document.getElementById('adminBlock').checked = blocked;

    // Reset/Set checks simulation checkboxes if they existed, but for now we default standard check set
    // In a real UI, checks come from state. Here we mock them for happy/sad paths.
    // For diagnositic simplicity: checks are currently static passed or defaulted.
    window.currentChecksMock = checks; // Store for run()
    run();
}

// Mock Checks scenarios
const CHECKS_HAPPY = { passport_valid_6_months: true, residence_reason_still_valid: true, complete_document_set: true };
const CHECKS_FAIL_PASSPORT = { passport_valid_6_months: false, residence_reason_still_valid: true, complete_document_set: true };

function run() {
    const text = document.getElementById('userText').value;
    const days = parseInt(document.getElementById('daysRemaining').value) || 0;
    const blocked = document.getElementById('adminBlock').checked;

    // Construct Context & Guardian State
    const guardianActiveStates = [];
    if (days < 90) guardianActiveStates.push('legal_clock');
    if (blocked) guardianActiveStates.push('admin_block');

    const input = {
        user_input: text,
        guardian_state: { active_states: guardianActiveStates },
        context: {
            country: "RS",
            days_remaining_legal: days,
            checks: window.currentChecksMock || CHECKS_HAPPY
        }
    };

    // Execute Controller
    console.log("Running AppController with input:", input);
    const output = app.process(input);

    // Render Output JSON
    document.getElementById('output').textContent = JSON.stringify(output, null, 2);

    // Update Dashboard (Mapped from AppController Output Schema)
    const dash = document.getElementById('dashboard');
    dash.style.display = 'grid';

    // Update fields matching AppController output
    // Mapping:
    // System State -> Intent Box (reusing slot) or new slot
    document.getElementById('dash-intent').textContent = output.system_state.toUpperCase(); // Reusing the top left box
    document.getElementById('dash-intent-box').querySelector('.dash-label').textContent = "System State";

    document.getElementById('dash-urgency').textContent = output.urgency;
    document.getElementById('dash-zone').textContent = output.zone;
    document.getElementById('dash-flow').textContent = output.flow_id || '-';
    document.getElementById('dash-mode').textContent = output.presentation_mode;

    // Visual styles for dashboard
    const zoneBox = document.getElementById('dash-zone-box');
    zoneBox.className = 'dash-item zone-' + (output.zone ? output.zone.toLowerCase() : 'verde');

    // Visual style for System State (Blocked = Grey/Red)
    const stateBox = document.getElementById('dash-intent-box');
    if (output.system_state === 'blocked') stateBox.style.backgroundColor = '#ffcccc';
    else if (output.system_state === 'error') stateBox.style.backgroundColor = '#ffffcc';
    else stateBox.style.backgroundColor = '#ccffcc';
}

// Initialize default checks
window.currentChecksMock = CHECKS_HAPPY;
