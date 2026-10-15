"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { DISC_TYPES, PRODUCTS, type DiscType } from "@/lib/products";
import { useLocale } from "@/lib/i18n/context";

/** Product grid with disc-type filter chips. */
export default function ProductBrowser() {
  const [filter, setFilter] = useState<DiscType | "all">("all");
  const { locale, dict } = useLocale();

  const shown = PRODUCTS.filter((p) => filter === "all" || p.type === filter);

  const chip = (active: boolean) =>
    `font-display h-10 shrink-0 border px-4 text-sm font-semibold tracking-widest uppercase transition-colors ${
      active ? "border-spark bg-spark text-coal" : "border-seam text-bone/80 hover:border-bone hover:text-bone"
    }`;

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label={dict.products.browser.filterAria}>
        {(["all", ...DISC_TYPES] as const).map((t) => (
          <button key={t} type="button" className={chip(filter === t)} aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t === "all" ? dict.products.browser.allDiscs : dict.products.browser.types[t]}
          </button>
        ))}
      </div>

      <p className="text-ash mt-4 text-sm" aria-live="polite">
        {dict.products.browser.discCount(shown.length)}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
