import { CARRIERS } from "@/features/carriers/data/carriers";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export function findCarrier(slug: string): Carrier | undefined {
  return CARRIERS.find((c) => c.slug === slug);
}
