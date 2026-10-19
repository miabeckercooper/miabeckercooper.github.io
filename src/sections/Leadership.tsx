import { leadership as L } from "../content/cv";
import { Photo } from "../ui/Photo";
import { Queen } from "../ui/Queen";

export function Leadership() {
  return (
    <section className="block" id="leadership" aria-labelledby="lead-title">
      <div className="wrap">
        <p className="kicker">{L.label}</p>
        <h2 className="section-title" id="lead-title">{L.title}</h2>
        <div className="lead-grid">
          <div className="queen"><Queen /></div>
          <div>
            <p className="section-intro" style={{ marginTop: 0 }}>{L.intro}</p>
            <div className="lead-photo" style={{ marginTop: 24 }}>
              <Photo name="cems-group" alt="Group photo of students at a CEMS event at Copenhagen Business School" sizes="(max-width: 860px) 92vw, 680px" width={2048} height={1536} />
            </div>
            <p>CEMS community at Copenhagen Business School.</p>
          </div>
        </div>
        <ul className="roles">
          {L.roles.map((r) => (
            <li key={r.title}>
              <h3>{r.title}</h3>
              <p className="meta">{[r.org, r.dates].filter(Boolean).join(" · ")}</p>
              {r.body && <p>{r.body}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
