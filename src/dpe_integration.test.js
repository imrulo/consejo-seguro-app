const AppController = require('./app_controller');
const assert = require('assert');

console.log("🚦 Running AppController + DPE Integration Tests...\n");

const app = new AppController();

// MOCK CONTEXTS
const baseContext = {
    country: "RS",
    days_remaining_legal: 90,
    checks: {
        "passport_valid_6_months": true,
        "residence_reason_still_valid": true,
        "complete_document_set": true
    },
    city: "Belgrade", // Triggers Taxi (if rain)
    weather: "rain",  // Triggers Taxi
    day_of_week: "Monday", // Triggers BusPlus
    recent_events: ["moved_house"] // Triggers Beli Karton (Critical)
};

// TEST 1: IDLE STATE (DPE should shine)
console.log("TEST 1: Idle State (Expect DPE Problems)");
const inputIdle = {
    user_input: "hola", // Generic intent
    guardian_state: {},
    context: baseContext
};
const resIdle = app.process(inputIdle);
assert.strictEqual(resIdle.daily_problems.length, 3, "Should have 3 problems (BeliKarton, Taxi, BusPlus)");
assert.strictEqual(resIdle.daily_problems[0].priority, 'critical', "First should be Critical");
console.log("✅ Idle State Passed");

// TEST 2: ACTIVE FLOW (Low Urgency) -> DPE should exist but suppressed? 
// Spec Rule 1 says: "If has_active_flow AND flow zone is CRISIS... MAX 1". 
// It implies if flow is Normal, DPE is allowed fully? 
// "DPE must NEVER compete with active critical flow."
// Let's assume Normal Flow allows DPE (Useful items), but let's check Rule 4 "Cognitive Load".
// Actually, strictly following Rule 1: Only suppresses if CRISIS/ALERT.
console.log("\nTEST 2: Normal Flow (Expect DPE)");
const inputFlowNormal = {
    user_input: "renovar residencia",
    guardian_state: {},
    context: { ...baseContext, days_remaining_legal: 100 } // Safe zone
};
const resFlowNormal = app.process(inputFlowNormal);
assert.ok(resFlowNormal.has_active_flow);
assert.ok(resFlowNormal.daily_problems.length > 0, "DPE should appear in non-crisis flow");
console.log("✅ Normal Flow Passed");


// TEST 3: CRISIS FLOW -> DPE Suppressed (Max 1 Critical)
console.log("\nTEST 3: Crisis Flow (Expect Max 1 Critical)");
const inputFlowCrisis = {
    user_input: "renovar residencia",
    guardian_state: {},
    context: { ...baseContext, days_remaining_legal: 3 } // Crisis zone
};
const resFlowCrisis = app.process(inputFlowCrisis);
assert.strictEqual(resFlowCrisis.zone, 'CRISIS');
// DPE has 3 candidates (1 Critical, 1 Important, 1 Useful approx). 
// Should filter to ONLY Critical.
const dpeCrisis = resFlowCrisis.daily_problems;
assert.ok(dpeCrisis !== null);
assert.strictEqual(dpeCrisis.length, 1, "Should be capped at 1");
assert.strictEqual(dpeCrisis[0].priority, 'critical', "Should be the critical one (Beli Karton)");
console.log("✅ Crisis Suppression Passed");


// TEST 4: BLOCKED -> DPE Null
console.log("\nTEST 4: Blocked (Expect Null)");
const inputBlocked = {
    user_input: "hola",
    guardian_state: { active_states: ['admin_block'] },
    context: baseContext
};
const resBlocked = app.process(inputBlocked);
assert.strictEqual(resBlocked.system_state, 'blocked');
assert.strictEqual(resBlocked.daily_problems, null, "Should be null when blocked");
console.log("✅ Blocked State Passed");

console.log("\nALL INTEGRATION TESTS PASSED");
