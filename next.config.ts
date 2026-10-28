import type { NextConfig } from "next";

// Report-only for now: logs violations to the browser console without
// blocking anything, so it's safe to ship before we've watched real
// traffic for false positives. Flip the header key to
// "Content-Security-Policy" once a deploy comes back clean.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com https://www.facebook.com https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.facebook.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "report-uri /api/csp-report",
  "report-to csp",
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  poweredByHeader: false,
  images: {
    // Small server: WebP only (AVIF encoding is CPU-heavy), fewer width variants, long cache.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    minimumCacheTTL: 2592000,
  },
  // The lookup landing is static; searches live on /search. Old ?q= links redirect there.
  async redirects() {
    return [
      {
        source: "/tools/carrier-lookup",
        has: [{ type: "query", key: "q" }],
        destination: "/tools/carrier-lookup/search",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy-Report-Only", value: CSP },
          { key: "Reporting-Endpoints", value: 'csp="/api/csp-report"' },
        ],
      },
    ];
  },
};

export default nextConfig;
