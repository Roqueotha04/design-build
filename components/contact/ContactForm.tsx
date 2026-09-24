"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectTypes } from "@/lib/content/seed";

const inputClass =
  "w-full border-b border-foreground/20 bg-transparent py-2 text-sm outline-none focus:border-celeste md:py-3";

export function ContactForm() {
  const { locale, t } = useLanguage();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col justify-center gap-4 border border-foreground/10 p-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-celeste">
          {locale === "es" ? "Mensaje recibido" : "Message received"}
        </p>
        <h2 className="font-heading text-3xl font-semibold">
          {locale === "es" ? "Gracias. El estudio ya tiene tu nota." : "Thank you. The studio has your note."}
        </h2>
        <p className="text-secondary">
          {locale === "es" ? "Te escribimos a la dirección que dejaste." : "We will write to the address you left."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2 md:gap-4">
      <Field label={locale === "es" ? "Nombre y apellido" : "Full name"} name="nombre" className="md:col-span-2" />
      <Field label={locale === "es" ? "Correo" : "Email"} name="correo" type="email" />
      <Field label={locale === "es" ? "Teléfono" : "Phone"} name="telefono" />
      <Field label={locale === "es" ? "Empresa" : "Company"} name="empresa" />
      <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
        {locale === "es" ? "Tipo de proyecto" : "Project type"}
        <select name="tipo" required className={inputClass}>
          {projectTypes.map((type) => (
            <option key={type.es} value={type.es}>
              {t(type)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary md:col-span-2">
        {locale === "es" ? "Mensaje" : "Message"}
        <textarea name="mensaje" required rows={3} className={inputClass} />
      </label>
      <button
        type="submit"
        className="mt-1 w-fit bg-foreground px-4 py-2 text-xs font-medium tracking-[0.16em] text-background uppercase md:col-span-2 md:px-5 md:py-3"
      >
        {locale === "es" ? "Enviar" : "Send"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary ${className}`}>
      {label}
      <input name={name} type={type} required className={inputClass} />
    </label>
  );
}
