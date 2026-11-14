import type { ReactNode } from "react";
import { cx } from "./cx";

/** Stacks its buttons full-width on phones and lines them up at natural width from `sm`. */
export function ButtonRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("flex flex-col gap-3 *:w-full sm:flex-row sm:flex-wrap sm:items-center sm:*:w-auto", className)}>
      {children}
    </div>
  );
}
