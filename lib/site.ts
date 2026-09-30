/**
 * Site-wide settings. Contact details are placeholders — replace them with
 * BigBear's real ones before launch. Anything left empty is hidden on the
 * site rather than shown broken.
 */
export const SITE = {
  name: "BigBear Abrasive",
  tagline: "Resin Bonded Abrasive",
  description:
    "BigBear resin bonded grinding discs from 4 to 9 inches, rated to 80 m/s. Standard, fine, inox, stone and Type 29 discs for steel, stainless, concrete and cast iron.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  contact: {
    // TODO: BigBear's real sales email — the quote form sends to this.
    email: "",
    // TODO: WhatsApp number in international format, digits only (e.g. "6281234567890").
    whatsapp: "",
    // TODO: phone as it should be displayed.
    phone: "",
    // TODO: office / warehouse address.
    address: "",
  },
};

export function hasContactChannel(): boolean {
  return Boolean(SITE.contact.email || SITE.contact.whatsapp);
}

export function whatsappLink(message: string): string | null {
  const n = SITE.contact.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}
