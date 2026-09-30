"use client";

import { useLocale } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/config";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "id", label: "ID" },
];

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`font-display border-seam text-bone/80 flex h-9 items-center border text-xs font-semibold tracking-widest ${className ?? ""}`}
    >
      {OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={locale === opt.value}
          onClick={() => setLocale(opt.value)}
          className={`h-full px-3 transition-colors ${i > 0 ? "border-seam border-l" : ""} ${
            locale === opt.value ? "bg-spark text-coal" : "hover:text-bone"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
