"use client";

import Image from "next/image";
import Link from "next/link";
import { CropFrame, Folio } from "@/components/brand/Editorial";
import { ServiceBoard } from "@/components/brand/ServiceBoard";
import { ContactForm } from "@/components/contact/ContactForm";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const notes = [
  {
    image: "/color del año.png",
    kicker: { es: "Color", en: "Color" },
    title: { es: "Mocha Mousse, el color del año", en: "Mocha Mousse, color of the year" },
    body: {
      es: "Pantone eligió Mocha Mousse como color del año. En obra se lee como madera, cuero y tierra: un tono que calma un interior blanco sin pintarlo de tendencia. Lo usamos donde la mano toca —mueble, piso, marco— y dejamos el resto en luz.",
      en: "Pantone named Mocha Mousse color of the year. On site it reads as timber, leather, and earth: a tone that warms a white interior without turning it into a trend. We use it where the hand lands —furniture, floor, frame— and leave the rest in light.",
    },
  },
  {
    image: "/evento.png",
    kicker: { es: "FADA 2026", en: "FADA 2026" },
    title: { es: "La arquitectura también comunica", en: "Architecture speaks too" },
    body: {
      es: "Participamos en el panel “Señalética: ¿entendimiento o seguridad, razón o emoción?” en FADA 2026. La señalética no solo orienta: arma identidad, da confianza y cambia cómo se habita un lugar. En D&B el espacio tiene que contar a la organización desde el primer paso. Gracias a FADA y a Más Infinito por la mesa.",
      en: "We joined the panel “Signage: understanding or safety, reason or emotion?” at FADA 2026. Signage does more than point the way: it builds identity, trust, and the way a place is inhabited. At D&B a space should tell the organization from the first step. Thank you to FADA and Más Infinito for the table.",
    },
  },
];

