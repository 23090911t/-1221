// frontend/src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // 若無可自行刪除或建立

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
