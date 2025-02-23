// content.js
const extractedText = document.body.innerText;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extract') {
    sendResponse({ text: extractedText });
  }
});
