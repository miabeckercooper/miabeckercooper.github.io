import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { models } from "../../content/cv";
import { prefersReducedMotion } from "../../lib/env";
import { normal, quantile, rng } from "../../lib/rng";
import { cssVar, useCanvas } from "./useCanvas";

const G = models.gbm;
const STEPS = 60, DRAWN = 48, TERMINAL = 4000;

function simulate(sigma: number, seed: number) {
  const r = rng(seed);
  const dt = G.years / STEPS;
  const drift = (G.mu - (sigma * sigma) / 2) * dt, vol = sigma * Math.sqrt(dt);
  const paths: number[][] = [];
  for (let p = 0; p < DRAWN; p++) {
    let s = G.s0; const path = [s];
    for (let i = 0; i < STEPS; i++) { s *= Math.exp(drift + vol * normal(r)); path.push(s); }
    paths.push(path);
  }
  // Terminal values drawn exactly from the lognormal, for stable mean and median.
  const finals = Array.from({ length: TERMINAL }, () =>
    G.s0 * Math.exp((G.mu - (sigma * sigma) / 2) * G.years + sigma * Math.sqrt(G.years) * normal(r)));
  return { paths, finals: finals.sort((a, b) => a - b) };
}

export function GbmPaths() {
  const [sigma, setSigma] = useState(Math.round(G.sigma * 100));
  const [seed, setSeed] = useState(11);
  const [progress, setProgress] = useState(1);
  const raf = useRef(0);
  const id = useId();
  const sim = useMemo(() => simulate(sigma / 100, seed), [sigma, seed]);
  const mean = sim.finals.reduce((a, b) => a + b, 0) / sim.finals.length;
  const median = quantile(sim.finals, 0.5);
  const below = sim.finals.filter((v) => v < G.s0).length / sim.finals.length;
  const s = sigma / 100;
  const theoMean = G.s0 * Math.exp(G.mu * G.years);
  const theoMedian = G.s0 * Math.exp((G.mu - (s * s) / 2) * G.years);

  const redraw = () => {
    cancelAnimationFrame(raf.current);
    setSeed((x) => x + 1);
    if (prefersReducedMotion()) { setProgress(1); return; }
    let t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / 1200);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const L = 44, B = 24, T = 10, R = 10, maxV = 3000, minV = 10;
    const Y = (v: number) => T + (1 - (Math.log(Math.max(v, minV)) - Math.log(minV)) / (Math.log(maxV) - Math.log(minV))) * (h - T - B);
    const X = (i: number) => L + (i / STEPS) * (w - L - R);
    const dim = cssVar("--ink-2"), acc = cssVar("--accent"), brass = cssVar("--brass"), rule = cssVar("--rule"), ink = cssVar("--ink");
    ctx.font = "11px 'JetBrains Mono Variable', monospace"; ctx.lineWidth = 1;
    [25, 100, 400, 1600].forEach((v) => {
      ctx.strokeStyle = rule; ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(w - R, Y(v)); ctx.stroke();
      ctx.fillStyle = dim; ctx.fillText(String(v), 4, Y(v) + 4);
    });
    for (let yr = 0; yr <= G.years; yr++) { ctx.fillStyle = dim; ctx.fillText(`Y${yr}`, X((yr * STEPS) / G.years) - 6, h - 6); }
    const upto = Math.max(1, Math.floor(STEPS * progress));
    ctx.strokeStyle = acc; ctx.globalAlpha = 0.3;
    sim.paths.forEach((p) => { ctx.beginPath(); for (let i = 0; i <= upto; i++) { const y = Y(p[i]); if (i) ctx.lineTo(X(i), y); else ctx.moveTo(X(i), y); } ctx.stroke(); });
    ctx.globalAlpha = 1;
    if (progress >= 1) {
      ([[mean, "mean", brass, w - R - 100], [median, "median", ink, L + 6]] as const).forEach(([v, t, c, lx]) => {
        ctx.strokeStyle = c; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(w - R, Y(v)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = c; ctx.fillText(`${t} ${v.toFixed(0)}`, lx, Y(v) - 5);
      });
    }
  }, [sim, progress, mean, median]);
  const ref = useCanvas(draw, 0.5);

  return (
    <div className="lab-grid">
      <div>
        <span className="sim-tag">Simulated</span>
        <h3>{G.title}</h3>
        <p className="lab-intro">{G.intro}</p>
        <div className="ctrl">
          <label className="rangehead" htmlFor={`${id}-s`}><span className="label">Volatility σ</span><b>{sigma}%</b></label>
          <input id={`${id}-s`} type="range" min={10} max={60} step={1} value={sigma}
            aria-valuetext={`${sigma}%`} onChange={(e) => { setSigma(+e.target.value); setProgress(1); }} />
        </div>
        <button type="button" className="btn" onClick={redraw}>{G.run}</button>
        <p className="note">{G.note}</p>
      </div>
      <div>
        <canvas ref={ref} className="plot" role="img" aria-label={`${DRAWN} simulated price paths over ${G.years} years at ${sigma}% volatility, log scale. Mean ${mean.toFixed(0)}, median ${median.toFixed(0)}.`} />
        <div className="stats" aria-live="polite">
          <div className="stat"><b>{mean.toFixed(0)}</b><span>mean after {G.years}y (theory {theoMean.toFixed(0)})</span></div>
          <div className="stat"><b>{median.toFixed(0)}</b><span>median after {G.years}y (theory {theoMedian.toFixed(0)})</span></div>
          <div className="stat"><b>{(below * 100).toFixed(0)}%</b><span>end below {G.s0}</span></div>
        </div>
      </div>
    </div>
  );
}
