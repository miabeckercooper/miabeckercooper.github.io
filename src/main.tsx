import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/terminal.css";
import { App } from "./App";
import { startAnalytics } from "./lib/analytics";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// The production build is prerendered (scripts/prerender.ts); dev renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

startAnalytics();
