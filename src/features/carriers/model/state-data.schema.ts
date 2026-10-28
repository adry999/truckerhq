import { z } from "zod";

/**
 * What each data/states/<slug>.json holds: the editorial fields that are unique to the
 * state (hero, CTA copy), plus optional overrides for fields buildStateContent would
 * otherwise generate. Numbers live in census.json, never here.
 */
export const stateDataSchema = z.strictObject({
  stateAbbr: z.string().length(2),
  stateName: z.string().min(1),
  heroImage: z.url(),
  heroAlt: z.string().min(1),
  dispatchCtaBody: z.string().min(1),
  hireCtaBody: z.string().min(1),
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
