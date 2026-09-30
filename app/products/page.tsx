import type { Metadata } from "next";
import Link from "next/link";
import ProductBrowser from "@/components/ProductBrowser";
import { PRODUCTS, formatRpm, localizeProduct, sizeLabel } from "@/lib/products";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return { title: dict.products.listing.metaTitle, description: dict.products.listing.metaDescription };
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="border-seam bg-iron border-b">
        <div className="container-bb py-14 sm:py-16">
          <p className="text-ash font-display text-sm tracking-[0.18em] uppercase">
            <Link href="/" className="hover:text-bone">{dict.breadcrumb.home}</Link> / {dict.breadcrumb.products}
          </p>
          <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">{dict.products.listing.title}</h1>
          <p className="text-bone/75 mt-4 max-w-2xl text-lg leading-relaxed">{dict.products.listing.intro}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-bb">
          <ProductBrowser />
        </div>
      </section>

      {/* Full spec comparison */}
      <section className="border-seam border-t py-16 sm:py-20">
        <div className="container-bb">
          <h2 className="display text-3xl sm:text-4xl">{dict.products.listing.compareTitle}</h2>
          <div className="border-seam mt-8 overflow-x-auto border">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-iron font-display text-ash tracking-[0.14em] uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">{dict.products.listing.headers.model}</th>
                  <th className="px-4 py-3 font-semibold">{dict.products.listing.headers.size}</th>
                  <th className="px-4 py-3 font-semibold">{dict.products.listing.headers.grain}</th>
                  <th className="px-4 py-3 font-semibold">{dict.products.listing.headers.maxRpm}</th>
                  <th className="px-4 py-3 font-semibold">{dict.products.listing.headers.bestFor}</th>
                </tr>
              </thead>
              <tbody className="divide-seam divide-y">
                {PRODUCTS.map((raw) => {
                  const p = localizeProduct(raw, locale);
                  return (
                    <tr key={p.slug} className="hover:bg-iron/60">
                      <td className="px-4 py-3">
                        <Link href={`/products/${p.slug}`} className="group">
                          <span className="font-display text-spark font-semibold tracking-wider group-hover:underline">{p.code}</span>
                          <span className="text-bone/80 block">{p.name}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {sizeLabel(p).replace(" mm", "")}
                        {p.shapeNote && <span className="text-ash block text-xs">{p.shapeNote}</span>}
                      </td>
                      <td className="px-4 py-3">{p.grain}</td>
                      <td className="px-4 py-3 font-semibold tabular-nums">
                        {formatRpm(p.maxRpm, locale)}
                        <span className="text-ash block text-xs font-normal">{p.maxSpeed} m/s</span>
                      </td>
                      <td className="text-bone/80 px-4 py-3">{p.bestFor.join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
