import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { chapters, identity, projects, thesis, timeline } from "../content/cv";
import type { Chapter, Moment } from "../content/types";
import { viewerStore } from "../lib/viewerStore";
import { Photo } from "../ui/Photo";
import { Gantt } from "./Gantt";

function MomentCard({ m }: { m: Moment }) {
  const inner = (
    <>
      <span className="when">{m.date}</span>
      <h4>{m.title}</h4>
      {m.metric && <span className="metric">{m.metric}</span>}
      {m.metricLabel && <span className="mlabel">{m.metricLabel}</span>}
      {m.body && <p>{m.body}</p>}
    </>
  );
  if (m.thesis) {
    return (
      <article className="moment thesis" aria-label={`MSc thesis: ${thesis.title}`}>
        {inner}
        <p>{thesis.access}</p>
        <a className="open" href={identity.linkedin} target="_blank" rel="noopener">{thesis.request} <span aria-hidden="true">→</span></a>
      </article>
    );
  }
  if (m.project) {
    const i = projects.findIndex((p) => p.n === m.project);
    return (
      <button type="button" className="moment" aria-haspopup="dialog" onClick={() => viewerStore.open(i)}>
        {inner}
        <span className="open">See the work <span aria-hidden="true">→</span></span>
      </button>
    );
  }
  return <article className="moment">{inner}</article>;
}

/** One chapter: a colour block with a swipeable strip of moments. */
function ChapterBlock({ c, hidden }: { c: Chapter; hidden: boolean }) {
  const strip = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    if (hidden) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [hidden]);
  const page = (d: number) => strip.current?.scrollBy({ left: d * strip.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className={`chapter ${c.colour}`} id={c.id} aria-labelledby={`${c.id}-title`} role="tabpanel" hidden={hidden}>
      <div className="wrap chapter-head">
        <div>
          <p className="place">{c.place}</p>
          <h3 id={`${c.id}-title`}>{c.title}</h3>
          <p className="dates">{c.dates}</p>
        </div>
        <div>
          <p className="summary">{c.summary}</p>
          <div className="strip-nav">
            <button type="button" onClick={() => page(-1)} disabled={edge.start} aria-label={`Scroll ${c.place} back`}>←</button>
            <button type="button" onClick={() => page(1)} disabled={edge.end} aria-label={`Scroll ${c.place} forward`}>→</button>
          </div>
        </div>
      </div>
      <div className="strip-wrap">
        <ul className="strip" ref={strip} tabIndex={0} aria-label={`${c.title}: moments`}>
          {c.photo && (
            <li>
              <figure className="moment photo">
                <Photo name={c.photo.name} alt={c.photo.alt} sizes="(max-width: 600px) 80vw, 360px" width={1170} height={1152} />
                <figcaption>{c.photo.caption}</figcaption>
              </figure>
            </li>
          )}
          {c.moments.map((m) => <li key={m.date + m.title}><MomentCard m={m} /></li>)}
        </ul>
      </div>
    </section>
  );
}

export function Timeline() {
  const [active, setActive] = useState(chapters[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (id: string, focus = false) => {
    setActive(id);
    const i = chapters.findIndex((c) => c.id === id);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: ReactKeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    select(chapters[(i + d + chapters.length) % chapters.length].id, true);
  };
  return (
    <div id="timeline">
      <div className="wrap timeline-head" style={{ paddingBottom: 8 }}>
        <p className="kicker">{timeline.label}</p>
        <h2 className="section-title">{timeline.title}</h2>
        <p className="section-intro">{timeline.intro}</p>
        <Gantt onSelect={(id) => select(id)} />
        <div className="matrix-tabs" role="tablist" aria-label="Career chapters">
          {chapters.map((c, i) => (
            <button key={c.id} ref={(el) => { tabs.current[i] = el; }} role="tab" id={`tab-${c.id}`} aria-selected={active === c.id}
              aria-controls={c.id} tabIndex={active === c.id ? 0 : -1} style={{ ["--c" as string]: `var(--${c.colour})` }}
              onClick={() => select(c.id)} onKeyDown={(e) => onKey(e, i)}>
              <i aria-hidden="true" />{c.tab}
            </button>
          ))}
        </div>
      </div>
      {chapters.map((c) => <ChapterBlock key={c.id} c={c} hidden={active !== c.id} />)}
    </div>
  );
}
