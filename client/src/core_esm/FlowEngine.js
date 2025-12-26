/**
 * Flow Engine
 * Version: 1.0.0
 * 
 * Executes a declarative Flow JSON based on a provided Context.
 * Deterministic. No UI. No hidden logic.
 */

import LiveDataResolver from './LiveDataResolver.js';

export default class FlowEngine {
    constructor() {
        if (typeof LiveDataResolver !== 'function') throw new Error(`Critical: LiveDataResolver is not a constructor in FlowEngine. Got: ${typeof LiveDataResolver}`);
        this.liveResolver = new LiveDataResolver();
    }

    /**
     * Executes the flow with the given context.
     * @param {Object} flow - The Flow JSON object
     * @param {Object} context - The runtime context
     * @returns {Object} The calculated state
     */
    execute(flow, context) {
        if (!flow || !context) {
            throw new Error("FlowEngine: Missing flow or context");
        }

        // Pre-process: Interpolate Live Data into Flow definition (Naive approach, or Just-In-Time)
        // Better to resolve the used parts (steps, guidance) to save perf?
        // For simplicity and correctness with the requirement "No prices... hardcoded inside flows",
        // we resolve the whole flow object or the relevant parts before processing or at output.
        // Let's resolve the 'critical_steps' and 'special_cases' text.

        // NOTE: Ideally we don't mutate input 'flow'.
        // Let's perform logic on raw flow, then resolve strings in the OUTPUT.

        const daysRemaining = context.days_remaining;
        const checks = context.checks || {}; // e.g. { passport_valid_6_months: true }

        // 1. Determine Urgency Zone
        const currentZone = this._determineZone(flow.urgency_logic.zones, daysRemaining);

        // 2. Check Dependencies (Blocking)
        const { blocked, blockingId, blockingReason } = this._checkDependencies(flow.dependencies, checks);

        // 3. Identify Active Special Cases
        const activeSpecialCases = this._detectSpecialCases(flow.special_cases, checks, daysRemaining);

        // 4. Determine Next Action
        let nextAction = currentZone.recommended_action;
        let criticalWarnings = [];

        if (blocked) {
            nextAction = `BLOQUEADO: ${blockingReason}`;
            criticalWarnings.push(blockingReason);
        } else if (activeSpecialCases.length > 0) {
            // Priority to special cases if they are critical
            const crisisCase = activeSpecialCases.find(c => c.is_crisis);
            if (crisisCase) {
                nextAction = `ATENCIÓN: ${crisisCase.guidance}`;
                criticalWarnings.push(crisisCase.title);
            }
        }

        // 5. Select Available Steps
        const availableSteps = flow.critical_steps.map(step => ({
            id: step.step_id,
            title: step.title,
            items: step.items // Include items for deeper resolution
        }));

        const rawResult = {
            current_zone: {
                id: currentZone.id,
                label: currentZone.label,
                description: currentZone.description_human,
                color_code: this._mapZoneToColor(currentZone.id),
                guardian_override: currentZone.guardian_override
            },
            blocked: blocked,
            blocking_reason: blockingReason || null,
            blocking_id: blockingId || null,
            active_special_cases: activeSpecialCases,
            available_steps: availableSteps,
            critical_warnings: criticalWarnings,
            next_recommended_action: nextAction
        };

        // RESOLVE LIVE DATA
        return this.liveResolver.resolveObject(rawResult);
    }

    _determineZone(zones, days) {
        if (typeof days !== 'number') return zones.find(z => z.range_days[0] === 60) || zones[0]; // Default safe if unknown? Or Error? 
        // Better: logic for unknown days? Assuming Days is required for Renewal.
        // If days is null/undefined, we might assume safe or ask input. Protocol says Context includes days.

        // Sort zones by priority (crisis/expired first just in case ranges overlap, though they shouldn't)
        // Contract says zones are exact.
        for (const zone of zones) {
            const min = zone.range_days[0];
            const max = zone.range_days[1];
            if (days >= min && days <= max) {
                return zone;
            }
        }
        // Fallback for logic gaps (e.g. infinite negative)
        if (days < 0) return zones.find(z => z.id === 'zone_expired');
        return zones[0]; // Default/Safe
    }

    _checkDependencies(dependencies, checks) {
        if (!dependencies) return { blocked: false };

        for (const dep of dependencies) {
            // Check logic: if check is FALSE or MISSING, it blocks?
            // Usually checks are "is_valid". So expected true.
            // If the context check is explicitly false, it fails.
            // If missing, we assume NOT passed yet (safe default).

            const isSatisfied = checks[dep.id] === true;
            if (!isSatisfied) {
                return {
                    blocked: true,
                    blockingId: dep.id,
                    blockingReason: dep.failure_message_human
                };
            }
        }
        return { blocked: false };
    }

    _detectSpecialCases(specialCasesDict, checks, days) {
        if (!specialCasesDict) return [];
        const detected = [];

        // Logic A: Explicit flags in checks match Keys in special_cases
        // e.g. checks['change_of_ground'] = true
        for (const [key, info] of Object.entries(specialCasesDict)) {
            if (checks[key] === true) {
                detected.push({
                    id: key,
                    ...info
                });
            }
        }

        // Logic B: Implicit logic (e.g. expired days triggering special case node)
        // In the JSON, "expired_1_30_days" is a special case.
        if (days >= -30 && days <= -1 && specialCasesDict['expired_1_30_days']) {
            // Dedup: only add if not already triggered by flag
            if (!detected.find(d => d.id === 'expired_1_30_days')) {
                detected.push({ id: 'expired_1_30_days', ...specialCasesDict['expired_1_30_days'] });
            }
        }
        if (days < -30 && specialCasesDict['expired_31_plus_days']) {
            if (!detected.find(d => d.id === 'expired_31_plus_days')) {
                detected.push({ id: 'expired_31_plus_days', ...specialCasesDict['expired_31_plus_days'] });
            }
        }

        return detected;
    }

    _mapZoneToColor(zoneId) {
        if (zoneId.includes('safe') || zoneId.includes('verde')) return 'green';
        if (zoneId.includes('pre_alert') || zoneId.includes('amarillo')) return 'yellow';
        if (zoneId.includes('alert') || zoneId.includes('naranja')) return 'orange';
        if (zoneId.includes('danger') || zoneId.includes('rojo')) return 'red';
        if (zoneId.includes('crisis') || zoneId.includes('expired')) return 'darkred';
        return 'gray';
    }
}

// Export for usage

