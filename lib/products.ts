/**
 * The BigBear grinding disc range. Specs are exactly as supplied by
 * BigBear — don't round or embellish them here; every page reads from this.
 */
import type { Locale } from "@/lib/i18n/config";

export type Abrasive = "Aluminium oxide" | "Silicon carbide";

export type Product = {
  /** Model code printed on the disc, e.g. "BB-G100". */
  code: string;
  /** URL segment: the code, lowercased. */
  slug: string;
  name: string;
  /** Short variant label used on cards and filter chips. */
  variant: string;
  diameterIn: 4 | 5 | 7 | 9;
  /** Diameter × thickness × bore, in mm. */
  size: { diameter: number; thickness: number; bore: number };
  /** Extra shape note, e.g. Type 29's conical face. */
  shapeNote?: string;
  grain: string;
  abrasive: Abrasive;
  maxRpm: number;
  /** Peripheral speed rating in m/s. */
  maxSpeed: number;
  bestFor: string[];
  /** One-line pitch for cards. */
  summary: string;
  /** Materials this disc is meant for — drives the filter chips. */
  materials: Material[];
  /** Colour of the band on the drawn disc label, so variants read apart. */
  accent: string;
  /** Type 29 discs have an angled (conical) face. */
  conical?: boolean;
};

export type Material = "Steel" | "Stainless" | "Stone & cast iron";

export const PRODUCTS: Product[] = [
  {
    code: "BB-G100",
    slug: "bb-g100",
    name: 'Grinding Disc 4" Standard',
    variant: "Standard",
    diameterIn: 4,
    size: { diameter: 100, thickness: 6, bore: 16 },
    grain: "A24 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 15300,
    maxSpeed: 80,
    bestFor: ["General steel grinding", "Weld removal"],
    summary: "The everyday 4-inch disc for general steel work and knocking back welds.",
    materials: ["Steel"],
    accent: "#E8512A",
  },
  {
    code: "BB-G100F",
    slug: "bb-g100f",
    name: 'Grinding Disc 4" Fine',
    variant: "Fine",
    diameterIn: 4,
    size: { diameter: 100, thickness: 6, bore: 16 },
    grain: "A36 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 15300,
    maxSpeed: 80,
    bestFor: ["Smoother finish", "Light deburring"],
    summary: "Finer A36 grain for a smoother finish and light deburring.",
    materials: ["Steel"],
    accent: "#F2A33A",
  },
  {
    code: "BB-G100X",
    slug: "bb-g100x",
    name: 'Grinding Disc 4" Inox',
    variant: "Inox",
    diameterIn: 4,
    size: { diameter: 100, thickness: 6, bore: 16 },
    grain: "A24, iron/sulphur/chlorine-free",
    abrasive: "Aluminium oxide",
    maxRpm: 15300,
    maxSpeed: 80,
    bestFor: ["Stainless steel without rust contamination"],
    summary: "Iron, sulphur and chlorine-free, so stainless stays stainless.",
    materials: ["Stainless"],
    accent: "#4A9BD1",
  },
  {
    code: "BB-G100S",
    slug: "bb-g100s",
    name: 'Grinding Disc 4" Stone',
    variant: "Stone",
    diameterIn: 4,
    size: { diameter: 100, thickness: 6, bore: 16 },
    grain: "C24 silicon carbide",
    abrasive: "Silicon carbide",
    maxRpm: 15300,
    maxSpeed: 80,
    bestFor: ["Concrete", "Stone", "Cast iron"],
    summary: "Silicon carbide grain that cuts into concrete, stone and cast iron.",
    materials: ["Stone & cast iron"],
    accent: "#45A854",
  },
  {
    code: "BB-G100T",
    slug: "bb-g100t",
    name: 'Grinding Disc 4" Type 29',
    variant: "Type 29",
    diameterIn: 4,
    size: { diameter: 100, thickness: 6, bore: 16 },
    shapeNote: "Angled (conical) face",
    grain: "A24 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 15300,
    maxSpeed: 80,
    bestFor: ["Aggressive grinding on edges", "Wide surfaces"],
    summary: "Conical face for aggressive grinding on edges and wide surfaces.",
    materials: ["Steel"],
    accent: "#D43A2F",
    conical: true,
  },
  {
    code: "BB-G125",
    slug: "bb-g125",
    name: 'Grinding Disc 5"',
    variant: '5"',
    diameterIn: 5,
    size: { diameter: 125, thickness: 6, bore: 22.23 },
    grain: "A24 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 12200,
    maxSpeed: 80,
    bestFor: ["5-inch grinders", "Medium fabrication"],
    summary: "Sized for 5-inch grinders and medium fabrication work.",
    materials: ["Steel"],
    accent: "#E8512A",
  },
  {
    code: "BB-G180",
    slug: "bb-g180",
    name: 'Grinding Disc 7"',
    variant: '7"',
    diameterIn: 7,
    size: { diameter: 180, thickness: 6, bore: 22.23 },
    grain: "A24 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 8500,
    maxSpeed: 80,
    bestFor: ["Heavy fabrication", "Steel structures"],
    summary: "Heavy fabrication and structural steel on 7-inch grinders.",
    materials: ["Steel"],
    accent: "#E8512A",
  },
  {
    code: "BB-G230",
    slug: "bb-g230",
    name: 'Grinding Disc 9"',
    variant: '9"',
    diameterIn: 9,
    size: { diameter: 230, thickness: 6, bore: 22.23 },
    grain: "A24 aluminium oxide",
    abrasive: "Aluminium oxide",
    maxRpm: 6600,
    maxSpeed: 80,
    bestFor: ["Shipyards", "Large welds", "Heavy stock removal"],
    summary: "Shipyard-grade 9-inch disc for large welds and heavy stock removal.",
    materials: ["Steel"],
    accent: "#E8512A",
  },
];

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

