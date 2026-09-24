import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-start justify-center gap-4 px-6 py-24">
      <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">404</p>
      <h1 className="font-heading text-4xl font-semibold">Esta página no está.</h1>
      <Link href="/" className="text-sm underline underline-offset-4">
        Volver al inicio
      </Link>
    </div>
  );
}
