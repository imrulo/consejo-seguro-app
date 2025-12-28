# Audit of ConsejoSeguro App

## 1) Technical Audit
*   **Dead UI Interactions**:
    *   **Hero Search Bar**: The input `<input>` has no `onChange` handler or form submission logic. It's purely cosmetic. Typing and pressing Enter does nothing.
    *   **Panic Buttons**: "✅ Ya llegué" and "🚨 Emergencia" in `Hero.tsx` are just styled buttons. They trigger no action, modal, or navigation.
    *   **Translator Cards**: The audio button triggers `alert("Reproduciendo audio en serbio... (Simulado)")`. This is a placeholder that fails the "usable" test.
    *   **Bureaucracy Map**: The steps are visually distinct (completed vs. locked) but clicking them does absolutely nothing. There is no drill-down to see *how* to complete a step.
    *   **Tools Grid**: The cards for "WiFi Gratis", "Rutas Bus", etc., are just visual placeholders. Clicking them does not navigate anywhere or open any tool.
    *   **Chat Widget**: The chat is a hardcoded UI. Typing in the input and pressing send (mocked) does nothing.
    *   **Navigation Links**: The header links point to anchors `#tramites`, `#guias` which do not exist in the current `page.tsx` (I removed the sections with those IDs in the redesign).
*   **Incomplete Components**:
    *   `BureaucracyMap` needs a detail view or modal state.
    *   `TranslatorCard` needs real audio assets or a TTS integration.

## 2) UX / UI Audit (Mobile First)
*   **Abandonment Risks**:
    *   **Dead Ends**: A user in a panic clicking "Emergencia" and getting *nothing* is a critical failure. This destroys trust immediately.
    *   **False Promises**: The search bar implies functionality that doesn't exist.
    *   **Touch Targets**: The "Bureaucracy Map" on mobile requires horizontal scrolling (good) but the touch targets for steps are small and provide no feedback that they are non-interactive.
*   **Visual/Hierarchy**:
    *   The "Modo SOS" button in the header is a great idea, but it currently only toggles a state variable `survivalMode` that *does nothing* elsewhere in the app. The UI doesn't change to a high-contrast/simplified version.
    *   The "Translator Cards" scroll container is good for mobile, but the cards might be too tall (`h-48`) for small screens if the keyboard opens.

## 3) Flow & Product Audit
*   **User Journey**:
    *   **Current**: Landing -> See Dashboard -> Try to click "Emergencia" (Fail) -> Try to Search (Fail) -> Scroll to Translator -> Try Audio (Alert) -> Abandon.
    *   **Value Proposition**: The *promise* is high (Survival Kit), but the *delivery* is zero functional utility right now.
*   **Proposed Simplified Flow**:
    *   **Landing**: Immediate "Survival Dashboard" (as implemented, but functional).
    *   **Primary Action**: "I need X" (Doctor, Police, Papers).
    *   **Resolution**: Clicking "Doctor" -> Opens a dedicated "Action Card" with:
        *   Map of nearest clinics (mocked or real).
        *   Translator Card pre-loaded with medical phrases.
        *   "Call Ambulance" button (real `tel:` link).

## 4) AI / Local Intelligence Opportunities
*   **Offline First**:
    *   **Local Search**: Index the static content (guides, phrases) into a client-side search (e.g., Fuse.js) so the search bar works instantly without API calls.
    *   **Local LLM (Future)**: WebLLM could run a tiny model for basic Q&A, but for now, a **Decision Tree** (Rule-based AI) is better and lighter. "Do you have a fever? -> Go here."
*   **Smart Phrasebook**:
    *   Instead of just static cards, a "Builder" where users tap icons (Pain + Stomach) and it generates the Serbian sentence locally.

## 5) Summary & Output
*   **Why it's not usable**: It's a "Potemkin Village" — a beautiful facade with nothing behind it. The most critical features (Emergency, Search, Audio) are mocked.
*   **Biggest Design Mistake**: The "Emergencia" button looking functional but doing nothing. In a "Safety" app, this is dangerous.
*   **Fastest Path to Usability**:
    1.  Make the "Translator" play real audio (even if just 3 pre-recorded mp3 files).
    2.  Wire up the "Emergency" button to a real `tel:194` (Serbian ambulance) or a modal with emergency numbers.
    3.  Make the Search bar filter a list of hardcoded links.
