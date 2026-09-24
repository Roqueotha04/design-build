"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const links = [
  { href: "/", es: "Inicio", en: "Home" },
  { href: "/proyectos", es: "Proyectos", en: "Projects" },
  { href: "/quienes-somos", es: "Quiénes somos", en: "About" },
  { href: "/contacto", es: "Contacto", en: "Contact" },
];

export function SiteFrame({
  children,
  overlay = false,
}: {
  children: React.ReactNode;
  overlay?: boolean;
}) {
  const { locale, toggleLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const label = locale === "es" ? "es" : "en";
  const clear = overlay && !open && !scrolled;

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 ${
          clear
            ? "border-b border-white/15 bg-transparent text-white"
            : "border-b border-foreground/10 bg-background/95 text-foreground backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo.webp"
              alt="Design & Build"
              width={48}
              height={48}
              className={`h-10 w-10 object-contain ${clear ? "invert" : ""}`}
            />
            <span className="font-heading text-sm font-semibold tracking-tight">Design & Build</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${clear ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
              >
                {item[label]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              className={`text-[11px] uppercase tracking-[0.18em] ${clear ? "text-white/70" : "text-secondary"}`}
              aria-label={locale === "es" ? "Cambiar idioma" : "Switch language"}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <Link
              href="/contacto"
              className={`hidden px-4 py-2 text-xs font-medium tracking-wide uppercase md:inline-flex ${clear ? "bg-white text-foreground" : "bg-foreground text-background"}`}
            >
              {locale === "es" ? "Hablemos" : "Let’s talk"}
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={`h-px w-5 ${clear ? "bg-white" : "bg-foreground"}`} />
              <span className={`h-px w-5 ${clear ? "bg-white" : "bg-foreground"}`} />
            </button>
          </div>
        </div>

        {open ? (
          <nav className="flex flex-col gap-5 border-t border-foreground/10 px-5 py-6 md:hidden">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-heading text-2xl font-semibold"
              >
                {item[label]}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit bg-foreground px-4 py-2 text-xs font-medium tracking-wide text-background uppercase"
            >
              {locale === "es" ? "Hablemos de tu proyecto" : "Let’s talk about your project"}
            </Link>
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  const { locale } = useLanguage();
  const label = locale === "es" ? "es" : "en";

  return (
    <footer className="border-t border-foreground/10 bg-foreground text-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-16">
        <div className="flex flex-col gap-4">
          <Image
            src="/logo dark.webp"
            alt="Design & Build"
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
          <p className="max-w-xs text-sm text-background/70">
            {locale === "es"
              ? "Diseño y construcción en un mismo estudio."
              : "Design and construction in one studio."}
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] uppercase tracking-[0.18em] text-background/50">
            {locale === "es" ? "Mapa" : "Map"}
          </span>
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit text-background/80 hover:text-background">
              {item[label]}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-background/50">Estudio Ve</span>
          <a
            href="https://www.estudiove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-base font-semibold"
          >
            Estudio Ve
          </a>
          <p className="text-sm text-background/60">
            {locale === "es" ? "Agencia de desarrollo de software" : "Software development studio"}
          </p>
          <a href="https://www.estudiove.com" className="w-fit text-sm text-celeste">
            www.estudiove.com
          </a>
        </div>
      </div>
      <div className="border-t border-background/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-4 text-xs text-background/50 md:px-8">
          © {new Date().getFullYear()} Design & Build
        </p>
      </div>
    </footer>
  );
}
