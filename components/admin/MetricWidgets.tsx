export function MetricStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <article className="border border-foreground/10 bg-white p-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-secondary">{label}</p>
      <p className="mt-3 font-heading text-3xl font-semibold">{value}</p>
      {note ? <p className="mt-2 text-sm text-secondary">{note}</p> : null}
    </article>
  );
}

export function Bars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-28 items-end gap-1">
      {values.map((value, index) => (
        <span
          key={index}
          className="flex-1 bg-foreground"
          style={{ height: `${Math.max(8, (value / max) * 100)}%`, opacity: index === values.length - 1 ? 1 : 0.35 }}
        />
      ))}
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-foreground/10 bg-white">
      <header className="flex items-center justify-between border-b border-foreground/10 px-5 py-3">
        <h2 className="font-heading text-sm font-semibold">{title}</h2>
        <span className="h-1.5 w-1.5 rounded-full bg-celeste" />
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
