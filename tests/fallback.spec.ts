import { expect, test } from "@playwright/test";
import { SECTIONS } from "./helpers";

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("prerendered HTML contains every section, the headline and the photos", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Decompose.");
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
    await expect(page.locator(".cards > li")).toHaveCount(11);
    await expect(page.locator(".chapter")).toHaveCount(4);
    await expect(page.locator(".hero .arch img")).toBeVisible();
  });
});

test.describe("prefers-reduced-motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("ticker stops moving and the page is complete", async ({ page }) => {
    await page.goto("./");
    const anim = await page.locator(".ticker ul").evaluate((e) => getComputedStyle(e).animationName);
    expect(anim).toBe("none");
    await expect(page.getByRole("tab")).toHaveCount(0); // models load on approach
    await page.locator("#models").scrollIntoViewIfNeeded();
    await expect(page.getByRole("tab")).toHaveCount(4);
  });
});

test("thesis is not published on the public site", async ({ page, request }) => {
  await page.goto("./");
  const thesis = page.locator(".moment.thesis");
  await expect(thesis).toContainText("85%");
  await expect(thesis).toContainText("on request");
  const html = await (await request.get("./")).text();
  expect(html).not.toMatch(/thesis[^"]*\.pdf|defen[cs]e[^"]*\.pdf/i);
});
