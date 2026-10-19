import { useEffect, useState } from "react";
import { identity, nav } from "../content/cv";

type Theme = "light" | "dark" | null;

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(null);
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setTheme(t === "light" || t === "dark" ? t : null);
  }, []);
  const toggle = () => {
    const current = theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("mbc-theme", next); } catch { /* private mode */ }
    setTheme(next);
  };
  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-label="Switch between light and dark mode">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function Header() {
  const [first, ...rest] = identity.name.split(" ");
  return (
    <header className="top">
      <div className="wrap">
        <a className="wordmark" href="#top">{first}&nbsp;<i>{rest.join(" ")}</i></a>
        <nav className="nav" aria-label="Sections">
          {nav.map((n) => <a key={n.href} className="sec" href={n.href}>{n.label}</a>)}
          <ThemeToggle />
          <a className="pill ghost" href={identity.cv} target="_blank" rel="noopener">CV</a>
          <a className="pill solid" href={identity.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </nav>
      </div>
    </header>
  );
}
