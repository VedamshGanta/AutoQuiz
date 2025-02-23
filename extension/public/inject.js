if (!document.getElementById("react-popup-container")) {
    const container = document.createElement("div");
    container.id = "react-popup-container";
    container.style.position = "fixed";
    container.style.bottom = "80px";
    container.style.right = "20px";
    container.style.width = "250px";
    container.style.background = "white";
    container.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.zIndex = "1000";
  
    const root = document.createElement("div");
    root.id = "react-popup-root";
    container.appendChild(root);
  
    document.body.appendChild(container);
  
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("popup.js");
    document.body.appendChild(script);
  }
  