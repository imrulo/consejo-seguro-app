/**
 * Núcleo de Inteligencia Práctica (NIP) Engine
 * Version: 1.0.0 (Frozen Contract Compliance)
 * 
 * Rules:
 * 1. No AI/ML. Deterministic logic only.
 * 2. Strict inputs/outputs based on nip_contract.json.
 * 3. Fail-safe defaults.
 */

class NIPEngine {
    constructor() {
        this.INTENT_MAP = {
            residency_renewal: ['vence', 'renovacion', 'caduca', 'residencia', 'visa', 'permiso', 'expira', 'renovar', 'boravak'],
            birth_registration: ['nacio', 'hijo', 'bebe', 'nacimiento', 'partida', 'mnaticni', 'registro civil', 'dar a luz'],
            finance_bank_account: ['cuenta', 'banco', 'bancaria', 'abrir', 'dinero'],
            finance_transfer: ['transferencia', 'enviar', 'recibir', 'wise', 'western union'],
            health_emergency: ['urgencia', 'hospital', 'fiebre', 'dolor', 'accidente', 'sangre', 'ambulancia', '194', 'emergencia'],
            residency_family: ['familia', 'esposa', 'esposo', 'traer', 'reagrupacion', 'unificacion'],
            residency_first_time: ['primera vez', 'sacar residencia', 'obtener residencia', 'permiso trabajo'],
            transport_belgrade: ['bus', 'transporte', 'busplus', 'sverc', 'multa', 'controlador', 'ticket', 'boleto', 'tram', 'trole']
        };

        this.FLOW_MAP = {
            residency_renewal: 'renewal_residency',
            birth_registration: 'birth_flow',
            finance_bank_account: 'money_flow',
            finance_transfer: 'money_flow',
            residency_family: 'family_flow', // Assuming mapped to general family flow logic
            residency_first_time: 'residency_module', // Placeholder
            transport_belgrade: 'transport_belgrade'
        };
    }

    /**
     * 1. Normalize Input
     * Removes accents, lowercases, trims.
     */
    normalizeInput(rawText) {
        if (!rawText || typeof rawText !== 'string') return '';
        return rawText
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
            .trim();
    }

    /**
     * 2. Detect Intent
     * Keyword matching with simple scoring.
     */
    detectIntent(normalizedText) {
        let bestIntent = 'unknown';
        let maxMatches = 0;

        for (const [intentId, keywords] of Object.entries(this.INTENT_MAP)) {
            let matches = 0;
            keywords.forEach(kw => {
                if (normalizedText.includes(kw)) matches++;
            });

            if (matches > maxMatches) {
                maxMatches = matches;
                bestIntent = intentId;
            }
        }

        // Confidence logic
        let confidence = 'low';
        if (maxMatches >= 2) confidence = 'high';
        else if (maxMatches === 1) confidence = 'medium';

        // Special override for exact critical keywords
        if (normalizedText.includes('urgencia') || normalizedText.includes('hospital')) {
            confidence = 'high';
        }

        if (bestIntent === 'unknown') {
            confidence = 'low';
        }

        return {
            intent_id: bestIntent,
            intent_confidence: confidence
        };
    }

    /**
     * 3. Calculate Urgency
     * Strictly follows logic_rules from contract.
     */
    calculateUrgency(intentId, guardianStates, context) {
        let level = 0;
        let zone = 'verde';

        const daysRemaining = context?.days_remaining_legal;
        const hasDaysContext = typeof daysRemaining === 'number';

        // Base urgency based on Intent
        if (intentId === 'health_emergency') {
            level = 10;
            zone = 'crisis';
            return { urgency_level: level, urgency_zone: zone };
        }

        if (intentId === 'residency_renewal') {
            level = 5; // Start at medium
            zone = 'amarillo';
        }

        if (intentId === 'birth_registration') {
            level = 7; // High priority but not life threat
            zone = 'amarillo';
        }

        // Logic Rule: Crisis Triggers
        if (hasDaysContext && daysRemaining < 7) {
            level = 10;
            zone = 'crisis';
        }
        // Logic Rule: Rojo Triggers
        else if (hasDaysContext && daysRemaining < 15 && intentId === 'residency_renewal') {
            level = 9;
            zone = 'rojo';
        }
        else if (hasDaysContext && daysRemaining < 15) {
            level = 8;
            zone = 'rojo';
        }

        // Final sanity check on levels/zones alignment
        if (level >= 10) zone = 'crisis';
        else if (level >= 8) zone = 'rojo';
        else if (level >= 4) zone = 'amarillo';
        else zone = 'verde';

        return { urgency_level: level, urgency_zone: zone };
    }

    /**
     * 4. Select Flow
     */
    selectFlow(intentId) {
        return this.FLOW_MAP[intentId] || null;
    }

    /**
     * 5. Main Execution Pipeline
     */
    run(input) {
        // Fail-safe: Invalid input
        if (!input || !input.user_text || !input.context || !input.context.country) {
            console.error("NIP Error: Invalid input structure");
            return this._generateFailSafeOutput();
        }

        try {
            const normalizedText = this.normalizeInput(input.user_text);
            const intentResult = this.detectIntent(normalizedText);
            const urgencyResult = this.calculateUrgency(
                intentResult.intent_id,
                input.guardian_active_states || [],
                input.context
            );

            const selectedFlow = this.selectFlow(intentResult.intent_id);

            // Guardian Interaction Logic
            let presentationMode = 'normal';
            let guardianCheckRequired = false;

            const activeStates = input.guardian_active_states || [];

            // Rule 1: Admin Block
            if (activeStates.includes('admin_block')) {
                presentationMode = 'blocked';
            }
            // Rule 2: Legal Clock + High Urgency
            else if (activeStates.includes('legal_clock') && urgencyResult.urgency_level > 7) {
                presentationMode = 'alert';
            }

            // Check Requirement Logic
            if (urgencyResult.urgency_level >= 4 || intentResult.intent_id !== 'unknown') {
                guardianCheckRequired = true;
            }

            return {
                intent_id: intentResult.intent_id,
                intent_confidence: intentResult.intent_confidence,
                urgency_level: urgencyResult.urgency_level,
                urgency_zone: urgencyResult.urgency_zone,
                selected_flow_id: selectedFlow,
                guardian_check_required: guardianCheckRequired,
                presentation_mode: presentationMode
            };

        } catch (e) {
            console.error("NIP Critical Failure:", e);
            return this._generateFailSafeOutput();
        }
    }

    _generateFailSafeOutput() {
        return {
            intent_id: 'unknown',
            intent_confidence: 'low',
            urgency_level: 0,
            urgency_zone: 'verde',
            selected_flow_id: null,
            guardian_check_required: true,
            presentation_mode: 'normal'
        };
    }
}

// Export for usage
module.exports = NIPEngine;
