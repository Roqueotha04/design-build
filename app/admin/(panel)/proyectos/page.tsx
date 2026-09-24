"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { projectTypes, type Project } from "@/lib/content/seed";

export default function AdminProjectsPage() {
  const { content, addProject, updateProject, removeProject } = useSiteContent();
  const [editing, setEditing] = useState<string | null>(null);

  function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const category = String(data.get("category") ?? projectTypes[0].es);
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!name || !slug) return;
    addProject({
      slug,
      name: { es: name, en: name },
      category: { es: category, en: category },
      image: "/hero.webp",
      gallery: ["/hero.webp"],
      context: { es: "Proyecto cargado desde el panel.", en: "Project added from the panel." },
      approach: { es: "El detalle se completa con el equipo.", en: "Detail is completed with the team." },
      solution: { es: "Pendiente de ficha.", en: "Sheet pending." },
      facts: [{ label: { es: "Tipo", en: "Type" }, value: { es: category, en: category } }],
      result: { es: "En actualización.", en: "Being updated." },
    });
    event.currentTarget.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Obra</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Proyectos</h1>
      </header>
      <ul className="flex flex-col gap-4">
        {content.projects.map((project) => (
          <li key={project.slug} className="grid gap-4 border border-foreground/10 bg-white p-4 md:grid-cols-[140px_1fr]">
            <Image src={project.image} alt="" width={280} height={200} className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-heading text-lg font-semibold">{project.name.es}</p>
                <p className="text-sm text-secondary">{project.category.es}</p>
              </div>
              <label className="flex w-fit flex-col gap-1 text-[11px] uppercase tracking-[0.14em] text-secondary">
                Imagen
                <input type="file" accept="image/*" className="text-xs normal-case tracking-normal" />
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setEditing(editing === project.slug ? null : project.slug)} className="bg-foreground px-3 py-2 text-xs tracking-[0.12em] text-background uppercase">
                  Modificar
                </button>
                <button type="button" onClick={() => removeProject(project.slug)} className="px-3 py-2 text-xs tracking-[0.12em] uppercase underline underline-offset-4">
                  Eliminar
                </button>
              </div>
              {editing === project.slug ? (
                <EditProject
                  project={project}
                  onSave={(next) => {
                    updateProject(project.slug, next);
                    setEditing(null);
                  }}
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={onCreate} className="grid gap-4 border border-foreground/10 bg-white p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Nombre
          <input name="name" required className="border-b border-foreground/20 py-2 text-sm outline-none" />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Categoría
          <select name="category" className="border-b border-foreground/20 py-2 text-sm outline-none">
            {projectTypes.map((type) => (
              <option key={type.es}>{type.es}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="bg-foreground px-4 py-3 text-xs tracking-[0.14em] text-background uppercase">
          Cargar
        </button>
      </form>
    </div>
  );
}

function EditProject({ project, onSave }: { project: Project; onSave: (project: Project) => void }) {
  const [name, setName] = useState(project.name.es);
  const [category, setCategory] = useState(project.category.es);
  const [context, setContext] = useState(project.context.es);

  return (
    <form
      className="grid gap-3 border-t border-foreground/10 pt-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({
          ...project,
          name: { es: name, en: name },
          category: { es: category, en: category },
          context: { es: context, en: context },
        });
      }}
    >
      <input value={name} onChange={(event) => setName(event.target.value)} className="border-b border-foreground/20 py-2 text-sm outline-none" />
      <select value={category} onChange={(event) => setCategory(event.target.value)} className="border-b border-foreground/20 py-2 text-sm outline-none">
        {projectTypes.map((type) => (
          <option key={type.es}>{type.es}</option>
        ))}
      </select>
      <textarea value={context} onChange={(event) => setContext(event.target.value)} rows={3} className="border border-foreground/15 p-2 text-sm outline-none" />
      <button type="submit" className="w-fit bg-foreground px-3 py-2 text-xs tracking-[0.12em] text-background uppercase">
        Guardar
      </button>
    </form>
  );
}
