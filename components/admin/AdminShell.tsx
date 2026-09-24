"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/proyectos", label: "Proyectos" },
  { href: "/admin/servicios", label: "Servicios" },
  { href: "/admin/contacto", label: "Contacto" },
];

const measures = [
  { href: "/admin/medicion/analytics", label: "Analytics" },
  { href: "/admin/medicion/tag-manager", label: "Tag Manager" },
  { href: "/admin/medicion/search-console", label: "Search Console" },
  { href: "/admin/medicion/hubspot", label: "HubSpot" },
  { href: "/admin/medicion/meta", label: "Meta" },
  { href: "/admin/medicion/linkedin", label: "LinkedIn" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function active(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="min-h-svh bg-[#f6f6f6] md:grid md:grid-cols-[240px_1fr]">
      <button
        type="button"
        className="fixed top-4 left-4 z-50 bg-foreground px-3 py-2 text-xs tracking-[0.14em] text-background uppercase md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        Menú
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-foreground text-background transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-5 py-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">Design & Build</p>
          <p className="mt-1 font-heading text-lg font-semibold">Panel</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 ${active(item.href) ? "bg-white text-foreground" : "text-white/75 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
          <p className="mt-6 px-3 text-[11px] uppercase tracking-[0.18em] text-celeste">Medición</p>
          {measures.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 ${active(item.href) ? "bg-white text-foreground" : "text-white/75 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={logout} className="border-t border-white/10 px-5 py-4 text-left text-sm text-white/70">
          Cerrar sesión
        </button>
      </aside>
      <div className="min-w-0 px-5 py-16 md:px-8 md:py-8">
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={logout}
            className="border border-foreground px-4 py-2 text-xs tracking-[0.14em] uppercase"
          >
            Cerrar sesión
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
