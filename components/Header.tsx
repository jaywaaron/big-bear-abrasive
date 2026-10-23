"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { dict } = useLocale();

  const NAV = [
    { href: "/", label: dict.nav.home },
    { href: "/products", label: dict.nav.products },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-seam bg-coal/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-bb flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="BigBear Abrasive — home" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-white.png"
            alt="BigBear Resin Bonded Abrasive"
            width={1463}
            height={534}
            preload
            className="h-11 w-auto sm:h-13"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = item.href === "/products" ? pathname.startsWith("/products") : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display text-[15px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                  active ? "text-spark" : "text-bone/80 hover:text-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-spark h-10 px-5 text-sm">
            {dict.nav.getQuote}
          </Link>
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          className="text-bone -mr-2 flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-seam bg-coal fixed inset-x-0 top-18 bottom-0 border-t md:hidden">
          <div className="container-bb flex flex-col py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-seam font-display border-b py-4 text-2xl font-semibold tracking-wider uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-spark mt-8">
              Get a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
