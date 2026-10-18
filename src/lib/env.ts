/** Runtime capability checks. All are safe to call during SSR (they return the 2D answer). */
export const isBrowser = typeof window !== "undefined";

export function prefersReducedMotion(): boolean {
  return isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The inline script in index.html sets html.mode-3d before first paint when WebGL is available and
 * reduced motion is off. ?mode=2d or ?mode=3d forces a mode (used by tests and for comparison).
 */
export const use3DMode = () => isBrowser && document.documentElement.classList.contains("mode-3d");

export const showFps = () => isBrowser && new URLSearchParams(location.search).has("fps");

/** Calls back on the first scroll/touch/key/pointer input, or ~2.5 s after load when the main thread is idle. */
export function when3DWanted(cb: () => void): () => void {
  let done = false;
  const events = ["pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
  let timer = 0;
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(fire, { timeout: 1000 }) : fire());
  const onLoad = () => { timer = window.setTimeout(idle, 2500); };
  function cleanup() {
    events.forEach((e) => window.removeEventListener(e, fire));
    window.removeEventListener("load", onLoad);
    clearTimeout(timer);
  }
  events.forEach((e) => window.addEventListener(e, fire, { passive: true, once: true }));
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);
  return cleanup;
}
