import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import DiscPhoto from "@/components/DiscPhoto";
import { SPARKS } from "@/components/HeroDisc";
import SafetyIcon, { type SafetyKind } from "@/components/SafetyIcon";
import { PRODUCTS, formatRpm, getProduct, productName, sizeLabel, warningLabel, type Product } from "@/lib/products";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return { title: dict.about.metaTitle, description: dict.about.metaDescription };
}

const LINEUP = [...PRODUCTS].sort((a, b) => a.size.diameter - b.size.diameter);
const WHEEL = getProduct("41-a30q4bf") as Product;

// The disc shown for each job in the guide.
const JOB_DISC: Record<string, string> = {
  grinding: "af24q4bf",
  flexible: "wa60",
  cutoff: "waf60q4bf",
  cutoff350: "41-a30q4bf",
};

// Callout markers over the 350 mm wheel's label, as % of the photo.
const MARKERS = [
  { n: 1, x: 51, y: 25 },
  { n: 2, x: 42, y: 32 },
  { n: 3, x: 59, y: 31 },
  { n: 4, x: 60, y: 62 },
];

/** Thin L-shaped brackets on each corner, like crop marks on a spec sheet. */
function Corners() {
  const c = "border-spark absolute size-3";
  return (
    <span aria-hidden>
      <span className={`${c} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${c} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${c} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${c} right-0 bottom-0 border-r-2 border-b-2`} />
    </span>
  );
}

