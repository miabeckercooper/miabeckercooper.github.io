import { useState } from "react";
import { models } from "../../content/cv";

const B = models.backtest;
const SCALE = 1.2;

export function BacktestLab() {
  const [sizing, setSizing] = useState<"neutral" | "130/30">("130/30");
  const [overlay, setOverlay] = useState(true);
  const v = B.variants.find((x) => x.sizing === sizing && x.overlay === overlay)!;
  const best = Math.max(...B.variants.map((x) => x.dsr));
  const survives = v.dsr > best / 2;
  return (
    <div className="lab-grid">
      <div>
        <span className="sim-tag">Simulated backtest</span>
        <h3>{B.title}</h3>
        <p className="lab-intro">{B.intro}</p>
        <div className="ctrl">
          <span className="label" id="bt-size">Sizing</span>
          <div className="seg" role="group" aria-labelledby="bt-size">
            <button type="button" aria-pressed={sizing === "neutral"} onClick={() => setSizing("neutral")}>Market neutral</button>
            <button type="button" aria-pressed={sizing === "130/30"} onClick={() => setSizing("130/30")}>130/30</button>
          </div>
        </div>
        <div className="ctrl">
          <span className="label" id="bt-ov">Regime overlay (HMM)</span>
          <div className="seg" role="group" aria-labelledby="bt-ov">
            <button type="button" aria-pressed={!overlay} onClick={() => setOverlay(false)}>Off</button>
            <button type="button" aria-pressed={overlay} onClick={() => setOverlay(true)}>On</button>
          </div>
        </div>
        <p className="note">{B.note}</p>
      </div>
      <div aria-live="polite">
        <p className="label">Variant {v.name}{v.pitched ? " · pitched" : ""}</p>
        <div className="bars" style={{ marginTop: 12 }}>
          <Bar label="Sharpe ratio" value={v.sharpe.toFixed(2)} pct={(v.sharpe / SCALE) * 100} />
          <Bar label="Deflated Sharpe" value={v.dsr.toFixed(2)} pct={(v.dsr / SCALE) * 100} />
          <Bar label="Max drawdown" value={`${v.maxDd}%`} pct={Math.abs(v.maxDd) * 2} neg />
        </div>
        <span className={`verdict ${survives ? "pass" : "fail"}`}>
          {survives ? "✓ Survives deflation" : "✕ Indistinguishable from noise"}
        </span>
        <p className="note" style={{ marginTop: 10 }}>{v.verdict}</p>
        {v.pitched && (
          <div className="stats">
            <div className="stat"><b>{B.pitched.cagr}</b><span>CAGR</span></div>
            <div className="stat"><b>{B.pitched.cumulative}</b><span>cumulative, {B.pitched.months}</span></div>
            <div className="stat"><b>{B.pitched.alpha}</b><span>{B.pitched.alphaNote}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Bar({ label, value, pct, neg }: { label: string; value: string; pct: number; neg?: boolean }) {
  return (
    <div className="bar">
      <div className="row"><span>{label}</span><b>{value}</b></div>
      <div className="track" aria-hidden="true"><div className={`fill${neg ? " neg" : ""}`} style={{ width: `${Math.min(100, pct)}%` }} /></div>
    </div>
  );
}
