import { test } from "@playwright/test";
import { assertFull2D } from "./helpers";

// WebGL switched off in the browser itself.
test.use({ launchOptions: { executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--disable-webgl", "--disable-3d-apis"] } });

test("WebGL disabled: renders the full 2D version with every section", async ({ page }) => {
  await assertFull2D(page);
});
