import Link from "next/link";
import DiscArt from "@/components/DiscArt";
import { formatRpm, sizeLabel, type Product } from "@/lib/products";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/** `product` should already be localized (see `localizeProduct`) — this component only renders. */
export default function ProductCard({ product, uid, locale = "en" }: { product: Product; uid?: string; locale?: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group border-seam bg-iron hover:border-spark/70 relative flex flex-col border transition-colors"
    >
      <div className="relative flex aspect-[4/3] items-center sm:aspect-square justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#24262b_0%,#16171a_70%)]">
        <span className="font-display bg-coal/70 text-bone absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase">
          {product.diameterIn}&Prime; · {product.size.diameter} mm
        </span>
        <DiscArt
          product={product}
          toScale
          uid={uid ?? `card-${product.slug}`}
          className="size-[88%] drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover:rotate-[40deg]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-spark text-sm font-semibold tracking-[0.18em]">{product.code}</p>
        <h3 className="display mt-1 text-2xl">{product.name}</h3>
        <p className="text-ash mt-2 text-sm leading-relaxed">{product.summary}</p>

        <dl className="border-seam mt-auto grid grid-cols-3 gap-2 border-t pt-4 text-xs">
          <div>
            <dt className="text-ash">{dict.products.card.size}</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{sizeLabel(product).replace(" mm", "")}</dd>
          </div>
          <div>
            <dt className="text-ash">{dict.products.card.grain}</dt>
            <dd className="mt-0.5 font-semibold">{product.grain.split(/[ ,]/)[0]}</dd>
          </div>
          <div>
            <dt className="text-ash">{dict.products.card.maxRpm}</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{formatRpm(product.maxRpm, locale)}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
