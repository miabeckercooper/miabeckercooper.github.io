import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { stations, walkCopy } from "../content/cv";
import { showFps } from "../lib/env";
import { HeroCopy } from "../ui/HeroCopy";
import { StationPanel } from "../walk/StationPanel";
import { STEPS, useWalkStep, walkStore } from "../walk/walkStore";
import { Scene } from "./Scene";
import { live } from "./shared";

gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven 3D career walk. Loaded as its own chunk only when WebGL is available and motion is allowed. */
export default function Walk3D() {
  const step = useWalkStep();
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const [bloom, setBloom] = useState(true);
  const fpsRef = useRef<HTMLDivElement>(null);

  // Smooth scroll + scroll-to-progress mapping.
  useEffect(() => {
    const el = section.current!;
    const lenis = new Lenis({ anchors: { offset: -64 }, lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top+=56",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        live.pos = self.progress * (STEPS - 1);
        walkStore.set(Math.round(live.pos));
      },
    });

    // Navigating to a step scrolls to that step's dwell point, so scroll and camera never disagree.
    walkStore.setNavigator((k) => {
      const y = st.start + (k / (STEPS - 1)) * (st.end - st.start);
      lenis.scrollTo(y, { duration: 1.4 });
    });

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    return () => {
      walkStore.setNavigator(null);
      st.kill();
      io.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Arrow keys move between stations while the walk is on screen and focus is not in a control that uses arrows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visible || e.defaultPrevented) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [role=tablist], [role=dialog]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); walkStore.go(walkStore.get() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); walkStore.go(walkStore.get() - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  // ?fps shows a live frame counter (for checking on an iPad).
  useEffect(() => {
    if (!showFps()) return;
    let frames = 0, last = performance.now(), raf = 0;
    const loop = (now: number) => {
      frames++;
      if (now - last > 1000) {
        if (fpsRef.current) fpsRef.current.textContent = `${Math.round((frames * 1000) / (now - last))} fps · dpr ${dpr.toFixed(2)}${bloom ? "" : " · no bloom"}`;
        frames = 0; last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dpr, bloom]);

  const s = step > 0 ? stations[step - 1] : null;

  return (
    <section ref={section} id="career" className="walk3d dark on-term" style={{ height: `${STEPS * 100}svh` }} aria-label={walkCopy.title}>
      <span id="top" />
      <div className="stage" data-step={step}>
        <a className="walk-skip" href="#method">{walkCopy.skip}</a>
        <div className="canvas-wrap" aria-hidden="true">
          <Canvas
            frameloop={visible ? "always" : "never"}
            dpr={[1, dpr]}
            camera={{ fov: 36, near: 0.1, far: 300, position: [14, 25, 56] }}
            gl={{ antialias: !bloom, powerPreference: "high-performance", stencil: false }}
          >
            <PerformanceMonitor
              bounds={() => [50, 60]}
              flipflops={3}
              onDecline={() => { setBloom(false); setDpr((d) => Math.max(1, d - 0.25)); }}
              onIncline={() => setDpr((d) => Math.min(1.5, d + 0.25))}
            />
            <AdaptiveDpr pixelated={false} />
            <Scene step={step} />
            {bloom ? (
              <EffectComposer multisampling={0}>
                <Bloom intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.2} mipmapBlur={false} resolutionScale={0.5} />
              </EffectComposer>
            ) : (
              <></>
            )}
          </Canvas>
        </div>
        <div className="overlay">
          <div className="wrap">
            <LazyMotion features={domAnimation} strict>
            <AnimatePresence mode="wait" initial={false}>
              {s ? (
                <m.div key={s.n} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                  <StationPanel s={s} />
                </m.div>
              ) : (
                <m.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.4 }}>
                  <HeroCopy onWalk={() => walkStore.go(1)} kpiDelay={1600} />
                </m.div>
              )}
            </AnimatePresence>
            </LazyMotion>
          </div>
        </div>
        <nav className="walknav" aria-label="Career stations">
          <div className="wrap">
            <button type="button" className="wbtn" onClick={() => walkStore.go(step - 1)} disabled={step === 0} aria-label={walkCopy.prev}>←</button>
            <ol className="minimap">
              <li>
                <button type="button" aria-current={step === 0 ? "step" : undefined} onClick={() => walkStore.go(0)}>
                  {walkCopy.overview}
                </button>
              </li>
              {stations.map((st, i) => (
                <li key={st.n}>
                  <button type="button" aria-current={step === i + 1 ? "step" : undefined} onClick={() => walkStore.go(i + 1)} aria-label={`${st.n} ${st.short}: ${st.title}`}>
                    {st.n}<span className="lbl"> {st.short}</span>
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="wbtn" onClick={() => walkStore.go(step + 1)} disabled={step === STEPS - 1} aria-label={walkCopy.next}>→</button>
          </div>
        </nav>
      </div>
      {showFps() && <div className="fps" ref={fpsRef}>… fps</div>}
    </section>
  );
}
