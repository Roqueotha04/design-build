"use client";

import Image from "next/image";
import Link from "next/link";
import { CropFrame, RuleTitle } from "@/components/brand/Editorial";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { useLanguage } from "@/hooks/useLanguage";

const principles = [
  {
    es: "Escucha",
    en: "Listening",
    body: {
      es: "El primer trabajo es entender el encargo, no acelerar un plano.",
      en: "The first job is to understand the brief, not to rush a drawing.",
    },
  },
  {
    es: "Cocreación",
    en: "Co-creation",
    body: {
      es: "Cliente, diseño y obra revisan las mismas decisiones.",
      en: "Client, design, and construction review the same decisions.",
    },
  },
  {
    es: "Sostenibilidad",
    en: "Stewardship",
    body: {
      es: "Material, clima y mantenimiento entran en el proyecto desde el inicio.",
      en: "Material, climate, and maintenance enter the project from the start.",
    },
  },
  {
    es: "Accesibilidad",
    en: "Access",
    body: {
      es: "El espacio tiene que poder usarse, no solo fotografiarse.",
      en: "The space has to be usable, not only photographable.",
    },
  },
];

export default function AboutPage() {
  const { locale } = useLanguage();

  return (
    <SiteFrame>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <RuleTitle
            eyebrow={locale === "es" ? "Estudio" : "Studio"}
            title={locale === "es" ? "Quiénes somos" : "About"}
            folio="01"
            serif={
              locale === "es"
                ? "Diseñamos y construimos. Las dos cosas, con el mismo equipo."
                : "We design and we build. Both, with the same team."
            }
          />
          <p className="max-w-md leading-relaxed text-secondary">
            {locale === "es"
              ? "Design & Build es un estudio de ingenieros y diseñadores. El proyecto no se entrega a un constructor ajeno: la obra se dirige desde la misma mesa donde se dibujó."
              : "Design & Build is a studio of engineers and designers. The project is not handed to an outside builder: the work is directed from the same table where it was drawn."}
          </p>
          <p className="max-w-md leading-relaxed text-secondary">
            {locale === "es"
              ? "Trabajamos encargos corporativos, comerciales y residenciales. El tamaño cambia. El método no: escuchar, proyectar y construir sin perder el hilo."
              : "We take on corporate, commercial, and residential work. The scale changes. The method does not: listen, design, and build without losing the thread."}
          </p>
        </div>
        <CropFrame className="mx-auto w-1/2 md:w-full">
          <Image
            src="/Quienes%20somos.webp"
            alt={locale === "es" ? "Equipo de Design & Build" : "Design & Build team"}
            width={1200}
            height={1400}
            className="img-shimmer aspect-[4/5] w-full object-cover"
          />
        </CropFrame>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-14 md:px-8 md:py-20">
          <h2 className="font-heading text-3xl font-semibold md:text-5xl">
            {locale === "es" ? "Cómo pensamos el encargo" : "How we read a brief"}
          </h2>
          <ol className="flex gap-4 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible">
            {principles.map((item, index) => (
              <li
                key={item.es}
                className={`w-[72vw] shrink-0 border border-foreground/10 bg-background p-6 md:w-[58%] ${
                  [
                    "md:mr-auto",
                    "md:ml-auto md:-mt-10 md:w-[48%]",
                    "md:ml-[12%] md:-mt-6 md:w-[54%]",
                    "md:ml-auto md:mr-[8%] md:-mt-16 md:w-[46%]",
                  ][index]
                }`}
              >
                <span className="mb-5 block h-2 w-2 rounded-full bg-celeste" />
                <p className="text-[11px] tracking-[0.18em] text-secondary">0{index + 1}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{item[locale]}</h3>
                <p className="mt-3 text-secondary">{item.body[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
          <CropFrame className="mx-auto w-[75vw] md:col-span-7 md:w-full">
            <Image
              src="/Imagen%20promocional.webp"
              alt={locale === "es" ? "Revisión de materiales en el estudio" : "Material review at the studio"}
              width={1400}
              height={900}
              className="img-shimmer aspect-[16/10] w-full object-cover"
            />
          </CropFrame>
          <CropFrame className="hidden md:col-span-5 md:mt-16 md:block md:w-full" shift>
            <Image
              src="/quienes%20somos%202.webp"
              alt={locale === "es" ? "Mesa de trabajo del estudio" : "Studio work table"}
              width={1000}
              height={1200}
              className="img-shimmer aspect-[4/5] w-full object-cover"
            />
          </CropFrame>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-14 md:px-8">
          <p className="max-w-lg font-serif text-2xl italic">
            {locale === "es"
              ? "Si hay un proyecto sobre la mesa, conversemos."
              : "If there is a project on the table, let’s talk."}
          </p>
          <Link href="/contacto" className="w-fit text-sm underline underline-offset-4">
            {locale === "es" ? "Contacto" : "Contact"}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
