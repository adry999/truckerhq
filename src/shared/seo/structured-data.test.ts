import { describe, it, expect } from "vitest";
import {
  faqSchema,
  breadcrumbSchema,
  contactPageSchema,
  siteGraphSchema,
  dispatchServiceSchema,
  articleSchema,
  ORG_ID,
} from "./structured-data";
import { SITE_URL } from "@/shared/config/site";

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
      item: `${SITE_URL}/`,
    });
    expect(schema.itemListElement[1].item).toBe(`${SITE_URL}/carriers/texas`);
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

describe("siteGraphSchema", () => {
  const graph = siteGraphSchema()["@graph"];
  const org = graph[0] as Record<string, unknown>;
  const site = graph[1] as Record<string, unknown>;

  it("defines one organization and one website with stable ids", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org["@id"]).toBe(ORG_ID);
    expect(site["@type"]).toBe("WebSite");
    expect(site.publisher).toEqual({ "@id": ORG_ID });
  });

  it("leaves out telephone and sameAs while they are placeholders", () => {
    expect(JSON.stringify(graph)).not.toContain("XXX");
    expect(org.sameAs).toBeUndefined();
    expect(org.contactPoint).toBeUndefined();
  });
});

describe("dispatchServiceSchema", () => {
  it("links the provider to the organization and omits offers without a price", () => {
    const schema = dispatchServiceSchema();
    expect(schema["@type"]).toBe("Service");
    expect(schema.serviceType).toBe("Truck dispatching");
    expect(schema.provider).toEqual({ "@id": ORG_ID });
    expect("offers" in schema).toBe(false);
  });

  it("adds an offer when a price is given", () => {
    const schema = dispatchServiceSchema({ price: "250" });
    expect(schema).toMatchObject({ offers: { price: "250", priceCurrency: "USD" } });
  });
});

describe("articleSchema", () => {
  it("carries publisher, modified date, page and image", () => {
    const schema = articleSchema({
      title: "T",
      path: "/guides/t",
      datePublished: "2026-10-01",
      author: "A",
      image: `${SITE_URL}/guides/t/opengraph-image`,
    });
    expect(schema.dateModified).toBe("2026-10-01");
    expect(schema.publisher).toEqual({ "@id": ORG_ID });
    expect(schema.mainEntityOfPage["@id"]).toBe(`${SITE_URL}/guides/t`);
    expect(schema.image).toBe(`${SITE_URL}/guides/t/opengraph-image`);
  });

  it("falls back to the organization as author", () => {
    expect(articleSchema({ title: "T", path: "/x", datePublished: "d", image: "i" }).author).toEqual({ "@id": ORG_ID });
  });
});
