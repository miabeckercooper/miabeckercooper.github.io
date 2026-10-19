import { useState } from "react";
import { method } from "../content/cv";

export function Method() {
  const [open, setOpen] = useState(0);
  const step = method.steps[open];
  return (
    <section className="block method" id="method" aria-labelledby="method-title">
      <div className="wrap">
        <p className="kicker">{method.label}</p>
        <h2 className="section-title" id="method-title">{method.title}</h2>
        <p className="section-intro">{method.intro}</p>
        <ul className="steps">
          {method.steps.map((m, i) => (
            <li key={m.k}>
              <button type="button" className="step" aria-expanded={open === i} aria-controls="method-detail" onClick={() => setOpen(i)}>
                {m.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="step-detail" id="method-detail" aria-live="polite">
          <div>
            <p className="kicker">{step.summary}</p>
            <h3>{step.example}</h3>
          </div>
          <div>
            <p>{step.body}</p>
            <p className="src">{step.source}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
