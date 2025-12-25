# Daily Problem Engine (DPE) Specification

> **Version:** 1.0.0
> **Role:** Context-aware friction minimizer.
> **Constraint:** "Engine, not a Brain". Deterministic matching.

---

## 1. Core Purpose
To identify, prioritize, and surface **up to 5** actionable micro-problems based on the user's specific daily context. It acts as a proactive "shield" against common immigrant mistakes (fines, health risks, administrative errors).

## 2. Integration Architecture
- **Caller:** `AppController` (only when `system_state === 'ok'` AND `!has_active_flow`).
- **Input:** User Context (Location, Legal Status, Weather, Recent Events).
- **Output:** Prioritized List of "Atomic Problems".
- **Authority:** DPE is subservient to `Guardian`. If `Guardian` blocks, DPE is silent.

## 3. The Algorithm

### Phase 1: Filtering (Candidates)
Select all problems from `friction_db.json` where:
1.  `trigger.city` matches context (or is "any").
2.  `trigger.condition` evaluates to TRUE (logic check).
3.  `trigger.day_of_week` matches (if specified).
4.  `trigger.recent_event` matches (if specified).

### Phase 2: Scoring & Prioritization
Assign priority based on the problem definition:
- **CRITICAL (Red):** Immediate financial loss, legal risk, or health risk. (Max 1 allowed).
- **IMPORTANT (Orange):** significant inconvenience or high-probability friction. (Max 2 allowed).
- **USEFUL (Green):** Quality of life improvement or culturally smart move. (Max 2 allowed).

**Sort Order:**
1. Criticalality (Critical > Important > Useful)
2. Specificity (City-specific > Generic)

### Phase 3: Capping (The Rule of 5)
- Take top 1 Critical.
- Take top 2 Important.
- Take top 2 Useful.
- If total < 5, fill from remaining Important/Useful (respecting max 5 total).
- If Total == 0, return `{ status: 'STABLE' }`.

## 4. Data Structure (`friction_db.json`)

```json
[
  {
    "id": "beli_karton_warning",
    "category": "operative",
    "priority": "critical",
    "trigger": {
      "recent_event": "moved_house"
    },
    "content": {
      "title": "Registro Policial (Beli Karton)",
      "what": "Te mudaste recientemente.",
      "why": "La policía exige saber tu nueva dirección en 24h.",
      "action": "Ve con tu casero al MUP hoy mismo.",
      "avoid": "Esperar a 'tener tiempo'.",
      "worry_signal": "Han pasado más de 24h."
    }
  },
  {
    "id": "rain_taxi_scam",
    "category": "mobility",
    "priority": "important",
    "trigger": {
      "city": "Belgrade",
      "weather": "rain"
    },
    "content": {
      "title": "Alerta de Taxi: Lluvia",
      "what": "Llueve en Belgrado.",
      "why": "Los taxis ilegales ('Divlji') aprovechan la alta demanda.",
      "action": "Usa apps oficiales (Pink / Naxis) o llama.",
      "avoid": "Subir a taxis parados en la calle sin llamar.",
      "worry_signal": "El taxímetro corre muy rápido."
    }
  }
]
```

## 5. API Surface

```javascript
class DailyProblemEngine {
    constructor() {
        this.db = require('../data/atlas/friction_db.json');
    }

    /**
     * @param {Object} context - { city, weather, recent_events: [], has_residence: bool, ... }
     * @returns {Object} { status: 'STABLE' | 'BUSY', problems: [] }
     */
    assess(context) {
        // Implementation
    }
}
```
