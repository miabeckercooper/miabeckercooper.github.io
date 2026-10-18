import { leadership as L } from "../content/cv";

export function Leadership() {
  return (
    <section className="band" id="leadership" aria-labelledby="lead-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">{L.label}</p>
            <h2 id="lead-title">{L.title}</h2>
          </div>
        </div>
        <div className="cols">
          <div>
            <h3 className="col-title">Leadership</h3>
            <ul className="entries">
              {L.roles.map((r) => (
                <li key={r.title}>
                  <h4>{r.title}</h4>
                  <p className="meta">{[r.org, r.dates].filter(Boolean).join(" · ")}</p>
                  {r.body && <p>{r.body}</p>}
                </li>
              ))}
            </ul>
            <h3 className="col-title" style={{ marginTop: 24 }}>Languages</h3>
            <dl className="langs">
              {L.languages.map((l) => (
                <div key={l.name}><dt>{l.name}</dt><dd>{l.level}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="col-title">Education</h3>
            <ul className="entries">
              {L.education.map((r) => (
                <li key={r.title}>
                  <h4>{r.title}</h4>
                  <p className="meta">{r.org} · {r.dates}</p>
                  <p>{r.body}</p>
                </li>
              ))}
            </ul>
            <h3 className="col-title" style={{ marginTop: 24 }}>Skills</h3>
            <dl className="skills">
              {L.skills.map((s) => (
                <div key={s.group}><dt>{s.group}</dt><dd>{s.items}</dd></div>
              ))}
            </dl>
            <h3 className="col-title" style={{ marginTop: 24 }}>Certifications</h3>
            <ul className="certs">
              {L.certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
