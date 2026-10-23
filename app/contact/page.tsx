import type { Metadata } from "next";
import { SITE, whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return { title: dict.contact.metaTitle, description: dict.contact.metaDescription };
}

export default async function ContactPage() {
  const dict = getDictionary(await getLocale());
  const { email, phone, address } = SITE.contact;
  const wa = whatsappLink("Hi BigBear, I'd like to ask about your discs.");
  const tel = phone.replace(/[^\d+]/g, "");

  return (
    <section className="py-14 sm:py-20">
      <div className="container-bb max-w-3xl">
        <p className="eyebrow">{dict.contact.eyebrow}</p>
        <h1 className="display mt-3 text-5xl sm:text-7xl">{dict.contact.title}</h1>
        <p className="text-bone/75 mt-5 max-w-xl text-lg leading-relaxed">{dict.contact.intro}</p>

        {phone ? (
          <div className="border-seam bg-iron mt-10 border p-6 sm:p-10">
            <p className="text-ash text-xs tracking-widest uppercase">{dict.contact.phone}</p>
            <a href={`tel:${tel}`} className="display hover:text-spark mt-2 block text-4xl break-words transition-colors sm:text-6xl">
              {phone}
            </a>
            <a href={`tel:${tel}`} className="btn btn-spark mt-6">
              {dict.contact.callNow}
            </a>
          </div>
        ) : (
          <p className="border-seam bg-iron text-ash mt-10 border p-6">{dict.contact.comingSoon}</p>
        )}

        {(email || wa || address) && (
          <dl className="border-seam divide-seam mt-8 divide-y border-y">
            {email && (
              <div className="py-4">
                <dt className="text-ash text-xs tracking-widest uppercase">{dict.contact.email}</dt>
                <dd className="mt-1"><a href={`mailto:${email}`} className="hover:text-spark">{email}</a></dd>
              </div>
            )}
            {wa && (
              <div className="py-4">
                <dt className="text-ash text-xs tracking-widest uppercase">{dict.contact.whatsapp}</dt>
                <dd className="mt-1"><a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-spark">{dict.contact.messageUs}</a></dd>
              </div>
            )}
            {address && (
              <div className="py-4">
                <dt className="text-ash text-xs tracking-widest uppercase">{dict.contact.address}</dt>
                <dd className="mt-1 whitespace-pre-line">{address}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </section>
  );
}
