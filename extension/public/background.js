chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openPopup") {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        files: ["inject.js"]
      });
    }
  });
  