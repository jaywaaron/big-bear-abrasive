"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { DIAMETERS, localizeProduct, materialLabel, MATERIALS, PRODUCTS, type Material } from "@/lib/products";
import { useLocale } from "@/lib/i18n/context";

type Filter = { kind: "all" } | { kind: "size"; value: number } | { kind: "material"; value: Material };

/** Product grid with size / material filter chips. */
export default function ProductBrowser() {
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const { locale, dict } = useLocale();

  const shown = PRODUCTS.filter((p) => {
    if (filter.kind === "size") return p.diameterIn === filter.value;
    if (filter.kind === "material") return p.materials.includes(filter.value);
    return true;
  });

  const chip = (active: boolean) =>
    `font-display h-10 shrink-0 border px-4 text-sm font-semibold tracking-widest uppercase transition-colors ${
      active ? "border-spark bg-spark text-coal" : "border-seam text-bone/80 hover:border-bone hover:text-bone"
    }`;

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label={dict.products.browser.filterAria}>
        <button type="button" className={chip(filter.kind === "all")} aria-pressed={filter.kind === "all"} onClick={() => setFilter({ kind: "all" })}>
          {dict.products.browser.allDiscs}
        </button>
        {DIAMETERS.map((d) => {
          const active = filter.kind === "size" && filter.value === d;
          return (
            <button key={d} type="button" className={chip(active)} aria-pressed={active} onClick={() => setFilter({ kind: "size", value: d })}>
              {d}&Prime;
            </button>
          );
        })}
        <span aria-hidden className="bg-seam mx-1 hidden w-px self-stretch sm:block" />
        {MATERIALS.map((m) => {
          const active = filter.kind === "material" && filter.value === m;
          return (
            <button key={m} type="button" className={chip(active)} aria-pressed={active} onClick={() => setFilter({ kind: "material", value: m })}>
              {materialLabel(m, locale)}
            </button>
          );
        })}
      </div>

      <p className="text-ash mt-4 text-sm" aria-live="polite">
        {dict.products.browser.discCount(shown.length)}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={localizeProduct(p, locale)} locale={locale} />
        ))}
      </div>
    </div>
  );
}
