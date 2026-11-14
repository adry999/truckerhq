import { cx } from "./cx";

export type StepItem = { number: string; title: string; description: string };

const COLUMNS = { 3: "md:grid-cols-3", 4: "md:grid-cols-4" } as const;

export function Steps({ items }: { items: readonly StepItem[] }) {
  const compact = items.length > 3;
  return (
    <ol className={cx("grid gap-8", compact ? COLUMNS[4] : COLUMNS[3])}>
      {items.map((s, i) => (
        <li key={s.number} className="relative flex flex-col gap-3.5">
          {i < items.length - 1 && (
            <div
              aria-hidden
              className="absolute left-7 top-[27px] hidden h-1 w-[calc(100%+2rem)] bg-[repeating-linear-gradient(90deg,var(--color-amber)_0_32px,transparent_32px_52px)] md:block"
            />
          )}
          <div className="relative flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
            {s.number}
          </div>
          <div className={cx("font-display font-extrabold uppercase", compact ? "text-2xl" : "text-3xl")}>
            {s.title}
          </div>
          <div className={cx("text-base leading-relaxed text-ink-3", compact ? "max-w-[300px]" : "max-w-[340px]")}>
            {s.description}
          </div>
        </li>
      ))}
    </ol>
  );
}
