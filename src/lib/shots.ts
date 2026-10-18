/** Screenshot URLs produced by scripts/optimise-images.ts into public/shots. */
export const SHOT_WIDTHS = [480, 800] as const;
export const THUMB_WIDTH = 160;

const base = (name: string, w: number, ext: "webp" | "jpg") => `shots/${name}-${w}.${ext}`;

export const shotSrcSet = (name: string, ext: "webp" | "jpg") =>
  SHOT_WIDTHS.map((w) => `${base(name, w, ext)} ${w}w`).join(", ");
export const shotSrc = (name: string, w = 800) => base(name, w, "jpg");
export const thumbSrc = (name: string, ext: "webp" | "jpg" = "jpg") => base(name, THUMB_WIDTH, ext);
