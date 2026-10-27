/** Lets other sections open a specific live-model tab. The Lab loads lazily, so the request is kept until it mounts. */
let pending: string | null = null;
export const EVENT = "mbc:model";

export function openModel(id: string) {
  pending = id;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
  document.getElementById("models")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Read without clearing (safe to call twice, as React's strict mode does with state initialisers). */
export const peekPendingModel = () => pending;
export function clearPendingModel() { pending = null; }
