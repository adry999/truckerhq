import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import LegalDocLayout from "@/components/LegalDocLayout";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/privacy",
});

const SECTIONS = [
  {
    heading: "What we collect",
    body: "Name, phone, email, MC/DOT number and truck details you enter in our forms. Carrier data shown in Carrier Lookup comes from public FMCSA records.",
  },
  {
    heading: "How we use it",
    body: "To call you back, run dispatch, send the alerts you asked for, and match drivers with jobs.",
  },
  {
    heading: "Who we share it with",
    body: "Carriers see a driver application only when the driver applies. We do not sell personal information.",
  },
  {
    heading: "Your choices",
    body: "Ask us to update or delete your information at any time by email or phone.",
  },
  {
    heading: "Cookies and analytics",
    body: "[Which analytics and ad tools the site uses, if any.]",
  },
];

const OTHER_DOCS = [
  { label: "Terms", href: "/terms" },
  { label: "SMS terms", href: "/sms-terms" },
];

export default function PrivacyPage() {
  return (
    <LegalDocLayout
      title="Privacy policy"
      lastUpdated="January 1, 2026"
      sections={SECTIONS}
      otherDocs={OTHER_DOCS}
    />
  );
}
