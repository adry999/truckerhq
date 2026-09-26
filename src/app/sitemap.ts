import type { MetadataRoute } from "next";
import { CARRIERS, JOBS } from "@/lib/data";

const BASE_URL = "https://truckerhq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/dispatch`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/hire-drivers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools/carrier-lookup`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools/profit-calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/compliance-alerts`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/new-mc-checklist`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/carriers/texas`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const jobRoutes: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: `${BASE_URL}/jobs/${j.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const carrierRoutes: MetadataRoute.Sitemap = CARRIERS.map((c) => ({
    url: `${BASE_URL}/tools/carrier-lookup/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...jobRoutes, ...carrierRoutes];
}
