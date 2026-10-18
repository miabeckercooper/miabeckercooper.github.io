import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/source-serif-4/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./styles/tokens.css";
import "./styles/base.css";
import { App } from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// The production build is prerendered (scripts/prerender.ts); dev renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
