const FlowEngine = require('./flow_engine');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const engine = new FlowEngine();
console.log("📡 Running Live Data Tests...\n");

// Load Transport Flow
const flowPath = path.join(__dirname, '../data/flows/transport_belgrade_flow.json');
const flowJSON = JSON.parse(fs.readFileSync(flowPath, 'utf8'));

const context = {
    days_remaining: 100, // Irrelevant for transport
    checks: {}
};

try {
    const result = engine.execute(flowJSON, context);

    // Find the step with ticket info
    const stepTicket = result.available_steps.find(s => s.id === 'step_ticket');
    const item90 = stepTicket.items.find(i => i.id === 'info_90min');

    console.log("Resolved Description:", item90.description);

    // Assert placeholders replaced
    assert.ok(!item90.description.includes('{{'), 'Should not contain placeholders');
    assert.ok(item90.description.includes('50 RSD'), 'Should contain resolved price 50 RSD');
    assert.ok(item90.description.includes('A90'), 'Should contain SMS code A90');

    // Verify Night Transport
    const stepNight = result.available_steps.find(s => s.id === 'step_night');
    const itemNight = stepNight.items.find(i => i.id === 'info_night');
    assert.ok(itemNight.description.includes('FREE'), 'Should contain FREE status for night');

    console.log("✅ Live Data Resolution Verified");

} catch (e) {
    console.error("❌ Live Data Test Failed", e);
    process.exit(1);
}