export default function HomePage() {
  const { locale, t } = useLanguage();
  const { content } = useSiteContent();

  return (
    <SiteFrame overlay>
      <section className="relative -mt-16 flex min-h-svh items-center justify-center md:-mt-20">
        <Image
          src="/hero.webp"
          alt={locale === "es" ? "Obra de Design & Build" : "Design & Build project"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 px-6 py-28 text-center text-white">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">Design & Build</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-6xl">
            {locale === "es" ? "Diseño y obra, en el mismo estudio." : "Design and build, in one studio."}
          </h1>
          <p className="font-serif text-2xl italic text-white/85 md:text-3xl">
            {locale === "es" ? "Una firma. Un proceso." : "One firm. One process."}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-white/80">
            {locale === "es"
              ? "Proyectamos y construimos espacios corporativos, comerciales y residenciales. El dibujo no se separa de la obra."
              : "We design and build corporate, commercial, and residential spaces. The drawing stays with the construction."}
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-3 border border-white px-5 py-3 text-xs font-medium tracking-[0.16em] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-celeste" />
            {locale === "es" ? "Hablemos de tu proyecto" : "Let’s talk about your project"}
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <ServiceBoard services={content.services} mobile="cycle" />
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-celeste">
                {locale === "es" ? "Obra" : "Work"}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold md:text-5xl">
                {locale === "es" ? "Proyectos" : "Projects"}
              </h2>
            </div>
            <Link href="/proyectos" className="text-sm underline underline-offset-4">
              {locale === "es" ? "Ver la obra" : "See the work"}
            </Link>
          </div>
          <div className="relative">
            <div className="absolute top-6 right-0 left-0 hidden h-px bg-white/20 md:block" />
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:items-start md:gap-6 md:overflow-visible">
              {content.projects.slice(0, 3).map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/proyectos/${project.slug}`}
                  className={`w-[50vw] shrink-0 md:w-auto ${index === 1 ? "md:mt-16" : index === 2 ? "md:mt-7" : ""}`}
                >
                  <div className="relative">
                    <span className="pointer-events-none absolute -top-2 -left-2 h-4 w-4 border-t border-l border-white/80" />
                    <span className="pointer-events-none absolute -top-2 -right-2 h-4 w-4 border-t border-r border-white/80" />
                    <span className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-white/80" />
                    <span className="pointer-events-none absolute -right-2 -bottom-2 h-4 w-4 border-r border-b border-white/80" />
                    <Image
                      src={project.image}
                      alt={t(project.name)}
                      width={800}
                      height={1000}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-background/50">
                    {t(project.category)}
                  </p>
                  <p className="mt-1 font-heading text-xl font-semibold">{t(project.name)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="flex flex-col items-center gap-5 text-center md:px-6">
            <Folio index="04" label={locale === "es" ? "Estudio" : "Studio"} />
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
              {locale === "es" ? "Quiénes somos" : "About"}
            </h2>
            <p className="font-serif text-xl italic">
              {locale === "es"
                ? "Ingenieros y diseñadores en la misma mesa."
                : "Engineers and designers at the same table."}
            </p>
            <p className="max-w-md text-secondary">
              {locale === "es"
                ? "El proyecto no se entrega a un constructor ajeno. La obra se dirige desde la misma mesa donde se dibujó."
                : "The project is not handed to an outside builder. The work is directed from the same table where it was drawn."}
            </p>
            <Link href="/quienes-somos" className="text-sm underline underline-offset-4">
              {locale === "es" ? "Conocer el estudio" : "Meet the studio"}
            </Link>
          </div>
          <CropFrame className="mx-auto w-1/2 md:w-full">
            <Image
              src="/Quienes somos.webp"
              alt={locale === "es" ? "Equipo de Design & Build" : "Design & Build team"}
              width={1200}
              height={1400}
              className="img-shimmer aspect-[4/5] w-full object-cover"
            />
          </CropFrame>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <span className="absolute top-6 left-6 h-10 w-px bg-white/40 md:left-16" />
        <span className="absolute top-6 left-6 h-px w-16 bg-white/40 md:left-16 md:w-28" />
        <span className="absolute right-[14%] bottom-7 h-px w-24 bg-celeste md:w-40" />
        <Link
          href="#contacto"
          className="group relative flex min-h-36 items-center gap-4 px-8 py-12 transition-colors duration-300 hover:bg-white/5 md:min-h-44 md:gap-6 md:px-24"
        >
          <span className="font-heading text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:ml-[8%] md:text-6xl">
            {locale === "es" ? "Contáctanos" : "Contact us"}
          </span>
          <span className="mt-2 inline-flex items-center gap-3 md:mt-4">
            <span className="h-2 w-2 shrink-0 rounded-full bg-celeste" />
            <span className="block h-px w-10 bg-white transition-all duration-300 group-hover:w-16 group-hover:bg-celeste" />
            <span className="font-heading text-3xl leading-none transition-transform duration-300 group-hover:translate-x-2 md:text-5xl" aria-hidden>
              →
            </span>
          </span>
        </Link>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 md:px-8 md:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">
              {locale === "es" ? "Notas" : "Notes"}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-5xl">
              {locale === "es" ? "Desde el estudio" : "From the studio"}
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-12 md:overflow-visible">
            {notes.map((note, index) => (
              <article key={note.title.es} className={`w-[72vw] shrink-0 md:w-auto ${index === 1 ? "md:mt-16" : ""}`}>
                <CropFrame>
                  <Image
                    src={note.image}
                    alt={note.title[locale]}
                    width={1200}
                    height={800}
                    className="img-shimmer aspect-[4/3] w-full object-cover"
                  />
                </CropFrame>
                <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-celeste">{note.kicker[locale]}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{note.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{note.body[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-foreground/10">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-8 md:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">
              {locale === "es" ? "Contacto" : "Contact"}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-5xl">
              {locale === "es" ? "Hablemos de tu proyecto" : "Let’s talk about your project"}
            </h2>
            <p className="mt-4 max-w-sm text-secondary">
              {locale === "es"
                ? "Nombre, empresa y tipo de obra. Respondemos desde el estudio."
                : "Name, company, and type of work. We reply from the studio."}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteFrame>
  );
}
