"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: data.get("user"),
        password: data.get("password"),
      }),
    });
    setPending(false);
    if (!response.ok) {
      setError(true);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-full items-center justify-center px-5 py-16">
      <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Design & Build</p>
        <h1 className="font-heading text-3xl font-semibold">Ingreso</h1>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Usuario
          <input name="user" required autoComplete="username" className="border-b border-foreground/20 py-3 text-sm outline-none" />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-secondary">
          Contraseña
          <input name="password" type="password" required autoComplete="current-password" className="border-b border-foreground/20 py-3 text-sm outline-none" />
        </label>
        {error ? <p className="text-sm">No coincide. Revisa usuario y contraseña.</p> : null}
        <button type="submit" disabled={pending} className="w-fit bg-foreground px-5 py-3 text-xs tracking-[0.16em] text-background uppercase">
          Entrar
        </button>
      </form>
    </main>
  );
}
