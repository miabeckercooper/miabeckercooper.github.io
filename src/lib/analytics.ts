/**
 * Privacy-friendly visit counts via GoatCounter: no cookies, no personal data, no consent banner needed.
 * Switched on by setting VITE_GOATCOUNTER (the site code, e.g. "mbc") in .env. Empty = off.
 * Tip: give each application its own link, e.g. https://miabeckercooper.github.io/?r=firmname,
 * and the dashboard shows which link was opened (it counts visits, it never identifies people).
 */
export const GOATCOUNTER = (import.meta.env.VITE_GOATCOUNTER as string | undefined)?.trim() ?? "";

export function startAnalytics() {
  if (!GOATCOUNTER || typeof window === "undefined") return;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
  document.head.appendChild(s);
}
