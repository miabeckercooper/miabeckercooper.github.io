/**
 * Facts gate. Every number, %, and €/$/CHF figure in src/content/cv.ts must appear in source/FACTS.md.
 *
 * - Reads string and number literals from cv.ts (comments ignored).
 * - Normalises: thousands separators, unicode minus, "~", "+", "<" and spacing are ignored;
 *   the currency and unit (%, pp, bps, M, k) must match.
 * - Matches whole tokens only, so "24" does not pass because "2024" exists.
 * - Also fails on anything that looks like a phone number in cv.ts or index.html.
 *
 * Run: npm run check-facts
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const cvSrc = readFileSync(resolve(root, "src/content/cv.ts"), "utf8");
const facts = readFileSync(resolve(root, "source/FACTS.md"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");

type Tok = { raw: string; key: string; bare: string };

// A figure: optional currency, a number, optional unit. Not preceded by a letter, digit or dot (skips "S0", "P10", "s01").
const FIG =
  /(?<![A-Za-z\d.])(CHF\s?|€|\$)?[~+<≥−-]?\s?(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(?:\s?(%|pp|bps|M\b|k\b))?/g;

const canon = (n: string) => String(parseFloat(n.replace(/,/g, "")));

function figures(text: string): Tok[] {
  const out: Tok[] = [];
  for (const m of text.matchAll(FIG)) {
    const cur = (m[1] ?? "").replace(/\s/g, "");
    const num = canon(m[2]);
    const unit = m[3] ?? "";
    out.push({ raw: m[0].trim(), key: `${cur}${num}${unit}`, bare: num });
  }
  return out;
}

/** Pull string literals (', ", `) and numeric literals out of TS source, skipping comments. */
function literals(src: string): { strings: string[]; numbers: string[] } {
  const strings: string[] = [];
  const numbers: string[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (c === "/" && n === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "/" && n === "*") { i = src.indexOf("*/", i + 2) + 2; continue; }
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1, s = "";
      while (j < src.length && src[j] !== c) { if (src[j] === "\\") { s += src[j + 1]; j += 2; continue; } s += src[j++]; }
      strings.push(s); i = j + 1; continue;
    }
    if (/[\d]/.test(c) && !/[A-Za-z_$\d.]/.test(src[i - 1] ?? "")) {
      const m = /^\d+(?:\.\d+)?/.exec(src.slice(i))!;
      numbers.push(m[0]); i += m[0].length; continue;
    }
    i++;
  }
  return { strings, numbers };
}

const factToks = figures(facts);
const factKeys = new Set(factToks.map((t) => t.key));
const factBare = new Set(factToks.map((t) => t.bare));

const { strings, numbers } = literals(cvSrc);
const rows: { raw: string; ok: boolean; how: string }[] = [];

for (const s of strings) {
  for (const t of figures(s)) {
    const withUnit = t.key !== t.bare;
    const ok = withUnit ? factKeys.has(t.key) : factBare.has(t.bare);
    rows.push({ raw: t.raw, ok, how: withUnit ? `figure ${t.key}` : `number ${t.bare}` });
  }
}
for (const n of numbers) {
  const b = canon(n);
  rows.push({ raw: n, ok: factBare.has(b), how: `literal ${b}` });
}

// Phone numbers: 9+ digits with optional spaces, dots, dashes or brackets, optionally after "+".
const PHONE = /(?:\+|00)\d[\d\s().-]{7,}\d|\b\d{3}[\s.-]\d{3}[\s.-]\d{3,4}\b/g;
const phones = [...cvSrc.matchAll(PHONE), ...html.matchAll(PHONE)].map((m) => m[0]);

const unique = new Map<string, (typeof rows)[number]>();
for (const r of rows) if (!unique.has(r.raw + r.how)) unique.set(r.raw + r.how, r);
const list = [...unique.values()];
const misses = list.filter((r) => !r.ok);

console.log(`check-facts: ${list.length} distinct figures in cv.ts, ${list.length - misses.length} found in FACTS.md`);
if (process.argv.includes("--verbose")) for (const r of list) console.log(`  ${r.ok ? "ok  " : "MISS"} ${r.raw.padEnd(16)} ${r.how}`);

if (misses.length || phones.length) {
  for (const r of misses) console.error(`  MISS ${r.raw}  (${r.how}) is not in source/FACTS.md`);
  for (const p of phones) console.error(`  PHONE-LIKE "${p}" found. No phone numbers on the site.`);
  process.exit(1);
}
console.log("check-facts: pass");
