/**
 * ALL site copy and every number on the site lives here, built from source/FACTS.md.
 * scripts/check-facts.ts fails the build if a number here is not in FACTS.md.
 * Missing facts are written as { todo: "..." } and render as a visible TODO.
 */
import type { BacktestVariant, Chapter, Kpi, MethodStep, Project, ProjectArea, Text } from "./types";

export const GITHUB_PROJECTS = "https://github.com/miabeckercooper/finance-portfolio/tree/main/";

export const identity = {
  name: "Mia Becker-Cooper",
  monogram: "MBC",
  eyebrow: "Mechanical engineer turned finance professional, Copenhagen & Barcelona",
  headline: ["Decompose.", "Model.", "Stress-test.", "Decide."],
  lede:
    "Markets are the most interesting machine I've taken apart. I trained as a mechanical engineer at Bristol, moved into finance at ESADE, and build the tools behind investment decisions: risk workbooks, valuations and systematic backtests.",
  targets: ["Wealth management", "Private equity", "Venture capital", "Hedge funds"],
  availability: "Available from June 2027",
  linkedin: "https://www.linkedin.com/in/miabecker-cooper/",
  github: "https://github.com/miabeckercooper",
  projects: "https://github.com/miabeckercooper/finance-portfolio",
  email: "mia.beckercooper@alumni.esade.edu",
  cv: "Mia_Becker-Cooper_CV.pdf",
  photo: { name: "portrait-hallway", alt: "Mia Becker-Cooper, arms crossed, in a bright white hallway" },
  photoTag: { value: "30", label: "client portfolios, ANDBank Monaco" },
};

