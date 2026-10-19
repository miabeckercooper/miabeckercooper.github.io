/** Runtime checks, safe during SSR. */
export const isBrowser = typeof window !== "undefined";

export function prefersReducedMotion(): boolean {
  return isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
