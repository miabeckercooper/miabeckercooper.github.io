import { lazy, Suspense, useState } from "react";
import { areas, deals, projects } from "../content/cv";
import type { ProjectArea } from "../content/types";
import { Shot } from "../ui/Shot";

const Viewer = lazy(() => import("./Viewer"));
const areaLabel = (a: ProjectArea) => areas.find((x) => x.id === a)!.label;

export function DealWall() {
  const [filter, setFilter] = useState<ProjectArea | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = projects.filter((p) => filter === "all" || p.area === filter);
  return (
    <section className="band" id="deals" aria-labelledby="deals-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">{deals.label}</p>
            <h2 id="deals-title">{deals.title}</h2>
          </div>
          <p>{deals.intro}</p>
        </div>
        <div className="filters" role="group" aria-label="Filter projects by area">
          {areas.map((a) => (
            <button key={a.id} type="button" className="fchip" aria-pressed={filter === a.id} onClick={() => setFilter(a.id)}>
              {a.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
        <ul className="stones">
          {shown.map((p) => (
            <li key={p.n}>
              <button type="button" className="stone" onClick={() => setOpen(projects.indexOf(p))} aria-haspopup="dialog">
                <span className="inner">
                  <span className="shot">
                    <Shot name={p.shots[0]} alt="" sizes="(max-width: 600px) 92vw, 280px" />
                  </span>
                  <span className="txt">
                    <span className="cat">{areaLabel(p.area)}</span>
                    <h3>{p.title}</h3>
                    <span className="hero-fig">{p.hero.value}</span>
                    <span className="hero-cap">{p.hero.label}</span>
                    <span className="ctx">{p.n} · {p.course} · {p.date}</span>
                  </span>
                </span>
                <span className="badge">{p.shots.length} {p.shots.length === 1 ? "page" : "pages"}</span>
                {p.simulated && <span className="badge sim">Simulated</span>}
                <span className="sr-only">, open project viewer</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {open !== null && (
        <Suspense fallback={null}>
          <Viewer index={open} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </section>
  );
}
