import { describe, it, expect } from "vitest";
import { jobPostingSchema, faqSchema, breadcrumbSchema, contactPageSchema } from "./seo";

describe("jobPostingSchema", () => {
  const baseJob = {
    title: "OTR Company Driver",
    company: "Carpathian Freight LLC",
    loc: "Des Plaines, IL",
    pay: "$0.70/mi",
    posted: "Today",
    type: "OTR",
    equipment: "Dry van",
  };

  it("splits city and region out of loc", () => {
    const schema = jobPostingSchema(baseJob);
    expect(schema.jobLocation.address.addressLocality).toBe("Des Plaines");
    expect(schema.jobLocation.address.addressRegion).toBe("IL");
    expect(schema.jobLocation.address.addressCountry).toBe("US");
  });

  it("maps OWNER-OP to CONTRACTOR and everything else to FULL_TIME", () => {
    expect(jobPostingSchema({ ...baseJob, type: "OWNER-OP" }).employmentType).toBe("CONTRACTOR");
    expect(jobPostingSchema({ ...baseJob, type: "OTR" }).employmentType).toBe("FULL_TIME");
    expect(jobPostingSchema({ ...baseJob, type: "LOCAL" }).employmentType).toBe("FULL_TIME");
  });

  it("sets validThrough 30 days after datePosted", () => {
    const schema = jobPostingSchema(baseJob);
    const posted = new Date(schema.datePosted);
    const validThrough = new Date(schema.validThrough);
    const diffDays = Math.round((validThrough.getTime() - posted.getTime()) / 86_400_000);
    expect(diffDays).toBe(30);
  });

  it("parses '<N> day(s) ago' as N days before today", () => {
    const today = jobPostingSchema({ ...baseJob, posted: "Today" });
    const threeDaysAgo = jobPostingSchema({ ...baseJob, posted: "3 days ago" });
    const diff = Math.round(
      (new Date(today.datePosted).getTime() - new Date(threeDaysAgo.datePosted).getTime()) / 86_400_000,
    );
    expect(diff).toBe(3);
  });

  it("includes the company as hiringOrganization", () => {
    const schema = jobPostingSchema(baseJob);
    expect(schema.hiringOrganization).toEqual({ "@type": "Organization", name: baseJob.company });
  });
});

describe("faqSchema", () => {
  it("wraps each Q/A pair as a schema.org Question", () => {
    const schema = faqSchema([{ q: "Is it free?", a: "Yes." }]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Is it free?",
        acceptedAnswer: { "@type": "Answer", text: "Yes." },
      },
    ]);
  });

  it("returns an empty mainEntity for an empty list", () => {
    expect(faqSchema([]).mainEntity).toEqual([]);
  });
});

describe("breadcrumbSchema", () => {
  it("numbers items starting at 1 and builds absolute URLs", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Texas", path: "/carriers/texas" },
    ]);
    expect(schema.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://truckerhq.com/",
    });
    expect(schema.itemListElement[1].item).toBe("https://truckerhq.com/carriers/texas");
    expect(schema.itemListElement[1].position).toBe(2);
  });
});

describe("contactPageSchema", () => {
  it("nests telephone/email under the organization contact point", () => {
    const schema = contactPageSchema({
      name: "About",
      url: "https://truckerhq.com/about",
      telephone: "+1-555-555-5555",
      email: "hello@truckerhq.com",
    });
    expect(schema.about.contactPoint.telephone).toBe("+1-555-555-5555");
    expect(schema.about.contactPoint.email).toBe("hello@truckerhq.com");
    expect(schema.about.contactPoint.availableLanguage).toEqual(["English", "Russian"]);
  });
});
