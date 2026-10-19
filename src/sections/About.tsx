import { about, leadership as L } from "../content/cv";
import { HobbyIcon } from "../ui/HobbyIcon";
import { Photo } from "../ui/Photo";

export function About() {
  return (
    <section className="block about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <p className="kicker">{about.label}</p>
        <h2 className="section-title" id="about-title">{about.title}</h2>
        <div className="about-grid">
          <div className="headshot">
            <Photo name={about.photo.name} alt={about.photo.alt} sizes="(max-width: 860px) 300px, 380px" width={1932} height={2576} />
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
              {about.languages.map((l) => <div key={l.name}><dt>{l.name}</dt><dd>{l.level}</dd></div>)}
            </dl>
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
