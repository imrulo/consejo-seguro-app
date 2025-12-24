// Viewer Logic
const engine = new NIPEngine();

function setInput(text, days, blocked) {
    document.getElementById('userText').value = text;
    document.getElementById('daysRemaining').value = days;
    document.getElementById('adminBlock').checked = blocked;
    run(); // Auto-run for convenience
}

function run() {
    const text = document.getElementById('userText').value;
    const days = parseInt(document.getElementById('daysRemaining').value) || 0;
    const blocked = document.getElementById('adminBlock').checked;

    // Construct Context & Guardian State
    const guardianActiveStates = [];
    if (days < 90) guardianActiveStates.push('legal_clock'); // Simple simulacion
    if (blocked) guardianActiveStates.push('admin_block');

    const input = {
        user_text: text,
        guardian_active_states: guardianActiveStates,
        context: {
            country: "RS",
            days_remaining_legal: days
        }
    };

    // Execute Engine
    console.log("Running NIP with input:", input);
    const output = engine.run(input);

    // Render Output
    document.getElementById('output').textContent = JSON.stringify(output, null, 2);

    // Update Dashboard
    const dash = document.getElementById('dashboard');
    dash.style.display = 'grid';

    document.getElementById('dash-intent').textContent = output.intent_id;
    document.getElementById('dash-urgency').textContent = output.urgency_level;
    document.getElementById('dash-zone').textContent = output.urgency_zone;
    document.getElementById('dash-flow').textContent = output.selected_flow_id || 'null';
    document.getElementById('dash-mode').textContent = output.presentation_mode;

    // Visual styles for dashboard
    const zoneBox = document.getElementById('dash-zone-box');
    zoneBox.className = 'dash-item zone-' + output.urgency_zone;
}
