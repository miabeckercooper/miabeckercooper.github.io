import { contact as C, identity } from "../content/cv";

export function Contact() {
  return (
    <>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="targets">{C.label}</p>
          <h2 id="contact-title">Let's <em>talk.</em></h2>
          <p>{C.body}</p>
          <div className="btns">
            <a className="btn solid" href={identity.linkedin} target="_blank" rel="noopener">{C.linkedin}</a>
            <a className="btn" href={identity.projects} target="_blank" rel="noopener">{C.github}</a>
            <a className="btn" href={identity.cv} target="_blank" rel="noopener">{C.cv}</a>
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
