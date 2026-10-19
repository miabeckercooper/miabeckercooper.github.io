import { useSyncExternalStore } from "react";

/** Which project the screenshot viewer shows (index into projects[]), or null when closed. */
let open: number | null = null;
const subs = new Set<() => void>();

export const viewerStore = {
  open(i: number) { open = i; subs.forEach((f) => f()); },
  close() { open = null; subs.forEach((f) => f()); },
  subscribe(f: () => void) { subs.add(f); return () => subs.delete(f); },
};

export const useOpenProject = () => useSyncExternalStore(viewerStore.subscribe, () => open, () => null);
