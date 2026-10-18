# Build plan: "The Trading Floor"

Status: waiting for Mia's OK. Nothing is built or deployed yet.

## 1. Headline options

| | Headline | Why it works |
|---|---|---|
| A (current, your phrasing) | Markets are the most interesting machine I've taken apart. | Memorable, says engineer and finance in one line. The bold 30%. |
| B | I take an investment apart before I put money behind it. | Says what you do for a PM or partner, not who you are. Most hiring-manager friendly. |
| C | Decompose. Model. Stress-test. Decide. | Your method as the headline; ties straight into the blueprint section. Coolest, least personal. |
| D | Trained as an engineer. Tested on live client books. | Leads with proof (ANDBank) and works well for wealth management and hedge fund readers. |

My recommendation: **A** as the headline, with D's idea in the subline ("Mechanical engineer turned finance professional. Risk tools for 30 client portfolios at ANDBank Monaco.") so the 5-second reader gets both the hook and a number.

## 2. File structure

```
.github/workflows/deploy.yml     build + check-facts + deploy to GitHub Pages on every push to main
index.html                       meta, OG, favicon, font preloads, no-JS fallback text
public/
  Mia_Becker-Cooper_CV.pdf       copied from source/cv (checked: no phone number)
  og.png                         1200×630, rendered from the hero by a script
  favicon.svg                    "MBC" ticker monogram
  shots/                         generated: sNN-pX.webp + .jpg, 3 widths each
scripts/
  check-facts.ts                 the facts gate (see section 5)
  optimise-images.ts             sharp: source/screenshots → public/shots (WebP + JPEG)
  og-image.ts                    Playwright screenshot of the hero → og.png
  bundle-report.ts               gzipped size per chunk, fails over budget
src/
  content/cv.ts                  ALL copy and numbers, typed. The only file Mia edits
  content/types.ts               Station, Project, Model, Kpi… types
  main.tsx, App.tsx              decides 3D vs 2D, mounts sections
  lib/                           webgl.ts (capability check), motion.ts (reduced motion), rng.ts (seeded), stats.ts
  ui/                            Header, Kpis (count-up), Button, Chip, TodoMark, ThemeToggle
  walk/
    Walk.tsx                     sticky stage, panels, prev/next, mini-map, skip link, keyboard
    StationPanel.tsx             Framer Motion slide-in panel (shared by 3D and 2D)
    useWalkState.ts              current station; one store for scroll, clicks, keys, mini-map
  three/                         ← lazy chunk, loaded only if WebGL + motion allowed
    Floor.tsx                    canvas, lights, fog, grid floor, adaptive DPR (cap 1.5)
    Towers.tsx                   six candlestick towers + wicks + labels
    PriceLine.tsx                gold line drawn across the tops (bloom target)
    Ticker.tsx                   "MBC ▲" tag
    emblems/Gear, Discs, Screens, BacktestBars, Vault, Globe
    CameraRig.tsx                idle drift, scroll path, click-to-fly
    choreography.ts              GSAP ScrollTrigger + Lenis timeline
  fallback/
    FloorSvg.tsx                 2D SVG candlestick floor (hero)
    Timeline.tsx                 vertical timeline of the six stations
  sections/
    Method.tsx                   blueprint schematic, draws on scroll
    models/                      ← lazy chunk: BacktestLab, DcfGrid, MonteCarlo, GbmPaths
    DealWall.tsx, Viewer.tsx     tombstones, filters, screenshot pager
    Experience.tsx               ANDBank title block
    Leadership.tsx, Contact.tsx
  styles/tokens.css              colour, type and spacing tokens, light + dark
tests/
  responsive.spec.ts             390 / 820 / 1180 / 1440 px screenshots, no horizontal scroll
  fallback.spec.ts               WebGL disabled: every section present
  a11y.spec.ts                   axe-core, 0 serious/critical
  keyboard.spec.ts               tab and arrow keys through all six stations
README.md                        edit content, run checks, redeploy
```

## 3. Components and data flow

- `cv.ts` exports `identity`, `kpis`, `stations[6]`, `method[4]`, `models`, `projects[11]`, `experience`, `leadership`, `education`, `skills`, `contact`. Every component reads from it; no copy in components.
- Missing facts render as a visible `<TodoMark>` (a dashed brass box saying "TODO: …"), never as invented text.
- One `useWalkState` store drives both the 3D scene and the HTML panel, so scroll, tap-a-tower, prev/next, arrow keys and the mini-map all move the same state. The 2D fallback uses the same panel component.
- 3D decision at startup: WebGL available and no `prefers-reduced-motion` → lazy-import `three/`. Otherwise the SVG floor and vertical timeline render. Both show every section.

## 4. Scroll choreography (desktop and iPad; phone uses the same steps with a bottom-sheet panel)

Walk section is about 700vh, pinned stage, Lenis smoothing, ScrollTrigger scrubbed. Progress p = 0 → 1.

