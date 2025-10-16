import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Prevent copy / cut / context menu and text selection outside explicitly allowed areas.
// If you need to allow selection in a region, add class "allow-select" to that element.
const allowSelector = ".allow-select, .allow-select *";

function isAllowed(target) {
  return target.closest && target.closest(allowSelector);
}

// Keep blocking copy & cut, but ALLOW context menu so dev tools can be opened.
["copy", "cut"].forEach((evt) => {
  document.addEventListener(evt, (e) => {
    if (!isAllowed(e.target)) e.preventDefault();
  });
});

// If you still want to block right click on specific elements, add a listener there.

// Additional guard to prevent selection start via mouse drag.
document.addEventListener("selectstart", (e) => {
  if (!isAllowed(e.target)) {
    e.preventDefault();
  }
});
