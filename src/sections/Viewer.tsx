import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { deals, GITHUB_PROJECTS, projects } from "../content/cv";
import { thumbSrc } from "../lib/shots";
import { Shot } from "../ui/Shot";
import { TextOrTodo } from "../ui/TextOrTodo";

/** Modal viewer: pages through a project's screenshots, with figures, team, role and the GitHub link. */
export default function Viewer({ index, onClose }: { index: number; onClose: () => void }) {
  // Rendered only while open (see ViewerHost).
  const p = projects[index];
  const [page, setPage] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = p.shots.length;
  const go = (d: number) => setPage((k) => (k + d + n) % n);

  useEffect(() => {
    const last = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const y = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && boxRef.current) {
        // Keep focus inside the dialog.
        const f = boxRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.scrollTo(0, y);
      last?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const touch = useRef<number | null>(null);

  const deckUrl = p.deck ? `https://github.com/miabeckercooper/finance-portfolio/blob/main/${p.dir}/${p.deck}` : null;

  return createPortal(
    <div className="viewer" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="vbox" ref={boxRef} role="dialog" aria-modal="true" aria-labelledby="v-title">
        <div className="vinfo">
          <button ref={closeRef} type="button" className="vclose" onClick={onClose} aria-label="Close project">✕</button>
          <p className="kicker">[{p.badge}] · {p.date}</p>
          <h2 id="v-title">{p.title}</h2>
          <p className="muted" style={{ color: "var(--ink-2)" }}>{p.course}</p>
          {p.simulated && <span className="sim-tag">Simulated results</span>}
          <p className="vsec">Key thesis</p>
          <p>{p.summary}</p>
          <p className="vsec">Inputs and results</p>
          <dl className="vfigs">
            {[p.hero, ...p.figures].map((f) => (
              <div key={f.value + f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="vmeta">
            <div><dt>Team</dt><dd><TextOrTodo value={p.team} /></dd></div>
            <div><dt>My role</dt><dd><TextOrTodo value={p.role} /></dd></div>
            {p.note && <div><dt>Note</dt><dd>{p.note}</dd></div>}
          </dl>
          <div className="vlinks">
            {deckUrl && <a className="btn solid" href={deckUrl} target="_blank" rel="noopener">Open the full PDF <span aria-hidden="true">↗</span></a>}
            <a className="btn" href={GITHUB_PROJECTS + p.dir} target="_blank" rel="noopener">{deals.github} <span aria-hidden="true">↗</span></a>
          </div>
          <p className="vsec">The work, page by page</p>
        </div>
        <div className="vstage">
          <div
            className="vimg"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <Shot key={p.shots[page]} name={p.shots[page]} alt={`${p.title}, page ${page + 1} of ${n}`} sizes="(max-width: 760px) 100vw, 700px" eager />
          </div>
          <div className="vnav">
            <button type="button" onClick={() => go(-1)} disabled={n < 2}><span aria-hidden="true">←</span> Previous page</button>
            <span aria-live="polite">{page + 1} / {n}</span>
            <button type="button" onClick={() => go(1)} disabled={n < 2}>Next page <span aria-hidden="true">→</span></button>
          </div>
          {n > 1 && (
            <ul className="vthumbs">
              {p.shots.map((s, k) => (
                <li key={s}>
                  <button type="button" aria-current={k === page} aria-label={`Show page ${k + 1}`} onClick={() => setPage(k)}>
                    <img src={thumbSrc(s)} alt="" width={160} height={90} loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
