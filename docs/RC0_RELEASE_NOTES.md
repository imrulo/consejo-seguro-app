# RC0 Release Notes: ConsejoSeguro MVP Core

> **Version:** 0.9.0 (RC0)
> **Date:** 2024-12-25
> **Status:** FROZEN FOR VERIFICATION

## 1. Executive Summary
Release Candidate 0 (RC0) establishes the **Deterministic Logic Core** of ConsejoSeguro. 
It is a "headless" validation release containing the full decision-making brain of the application, verified against strict safety constraints. It includes a live data layer for Serbia (Belgrade) and a functional diagnostic viewer.

**Ready for:** Logic Audit, Architecture Verification, Content Verification.
**NOT Ready for:** End-user download (requires Production UI wrapper).

---

## 2. RC0 Scope Lock

### INCLUDED (The Core)
| Module | Status | Description |
|--------|--------|-------------|
| **Guardian** | 🔒 FROZEN | Immutable state manager (`legal_clock`, `admin_block`). |
| **NIP Engine** | ✅ ACTIVE | Intent classifier & Urgency calculator (0-10). |
| **Flow Engine** | ✅ ACTIVE | JSON-based procedural execution engine. |
| **AppController** | ✅ ACTIVE | Central Orchestrator enforcing priority & safety. |
| **Live Data** | ✅ ACTIVE | Serbia-first data layer (`data/live/`). |
| **UI Contract** | 📝 DEFINED | Strict rendering rules for future UI (`docs/UI_RENDERING_CONTRACT.md`). |
| **Viewer** | 🛠 TOOL | Search & Diagnostics tool (`public/viewer.html`). |

### ACTIVE FLOWS
1.  **Residency Renewal** (`renewal_residency`) - Full logic with dependencies and special cases.
2.  **Belgrade Transport** (`transport_belgrade`) - Live pricing and rules.

### EXCLUDED (Explicitly)
- **Production Frontend:** The `viewer.html` is a dev tool. No React/Vue app is shipping in RC0.
- **User Persistence:** No database. State is ephemeral or strictly local (simulated).
- **Legacy Flows:** Files in `data/*.json` (e.g., `sim-card-tourist.json`) are **DEPRECATED** and not loaded by AppController.
- **Birth/Family Flows:** Currently exist as Markdown specifications, not executable JSONs.

---

## 3. Data Veracity Audit (Serbia Focus)

| Domain | Data Point | Value / Status | Verification |
|--------|------------|----------------|--------------|
| **Transport** | Ticket 90min | **50 RSD** | ✅ Official (Busevi) |
| **Transport** | Ticket Day | **120 RSD** | ✅ Official (Busevi) |
| **Transport** | Night Service | **FREE (00:00-04:00)** | ✅ Updated Dec 2024 |
| **Immigration** | MUP Address | **Savska 35 (BG)** | ✅ Verified Foreigner Office |
| **Immigration** | Tax Costs | **~6000-8000 RSD** | ⚠️ Approximate (Varies by exact case) |
| **Medical** | Emergency # | **194** | ✅ Universal |

**Statement:** All "Live" data points are isolated in `data/live/*.json` or explicitly marked as estimates. No hardcoded fluctuating prices exist in code logic.

---

## 4. Known Limitations
1.  **Tax Precision:** Renewal flow estimates tax costs. Exact amounts depend on current government fee tables which change annually. RC0 uses a safe range.
2.  **Browser Limitation:** The Diagnostic Viewer uses a polyfill for file loading. Real production app will use a Bundler (Webpack/Vite) or Server-Side generation.
3.  **Scope:** Only Renewal and Transport flows are interactive. Other intents return "Unknown" or generic responses.

---

## 5. Safety Declaration
"I certify that this Release Candidate operates purely deterministically. It does not hallucinate legal advice, it strictly enforces Guardian blocks, and it defaults to a 'Crisis' or 'Fail-Safe' state when inputs are ambiguous or dangerous."

**Signed:** Antigravity Architect
