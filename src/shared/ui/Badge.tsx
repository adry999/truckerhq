import type { ReactNode } from "react";
import { cx } from "./cx";

const VARIANTS = {
  green: "bg-green-tint text-green",
  outline: "border-[1.5px] border-border bg-white text-ink-2",
  amber: "bg-amber-tint text-asphalt",
} as const;

export function Badge({
  variant = "green",
  className,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em]",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
