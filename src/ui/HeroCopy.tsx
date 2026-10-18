import { identity, kpis, walkCopy } from "../content/cv";
import { Kpis } from "./Kpis";

/** Headline, lede, KPIs and the two calls to action. Shared by the 3D overlay and the 2D hero. */
export function HeroCopy({ onWalk, kpiDelay = 0 }: { onWalk?: () => void; kpiDelay?: number }) {
  return (
    <div className="hero-copy">
      <p className="label eyebrow">{identity.eyebrow}</p>
      <h1>
        {identity.headline.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </h1>
      <p className="lede">{identity.lede}</p>
      <Kpis items={kpis} delay={kpiDelay} />
      <div className="btns">
        <a
          className="btn solid"
          href="#career"
          onClick={(e) => {
            if (onWalk) { e.preventDefault(); onWalk(); }
          }}
        >
          {walkCopy.start} <span aria-hidden="true">↓</span>
        </a>
        <a className="btn" href="#models">{walkCopy.models}</a>
      </div>
    </div>
  );
}
