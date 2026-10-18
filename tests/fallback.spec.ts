import { expect, test } from "@playwright/test";
import { assertFull2D, SECTIONS } from "./helpers";

test.describe("prefers-reduced-motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("renders the full 2D version with every section", async ({ page }) => {
    await assertFull2D(page);
  });
});

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("prerendered HTML contains every section and the headline", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Decompose.");
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
    await expect(page.locator(".stones > li")).toHaveCount(11);
  });
});

test("WebGL available: 3D walk loads in its own chunk", async ({ page }) => {
  const chunks: string[] = [];
  page.on("request", (r) => { if (r.url().endsWith(".js")) chunks.push(r.url()); });
  await page.goto("./");
  await expect(page.locator("section.walk3d canvas")).toBeVisible({ timeout: 20_000 });
  expect(chunks.some((u) => /Walk3D-/.test(u))).toBe(true);
});
