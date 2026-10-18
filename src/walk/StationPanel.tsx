import type { Station } from "../content/types";

/** The details panel for one station. Used by the 3D overlay and the 2D timeline. */
export function StationPanel({ s, headingLevel = 3 }: { s: Station; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="spanel" aria-label={`Station ${s.n}: ${s.title}`}>
      <span className="st">Station {s.n} · {s.dates}</span>
      <H>{s.title}</H>
      <p className="role">{s.role}</p>
      <p className="where">{s.place}</p>
      <p className="hm">
        <b>{s.metric.value}</b>
        <span>{s.metric.label}</span>
      </p>
      <ul className="pts">
        {s.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <ul className="chips" aria-label="Skills">
        {s.chips.map((c) => <li key={c}>{c}</li>)}
      </ul>
      {s.jump && <span className="jump">▲ {s.jump}</span>}
      {s.proof && <a className="proof" href={s.proof.href}>{s.proof.label} →</a>}
    </article>
  );
}
