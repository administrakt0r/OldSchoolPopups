# Master Antigravity Prompt: OldSchoolPopups Chrome Extension

Copy and paste the entire prompt below into Antigravity to build the complete, production-ready, Chrome Web Store-compliant extension.

---

```markdown
You are an expert Chrome Extension engineer building a production-ready, Manifest V3 Chrome Extension named **"OldSchoolPopups"** (Short name: `OldSchoolPopups`, Tagline: *The Nostalgic 90s Web Popup Simulator*).

### Extension Overview
OldSchoolPopups is a fun, lightweight nostalgia extension that injects fake, harmless, interactive 1990s Windows 98 / Internet Explorer popups on any webpage where it is enabled. It allows users to relive the chaotic golden age of the late-90s World Wide Web with retro graphics, dial-up jokes, evasive buttons, synthesized PC-speaker chimes, and the notorious "Popup from Hell" Hydra effect.

### Chrome Web Store Compliance & Technical Invariants (Mandatory MV3)
1. **Manifest Version 3**: Must strictly follow Manifest V3 standards (`manifest_version: 3`).
2. **Zero Inline Scripts**: CSP prohibits inline scripts and inline event handlers (`onclick`, `onload`). ALL event listeners must be attached via `addEventListener` in external `.js` files. No `eval()` or `new Function()`.
3. **Shadow DOM Isolation**: Content scripts MUST inject all HTML and CSS inside an open **Shadow DOM** (`container.attachShadow({ mode: 'open' })`). This ensures that:
   - Host website styles (Tailwind, Bootstrap, resets) never break the retro Windows 98 popups.
   - Extension retro styles never leak out and break the host webpage.
4. **Valid PNG Icons**: The manifest must reference real icon files on disk (`16`, `32`, `48`, `128` px). Provide a self-contained Node.js icon generator script that creates valid PNGs.
5. **Ephemeral Service Worker**: The background service worker cannot hold in-memory state. Use `chrome.storage.local` for all state persistence.
6. **Minimal Permissions**: Request only `"storage"`, `"activeTab"`, and `"scripting"` (or declared content scripts). Follow least-privilege principles.

---

### Project File Structure to Generate

```
retropop98/
├── manifest.json
├── background/
│   └── service-worker.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   ├── content.js
│   └── content.css
├── icons/
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
├── scripts/
│   ├── generate-icons.js
│   └── verify-extension.js
└── store/
    ├── store-listing.md
    └── privacy-policy.md
```

---

### Detailed Specification for Each File

#### 1. `manifest.json`
- `name`: "OldSchoolPopups - 90s Web Nostalgia Popups"
- `short_name`: "OldSchoolPopups"
- `version`: "1.0.0"
- `description`: "Relive the golden age of the 1990s web! Spawns hilarious, harmless Windows 98 & Internet Explorer fake popups on any webpage."
- `manifest_version`: 3
- `action`:
  - `default_popup`: "popup/popup.html"
  - `default_title`: "OldSchoolPopups Controls"
  - `default_icon`: icons object (16, 32, 48, 128)
- `background`:
  - `service_worker`: "background/service-worker.js"
- `content_scripts`:
  - `matches`: ["<all_urls>"]
  - `js`: ["content/content.js"]
  - `run_at`: "document_idle"
- `permissions`: ["storage", "activeTab"]
- `icons`: 16, 32, 48, 128 px references

#### 2. `popup/popup.html`, `popup.css`, `popup.js` (Action Popup Menu)
- **Aesthetic**: Authentic Windows 98 dialog theme (classic beveled borders, navy title bar gradient, retro pixel font).
- **Controls**:
  - **Master Toggle**: Big chunky retro button: `[ START POPUP NOSTALGIA ]` / `[ STOP ]` (toggles active state and changes color/text).
  - **Intensity Selector**: Radio group or slider:
    - *Casual* (every 10s)
    - *Authentic 1998* (every 5s)
    - *Dial-Up Storm* (every 2.5s)
  - **Checkboxes**:
    - `[x] Sound Effects (Synthesized PC Speaker Chimes)`
    - `[x] "Popup from Hell" Mode (Closing 1 window spawns 2!)`
    - `[x] 3D Rotating Badge (Best Viewed With...)`
  - **Quick Action Buttons**:
    - `[ ⚡ Spawn One Now ]` (immediately triggers 1 popup on active tab)
    - `[ 🧹 Clean All Popups ]` (wipes all active injected popups immediately)
  - **Status readout**: Displays active status and popup counter on the current tab.
- All state reads/writes via `chrome.storage.local` and message passing to `chrome.tabs.sendMessage`.

#### 3. `content/content.js` & `content/content.css` (In-Page Injection)
- **Container**: Injects a single `#retropop98-host` element attached with `attachShadow({ mode: 'open' })`.
- **CSS inside Shadow Root**:
  - Full Windows 98 window styling (`.window`, `.title-bar`, `.title-bar-text`, `.title-bar-controls`, `.window-body`, retro beveled buttons).
  - `stars.bmp` black starfield pattern for the *Popup from Hell*.
  - Countdown progress bar inside each popup.
  - CSS resets scoped exclusively to shadow root so it doesn't affect host website or get overridden by host styles.
