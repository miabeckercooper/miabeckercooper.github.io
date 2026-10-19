import { ticker } from "../content/cv";

/** A moving band of highlights. The list is rendered twice so the loop is seamless; the copy is hidden from screen readers. */
export function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Highlights">
      <ul>
        {ticker.map((t) => <li key={t}>{t}</li>)}
        {ticker.map((t) => <li key={`${t}-2`} aria-hidden="true">{t}</li>)}
      </ul>
    </div>
  );
}
