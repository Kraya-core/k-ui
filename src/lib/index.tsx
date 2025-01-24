import React from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App";

const domNode = document.getElementById("root") as Container;
const root = createRoot(domNode);
root.render(<App />);
