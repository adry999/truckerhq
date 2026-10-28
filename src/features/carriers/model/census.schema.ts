import { z } from "zod";

const stateCensusSchema = z.strictObject({
  activeForHire: z.number().int().positive(),
  newLast12Months: z.number().int().nonnegative(),
  smallFleetCount: z.number().int().nonnegative(),
  smallFleetShare: z.number().min(0).max(100),
  powerUnits: z.number().int().nonnegative(),
  drivers: z.number().int().nonnegative(),
  topCities: z.array(z.strictObject({ city: z.string().min(1), count: z.number().int().positive() })).min(1),
});

/** Shape of data/states/census.json, written by `npm run data:census`. */
export const censusSchema = z.strictObject({
  source: z.strictObject({
    name: z.string().min(1),
    url: z.url(),
    datasetId: z.string().min(1),
    fetchedAt: z.iso.datetime(),
    filters: z.string().min(1),
  }),
  states: z.record(z.string(), stateCensusSchema),
});

export type StateCensus = z.infer<typeof stateCensusSchema>;
export type CensusSource = z.infer<typeof censusSchema>["source"];

export function parseCensus(raw: unknown) {
  const parsed = censusSchema.safeParse(raw);
  if (!parsed.success) throw new Error(`Invalid census data: ${z.prettifyError(parsed.error)}`);
  return parsed.data;
}
