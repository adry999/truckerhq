import { describe, it, expect } from "vitest";
import { faqSchema, breadcrumbSchema, contactPageSchema } from "./seo";

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
