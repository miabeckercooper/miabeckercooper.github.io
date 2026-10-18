import { useId, useState } from "react";
import { models } from "../../content/cv";

const D = models.dcf;
const pct = (x: number) => `${x.toFixed(1)}%`;
const eur = (x: number) => `€${x.toFixed(2)}`;
const lo = Math.min(...D.grid.flat()), hi = Math.max(...D.grid.flat());

export function DcfGrid() {
  const [wi, setWi] = useState(D.wacc.indexOf(D.baseWacc));
  const [gi, setGi] = useState(D.g.indexOf(D.baseG));
  const id = useId();
  const v = D.grid[wi][gi];
  const up = (v / D.price - 1) * 100;
  return (
    <div className="lab-grid">
      <div>
        <h3>{D.title}</h3>
        <p className="lab-intro">{D.intro}</p>
        <div className="ctrl">
          <label className="rangehead" htmlFor={`${id}-w`}><span className="label">WACC</span><b>{pct(D.wacc[wi])}</b></label>
          <input id={`${id}-w`} type="range" min={0} max={D.wacc.length - 1} step={1} value={wi}
            aria-valuetext={pct(D.wacc[wi])} onChange={(e) => setWi(+e.target.value)} />
        </div>
        <div className="ctrl">
          <label className="rangehead" htmlFor={`${id}-g`}><span className="label">Terminal growth</span><b>{pct(D.g[gi])}</b></label>
          <input id={`${id}-g`} type="range" min={0} max={D.g.length - 1} step={1} value={gi}
            aria-valuetext={pct(D.g[gi])} onChange={(e) => setGi(+e.target.value)} />
        </div>
        <p className="label">DCF value per share</p>
        <p className="big" aria-live="polite">{eur(v)}</p>
        <span className={`verdict ${up > 0 ? "pass" : "fail"}`}>
          {up > 0 ? "+" : ""}{up.toFixed(0)}% vs {eur(D.price)} share price
        </span>
        <p className="note">{D.note}</p>
      </div>
      <div className="heat-wrap">
        <table className="heat">
          <caption className="sr-only">IAG DCF value per share by WACC (rows) and terminal growth (columns)</caption>
          <thead>
            <tr><th scope="col">WACC \ g</th>{D.g.map((g) => <th scope="col" key={g}>{pct(g)}</th>)}</tr>
          </thead>
          <tbody>
            {D.grid.map((row, i) => (
              <tr key={D.wacc[i]}>
                <th scope="row">{pct(D.wacc[i])}</th>
                {row.map((c, j) => {
                  const t = (c - lo) / (hi - lo);
                  const on = i === wi && j === gi;
                  return (
                    <td key={j} className={on ? "on" : undefined}
                      style={{ background: `color-mix(in srgb, var(--accent) ${Math.round(8 + t * 72)}%, var(--sheet))`, color: t > 0.5 ? "var(--sheet)" : "var(--ink)" }}>
                      <button type="button" aria-pressed={on} aria-label={`WACC ${pct(D.wacc[i])}, growth ${pct(D.g[j])}: ${eur(c)}`}
                        onClick={() => { setWi(i); setGi(j); }}>{eur(c)}</button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