export default async function AboutPage() {
  const locale = await getLocale();
  const a = getDictionary(locale).about;

  const labelRows = [
    { n: 1, label: a.labelParts.code, value: WHEEL.code },
    { n: 2, label: a.labelParts.size, value: sizeLabel(WHEEL) },
    { n: 2, label: a.labelParts.rpm, value: `${formatRpm(WHEEL.maxRpm, locale)} RPM` },
    { n: 2, label: a.labelParts.speed, value: `${WHEEL.maxSpeed} m/s` },
    { n: 3, label: a.labelParts.cert, value: WHEEL.certification },
    { n: 4, label: a.labelParts.safety, value: WHEEL.warnings.map((w) => warningLabel(w, locale)).join(" · ") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="border-seam relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,#000,transparent_70%)]"
        />
        <p
          aria-hidden
          className="display text-outline pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[22vw] whitespace-nowrap select-none"
        >
          BigBear
        </p>

        <div className="container-bb relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">{a.eyebrow}</p>
            <h1 className="display mt-4 text-6xl sm:text-8xl">
              {a.titleLine1}
              <br />
              <span className="text-spark">{a.titleHighlight}</span>
            </h1>
            <div className="bg-spark mt-6 h-1.5 w-24" aria-hidden />
            <p className="text-bone/75 mt-6 max-w-xl text-lg leading-relaxed">{a.intro}</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="bg-spark/25 absolute inset-[12%] rounded-full blur-3xl" aria-hidden />
            <div className="border-seam absolute -inset-4 rounded-full border border-dashed" aria-hidden />
            <div className="animate-spin-slow absolute inset-0 [animation-direction:reverse]">
              <Image
                src={WHEEL.photo}
                alt={`${WHEEL.code} ${productName(WHEEL, locale)}`}
                fill
                preload
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div className="pointer-events-none absolute top-[97%] left-[58%]" aria-hidden>
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="spark"
                  style={{ "--a": `${s.a}deg`, "--d": `${s.d}px`, "--t": `${s.t}s`, "--delay": `${s.delay}s` } as CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 sm:py-20">
        <dl className="container-bb grid gap-6 sm:grid-cols-3">
          {a.stats.map((s) => (
            <div key={s.label} className="bg-iron relative p-8">
              <Corners />
              <dt className="text-ash text-xs tracking-widest uppercase">{s.label}</dt>
              <dd className="display mt-3 text-6xl sm:text-7xl">
                {s.value}
                {s.unit && <span className="text-spark ml-1 text-2xl">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STORY */}
      <section className="border-seam border-t py-14 sm:py-20">
        <div className="container-bb grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">{a.storyEyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{a.storyTitle}</h2>
            <Image
              src="/brand/logo-white.png"
              alt=""
              width={1463}
              height={534}
              className="mt-10 hidden h-20 w-auto opacity-20 lg:block"
            />
          </div>
          <div>
            <div className="text-bone/75 space-y-5 text-lg leading-relaxed">
              {a.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <blockquote className="border-spark relative mt-10 border-l-4 py-2 pl-6">
              <span aria-hidden className="display text-spark/30 absolute -top-8 left-4 text-8xl">
                &ldquo;
              </span>
              <p className="display relative text-3xl sm:text-4xl">{a.quote}</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* READ THE LABEL */}
      <section className="border-seam bg-iron relative overflow-hidden border-y py-14 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="container-bb relative">
          <div className="max-w-2xl">
            <p className="eyebrow">{a.labelEyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{a.labelTitle}</h2>
            <p className="text-bone/75 mt-5 text-lg leading-relaxed">{a.labelIntro}</p>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <Image
                src={WHEEL.photo}
                alt={`${WHEEL.code} ${productName(WHEEL, locale)}`}
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
              />
              {MARKERS.map((m) => (
                <span
                  key={m.n}
                  aria-hidden
                  className="bg-spark text-coal font-display ring-coal absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold ring-4"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                >
                  {m.n}
                </span>
              ))}
            </div>

            <ol className="border-seam divide-seam divide-y border-y">
              {labelRows.map((r) => (
                <li key={r.label} className="flex items-baseline gap-4 py-4">
                  <span className="bg-spark text-coal font-display flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {r.n}
                  </span>
                  <span className="text-ash flex-1 text-xs tracking-widest uppercase">{r.label}</span>
                  <span className="font-display text-right text-lg font-semibold tracking-wider tabular-nums">{r.value}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-14 sm:py-20">
        <div className="container-bb">
          <p className="eyebrow">{a.valuesEyebrow}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{a.valuesTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {a.values.map((v, i) => (
              <div key={v.title} className="group border-seam bg-iron relative overflow-hidden border p-6 sm:p-8">
                <span
                  aria-hidden
                  className="display text-outline absolute -top-4 -right-2 text-9xl transition-transform duration-500 group-hover:-translate-y-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="bg-spark h-1 w-10 transition-all duration-500 group-hover:w-20" aria-hidden />
                <h3 className="display relative mt-6 text-3xl">{v.title}</h3>
                <p className="text-ash relative mt-3 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB GUIDE */}
      <section className="border-seam border-t py-14 sm:py-20">
        <div className="container-bb">
          <p className="eyebrow">{a.jobsEyebrow}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{a.jobsTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {a.jobs.map((j) => {
              const p = getProduct(JOB_DISC[j.type]) as Product;
              return (
                <Link
                  key={j.task}
                  href={`/products/${p.slug}`}
                  className="group border-seam bg-iron hover:border-spark flex items-center gap-6 border p-5 transition-colors sm:p-6"
                >
                  <DiscPhoto
                    product={p}
                    alt=""
                    sizes="112px"
                    className="w-20 shrink-0 transition-transform duration-700 group-hover:rotate-[60deg] sm:w-28"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold tracking-wider uppercase">{j.task}</h3>
                    <p className="text-ash mt-2 text-sm leading-relaxed">{j.body}</p>
                    <p className="font-display text-spark mt-3 text-xs font-semibold tracking-[0.18em] uppercase">
                      {a.jobsCta} · {p.code} →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section className="border-seam bg-iron border-y py-14 sm:py-20">
        <div className="container-bb">
          <p className="eyebrow">{a.lineupEyebrow}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{a.lineupTitle}</h2>
          <div className="mt-12 flex items-end justify-between gap-2 sm:gap-6">
            {LINEUP.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex min-w-0 flex-col items-center text-center"
                style={{ flex: `${p.size.diameter} 1 0%` }}
              >
                <DiscPhoto
                  product={p}
                  alt={`${p.code} ${productName(p, locale)}`}
                  sizes="(max-width: 1024px) 45vw, 520px"
                  className="w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:rotate-[40deg]"
                />
                <p className="display mt-4 text-lg sm:text-2xl">
                  {p.size.diameter}
                  <span className="text-ash hidden text-sm sm:inline"> mm</span>
                </p>
              </Link>
            ))}
          </div>
          <div className="border-seam mt-6 border-t border-dashed" aria-hidden />
        </div>
      </section>

      {/* SAFETY */}
      <section className="py-14 sm:py-20">
        <div className="container-bb">
          <p className="eyebrow">{a.safetyEyebrow}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{a.safetyTitle}</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {a.safety.map((s) => (
              <li key={s.kind} className="border-seam hover:border-spark flex flex-col items-center gap-4 border p-5 text-center transition-colors">
                <SafetyIcon kind={s.kind as SafetyKind} className="text-bone size-12" />
                <span className="font-display text-sm font-semibold tracking-wider uppercase">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-spark text-coal relative">
        <div className="hazard h-3" aria-hidden />
        <div className="container-bb flex flex-col items-start justify-between gap-8 py-14 sm:py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="display text-4xl sm:text-5xl">{a.ctaTitle}</h2>
            <p className="mt-3 text-lg font-medium">{a.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn bg-coal text-bone hover:bg-iron">
              {a.ctaPrimary}
            </Link>
            <Link href="/products" className="btn border-coal hover:bg-coal hover:text-bone border">
              {a.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="hazard h-3" aria-hidden />
      </section>
    </>
  );
}
