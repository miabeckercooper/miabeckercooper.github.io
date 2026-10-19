import { useEffect, useRef, useState } from "react";
import type { Kpi } from "../content/types";
import { prefersReducedMotion } from "../lib/env";

const fmt = (k: Kpi, v: number) => `${k.prefix ?? ""}${v.toFixed(k.decimals ?? 0)}${k.suffix ?? ""}`;

function Counter({ k, delay }: { k: Kpi; delay: number }) {
  // Server render and no-JS show the final value; the count-up only runs once mounted.
  const [v, setV] = useState(k.value);
  const done = useRef(false);
  useEffect(() => {
    if (done.current || prefersReducedMotion()) return;
    done.current = true;
    let raf = 0, t0 = 0;
    const tick = (ts: number) => {
      if (!t0) t0 = ts + delay;
      const p = Math.max(0, Math.min(1, (ts - t0) / 1200));
      setV(k.value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setV(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [k, delay]);
  return <b aria-hidden="true">{fmt(k, v)}</b>;
}

export function Kpis({ items }: { items: Kpi[] }) {
  return (
    <ul className="figures">
      {items.map((k, i) => (
        <li key={k.label}>
          <Counter k={k} delay={300 + i * 140} />
          <span className="sr-only">{fmt(k, k.value)} </span>
          <span>{k.label}</span>
        </li>
      ))}
    </ul>
  );
}
