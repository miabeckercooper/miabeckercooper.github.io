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
const page = await browser.newPage({ viewport: { width: 1200, height: 686 }, deviceScaleFactor: 1 });
await page.goto(`${url}?mode=3d`);
await page.locator("section.walk3d canvas").waitFor({ timeout: 30_000 });
await page.addStyleTag({ content: ".walknav, .walk-skip, .btns, .lede { display: none !important; }" });
await page.waitForTimeout(16_000); // let the opening bell finish under software WebGL
await page.screenshot({ path: resolve(root, "public/og.png"), clip: { x: 0, y: 56, width: 1200, height: 630 } });
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.goto(`${url}favicon.svg`);
await icon.screenshot({ path: resolve(root, "public/apple-touch-icon.png") });
await browser.close();
console.log("og-image: wrote public/og.png and public/apple-touch-icon.png");
