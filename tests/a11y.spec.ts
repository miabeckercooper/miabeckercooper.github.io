import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { scrollThrough } from "./helpers";

const serious = <T extends { impact?: string | null }>(v: T[]) => v.filter((x) => x.impact === "serious" || x.impact === "critical");

for (const scheme of ["light", "dark"] as const) {
  for (const mode of ["2d", "3d"] as const) {
    test(`axe ${mode} ${scheme}: 0 serious or critical`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(`./?mode=${mode}`);
      if (mode === "3d") await expect(page.locator("section.walk3d")).toBeVisible({ timeout: 20_000 });
      await scrollThrough(page);
      await page.waitForTimeout(2500); // count-ups and transitions settle
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const bad = serious(r.violations);
      for (const v of bad) console.log(v.id, v.impact, v.nodes.slice(0, 3).map((n) => n.target.join(" ")));
      expect(bad).toEqual([]);
    });
  }
}

test("axe on the open project viewer", async ({ page }) => {
  await page.goto("./?mode=2d");
  await page.locator("#deals").scrollIntoViewIfNeeded();
  await page.locator(".stone").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(500);
  const r = await new AxeBuilder({ page }).include(".viewer").analyze();
  expect(serious(r.violations)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
