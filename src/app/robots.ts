import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Filtered listings are crawlable and canonicalize to the base URL; only
      // carrier lookup is blocked, since each ?q= hits the live FMCSA API.
      disallow: ["/dispatch/start", "/claim", "/tools/carrier-lookup?"],
    },
    // Pages are noindex off the real domain, so don't advertise a sitemap there.
    ...(INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
