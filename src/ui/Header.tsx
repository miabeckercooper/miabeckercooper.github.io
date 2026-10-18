import { useEffect, useState } from "react";
import { identity, nav } from "../content/cv";

type Theme = "light" | "dark" | null;

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(null);
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setTheme(t === "light" || t === "dark" ? t : null);
  }, []);
  const effective = () =>
    theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const toggle = () => {
    const next = effective() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("mbc-theme", next); } catch { /* private mode */ }
    setTheme(next);
  };
  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-label="Switch between light and dark mode">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="tick" href="#top">
          <b>{identity.monogram}</b>
          <span>
            {identity.name} · <span className="up">▲</span> {identity.tickerNote}
          </span>
        </a>
        <nav className="nav" aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} className="sec" href={n.href}>{n.label}</a>
          ))}
          <ThemeToggle />
          <a className="cv" href={identity.cv} target="_blank" rel="noopener">CV <span aria-hidden="true">↗</span></a>
          <a className="cta" href={identity.linkedin} target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
