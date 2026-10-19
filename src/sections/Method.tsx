import { method } from "../content/cv";

/** Exhibit 2: the process as a dark sheet, one column per step, each with its maths and a real example. */
export function Method() {
  return (
    <section className="block method" id="method" aria-labelledby="method-title">
      <div className="wrap">
        <div className="sec-top">
          <div>
            <p className="kicker">{method.label}</p>
            <h2 className="section-title" id="method-title">{method.title}</h2>
          </div>
          <p className="section-intro">{method.intro}</p>
        </div>
        <ol className="process">
          {method.steps.map((m) => (
            <li key={m.k}>
              <h3 className="t">{m.title}</h3>
              <p className="f" aria-label={`Formula: ${m.formula}`}>{m.formula}</p>
              <p className="s">{m.example}</p>
              <p className="ex">{m.body}</p>
              <p className="src">{m.source}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
