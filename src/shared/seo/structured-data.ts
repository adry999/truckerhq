import { SITE_URL } from "@/shared/config/site";
import { PHONE_IS_PLACEHOLDER, PHONE_SCHEMA } from "@/shared/config/contact";

export const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const BRAND = "Trucker HQ";

/** Sitewide entity graph: the organization and the website it publishes. */
export function siteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BRAND,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description:
          "Flat-rate truck dispatch, CDL driver jobs and free carrier tools built on public FMCSA data.",
        areaServed: { "@type": "Country", name: "United States" },
        knowsLanguage: ["en", "ru"],
        // sameAs stays out until real profile URLs exist.
        ...(PHONE_IS_PLACEHOLDER
          ? {}
          : {
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "dispatch",
                telephone: PHONE_SCHEMA,
                availableLanguage: ["English", "Russian"],
              },
            }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: BRAND,
        url: SITE_URL,
        inLanguage: ["en", "ru"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** Pass `offer` only once a real price exists; the page still shows a placeholder today. */
export function dispatchServiceSchema(offer?: { price: string; currency?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/dispatch#service`,
    name: "Truck dispatching for owner-operators",
    serviceType: "Truck dispatching",
    url: `${SITE_URL}/dispatch`,
    description:
      "Dispatch for owner-operators and small fleets at one flat weekly price per truck, never a percentage of the load.",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "Audience",
      audienceType: "Owner-operators and small trucking fleets",
    },
    ...(offer
      ? {
          offers: {
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.currency ?? "USD",
            url: `${SITE_URL}/dispatch`,
          },
        }
      : {}),
  };
}

export function articleSchema(article: {
  title: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: article.author ? { "@type": "Person", name: article.author } : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${article.path}` },
    image: article.image,
  };
}

export function contactPageSchema(page: {
  name: string;
  url: string;
  telephone?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page.name,
    url: page.url,
    about: {
      "@id": ORG_ID,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: page.telephone,
        email: page.email,
        availableLanguage: ["English", "Russian"],
      },
    },
  };
}

export function guidesListSchema(
  guides: { slug: string; title: string; category: string; date: string }[],
  baseUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/guides/${g.slug}`,
      name: g.title,
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/** schema.org Dataset for a page whose numbers come from a public data source. */
export function datasetSchema(dataset: {
  name: string;
  description: string;
  path: string;
  sourceName: string;
  sourceUrl: string;
  dateModified: string;
  variables: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: dataset.name,
    description: dataset.description,
    url: `${SITE_URL}${dataset.path}`,
    dateModified: dataset.dateModified,
    variableMeasured: dataset.variables,
    isBasedOn: { "@type": "Dataset", name: dataset.sourceName, url: dataset.sourceUrl },
    isAccessibleForFree: true,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
