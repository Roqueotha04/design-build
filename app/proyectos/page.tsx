"use client";

import Image from "next/image";
import Link from "next/link";
import { CropFrame } from "@/components/brand/Editorial";
import { ServiceBoard } from "@/components/brand/ServiceBoard";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function ProjectsPage() {
  const { locale, t } = useLanguage();
  const { content } = useSiteContent();

  return (
    <SiteFrame>
      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <ServiceBoard services={content.services} />
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-14 md:gap-20 md:px-8 md:py-20">
          <h2 className="font-heading text-3xl font-semibold md:text-5xl">
            {locale === "es" ? "Proyectos" : "Projects"}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 md:flex-col md:gap-20 md:overflow-visible">
          {content.projects.map((project, index) => (
            <article
              key={project.slug}
              className="w-[50vw] shrink-0 md:grid md:w-auto md:grid-cols-2 md:items-center md:gap-8"
            >
              <Link
                href={`/proyectos/${project.slug}`}
                className={index % 2 === 1 ? "md:order-2 md:mt-10" : ""}
              >
                <CropFrame>
                  <Image
                    src={project.image}
                    alt={t(project.name)}
                    width={1400}
                    height={1000}
                    className="img-shimmer aspect-[4/3] w-full object-cover"
                  />
                </CropFrame>
              </Link>
              <div className={`mt-6 flex flex-col gap-3 ${index % 2 === 1 ? "md:pr-8" : "md:pl-8"}`}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">{t(project.category)}</p>
                <h2 className="font-heading text-3xl font-semibold md:text-4xl">{t(project.name)}</h2>
                <p className="text-secondary">{t(project.context)}</p>
                <Link href={`/proyectos/${project.slug}`} className="mt-2 w-fit text-sm underline underline-offset-4">
                  {locale === "es" ? "Ver el proyecto" : "View project"}
                </Link>
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