| Time / progress | Camera | Scene | HTML |
|---|---|---|---|
| Load, 0–2.4 s | Wide establishing shot, slow drift | Opening bell: towers print left to right (0.25 s apart, ease-out), gold line draws across the tops, "MBC ▲" lands on tower 06 | Headline fades in; 4 KPIs count up (30 · ~95% · 11 · 8.5/10) |
| p 0.00–0.10 | Idle drift on the wide shot | Emblems idle | Intro stays; "Walk my career ↓", "Skip the tour" |
| p 0.10–0.24 | Glide to 01 | Gear spins faster | Panel 01 slides in |
| p 0.24–0.38 | Bigger move up to 02 (jump 1: engineering → finance) | Discs stack and shrink in sequence | Panel 02, "▲ Big jump" tag |
| p 0.38–0.52 | To 03 | Screens draw their mini charts | Panel 03 |
| p 0.52–0.66 | To 04 | Backtest bars grow to the four variants' Sharpe ratios | Panel 04 |
| p 0.66–0.80 | Bigger move up to 05 (jump 2: classroom → ANDBank) | Vault wheel turns, holographic risk dashboard rises | Panel 05, "▲ Big jump" tag |
| p 0.80–0.94 | To 06 | Globe turns; pins on Bristol, Barcelona, Monaco, Copenhagen | Panel 06 |
| p 0.94–1.00 | Pull back to the full floor | Line pulses once | Panel out; hand-off to Method section |

Tapping a tower, prev/next, arrow keys or the mini-map scroll to that step's midpoint, so the scroll position and the camera never disagree. Bloom applies only to the gold line and the screens.

## 5. check-facts rule

`scripts/check-facts.ts` reads the string and number literals in `cv.ts` (TypeScript AST, so comments are ignored), pulls out every number, percentage and €/$/CHF figure, normalises them (− vs -, thin spaces, "~", "pp") and requires each one to appear **as a whole token** in FACTS.md. So "24" does not pass just because "2024" exists. It prints a table of every figure and where in FACTS.md it was found, and fails with the list of misses. The deploy workflow runs it too, so a bad number can never go live.

Two consequences:
- **IAG sensitivity grid.** FACTS.md points to the grid in the prototype. I will copy it into an appendix of FACTS.md word for word, so FACTS.md stays the single source. Please confirm.
- **Simulated values are computed at runtime, not stored as claims.** The Nike Monte Carlo is rebuilt from your reported numbers (median $65, P10–P90 $44–$99, ~75% above $52.40). The GBM uses S0 100, μ 0.30, σ 0.38, T 5. Both are labelled "simulated, reconstructed from the report". The prototype's "5,000 simulations" is not in FACTS.md, so the button will just say "Rerun".

## 6. Copy fixes found while reading the prototype

- "11 finance projects, all public" → "all public" is not true yet (09 is cover only, and the thesis is withheld). It becomes "11 finance projects, with files on GitHub".
- "COVID drawdown held to −19.5%" → use −19.48% exactly as in FACTS.md.
- The thesis appears only as its title and the 85% grade. There is no link and no deck.
- Your role is shown only where FACTS.md gives it (01 risk framework & methodology; 04 management side; Strata later). Other projects list the team and no role. Teammates are named wherever FACTS.md names them; where it gives only "Team 6" or "Group 6", the tombstone says that.

## 7. Milestones (each one: run checks → commit → push → deploy → I tell you what to look at)

- **M1** scaffold, `cv.ts`, check-facts, image pipeline, full 2D fallback page with every section, deploy workflow. Live and readable on day one, even before any 3D.
- **M2** 3D floor, towers, six emblems, click-to-fly camera (lazy chunk).
- **M3** scroll walk, opening-bell intro, panels, mini-map, keyboard.
- **M4** method blueprint, four live models, deal wall and viewer, experience, leadership, contact.
- **M5** performance, accessibility, responsive, meta/OG. Run every acceptance check and report the numbers.

## 8. How I'll prove the acceptance criteria

| Criterion | Proof |
|---|---|
| Facts | check-facts output table, also enforced in CI |
| Bundle | `bundle-report` table: initial JS ≤ 150 KB gz, 3D chunk ≤ 450 KB gz. Plan: React + small UI in the initial bundle; three/R3F/drei/postprocessing/GSAP in the 3D chunk; models in their own chunk |
| Lighthouse | Run here in headless Chromium (mobile and desktop), scores reported |
| ≥ 50 fps on iPad | I can't measure your iPad from here. I'll add `?fps` to the URL to show a live frame counter, so you can read it on your iPad and send me the number. Adaptive DPR drops resolution before frames drop |
| Fallback | Playwright run with WebGL disabled and with reduced motion: every section found |
| Accessibility | axe-core report (0 serious/critical), keyboard test, contrast checked on both themes |
| Responsive | Screenshots at 390, 820, 1180 and 1440 px, `scrollWidth ≤ innerWidth` asserted, all committed to `docs/screenshots/` so you can view them on GitHub |

## 9. What I need from you (all tappable on the iPad)

1. **Headline:** A, B, C or D?
2. **Repo name (important).** The repo is called `miabeckercooper.github.io-`, with a trailing hyphen. GitHub only serves `https://miabeckercooper.github.io` from a repo named exactly `miabeckercooper.github.io`; with the hyphen, the site would sit at `miabeckercooper.github.io/miabeckercooper.github.io-/`. Fix: GitHub → this repo → Settings → General → rename it, deleting the final hyphen. I'll make the build work under either name.
3. **Pages source:** GitHub → Settings → Pages → Source: "GitHub Actions". This is a one-time switch I can't flip from here.
4. **Push straight to main** at each milestone, so it goes live right away? The alternative is a pull request per milestone that you merge with one tap.
5. **IAG grid** copied into FACTS.md (section 5): OK?
6. **Email** is left off the site by default; LinkedIn is the contact route and the CV PDF has your email. Do you want it shown as well?
