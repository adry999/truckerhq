export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="flex flex-col border-t-2 border-asphalt">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border">
          <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
            {f.q}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
