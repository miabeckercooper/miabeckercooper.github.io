import { useState } from "react";
import { areas, deals, projects } from "../content/cv";
import type { ProjectArea } from "../content/types";
import { viewerStore } from "../lib/viewerStore";
import { Shot } from "../ui/Shot";

const areaLabel = (a: ProjectArea) => areas.find((x) => x.id === a)!.label;

export function Projects() {
  const [filter, setFilter] = useState<ProjectArea | "all">("all");
  const shown = projects.filter((p) => filter === "all" || p.area === filter);
  return (
    <section className="block" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <p className="kicker">{deals.label}</p>
        <h2 className="section-title" id="projects-title">{deals.title}</h2>
        <p className="section-intro">{deals.intro}</p>
        <div className="filters" role="group" aria-label="Filter projects by area">
          {areas.map((a) => (
            <button key={a.id} type="button" className="fchip" aria-pressed={filter === a.id} onClick={() => setFilter(a.id)}>{a.label}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
        <ul className="cards">
          {shown.map((p) => (
            <li key={p.n}>
              <button type="button" className="card" onClick={() => viewerStore.open(projects.indexOf(p))} aria-haspopup="dialog">
                <span className="shot"><Shot name={p.shots[0]} alt="" sizes="(max-width: 600px) 92vw, 300px" /></span>
                <span className={`area ${p.area}`}>{areaLabel(p.area)}</span>
                <h3>{p.title}</h3>
                <span className="fig">{p.hero.value}</span>
                <span className="cap">{p.hero.label}</span>
                <span className="ctx">{p.course} · {p.date} · {p.shots.length} {p.shots.length === 1 ? "page" : "pages"}</span>
                {p.simulated && <span className="sim">Simulated</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
