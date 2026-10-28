# RetroPop 98: Starter Kit for Chrome Extension

Welcome to the **RetroPop 98** starter package! This directory contains the complete blueprint and agent instructions to build a production-ready, Google Chrome Web Store-compliant Manifest V3 extension.

---

## Files in this Directory

- [AGENTS.md](file:///home/q/Desktop/funnypannypagecss/extensionstart/AGENTS.md): Strict development instructions, Manifest V3 guidelines, Shadow DOM styling rules, and Chrome Web Store policies.
- [prompt.md](file:///home/q/Desktop/funnypannypagecss/extensionstart/prompt.md): The master copy-paste prompt to feed into Antigravity to build the entire extension codebase from scratch.

---

## Recommended Extension Name

- **Name**: **RetroPop 98**
- **Full Title**: **RetroPop 98 - 90s Web Nostalgia Popups**
- **Short Name**: `RetroPop 98`
- **Tagline**: *The Nostalgic 90s Web Popup Simulator*

---

## How to Build the Extension with Antigravity

1. Open a new Antigravity session or prompt window.
2. Open [prompt.md](file:///home/q/Desktop/funnypannypagecss/extensionstart/prompt.md).
3. Copy the markdown prompt block inside and paste it into Antigravity.
4. Antigravity will generate the full extension file structure:
   - `manifest.json` (Manifest V3)
   - `popup/` (Windows 98 styled action popup with Start/Stop, slider, sound toggle, hydra mode)
   - `content/` (Isolated Shadow DOM content script that injects popups on any webpage)
   - `background/` (Service worker handling settings persistence)
   - `icons/` (Real 16, 32, 48, 128 px PNG icons)
   - `store/` (Complete Chrome Web Store description, privacy policy, and permissions justification)

---

## How to Test in Google Chrome

1. Open Google Chrome and navigate to `chrome://extensions`.
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the generated extension folder.
5. Pin the extension to your toolbar, navigate to any website (e.g. `https://en.wikipedia.org` or any page), open the popup menu, and hit **START POPUP NOSTALGIA**!
