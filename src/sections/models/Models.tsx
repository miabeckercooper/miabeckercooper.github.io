import { lazy, Suspense } from "react";
import { models } from "../../content/cv";
import { useInView } from "../../lib/useInView";

const Lab = lazy(() => import("./Lab"));

/** Section shell is in the main bundle; the interactive models load when the section nears the viewport. */
export function Models() {
  const [ref, seen] = useInView<HTMLDivElement>("600px 0px 600px 0px");
  return (
    <section className="band" id="models" aria-labelledby="models-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">{models.label}</p>
            <h2 id="models-title">{models.title}</h2>
          </div>
          <p>{models.intro}</p>
        </div>
        <div ref={ref}>
          {seen ? (
            <Suspense fallback={<Placeholder />}>
              <Lab />
            </Suspense>
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </section>
  );
}

function Placeholder() {
  return (
    <div className="lab">
      <ul className="models-loading">
        {models.tabs.map((t) => <li key={t.id}>{t.name}: {t.source}</li>)}
      </ul>
    </div>
  );
}
