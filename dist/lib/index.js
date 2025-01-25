import { jsx as _jsx } from "react/jsx-runtime";
import "../global.css";
import { createRoot } from "react-dom/client";
import App from "./App";
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(_jsx(App, {}));
