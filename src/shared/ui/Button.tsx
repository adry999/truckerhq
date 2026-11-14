import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "./cx";

const VARIANTS = {
  primary: "bg-amber text-asphalt hover:bg-amber-hover",
  outline: "border-2 border-asphalt text-asphalt hover:bg-asphalt hover:text-offwhite",
  outlineLight: "border-2 border-offwhite text-offwhite hover:bg-offwhite hover:text-asphalt",
  ghost: "text-green underline underline-offset-4",
} as const;

const SIZES = { md: "h-12 text-lg", lg: "h-14 text-xl" } as const;

type Common = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
};

/** Button classes for elements that cannot be a `Button`, such as `CallLink` anchors. */
export function buttonClass({ variant = "primary", size = "md", className }: Common = {}) {
  return cx(
    "inline-flex items-center justify-center rounded-xl px-6 font-display font-extrabold uppercase tracking-[.05em]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    SIZES[size],
    VARIANTS[variant],
    className,
  );
}
type ButtonProps = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className">;
type LinkProps = Common & { href: string } & Omit<ComponentProps<typeof Link>, "className" | "href">;

export function Button(props: ButtonProps | LinkProps) {
  const { variant, size, className, ...rest } = props;
  const classes = buttonClass({ variant, size, className });
  if (rest.href !== undefined) {
    return <Link {...(rest as Omit<LinkProps, keyof Common>)} className={classes} />;
  }
  const { type = "button", ...buttonRest } = rest as Omit<ButtonProps, keyof Common>;
  return <button {...buttonRest} type={type} className={classes} />;
}