export const nav = [
  { label: "Research", href: "#research" },
  { label: "Timeline", href: "#timeline" },
  { label: "Models", href: "#models" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const kpis: Kpi[] = [
  { value: 30, label: "client portfolios in my risk workbook", chart: "grid" },
  { value: 95, prefix: "~", suffix: "%", label: "less reporting prep, after automation", chart: "beforeAfter" },
  { value: 11, label: "finance projects, files on GitHub", chart: "count" },
  { value: 8.5, decimals: 1, suffix: "/10", label: "MSc in Finance, ESADE", chart: "gauge", of: 10 },
];

/** Scrolling highlights band under the hero. */
export const ticker = [
  "ANDBank Monaco ▲ 30 client portfolios",
  "Reporting prep ▼ ~95%",
  "Substrate Capital ▲ deflated Sharpe 0.84 (simulated)",
  "IAG ▲ BUY, target €8.07",
  "Nike ▲ management case $69.05",
  "Futures challenge ▲ +13.40%, 4th place",
  "Bloomberg challenge ▲ +3.1 pp vs benchmark",
  "MSc thesis ▲ 85%",
];

/* ---------------- Selected research: chart previews from real numbers ---------------- */

export const research = {
  label: "Exhibit 1 · Selected research",
  title: "The work, in four charts",
  intro: "Each chart is drawn from the numbers in the final report. Open one to move the inputs yourself.",
  cards: [
    { kind: "heatmap", title: "Equity valuation", sub: "IAG · DCF sensitivity", body: "Value per share across 9 discount rates and 5 growth rates. Every cell stays above the €4.60 share price.",
      source: "Source: IAG valuation, Corporate Valuation, Mar 2026. Team 6.", model: "dcf", cta: "Move the inputs" },
    { kind: "variants", title: "Systematic investing", sub: "Substrate Capital · simulated", body: "Four versions tested and all reported. Deflating the Sharpe ratio separates the 130/30 books from noise.",
      source: "Source: Substrate Capital pitch, Asset Management, Jun 2026. Simulated backtest.", model: "backtest", cta: "Open the backtest lab" },
    { kind: "distribution", title: "Probabilistic valuation", sub: "Nike · Monte Carlo", body: "A distribution instead of a point estimate: about 75% of outcomes above the $52.40 share price.",
      source: "Source: Nike activist valuation, Mar 2026. Simulated, reconstructed from the reported median and P10–P90.", model: "mc", cta: "Rerun the simulation" },
    { kind: "allocation", title: "Project book", sub: "11 projects · by area", body: "Where the work sits: valuation, quant and trading, derivatives and rates, wealth management and macro.",
      source: "Source: finance-portfolio repository, Nov 2025 – Jun 2026.", model: "", cta: "Browse the projects" },
  ] as { kind: "heatmap" | "variants" | "distribution" | "allocation"; title: string; sub: string; body: string; source: string; model: string; cta: string }[],
};

/* ---------------- Timeline: four chapters ---------------- */

export const timeline = {
  label: "Exhibit 2 · Career timeline",
  title: "From engineering to the trading desk",
  intro: "Four chapters on one time axis. Tap a bar to jump to it, then swipe through the chapter; tap a project to see the actual work.",
  thesisMarker: "Thesis",
};

export const thesis = {
  title: "AI Implementation & Adoption in Private Banking",
  grade: "85%",
  context: "MSc in Finance thesis, ESADE. In-company with ANDBank, Jun–Aug 2026.",
  start: "2026-06",
  end: "2026-08",
  access: "The full thesis and defence deck are shared privately with recruiters on request.",
  request: "Request access",
};

export const chapters: Chapter[] = [
  {
    id: "bristol",
    colour: "steel", start: "2021-09", end: "2024-07", short: "BEng, Bristol",
    place: "University of Bristol",
    title: "BEng Mechanical Engineering",
    dates: "Sep 2021 – Jul 2024",
    summary: "Where I learned to take systems apart and understand why they work, or why they fail.",
    moments: [
      { date: "2021–2024", title: "BEng Mechanical Engineering", body: "Inspiring Engineering Student Award." },
      { date: "Team project", title: "Led a go-to-market case", body: "Led a 4-person team on a go-to-market case for a smart gum shield." },
      { date: "Individual thesis", title: "Built a measurement system", body: "An Arduino-based system measuring mastication performance. The results were used in my tutor's PhD research." },
      { date: "2023–24", title: "Volunteer, Wild Goose Shelter", body: "Volunteering at a homeless shelter in Bristol alongside my degree." },
    ],
  },
  {
    id: "esade",
    colour: "violet", start: "2025-08", end: "2026-06", short: "MSc Finance, ESADE",
    place: "ESADE, Barcelona",
    title: "MSc in Finance",
    dates: "Aug 2025 – Jun 2026",
    summary:
      "Banking & Asset Management track, graded 8.5/10. Eleven projects, two trading challenges and an in-company thesis with ANDBank.",
    moments: [
      { date: "Nov 2025", title: "Private client portfolio", metric: "1.117", metricLabel: "Sharpe vs 0.836", project: "08" },
      { date: "Nov 2025", title: "Central banks: Fed vs ECB", body: "A comparison of the Federal Reserve and the European Central Bank.", project: "10" },
      { date: "Jan 2026", title: "University of St. Gallen", body: "Investing in Capital Markets: a CHF 500M Swiss single-family office.", project: "09" },
      { date: "Feb 2026", title: "Futures trading challenge", metric: "+13.40%", metricLabel: "in two weeks, 4th place", project: "11" },
      { date: "Mar 2026", title: "Bloomberg Trading Challenge", metric: "+3.1 pp", metricLabel: "vs the B500 benchmark on a €100M book", project: "02" },
      { date: "Mar 2026", title: "IAG equity valuation", metric: "€8.07", metricLabel: "BUY target vs €4.60 (+75%)", project: "03" },
      { date: "Mar 2026", title: "Nike activist valuation", metric: "$69.05", metricLabel: "management case vs $52.40", project: "04" },
      { date: "Jun 2026", title: "Substrate Capital", metric: "0.84", metricLabel: "deflated Sharpe, systematic 130/30 (simulated)", project: "01" },
      { date: "Jun–Aug 2026", title: "MSc thesis with ANDBank", metric: "85%", metricLabel: "AI Implementation & Adoption in Private Banking", thesis: true },
    ],
  },
  {
    id: "andbank",
    colour: "green", start: "2026-06", end: "2026-08", short: "ANDBank Monaco",
    place: "ANDBank Monaco",
    title: "Investment & Portfolio Risk Management Intern",
    dates: "Jun – Aug 2026",
    summary: "Private banking and wealth management: from classroom models to live client books. No client names, holdings or internal files are shown.",
    moments: [
      { date: "Risk", title: "TWR-based risk workbook", metric: "30", metricLabel: "client portfolios: Sharpe, Sortino, VaR/CVaR, beta, tracking error, information ratio, max drawdown" },
      { date: "Methodology", title: "Fixed a benchmark mismatch", body: "An S&P 500 benchmark against an HICP+3% mandate. Aligned VaR/CVaR confidence levels and wrote the methodology document." },
      { date: "Dashboard", title: "Automated portfolio dashboard", metric: "1 → 4", metricLabel: "portfolio managers using it, with a potential bank-wide rollout" },
      { date: "Automation", title: "AI-assisted reporting", metric: "~95%", metricLabel: "less prep time. Built Hermes, a morning market-update system, and a 16-skill custom AI library" },
      { date: "Exposure", title: "Concentration analysis", metric: "10", metricLabel: "client portfolio reviews supported, with correlation matrices and asset-class and geography breakdowns" },
      { date: "Research", title: "Screens and structured products", body: "An equity screen scoring 50+ securities on momentum, value and growth; alternatives benchmarked against HFR indices; a coupon tracker for worst-of autocallables." },
    ],
  },
  {
    id: "cbs",
    colour: "ember", start: "2026-09", end: "2027-07", short: "CEMS MIM, CBS",
    place: "Copenhagen Business School",
    title: "CEMS Master's in International Management",
    dates: "Sep 2026 – Jul 2027",
    summary: "ESADE & CBS. Building AI Business Ventures in Digital Ecosystems; Entrepreneurship: Theory and Evidence; Negotiations in a Global Context.",
    photo: { name: "ca-team", alt: "Poster: Meet the Corporate & Alumni team, Fall 2026, with six team members", caption: "CEMS Corporate & Alumni Team, Fall 2026" },
    moments: [
      { date: "Sep 2026", title: "CEMS MIM begins", body: "Core: Negotiations in a Global Context, Financial Analysis, AI & Machine Learning, Data Analytics." },
      { date: "Sep 2026 – now", title: "Head of Finance, Women in Finance", body: "Budget, sponsorships and industry events at CBS." },
      { date: "2026", title: "CEMS Corporate & Alumni Team", metric: "Up to 20", metricLabel: "students paired with alumni in the mentorship programme I launched and led" },
      { date: "2026", title: "VC and PE clubs", body: "Member of the CBS Venture Capital Club and Private Equity Club." },
      { date: "Jul 2027", title: "Graduation", body: "Available summer 2027." },
    ],
  },
];

export const method = {
  label: "Exhibit 3 · Investment process",
  title: "Engineering thinking, applied to investing",
  intro:
    "An engineer doesn't trust a machine until it has been taken apart, modelled and load-tested. I treat an investment case the same way.",
  steps: [
    {
      k: "01",
      title: "Decompose",
      formula: "Exposure = Σ wᵢ · xᵢ",
      summary: "Look through to what a portfolio really holds",
      example: "ANDBank: exposure across portfolio managers' books",
      body:
        "Concentration and exposure analysis across the PMs' books, with correlation matrices and asset-class and geography breakdowns, supporting 10 client portfolio reviews. Along the way I corrected a benchmark mismatch: an S&P 500 benchmark against an HICP+3% mandate.",
      source: "ANDBank Monaco · Jun–Aug 2026",
    },
    {
      k: "02",
      title: "Model",
      formula: "V₀ = Σ FCFₜ ⁄ (1 + WACC)ᵗ + TV ⁄ (1 + WACC)ᴺ",
      summary: "Build the value from its drivers",
      example: "IAG: a DCF with every input exposed",
      body:
        "A DCF at a 7.2% WACC, with terminal value at 61% of enterprise value, which is exactly why the sensitivity grid matters. The published BUY target of €8.07 sits below the DCF value of €10.08, against a €4.60 share price.",
      source: "Corporate Valuation · Mar 2026 · Team 6",
    },
    {
      k: "03",
      title: "Stress-test",
      formula: "DSR = Φ[(SR̂ − SR₀) · √(T − 1) ⁄ σ̂(SR̂)]",
      summary: "Try to break your own result",
      example: "Substrate: reporting the versions that failed",
      body:
        "We tested four versions of the strategy and reported all of them, deflated the Sharpe ratio for multiple testing, and re-ran it on only the 37 names listed before 2012 (Sharpe 1.00, deflated 0.84). We also said plainly that alpha of 5.2% at t = 0.67 is not yet significant.",
      source: "Asset Management · Jun 2026 · simulated backtest",
    },
    {
      k: "04",
      title: "Decide",
      formula: "P(V > $52.40) ≈ 75%",
      summary: "Turn uncertainty into a call",
      example: "Nike: a probability, not a point estimate",
      body:
        "A Monte Carlo on the management case: median $65, P10–P90 $44–$99, about 75% of outcomes above the $52.40 share price and about 50% above $69. Enough to defend management's $69.05 case against the activist consensus of $67.31.",
      source: "Finance Project · Mar 2026 · Team 6, management side",
    },
  ] satisfies MethodStep[],
};

/* ---------------- Live models ---------------- */

export const models = {
  label: "Exhibit 4 · Live models",
  title: "Don't take my word for it. Move the inputs.",
  intro:
    "Four models rebuilt from my projects, with the numbers from the final reports. Change an assumption and watch the conclusion hold or break.",
  tabs: [
    { id: "backtest", name: "Backtest lab", source: "Substrate Capital" },
    { id: "dcf", name: "DCF sensitivity", source: "IAG valuation" },
    { id: "mc", name: "Monte Carlo", source: "Nike valuation" },
    { id: "gbm", name: "Price paths", source: "Derivatives" },
  ],
  backtest: {
    title: "Which version of the strategy survives?",
    intro:
      "We tested four versions of the Substrate Capital long-short and reported all of them. The deflated Sharpe ratio corrects for having tried several, which is where weak versions get exposed.",
    variants: [
      { id: "A", sizing: "neutral", overlay: false, name: "A · market neutral, no overlay", sharpe: 0.22, dsr: 0.09, maxDd: -30,
        verdict: "Positive, but after correcting for the versions tried it is indistinguishable from noise." },
      { id: "B", sizing: "130/30", overlay: false, name: "B · 130/30, no overlay", sharpe: 1.05, dsr: 0.87, maxDd: -43,
        verdict: "The highest Sharpe, but with no regime brake when markets turn." },
      { id: "C", sizing: "neutral", overlay: true, name: "C · market neutral + overlay", sharpe: 0.22, dsr: 0.08, maxDd: -28,
        verdict: "The overlay trims the drawdown, but stock selection alone does not survive deflation." },
      { id: "D", sizing: "130/30", overlay: true, name: "D · 130/30 + overlay", sharpe: 1.01, dsr: 0.84, maxDd: -43, pitched: true,
        verdict: "The version we pitched: CAGR 27.7% and a COVID drawdown of −19.48%, at almost the same Sharpe as B." },
    ] satisfies BacktestVariant[],
    pitched: {
      cagr: "27.7%",
      cumulative: "+1,907.75%",
      months: "147 months",
      alpha: "5.2%",
      alphaNote: "alpha at t = 0.67: not yet significant",
    },
    note:
      "Simulated backtest: 147 months, walk-forward with a 2-month embargo, 15 bps per side costs. Past simulated performance is not a guide to future returns.",
  },
  dcf: {
    title: "How much of the IAG upside depends on two inputs?",
    intro:
      "Our DCF valued International Airlines Group well above its €4.60 share price. Slide the discount rate and terminal growth to see how robust that is.",
    price: 4.6,
    target: 8.07,
    baseWacc: 7.2,
    baseG: 2.0,
    wacc: [5.5, 6.0, 6.5, 7.0, 7.2, 7.5, 8.0, 8.5, 9.0],
    g: [1.0, 1.5, 2.0, 2.5, 3.0],
    grid: [
      [14.94, 15.75, 16.79, 18.16, 20.07],
      [12.95, 13.52, 14.24, 15.15, 16.36],
      [11.33, 11.74, 12.24, 12.87, 13.66],
      [9.98, 10.28, 10.64, 11.08, 11.62],
      [9.57, 9.85, 10.17, 10.56, 11.03],
      [8.85, 9.07, 9.33, 9.64, 10.01],
      [7.89, 8.05, 8.24, 8.46, 8.72],
      [7.06, 7.18, 7.32, 7.48, 7.66],
      [6.35, 6.44, 6.54, 6.65, 6.78],
    ],
    note:
      "Sensitivity grid from our valuation (Mar 2026). Base case WACC 7.2%, g 2.0%: €10.17. Terminal value is 61% of EV. The published target of €8.07 sits below the pure DCF. Even at a 9.0% WACC the DCF stays above the share price.",
  },
  mc: {
    title: "How likely is the turnaround case to beat the market price?",
    intro:
      "For Nike's management case we ran a Monte Carlo instead of trusting one point estimate. Run it again and watch the distribution settle.",
    price: 52.4,
    base: 69.05,
    median: 65,
    p10: 44,
    p90: 99,
    run: "Rerun the simulation",
    probLabel: "P(V > price) ≈ 75%",
    note:
      "Simulated, reconstructed from the distribution in our report: median $65, P10–P90 $44–$99, about 75% above the $52.40 share price. Dashed lines: share price $52.40 and management case $69.05.",
  },
  gbm: {
    title: "What does volatility actually look like?",
    intro:
      "From our derivatives assignment: a stock starting at S0 100 with drift μ 0.30 and volatility σ 0.38, simulated over T 5 years under geometric Brownian motion.",
    s0: 100,
    mu: 0.3,
    sigma: 0.38,
    years: 5,
    run: "Draw new paths",
    note:
      "Simulated. The assignment used 100,000 paths; this demo draws fewer so it runs smoothly on a phone. The mean ends far above the median: a few paths explode and drag the average up, which is why the average outcome isn't the typical one.",
  },
};

/* ---------------- Deal wall ---------------- */

export const areas: { id: ProjectArea | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "quant", label: "Quant & trading" },
  { id: "valuation", label: "Valuation" },
  { id: "derivatives", label: "Derivatives & rates" },
  { id: "wealth", label: "Wealth management" },
  { id: "macro", label: "Macro" },
];

const roleTodo: Text = { todo: "Mia's role on this project is not in FACTS.md yet" };

export const deals = {
  label: "Exhibit 5 · Project book",
  title: "The deal wall",
  intro:
    "Bankers get a tombstone for every closed deal. These are mine. Tap one to flick through the actual work.",
  github: "Open the files on GitHub",
};

export const projects: Project[] = [
  {
    n: "01", dir: "01-substrate-capital", title: "Substrate Capital", area: "quant",
    course: "Asset Management", date: "Jun 2026",
    summary:
      "A systematic 130/30 long-short fund in AI infrastructure: 58 names, a random forest on 15 features, an HMM regime overlay, walk-forward testing with a 2-month embargo and 15 bps per side costs.",
    hero: { value: "0.84", label: "deflated Sharpe, variant D" },
    figures: [
      { value: "27.7%", label: "CAGR" },
      { value: "1.01", label: "Sharpe" },
      { value: "−43.1%", label: "max drawdown" },
      { value: "−19.48%", label: "COVID drawdown" },
      { value: "147", label: "months tested" },
      { value: "+1,907.75%", label: "cumulative" },
    ],
    team: "Amir Alexander Csüri (strategy & ML), Mia (risk framework & methodology), Gavin Campbell (backtest validation), Marco Vujosevic (fund structure)",
    role: "Risk framework & methodology",
    shots: ["s01-p1", "s01-p6", "s01-p10", "s01-p12"],
    simulated: true,
  },
  {
    n: "02", dir: "02-bloomberg-trading-challenge", title: "Bloomberg Trading Challenge", area: "quant",
    course: "Asset Pricing", date: "6–20 Mar 2026",
    summary: "A €100M book managed over two weeks against the B500 benchmark, with 54.3% held in cash.",
    hero: { value: "+3.1 pp", label: "vs benchmark" },
    figures: [
      { value: "+0.695%", label: "return vs −2.4% B500" },
      { value: "1.61", label: "Sharpe" },
      { value: "3.00", label: "Sortino" },
      { value: "10.6%", label: "volatility" },
      { value: "< 0.98%", label: "max drawdown" },
    ],
    team: "Group 2: Mia, Leonor dos Reis Ribeiro, Paula Mora Vargas, Sofia Pinho",
    role: roleTodo,
    shots: ["s02-p1", "s02-p3", "s02-p6", "s02-p9"],
  },
  {
    n: "03", dir: "03-iag-equity-valuation", title: "IAG equity valuation", area: "valuation",
    course: "Corporate Valuation", date: "Mar 2026",
    summary: "A BUY call on International Airlines Group built on a DCF at a 7.2% WACC, with terminal value at 61% of EV.",
    hero: { value: "€8.07", label: "BUY target vs €4.60 (+75%)" },
    figures: [
      { value: "€10.08", label: "DCF value" },
      { value: "7.2%", label: "WACC" },
      { value: "61%", label: "TV share of EV" },
    ],
    team: "Team 6 (6 people)",
    role: roleTodo,
    shots: ["s03-p1", "s03-p6", "s03-p7", "s03-p8"],
  },
  {
    n: "04", dir: "04-nike-activist-valuation", title: "Nike activist valuation", area: "valuation",
    course: "Finance Project, Prof. Batlloria", date: "22 Mar 2026",
    summary: "Management's side in an activist negotiation: three valuations, then a Monte Carlo on the management case.",
    hero: { value: "$69.05", label: "management case vs $52.40" },
    figures: [
      { value: "$45.68", label: "as-is" },
      { value: "$67.31", label: "activist consensus" },
      { value: "8.43%", label: "WACC" },
      { value: "~75%", label: "of simulations above $52.40" },
    ],
    team: "Team 6, management side",
    role: roleTodo,
    shots: ["s04-p3", "s04-p8", "s04-p9", "s04-p10"],
  },
  {
    n: "05", dir: "05-nike-financial-analysis", title: "Nike strategic & financial analysis", area: "valuation",
    course: "Finance Project", date: "2026",
    summary: "A DuPont breakdown of Nike's returns and what drove ROE down.",
    hero: { value: "21.1%", label: "ROIC (2024)" },
    figures: [{ value: "39.5% → 24.36%", label: "ROE" }],
    team: { todo: "Team for this project is not in FACTS.md yet" },
    role: roleTodo,
    shots: ["s05-p1", "s05-p10", "s05-p12", "s05-p14"],
  },
  {
    n: "06", dir: "06-derivatives-pricing", title: "Derivatives group assignment", area: "derivatives",
    course: "Derivatives, Prof. Carlo Sala", date: "Mar 2026",
    summary: "10 problems, including a GBM simulation with S0 100, μ 0.30, σ 0.38 over T 5 years on 100,000 paths.",
    hero: { value: "100,000", label: "simulated GBM paths" },
    figures: [{ value: "10", label: "problems" }, { value: "σ 0.38", label: "volatility" }],
    team: { todo: "Team for this project is not in FACTS.md yet" },
    role: roleTodo,
    shots: ["s06-p1", "s06-p3", "s06-p8", "s06-p12"],
    simulated: true,
  },
  {
    n: "07", dir: "07-fixed-income-duration-convexity", title: "Fixed income: duration & convexity", area: "derivatives",
    course: "Fixed Income", date: "2026",
    summary: "Duration, convexity, immunisation and a butterfly trade.",
    hero: { value: "Butterfly", label: "duration, convexity, immunisation" },
    figures: [],
    team: "Group 6",
    role: roleTodo,
    shots: ["s07-p1", "s07-p4", "s07-p5", "s07-p8"],
  },
  {
    n: "08", dir: "08-private-client-portfolio", title: "Private client portfolio", area: "wealth",
    course: "Investments", date: "Nov 2025",
    summary: "A portfolio built for a private client, with a higher Sharpe than the comparison portfolio.",
    hero: { value: "1.117", label: "Sharpe vs 0.836" },
    figures: [{ value: "9.995%", label: "expected return" }],
    team: "Group 4: Henry Dixon, Mia, Clemens Bene, Alejandro Font-Beltran, Tomiris Kabidullina, Malak Fanous",
    role: roleTodo,
    shots: ["s08-p1", "s08-p3", "s08-p10", "s08-p13"],
  },
  {
    n: "09", dir: "09-swiss-family-office-portfolio", title: "Swiss single-family office", area: "wealth",
    course: "Investing in Capital Markets, University of St. Gallen", date: "Jan 2026",
    summary: "A CHF 500M family office with CHF 5M a year of liquidity needs, a 10.4% target and ~60% in illiquid assets.",
    hero: { value: "CHF 500M", label: "family office mandate" },
    figures: [
      { value: "10.4%", label: "target return" },
      { value: "~60%", label: "illiquid" },
      { value: "CHF 5M", label: "yearly liquidity need" },
    ],
    team: "Group 4: Mia, Pablo Diez Venegas, Simone Fortunato, Gerard Alexander Merino Gonzalez, Yash Khandai",
    role: roleTodo,
    shots: ["s09-p1"],
    note: "Only the cover is shown; the full PDF is being re-exported.",
  },
  {
    n: "10", dir: "10-central-banks-fed-vs-ecb", title: "Central banks: Fed vs ECB", area: "macro",
    course: "Investments", date: "Nov 2025",
    summary: "A comparison of the Federal Reserve and the European Central Bank.",
    hero: { value: "Fed vs ECB", label: "monetary policy compared" },
    figures: [],
    team: "Group 4",
    role: roleTodo,
    shots: ["s10-p1", "s10-p4", "s10-p5", "s10-p6"],
  },
  {
    n: "11", dir: "11-two-week-trading-challenge", title: "Two-week futures trading challenge", area: "quant",
    course: "Derivatives", date: "Feb 2026",
    summary:
      "Index futures (ES/MES/NQ/MNQ), gold, silver and FX, traded on EMA pullback and failed-breakout setups with at least 2:1 reward to risk.",
    hero: { value: "+13.40%", label: "in two weeks, 4th place" },
    figures: [
      { value: "113,396.63", label: "from 100,000" },
      { value: "−27.10%", label: "max drawdown" },
    ],
    team: "Group 6",
    role: roleTodo,
    shots: ["s11-p1", "s11-p5", "s11-p6", "s11-p8"],
  },
];

/* ---------------- Leadership, education, skills ---------------- */

export const leadership = {
  label: "Leadership",
  title: "Leading from the front",
  team: { name: "ca-team", alt: "Poster: Meet the Corporate & Alumni team, Fall 2026, with six team members", caption: "CEMS Corporate & Alumni Team, Fall 2026" },
  community: { name: "cems-group", alt: "Group photo of students at a CEMS event at Copenhagen Business School", caption: "CEMS community at Copenhagen Business School" },
  intro: "The queen is the piece that moves furthest in every direction. I try to lead the same way: take the first step, then bring people with me.",
  roles: [
    { title: "Head of Finance, Women in Finance", org: "Copenhagen Business School", dates: "Sep 2026 – present", body: "Budget, sponsorships and industry events." },
    { title: "CEMS Corporate & Alumni Team", org: "CEMS", dates: "2026", body: "Launched and led a mentorship programme pairing up to 20 students with alumni." },
    { title: "Member, Venture Capital Club and Private Equity Club", org: "Copenhagen Business School", dates: "", body: "" },
    { title: "Volunteer", org: "Bristol and Nepal", dates: "", body: "Wild Goose Shelter, Bristol (2023–24); taught English in Nepal (2017)." },
  ],
  education: [
    { title: "CEMS Master's in International Management (MIM)", org: "ESADE & Copenhagen Business School", dates: "Sep 2026 – Jul 2027",
      body: "At CBS: Building AI Business Ventures in Digital Ecosystems; Entrepreneurship: Theory and Evidence. Core: Negotiations in a Global Context, Financial Analysis, AI & Machine Learning, Data Analytics." },
    { title: "MSc in Finance, 8.5/10", org: "ESADE, Ramon Llull University", dates: "Aug 2025 – Jun 2026",
      body: "Banking & Asset Management track. In-company thesis with ANDBank, AI Implementation & Adoption in Private Banking, graded 85%. Plus the University of St. Gallen, Investing in Capital Markets (Jan 2026)." },
    { title: "BEng Mechanical Engineering", org: "University of Bristol", dates: "Sep 2021 – Jul 2024",
      body: "Inspiring Engineering Student Award. Individual thesis on an Arduino-based mastication measurement system, used in my tutor's PhD research." },
    { title: "IB Diploma", org: "International School of Nice", dates: "2021", body: "HL Physics 7, Maths 6, Geography 7." },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "French", level: "Fluent" },
    { name: "German", level: "Intermediate" },
    { name: "Spanish", level: "Learning" },
  ],
  skills: [
    { group: "Modelling", items: "Excel (modelling, Power Query, VBA)" },
    { group: "Code", items: "Python (pandas, scikit-learn, hmmlearn), SQL, MATLAB, Stata" },
    { group: "Data", items: "Bloomberg (incl. BQL), FactSet" },
  ],
  certifications: [
    "Bloomberg Market Concepts",
    "Bloomberg Financial Fundamentals",
    "Bloomberg BQL",
    "AmplifyMe Asset Management Academy",
  ],
};

