chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    soundEnabled: true,
    hydraMode: true
  });
});
