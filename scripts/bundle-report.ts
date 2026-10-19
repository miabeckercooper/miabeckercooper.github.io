/**
 * Gzipped size of every JS chunk in dist, grouped into: initial (loaded by index.html, plus its static imports)
 * and lazy chunks. Fails if a budget is exceeded.
 * Budget: initial ≤ 150 KB gz (the 3D walk was removed in the redesign).
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const assets = resolve(dist, "assets");
const html = readFileSync(resolve(dist, "index.html"), "utf8");
const files = readdirSync(assets).filter((f) => f.endsWith(".js"));
const code = (f: string) => readFileSync(resolve(assets, f), "utf8");
const gz = (f: string) => gzipSync(readFileSync(resolve(assets, f)), { level: 9 }).length;

// Static imports: `import ... from "./x.js"` / `import "./x.js"` (not dynamic import()).
const staticDeps = (f: string) =>
  [...code(f).matchAll(/(?:^|[;\s}])import\s*(?:[\w*{}\s,$]+from\s*)?["']\.\/([^"']+\.js)["']/g)].map((m) => m[1]);
const dynDeps = (f: string) => [...code(f).matchAll(/import\(\s*["'`]\.\/([^"'`]+\.js)["'`]\s*\)/g)].map((m) => m[1]);

function closure(entry: string[], seen = new Set<string>()) {
  const stack = [...entry];
  while (stack.length) { const f = stack.pop()!; if (seen.has(f)) continue; seen.add(f); stack.push(...staticDeps(f)); }
  return seen;
}

const entries = [...html.matchAll(/assets\/([^"']+\.js)/g)].map((m) => m[1]);
const initial = closure(entries);
const lazyRoots = [...new Set([...initial].flatMap(dynDeps))].filter((f) => !initial.has(f));
const groups = lazyRoots.map((r) => {
  const all = closure([r]);
  const own = [...all].filter((f) => !initial.has(f));
  return { root: r, files: own, kb: own.reduce((a, f) => a + gz(f), 0) / 1024 };
});
const kb = (s: Set<string> | string[]) => [...s].reduce((a, f) => a + gz(f), 0) / 1024;
const initialKb = kb(initial);

const lines = [
  "Bundle report (gzip -9)",
  "",
  `Initial JS: ${initialKb.toFixed(1)} KB  (budget 150 KB)`,
  ...[...initial].map((f) => `  ${f.padEnd(44)} ${(gz(f) / 1024).toFixed(1)} KB`),
  "",
  ...groups.map((g) => [`Lazy: ${g.root} → ${g.kb.toFixed(1)} KB`,
    ...g.files.map((f) => `  ${f.padEnd(44)} ${(gz(f) / 1024).toFixed(1)} KB`)].join("\n")),
  "",
  `All JS files: ${files.length}`,
];
const report = lines.join("\n");
console.log(report);
writeFileSync(resolve(dist, "bundle-report.txt"), report + "\n");

let fail = false;
if (initialKb > 150) { console.error(`FAIL initial JS ${initialKb.toFixed(1)} KB > 150 KB`); fail = true; }
if (fail) process.exit(1);
