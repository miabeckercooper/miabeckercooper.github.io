import { expect, test } from "@playwright/test";
import { noHorizontalScroll, scrollThrough } from "./helpers";

const SIZES = [
  { w: 390, h: 844, name: "390-phone" },
  { w: 820, h: 1180, name: "820-ipad-portrait" },
  { w: 1180, h: 820, name: "1180-ipad-landscape" },
  { w: 1440, h: 900, name: "1440-desktop" },
];

for (const s of SIZES) {
  test(`${s.name}: no horizontal scroll, screenshots`, async ({ page }) => {
    await page.setViewportSize({ width: s.w, height: s.h });
    await page.goto("./");
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `docs/screenshots/${s.name}-hero.png` });
    await scrollThrough(page);
    const r = await noHorizontalScroll(page);
    expect(r.scrollWidth).toBeLessThanOrEqual(r.innerWidth);
    await page.getByRole("tab", { name: /02 MSc Finance/ }).click();
    for (const id of ["research", "esade", "models", "projects", "leadership", "about"]) {
      await page.evaluate((i) => document.getElementById(i)!.scrollIntoView({ behavior: "instant" }), id);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `docs/screenshots/${s.name}-${id}.png` });
    }
  });
}
