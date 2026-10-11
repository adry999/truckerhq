import type { ComponentProps } from "react";
import { cx } from "./cx";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cx("rounded-lg border-[1.5px] border-border bg-white", className)} />;
}
