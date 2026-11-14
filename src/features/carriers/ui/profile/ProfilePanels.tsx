import { cx } from "@/shared/ui/cx";
import type { ProfilePanel } from "@/features/carriers/model/profile";

// Two panels per row wherever the main column is wide enough; one per row at
// `md`, where the sidebar takes a third of the width.
const TWO_UP = "sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2";
const FULL_ROW = "sm:col-span-2 md:col-span-1 lg:col-span-2";

export function ProfilePanels({ panels }: { panels: ProfilePanel[] }) {
  const oddCount = panels.length % 2 === 1;

  return (
    <div className={cx("grid gap-5", TWO_UP)}>
      {panels.map((p, i) => {
        // A leftover panel takes the whole row and lays its facts out two-up.
        const fullRow = oddCount && i === panels.length - 1;
        return (
          <div
            key={p.t}
            className={cx("overflow-hidden rounded-lg border border-border bg-white", fullRow && FULL_ROW)}
          >
            <div className="px-5 py-4 font-display text-xl font-extrabold uppercase">{p.t}</div>
            <div className={cx("grid gap-x-10 border-t border-divider px-5", fullRow && TWO_UP)}>
              {p.rows.map(([k, v, color]) => (
                <div
                  key={k}
                  className="-mt-px flex items-center justify-between gap-3 border-t border-divider py-3.5 text-[15px] tabular-nums"
                >
                  <span className="shrink-0 whitespace-nowrap text-ink-2">{k}</span>
                  <span className="text-right font-semibold" style={color ? { color } : undefined}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
