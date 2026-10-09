import { PHONE_SCHEMA } from "@/lib/contact";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { contactPageSchema } from "@/lib/seo";
import { About, CONTACT_EMAIL } from "@/features/contact";

export const metadata: Metadata = buildMetadata({
  title: "About Trucker HQ: Dispatch Team, Contact",
  description:
    "Who we are, who answers the phone, and how to reach us 24/7. English and Russian.",
  path: "/about",
});

const CONTACT_SCHEMA = contactPageSchema({
  name: "About Trucker HQ",
  url: `${SITE_URL}/about`,
  telephone: PHONE_SCHEMA,
  email: CONTACT_EMAIL,
});

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={CONTACT_SCHEMA} />
      <SiteHeader />
      <About />
      <SiteFooter />
    </div>
  );
}
