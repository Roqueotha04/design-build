"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Service } from "@/lib/content/seed";

export function ServiceBoard({
  services,
  mobile = "scroll",
}: {
  services: Service[];
  mobile?: "cycle" | "scroll";
}) {
  const { locale, t } = useLanguage();

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">
          {locale === "es" ? "Servicios" : "Services"}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold md:text-5xl">
          {locale === "es" ? "El encargo se resuelve completo." : "The commission stays whole."}
        </h2>
        <p className="mt-3 font-serif text-xl italic text-foreground/80">
          {locale === "es" ? "No se parte en proveedores." : "It is not split across vendors."}
        </p>
      </div>
      {mobile === "cycle" ? <ServiceCycle services={services} /> : null}
      <div className={`relative ${mobile === "cycle" ? "hidden md:block" : ""}`}>
        <div className="absolute top-8 right-0 left-0 hidden h-px bg-foreground/15 md:block" />
        <ol className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {services.map((service, index) => (
            <li
              key={service.id}
              className={`w-[70vw] shrink-0 border border-foreground/10 bg-background p-5 md:w-auto ${
                index % 2 === 1 ? "md:mt-14" : "md:mt-0"
              }`}
            >
              <ServiceCard service={service} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ServiceCycle({ services }: { services: Service[] }) {
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(0);
  const total = services.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [total, round]);

  function go(next: number) {
    setIndex((next + total) % total);
    setRound((current) => current + 1);
  }

  const service = services[index];
  if (!service) return null;

  return (
    <div className="md:hidden">
      <div className="flex items-stretch gap-3">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => go(index - 1)}
          className="w-9 shrink-0 border border-foreground/15 text-lg"
        >
          ←
        </button>
        <article key={`${service.id}-${round}`} className="service-in min-w-0 flex-1 border border-foreground/10 bg-background p-5">
          <ServiceCard service={service} index={index} />
          <div className="mt-5 h-px bg-foreground/15">
            <div key={`${index}-${round}`} className="h-px bg-celeste" style={{ animation: "service-time 3s linear" }} />
          </div>
        </article>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => go(index + 1)}
          className="w-9 shrink-0 border border-foreground/15 text-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useLanguage();
  return (
    <>
      <span className="mb-6 block h-2 w-2 rounded-full bg-celeste" />
      <p className="text-[11px] tracking-[0.18em] text-secondary">0{index + 1}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold">{t(service.name)}</h3>
      <p className="mt-3 text-sm leading-relaxed text-secondary">{t(service.description)}</p>
    </>
  );
}
