import { lazy, Suspense, useEffect, useState } from "react";
import { Walk2D } from "./fallback/Walk2D";
import { use3DMode, when3DWanted } from "./lib/env";
import { Contact } from "./sections/Contact";
import { DealWall } from "./sections/DealWall";
import { Experience } from "./sections/Experience";
import { Leadership } from "./sections/Leadership";
import { Method } from "./sections/Method";
import { Models } from "./sections/models/Models";
import { Header } from "./ui/Header";

const Walk3D = lazy(() =>
  import("./three/Walk3D").catch((err) => {
    // If the 3D chunk fails, fall back to 2D for this visit.
    console.warn("3D walk unavailable, using 2D", err);
    document.documentElement.classList.remove("mode-3d");
    return { default: Walk2D };
  }),
);

export function App() {
  // Server render and first client render are always 2D, so hydration matches; 3D swaps in after mount.
  const [three, setThree] = useState(false);
  // The 2D hero paints first; the 3D scene mounts on first interaction or once the page is idle.
  useEffect(() => (use3DMode() ? when3DWanted(() => setThree(true)) : undefined), []);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        {three ? (
          <Suspense fallback={<Walk2D />}>
            <Walk3D />
          </Suspense>
        ) : (
          <Walk2D />
        )}
        <Method />
        <Models />
        <DealWall />
        <Experience />
        <Leadership />
      </main>
      <Contact />
    </>
  );
}
