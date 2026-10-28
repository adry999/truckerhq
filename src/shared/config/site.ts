// The public origin comes from the environment because the final domain isn't
// fixed yet. Next inlines NEXT_PUBLIC_* at build time, so the read must stay literal.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_HOST = new URL(SITE_URL).hostname;

// Opt-in: staging and temporary domains must never end up in search results.
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";
