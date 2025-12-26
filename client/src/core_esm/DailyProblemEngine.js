/**
 * Daily Problem Engine
 * 
 * "Engine, not a Brain".
 * Deterministically maps User Context -> Priority Micro-Problems.
 */

import frictionDB from '../../../data/atlas/friction_db.json';

class DailyProblemEngine {
    constructor(db = frictionDB) {
        this.db = db;
    }

    /**
     * @param {Object} context - Context object
     * @returns {Object} { status: 'STABLE'|'BUSY', problems: [] }
     */
    assess(context) {
        if (!context) return { status: 'STABLE', problems: [] };

        // 1. FILTER CANDIDATES
        const candidates = this.db.filter(problem => this._matches(problem.trigger, context));

        // 2. PRIORITIZE
        const critical = candidates.filter(p => p.priority === 'critical');
        const important = candidates.filter(p => p.priority === 'important');
        const useful = candidates.filter(p => p.priority === 'useful');

        // 3. CAP (Rule of 5)
        // Max 1 Critical
        // Max 2 Important
        // Max 2 Useful
        // (If limits not met, fill with others? Spec says "fill from remaining" if total < 5)

        let selection = [];

        // Add Top 1 Critical
        if (critical.length > 0) selection.push(critical[0]);

        // Add Top 2 Important
        selection.push(...important.slice(0, 2));

        // Add Top 2 Useful
        selection.push(...useful.slice(0, 2));

        // If total < 5, fill logic (simplified for MVP: just strictly adhere to buckets first, maybe add more if space)
        // Let's keep it simple: strict buckets ensures variety. 
        // If we have 0 critical, 0 important, and 5 useful, users might want to see useful.
        // But spec said "Strict priority... If total < 5, fill from remaining Important/Useful".

        // Advanced Fill Logic:
        const usedIds = new Set(selection.map(p => p.id));
        const remaining = candidates.filter(p => !usedIds.has(p.id));

        // Sort remaining by priority weight
        const weight = { 'critical': 3, 'important': 2, 'useful': 1 };
        remaining.sort((a, b) => weight[b.priority] - weight[a.priority]);

        while (selection.length < 5 && remaining.length > 0) {
            selection.push(remaining.shift());
        }

        if (selection.length === 0) {
            return { status: 'STABLE', problems: [] };
        }

        return {
            status: 'BUSY',
            problems: selection
        };
    }

    _matches(trigger, context) {
        if (!trigger) return true; // No trigger means always active (universal friction)

        for (const [key, requirement] of Object.entries(trigger)) {
            const userValue = context[key];

            // Array Match (Trigger says "rain" or "snow", user says "rain")
            // Or Trigger says day_of_week ["Mon","Tue"], user says "Mon"
            if (Array.isArray(requirement)) {
                // If requirement is array, usually means "one of these must match user value"
                // OR "user value (array) must contain this requirement"
                // Let's assume Trigger Requirement is the Constraint Set.

                // Case A: User value is scalar (e.g. day='Mon'), Req is ['Mon','Tue'] -> Match if userVal in Req
                if (!Array.isArray(userValue)) {
                    if (!requirement.includes(userValue)) return false;
                }
                // Case B: User value is array (e.g. recent_events=['moved']), Req is ['moved', 'arrived']
                // Does trigger mean "Any of these events"? Usually yes.
                else {
                    const intersection = userValue.filter(x => requirement.includes(x));
                    if (intersection.length === 0) return false;
                }
            }
            // Scalar Match
            else {
                // Exact match logic
                if (userValue !== requirement) return false;
            }
        }
        return true;
    }
}

// Export for usage


