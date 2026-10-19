/**
 * source/screenshots/*.jpg → public/shots/<name>-<w>.{webp,jpg} at 480 and 800 px, plus 160 px thumbnails.
 * Skips files that are already up to date. Run: npm run images
 */
import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "source/screenshots");
const out = resolve(root, "public/shots");
mkdirSync(out, { recursive: true });

const WIDTHS = [160, 480, 800];
let made = 0;
for (const f of readdirSync(src).filter((f) => /\.jpe?g$/i.test(f))) {
  const name = basename(f).replace(/\.jpe?g$/i, "");
  const input = resolve(src, f);
  const mtime = statSync(input).mtimeMs;
  for (const w of WIDTHS) {
    for (const ext of ["webp", "jpg"] as const) {
      const target = resolve(out, `${name}-${w}.${ext}`);
      if (existsSync(target) && statSync(target).mtimeMs >= mtime) continue;
      const img = sharp(input).resize({ width: w, withoutEnlargement: true });
      await (ext === "webp" ? img.webp({ quality: 78 }) : img.jpeg({ quality: 80, mozjpeg: true })).toFile(target);
      made++;
    }
  }
}
// Photos of Mia: source/photos/*.jpg → public/photos/<name>-<w>.{webp,jpg}
const psrc = resolve(root, "source/photos");
const pout = resolve(root, "public/photos");
mkdirSync(pout, { recursive: true });
for (const f of readdirSync(psrc).filter((f) => /\.jpe?g$/i.test(f))) {
  const name = basename(f).replace(/\.jpe?g$/i, "");
  const input = resolve(psrc, f);
  const mtime = statSync(input).mtimeMs;
  for (const w of [480, 960, 1440]) {
    for (const ext of ["webp", "jpg"] as const) {
      const target = resolve(pout, `${name}-${w}.${ext}`);
      if (existsSync(target) && statSync(target).mtimeMs >= mtime) continue;
      const img = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
      await (ext === "webp" ? img.webp({ quality: 80 }) : img.jpeg({ quality: 82, mozjpeg: true })).toFile(target);
      made++;
    }
  }
}
console.log(`images: ${made} files written to public/shots and public/photos`);
