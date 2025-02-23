// import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./components/popup";

const root = document.getElementById("react-popup-root");
if (root) {
  ReactDOM.createRoot(root).render(<Popup />);
}
