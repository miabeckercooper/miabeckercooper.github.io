import { leadership as L } from "../content/cv";
import { Photo } from "../ui/Photo";
import { Queen } from "../ui/Queen";

export function Leadership() {
  return (
    <section className="block leadership" id="leadership" aria-labelledby="lead-title">
      <div className="wrap">
        <p className="kicker">{L.label}</p>
        <h2 className="section-title" id="lead-title">{L.title}</h2>
        <div className="lead-grid">
          <figure>
            <div className="lead-poster">
              <Photo name={L.team.name} alt={L.team.alt} sizes="(max-width: 860px) 92vw, 560px" width={1170} height={1152} />
            </div>
            <figcaption className="cap">{L.team.caption}</figcaption>
          </figure>
          <div>
            <div className="lead-intro">
              <div className="queen"><Queen /></div>
              <p>{L.intro}</p>
            </div>
            <ul className="roles">
              {L.roles.map((r) => (
                <li key={r.title}>
                  <h3>{r.title}</h3>
                  <span className="meta">{[r.org, r.dates].filter(Boolean).join(" · ")}</span>
                  {r.body && <p>{r.body}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className="lead-wide">
          <div className="ph">
            <Photo name={L.community.name} alt={L.community.alt} sizes="(max-width: 1240px) 96vw, 1200px" width={2048} height={1536} />
          </div>
          <figcaption className="cap">{L.community.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
