import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import DispatchPageContent from "@/components/DispatchPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Truck Dispatch Service, Flat Weekly Rate",
  description:
    "Dispatch for owner-operators and small fleets. One flat price per truck per week, 24/7 dispatchers, broker checks, paperwork included.",
  path: "/dispatch",
  ogImage: false,
  languages: { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" },
});

export default function DispatchPage() {
  return <DispatchPageContent lang="EN" />;
}
