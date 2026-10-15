import Image from "next/image";
import { MAX_DIAMETER, MIN_DIAMETER, type Product } from "@/lib/products";

/**
 * The real photo of a BigBear disc (a cut-out in public/products).
 *
 * `toScale` shrinks smaller diameters so a row of cards reads small → large.
 */
export default function DiscPhoto({
  product,
  alt,
  toScale = false,
  sizes,
  className,
}: {
  product: Product;
  alt: string;
  toScale?: boolean;
  /** Passed to next/image — how wide the disc renders at each breakpoint. */
  sizes: string;
  className?: string;
}) {
  // Smallest disc → 58% of the frame, largest → 97%: compressed so a 100 mm
  // disc stays legible next to the 350 mm wheel.
  const t = (product.size.diameter - MIN_DIAMETER) / (MAX_DIAMETER - MIN_DIAMETER);
  const scale = toScale ? 0.58 + t * 0.39 : 1;

  return (
    <div className={`relative aspect-square ${className ?? ""}`}>
      <Image src={product.photo} alt={alt} fill sizes={sizes} className="object-contain" style={{ scale }} />
    </div>
  );
}
