# Project Guidance: RetroPop 98

RetroPop 98 is a nostalgic Windows 98 Cyberspace emulator and chaotic 90s popup simulator featuring Microsoft Internet Explorer 4.0, Tomas Petricek's Hydra "Popup from Hell", animated 3D "Best Viewed With" rotating badges, Sound Blaster 16 audio synthesis, Disk Defragmenter, MS-DOS prompt, Clippy assistant, and a full Blue Screen of Death (BSOD) simulator.

## Stack and Architecture

- **Frontend**: Pure HTML5, CSS3 (`98.css` styling framework + custom 3D transforms), vanilla ES6+ JavaScript.
- **Audio Engine**: HTML5 Audio (`mjuzyk/funday.mp3` with strict autoplay fallbacks) + Web Audio API Synthesizer (synthesizing dial-up modem handshaking, DTMF dialing, chimes, and Hydra chords).
- **Hosting / Deployment**: Cloudflare Pages (`https://retropop-98.pages.dev`).
- **Starter Kit Extension**: `extensionstart/` contains the Manifest V3 starter blueprint for Chrome Web Store packaging.

## Development and Verification

- **Serve locally**:
  ```bash
  python3 -m http.server 8000
  ```
- **Headless Chrome render and screenshot verification**:
  ```bash
  google-chrome --headless --disable-gpu --screenshot=screenshots/desktop-clean.png --window-size=1280,800 "file://$(pwd)/index.html?clean=1"
  google-chrome --headless --disable-gpu --screenshot=screenshots/desktop-chaos.png --window-size=1280,800 "file://$(pwd)/index.html?demo=1"
  ```
- **Deploy to Cloudflare Pages**:
  ```bash
  wrangler pages deploy . --project-name=retropop-98 --branch=main
  ```

## Baseline Rules

Inspect relevant code, callers, and applicable instructions before editing. Preserve existing user changes. Make the smallest complete change; avoid unrelated cleanup, speculative features, and unnecessary abstractions. Follow repository conventions and reuse existing implementations and dependencies. Preserve public and persisted contracts unless changes are authorized; update consumers and migration guidance when needed. Validate external input, enforce server-side authorization, and protect secrets and personal data. Verify changed behavior with proportionate project checks and regression coverage where practical; never weaken valid checks to get green. Wait for check results and distinguish passed, failed, pending, and unavailable verification. Report actual outcomes and remaining limitations without claiming unverified success. Commit, push, publish, deploy, or perform destructive actions only within user authorization. For version-sensitive library, framework, SDK, API, CLI, or cloud-service work, consult Context7 when available, matching the installed version; use official documentation or installed source when coverage is insufficient. Preserve these rules alongside project-specific instructions and resolve material conflicts explicitly.
