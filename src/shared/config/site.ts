// Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the project's production
// domain: the custom domain once one is attached, *.vercel.app until then.
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "truckerhq.com";

export const SITE_URL = `https://${host}`;

// Only the real domain gets indexed; the *.vercel.app address would
// otherwise end up in search as a duplicate of it.
export const INDEXABLE = !host.endsWith(".vercel.app");
