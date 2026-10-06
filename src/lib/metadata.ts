import type { Metadata } from "next";

const BRAND = "Trucker HQ";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path: string;
  locale?: "en_US" | "ru_RU";
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
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
}: BuildMetadataInput): Metadata {
  const hasBrand = title.includes(BRAND);
  const socialTitle = hasBrand ? title : `${title} | ${BRAND}`;
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
    },
    twitter: { card: "summary_large_image", title: socialTitle, description },
    ...(robots ? { robots } : {}),
  };
}
