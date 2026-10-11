import "server-only";
import { z } from "zod";

// Empty strings (e.g. `FOO=` in .env files) count as unset.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === "" ? undefined : v), schema.optional());

const schema = z.object({
  SUPABASE_URL: optional(z.url()),
  SUPABASE_ANON_KEY: optional(z.string()),
  TWILIO_ACCOUNT_SID: optional(z.string()),
  TWILIO_AUTH_TOKEN: optional(z.string()),
  TWILIO_FROM: optional(z.string()),
  RESEND_API_KEY: optional(z.string()),
  RESEND_FROM: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().default("Trucker HQ <hello@truckerhq.com>"),
  ),
  FMCSA_WEBKEY: optional(z.string()),
  VERCEL_URL: optional(z.string()),
  VERCEL_BRANCH_URL: optional(z.string()),
});

export type ServerEnv = Readonly<z.output<typeof schema>>;

let cached: ServerEnv | undefined;

// Parsed lazily so importing a module never throws. An invalid value is
// logged and treated as unset, so one bad variable only disables its own
// integration instead of every route that reads the environment.
export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const input: Record<string, string | undefined> = { ...process.env };
  let result = schema.safeParse(input);
  if (!result.success) {
    const names = [...new Set(result.error.issues.map((i) => String(i.path[0])))];
    console.error(`[env] invalid server environment variables, ignoring: ${names.join(", ")}`);
    for (const name of names) delete input[name];
    result = schema.safeParse(input);
    if (!result.success) throw result.error;
  }
  cached = Object.freeze(result.data);
  return cached;
}

export function resetServerEnvForTests(): void {
  cached = undefined;
}
