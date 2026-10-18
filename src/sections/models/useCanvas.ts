import { useCallback, useEffect, useRef } from "react";

export const cssVar = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

/** Canvas sized to its box at DPR ≤ 2, redrawn on resize and theme change. */
export function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, ratio = 0.52) {
  const ref = useRef<HTMLCanvasElement>(null);
  const paint = useCallback(() => {
    const cv = ref.current;
    if (!cv) return;
    const w = Math.max(280, cv.clientWidth || 600);
    const h = Math.round(w * ratio);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = w * dpr;
    cv.height = h * dpr;
    cv.style.height = `${h}px`;
    const ctx = cv.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
  }, [draw, ratio]);
  useEffect(() => {
    paint();
    const ro = new ResizeObserver(() => paint());
    if (ref.current) ro.observe(ref.current);
    const mo = new MutationObserver(paint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", paint);
    return () => { ro.disconnect(); mo.disconnect(); mq.removeEventListener("change", paint); };
  }, [paint]);
  return ref;
}
