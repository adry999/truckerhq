import type { MetadataRoute } from "next";
import { JOBS } from "@/lib/data";
import { GUIDES } from "@/lib/guides";
import { STATE_DIRECTORY } from "@/lib/states";
import { CITY_DIRECTORY } from "@/lib/cities";

const BASE_URL = "https://truckerhq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/ru`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${BASE_URL}/dispatch`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/hire-drivers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools/carrier-lookup`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools/profit-per-mile`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/compliance-alerts`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/new-mc-checklist`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/sms-terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const jobRoutes: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: `${BASE_URL}/jobs/${j.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const stateRoutes: MetadataRoute.Sitemap = STATE_DIRECTORY.map((s) => ({
    url: `${BASE_URL}/carriers/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITY_DIRECTORY.map((c) => ({
    url: `${BASE_URL}/jobs/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...jobRoutes, ...guideRoutes, ...stateRoutes, ...cityRoutes];
}
