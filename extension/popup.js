// Load the initial state and update the button text
chrome.storage.local.get(['isMonitoring'], (result) => {
    const isMonitoring = result.isMonitoring || false;
    document.getElementById('toggleButton').textContent = isMonitoring ? 'Stop' : 'Start';
  });
  
  document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: "toggleMonitoring" }, (response) => {
      const isMonitoring = response.isMonitoring;
      document.getElementById('toggleButton').textContent = isMonitoring ? 'Stop' : 'Start';
    });
  });
  