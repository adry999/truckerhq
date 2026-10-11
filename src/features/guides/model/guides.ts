import { GUIDES } from "@/features/guides/data/guides";
import type { Guide } from "@/features/guides/data/guides";

export const FEATURED_SLUG = "how-to-tell-if-a-load-pays-enough";

export const FEATURED_SUMMARY =
  "Work out your cost per mile, add deadhead, and know your walk-away number before you call the broker.";

const READ_NEXT_SLUGS = [
  "rate-per-mile-vs-all-in-rate-what-brokers-mean",
  "when-to-turn-down-a-load",
  "detention-pay-how-to-get-it-on-the-rate-con",
];

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function readNextGuides(guide: Guide): Guide[] {
  return READ_NEXT_SLUGS.map((s) => findGuide(s)).filter(
    (g): g is Guide => g !== undefined && g.slug !== guide.slug
  );
}

export function guideDescription(guide: Guide): string {
  return guide.slug === FEATURED_SLUG
    ? FEATURED_SUMMARY
    : `A ${guide.category.toLowerCase()} guide for owner-operators from Trucker HQ dispatch. ${guide.minutes} min read.`;
}

export function updatedLabel(date: string): string {
  const d = new Date(date);
  return `Updated ${d.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}
