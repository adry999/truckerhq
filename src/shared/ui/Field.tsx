import type { ComponentProps, ReactNode } from "react";
import { cx } from "./cx";

const CONTROL =
  "rounded-[10px] border-[1.5px] border-input-border bg-white px-3.5 font-sans text-base outline-none focus:border-green aria-[invalid=true]:border-red";

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
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold">
        {label}
        {required && " (required)"}
      </span>
      {children}
      {hint}
      {error}
    </label>
  );
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cx("h-[52px]", CONTROL, className)} />;
}

export function SelectInput({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cx("h-[52px]", CONTROL, className)} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cx("min-h-[104px] py-3", CONTROL, className)} />;
}
