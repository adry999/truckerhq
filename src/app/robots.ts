import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Filtered listings are crawlable and canonicalize to the base URL; only
      // carrier lookup is blocked, since each ?q= hits the live FMCSA API.
      disallow: ["/dispatch/start", "/claim", "/tools/carrier-lookup?"],
    },
    sitemap: "https://truckerhq.com/sitemap.xml",
  };
}
