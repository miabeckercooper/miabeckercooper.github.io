/**
 * Post-build: injects the server-rendered 2D page into dist/index.html (fast first paint, SEO, works without JS),
 * inlines the small stylesheet so it does not block rendering, and preloads the headline font.
 */
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);
const file = resolve(root, "dist/index.html");
let html = readFileSync(file, "utf8");
if (!html.includes("<!--app-->")) throw new Error("prerender: <!--app--> marker missing in dist/index.html");
html = html.replace("<!--app-->", render());

// Inline CSS (font URLs are relative to assets/, so rebase them).
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/assets\/([^"]+\.css)"[^>]*>/g, (_, f: string) => {
  const css = readFileSync(resolve(root, "dist/assets", f), "utf8").replace(/url\(\.\/([^)]+)\)/g, "url(./assets/$1)");
  return `<style>${css}</style>`;
});

// Preload the Latin subsets used above the fold: Bodoni Moda (headline, upright and italic) and Hanken Grotesk (body).
const fonts = readdirSync(resolve(root, "dist/assets")).filter((f) => /^(geist-latin-wght-normal|jetbrains-mono-latin-wght-normal)-.*\.woff2$/.test(f));
const preload = fonts.map((f) => `<link rel="preload" href="./assets/${f}" as="font" type="font/woff2" crossorigin>`).join("");
html = html.replace("</title>", `</title>${preload}`);

writeFileSync(file, html);
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerender: static HTML injected, CSS inlined, ${fonts.length} fonts preloaded`);
