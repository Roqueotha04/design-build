"use client";

import { useParams } from "next/navigation";
import { Bars, MetricStat, Panel } from "@/components/admin/MetricWidgets";

const views: Record<
  string,
  { title: string; stats: { label: string; value: string; note: string }[]; bars: number[]; rows: [string, string, string][] }
> = {
  analytics: {
    title: "Google Analytics 4",
    stats: [
      { label: "Usuarios", value: "8.240", note: "30 días" },
      { label: "Sesiones", value: "11.060", note: "1,3 por usuario" },
      { label: "Tiempo medio", value: "1:42", note: "En el sitio" },
    ],
    bars: [40, 52, 48, 61, 70, 66, 80, 74, 90, 86, 96, 110],
    rows: [
      ["/", "4.820", "38%"],
      ["/proyectos", "2.140", "17%"],
      ["/contacto", "980", "8%"],
    ],
  },
  "tag-manager": {
    title: "Google Tag Manager",
    stats: [
      { label: "Contenedor", value: "GTM-DBLD01", note: "Publicado" },
      { label: "Etiquetas", value: "6", note: "Activas" },
      { label: "Última versión", value: "14", note: "Hace 3 días" },
    ],
    bars: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6],
    rows: [
      ["GA4 Config", "Activa", "Todas las páginas"],
      ["HubSpot", "Activa", "Formulario"],
      ["Meta Pixel", "Activa", "Todas las páginas"],
      ["LinkedIn Insight", "Activa", "Todas las páginas"],
    ],
  },
  "search-console": {
    title: "Search Console",
    stats: [
      { label: "Clics", value: "96", note: "28 días" },
      { label: "Impresiones", value: "1.860", note: "Dominio verificado" },
      { label: "Posición media", value: "14,2", note: "Consultas de marca" },
    ],
    bars: [12, 18, 15, 22, 28, 24, 30, 36, 33, 40, 38, 44],
    rows: [
      ["design and build", "42", "6,1"],
      ["construcción corporativa", "18", "11,4"],
      ["diseño de oficinas", "11", "16,8"],
    ],
  },
  hubspot: {
    title: "HubSpot",
    stats: [
      { label: "Contactos", value: "34", note: "Este mes" },
      { label: "Formularios", value: "28", note: "Enviados" },
      { label: "En seguimiento", value: "9", note: "Pipeline" },
    ],
    bars: [1, 2, 1, 3, 4, 2, 5, 3, 4, 6, 4, 5],
    rows: [
      ["Corporativo / Workplace", "12", "Abiertos"],
      ["Residencia premium", "8", "Abiertos"],
      ["Comercial / Retail", "5", "En curso"],
    ],
  },
  meta: {
    title: "Meta Pixel",
    stats: [
      { label: "Eventos", value: "2.140", note: "PageView" },
      { label: "Contacto", value: "28", note: "Lead" },
      { label: "Cobertura", value: "18.400", note: "Cuenta lista" },
    ],
    bars: [80, 90, 70, 110, 120, 100, 140, 130, 150, 160, 148, 170],
    rows: [
      ["PageView", "2.140", "Activo"],
      ["Lead", "28", "Activo"],
      ["ViewContent", "640", "Activo"],
    ],
  },
  linkedin: {
    title: "LinkedIn Insight",
    stats: [
      { label: "Clics", value: "860", note: "Insight Tag" },
      { label: "Empresas", value: "46", note: "Cuentas que visitaron" },
      { label: "Conversiones", value: "7", note: "Formulario" },
    ],
    bars: [20, 24, 18, 30, 28, 36, 40, 38, 44, 42, 50, 48],
    rows: [
      ["Visita al sitio", "860", "Activo"],
      ["Envío de formulario", "7", "Activo"],
      ["Página de proyectos", "210", "Activo"],
    ],
  },
};

export default function MeasurementToolPage() {
  const params = useParams<{ tool: string }>();
  const view = views[params.tool];

  if (!view) {
    return <p className="font-heading text-2xl">Esta cuenta no está en el panel.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-celeste">Vinculado</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">{view.title}</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {view.stats.map((stat) => (
          <MetricStat key={stat.label} {...stat} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Últimas semanas">
          <Bars values={view.bars} />
        </Panel>
        <Panel title="Detalle">
          <table className="w-full text-left text-sm">
            <tbody>
              {view.rows.map((row) => (
                <tr key={row[0]} className="border-b border-foreground/10 last:border-0">
                  <td className="py-2 pr-3">{row[0]}</td>
                  <td className="py-2 pr-3 text-secondary">{row[1]}</td>
                  <td className="py-2 text-secondary">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
