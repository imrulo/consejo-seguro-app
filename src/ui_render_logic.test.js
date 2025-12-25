const { deriveUIState, UI_MODES } = require('./ui_render_logic');
const assert = require('assert');

console.log("🎨 Running UI Contract Tests...\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (e) {
        console.error(`❌ ${name}`);
        console.error(e);
        failed++;
    }
}

// Test 1: Happy Path (Active Flow)
test('Rule A: Active Flow Suppresses Idle', () => {
    const output = {
        system_state: 'ok',
        has_active_flow: true,
        suppress_legacy_checklists: true,
        steps: ['step1'],
        flow_id: 'test_flow'
    };
    const ui = deriveUIState(output);

    assert.strictEqual(ui.mode, UI_MODES.OK);
    assert.strictEqual(ui.components.flowRenderer.visible, true);
    assert.strictEqual(ui.components.idleState.visible, false); // Idle suppressed
    assert.strictEqual(ui.components.blockScreen.visible, false);
});

// Test 2: Blocked State (Guardian)
test('Rule B: Block Output Hides Content', () => {
    const output = {
        system_state: 'blocked',
        blocked_reason: 'ADMIN_BLOCK',
        has_active_flow: false
    };
    const ui = deriveUIState(output);

    assert.strictEqual(ui.mode, UI_MODES.BLOCKED);
    assert.strictEqual(ui.components.blockScreen.visible, true);
    assert.strictEqual(ui.components.flowRenderer.visible, false);
    assert.strictEqual(ui.components.idleState.visible, false);
});

// Test 3: Crisis State (Mixed)
test('Rule C: Crisis Shows Alert + Flow (if active)', () => {
    const output = {
        system_state: 'ok', // System is technically running, but crisis zone
        zone: 'CRISIS',
        has_active_flow: true,
        steps: ['step1'],
        next_action: 'RUN!'
    };
    const ui = deriveUIState(output);

    assert.strictEqual(ui.mode, UI_MODES.CRISIS);
    assert.strictEqual(ui.components.crisisAlert.visible, true);
    assert.strictEqual(ui.components.flowRenderer.visible, true); // Flow still visible under crisis
    assert.strictEqual(ui.components.blockScreen.visible, false);
});

// Test 4: Idle State (No Flow)
test('Idle State: Shows Generic Checklists', () => {
    const output = {
        system_state: 'ok',
        has_active_flow: false,
        suppress_legacy_checklists: false
    };
    const ui = deriveUIState(output);

    assert.strictEqual(ui.mode, UI_MODES.OK);
    assert.strictEqual(ui.components.flowRenderer.visible, false);
    assert.strictEqual(ui.components.idleState.visible, true);
});

console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);
