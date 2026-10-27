import { identity, nav } from "../content/cv";

export function Header() {
  const [first, ...rest] = identity.name.split(" ");
  return (
    <header className="top">
      <div className="wrap">
        <a className="wordmark" href="#top">{first}&nbsp;<i>{rest.join(" ")}</i></a>
        <nav className="nav" aria-label="Sections">
          {nav.map((n) => <a key={n.href} className="sec" href={n.href}>{n.label}</a>)}
          <span className="status" role="status" aria-label={`Status: ${identity.availability}`}><i aria-hidden="true" /><span>{identity.availability.toUpperCase()}</span></span>
          <a className="pill ghost" href={identity.cv} target="_blank" rel="noopener">CV</a>
          <a className="pill solid" href={identity.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </nav>
      </div>
    </header>
  );
}
