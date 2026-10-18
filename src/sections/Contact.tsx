import { contact as C, identity } from "../content/cv";

export function Contact() {
  return (
    <>
      <section className="contact dark on-term" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="label">{C.label}</p>
          <h2 id="contact-title">{C.title}</h2>
          <p>{C.body}</p>
          <div className="btns">
            <a className="btn solid" href={identity.linkedin} target="_blank" rel="noopener">{C.linkedin} <span aria-hidden="true">↗</span></a>
            <a className="btn" href={identity.projects} target="_blank" rel="noopener">{C.github} <span aria-hidden="true">↗</span></a>
            <a className="btn" href={identity.cv} target="_blank" rel="noopener">{C.cv} <span aria-hidden="true">↗</span></a>
          </div>
          <a className="email" href={`mailto:${identity.email}`}>{identity.email}</a>
        </div>
      </section>
      <footer className="foot">
        <div className="wrap">
          <span>© {C.year} {identity.name}</span>
          <span>{C.footer}</span>
        </div>
      </footer>
    </>
  );
}
