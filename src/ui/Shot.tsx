import { shotSrc, shotSrcSet } from "../lib/shots";

/** A project screenshot: WebP with JPEG fallback, responsive widths, lazy by default. */
export function Shot({ name, alt, sizes, eager = false }: { name: string; alt: string; sizes: string; eager?: boolean }) {
  return (
    <picture>
      <source type="image/webp" srcSet={shotSrcSet(name, "webp")} sizes={sizes} />
      <img
        src={shotSrc(name, 480)}
        srcSet={shotSrcSet(name, "jpg")}
        sizes={sizes}
        alt={alt}
        width={800}
        height={450}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
