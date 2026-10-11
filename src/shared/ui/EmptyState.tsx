import type { ReactNode } from "react";
import { cx } from "./cx";

export function EmptyState({ bordered = true, children }: { bordered?: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "p-10 text-center text-base text-ink-2",
        bordered && "rounded-lg border border-border bg-white",
      )}
    >
      {children}
    </div>
  );
}
