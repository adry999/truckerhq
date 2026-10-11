import type { ReactNode } from "react";
import { cx } from "./cx";

export function Section({
  as: Tag = "section",
  className,
  children,
}: {
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cx(
        "mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cx("font-display text-4xl font-extrabold md:text-5xl", className)}>
      {children}
    </Tag>
  );
}
