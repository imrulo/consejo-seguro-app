# Official Sources Changelog

Registro de cambios en `data/official_sources.json` y fuentes oficiales.

## [Unreleased]
### Added
- Created `scripts/verify-sources.js` for automated monthly checks.
- Initialized `data/official_sources.json` with verified sources:
    - Welcome to Serbia
    - MUP (Interior Ministry)
    - Ministries of Justice, Foreign Affairs, Labor
    - National Bank of Serbia
    - Major Banks (Raiffeisen, UniCredit, Intesa)

## Guidelines
- Log **every** change to `data/official_sources.json` here.
- Include the date, the change description, and the user who verified it.
- If a URL is removed, explain why (e.g., deprecated, 404).

## Format
```markdown
### [YYYY-MM-DD]
- **Changed:** Updated MUP Belgrade address (Verified by: Name)
- **Fixed:** Corrected link for Visa form (Source: WelcomeToSerbia)
```
