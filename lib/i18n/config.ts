export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie the visitor's language choice is remembered in — no URL prefix, so one URL serves both languages. */
export const LOCALE_COOKIE = "bb_locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
