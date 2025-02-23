chrome.runtime.onInstalled.addListener(() => {
    console.log('AutoQuiz Extension Installed');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
  
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: extractText,
      }, (result) => {
        const extractedText = result[0].result;
        
        // Send this text to the backend
        fetch('http://localhost:5000/api/quiz/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: extractedText }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Quiz Data:', data);
          });
      });
    });
  });
  
  function extractText() {
    return document.body.innerText;
  }
  