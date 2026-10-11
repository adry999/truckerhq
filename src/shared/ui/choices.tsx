import type { ReactNode } from "react";
import { cx } from "./cx";

const CARD =
  "flex min-h-[64px] cursor-pointer items-center gap-3.5 rounded-lg border-[1.5px] border-border bg-white px-3.5 py-2.5 text-left peer-checked:border-green peer-checked:bg-green-tint peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green";

type CardBase = {
  name: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

function CardText({ title, description }: Pick<CardBase, "title" | "description">) {
  return (
    <span className="flex flex-col gap-0.5">
      <span className="font-display text-lg font-extrabold tracking-[.02em]">{title}</span>
      {description && <span className="text-sm text-ink-2">{description}</span>}
    </span>
  );
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  className,
}: CardBase & { value: string; checked: boolean; onChange: (value: string) => void }) {
  return (
    <label className="relative block">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span className={cx(CARD, className)}>
        <span
          aria-hidden="true"
          className={cx(
            "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2",
            checked ? "border-green" : "border-input-border",
          )}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-green" />}
        </span>
        <CardText title={title} description={description} />
      </span>
    </label>
  );
}

export function CheckCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  className,
}: CardBase & { value?: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="relative block">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className={cx(CARD, className)}>
        <CardText title={title} description={description} />
      </span>
    </label>
  );
}

export function ChoiceGroup({
  legend,
  children,
  className,
}: {
  legend: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className={className ?? "flex flex-col gap-2.5"}>{children}</div>
    </fieldset>
  );
}
