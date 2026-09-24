"use client";

import { FormEvent } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function AdminServicesPage() {
  const { content, addService, removeService } = useSiteContent();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const id = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");
    if (!name || !id) return;
    addService({
      id,
      name: { es: name, en: name },
      description: { es: description, en: description },
    });
    event.currentTarget.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Oficio</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Servicios</h1>
      </header>
      <ul className="divide-y divide-foreground/10 border border-foreground/10 bg-white">
        {content.services.map((service) => (
          <li key={service.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-heading font-semibold">{service.name.es}</p>
              <p className="text-sm text-secondary">{service.description.es}</p>
            </div>
            <button type="button" onClick={() => removeService(service.id)} className="text-sm underline underline-offset-4">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="grid max-w-lg gap-4 border border-foreground/10 bg-white p-5">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Nombre
          <input name="name" required className="border-b border-foreground/20 py-2 text-sm outline-none" />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Descripción
          <input name="description" required className="border-b border-foreground/20 py-2 text-sm outline-none" />
        </label>
        <button type="submit" className="w-fit bg-foreground px-4 py-3 text-xs tracking-[0.14em] text-background uppercase">
          Cargar
        </button>
      </form>
    </div>
  );
}
