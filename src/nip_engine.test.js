const NIPEngine = require('./nip_engine');
const assert = require('assert');

const engine = new NIPEngine();

console.log("⚡️ Running NIP Engine Tests...\n");

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

// Case 1: Renovation Urgente (From Contract)
test('Contract Case 1: Residency Renewal Urgent', () => {
    const input = {
        user_text: "mi residencia vence en 10 días",
        guardian_active_states: ["legal_clock"],
        context: { country: "RS", days_remaining_legal: 10 }
    };
    const output = engine.run(input);

    assert.strictEqual(output.intent_id, 'residency_renewal');
    assert.strictEqual(output.urgency_zone, 'rojo'); // < 15 days = rojo
    assert.strictEqual(output.selected_flow_id, 'renewal_residency');
    assert.strictEqual(output.presentation_mode, 'alert'); // legal_clock + high urgency
});

// Case 2: Birth Registration (From Contract)
test('Contract Case 2: Birth Registration', () => {
    const input = {
        user_text: "nació mi hijo ayer",
        guardian_active_states: [],
        context: { country: "RS" }
    };
    const output = engine.run(input);

    assert.strictEqual(output.intent_id, 'birth_registration');
    assert.strictEqual(output.selected_flow_id, 'birth_flow');
    assert.strictEqual(output.presentation_mode, 'normal');
});

// Case 3: Bank Account (From Contract)
test('Contract Case 3: Bank Account', () => {
    const input = {
        user_text: "quiero abrir una cuenta bancaria",
        guardian_active_states: ["just_arrived"],
        context: { country: "RS" }
    };
    const output = engine.run(input);

    assert.strictEqual(output.intent_id, 'finance_bank_account');
    assert.strictEqual(output.selected_flow_id, 'money_flow');
    assert.strictEqual(output.urgency_zone, 'verde');
});

// Case 4: Ambiguous Input -> Fail Safe defaults
test('Ambiguous Input', () => {
    const input = {
        user_text: "hola que tal",
        guardian_active_states: [],
        context: { country: "RS" }
    };
    const output = engine.run(input);

    assert.strictEqual(output.intent_id, 'unknown');
    assert.strictEqual(output.intent_confidence, 'low');
    assert.strictEqual(output.selected_flow_id, null);
});

// Case 5: Blocked by Guardian
test('Guardian Block', () => {
    const input = {
        user_text: "quiero renovar",
        guardian_active_states: ["admin_block"],
        context: { country: "RS" }
    };
    const output = engine.run(input);

    assert.strictEqual(output.presentation_mode, 'blocked');
});

// Case 6: Health Crisis Override
test('Health Crisis Override', () => {
    const input = {
        user_text: "tengo fiebre alta urgencia",
        guardian_active_states: [],
        context: { country: "RS" }
    };
    const output = engine.run(input);

    assert.strictEqual(output.intent_id, 'health_emergency');
    assert.strictEqual(output.urgency_level, 10);
    assert.strictEqual(output.urgency_zone, 'crisis');
});

console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);

