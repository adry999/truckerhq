import type { ChecklistItem } from "@/features/compliance/data/new-mc-checklist";

export function NewMcCardGrid({ items, dotClassName }: { items: ChecklistItem[]; dotClassName: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
          <div className="flex items-center gap-2.5">
            <span className={`h-3 w-3 shrink-0 rounded-sm ${dotClassName}`} />
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              {i.title}
            </span>
          </div>
          <div className="text-[15px] leading-relaxed text-[#4B5058]">{i.description}</div>
        </div>
      ))}
    </div>
  );
}
