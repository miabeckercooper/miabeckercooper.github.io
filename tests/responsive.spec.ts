import { expect, test } from "@playwright/test";
import { noHorizontalScroll, scrollThrough } from "./helpers";

const SIZES = [
  { w: 390, h: 844, name: "390-phone" },
  { w: 820, h: 1180, name: "820-ipad-portrait" },
  { w: 1180, h: 820, name: "1180-ipad-landscape" },
  { w: 1440, h: 900, name: "1440-desktop" },
];

for (const s of SIZES) {
  for (const mode of ["3d", "2d"] as const) {
    test(`${s.name} ${mode}: no horizontal scroll, screenshots`, async ({ page }) => {
      await page.setViewportSize({ width: s.w, height: s.h });
      await page.goto(`./?mode=${mode}`);
      if (mode === "3d") {
        await expect(page.locator("section.walk3d")).toBeVisible({ timeout: 20_000 });
        await page.waitForTimeout(6000); // opening bell
      } else {
        await page.waitForTimeout(800);
      }
      await page.screenshot({ path: `docs/screenshots/${s.name}-${mode}-hero.png` });
      await scrollThrough(page);
      const r = await noHorizontalScroll(page);
      expect(r.scrollWidth).toBeLessThanOrEqual(r.innerWidth);
      if (mode === "2d") {
        await page.locator("#deals").scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await page.screenshot({ path: `docs/screenshots/${s.name}-2d-deals.png` });
        await page.locator("#models").scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await page.screenshot({ path: `docs/screenshots/${s.name}-2d-models.png` });
      } else {
        // Walk to station 05 and capture the panel.
        await page.getByRole("button", { name: /^05 / }).click();
        await page.waitForTimeout(2500);
        await page.screenshot({ path: `docs/screenshots/${s.name}-3d-station05.png` });
        const r2 = await noHorizontalScroll(page);
        expect(r2.scrollWidth).toBeLessThanOrEqual(r2.innerWidth);
      }
    });
  }
}
