import type { MetadataRoute } from "next";
import { sitemapAlternates } from "@/shared/i18n/alternates";
import { SITE_URL } from "@/shared/config/site";
import { GUIDES, hasGuideBody } from "@/features/guides";
import { STATE_DIRECTORY, STATE_DATA_IS_SAMPLE } from "@/features/carriers";
import { CITY_DIRECTORY, CITY_CONTENT, isCityIndexable } from "@/features/jobs";
import { DISPATCH_SERVICE_PAGES } from "@/features/dispatch";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1, alternates: sitemapAlternates("/") },
    {
      url: `${BASE_URL}/ru`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: sitemapAlternates("/"),
    },
    { url: `${BASE_URL}/dispatch`, changeFrequency: "monthly", priority: 0.9, alternates: sitemapAlternates("/dispatch") },
    { url: `${BASE_URL}/ru/dispatch`, changeFrequency: "monthly", priority: 0.8, alternates: sitemapAlternates("/dispatch") },
    { url: `${BASE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8, alternates: sitemapAlternates("/pricing") },
    { url: `${BASE_URL}/ru/pricing`, changeFrequency: "monthly", priority: 0.7, alternates: sitemapAlternates("/pricing") },
    { url: `${BASE_URL}/jobs`, changeFrequency: "daily", priority: 0.9, alternates: sitemapAlternates("/jobs") },
    { url: `${BASE_URL}/jobs/russian-speaking`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/ru/jobs`, changeFrequency: "daily", priority: 0.8, alternates: sitemapAlternates("/jobs") },
    { url: `${BASE_URL}/hire-drivers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/carriers`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools`, changeFrequency: "monthly", priority: 0.8, alternates: sitemapAlternates("/tools") },
    { url: `${BASE_URL}/ru/tools`, changeFrequency: "monthly", priority: 0.7, alternates: sitemapAlternates("/tools") },
    { url: `${BASE_URL}/tools/carrier-lookup`, changeFrequency: "weekly", priority: 0.8 },
    ...(["/tools/profit-per-mile", "/tools/compliance-alerts", "/tools/new-mc-checklist"] as const).flatMap(
      (path): MetadataRoute.Sitemap => [
        { url: `${BASE_URL}${path}`, changeFrequency: "monthly", priority: 0.7, alternates: sitemapAlternates(path) },
        { url: `${BASE_URL}/ru${path}`, changeFrequency: "monthly", priority: 0.6, alternates: sitemapAlternates(path) },
      ],
    ),
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/sms-terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePageRoutes: MetadataRoute.Sitemap = DISPATCH_SERVICE_PAGES.map((p) => ({
    url: `${BASE_URL}/dispatch/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Stub guides are noindex (see guides/[slug]); keep them out of the sitemap too.
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.filter(hasGuideBody).map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: g.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // State pages are noindex only if sample data returns (see STATE_DATA_IS_SAMPLE).
  const stateRoutes: MetadataRoute.Sitemap = (STATE_DATA_IS_SAMPLE ? [] : STATE_DIRECTORY).map((s) => ({
    url: `${BASE_URL}/carriers/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Thin city pages are noindex (see jobs/[slug]); keep them out of the sitemap too.
  const cityRoutes: MetadataRoute.Sitemap = CITY_DIRECTORY.filter(
    (c) => isCityIndexable(CITY_CONTENT[c.slug]),
  ).map((c) => ({
    url: `${BASE_URL}/jobs/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...servicePageRoutes, ...guideRoutes, ...stateRoutes, ...cityRoutes];
}
