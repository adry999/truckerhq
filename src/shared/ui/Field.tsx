"use client";

import { createContext, useContext, useId, type ComponentProps, type ReactNode } from "react";
import { cx } from "./cx";

const CONTROL =
  "rounded-[10px] border-[1.5px] border-input-border bg-white px-3.5 font-sans text-base outline-none focus:border-green aria-[invalid=true]:border-red";

type FieldA11y = { describedBy?: string; invalid: boolean };

// Field hands its hint/error ids to the control inside it, so the control needs no manual wiring.
const FieldContext = createContext<FieldA11y>({ invalid: false });

function useControlA11y(describedBy: string | undefined, invalid: boolean | "true" | "false" | "grammar" | "spelling" | undefined) {
  const field = useContext(FieldContext);
  const ids = [describedBy, field.describedBy].filter(Boolean).join(" ") || undefined;
  return {
    "aria-describedby": ids,
    "aria-invalid": invalid ?? (field.invalid || undefined),
  };
}

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  // hint and error sit outside <label> so they don't become part of the control's accessible name.
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">
          {label}
          {required && " (required)"}
        </span>
        <FieldContext.Provider value={{ describedBy, invalid: Boolean(error) }}>
          {children}
        </FieldContext.Provider>
      </label>
      {hint && <div id={hintId}>{hint}</div>}
      {error && (
        <div id={errorId} role="alert" className="text-[13px] font-semibold text-red">
          {error}
        </div>
      )}
    </div>
  );
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  const a11y = useControlA11y(props["aria-describedby"], props["aria-invalid"]);
  return <input {...props} {...a11y} className={cx("h-[52px]", CONTROL, className)} />;
}

export function SelectInput({ className, ...props }: ComponentProps<"select">) {
  const a11y = useControlA11y(props["aria-describedby"], props["aria-invalid"]);
  return <select {...props} {...a11y} className={cx("h-[52px]", CONTROL, className)} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  const a11y = useControlA11y(props["aria-describedby"], props["aria-invalid"]);
  return <textarea {...props} {...a11y} className={cx("min-h-[104px] py-3", CONTROL, className)} />;
}
