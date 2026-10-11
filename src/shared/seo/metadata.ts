import type { Metadata } from "next";
import { INDEXABLE, SITE_URL } from "@/shared/config/site";

const BRAND = "Trucker HQ";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path: string;
  locale?: "en_US" | "ru_RU";
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
  // A page-level openGraph object replaces the parent's, inherited file-based
  // image included, so pages without their own opengraph-image file point at
  // one explicitly. Pass false on pages that have their own file: an explicit
  // image would override it.
  ogImage?: string | false;
};

// Titles that already name the brand skip the layout's "%s | Trucker HQ" template.
// og:title is not templated by Next, so it gets the brand suffix here instead.
export function buildMetadata({
  title,
  description,
  path,
  locale = "en_US",
  languages,
  robots,
  ogImage = "/opengraph-image",
}: BuildMetadataInput): Metadata {
  const hasBrand = title.includes(BRAND);
  const socialTitle = hasBrand ? title : `${title} | ${BRAND}`;
  const images = ogImage ? { images: ogImage } : {};
  return {
    title: hasBrand ? { absolute: title } : title,
    description,
    alternates: languages ? { canonical: path, languages } : { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: BRAND,
      type: "website",
      locale,
      ...images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, ...images },
    ...(robots ? { robots } : {}),
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trucker HQ: Flat-Rate Truck Dispatch, CDL Jobs, Carrier Tools",
    template: "%s | Trucker HQ",
  },
  description:
    "Truck dispatch for a flat weekly fee, never a percentage. English and Russian-speaking dispatchers 24/7. CDL jobs and free carrier lookup.",
  openGraph: {
    siteName: "Trucker HQ",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  ...(INDEXABLE ? {} : { robots: { index: false, follow: false } }),
};
