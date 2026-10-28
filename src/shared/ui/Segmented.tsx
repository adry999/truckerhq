"use client";

import { useRef, type KeyboardEvent } from "react";

const NEXT_KEYS = ["ArrowRight", "ArrowDown"];
const PREV_KEYS = ["ArrowLeft", "ArrowUp"];

export function Segmented({
  options,
  value,
  onChange,
  label,
  uppercase = false,
  containerClassName = "flex flex-wrap gap-1.5",
  buttonClassName = "h-[50px] flex-1 basis-[110px] font-display text-[17px] font-extrabold tracking-[.05em]",
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  /** Accessible name for the group — pass the same text as the visible label above it. */
  label: string;
  uppercase?: boolean;
  containerClassName?: string;
  buttonClassName?: string;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.indexOf(value);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = NEXT_KEYS.includes(e.key) ? 1 : PREV_KEYS.includes(e.key) ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const from = Math.max(selected, 0);
    const to = (from + step + options.length) % options.length;
    onChange(options[to]);
    buttons.current[to]?.focus();
  }

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className={containerClassName}>
      {options.map((o, i) => (
        <button
          key={o}
          ref={(el) => {
            buttons.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={value === o}
          tabIndex={i === Math.max(selected, 0) ? 0 : -1}
          onClick={() => onChange(o)}
          className={`${buttonClassName} rounded-[10px] ${
            value === o
              ? "border-[1.5px] border-green bg-green text-offwhite"
              : "border-[1.5px] border-input-border bg-white text-asphalt"
          }`}
        >
          {uppercase ? o.toUpperCase() : o}
        </button>
      ))}
    </div>
  );
}
