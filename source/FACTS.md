# Source of truth: verified facts for the website

Every number and claim on the site must come from this file. If something is missing, show a visible TODO; never invent.
Sources: Mia's CV (source/cv/), final project reports (github.com/miabeckercooper/finance-portfolio), and Mia's own statements.

## Identity
- Name: Mia Becker-Cooper
- LinkedIn: https://www.linkedin.com/in/miabecker-cooper/
- GitHub: https://github.com/miabeckercooper · projects: https://github.com/miabeckercooper/finance-portfolio
- CV (phone removed, public): https://github.com/miabeckercooper/miabeckercooper/blob/main/Mia_Becker-Cooper_CV.pdf (also in source/cv/)
- Email on CV: mia.beckercooper@alumni.esade.edu. NEVER show a phone number anywhere.
- Based: Copenhagen and Barcelona. Nationality German, EU work permit. Available summer 2027.
- Languages: English (native), French (fluent), German (intermediate), Spanish (beginner). Three languages plus learning Spanish. Not five.
- Target roles: wealth management, private equity, venture capital, hedge funds.
- Positioning: mechanical engineer who moved into finance and builds the tools behind investment decisions.
- Headline in current prototype: "Markets are the most interesting machine I've taken apart." (Mia's own phrasing)

## Education
- CEMS Master's in International Management (MIM), ESADE & Copenhagen Business School, Sep 2026 – Jul 2027. CBS courses: Building AI Business Ventures in Digital Ecosystems; Entrepreneurship: Theory and Evidence. Core: Negotiations in a Global Context, Financial Analysis, AI & Machine Learning, Data Analytics.
- MSc in Finance, ESADE (Ramon Llull University), Banking & Asset Management track, grade 8.5/10, Aug 2025 – Jun 2026. Coursework: Corporate Valuation, Advanced Financial Modelling (three-statement, LBO, IRR/MOIC), Venture Capital, Asset Management, Asset Pricing, Derivatives, Fixed Income, Hedge Funds, Fintech. Also University of St. Gallen, Investing in Capital Markets (Jan 2026).
- MSc thesis (ESADE MSc in Finance, not CEMS/CBS): in-company thesis with ANDBank, AI Implementation & Adoption in Private Banking (Jun–Aug 2026), grade 85%. Mia (Oct 2026): the thesis and defence deck may be shown ONLY on a private, access-controlled page shared with selected recruiters. Never on the public site or in the public repo.
- BEng Mechanical Engineering, University of Bristol, Sep 2021 – Jul 2024. Inspiring Engineering Student Award. Led a 4-person team on a go-to-market case for a smart gum shield. Individual thesis: Arduino-based system measuring mastication performance; results used in her tutor's PhD research.
- IB Diploma, International School of Nice (2021): HL Physics 7, Maths 6, Geography 7.

## Experience: ANDBank Monaco, Investment & Portfolio Risk Management Intern, Jun–Aug 2026 (private banking & wealth management)
- TWR-based risk workbook measuring risk-adjusted performance (Sharpe, Sortino, VaR/CVaR, beta, tracking error, information ratio, max drawdown) across 30 client portfolios.
- Corrected a benchmark mismatch (S&P 500 vs HICP+3% mandate), aligned VaR/CVaR confidence levels, wrote the methodology document.
- Automated portfolio dashboard (multi-period performance, top/worst holdings); scaled from one portfolio manager to four, potential bank-wide rollout.
- Concentration and exposure analysis across PMs' books (correlation matrices, asset-class/geography breakdowns), supporting 10 client portfolio reviews.
- Equity screen scoring 50+ securities on momentum, value and growth; benchmarked alternatives (HFR indices); decomposed structured products; coupon tracker for worst-of autocallables.
- AI-assisted automation of Bloomberg/Excel reporting cut prep time by ~95%. Built "Hermes", a morning market-update system; Power Query pipelines; term-sheet automation tool; 16-skill custom AI library.
- Use the CV numbers above (30 portfolios, ~95%, 1 → 4 PMs). Do not use older figures (20+, 3–4h→20m, 3 of ~6).
- Never show client names, holdings or internal file names.

## Leadership
- Head of Finance, Women in Finance, CBS (Sep 2026 – present): budget, sponsorships, industry events.
- CEMS Corporate & Alumni Team (2026): launched and led a mentorship programme pairing up to 20 students with alumni.
- Member, CBS Venture Capital Club and Private Equity Club.
- Volunteer, Wild Goose Shelter, Bristol (2023–24); taught English in Nepal (2017).

## Skills
Excel (modelling, Power Query, VBA), Python (pandas, scikit-learn, hmmlearn), SQL, MATLAB, Stata, Bloomberg (incl. BQL), FactSet. Certifications: Bloomberg Market Concepts, Bloomberg Financial Fundamentals, Bloomberg BQL, AmplifyMe Asset Management Academy.

## Projects (folder names = GitHub folders; screenshots in source/screenshots/sNN-pX.jpg)
01 Substrate Capital, systematic 130/30 long-short, AI infrastructure (Asset Management, Jun 2026). Team of 4: Amir Alexander Csüri (strategy & ML), Mia (risk framework & methodology), Gavin Campbell (backtest validation), Marco Vujosevic (fund structure). 58 names, random forest, 15 features, HMM regime overlay, walk-forward, 2-month embargo, 15 bps per side. Pitched variant D: CAGR 27.7%, Sharpe 1.01, deflated Sharpe 0.84, max DD −43.1%, COVID DD −19.48%, 147 months, cumulative +1,907.75%, alpha 5.2% (t = 0.67). Variants: A neutral no overlay Sharpe 0.22 / DSR 0.09 / DD −30%; B 130/30 no overlay 1.05 / 0.87 / −43%; C neutral + overlay 0.22 / 0.08 / −28%; D 130/30 + overlay 1.01 / 0.84 / −43%. Survivorship (37 pre-2012 names): Sharpe 1.00, DSR 0.84.
02 Bloomberg Trading Challenge (Asset Pricing, 6–20 Mar 2026). Group 2: Mia, Leonor dos Reis Ribeiro, Paula Mora Vargas, Sofia Pinho. €100M book, +0.695% vs −2.4% B500 (+3.1 pp), Sharpe 1.61, Sortino 3.00, vol 10.6%, max DD < 0.98%, 54.3% cash.
03 IAG equity valuation (Corporate Valuation, Mar 2026). Team 6 (6 people). BUY, target €8.07 vs €4.60 (+75%), WACC 7.2%, DCF €10.08 (sensitivity grid base €10.17), TV 61% of EV. Sensitivity grid (WACC rows 5.5,6.0,6.5,7.0,7.2,7.5,8.0,8.5,9.0 × g 1.0..3.0): see prototype/v4-reference.html (GRID).
04 Nike activist valuation (Finance Project, Prof. Batlloria, 22 Mar 2026). Team 6, management side. As-is $45.68, management $69.05, activist consensus $67.31 vs $52.40; WACC 8.43%. Monte Carlo: mean ~$67, median $65, P10–P90 $44–$99, ~75% above $52.40, ~50% above $69.
05 Nike strategic & financial analysis (Finance Project, 2026). ROIC 21.1% (2024); ROE 39.5% → 24.36%; DuPont.
06 Derivatives group assignment (Prof. Carlo Sala, Mar 2026). 10 problems; GBM S0 100, μ 0.30, σ 0.38, T 5, 100,000 paths.
07 Fixed income: duration, convexity, immunization, butterfly (2026, Group 6).
08 Private client portfolio (Investments, Nov 2025, Group 4: Henry Dixon, Mia, Clemens Bene, Alejandro Font-Beltran, Tomiris Kabidullina, Malak Fanous). E(R) 9.995%, Sharpe 1.117 vs 0.836.
09 Swiss single-family office (University of St. Gallen, Investing in Capital Markets, Jan 2026; Group 4: Mia, Pablo Diez Venegas, Simone Fortunato, Gerard Alexander Merino Gonzalez, Yash Khandai). CHF 500M, CHF 5M/yr liquidity, target 10.4%, ~60% illiquid. Only the cover renders cleanly; full PDF pending re-export.
10 Central banks: Fed vs ECB (Investments, Nov 2025, Group 4).
11 Two-week futures trading challenge (Derivatives, Feb 2026, Group 6). 4th place. 100,000 → 113,396.63, +13.40%, max DD −27.10%, ES/MES/NQ/MNQ, gold, silver, FX; EMA pullback and failed-breakout setups; ≥2:1 R.
Not published / do not mention as public: thesis & defence deck (pending), Search Fund deck (not Mia's work), Thales pitch (origin unclear).
Coming later: Strata Intelligence Ventures VC fund PPM (Mia owned exit strategy & portfolio involvement).

## Website decisions (confirmed by Mia, Oct 2026)
- Site headline: "Decompose. Model. Stress-test. Decide." (option C). Her own phrasing "Markets are the most interesting machine I've taken apart." stays as the lede.
- Email may be shown on the site: mia.beckercooper@alumni.esade.edu.
- Publish straight to main at each milestone.

## Appendix A: IAG DCF sensitivity grid (value per share, €; copied verbatim from prototype/v4-reference.html GRID, confirmed by Mia)
Share price €4.60. Base case WACC 7.2%, g 2.0% → €10.17.

| WACC \ g | 1.0% | 1.5% | 2.0% | 2.5% | 3.0% |
|---|---|---|---|---|---|
| 5.5% | 14.94 | 15.75 | 16.79 | 18.16 | 20.07 |
| 6.0% | 12.95 | 13.52 | 14.24 | 15.15 | 16.36 |
| 6.5% | 11.33 | 11.74 | 12.24 | 12.87 | 13.66 |
| 7.0% | 9.98 | 10.28 | 10.64 | 11.08 | 11.62 |
| 7.2% | 9.57 | 9.85 | 10.17 | 10.56 | 11.03 |
| 7.5% | 8.85 | 9.07 | 9.33 | 9.64 | 10.01 |
| 8.0% | 7.89 | 8.05 | 8.24 | 8.46 | 8.72 |
| 8.5% | 7.06 | 7.18 | 7.32 | 7.48 | 7.66 |
| 9.0% | 6.35 | 6.44 | 6.54 | 6.65 | 6.78 |

## Profile and hobbies (Mia's own words, Oct 2026)
- Reads philosophy and politics.
- Chess: trying to beat her boyfriend.
- Pilates and dance.
- Volunteers at homeless shelters (see Wild Goose Shelter, Bristol, 2023–24).
- Builds AI agents (see Hermes and the 16-skill AI library at ANDBank).

## Photos (source/photos, supplied by Mia, Oct 2026)
- portrait-hallway.jpg: Mia, arms crossed, white hallway. Hero.
- headshot.jpg: Mia, plain white wall. Profile.
- cems-group.jpg: group photo at a CEMS event at CBS (Mia's exact role at this event not stated; caption neutrally).
