import { GUIDES } from "@/features/guides/data/guides";
import type { Guide } from "@/features/guides/data/guides";
import type { GuideBodyData } from "@/features/guides/data/guide-body";
import { GUIDE_BODIES } from "@/features/guides/data/guide-bodies";

export const FEATURED_SLUG = "how-to-tell-if-a-load-pays-enough";

export const FEATURED_SUMMARY =
  "Work out your cost per mile, add deadhead, and know your walk-away number before you call the broker.";

const READ_NEXT_SLUGS = [
  "rate-per-mile-vs-all-in-rate-what-brokers-mean",
  "when-to-turn-down-a-load",
  "detention-pay-how-to-get-it-on-the-rate-con",
];

export function getGuideBody(guide: Guide): GuideBodyData | undefined {
  return GUIDE_BODIES[guide.slug];
}

/**
 * Publishing gate: the featured guide, or a guide whose body is approved.
 * Drafts stay noindex and out of the sitemap until reviewStatus is "approved".
 */
export function hasGuideBody(guide: Guide): boolean {
  return guide.slug === FEATURED_SLUG || getGuideBody(guide)?.reviewStatus === "approved";
}

/** A draft body is previewed outside production only; production keeps the stub. */
export function isDraftPreview(guide: Guide): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    !hasGuideBody(guide) &&
    getGuideBody(guide)?.reviewStatus === "draft"
  );
}

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
