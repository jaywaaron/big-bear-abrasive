"use client";

import { useState } from "react";
import { PRODUCTS, productName } from "@/lib/products";
import { SITE, whatsappLink } from "@/lib/site";
import { useLocale } from "@/lib/i18n/context";

/**
 * Quote request. There's no backend: the form composes the enquiry and hands
 * it to the visitor's email app or WhatsApp, whichever BigBear has set up in
 * lib/site.ts.
 */
export default function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const { locale, dict } = useLocale();
  const [product, setProduct] = useState(
    PRODUCTS.some((p) => p.slug === initialProduct) ? initialProduct! : ""
  );
  const [error, setError] = useState<string | null>(null);

  const email = SITE.contact.email;
  const canWhatsapp = Boolean(SITE.contact.whatsapp);
  const configured = Boolean(email) || canWhatsapp;

  function compose(form: HTMLFormElement): string | null {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const reply = String(data.get("reply") ?? "").trim();
    if (!name || !reply) {
      setError(dict.quoteForm.requiredError);
      return null;
    }
    setError(null);
    const chosen = PRODUCTS.find((p) => p.slug === data.get("product"));
    const c = dict.quoteForm.compose;
    const lines = [
      c.title,
      "",
      `${c.name}: ${name}`,
      data.get("company") ? `${c.company}: ${data.get("company")}` : null,
      `${c.replyTo}: ${reply}`,
      `${c.disc}: ${chosen ? `${chosen.code} — ${productName(chosen, locale)}` : dict.quoteForm.notSure}`,
      data.get("qty") ? `${c.quantity}: ${data.get("qty")}` : null,
      "",
      String(data.get("message") ?? "").trim() || null,
    ];
    return lines.filter((l) => l !== null).join("\n");
  }

  function sendEmail(form: HTMLFormElement) {
    const body = compose(form);
    if (!body || !email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(dict.quoteForm.compose.subject)}&body=${encodeURIComponent(body)}`;
  }

  function sendWhatsapp(form: HTMLFormElement) {
    const body = compose(form);
    const link = body && whatsappLink(body);
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  }

  const label = "font-display text-ash mb-2 block text-sm font-semibold tracking-[0.14em] uppercase";

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (email) sendEmail(e.currentTarget);
        else sendWhatsapp(e.currentTarget);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={label}>{dict.quoteForm.name}</label>
          <input id="q-name" name="name" className="input" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="q-company" className={label}>{dict.quoteForm.company}</label>
          <input id="q-company" name="company" className="input" autoComplete="organization" />
        </div>
      </div>

      <div>
        <label htmlFor="q-reply" className={label}>{dict.quoteForm.emailOrPhone}</label>
        <input id="q-reply" name="reply" className="input" autoComplete="email" required />
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
        <div>
          <label htmlFor="q-product" className={label}>{dict.quoteForm.disc}</label>
          <select id="q-product" name="product" className="input cursor-pointer" value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">{dict.quoteForm.notSure}</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.code} — {productName(p, locale)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-qty" className={label}>{dict.quoteForm.quantity}</label>
          <input id="q-qty" name="qty" className="input" inputMode="numeric" placeholder={dict.quoteForm.quantityPlaceholder} />
        </div>
      </div>

      <div>
        <label htmlFor="q-message" className={label}>{dict.quoteForm.message}</label>
        <textarea
          id="q-message"
          name="message"
          rows={5}
          className="input h-auto py-3"
          placeholder={dict.quoteForm.messagePlaceholder}
        />
      </div>

      {error && <p role="alert" className="text-spark text-sm">{error}</p>}

      {configured ? (
        <div className="flex flex-wrap gap-3">
          {email && (
            <button type="submit" className="btn btn-spark">{dict.quoteForm.sendEmail}</button>
          )}
          {canWhatsapp && (
            <button
              type={email ? "button" : "submit"}
              className={`btn ${email ? "btn-ghost" : "btn-spark"}`}
              onClick={email ? (e) => sendWhatsapp(e.currentTarget.form!) : undefined}
            >
              {dict.quoteForm.sendWhatsapp}
            </button>
          )}
        </div>
      ) : (
        <p className="border-spark/40 bg-spark/10 text-bone/90 border p-4 text-sm">
          {dict.quoteForm.notConnected} <code className="text-spark">lib/site.ts</code> {dict.quoteForm.notConnectedSuffix}
        </p>
      )}
    </form>
  );
}
