import type { ReactNode } from "react";

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="rounded-lg border border-amber bg-amber-tint px-4 py-3 text-sm text-ink-2"
    >
      {children}
    </div>
  );
}
