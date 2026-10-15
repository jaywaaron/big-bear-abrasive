import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { SITE, whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return { title: dict.contact.metaTitle, description: dict.contact.metaDescription };
}

export default async function ContactPage(props: PageProps<"/contact">) {
  const { product } = await props.searchParams;
  const dict = getDictionary(await getLocale());
  const { email, phone, address } = SITE.contact;
  const wa = whatsappLink("Hi BigBear, I'd like to ask about your discs.");
  const hasDetails = email || phone || wa || address;

  return (
    <section className="py-14 sm:py-20">
      <div className="container-bb grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">{dict.contact.eyebrow}</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">{dict.contact.title}</h1>
          <p className="text-bone/75 mt-5 max-w-md text-lg leading-relaxed">{dict.contact.intro}</p>

          {hasDetails && (
            <dl className="border-seam divide-seam mt-10 max-w-md divide-y border-y">
              {email && (
                <div className="py-4">
                  <dt className="text-ash text-xs tracking-widest uppercase">{dict.contact.email}</dt>
                  <dd className="mt-1"><a href={`mailto:${email}`} className="hover:text-spark">{email}</a></dd>
                </div>
              )}
              {phone && (
                <div className="py-4">
                  <dt className="text-ash text-xs tracking-widest uppercase">{dict.contact.phone}</dt>
                  <dd className="mt-1">{phone}</dd>
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

        <div className="border-seam bg-iron border p-6 sm:p-10">
          <QuoteForm key={String(product ?? "")} initialProduct={typeof product === "string" ? product : undefined} />
        </div>
      </div>
    </section>
  );
}
