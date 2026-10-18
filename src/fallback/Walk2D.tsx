import { stations, walkCopy } from "../content/cv";
import { HeroCopy } from "../ui/HeroCopy";
import { StationPanel } from "../walk/StationPanel";
import { FloorSvg } from "./FloorSvg";

/** The 2D version: SVG floor hero plus a vertical timeline. Used for no WebGL, reduced motion, SSR and no-JS. */
export function Walk2D() {
  return (
    <div className="walk-2d dark on-term">
      <div className="hero2d" id="top">
        <div className="wrap">
          <HeroCopy />
          <FloorSvg />
        </div>
      </div>
      <section className="timeline" id="career" aria-labelledby="career-title">
        <div className="wrap">
          <div className="timeline-head">
            <p className="label">{walkCopy.label}</p>
            <h2 id="career-title">{walkCopy.title}</h2>
          </div>
          <ol className="tl">
            {stations.map((s) => (
              <li key={s.n} className={s.jump ? "is-jump" : undefined}>
                <StationPanel s={s} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