export const about = {
  label: "About me",
  title: "Off the clock",
  intro: "Engineer by training, investor by choice, and a few things that keep me sharp outside work.",
  photo: { name: "mirror", alt: "Mia Becker-Cooper, full-length, at home" },
  hobbies: [
    { icon: "book", title: "Philosophy and politics", body: "Good training for questioning assumptions before trusting a model." },
    { icon: "chess", title: "Chess", body: "Trying to beat my boyfriend, one game at a time." },
    { icon: "dance", title: "Pilates and dance", body: "Discipline, balance and a reason to leave the spreadsheet." },
    { icon: "heart", title: "Volunteering", body: "Homeless shelters, from the Wild Goose Shelter in Bristol onwards. I taught English in Nepal in 2017." },
    { icon: "agent", title: "Building AI agents", body: "From Hermes, my morning market-update system, to a 16-skill custom AI library." },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "French", level: "Fluent" },
    { name: "German", level: "Intermediate" },
    { name: "Spanish", level: "Learning" },
  ],
  personality: { type: "ENFJ-A", name: "Protagonist", note: "16Personalities: a diplomat type who leads through people." },
};

export const contact = {
  label: "Wealth management · Private equity · Venture capital · Hedge funds",
  title: "Let's talk.",
  body:
    "The quickest way to reach me is LinkedIn. My CV is one tap away, and every project on this page has its files on GitHub.",
  linkedin: "Message me on LinkedIn",
  github: "GitHub",
  cv: "View CV",
  footer: "Coursework uses public data. Backtests are simulated. Nothing here is investment advice.",
  analytics: "Anonymous visit counts (GoatCounter), no cookies.",
  year: "2026",
};
