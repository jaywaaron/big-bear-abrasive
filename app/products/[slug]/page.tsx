import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiscPhoto from "@/components/DiscPhoto";
import ProductCard from "@/components/ProductCard";
import SafetyIcon from "@/components/SafetyIcon";
import {
  PRODUCTS,
  applicationLine,
  formatRpm,
  getProduct,
  productName,
  relatedProducts,
  sizeLabel,
  typeLabel,
  warningLabel,
} from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Only the known models exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  const locale = await getLocale();
  return {
    title: `${p.code} ${productName(p, locale)}`,
    description: `${productName(p, locale)} (${p.code}): ${sizeLabel(p)}, max ${formatRpm(p.maxRpm, locale)} RPM (${p.maxSpeed} m/s). ${applicationLine(p.type, locale)}`,
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();

  const locale = await getLocale();
  const dict = getDictionary(locale);
  const name = productName(p, locale);
  const s = dict.products.detail.specs;

  const specs: [string, string][] = [
    [s.code, p.code],
    [s.type, typeLabel(p.type, locale)],
    [s.diameter, `${p.size.diameter} mm`],
    [s.thickness, `${p.size.thickness} mm`],
    [s.bore, `${p.size.bore} mm`],
    [s.maxSpeed, `${formatRpm(p.maxRpm, locale)} RPM`],
    [s.peripheralSpeed, `${p.maxSpeed} m/s`],
    [s.certification, p.certification],
    ...(p.productionLicense ? ([[s.productionLicense, p.productionLicense]] as [string, string][]) : []),
  ];

  const wa = whatsappLink(`Hi BigBear, I'd like a quote for ${p.code} (${name}).`);

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
              <DiscPhoto
                product={p}
                alt={`${p.code} ${name}`}
                sizes="(max-width: 1024px) 86vw, 520px"
                className="size-[86%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition-transform duration-[1.2s] ease-out group-hover:rotate-[60deg]"
              />
              <span className="text-ash absolute bottom-3 left-4 text-xs">{dict.products.detail.photoNote}</span>
            </div>

            <div>
              <p className="font-display text-spark text-lg font-semibold tracking-[0.2em]">{p.code}</p>
              <h1 className="display mt-2 text-5xl sm:text-6xl">{name}</h1>
              <p className="text-bone/75 mt-5 text-lg leading-relaxed">{applicationLine(p.type, locale)}</p>

              <div className="mt-8">
                <p className="eyebrow">{dict.products.detail.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.warnings.map((w) => (
                    <li key={w} className="border-seam bg-iron-2 border px-3 py-1.5 text-sm">{warningLabel(w, locale)}</li>
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
            {dict.products.detail.speedWarningPrefix(p.code)}
            <strong className="text-bone">{dict.products.detail.speedWarningRated(formatRpm(p.maxRpm, locale))}</strong>
            {dict.products.detail.speedWarningSuffix}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-bb">
          <h2 className="display text-3xl sm:text-4xl">{dict.products.detail.alsoConsider}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts(p).map((r) => (
              <ProductCard key={r.slug} product={r} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
