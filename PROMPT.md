You are a senior creative developer (Three.js / React Three Fiber) who also thinks like a hiring manager in finance. Build my interactive CV website. I'm Mia Becker-Cooper, a mechanical engineer turned finance professional (ESADE MSc Finance, CEMS MIM at CBS, ANDBank Monaco). The link goes on my CV and applications for wealth management, private equity, venture capital and hedge fund roles. It must impress within 5 seconds, prove every claim within 2 minutes, and run smoothly on an iPad.

## Setup
- I work only from an iPad. You run everything; I never run commands. Explain each git and deploy step in one plain line.
- This repo (miabeckercooper.github.io) already contains: CLAUDE.md, source/FACTS.md (all verified facts and numbers), source/screenshots/ (41 page images from my projects, named sNN-pX.jpg by project number), source/cv/Mia_Becker-Cooper_CV.pdf (public version, phone removed), and prototype/v4-reference.html (my current single-file prototype: reuse its concept, data and copy).
- My project files live at github.com/miabeckercooper/finance-portfolio (11 numbered folders, each with a README). Link each project to its folder.

## Positioning
An engineer who invests like an engineer: decompose, model, stress-test, decide. Headline direction: "Markets are the most interesting machine I've taken apart." (offer 3 alternatives in your plan). Tone: 70% polished finance professional, 30% bold. British English.

## Source of truth and privacy
- All site copy lives in ONE typed file, src/content/cv.ts, built from source/FACTS.md. Invent nothing; if something is missing, show a visible TODO.
- Write scripts/check-facts.ts: extract every number, % and € / $ / CHF figure from cv.ts and fail if it does not appear in source/FACTS.md. Run it before every commit.
- No phone number anywhere. Do not publish my thesis or defence deck. Use the ANDBank figures from the CV (30 portfolios, ~95% less prep time, dashboard 1 → 4 portfolio managers). No client names or data.
- Credit teammates on group projects. Mark backtests as simulated.

## Concept: "The Trading Floor" (real-time 3D)
- Hero: dusk-lit trading floor, slow idle camera drift. "Opening bell": six candlestick towers print onto the floor one after another as the page loads, a gold price line draws across their tops, and an "MBC ▲" ticker tag lands on the last one. Headline and 4 KPIs count up (30 client portfolios · ~95% less reporting prep · 11 projects · 8.5/10 MSc).
- Six career stations, rising left to right, with two clearly bigger jumps: engineering → MSc Finance, and classroom → ANDBank.
  01 BEng Mechanical Engineering, University of Bristol (2021–24): spinning gear
  02 MSc Finance, ESADE (8.5/10): stacked shrinking discs (discounted cash flows)
  03 Markets & valuation (two trading challenges, IAG, Nike): floating trading screens with live mini charts
  04 Substrate Capital: animated backtest bars for the four variants
  05 ANDBank Monaco: vault wheel turning, holographic risk dashboard
  06 Thesis 85% and CEMS at CBS, plus Women in Finance and the CEMS Corporate & Alumni mentorship programme: globe with pins on Bristol, Barcelona, Monaco, Copenhagen
- Scroll-driven walk (GSAP ScrollTrigger + Lenis): the camera glides station to station; each emblem animates; a details panel slides in with role, dates, place, one hero metric, 2–3 achievements and skill chips.
- Click or tap a station to fly there. Prev/Next buttons, arrow keys and a station mini-map also navigate. A "Skip the tour" link at the top.
- Low-poly, procedural geometry only (no external models). Subtle bloom on the gold line and screens.

## Sections after the walk
1. "Engineering thinking, applied to investing": a blueprint schematic that draws itself on scroll: Decompose → Model → Stress-test → Decide. Each node expands with a real example (ANDBank look-through, IAG DCF, Substrate deflated Sharpe, Nike Monte Carlo).
2. Live models (the proof): four interactive tools using the exact numbers in FACTS.md: Substrate backtest lab (toggle sizing and overlay → Sharpe, deflated Sharpe, drawdown, verdict); IAG DCF sensitivity (WACC × g sliders over the real grid, heatmap); Nike Monte Carlo (rerun the distribution, show P(>$52.40), median, P10–P90); GBM price paths (volatility slider, mean vs median).
3. The deal wall: every project as a banker's deal tombstone with its screenshot, headline figure and team. Tap to open a viewer that pages through the screenshots, with figures, my role and a link to the GitHub folder. Filters by area.
4. Experience: ANDBank in an engineering-drawing title block, with achievements and metrics.
5. Leadership and education: Women in Finance, CEMS Corporate & Alumni team, Bristol award, languages (English, French, German, learning Spanish), skills and certifications.
6. Contact: "Message me on LinkedIn", GitHub, and View CV (opens public/Mia_Becker-Cooper_CV.pdf).
Sticky header: "MBC" ticker monogram, section links, CV, LinkedIn (gold).

## Visual system
Keep the prototype's direction: deep trading-floor ink (#0C171D) for the hero and walk, drafting-paper sections below, teal-ink accent (#0F5A68 light / #7FD0DE dark), brass gold (#E0AE5E), gain green, loss red. Archivo (variable width) for display, Source Serif 4 for body, JetBrains Mono for numbers and labels. Square corners, tabular numbers. Support light and dark mode. No gradient washes, emoji or stock photos.

## Stack
Vite + React + TypeScript, @react-three/fiber + drei (+ postprocessing for bloom), GSAP ScrollTrigger + Lenis, Framer Motion for panels. Static build, no backend. Screenshots served as optimised images (WebP with JPEG fallback), lazy-loaded. Deploy to GitHub Pages from this repo with a GitHub Actions workflow, so it lives at https://miabeckercooper.github.io.

## Acceptance criteria (prove each; report results, don't just claim them)
- Facts: the check-facts script passes.
- Performance: 3D lazy-loaded in its own chunk; initial JS ≤ 150 KB gzipped, 3D chunk ≤ 450 KB gzipped (show the bundle report); DPR capped at 1.5 with adaptive DPR; ≥ 50 fps target on an iPad; Lighthouse Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- Fallback: no WebGL or prefers-reduced-motion → a polished 2D version (SVG candlestick floor + vertical timeline) with every section.
- Accessibility: real buttons and links, keyboard path through every station, visible focus, aria labels, WCAG AA contrast; axe-core shows 0 serious or critical issues.
- Responsive: Playwright screenshots at 390, 820 (iPad portrait), 1180 (iPad landscape) and 1440 px with no horizontal scroll; a smoke test with WebGL disabled that finds every section.
- Sharing: title, meta description, Open Graph image from the hero, "MBC" favicon.

## How to work
1. Plan first: file structure, components, scroll choreography timeline, 3 headline options. Wait for my OK.
2. Then build in milestones; after each, run the checks, commit, push, and tell me exactly what to look at on the live site:
   M1 scaffold + cv.ts + check-facts + full 2D fallback page, deployed to GitHub Pages
   M2 3D floor, towers, emblems, click-to-fly camera
   M3 scroll walk, opening-bell intro, panels
   M4 method blueprint, live models, deal wall with viewer, experience, leadership, contact
   M5 performance, accessibility, responsive, meta/OG; run all acceptance checks
3. Add a README: how to edit content, run the checks and redeploy.
4. Finally, give me a 5-second test to try on 3 people: after 5 seconds, can they say what I do and quote one number?
