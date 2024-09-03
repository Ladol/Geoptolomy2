let isMonitoring = false;

// Load the saved state from storage
chrome.storage.local.get(['isMonitoring'], (result) => {
  isMonitoring = result.isMonitoring || false;
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (isMonitoring) {
      const url = details.url;
      console.info(url);
      if (url.includes("GeoPhotoService")) {
        fetch('http://127.0.0.1:5000/receive-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
        })
        .then(response => console.log("URL sent to Python server:", url))
        .catch(error => console.error("Failed to send URL:", error));
      }
    }
  },
  { urls: ["*://maps.googleapis.com/*"] },
  []
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "toggleMonitoring") {
    isMonitoring = !isMonitoring;
    // Save the updated state to storage
    chrome.storage.local.set({ isMonitoring: isMonitoring }, () => {
      sendResponse({ isMonitoring });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
