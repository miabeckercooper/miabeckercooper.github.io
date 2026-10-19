import type { ReactNode } from "react";
import type { Kpi } from "../content/types";

/** A tiny chart that encodes the KPI's own number, nothing else. */
export function Micro({ k }: { k: Kpi }) {
  const W = 140, H = 30;
  let body: ReactNode = null;
  if (k.chart === "grid") {
    // One square per portfolio, 15 × 2.
    const cols = Math.ceil(k.value / 2);
    body = Array.from({ length: k.value }, (_, i) => (
      <rect key={i} x={(i % cols) * (W / cols)} y={Math.floor(i / cols) * 15 + 2} width={W / cols - 2.5} height={11} rx={2} fill="var(--accent)" opacity={0.85} />
    ));
  } else if (k.chart === "beforeAfter") {
    // Prep time before (100) and after (100 − value).
    const after = 100 - k.value;
    body = (
      <>
        <rect x={0} y={3} width={W} height={10} rx={3} fill="var(--line)" />
        <rect x={0} y={17} width={Math.max(3, (W * after) / 100)} height={10} rx={3} fill="var(--accent)" />
      </>
    );
  } else if (k.chart === "count") {
    body = Array.from({ length: k.value }, (_, i) => (
      <rect key={i} x={i * (W / k.value)} y={4} width={W / k.value - 3} height={22} rx={2} fill="var(--accent)" opacity={0.35 + (0.65 * (i + 1)) / k.value} />
    ));
  } else if (k.chart === "gauge") {
    const of = k.of ?? 10;
    body = (
      <>
        <rect x={0} y={11} width={W} height={8} rx={4} fill="var(--line)" />
        <rect x={0} y={11} width={(W * k.value) / of} height={8} rx={4} fill="var(--accent)" />
        <line x1={(W * k.value) / of} x2={(W * k.value) / of} y1={4} y2={26} stroke="var(--ink)" strokeWidth={2} />
      </>
    );
  }
  return <svg className="micro" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" preserveAspectRatio="none">{body}</svg>;
}
