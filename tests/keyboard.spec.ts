import { expect, test } from "@playwright/test";
import { stations } from "../src/content/cv";

test("3D walk: keyboard reaches every station via the mini-map, arrows step through", async ({ page }) => {
  await page.goto("./?mode=3d");
  await expect(page.locator("section.walk3d")).toBeVisible({ timeout: 20_000 });
  for (const s of stations) {
    const b = page.getByRole("button", { name: `${s.n} ${s.short}: ${s.title}` });
    await b.focus();
    await expect(b).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator(".overlay .spanel h3")).toHaveText(s.title, { timeout: 8000 });
    await expect(b).toHaveAttribute("aria-current", "step");
  }
  // Arrow keys: back one station, then forward again.
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".overlay .spanel h3")).toHaveText(stations[4].title, { timeout: 8000 });
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".overlay .spanel h3")).toHaveText(stations[5].title, { timeout: 8000 });
});

test("focus is visible on interactive elements", async ({ page }) => {
  await page.goto("./?mode=2d");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((e) => getComputedStyle(e).outlineStyle);
  expect(outline).not.toBe("none");
});

test("project viewer: open with keyboard, page through, close returns focus", async ({ page }) => {
  await page.goto("./?mode=2d");
  const first = page.locator(".stone").first();
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("1 / 4")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("2 / 4")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open the files on GitHub/ })).toHaveAttribute("href", /finance-portfolio\/tree\/main\/01-substrate-capital/);
  await page.keyboard.press("Escape");
  await expect(first).toBeFocused();
});
