/** Photos produced by scripts/optimise-images.ts into public/photos. */
export const PHOTO_WIDTHS = [480, 960, 1440] as const;
export const photoSrcSet = (name: string, ext: "webp" | "jpg") =>
  PHOTO_WIDTHS.map((w) => `photos/${name}-${w}.${ext} ${w}w`).join(", ");
export const photoSrc = (name: string, w = 960) => `photos/${name}-${w}.jpg`;
