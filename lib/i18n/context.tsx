"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Wraps the app once in the root layout. `locale` comes from the server (the
 * cookie), so switching languages sets the cookie and asks the router to
 * refresh — Server Components then re-render with the new locale and this
 * provider receives it back as a fresh prop.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dict: getDictionary(locale),
      setLocale: (next: Locale) => {
        if (next === locale) return;
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
      },
    }),
    [locale, router]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
