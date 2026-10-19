import { chapters, thesis, timeline } from "../content/cv";

/** Months since Jan 2000 for a "YYYY-MM" string. */
const ym = (s: string) => { const [y, m] = s.split("-").map(Number); return y * 12 + (m - 1); };

/**
 * Exhibit 1: the four chapters as bars on a real date axis, so overlaps and gaps are visible.
 * Each bar links to its chapter below.
 */
export function Gantt() {
  const first = Math.min(...chapters.map((c) => ym(c.start)));
  const last = Math.max(...chapters.map((c) => ym(c.end))) + 1;
  const firstYear = Math.floor(first / 12), lastYear = Math.ceil(last / 12);
  const W = 1200, L = 170, R = 20, row = 46, top = 28, H = top + chapters.length * row + 30;
  const x = (m: number) => L + ((m - firstYear * 12) / ((lastYear - firstYear) * 12)) * (W - L - R);
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  const esadeRow = chapters.findIndex((c) => c.id === "esade");
  return (
    <figure className="gantt">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Career timeline chart" aria-describedby="gantt-desc">
        <desc id="gantt-desc">
          {chapters.map((c) => `${c.short}: ${c.dates}`).join("; ")}. {timeline.thesisMarker}: {thesis.context}
        </desc>
        {years.map((y) => (
          <g key={y}>
            <line className="axis" x1={x(y * 12)} x2={x(y * 12)} y1={top - 8} y2={H - 26} />
            {y < lastYear && <text className="tick" x={x(y * 12) + 4} y={H - 8}>{y}</text>}
          </g>
        ))}
        {chapters.map((c, i) => {
          const y0 = top + i * row;
          const x0 = x(ym(c.start)), x1 = x(ym(c.end) + 1);
          return (
            <a key={c.id} href={`#${c.id}`} aria-label={`${c.short}, ${c.dates}`}>
              <text className="rowlbl" x={0} y={y0 + 22}>{c.short}</text>
              <rect className="bar" x={x0} y={y0 + 6} width={Math.max(8, x1 - x0)} height={24} rx={6} fill={`var(--${c.colour})`} />
            </a>
          );
        })}
        {esadeRow >= 0 && (() => {
          const xm = x(ym(thesis.start)), xe = x(ym(thesis.end) + 1), y0 = top + esadeRow * row;
          return (
            <g>
              <rect x={xm} y={y0 + 6} width={xe - xm} height={24} rx={6} fill="var(--ink)" />
              <text className="mlbl" x={xe + 6} y={y0 + 23}>{timeline.thesisMarker}</text>
            </g>
          );
        })()}
      </svg>
    </figure>
  );
}
