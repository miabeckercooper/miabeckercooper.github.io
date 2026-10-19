import type { Page } from "@playwright/test";

export const SECTIONS = ["timeline", "bristol", "esade", "andbank", "cbs", "method", "models", "projects", "leadership", "about", "contact"];

/** Scroll the whole page in steps so lazy sections and images load. */
export async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

export async function noHorizontalScroll(page: Page) {
  return page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
}
