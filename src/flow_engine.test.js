const FlowEngine = require('./flow_engine');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock loading the JSON file we created earlier
// Ideally we read it from disk to ensure integration
const flowPath = path.join(__dirname, '../data/flows/renewal_residency_flow.json');
let flowJSON;

try {
    const raw = fs.readFileSync(flowPath, 'utf8');
    flowJSON = JSON.parse(raw);
} catch (e) {
    console.error("Skipping tests because flow file not found or invalid.", e);
    process.exit(1);
}

const engine = new FlowEngine();

console.log("🌊 Running Flow Engine Tests...\n");

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

// Case 1: Renovación con 40 días → zona AMARILLA
test('Case 1: Renewal 40 days -> Yellow', () => {
    const context = {
        days_remaining: 40,
        checks: {
            // Assume all deps satisfied for this test
            passport_valid_6_months: true,
            residence_reason_still_valid: true,
            complete_document_set: true
        }
    };
    const state = engine.execute(flowJSON, context);

    // Check Zone
    assert.strictEqual(state.current_zone.label, 'AMARILLO');
    assert.strictEqual(state.blocked, false);
});

// Case 2: Renovación con 5 días → CRISIS (Zone Crisis)
test('Case 2: Renewal 5 days -> Crisis', () => {
    const context = {
        days_remaining: 5,
        checks: {
            passport_valid_6_months: true,
            residence_reason_still_valid: true,
            complete_document_set: true
        }
    };
    const state = engine.execute(flowJSON, context);

    assert.strictEqual(state.current_zone.label, 'CRISIS');
    assert.strictEqual(state.current_zone.guardian_override, true);
});

// Case 3: Falta pasaporte válido → bloqueado
test('Case 3: Missing Valid Passport -> Blocked', () => {
    const context = {
        days_remaining: 50,
        checks: {
            passport_valid_6_months: false, // FAIL
            residence_reason_still_valid: true,
            complete_document_set: true
        }
    };
    const state = engine.execute(flowJSON, context);

    assert.strictEqual(state.blocked, true);
    assert.ok(state.blocking_reason.includes('pasaporte'), 'Reason should mention passport');
    assert.strictEqual(state.blocking_id, 'passport_valid_6_months');
});

// Case 4: Cambio de motivo → caso especial detectado
test('Case 4: Change of Ground -> Special Case', () => {
    const context = {
        days_remaining: 45,
        checks: {
            passport_valid_6_months: true,
            residence_reason_still_valid: true, // Wait, if reason VALID then NO change.
            complete_document_set: true,
            change_of_ground: true // Explicit input flag for scenario
        }
    };
    // Note: In real logic, "residence_reason_still_valid: false" might block workflow, 
    // AND "change_of_ground: true" might activate special case.
    // Let's test checking the explicit special case FLAG detection.

    const state = engine.execute(flowJSON, context);

    const specialCase = state.active_special_cases.find(c => c.id === 'change_of_ground');
    assert.ok(specialCase, 'Should detect change_of_ground special case');
});

// Case 5: Residencia vencida → flujo sigue pero en modo crisis / expired
test('Case 5: Expired (-5 days)', () => {
    const context = {
        days_remaining: -5,
        checks: {
            passport_valid_6_months: true,
            residence_reason_still_valid: true,
            complete_document_set: true
        }
    };
    const state = engine.execute(flowJSON, context);

    // Zone check
    assert.strictEqual(state.current_zone.id, 'zone_expired'); // Uses ID "zone_expired" from JSON logic [-999, 0]

    // Special Case check (Logic B in Engine)
    const expiredCase = state.active_special_cases.find(c => c.id === 'expired_1_30_days');
    assert.ok(expiredCase, 'Should detect expired_1_30_days special case via days logic');

    assert.ok(state.next_recommended_action.includes('MUP'), 'Action should mention MUP');
});


console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);
