# Project Guidance: RetroPop 98 Chrome Extension

**RetroPop 98** is a Google Chrome Web Store-compliant Manifest V3 extension that spawns nostalgic 1990s Internet Explorer fake popups on active web pages for retro fun and entertainment.

## Architecture & Technology Stack

- **Manifest**: Manifest V3 (`manifest.json`) targeting modern Chromium browsers.
- **Popup UI** (`popup/`): Windows 98 styled action menu with controls (Start/Stop, frequency slider, sound effects toggle, Hydra "Popup from Hell" mode, instant spawn, clear all).
- **Background Service Worker** (`background/service-worker.js`): Ephemeral lifecycle; all configuration and active states must be stored in `chrome.storage.local`. Updates action badge (`ON`/`OFF`).
- **Content Script** (`content/content.js`): Injected into active tabs. **Must encapsulate all injected popup DOM and CSS inside a Shadow DOM** (`attachShadow({ mode: 'open' })`) to prevent host page CSS conflicts and styling leakage.
- **Sound Effects**: Synthesized 8-bit PC speaker chimes via Web Audio API, or muted by default according to user preference.

## Development & Verification Workflow

1. **Load Unpacked in Chrome**:
   - Open `chrome://extensions`.
   - Enable "Developer mode" (top right).
   - Click "Load unpacked" and select the extension directory.
2. **Automated Manifest & Asset Verification**:
   - Validate manifest schema, icon files, and script references:
     `node scripts/verify-extension.js`
3. **Headless Chrome Check**:
   `google-chrome --headless --disable-gpu --load-extension=$(pwd)/extensionstart http://localhost:8000/test.html`

## Chrome Web Store Compliance & Safety Guidelines

- **No Inline Scripts**: The extension CSP prohibits inline event handlers (`onclick`, `onload`). All event handlers must be attached dynamically in `.js` files via `addEventListener`.
- **Shadow DOM Isolation**: Never inject raw un-scoped CSS into host web pages. Injected windows must live under an isolated shadow root.
- **Icon Integrity**: Manifest references to `16`, `32`, `48`, `128` icons must point to real, properly sized PNG files on disk.
- **Permission Hygiene**: Follow least-privilege principles (`storage`, `activeTab`). Avoid broad host permissions unless explicitly requested for background auto-injection.
- **Clean Teardown**: Provide an instant "Clean Screen" mechanism that immediately removes all injected extension elements.

## Baseline Rules

Inspect relevant code, callers, and applicable instructions before editing. Preserve existing user changes. Make the smallest complete change; avoid unrelated cleanup, speculative features, and unnecessary abstractions. Follow repository conventions and reuse existing implementations and dependencies. Preserve public and persisted contracts unless changes are authorized; update consumers and migration guidance when needed. Validate external input, enforce server-side authorization, and protect secrets and personal data. Verify changed behavior with proportionate project checks and regression coverage where practical; never weaken valid checks to get green. Wait for check results and distinguish passed, failed, pending, and unavailable verification. Report actual outcomes and remaining limitations without claiming unverified success. Commit, push, publish, deploy, or perform destructive actions only within user authorization. For version-sensitive library, framework, SDK, API, CLI, or cloud-service work, consult Context7 when available, matching the installed version; use official documentation or installed source when coverage is insufficient. Preserve these rules alongside project-specific instructions and resolve material conflicts explicitly.
