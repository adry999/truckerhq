function daysAgo(posted: string): number {
  if (/today/i.test(posted)) return 0;
  const m = /(\d+)\s*day/i.exec(posted);
  return m ? Number(m[1]) : 0;
}

export function jobPostingSchema(job: {
  title: string;
  company: string;
  loc: string;
  pay: string;
  posted: string;
  type: string;
  equipment: string;
}) {
  const [city, region] = job.loc.split(",").map((s) => s.trim());
  const posted = new Date();
  posted.setDate(posted.getDate() - daysAgo(job.posted));
  const validThrough = new Date(posted);
  validThrough.setDate(validThrough.getDate() + 30);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} driving ${job.equipment} for ${job.company}. ${job.pay}.`,
    datePosted: posted.toISOString().slice(0, 10),
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType:
      job.type === "OWNER-OP" ? "CONTRACTOR" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region,
        addressCountry: "US",
      },
    },
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
      item: `https://truckerhq.com${item.path}`,
    })),
  };
}
