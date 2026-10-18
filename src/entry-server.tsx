import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";

/** Static HTML of the 2D page, injected into dist/index.html at build time for fast paint, SEO and no-JS. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
