import { expect, test } from "@playwright/test";

test("skip link is first and visibly focused", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  expect(await skip.evaluate((e) => getComputedStyle(e).outlineStyle)).not.toBe("none");
});

test("timeline: strips scroll with buttons and moments open the viewer from the keyboard", async ({ page }) => {
  await page.goto("./");
  const strip = page.locator("#esade .strip");
  await strip.scrollIntoViewIfNeeded();
  const before = await strip.evaluate((e) => e.scrollLeft);
  await page.getByRole("button", { name: "Scroll ESADE, Barcelona forward" }).click();
  await expect.poll(() => strip.evaluate((e) => e.scrollLeft)).toBeGreaterThan(before);
  const card = page.locator("#esade button.moment").first();
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Private client portfolio" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(card).toBeFocused();
});

test("project viewer: page through and link to GitHub", async ({ page }) => {
  await page.goto("./");
  const first = page.locator(".card").first();
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("1 / 4")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("2 / 4")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open the files on GitHub/ })).toHaveAttribute("href", /finance-portfolio\/tree\/main\/01-substrate-capital/);
  await page.keyboard.press("Escape");
  await expect(first).toBeFocused();
});
