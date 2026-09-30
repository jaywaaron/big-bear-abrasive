import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiscArt from "@/components/DiscArt";
import ProductCard from "@/components/ProductCard";
import SafetyIcon from "@/components/SafetyIcon";
import { PRODUCTS, abrasiveLabel, formatRpm, getProduct, localizeProduct, relatedProducts, sizeLabel } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Only the eight known models exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const raw = getProduct(slug);
  if (!raw) return {};
  const locale = await getLocale();
  const p = localizeProduct(raw, locale);
  return {
    title: `${p.code} ${p.name}`,
    description: `${p.name} (${p.code}): ${sizeLabel(p)}, ${p.grain}, max ${formatRpm(p.maxRpm, locale)} RPM (${p.maxSpeed} m/s). ${
      locale === "id" ? "Cocok untuk" : "Best for"
    } ${p.bestFor.join(", ").toLowerCase()}.`,
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const raw = getProduct(slug);
  if (!raw) notFound();

  const locale = await getLocale();
  const dict = getDictionary(locale);
  const p = localizeProduct(raw, locale);

  const specs: [string, string][] = [
    [dict.products.detail.specs.diameter, `${p.size.diameter} mm (${p.diameterIn}″)`],
    [dict.products.detail.specs.thickness, `${p.size.thickness} mm`],
    [dict.products.detail.specs.bore, `${p.size.bore} mm`],
    ...(p.shapeNote ? ([[dict.products.detail.specs.face, p.shapeNote]] as [string, string][]) : []),
    [dict.products.detail.specs.grain, p.grain],
    [dict.products.detail.specs.abrasive, abrasiveLabel(p.abrasive, locale)],
    [dict.products.detail.specs.maxSpeed, `${formatRpm(p.maxRpm, locale)} RPM`],
    [dict.products.detail.specs.peripheralSpeed, `${p.maxSpeed} m/s`],
  ];

  const wa = whatsappLink(`Hi BigBear, I'd like a quote for ${p.code} (${p.name}).`);

  return (
    <>
      <section className="border-seam border-b">
        <div className="container-bb py-10 sm:py-14">
          <p className="text-ash font-display text-sm tracking-[0.18em] uppercase">
            <Link href="/" className="hover:text-bone">{dict.breadcrumb.home}</Link> /{" "}
            <Link href="/products" className="hover:text-bone">{dict.breadcrumb.products}</Link> / {p.code}
          </p>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div className="group border-seam relative flex aspect-square items-center justify-center border bg-[radial-gradient(circle_at_50%_45%,#26282d_0%,#131417_72%)]">
              <DiscArt
                product={p}
                uid={`hero-${p.slug}`}
                className="size-[86%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition-transform duration-[1.2s] ease-out group-hover:rotate-[60deg]"
              />
              <span className="text-ash absolute bottom-3 left-4 text-xs">{dict.products.detail.illustrationNote}</span>
            </div>

            <div>
              <p className="font-display text-spark text-lg font-semibold tracking-[0.2em]">{p.code}</p>
              <h1 className="display mt-2 text-5xl sm:text-6xl">{p.name}</h1>
              <p className="text-bone/75 mt-5 text-lg leading-relaxed">{p.summary}</p>

              <div className="mt-8">
                <p className="eyebrow">{dict.products.detail.bestFor}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.bestFor.map((b) => (
                    <li key={b} className="border-seam bg-iron-2 border px-3 py-1.5 text-sm">{b}</li>
                  ))}
                </ul>
              </div>

              <dl className="border-seam divide-seam mt-8 divide-y border-y">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[11rem_1fr]">
                    <dt className="text-ash">{k}</dt>
                    <dd className="font-semibold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/contact?product=${p.slug}`} className="btn btn-spark">
                  {dict.products.detail.requestQuote}
                </Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    {dict.products.detail.askWhatsapp}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed warning, specific to this disc */}
      <section className="bg-iron border-seam border-b">
        <div className="container-bb flex flex-col gap-5 py-8 sm:flex-row sm:items-center">
          <SafetyIcon kind="speed" className="text-bone size-12 shrink-0" />
          <p className="text-bone/85 leading-relaxed">
            {dict.products.detail.speedWarningPrefix(p.code, p.diameterIn)}
            <strong className="text-bone">{dict.products.detail.speedWarningRated(formatRpm(p.maxRpm, locale))}</strong>
            {dict.products.detail.speedWarningSuffix}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-bb">
          <h2 className="display text-3xl sm:text-4xl">{dict.products.detail.alsoConsider}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts(raw).map((r) => (
              <ProductCard key={r.slug} product={localizeProduct(r, locale)} uid={`related-${r.slug}`} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
