import { useCallback, useEffect, useRef, useState } from "react";
import { models } from "../../content/cv";
import { prefersReducedMotion } from "../../lib/env";
import { normal, quantile, rng } from "../../lib/rng";
import { cssVar, useCanvas } from "./useCanvas";

const M = models.mc;
// Reconstruction: a two-piece lognormal around the reported median that reproduces the reported P10 and P90.
const Z90 = 1.2815515655;
const sLo = Math.log(M.median / M.p10) / Z90;
const sHi = Math.log(M.p90 / M.median) / Z90;
const N = 5000, BATCH = 250;

function sample(r: () => number, n: number) {
  const out = new Array<number>(n);
  for (let i = 0; i < n; i++) { const z = normal(r); out[i] = M.median * Math.exp(z * (z < 0 ? sLo : sHi)); }
  return out;
}

export function MonteCarlo() {
  const seed = useRef(7);
  const [xs, setXs] = useState<number[]>(() => sample(rng(seed.current), N));
  const raf = useRef(0);

  const run = () => {
    cancelAnimationFrame(raf.current);
    const r = rng(++seed.current);
    if (prefersReducedMotion()) { setXs(sample(r, N)); return; }
    let acc: number[] = [];
    const step = () => {
      acc = acc.concat(sample(r, BATCH));
      setXs(acc);
      if (acc.length < N) raf.current = requestAnimationFrame(step);
    };
    step();
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const lo = 20, hi = 160, bins = 46, L = 34, B = 26, T = 12, R = 10;
    const X = (v: number) => L + ((v - lo) / (hi - lo)) * (w - L - R);
    const counts = new Array(bins).fill(0);
    xs.forEach((s) => { const b = Math.floor(((s - lo) / (hi - lo)) * bins); if (b >= 0 && b < bins) counts[b]++; });
    const max = Math.max(...counts, 1);
    const dim = cssVar("--ink-2"), acc = cssVar("--accent"), brass = cssVar("--brass"), loss = cssVar("--loss"), rule = cssVar("--rule");
    ctx.font = "11px 'JetBrains Mono Variable', monospace";
    ctx.lineWidth = 1;
    [40, 60, 80, 100, 120, 140].forEach((v) => {
      ctx.strokeStyle = rule; ctx.beginPath(); ctx.moveTo(X(v), T); ctx.lineTo(X(v), h - B); ctx.stroke();
      ctx.fillStyle = dim; ctx.fillText(`$${v}`, X(v) - 12, h - 8);
    });
    const bw = (w - L - R) / bins;
    counts.forEach((c, i) => {
      const v = lo + ((i + 0.5) * (hi - lo)) / bins;
      const bh = (c / max) * (h - B - T - 8);
      ctx.fillStyle = v < M.price ? loss : acc;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(L + i * bw + 1, h - B - bh, bw - 2, bh);
    });
    ctx.globalAlpha = 1;
    ([[M.price, `Price $${M.price.toFixed(2)}`, loss], [M.base, `Base $${M.base.toFixed(2)}`, brass]] as const).forEach(([v, t, c], k) => {
      ctx.strokeStyle = c; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(v), T); ctx.lineTo(X(v), h - B); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = c; ctx.fillText(t, X(v) + 4, T + 10 + k * 14);
    });
  }, [xs]);
  const ref = useCanvas(draw, 0.5);

  const sorted = [...xs].sort((a, b) => a - b);
  const above = sorted.filter((s) => s > M.price).length / Math.max(1, sorted.length);
  return (
    <div className="lab-grid">
      <div>
        <span className="sim-tag">Simulated</span>
        <h3>{M.title}</h3>
        <p className="lab-intro">{M.intro}</p>
        <button type="button" className="btn" onClick={run}>{M.run}</button>
        <p className="note">{M.note}</p>
      </div>
      <div>
        <canvas ref={ref} className="plot" role="img" aria-label={`Histogram of ${sorted.length} simulated Nike values per share. ${(above * 100).toFixed(0)}% are above the $52.40 share price.`} />
        <div className="stats" aria-live="polite">
          <div className="stat"><b>{(above * 100).toFixed(0)}%</b><span>P(value &gt; $52.40)</span></div>
          <div className="stat"><b>${quantile(sorted, 0.5).toFixed(0)}</b><span>median</span></div>
          <div className="stat"><b>${quantile(sorted, 0.1).toFixed(0)}–{quantile(sorted, 0.9).toFixed(0)}</b><span>P10–P90</span></div>
        </div>
      </div>
    </div>
  );
}
