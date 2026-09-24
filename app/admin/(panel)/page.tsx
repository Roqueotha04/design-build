"use client";

import Link from "next/link";
import { MetricStat } from "@/components/admin/MetricWidgets";
import { useSiteContent } from "@/hooks/useSiteContent";

const tools = [
  { href: "/admin/medicion/analytics", name: "Google Analytics 4", status: "Vinculado", figure: "12.480 visitas" },
  { href: "/admin/medicion/tag-manager", name: "Tag Manager", status: "Contenedor activo", figure: "GTM-DBLD01" },
  { href: "/admin/medicion/search-console", name: "Search Console", status: "Dominio verificado", figure: "186 impresiones" },
  { href: "/admin/medicion/hubspot", name: "HubSpot", status: "Formularios conectados", figure: "34 contactos" },
  { href: "/admin/medicion/meta", name: "Meta Pixel", status: "Instalado", figure: "2.140 eventos" },
  { href: "/admin/medicion/linkedin", name: "LinkedIn Insight", status: "Asociado", figure: "860 clics" },
];

export default function AdminDashboard() {
  const { content } = useSiteContent();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Hoy</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Dashboard</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricStat label="Visitas, 30 días" value="12.480" note="Analytics" />
        <MetricStat label="Contactos nuevos" value="34" note="HubSpot" />
        <MetricStat label="Proyectos publicados" value={String(content.projects.length)} note="Sitio" />
        <MetricStat label="Clics de búsqueda" value="96" note="Search Console" />
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="flex items-start justify-between gap-4 border border-foreground/10 bg-white p-5">
              <div>
                <p className="font-heading font-semibold">{tool.name}</p>
                <p className="mt-1 text-sm text-celeste">{tool.status}</p>
              </div>
              <p className="text-sm text-secondary">{tool.figure}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
