import { useEffect, useRef, useState } from "react";

/** True once the element has entered the viewport (never flips back). */
export function useInView<T extends Element>(rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, seen]);
  return [ref, seen] as const;
}
