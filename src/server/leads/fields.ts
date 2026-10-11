import { z } from "zod";
import { toUsE164 } from "@/lib/phone";

// optional() so a missing key reaches the transform instead of failing as "nonoptional".
export const anyInput = z.unknown().optional();

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Anything goes in; a trimmed string capped at `max` comes out ("" for non-strings). */
export const text = (max: number) => anyInput.transform((v) => clean(v, max));

export const requiredText = (max: number, error: string) =>
  anyInput.transform((v, ctx) => {
    const out = clean(v, max);
    if (!out) ctx.issues.push({ code: "custom", message: error, input: v });
    return out;
  });

export const usPhone = (error = "Enter a valid US phone number") =>
  z.string().transform((v, ctx) => {
    const e164 = toUsE164(v);
    if (!e164) {
      ctx.issues.push({ code: "custom", message: error, input: v });
      return z.NEVER;
    }
    return e164;
  });

/** Empty is allowed and stays ""; anything else must be a valid US phone number. */
export const optionalUsPhone = () =>
  z.string().transform((v, ctx) => {
    if (!v) return "";
    const e164 = toUsE164(v);
    if (!e164) {
      ctx.issues.push({ code: "custom", message: "Enter a valid US phone number", input: v });
      return z.NEVER;
    }
    return e164;
  });

export const textList = (maxItems: number, maxLen: number) =>
  anyInput.transform((v) =>
    Array.isArray(v)
      ? v
          .slice(0, maxItems)
          .map((item) => clean(item, maxLen))
          .filter(Boolean)
      : [],
  );

export const dotNumber = () =>
  z.string().transform((v, ctx) => {
    const digits = v.replace(/\D/g, "");
    if (digits.length < 1 || digits.length > 8) {
      ctx.issues.push({ code: "custom", message: "Enter a valid DOT number", input: v });
      return z.NEVER;
    }
    return digits;
  });

/**
 * Validates `checks` only after `first` passes, so "missing field" messages
 * always win over format messages regardless of field order.
 */
export function withChecks<S extends z.ZodType<object>, V extends z.ZodRawShape>(first: S, checks: V) {
  const second = z.object(checks);
  return first.transform((value, ctx) => {
    const result = second.safeParse(value);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.issues.push({ code: "custom", message: issue.message, path: issue.path, input: value });
      }
      return z.NEVER;
    }
    return { ...value, ...result.data };
  });
}
