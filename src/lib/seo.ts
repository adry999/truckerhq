import { SITE_URL } from "@/lib/site";

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
      "@type": "Organization",
      name: "Trucker HQ",
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
