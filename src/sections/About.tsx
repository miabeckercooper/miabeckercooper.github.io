import { about, leadership as L } from "../content/cv";
import { HobbyIcon } from "../ui/HobbyIcon";
import { Photo } from "../ui/Photo";

/** Bar length for each language level (a visual scale, not a test score). */
const LEVEL: Record<string, number> = { Native: 100, Fluent: 85, Intermediate: 55, Learning: 25 };

export function About() {
  return (
    <section className="block about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <p className="kicker">{about.label}</p>
        <h2 className="section-title" id="about-title">{about.title}</h2>
        <div className="about-grid">
          <div className="about-photo">
            <Photo name={about.photo.name} alt={about.photo.alt} sizes="(max-width: 860px) 320px, 400px" width={750} height={1000} />
          </div>
          <div>
            <p className="section-intro" style={{ marginTop: 0, marginBottom: 24 }}>{about.intro}</p>
            <ul className="hobbies">
              {about.hobbies.map((h) => (
                <li key={h.title}>
                  <span className="ico"><HobbyIcon name={h.icon} /></span>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="facts-cols">
          <div>
            <h3>Education</h3>
            <ul className="edu">
              {L.education.map((e) => (
                <li key={e.title}>
                  <h4>{e.title}</h4>
                  <p className="meta">{e.org} · {e.dates}</p>
                  <p>{e.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Languages</h3>
            <dl className="langs">
              {about.languages.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <span className="meter" aria-hidden="true"><i style={{ width: `${LEVEL[l.level] ?? 20}%` }} /></span>
                  <dd>{l.level}</dd>
                </div>
              ))}
            </dl>
            <h3 style={{ marginTop: 32 }}>Personality</h3>
            <p className="persona"><b>{about.personality.type}</b> {about.personality.name}. <span>{about.personality.note}</span></p>
            <h3 style={{ marginTop: 32 }}>Skills</h3>
            <dl className="skills">
              {L.skills.map((s) => <div key={s.group}><dt>{s.group}</dt><dd>{s.items}</dd></div>)}
            </dl>
            <ul className="certs">
              {L.certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
