import type { ScoreFactor } from "@/features/carriers/model/profile";

export function factorPercent(f: ScoreFactor): number {
  return (f.v / f.max) * 100;
}

/** Same GOOD band as the headline Health Score (80+). */
export function isFactorHealthy(f: ScoreFactor): boolean {
  return factorPercent(f) >= 80;
}
