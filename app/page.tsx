import Image from "next/image";
import Link from "next/link";
import DiscArt from "@/components/DiscArt";
import HeroDisc from "@/components/HeroDisc";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, formatRpm, getProduct, localizeProduct, sizeLabel } from "@/lib/products";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

// One disc per diameter for the to-scale lineup.
const LINEUP_SLUGS = ["bb-g100", "bb-g125", "bb-g180", "bb-g230"];

const GRAIN_GUIDE_SLUGS = ["bb-g100", "bb-g100f", "bb-g100x", "bb-g100s", "bb-g100t", "bb-g230"];

const GALLERY_IMAGES = [
  "/products/disc-grinding.webp",
  "/products/disc-flexible.webp",
  "/products/disc-cutoff-black.webp",
  "/products/disc-cutoff-green.webp",
];

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const LINEUP = LINEUP_SLUGS.map((s) => localizeProduct(getProduct(s)!, locale));

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

      {/* SIZE LINEUP — drawn to true relative scale */}
      <section className="border-seam border-b py-20 sm:py-24">
        <div className="container-bb">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.sizes.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.sizes.title}</h2>
          </div>

          <div className="mt-14 flex items-end justify-between gap-3 sm:gap-6">
            {LINEUP.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col items-center text-center"
                // flex-grow ∝ diameter, so widths stay to scale after the gaps
                style={{ flex: `${p.size.diameter} 1 0%` }}
              >
                <DiscArt
                  product={p}
                  uid={`lineup-${p.slug}`}
                  className="w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:rotate-[40deg]"
                />
                <p className="display mt-4 text-2xl sm:text-4xl">{p.diameterIn}&Prime;</p>
                <p className="text-ash mt-1 text-[11px] tabular-nums sm:text-sm">{p.size.diameter} mm</p>
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={localizeProduct(p, locale)} uid={`home-${p.slug}`} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* GRAIN GUIDE */}
      <section id="grain-guide" className="border-seam bg-iron scroll-mt-20 border-y py-20 sm:py-24">
        <div className="container-bb grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">{dict.home.grainGuide.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.grainGuide.title}</h2>
          </div>

          <ul className="border-seam divide-seam divide-y border-y">
            {GRAIN_GUIDE_SLUGS.map((slug) => {
              const p = getProduct(slug)!;
              const g = dict.home.grainGuide.items[slug];
              return (
                <li key={slug}>
                  <Link href={`/products/${p.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 sm:grid-cols-[1.1fr_1.4fr_auto]">
                    <p className="display text-xl sm:text-2xl">{g.job}</p>
                    <p className="text-ash col-span-2 row-start-2 text-sm sm:col-span-1 sm:row-start-auto">{g.why}</p>
                    <span className="font-display text-spark col-start-2 row-start-1 text-sm font-semibold tracking-[0.14em] whitespace-nowrap group-hover:underline sm:col-start-auto sm:row-start-auto">
                      {p.code} →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
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
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.diameter}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.size}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.maxRpm}</th>
                  <th className="px-5 py-4 font-semibold">{dict.home.speedTable.headers.models}</th>
                </tr>
              </thead>
              <tbody className="divide-seam divide-y">
                {LINEUP.map((p) => (
                  <tr key={p.diameterIn}>
                    <td className="display px-5 py-4 text-2xl">{p.diameterIn}&Prime;</td>
                    <td className="px-5 py-4 tabular-nums">{sizeLabel(p)}</td>
                    <td className="px-5 py-4 font-semibold tabular-nums">{formatRpm(p.maxRpm, locale)}</td>
                    <td className="text-ash px-5 py-4 text-sm">
                      {PRODUCTS.filter((o) => o.diameterIn === p.diameterIn).map((o, i) => (
                        <span key={o.slug}>
                          {i > 0 && ", "}
                          <Link href={`/products/${o.slug}`} className="hover:text-spark transition-colors">{o.code}</Link>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* REAL DISCS */}
      <section className="py-20 sm:py-24">
        <div className="container-bb">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.gallery.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{dict.home.gallery.title}</h2>
            <p className="text-bone/75 mt-5 leading-relaxed">{dict.home.gallery.intro}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY_IMAGES.map((src, i) => {
              const g = dict.home.gallery.items[i];
              return (
                <figure key={src} className="border-seam bg-iron border p-5 sm:p-7">
                  <div className="relative aspect-square">
                    <Image src={src} alt={`BigBear ${g.caption.toLowerCase()} for ${g.note.toLowerCase()}`} fill sizes="(max-width: 1024px) 45vw, 300px" className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]" />
                  </div>
                  <figcaption className="mt-5">
                    <p className="display text-xl">{g.caption}</p>
                    <p className="text-ash text-sm">{g.note}</p>
                  </figcaption>
                </figure>
              );
            })}
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
