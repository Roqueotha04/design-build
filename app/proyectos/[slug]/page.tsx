"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CropFrame, Folio } from "@/components/brand/Editorial";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();
  const { content } = useSiteContent();
  const project = content.projects.find((item) => item.slug === params.slug);

  if (!project) {
    return (
      <SiteFrame>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-20 md:px-8">
          <p className="font-heading text-3xl font-semibold">
            {locale === "es" ? "Este proyecto no está publicado." : "This project is not published."}
          </p>
          <Link href="/proyectos" className="w-fit text-sm underline underline-offset-4">
            {locale === "es" ? "Volver a servicios" : "Back to services"}
          </Link>
        </div>
      </SiteFrame>
    );
  }

  const blocks = [
    { es: "Contexto", en: "Context", text: project.context },
    { es: "Enfoque", en: "Approach", text: project.approach },
    { es: "Solución", en: "Solution", text: project.solution },
    { es: "Resultado", en: "Result", text: project.result },
  ];

  return (
    <SiteFrame>
      <article className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 md:px-8 md:py-16">
        <Link href="/proyectos" className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          {locale === "es" ? "← Proyectos" : "← Projects"}
        </Link>
        <div className="flex flex-col gap-4">
          <Folio index="01" label={t(project.category)} />
          <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-6xl">{t(project.name)}</h1>
        </div>
        <CropFrame>
          <Image
            src={project.image}
            alt={t(project.name)}
            width={1600}
            height={1100}
            priority
            className="img-shimmer aspect-[16/10] w-full object-cover"
          />
        </CropFrame>
        <dl className="grid gap-4 border-y border-foreground/10 py-6 sm:grid-cols-2">
          {project.facts.map((fact) => (
            <div key={t(fact.label)}>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-secondary">{t(fact.label)}</dt>
              <dd className="mt-1 font-heading text-lg">{t(fact.value)}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-8 md:grid-cols-2">
          {blocks.map((block) => (
            <section key={block.es} className="border-t border-foreground/10 pt-4">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-celeste">{block[locale]}</h2>
              <p className="mt-3 text-base leading-relaxed">{t(block.text)}</p>
            </section>
          ))}
        </div>
        {project.gallery.length > 1 ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {project.gallery.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={800}
                height={600}
                className="img-shimmer aspect-[4/3] w-[70vw] shrink-0 object-cover md:w-80"
              />
            ))}
          </div>
        ) : null}
        <Link
          href="/contacto"
          className="inline-flex w-fit bg-foreground px-5 py-3 text-xs font-medium tracking-[0.16em] text-background uppercase"
        >
          {locale === "es" ? "Hablemos de tu proyecto" : "Let’s talk about your project"}
        </Link>
      </article>
    </SiteFrame>
  );
}