/**
 * Indonesian overrides for the translatable copy in each product. `abrasive`
 * and `materials` stay in English everywhere — DiscArt and the filter chips
 * key off those exact strings, so only their *display* label is translated
 * (via `abrasiveLabel` / `materialLabel`).
 */
const PRODUCT_TRANSLATIONS: Record<
  string,
  Pick<Product, "name" | "variant" | "grain" | "summary" | "bestFor"> & { shapeNote?: string }
> = {
  "bb-g100": {
    name: 'Batu Gerinda 4″ Standar',
    variant: "Standar",
    grain: "A24 aluminium oksida",
    summary: "Batu gerinda 4 inci harian untuk pekerjaan baja umum dan meratakan hasil las.",
    bestFor: ["Gerinda baja umum", "Pembersihan las"],
  },
  "bb-g100f": {
    name: 'Batu Gerinda 4″ Halus',
    variant: "Halus",
    grain: "A36 aluminium oksida",
    summary: "Grit A36 yang lebih halus untuk hasil lebih rata dan deburring ringan.",
    bestFor: ["Hasil lebih halus", "Deburring ringan"],
  },
  "bb-g100x": {
    name: 'Batu Gerinda 4″ Inox',
    variant: "Inox",
    grain: "A24, bebas besi/belerang/klorin",
    summary: "Bebas besi, belerang dan klorin, sehingga stainless tetap stainless.",
    bestFor: ["Baja stainless tanpa kontaminasi karat"],
  },
  "bb-g100s": {
    name: 'Batu Gerinda 4″ Batu',
    variant: "Batu",
    grain: "C24 silikon karbida",
    summary: "Grit silikon karbida yang memotong beton, batu dan besi cor.",
    bestFor: ["Beton", "Batu", "Besi cor"],
  },
  "bb-g100t": {
    name: 'Batu Gerinda 4″ Tipe 29',
    variant: "Tipe 29",
    shapeNote: "Permukaan kerucut (miring)",
    grain: "A24 aluminium oksida",
    summary: "Permukaan kerucut untuk gerinda agresif pada sudut dan permukaan lebar.",
    bestFor: ["Gerinda agresif di sudut", "Permukaan lebar"],
  },
  "bb-g125": {
    name: 'Batu Gerinda 5″',
    variant: '5″',
    grain: "A24 aluminium oksida",
    summary: "Berukuran untuk mesin gerinda 5 inci dan pekerjaan fabrikasi menengah.",
    bestFor: ["Mesin gerinda 5 inci", "Fabrikasi menengah"],
  },
  "bb-g180": {
    name: 'Batu Gerinda 7″',
    variant: '7″',
    grain: "A24 aluminium oksida",
    summary: "Fabrikasi berat dan struktur baja pada mesin gerinda 7 inci.",
    bestFor: ["Fabrikasi berat", "Struktur baja"],
  },
  "bb-g230": {
    name: 'Batu Gerinda 9″',
    variant: '9″',
    grain: "A24 aluminium oksida",
    summary: "Batu gerinda 9 inci kelas galangan kapal untuk las besar dan pengerjaan material berat.",
    bestFor: ["Galangan kapal", "Las besar", "Pengerjaan material berat"],
  },
};

/** Returns `product` with its translatable copy swapped to the given locale. */
export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const t = PRODUCT_TRANSLATIONS[product.slug];
  if (!t) return product;
  return {
    ...product,
    name: t.name,
    variant: t.variant,
    grain: t.grain,
    summary: t.summary,
    bestFor: t.bestFor,
    shapeNote: t.shapeNote ?? product.shapeNote,
  };
}

const ABRASIVE_LABELS: Record<Locale, Record<Abrasive, string>> = {
  en: { "Aluminium oxide": "Aluminium oxide", "Silicon carbide": "Silicon carbide" },
  id: { "Aluminium oxide": "Aluminium oksida", "Silicon carbide": "Silikon karbida" },
};

export function abrasiveLabel(abrasive: Abrasive, locale: Locale): string {
  return ABRASIVE_LABELS[locale][abrasive];
}

const MATERIAL_LABELS: Record<Locale, Record<Material, string>> = {
  en: { Steel: "Steel", Stainless: "Stainless", "Stone & cast iron": "Stone & cast iron" },
  id: { Steel: "Baja", Stainless: "Stainless", "Stone & cast iron": "Batu & besi cor" },
};

export function materialLabel(material: Material, locale: Locale): string {
  return MATERIAL_LABELS[locale][material];
}

/** Other discs worth showing next to this one: closest diameter first. */
export function relatedProducts(p: Product, limit = 3): Product[] {
  return PRODUCTS.filter((o) => o.slug !== p.slug)
    .sort((a, b) => Math.abs(a.size.diameter - p.size.diameter) - Math.abs(b.size.diameter - p.size.diameter))
    .slice(0, limit);
}

export const DIAMETERS = [4, 5, 7, 9] as const;
export const MATERIALS: Material[] = ["Steel", "Stainless", "Stone & cast iron"];
