import { useState } from "react";
import { method } from "../content/cv";
import { useInView } from "../lib/useInView";

export function Method() {
  const [open, setOpen] = useState(0);
  const [ref, seen] = useInView<HTMLDivElement>();
  const step = method.steps[open];
  return (
    <section className="band" id="method" aria-labelledby="method-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">{method.label}</p>
            <h2 id="method-title">{method.title}</h2>
          </div>
          <p>{method.intro}</p>
        </div>
        <div ref={ref} className={`blueprint${seen ? " is-drawn" : ""}`}>
          <ol className="method">
            {method.steps.map((m, i) => (
              <li key={m.k}>
                <button
                  type="button"
                  className="node"
                  aria-expanded={open === i}
                  aria-controls="method-detail"
                  onClick={() => setOpen(i)}
                >
                  <span className="k">{m.k}</span>
                  <span className="t">{m.title}</span>
                  <span className="s">{m.summary}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="method-detail panel" id="method-detail" aria-live="polite">
            <div>
              <span className="label">Example · {step.title}</span>
              <h3>{step.example}</h3>
            </div>
            <div>
              <p>{step.body}</p>
              <p className="src">{step.source}</p>
            </div>
          </div>
          <div className="bp-title" aria-hidden="true">
            <span>DWG MBC-METHOD</span><span>SHEET 1 OF 1</span><span>DECOMPOSE · MODEL · STRESS-TEST · DECIDE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
