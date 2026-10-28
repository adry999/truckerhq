import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/shared/config/site";

// Filtered listings are crawlable and canonicalize to the base URL; only
// carrier lookup is blocked, since each ?q= hits the live FMCSA API.
// /dispatch/start and /claim stay crawlable: their noindex meta is only
// seen if Google may fetch them.
const DISALLOW = ["/tools/carrier-lookup?"];

// Search and retrieval crawlers that cite pages in answers, plus the opt-in
// tokens for Google and Apple AI features. A named group replaces the "*"
// group for that bot rather than extending it, so each repeats the disallow.
const AI_AND_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    // Pages are noindex off the real domain, so don't advertise a sitemap there.
    ...(INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
