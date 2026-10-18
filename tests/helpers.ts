import { expect, type Page } from "@playwright/test";

export const SECTIONS = ["career", "method", "models", "deals", "experience", "leadership", "contact"];

/** Scroll the whole page in steps so lazy sections and images load. */
export async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

export async function noHorizontalScroll(page: Page) {
  return page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
}

export async function assertFull2D(page: Page) {
  await page.goto("./");
  await expect(page.locator("html")).not.toHaveClass(/mode-3d/);
  await expect(page.locator("section.walk3d")).toHaveCount(0);
  await expect(page.locator("svg.floor-svg")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Decompose.");
  for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.locator(".tl > li")).toHaveCount(6);
  await expect(page.locator(".stones > li")).toHaveCount(11);
  await scrollThrough(page);
  await expect(page.getByRole("tab")).toHaveCount(4);
}

