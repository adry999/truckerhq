"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buildFilterHref } from "@/shared/lib/filter-href";
import { cx } from "./cx";

export type FilterChipsProps = {
  param: string;
  options: readonly string[];
  current: Record<string, string>;
  basePath: string;
  label: string;
  showLabel?: boolean;
  uppercase?: boolean;
};

export function FilterChips({
  param,
  options,
  current,
  basePath,
  label,
  showLabel = false,
  uppercase = false,
}: FilterChipsProps) {
  const active = current[param] ?? "All";

  return (
    <nav aria-label={label} className="flex items-center gap-2 overflow-x-auto pb-0.5">
      {showLabel && (
        <span className="w-[92px] shrink-0 font-display text-sm font-bold tracking-[.12em] text-grey">
          {label}
        </span>
      )}
      {options.map((option) => {
        const isActive = option === active;
        return (
          <Link
            key={option}
            href={buildFilterHref(basePath, current, param, option)}
            aria-current={isActive ? "page" : undefined}
            className={cx(
              "flex h-11 shrink-0 items-center rounded-[10px] border-[1.5px] px-3.5 font-display text-base font-extrabold tracking-[.06em]",
              uppercase && "uppercase",
              isActive
                ? "border-asphalt bg-asphalt text-offwhite"
                : "border-border bg-white text-asphalt",
            )}
          >
            {option}
          </Link>
        );
      })}
    </nav>
  );
}

export function UrlFilterChips(props: Omit<FilterChipsProps, "current">) {
  const value = useSearchParams().get(props.param);
  return <FilterChips {...props} current={value ? { [props.param]: value } : {}} />;
}
