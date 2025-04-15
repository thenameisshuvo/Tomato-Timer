import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18+
import TomatoTimer from "./Components/Tomatotimer.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// Create root and render component
const root = ReactDOM.createRoot(document.getElementById("TomatoTimer"));
root.render(<TomatoTimer />);

// Register service worker (if needed)
registerServiceWorker();
