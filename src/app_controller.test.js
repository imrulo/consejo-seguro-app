const AppController = require('./app_controller');
const assert = require('assert');

const app = new AppController();

console.log("🎹 Running Application Orchestrator Tests...\n");

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

// 1. Input ambiguo → sin flujo → salida segura (OK)
test('Case 1: Ambiguous Input -> Safe Exit', () => {
    const input = {
        user_input: "hola buenos dias",
        guardian_state: { active_states: [] },
        context: { country: "RS" }
    };
    const output = app.process(input);

    assert.strictEqual(output.system_state, 'ok');
    assert.strictEqual(output.flow_id, null);
    assert.strictEqual(output.presentation_mode, 'normal');
});

// 2. Renovación con 5 días → CRISIS + flujo forzado
test('Case 2: Renewal 5 days -> Crisis + Forced Alert', () => {
    const input = {
        user_input: "quiero renovar mi residencia",
        guardian_state: { active_states: ['legal_clock'] }, // Guardian aware
        context: {
            country: "RS",
            days_remaining_legal: 5,
            checks: { // Passing flow checks
                passport_valid_6_months: true,
                residence_reason_still_valid: true,
                complete_document_set: true
            }
        }
    };
    const output = app.process(input);

    // NIP detects Renewal intent
    // Flow detects 5 days -> Zone Crisis -> override true
    assert.strictEqual(output.flow_id, 'renewal_residency');
    assert.strictEqual(output.zone, 'CRISIS'); // From Flow Engine
    assert.strictEqual(output.presentation_mode, 'forced_alert'); // From Flow Override
    assert.ok(output.next_action.includes('HOY'), 'Action should be urgent');
});

// 3. Guardian admin_block → sistema bloqueado
test('Case 3: Guardian Admin Block -> System Blocked', () => {
    const input = {
        user_input: "tengo fiebre urgencia", // Even with high urgency intent
        guardian_state: { active_states: ['admin_block'] },
        context: { country: "RS" }
    };
    const output = app.process(input);

    assert.strictEqual(output.system_state, 'blocked');
    assert.strictEqual(output.blocked_reason, 'GUARDIAN_ADMIN_BLOCK');
    assert.strictEqual(output.presentation_mode, 'blocked');
});

// 4. Flujo con dependencia fallida → bloqueado
test('Case 4: Flow Dependency Failed -> Blocked', () => {
    const input = {
        user_input: "renovar visa",
        guardian_state: { active_states: ['legal_clock'] },
        context: {
            country: "RS",
            days_remaining_legal: 40, // Safe zone time-wise
            checks: {
                passport_valid_6_months: false, // FAIL dependency
                residence_reason_still_valid: true,
                complete_document_set: true
            }
        }
    };
    const output = app.process(input);

    assert.strictEqual(output.flow_id, 'renewal_residency');
    assert.strictEqual(output.system_state, 'blocked'); // Flow blocked it
    assert.ok(output.blocked_reason.includes('pasaporte'), 'Reason mentions passport');
    assert.strictEqual(output.presentation_mode, 'blocked');
});

// 5. Emergencia médica → crisis sin flujo legal
test('Case 5: Health Emergency -> Crisis No Flow', () => {
    const input = {
        user_input: "accidente sangre hospital",
        guardian_state: { active_states: [] },
        context: { country: "RS" }
    };
    const output = app.process(input);

    assert.strictEqual(output.urgency, 10);
    assert.strictEqual(output.zone, 'crisis');
    // Health usually has no 'flow_id' JSON yet (unless we implement health flow)
    // NIP returns 'health_emergency' intent but checks mapping. 
    // If not mapped in NIP engine flow map, flow_id is null/undefined.
    // NIP Engine currently DOES NOT map health_emergency to a file, so flow_id is null.

    assert.strictEqual(output.presentation_mode, 'forced_alert');
    assert.ok(output.next_action.includes('INMEDIATA'), 'Should suggest immediate help');
});

console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);

