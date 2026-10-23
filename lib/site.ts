/**
 * Site-wide settings. Contact details are placeholders — replace them with
 * BigBear's real ones before launch. Anything left empty is hidden on the
 * site rather than shown broken.
 */
export const SITE = {
  name: "BigBear Abrasive",
  tagline: "Resin Bonded Abrasive",
  description:
    "BigBear resin bonded grinding discs, flexible discs and cut-off wheels for metal and stainless steel, from 100 to 350 mm, rated to 80 m/s.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  contact: {
    // TODO: BigBear's sales email (optional).
    email: "",
    // TODO: WhatsApp number in international format, digits only (e.g. "6281234567890").
    whatsapp: "",
    // TODO: phone as it should be displayed — this is the main way customers reach BigBear.
    phone: "",
    // TODO: office / warehouse address.
    address: "",
  },
};

export function whatsappLink(message: string): string | null {
  const n = SITE.contact.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}
