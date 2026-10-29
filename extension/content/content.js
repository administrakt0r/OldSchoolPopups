(() => {
  if (window.__oldschoolpopups_injected) return;
  window.__oldschoolpopups_injected = true;

  const host = document.createElement('div');
  host.id = 'oldschoolpopups-shadow-host';
  host.style.position = 'fixed';
  host.style.top = '0';
  host.style.left = '0';
  host.style.width = '100vw';
  host.style.height = '100vh';
  host.style.pointerEvents = 'none';
  host.style.zIndex = '2147483647';
  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  container.id = 'oldschoolpopups-container';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.position = 'relative';
  shadow.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .rp-window {
      position: absolute;
      pointer-events: auto;
      background: #c0c0c0;
      border: 3px outset #ffffff;
      box-shadow: 4px 4px 16px rgba(0,0,0,0.6);
      font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
      font-size: 11px;
      color: #000;
      min-width: 290px;
      max-width: 440px;
      animation: rpIn 0.22s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      user-select: none;
    }
    @keyframes rpIn {
      from { transform: scale(0.65); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .rp-title {
      background: linear-gradient(90deg, #000080, #1084d0);
      color: white;
      padding: 3px 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: grab;
      font-weight: bold;
      font-size: 11px;
    }
    .rp-close {
      background: #c0c0c0;
      border: 1px outset #fff;
      font-size: 11px;
      width: 16px;
      height: 14px;
      line-height: 12px;
      text-align: center;
      cursor: pointer;
      color: #000;
      font-weight: bold;
    }
    .rp-close:hover {
      background: #e0e0e0;
    }
    .rp-body {
      padding: 10px;
    }
    .rp-btn {
      background: #c0c0c0;
      border: 2px outset #ffffff;
      padding: 3px 10px;
      cursor: pointer;
      font-size: 11px;
      font-weight: bold;
    }
    .rp-btn:active {
      border: 2px inset #ffffff;
    }
    .flash-casino {
      animation: rpIn 0.2s, flashCasino 0.35s infinite alternate !important;
      border: 3px solid #ff0000 !important;
    }
    @keyframes flashCasino {
      0% { box-shadow: 0 0 16px #ff0000; border-color: #ff0000; }
      50% { box-shadow: 0 0 22px #ffff00; border-color: #ffff00; }
      100% { box-shadow: 0 0 16px #00ff00; border-color: #00ff00; }
    }
    .flash-hazard {
      animation: rpIn 0.2s, flashHazard 0.25s infinite alternate !important;
      border: 3px solid #ff0000 !important;
    }
    @keyframes flashHazard {
      0% { box-shadow: 0 0 20px #ff0000; border-color: #ff0000; background: #ffffaa; }
      100% { box-shadow: 0 0 20px #ffff00; border-color: #ffff00; background: #ffaaaa; }
    }
    .flash-pink {
      animation: rpIn 0.2s, flashPink 0.35s infinite alternate !important;
      border: 3px solid #ff007f !important;
    }
    @keyframes flashPink {
      0% { box-shadow: 0 0 16px #ff007f; border-color: #ff007f; }
      100% { box-shadow: 0 0 16px #00f0ff; border-color: #00f0ff; }
    }
    .flash-rainbow {
      animation: rpIn 0.2s, flashRainbow 0.45s infinite linear !important;
      border: 3px solid #ff0000 !important;
    }
    @keyframes flashRainbow {
      0% { border-color: #ff0000; box-shadow: 0 0 16px #ff0000; }
      33% { border-color: #ffff00; box-shadow: 0 0 16px #ffff00; }
      66% { border-color: #00ff00; box-shadow: 0 0 16px #00ff00; }
      100% { border-color: #ff0000; box-shadow: 0 0 16px #ff0000; }
    }
    .title-flash {
      animation: titleFlash 0.35s infinite linear !important;
    }
    @keyframes titleFlash {
      0% { background: linear-gradient(90deg, #ff0000, #ff8800); }
      50% { background: linear-gradient(90deg, #ffff00, #00aa00); color: #000; }
      100% { background: linear-gradient(90deg, #0088ff, #ff00ff); }
    }
    .blink-txt {
      animation: blink 0.5s infinite alternate;
    }
    @keyframes blink {
      0% { opacity: 1; }
      100% { opacity: 0.1; }
    }
  `;
  shadow.appendChild(style);

  // Web Audio retro sound generator
  let audioCtx = null;
  function playChime(type) {
    chrome.storage.local.get(['soundEnabled'], (st) => {
      if (st.soundEnabled === false) return;
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioClass) return;
        if (!audioCtx) audioCtx = new AudioClass();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;

        if (type === 'siren') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.linearRampToValueAtTime(1100, t + 0.15);
          osc.frequency.linearRampToValueAtTime(600, t + 0.3);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          osc.start(t);
          osc.stop(t + 0.3);
        } else if (type === 'casino') {
          osc.type = 'square';
          [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
            const toneOsc = audioCtx.createOscillator();
            const toneGain = audioCtx.createGain();
            toneOsc.connect(toneGain);
            toneGain.connect(audioCtx.destination);
            toneOsc.type = 'triangle';
            toneOsc.frequency.setValueAtTime(f, t + idx * 0.08);
            toneGain.gain.setValueAtTime(0.12, t + idx * 0.08);
            toneGain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.15);
            toneOsc.start(t + idx * 0.08);
            toneOsc.stop(t + idx * 0.08 + 0.16);
          });
        } else {
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, t);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          osc.start(t);
          osc.stop(t + 0.15);
        }
      } catch (e) {}
    });
  }

  let zIdx = 10000;
  const POPUPS = [
    {
      title: '🎰 $$$ 777 CASINO JACKPOT - YOU WON! $$$',
      flashClass: 'flash-casino',
      titleFlash: true,
      sound: 'casino',
      content: `
        <div style="text-align: center;">
          <div class="blink-txt" style="font-size: 20px; color: #ff0000; font-weight: bold; margin: 4px 0;">🍒 7️⃣ 💎 7️⃣ 🍋</div>
          <p style="margin: 4px 0; font-weight: bold; color: #800000;">CONGRATULATIONS LUCKY SURFER!</p>
          <p style="font-size: 11px; margin: 4px 0;">You won 1,000,000 Cyber Gold Tokens on this webpage!</p>
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 8px;">
            <button class="rp-btn" style="background: #ffffaa;" onclick="alert('Prize transferred!'); this.closest('.rp-window').remove()">💰 Claim Prize</button>
          </div>
        </div>
      `
    },
    {
      title: '🚨 CRITICAL ALERT: SYSTEM MEMORY OVERFLOW! 🚨',
      flashClass: 'flash-hazard',
      sound: 'siren',
      content: `
        <div>
          <p style="color: #990000; font-weight: bold; margin: 0 0 4px 0;">⚠️ WARNING 0x00001998 FATAL IRQ CONFLICT!</p>
          <p style="font-size: 11px; margin: 4px 0;">Web browser cache has exceeded 1.44MB floppy disk capacity. Immediate memory compression required!</p>
          <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px;">
            <button class="rp-btn evasive-btn">Fix IRQ (Run)</button>
          </div>
        </div>
      `
    },
    {
      title: '💖 HOT SINGLE ROUTERS IN YOUR SUBNET! 💖',
      flashClass: 'flash-pink',
      sound: 'casino',
      content: `
        <div style="text-align: center;">
          <div class="blink-txt" style="color: #ff007f; font-weight: bold; font-size: 12px;">📡 3 Cisco 2500 Routers near 192.168.1.1!</div>
          <p style="font-size: 11px; margin: 4px 0;">LATENCY: 0.01ms ★ BANDWIDTH: UNLIMITED ★ SSL: NOT REQUIRED</p>
          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px;">
            <button class="rp-btn" onclick="alert('SYN-ACK sent!'); this.closest('.rp-window').remove()">💕 Send SYN-ACK</button>
          </div>
        </div>
      `
    },
    {
      title: '👻 CURSED 1998 CHAIN LETTER! DO NOT CLOSE! 👻',
      flashClass: 'flash-rainbow',
      titleFlash: true,
      sound: 'siren',
      content: `
        <div>
          <div class="blink-txt" style="color: #4b0082; font-weight: bold; margin-bottom: 4px;">⚡ FORWARD TO 10 ICQ CONTACTS OR BE CURSED! ⚡</div>
          <p style="font-size: 10px; line-height: 1.4; margin: 4px 0;">In 1998, Billy closed this popup without sending it. 5 minutes later, his mouse trackball mysteriously vanished forever!</p>
          <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px;">
            <button class="rp-btn" onclick="alert('Sent to 10 ICQ contacts!'); this.closest('.rp-window').remove()">✉️ Send to ICQ</button>
          </div>
        </div>
      `
    },
    {
      title: '🔥 POPUP FROM HELL (HYDRA EFFECT) 🔥',
      flashClass: 'flash-casino',
      titleFlash: true,
      hydra: true,
      sound: 'siren',
      content: `
        <div style="background: #000; color: #ff0000; padding: 6px; text-align: center;">
          <div class="blink-txt" style="font-weight: bold; font-size: 12px;">🔥 CLOSING THIS SPAWNS 2 MORE! 🔥</div>
          <p style="font-size: 10px; color: #ffff00; margin: 4px 0;">Tomas Petricek's 1998 Hydra Protocol Activated.</p>
        </div>
      `
    },
    {
      title: '💿 YOU WON 5,000 HOURS OF AOL TRIAL CD-ROMS! 💿',
      flashClass: 'flash-rainbow',
      sound: 'casino',
      content: `
        <div style="text-align: center;">
          <p style="font-size: 11px; margin: 4px 0;"><strong>America Online 4.0</strong> is mailing 250 free tin CD cases directly to your home address!</p>
          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px;">
            <button class="rp-btn" onclick="alert('CDs dispatched via US Postal Service!'); this.closest('.rp-window').remove()">📬 Claim Free AOL CDs</button>
          </div>
        </div>
      `
    },
    {
      title: '⚠️ SUBSEVEN TROJAN DETECTED ON PORT 31337! ⚠️',
      flashClass: 'flash-hazard',
      sound: 'siren',
      content: `
        <div>
          <p style="color: #990000; font-weight: bold; margin: 0 0 4px 0;">Remote hacker connected via Telnet!</p>
          <p style="font-size: 10px; margin: 4px 0;">Incoming payload: inverted wallpaper &amp; phantom CD tray opening.</p>
          <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px;">
            <button class="rp-btn" onclick="alert('65,535-byte Ping of Death sent!'); this.closest('.rp-window').remove()">💥 Ping of Death</button>
          </div>
        </div>
      `
    }
  ];

  function spawnPopup(custom = null) {
    const data = custom || POPUPS[Math.floor(Math.random() * POPUPS.length)];
    const win = document.createElement('div');
    win.className = 'rp-window ' + (data.flashClass || 'flash-rainbow');
    win.style.left = Math.max(20, Math.floor(Math.random() * (window.innerWidth - 360))) + 'px';
    win.style.top = Math.max(20, Math.floor(Math.random() * (window.innerHeight - 260))) + 'px';
    win.style.zIndex = ++zIdx;

    if (data.sound) playChime(data.sound);

    win.innerHTML = `
      <div class="rp-title ${data.titleFlash ? 'title-flash' : ''}">
        <span>${data.title}</span>
        <span class="rp-close">✕</span>
      </div>
      <div class="rp-body">
        ${data.content}
        <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:8px;">
          <button class="rp-btn close-btn">Close</button>
        </div>
      </div>
    `;

    function closeWin() {
      win.remove();
      chrome.storage.local.get(['hydraMode'], (st) => {
        if (data.hydra || st.hydraMode !== false && Math.random() < 0.25) {
          setTimeout(() => spawnPopup(), 150);
          setTimeout(() => spawnPopup(), 350);
        }
      });
    }

    win.querySelector('.rp-close').onclick = closeWin;
    const closeBtn = win.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = closeWin;

    // Evasive button fun
    const evasiveBtn = win.querySelector('.evasive-btn');
    if (evasiveBtn) {
      evasiveBtn.onmouseenter = () => {
        const ox = (Math.random() - 0.5) * 120;
        const oy = (Math.random() - 0.5) * 60;
        evasiveBtn.style.transform = `translate(${ox}px, ${oy}px)`;
      };
      evasiveBtn.onclick = () => {
        alert('You caught the evasive button! 🏆');
        win.remove();
      };
    }

    // Dragging support
    const titleBar = win.querySelector('.rp-title');
    let isDragging = false, startX, startY, origX, origY;
    titleBar.onmousedown = (e) => {
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      origX = win.offsetLeft; origY = win.offsetTop;
      win.style.zIndex = ++zIdx;
      const onMove = (ev) => {
        if (!isDragging) return;
        win.style.left = (origX + ev.clientX - startX) + 'px';
        win.style.top = (origY + ev.clientY - startY) + 'px';
      };
      const onUp = () => {
        isDragging = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };

    container.appendChild(win);
  }

  // Periodic automatic spawner (every 8 seconds when active, max 5 popups)
  setInterval(() => {
    chrome.storage.local.get(['enabled'], (res) => {
      if (res.enabled !== false) {
        if (container.children.length < 5) spawnPopup();
      }
    });
  }, 8000);

  chrome.runtime.onMessage.addListener((req) => {
    if (req.action === 'SPAWN_NOW') spawnPopup();
    if (req.action === 'CLEAR_ALL') container.innerHTML = '';
  });
})();
