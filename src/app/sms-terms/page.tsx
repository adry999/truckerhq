import type { Metadata } from "next";
import LegalDocLayout from "@/components/LegalDocLayout";

export const metadata: Metadata = {
  title: "SMS Terms",
};

const SECTIONS = [
  {
    heading: "What you get",
    body: "Compliance alerts, job alerts and call-back texts you signed up for. Message frequency varies, usually a few texts a year for compliance alerts.",
  },
  {
    heading: "Cost",
    body: "Message and data rates may apply.",
  },
  {
    heading: "Stop or get help",
    body: "Reply STOP to cancel or HELP for help at any time.",
  },
  {
    heading: "Consent",
    body: "Consent to receive texts is not a condition of any purchase.",
  },
  {
    heading: "Privacy",
    body: "Your phone number is used only for the texts you asked for. See the privacy policy.",
  },
];

const OTHER_DOCS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
];

export default function SmsTermsPage() {
  return (
    <LegalDocLayout
      title="SMS terms"
      lastUpdated="January 1, 2026"
      sections={SECTIONS}
      otherDocs={OTHER_DOCS}
    />
  );
}