- **Draggable Windows**: Users can click and drag any popup by its `.title-bar`.
- **Z-Index Focus**: Clicking any popup brings it to the top z-index.
- **Auto-Close Timer**: Each popup auto-closes after 5–8 seconds, or can be closed immediately by clicking `[X]`.
- **Synthesized Audio (Web Audio API)**:
  - Synthesizes 8-bit retro sounds (window ding, error sawtooth buzz, lottery triangle chord) without requiring external audio files.
  - Respects the sound toggle setting from storage.
- **Popup Templates (12 Diverse 90s Classics)**:
  1. 🎰 *1,000,000th Visitor Lottery Winner*: Claims a Sony Discman, 2-slice toaster, and $1,000,000.
  2. 🎁 *Free Gateway 2000 Computer*: Pentium 4 with 19" Color CRT Monitor.
  3. 🚨 *Windows Security Trojan Alert*: `Trojan.FunkyDance.exe` detected in System32 (download 128MB RAM).
  4. 🦍 *BonziBUDDY 4.0*: The purple gorilla sharing dial-up jokes.
  5. 📞 *AOL Dial-Up Handshake*: 14,400 bps connection warning that mom is picking up the phone.
  6. 💾 *Drive A: Not Ready*: Prompts user to blow into disk drive and slide metal shutter.
  7. ❌ *IEXPLORE.EXE Illegal Operation*: General protection fault in `FUNNY.DLL` at `0028:C003BEEF`.
  8. 🔥 *Localhost Singles*: Hot IP address `127.0.0.1` looking for a TCP three-way handshake.
  9. ⏳ *Downloading the Internet*: Progress bar with "342 years remaining".
  10. 💨 *Runaway Evasive Close Button*: Button jumps away to random coordinates whenever the mouse cursor hovers over it.
  11. 🔥 *Tomas Petricek's "Popup from Hell" (Hydra)*: Starry background with `<marquee>Close me if you can!</marquee>`. Closing this popup immediately spawns TWO more!
  12. 🌐 *3D Rotating Browser Badge*: Interactive 3D rotating "This page is best viewed with Microsoft Internet Explorer".

#### 4. `background/service-worker.js`
- Tracks enabled state across tabs.
- Updates extension action badge (`ON` in green, blank/`OFF` when disabled).
- Handles extension install / update events.

#### 5. `scripts/generate-icons.js`
- A zero-dependency Node.js script using pure binary PNG generation (or pure Canvas) to output authentic 16x16, 32x32, 48x48, and 128x128 pixel retro icons with a Windows 98 / 🌐 theme.

#### 6. `scripts/verify-extension.js`
- Automated verification script checking:
  - `manifest.json` schema validation.
  - Verification that every file referenced in the manifest actually exists on disk.
  - Verification that no inline event handlers (`onclick=`) exist in `popup.html`.
  - Verification that all icon files exist and are valid PNGs.

#### 7. `store/store-listing.md` & `store/privacy-policy.md`
- Complete Chrome Web Store submission kit:
  - Store title, short description (≤132 characters), full description with feature highlights.
  - Primary category: *Fun / Lifestyle*.
  - Permissions justification explaining why `"storage"` and `"activeTab"` are strictly necessary for saving user settings and injecting retro visual components.
  - Single-purpose policy declaration for Google review approval.
  - Privacy policy declaring zero data collection or tracking.

Please implement all files completely, with clean code, zero placeholders, and verified working behavior.
```
