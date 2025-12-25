const DailyProblemEngine = require('./daily_problem_engine');
const assert = require('assert');

const dpe = new DailyProblemEngine();

console.log("🚦 Running Daily Problem Engine Tests...\n");

// 1. Scenario: Crisis Mode (Active Context)
console.log("TEST 1: Active Context (Rain + Moved House)");
const ctx1 = {
    city: "Belgrade",
    weather: "rain",
    recent_events: ["moved_house"],
    day_of_week: "Monday"
};
const res1 = dpe.assess(ctx1);
console.log("Result:", JSON.stringify(res1.problems.map(p => p.id), null, 2));

// Expecting: beli_karton_check (Critical), rain_taxi_scam (Important), busplus_audit (Critical/Important?)
assert.strictEqual(res1.status, 'BUSY');
assert.ok(res1.problems.find(p => p.id === 'beli_karton_check'), "Should warn about Beli Karton");
assert.ok(res1.problems.find(p => p.id === 'rain_taxi_scam'), "Should warn about Rain Taxi");


// 2. Scenario: Stable
console.log("\nTEST 2: Stable Context");
const ctx2 = {
    city: "Novi Sad", // Taxi scam trigger is Belgrade only
    weather: "sun",
    recent_events: [],
    day_of_week: "Sunday" // BusPlus trigger is Mon-Fri
};
const res2 = dpe.assess(ctx2);
console.log("Result Status:", res2.status);
assert.strictEqual(res2.status, 'STABLE');
assert.strictEqual(res2.problems.length, 0);

console.log("\n✅ DPE Logic Verified");
