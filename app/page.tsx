import Link from "next/link";
import DiscPhoto from "@/components/DiscPhoto";
import HeroDisc from "@/components/HeroDisc";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, formatRpm, productName, sizeLabel } from "@/lib/products";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Every disc, smallest first, for the to-scale lineup.
const LINEUP = [...PRODUCTS].sort((a, b) => a.size.diameter - b.size.diameter);

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <section className="border-seam relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,#000,transparent_70%)]"
        />
        <div className="container-bb relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">{dict.home.hero.eyebrow}</p>
            <h1 className="display mt-4 text-6xl sm:text-7xl lg:text-8xl">
              {dict.home.hero.titleLine1}
              <br />
              {dict.home.hero.titleLine2} <span className="text-spark">{dict.home.hero.titleHighlight}</span>
            </h1>
            <p className="text-bone/75 mt-6 max-w-lg text-lg leading-relaxed">{dict.home.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-spark">
                {dict.home.hero.browseRange}
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {dict.home.hero.getQuote}
              </Link>
            </div>

            <dl className="border-seam mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-6">
              {dict.home.hero.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="text-ash text-xs tracking-widest uppercase">{s.label}</dt>
                  <dd className="display text-3xl sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroDisc />
        </div>
      </section>

      {/* SIZE LINEUP — every disc, photographed, at true relative scale */}
      <section className="border-seam border-b py-20 sm:py-24">
        <div className="container-bb">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.sizes.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.sizes.title}</h2>
          </div>

          <div className="mt-14 flex items-end justify-between gap-2 sm:gap-6">
            {LINEUP.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex min-w-0 flex-col items-center text-center"
                // flex-grow ∝ diameter, so widths stay to scale after the gaps
                style={{ flex: `${p.size.diameter} 1 0%` }}
              >
                <DiscPhoto
                  product={p}
                  alt={`${p.code} ${productName(p, locale)}`}
                  sizes="(max-width: 1024px) 45vw, 520px"
                  className="w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:rotate-[40deg]"
                />
                <p className="display mt-4 text-lg sm:text-3xl">
                  {p.size.diameter}
                  <span className="text-ash hidden text-base sm:inline"> mm</span>
                </p>
                <p className="font-display text-spark hidden text-xs font-semibold tracking-wider lg:block">{p.code}</p>
                <p className="text-ash hidden text-sm tabular-nums sm:block">{formatRpm(p.maxRpm, locale)} RPM</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RANGE */}
      <section className="py-20 sm:py-24">
        <div className="container-bb">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">{dict.home.range.eyebrow}</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.range.title}</h2>
            </div>
            <Link href="/products" className="font-display text-spark hover:text-spark-hot text-sm font-semibold tracking-[0.18em] uppercase">
              {dict.home.range.filterCompare}
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* SPEED TABLE */}
      <section className="py-20 sm:py-24">
        <div className="container-bb">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.speedTable.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.speedTable.title}</h2>
            <p className="text-bone/75 mt-5 leading-relaxed">{dict.home.speedTable.intro}</p>
          </div>

          <div className="border-seam mt-10 overflow-x-auto border">
            <table className="w-full min-w-[560px] text-left">
              <thead className="bg-iron font-display text-ash text-sm tracking-[0.14em] uppercase">
                <tr>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.model}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.size}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.maxRpm}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.maxSpeed}</th>
                </tr>
              </thead>
              <tbody className="divide-seam divide-y">
                {LINEUP.map((p) => (
                  <tr key={p.slug}>
                    <td className="px-5 py-4">
                      <Link href={`/products/${p.slug}`} className="font-display text-spark font-semibold tracking-wider hover:underline">
                        {p.code}
                      </Link>
                      <span className="text-ash block text-sm">{productName(p, locale)}</span>
                    </td>
                    <td className="px-5 py-4 tabular-nums">{sizeLabel(p)}</td>
                    <td className="display px-5 py-4 text-2xl tabular-nums">{formatRpm(p.maxRpm, locale)}</td>
                    <td className="px-5 py-4 tabular-nums">{p.maxSpeed} m/s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-spark text-coal">
        <div className="container-bb flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="display text-4xl sm:text-5xl">{dict.home.cta.title}</h2>
            <p className="mt-3 max-w-xl text-lg font-medium">{dict.home.cta.body}</p>
          </div>
          <Link href="/contact" className="btn bg-coal text-bone hover:bg-iron shrink-0">
            {dict.home.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
