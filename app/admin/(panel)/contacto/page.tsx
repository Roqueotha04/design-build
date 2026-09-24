"use client";

import { FormEvent, useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { ContactInfo } from "@/lib/content/seed";

export default function AdminContactPage() {
  const { content, updateContact } = useSiteContent();
  const [draft, setDraft] = useState<ContactInfo>(content.contact);
  const [saved, setSaved] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateContact(draft);
    setSaved(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Estudio</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Contacto</h1>
      </header>
      <form onSubmit={onSubmit} className="grid max-w-lg gap-4 border border-foreground/10 bg-white p-5">
        <Field label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
        <Field label="Teléfono" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
        <Field
          label="Dirección"
          value={draft.address.es}
          onChange={(value) => setDraft({ ...draft, address: { es: value, en: value } })}
        />
        <Field
          label="Horario"
          value={draft.hours.es}
          onChange={(value) => setDraft({ ...draft, hours: { es: value, en: value } })}
        />
        <button type="submit" className="w-fit bg-foreground px-4 py-3 text-xs tracking-[0.14em] text-background uppercase">
          Guardar
        </button>
        {saved ? <p className="text-sm text-secondary">Datos actualizados.</p> : null}
      </form>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="border-b border-foreground/20 py-2 text-sm outline-none" />
    </label>
  );
}
