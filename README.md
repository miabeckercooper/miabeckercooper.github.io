# miabeckercooper.github.io

Mia Becker-Cooper's interactive CV: "The Trading Floor". A 3D candlestick career walk, four live models, a deal wall of 11 projects, experience, leadership and contact. It falls back to a polished 2D version when WebGL is missing or reduced motion is on.

Live: https://miabeckercooper.github.io (see "Deploy" for the repo-name note).

## Edit the content (from the iPad, in the GitHub app or github.com)

1. Every word and number on the site is in **`src/content/cv.ts`**. Open it, tap the pencil, edit, and commit to `main`.
2. Every number you use must already be in **`source/FACTS.md`**. Add new facts there first, in the same commit.
3. Missing facts are written as `{ todo: "..." }` and show on the site as a dashed **TODO** box (for example, your role on group projects 02–11). Replace a TODO with plain text once the fact is in FACTS.md.
4. To add or replace project screenshots, upload `sNN-pX.jpg` files to `source/screenshots/` and list them in that project's `shots` in cv.ts.

Pushing to `main` rebuilds and redeploys automatically in about two minutes (Actions tab → "Deploy to GitHub Pages").

## Checks

| Check | Command | Runs in CI |
|---|---|---|
| Facts gate: every number, % and €/$/CHF figure in cv.ts must appear in FACTS.md; no phone numbers | `npm run check-facts` (`-- --verbose` lists each figure) | yes, first step of the build |
| Typecheck | `npm run typecheck` | yes |
| Bundle budgets: initial JS ≤ 150 KB gz, 3D chunk ≤ 450 KB gz | part of `npm run build` (writes `dist/bundle-report.txt`) | yes |
| Responsive (390/820/1180/1440 px, no horizontal scroll), 2D fallback with WebGL off, reduced motion, no-JS, axe-core, keyboard | `npm run build && npm test` | no (run before each milestone; screenshots in `docs/screenshots/`) |

`npm test` uses the pre-installed Chromium (`PW_CHROMIUM` to override) with SwiftShader for WebGL. Add `?mode=2d` or `?mode=3d` to the URL to force a version, and `?fps` to show a live frame counter (useful on the iPad).

## How it is built

- Vite + React + TypeScript. The page is prerendered at build time (`scripts/prerender.ts`) so it paints instantly, ranks, and works without JavaScript.
- The 3D walk (`src/three/`, React Three Fiber + drei + postprocessing bloom, GSAP ScrollTrigger + Lenis, Framer Motion panels) is a separate lazy chunk. It mounts on first interaction or once the page is idle, after the 2D hero has painted. DPR is capped at 1.5, with adaptive DPR, and bloom drops out if frames fall below 50 fps.
- Live models (`src/sections/models/`) load when the section nears the viewport. Monte Carlo and GBM are simulations and are labelled as such; the DCF grid and backtest variants are the report numbers.
- Screenshots: `scripts/optimise-images.ts` makes WebP + JPEG at 160/480/800 px in `public/shots` during the build.
- Open Graph image: `npx tsx scripts/og-image.ts` with `npm run preview` running regenerates `public/og.png` from the hero.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`.

One-time settings (GitHub → this repo → Settings):
1. **Pages → Source: GitHub Actions.**
2. **General → Repository name: `miabeckercooper.github.io`** (no trailing hyphen). Only that exact name is served at https://miabeckercooper.github.io; under any other name the site is at `https://miabeckercooper.github.io/<repo-name>/`. The build adapts its canonical and Open Graph URLs to whichever name the repo has.

## Privacy rules (from CLAUDE.md)

No phone number anywhere. The thesis and defence deck are not published: only the title and the 85% grade appear. ANDBank figures follow the CV, with no client names, holdings or internal files. Teammates are credited, and backtests are marked as simulated.
