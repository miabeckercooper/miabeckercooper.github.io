# miabeckercooper.github.io

Mia Becker-Cooper's interactive CV: an editorial profile with her photo, a four-chapter swipeable timeline (Bristol, ESADE, ANDBank, CEMS at CBS), four live models, 11 projects with a screenshot viewer, leadership and an about-me section. Light and dark mode; works without JavaScript.

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
| Bundle budget: initial JS ≤ 150 KB gz | part of `npm run build` (writes `dist/bundle-report.txt`) | yes |
| Responsive (390/820/1180/1440 px, no horizontal scroll), reduced motion, no-JS, thesis not public, axe-core, keyboard | `npm run build && npm test` | no (run before each milestone; screenshots in `docs/screenshots/`) |

`npm test` uses the pre-installed Chromium (`PW_CHROMIUM` to override).

## How it is built

- Vite + React + TypeScript. The page is prerendered at build time (`scripts/prerender.ts`) so it paints instantly, ranks, and works without JavaScript.
- Photos of Mia live in `source/photos/` and are resized to WebP + JPEG in `public/photos` during the build.
- Live models (`src/sections/models/`) load when the section nears the viewport. Monte Carlo and GBM are simulations and are labelled as such; the DCF grid and backtest variants are the report numbers.
- Screenshots: `scripts/optimise-images.ts` makes WebP + JPEG at 160/480/800 px in `public/shots` during the build.
- Open Graph image: `npx tsx scripts/og-image.ts` with `npm run preview` running regenerates `public/og.png` from the hero.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`.

One-time settings (GitHub → this repo → Settings):
1. **Pages → Source: GitHub Actions.**
2. **General → Repository name: `miabeckercooper.github.io`** (no trailing hyphen). Only that exact name is served at https://miabeckercooper.github.io; under any other name the site is at `https://miabeckercooper.github.io/<repo-name>/`. The build adapts its canonical and Open Graph URLs to whichever name the repo has.

## Privacy rules (from CLAUDE.md)

No phone number anywhere. The thesis and defence deck never go on the public site or in this (public) repo: the site shows the title and 85% grade, and the files live on a private, access-controlled page shared with selected recruiters. ANDBank figures follow the CV, with no client names, holdings or internal files. Teammates are credited, and backtests are marked as simulated.

## Visitor counts

GoatCounter (free, no cookies, no personal data). Set `VITE_GOATCOUNTER=<site code>` in `.env`; empty means off.
Give each application its own link (`https://miabeckercooper.github.io/?r=firmname`) to see which link was opened. It counts visits; it never identifies people.

## Working with other AI tools or people

Anyone (or any AI tool) editing this repo must follow CLAUDE.md and source/FACTS.md. Make changes on a branch and open a pull request rather than pushing to `main`. The build refuses to deploy if a number in `src/content/cv.ts` is not in FACTS.md.
