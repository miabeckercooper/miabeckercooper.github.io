import { areas, models, projects, research } from "../content/cv";
import { openModel } from "../lib/modelStore";

const W = 320, H = 180;

/** IAG: the real WACC × g grid as a heatmap. */
function Heatmap() {
  const { grid, wacc, g } = models.dcf;
  const flat = grid.flat(), lo = Math.min(...flat), hi = Math.max(...flat);
  const L = 40, T = 8, B = 22, cw = (W - L - 6) / g.length, ch = (H - T - B) / wacc.length;
  return (
    <>
      {grid.map((row, i) => row.map((v, j) => {
        const t = (v - lo) / (hi - lo);
        return <rect key={`${i}-${j}`} x={L + j * cw} y={T + i * ch} width={cw - 2} height={ch - 2} rx={2}
          fill="var(--accent)" opacity={0.12 + 0.85 * t} />;
      }))}
      {wacc.map((w, i) => (i % 2 === 0 ? <text key={w} x={L - 6} y={T + i * ch + ch / 2 + 4} textAnchor="end" className="rc-t">{w.toFixed(1)}%</text> : null))}
      {g.map((x, j) => <text key={x} x={L + j * cw + cw / 2} y={H - 6} textAnchor="middle" className="rc-t">{x.toFixed(1)}%</text>)}
    </>
  );
}

/** Substrate: Sharpe and deflated Sharpe for variants A–D. */
function Variants() {
  const v = models.backtest.variants, max = 1.2, L = 8, B = 22, T = 10, gw = (W - L * 2) / v.length;
  const y = (x: number) => T + (1 - x / max) * (H - T - B);
  return (
    <>
      {v.map((d, i) => {
        const x0 = L + i * gw + gw * 0.18, bw = gw * 0.3;
        return (
          <g key={d.id}>
            <rect x={x0} y={y(d.sharpe)} width={bw} height={y(0) - y(d.sharpe)} rx={2} fill="var(--ink-2)" opacity={0.45} />
            <rect x={x0 + bw + 3} y={y(d.dsr)} width={bw} height={y(0) - y(d.dsr)} rx={2} fill={d.pitched ? "var(--accent)" : "var(--ink-2)"} />
            <text x={x0 + bw} y={H - 6} textAnchor="middle" className="rc-t">{d.id}</text>
          </g>
        );
      })}
      <line x1={L} x2={W - L} y1={y(0)} y2={y(0)} stroke="var(--line)" />
      <rect x={W - 150} y={T - 2} width={9} height={9} rx={2} fill="var(--ink-2)" opacity={0.45} />
      <text x={W - 137} y={T + 6} className="rc-t">Sharpe</text>
      <rect x={W - 86} y={T - 2} width={9} height={9} rx={2} fill="var(--accent)" />
      <text x={W - 73} y={T + 6} className="rc-t">Deflated</text>
    </>
  );
}

/** Nike: the two-piece lognormal density implied by the reported median, P10 and P90 (drawn, not sampled). */
function Distribution() {
  const { median, p10, p90, price } = models.mc;
  const z = 1.2815515655, sLo = Math.log(median / p10) / z, sHi = Math.log(p90 / median) / z;
  const pdf = (x: number) => { const s = x < median ? sLo : sHi; const k = Math.log(x / median) / s; return Math.exp(-0.5 * k * k) / (x * s); };
  const lo = 20, hi = 160, n = 36, L = 8, B = 22, T = 10;
  const xs = Array.from({ length: n }, (_, i) => lo + ((i + 0.5) * (hi - lo)) / n);
  const ds = xs.map(pdf), max = Math.max(...ds), bw = (W - L * 2) / n;
  const X = (v: number) => L + ((v - lo) / (hi - lo)) * (W - L * 2);
  return (
    <>
      {xs.map((x, i) => {
        const h = (ds[i] / max) * (H - T - B);
        return <rect key={i} x={L + i * bw + 1} y={H - B - h} width={bw - 2} height={h} rx={1} fill={x < price ? "var(--loss)" : "var(--accent)"} opacity={0.85} />;
      })}
      <line x1={X(price)} x2={X(price)} y1={T} y2={H - B} stroke="var(--ink)" strokeDasharray="3 3" />
      <text x={X(price) - 4} y={T + 10} textAnchor="end" className="rc-t rc-halo">Price ${price.toFixed(2)}</text>
      <text x={W - L} y={T + 10} textAnchor="end" className="rc-t">{models.mc.probLabel}</text>
      {[40, 80, 120].map((v) => <text key={v} x={X(v)} y={H - 6} textAnchor="middle" className="rc-t">${v}</text>)}
    </>
  );
}

/** Project book: count of projects per area, as a donut. */
function Allocation() {
  const counts = areas.filter((a) => a.id !== "all").map((a) => ({ a, n: projects.filter((p) => p.area === a.id).length }));
  const total = counts.reduce((s, c) => s + c.n, 0), cx = 90, cy = H / 2, r = 62, w = 22;
  const colour: Record<string, string> = { quant: "var(--steel)", valuation: "var(--violet)", derivatives: "var(--green)", wealth: "#8A6CF0", macro: "var(--ember)" };
  let acc = 0;
  return (
    <>
      {counts.map(({ a, n }) => {
        const start = (acc / total) * 2 * Math.PI, end = ((acc + n) / total) * 2 * Math.PI; acc += n;
        const p = (t: number, rr: number) => `${cx + rr * Math.sin(t)},${cy - rr * Math.cos(t)}`;
        const large = end - start > Math.PI ? 1 : 0;
        return <path key={a.id} d={`M${p(start, r)} A${r},${r} 0 ${large} 1 ${p(end - 0.02, r)} L${p(end - 0.02, r - w)} A${r - w},${r - w} 0 ${large} 0 ${p(start, r - w)} Z`} fill={colour[a.id]} />;
      })}
      <text x={cx} y={cy + 8} textAnchor="middle" className="rc-big">{total}</text>
      {counts.map(({ a, n }, i) => (
        <g key={a.id} transform={`translate(176, ${28 + i * 27})`}>
          <rect width={10} height={10} rx={2} fill={colour[a.id]} y={-9} />
          <text x={16} className="rc-l">{a.label} · {n}</text>
        </g>
      ))}
    </>
  );
}

const CHARTS = { heatmap: Heatmap, variants: Variants, distribution: Distribution, allocation: Allocation };

export function Research() {
  return (
    <section className="block research" id="research" aria-labelledby="research-title">
      <div className="wrap">
        <div className="sec-top">
          <div>
            <p className="kicker">{research.label}</p>
            <h2 className="section-title" id="research-title">{research.title}</h2>
          </div>
          <p className="section-intro">{research.intro}</p>
        </div>
        <ul className="rcards">
          {research.cards.map((c) => {
            const Chart = CHARTS[c.kind];
            return (
              <li key={c.kind}>
                <article className="rcard">
                  <div className="rchart">
                    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${c.title}: ${c.body}`}><Chart /></svg>
                  </div>
                  <p className="rsub">{c.sub}</p>
                  <h3>{c.title}</h3>
                  <p className="rbody">{c.body}</p>
                  <p className="rsrc">{c.source}</p>
                  {c.model
                    ? <button type="button" className="rcta" onClick={() => openModel(c.model)}>{c.cta} <span aria-hidden="true">→</span></button>
                    : <a className="rcta" href="#projects">{c.cta} <span aria-hidden="true">→</span></a>}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
