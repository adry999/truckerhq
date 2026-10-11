import type { ProfilePanel } from "@/features/carriers/model/profile";

export function ProfilePanels({ panels }: { panels: ProfilePanel[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {panels.map((p) => (
        <div key={p.t} className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="border-b border-[#ECEDEA] px-5 py-4 font-display text-xl font-extrabold uppercase">
            {p.t}
          </div>
          {p.rows.map(([k, v, color], i) => (
            <div
              key={k}
              className={`flex items-center justify-between gap-3 px-5 py-3.5 text-[15px] tabular-nums ${i ? "border-t border-[#ECEDEA]" : ""}`}
            >
              <span className="text-[#4B5058]">{k}</span>
              <span className="text-right font-semibold" style={color ? { color } : undefined}>
                {v}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
