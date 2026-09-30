import Link from "next/link";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="py-28 sm:py-36">
      <div className="container-bb text-center">
        <p className="eyebrow">{dict.notFound.eyebrow}</p>
        <h1 className="display mt-4 text-6xl sm:text-7xl">{dict.notFound.title}</h1>
        <p className="text-bone/75 mx-auto mt-5 max-w-md text-lg">{dict.notFound.body}</p>
        <div className="mt-9 flex justify-center gap-3">
          <Link href="/products" className="btn btn-spark">{dict.notFound.browseDiscs}</Link>
          <Link href="/" className="btn btn-ghost">{dict.notFound.home}</Link>
        </div>
      </div>
    </section>
  );
}
