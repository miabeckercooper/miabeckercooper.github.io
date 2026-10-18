import { useSyncExternalStore } from "react";
import { stations } from "../content/cv";

/** One source of truth for the career walk: 0 = overview, 1..6 = stations. */
export const STEPS = stations.length + 1;

let step = 0;
const subs = new Set<() => void>();
/** Set by the 3D walk so a step change can scroll the page to that step. */
let navigator: ((k: number) => void) | null = null;

export const walkStore = {
  get: () => step,
  set(k: number) {
    const next = Math.max(0, Math.min(STEPS - 1, k));
    if (next === step) return;
    step = next;
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => subs.delete(f);
  },
  /** Navigate (scroll + camera) to a step. Falls back to just setting it. */
  go(k: number) {
    if (navigator) navigator(Math.max(0, Math.min(STEPS - 1, k)));
    else walkStore.set(k);
  },
  setNavigator(f: ((k: number) => void) | null) {
    navigator = f;
  },
};

export const useWalkStep = () => useSyncExternalStore(walkStore.subscribe, walkStore.get, () => 0);
