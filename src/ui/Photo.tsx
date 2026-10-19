import { photoSrc, photoSrcSet } from "../lib/photos";

/** A photograph: WebP with JPEG fallback at three widths. */
export function Photo({ name, alt, sizes, eager = false, width, height }: { name: string; alt: string; sizes: string; eager?: boolean; width: number; height: number }) {
  return (
    <picture>
      <source type="image/webp" srcSet={photoSrcSet(name, "webp")} sizes={sizes} />
      <img src={photoSrc(name)} srcSet={photoSrcSet(name, "jpg")} sizes={sizes} alt={alt} width={width} height={height}
        loading={eager ? "eager" : "lazy"} decoding="async" {...(eager ? { fetchPriority: "high" } : {})} />
    </picture>
  );
}
