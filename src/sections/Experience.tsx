import { experience } from "../content/cv";

/** ANDBank as an engineering drawing: achievements in the body, facts and metrics in the title block. */
export function Experience() {
  const e = experience;
  return (
    <section className="band" id="experience" aria-labelledby="exp-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">{e.label}</p>
            <h2 id="exp-title">{e.title}</h2>
          </div>
        </div>
        <div className="drawing">
          <div className="drawing-body">
            <ul>
              {e.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <p className="privacy">{e.privacy}</p>
          </div>
          <dl className="titleblock">
            <div className="wide"><dt>Firm</dt><dd>{e.firm}</dd></div>
            <div className="wide"><dt>Role</dt><dd>{e.role}</dd></div>
            <div><dt>Dates</dt><dd>{e.dates}</dd></div>
            <div><dt>Drawing</dt><dd>{e.drawingNo}</dd></div>
            <div className="wide"><dt>Sector</dt><dd>{e.sector}</dd></div>
            <div className="wide"><dt>Stack</dt><dd>{e.stack}</dd></div>
            {e.metrics.map((m) => (
              <div className="metric" key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
