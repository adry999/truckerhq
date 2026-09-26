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
