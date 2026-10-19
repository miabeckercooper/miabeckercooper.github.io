import { useState } from "react";
import { areas, deals, projects } from "../content/cv";
import type { Project, ProjectArea } from "../content/types";
import { viewerStore } from "../lib/viewerStore";
import { Shot } from "../ui/Shot";
import { TextOrTodo } from "../ui/TextOrTodo";

const areaLabel = (a: ProjectArea) => areas.find((x) => x.id === a)!.label;
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
/** Sort key from a date like "22 Mar 2026" or "2026" (year-only sorts to the end of that year). */
const dateKey = (d: string) => {
  const y = Number(/\d{4}/.exec(d)?.[0] ?? 0);
  const m = MONTHS.findIndex((x) => d.toLowerCase().includes(x));
  return y * 12 + (m < 0 ? 12 : m);
};

type SortBy = "date" | "title" | "area";

function Table({ list, open }: { list: Project[]; open: (p: Project) => void }) {
  const [sort, setSort] = useState<{ by: SortBy; dir: 1 | -1 }>({ by: "date", dir: -1 });
  const rows = [...list].sort((a, b) => {
    const v = sort.by === "date" ? dateKey(a.date) - dateKey(b.date) : sort.by === "title" ? a.title.localeCompare(b.title) : a.area.localeCompare(b.area);
    return v * sort.dir;
  });
  const head = (by: SortBy, label: string) => (
    <th aria-sort={sort.by === by ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      <button type="button" onClick={() => setSort((s) => ({ by, dir: s.by === by ? (-s.dir as 1 | -1) : 1 }))}>
        {label} {sort.by === by ? (sort.dir === 1 ? "↑" : "↓") : ""}
      </button>
    </th>
  );
  return (
    <div className="ptable-wrap">
      <table className="ptable">
        <caption className="sr-only">Projects, sortable by date, name and area</caption>
        <thead>
          <tr>
            {head("title", "Project")}
            {head("area", "Area")}
            <th className="num"><span>Key figure</span></th>
            <th><span>Team</span></th>
            {head("date", "Date")}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.n}>
              <td>
                <button type="button" className="lnk" onClick={() => open(p)} aria-haspopup="dialog">{p.title}</button>
                <div className="muted">{p.course}{p.simulated ? " · simulated" : ""}</div>
              </td>
              <td><span className={`area ${p.area}`}>{areaLabel(p.area)}</span></td>
              <td className="num">{p.hero.value}<div className="muted" style={{ fontWeight: 400 }}>{p.hero.label}</div></td>
              <td className="muted"><TextOrTodo value={p.team} /></td>
              <td className="muted tnum" style={{ whiteSpace: "nowrap" }}>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectArea | "all">("all");
  const [view, setView] = useState<"cards" | "table">("cards");
  const shown = projects.filter((p) => filter === "all" || p.area === filter);
  const open = (p: Project) => viewerStore.open(projects.indexOf(p));
  return (
    <section className="block" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="sec-top">
          <div>
            <p className="kicker">{deals.label}</p>
            <h2 className="section-title" id="projects-title">{deals.title}</h2>
          </div>
          <p className="section-intro">{deals.intro}</p>
        </div>
        <div className="project-bar">
          <div className="filters" role="group" aria-label="Filter projects by area">
            {areas.map((a) => (
              <button key={a.id} type="button" className="fchip" aria-pressed={filter === a.id} onClick={() => setFilter(a.id)}>{a.label}</button>
            ))}
          </div>
          <div className="viewtoggle" role="group" aria-label="View">
            <button type="button" aria-pressed={view === "cards"} onClick={() => setView("cards")}>Cards</button>
            <button type="button" aria-pressed={view === "table"} onClick={() => setView("table")}>Table</button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
        {view === "table" ? <Table list={shown} open={open} /> : (
          <ul className="cards">
            {shown.map((p) => (
              <li key={p.n}>
                <button type="button" className="card" onClick={() => open(p)} aria-haspopup="dialog">
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
        )}
      </div>
    </section>
  );
}
