/**
 * Renders public/og.png (1200×630) and public/apple-touch-icon.png from the built site's hero.
 * Needs a running preview (npm run preview). Run: npx tsx scripts/og-image.ts
 */
import { chromium } from "@playwright/test";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const url = process.env.OG_URL ?? "http://localhost:4173/";
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 694 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
await page.goto(url);
await page.addStyleTag({ content: ".btns, .lede, .eyebrow { display: none !important; } .hero { padding-top: 24px; } .hero h1 { font-size: 5.4rem; }" });
await page.waitForTimeout(1500);
await page.screenshot({ path: resolve(root, "public/og.png"), clip: { x: 0, y: 64, width: 1200, height: 630 } });
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.goto(`${url}favicon.svg`);
await icon.screenshot({ path: resolve(root, "public/apple-touch-icon.png") });
await browser.close();
console.log("og-image: wrote public/og.png and public/apple-touch-icon.png");
