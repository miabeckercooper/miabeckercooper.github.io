import { ticker } from "../content/cv";

/** Splits "Name ▲ value" so the arrow can be coloured like a market tape. */
function Item({ t }: { t: string }) {
  const m = /^(.*?)\s*([▲▼])\s*(.*)$/.exec(t);
  if (!m) return <>{t}</>;
  return <>{m[1]} <span className={m[2] === "▲" ? "up" : "dn"} aria-hidden="true">{m[2]}</span> {m[3]}</>;
}

/** A moving band of highlights. Rendered twice for a seamless loop; the copy is hidden from screen readers. */
export function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Highlights">
      <ul>
        {ticker.map((t) => <li key={t}><Item t={t} /></li>)}
        {ticker.map((t) => <li key={`${t}-2`} aria-hidden="true"><Item t={t} /></li>)}
      </ul>
    </div>
  );
}
