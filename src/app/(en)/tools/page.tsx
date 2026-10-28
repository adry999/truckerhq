import type { Metadata } from "next";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";
import { ToolsHub } from "@/app/_tools/ToolsHub";

export const metadata: Metadata = buildMetadata({
  title: "Free Trucking Tools, No Sign-Up",
  description:
    "Carrier lookup, profit per mile calculator, compliance alerts and a new MC checklist. Built on FMCSA data.",
  path: "/tools",
  ogImage: false,
  languages: languageAlternates("/tools"),
});

export default function ToolsPage() {
  return <ToolsHub lang="EN" />;
}
