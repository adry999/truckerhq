import { z } from "zod";

const carrierRowSchema = z.strictObject({
  name: z.string().min(1),
  city: z.string().min(1),
  dot: z.string().regex(/^\d+$/),
  equipment: z.string().min(1),
  trucks: z.number().int().nonnegative(),
  status: z.enum(["ACTIVE", "WARNING", "INACTIVE"]),
  score: z.number().int().min(0).max(100),
});

/**
 * What each data/states/<slug>.json holds: the fields that are unique to the
 * state, plus optional overrides for fields buildStateContent would otherwise
 * generate from the state name.
 */
export const stateDataSchema = z.strictObject({
  stateAbbr: z.string().length(2),
  stateName: z.string().min(1),
  heroImage: z.url(),
  heroAlt: z.string().min(1),
  /** The four headline numbers; the first is also the state's total count. */
  stats: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  equipmentBreakdown: z.array(z.strictObject({ t: z.string(), pct: z.number() })).min(1),
  topCities: z.array(z.strictObject({ t: z.string(), count: z.string() })).min(1),
  equipmentOptions: z.array(z.string()).min(1),
  dispatchCtaBody: z.string().min(1),
  hireCtaBody: z.string().min(1),
  carriers: z.array(carrierRowSchema).min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  heroDescription: z.string().optional(),
  dispatchCtaEyebrow: z.string().optional(),
  dispatchCtaTitle: z.string().optional(),
});

export type StateData = z.infer<typeof stateDataSchema>;

export function parseStateData(slug: string, raw: unknown): StateData {
  const parsed = stateDataSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Invalid state data for "${slug}": ${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
}
