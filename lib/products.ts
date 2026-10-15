/**
 * The BigBear range: one entry per disc BigBear photographed for us. Every
 * value is read straight off that disc's printed label — don't round, convert
 * or add to it here; every page reads from this.
 */
import type { Locale } from "@/lib/i18n/config";

export type DiscType = "grinding" | "flexible" | "cutoff";

/** The safety lines printed next to the label's warning icons. */
export type LabelWarning = "useGuard" | "noGrinding" | "noOverspeed" | "mountCorrectly";

export type Product = {
  /** Code exactly as printed on the label, e.g. "A/F24Q4BF". */
  code: string;
  /** URL segment: the code, lowercased, with "/" dropped. */
  slug: string;
  type: DiscType;
  /** Diameter × thickness × bore, in mm, as printed. */
  size: { diameter: number; thickness: number; bore: number };
  maxRpm: number;
  /** Peripheral speed rating in m/s. */
  maxSpeed: number;
  /** Certification line as printed (the labels differ: "ISO 9001:2008" vs "ISO9001:2000"). */
  certification: string;
  productionLicense?: string;
  /** In label order. */
  warnings: LabelWarning[];
  /** Cut-out photo of this disc, in public/products. */
  photo: string;
};

export const PRODUCTS: Product[] = [
  {
    code: "A/F24Q4BF",
    slug: "af24q4bf",
    type: "grinding",
    size: { diameter: 100, thickness: 6, bore: 16 },
    maxRpm: 15200,
    maxSpeed: 80,
    certification: "ISO 9001:2008",
    warnings: ["useGuard", "noOverspeed", "mountCorrectly"],
    photo: "/products/disc-grinding.webp",
  },
  {
    code: "WA60",
    slug: "wa60",
    type: "flexible",
    size: { diameter: 103, thickness: 2.5, bore: 16 },
    maxRpm: 15200,
    maxSpeed: 80,
    certification: "ISO 9001:2008",
    warnings: ["useGuard", "noOverspeed", "mountCorrectly"],
    photo: "/products/disc-flexible.webp",
  },
  {
    code: "WA-60Q4BF",
    slug: "wa-60q4bf",
    type: "cutoff",
    size: { diameter: 105, thickness: 1.2, bore: 16 },
    maxRpm: 14600,
    maxSpeed: 80,
    certification: "ISO9001:2000",
    productionLicense: "XK06-011-00210",
    warnings: ["useGuard", "noGrinding", "noOverspeed"],
    photo: "/products/disc-cutoff-black.webp",
  },
  {
    code: "WA/F60Q4BF",
    slug: "waf60q4bf",
    type: "cutoff",
    size: { diameter: 105, thickness: 1.2, bore: 16 },
    maxRpm: 15200,
    maxSpeed: 80,
    certification: "ISO 9001:2008",
    warnings: ["useGuard", "noGrinding", "noOverspeed"],
    photo: "/products/disc-cutoff-green.webp",
  },
  {
    code: "41-A30Q4BF",
    slug: "41-a30q4bf",
    type: "cutoff",
    size: { diameter: 350, thickness: 2.8, bore: 25.4 },
    maxRpm: 4400,
    maxSpeed: 80,
    certification: "ISO9001:2000",
    productionLicense: "XK06-011-00210",
    warnings: ["useGuard", "noGrinding", "noOverspeed"],
    photo: "/products/disc-cutoff-350.webp",
  },
];

export const DISC_TYPES: DiscType[] = ["grinding", "flexible", "cutoff"];

const diameters = PRODUCTS.map((p) => p.size.diameter);
export const MIN_DIAMETER = Math.min(...diameters);
export const MAX_DIAMETER = Math.max(...diameters);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function sizeLabel(p: Product): string {
  const { diameter, thickness, bore } = p.size;
  return `${diameter} × ${thickness} × ${bore} mm`;
}

export function formatRpm(rpm: number, locale: Locale = "en"): string {
  return rpm.toLocaleString(locale === "id" ? "id-ID" : "en-US");
}

const TYPE_LABELS: Record<Locale, Record<DiscType, string>> = {
  en: { grinding: "Grinding disc", flexible: "Flexible disc", cutoff: "Cut-off wheel" },
  id: { grinding: "Batu gerinda", flexible: "Batu gerinda fleksibel", cutoff: "Cutting wheel" },
};

export function typeLabel(type: DiscType, locale: Locale): string {
  return TYPE_LABELS[locale][type];
}

/** The label's application line ("METAL & STAINLESS STEEL …"), per disc type. */
const USE_LINES: Record<Locale, Record<DiscType, string>> = {
  en: {
    grinding: "Metal & stainless steel. Only grinding.",
    flexible: "Flexible disc for metal & stainless steel.",
    cutoff: "Cut-off wheel for metal & stainless steel.",
  },
  id: {
    grinding: "Logam & baja stainless. Hanya untuk menggerinda.",
    flexible: "Batu gerinda fleksibel untuk logam & baja stainless.",
    cutoff: "Cutting wheel untuk logam & baja stainless.",
  },
};

export function applicationLine(type: DiscType, locale: Locale): string {
  return USE_LINES[locale][type];
}

const WARNING_LABELS: Record<Locale, Record<LabelWarning, string>> = {
  en: {
    useGuard: "Use guard",
    noGrinding: "Do not use for grinding",
    noOverspeed: "Do not overspeed",
    mountCorrectly: "Mount correctly",
  },
  id: {
    useGuard: "Gunakan pelindung",
    noGrinding: "Jangan digunakan untuk menggerinda",
    noOverspeed: "Jangan melebihi kecepatan maks",
    mountCorrectly: "Pasang dengan benar",
  },
};

export function warningLabel(w: LabelWarning, locale: Locale): string {
  return WARNING_LABELS[locale][w];
}

/** Display name, e.g. "Cut-off wheel 105 mm". The code tells same-size discs apart. */
export function productName(p: Product, locale: Locale): string {
  return `${typeLabel(p.type, locale)} ${p.size.diameter} mm`;
}

/** Other discs worth showing next to this one: same type first, then closest diameter. */
export function relatedProducts(p: Product, limit = 3): Product[] {
  const rank = (o: Product) => (o.type === p.type ? 0 : 1000) + Math.abs(o.size.diameter - p.size.diameter);
  return PRODUCTS.filter((o) => o.slug !== p.slug)
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit);
}
