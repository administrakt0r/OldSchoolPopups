document.addEventListener('DOMContentLoaded', async () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const statusText = document.getElementById('status-text');
  const soundChk = document.getElementById('sound-chk');
  const hydraChk = document.getElementById('hydra-chk');
  const spawnNowBtn = document.getElementById('spawn-now-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');

  let state = await chrome.storage.local.get(['enabled', 'soundEnabled', 'hydraMode']);
  let isEnabled = state.enabled !== false;
  soundChk.checked = state.soundEnabled !== false;
  hydraChk.checked = state.hydraMode !== false;

  function updateUI() {
    statusText.textContent = isEnabled ? 'ACTIVE' : 'PAUSED';
    statusText.style.color = isEnabled ? 'green' : 'red';
    toggleBtn.textContent = isEnabled ? 'PAUSE NOSTALGIA' : 'START NOSTALGIA';
  }
  updateUI();

  toggleBtn.addEventListener('click', async () => {
    isEnabled = !isEnabled;
    await chrome.storage.local.set({ enabled: isEnabled });
    updateUI();
  });

  soundChk.addEventListener('change', async () => {
    await chrome.storage.local.set({ soundEnabled: soundChk.checked });
  });

  hydraChk.addEventListener('change', async () => {
    await chrome.storage.local.set({ hydraMode: hydraChk.checked });
  });

  spawnNowBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'SPAWN_NOW' });
      }
    });
  });

  clearAllBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'CLEAR_ALL' });
      }
    });
  });
});