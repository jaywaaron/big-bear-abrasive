import Image from "next/image";
import Link from "next/link";
import { localizeProduct, PRODUCTS } from "@/lib/products";
import { SITE, whatsappLink } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { email, phone, address } = SITE.contact;
  const wa = whatsappLink("Hi BigBear, I'd like to ask about your grinding discs.");

  return (
    <footer className="border-seam bg-iron border-t">
      <div className="container-bb grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-white.png" alt="BigBear Resin Bonded Abrasive" width={1463} height={534} className="h-12 w-auto" />
          <p className="text-ash mt-5 max-w-xs text-sm leading-relaxed">{dict.footer.description}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">{dict.footer.fourInch}</p>
          <ul className="space-y-2 text-sm">
            {PRODUCTS.filter((p) => p.diameterIn === 4).map((p) => {
              const lp = localizeProduct(p, locale);
              return (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-bone/80 hover:text-spark transition-colors">
                    {lp.code} · {lp.variant}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{dict.footer.largeDiscs}</p>
          <ul className="space-y-2 text-sm">
            {PRODUCTS.filter((p) => p.diameterIn !== 4).map((p) => {
              const lp = localizeProduct(p, locale);
              return (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-bone/80 hover:text-spark transition-colors">
                    {lp.code} · {lp.variant}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{dict.footer.contact}</p>
          <ul className="text-bone/80 space-y-2 text-sm">
            {email && (
              <li>
                <a href={`mailto:${email}`} className="hover:text-spark transition-colors">{email}</a>
              </li>
            )}
            {phone && <li>{phone}</li>}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-spark transition-colors">WhatsApp</a>
              </li>
            )}
            {address && <li className="text-ash whitespace-pre-line">{address}</li>}
            <li>
              <Link href="/contact" className="hover:text-spark transition-colors">{dict.footer.requestQuote}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
