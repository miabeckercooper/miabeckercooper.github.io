import * as THREE from "three";

/** Shared, mutable walk state read inside useFrame (no React re-render per frame). */
export const live = {
  /** Continuous position along the walk: 0 = overview, 6 = last station. */
  pos: 0,
  /** Seconds since the scene mounted (drives the opening bell). */
  t: 0,
  active: 0,
};

export const COL = {
  ink: 0x0c171d,
  floor: 0x0e1b21,
  plinth: 0x13232b,
  gold: new THREE.Color(0xe0ae5e),
  teal: 0x7fd0de,
  tealDeep: 0x0f5a68,
  gain: 0x6fd39e,
  loss: 0xb0412f,
};

export const easeOutCubic = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
export const smooth = (p: number) => { const x = Math.min(1, Math.max(0, p)); return x * x * (3 - 2 * x); };

/** Opening bell: tower i starts printing at this time (s). */
export const bellStart = (i: number) => 0.3 + i * 0.28;
export const BELL_TOWER = 0.9;
export const BELL_LINE = bellStart(5) + BELL_TOWER;

/** Canvas texture of a little live chart, redrawn by the caller. */
export function chartCanvas(w = 256, h = 160) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return c;
}

export function drawChart(c: HTMLCanvasElement, data: number[], line: string, frame = "#E0AE5E") {
  const g = c.getContext("2d")!;
  const { width: w, height: h } = c;
  g.fillStyle = "#0E1A20"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#24414B"; g.lineWidth = 1;
  for (let y = 20; y < h; y += 28) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  g.strokeStyle = line; g.lineWidth = 3; g.beginPath();
  data.forEach((v, i) => { const x = 8 + (i / (data.length - 1)) * (w - 16); const y = h - 14 - v * (h - 28); if (i) g.lineTo(x, y); else g.moveTo(x, y); });
  g.stroke();
  g.strokeStyle = frame; g.lineWidth = 2; g.strokeRect(1, 1, w - 2, h - 2);
}

export function labelTexture(text: string, colour = "#E0AE5E", w = 128, h = 64, size = 34, bg?: string) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d")!;
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.fillStyle = colour;
  g.font = `700 ${size}px "JetBrains Mono Variable", "JetBrains Mono", monospace`;
  g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
