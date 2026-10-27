import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { scrollThrough } from "./helpers";

const serious = <T extends { impact?: string | null }>(v: T[]) => v.filter((x) => x.impact === "serious" || x.impact === "critical");

for (const scheme of ["dark"] as const) {
  test(`axe ${scheme}: 0 serious or critical`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
    await page.goto("./");
    await scrollThrough(page);
    await page.waitForTimeout(1500);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const bad = serious(r.violations);
    for (const v of bad) console.log(v.id, v.impact, v.nodes.slice(0, 4).map((n) => n.target.join(" ")));
    expect(bad).toEqual([]);
  });
}

test("axe on the open project viewer", async ({ page }) => {
  await page.goto("./");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.locator(".card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(500);
  const r = await new AxeBuilder({ page }).include(".viewer").analyze();
  expect(serious(r.violations)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
