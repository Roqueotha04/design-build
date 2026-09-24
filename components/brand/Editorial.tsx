import type { ReactNode } from "react";

export function Folio({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-secondary">
      <span className="h-px w-8 bg-foreground/30" />
      <span>{index}</span>
      <span className="text-celeste">·</span>
      <span>{label}</span>
    </div>
  );
}

export function RuleTitle({
  eyebrow,
  title,
  folio,
  serif,
}: {
  eyebrow: string;
  title: string;
  folio?: string;
  serif?: string;
}) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">{eyebrow}</p>
        {folio ? (
          <p className="hidden text-[11px] uppercase tracking-[0.22em] text-secondary sm:block">
            {folio}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
        <span className="mb-1 hidden h-2 w-2 shrink-0 rounded-full bg-celeste md:block" />
        <span className="mb-2 hidden h-px flex-1 bg-foreground/20 md:block" />
      </div>
      {serif ? (
        <p className="max-w-xl font-serif text-xl italic text-foreground/80 md:text-2xl">{serif}</p>
      ) : null}
    </header>
  );
}

export function CropFrame({
  children,
  className = "",
  shift = false,
}: {
  children: ReactNode;
  className?: string;
  shift?: boolean;
}) {
  return (
    <div className={`relative ${shift ? "md:mt-10 md:ml-[8%]" : ""} ${className}`}>
      <span className="pointer-events-none absolute -top-2 -left-2 h-4 w-4 border-t border-l border-foreground" />
      <span className="pointer-events-none absolute -top-2 -right-2 h-4 w-4 border-t border-r border-foreground" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-foreground" />
      <span className="pointer-events-none absolute -right-2 -bottom-2 h-4 w-4 border-r border-b border-foreground" />
      {children}
    </div>
  );
}
