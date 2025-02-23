let buttonInjected = false;

function checkScroll() {
  // Check if the user is at the bottom of the page
  const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

  if (scrolledToBottom && !buttonInjected) {
    injectButton();
    buttonInjected = true;
  }
}

function injectButton() {
  const button = document.createElement("button");
  button.innerText = "Open Popup";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.padding = "10px 20px";
  button.style.background = "#007bff";
  button.style.color = "white";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.zIndex = "1000";
  button.id = "scroll-popup-button";

  button.onclick = () => {
    chrome.runtime.sendMessage({ action: "openPopup" });
  };

  document.body.appendChild(button);
}

// Listen for scroll events
window.addEventListener("scroll", checkScroll);
