import type { Metadata } from "next";
import DispatchPageContent from "@/components/DispatchPageContent";

export const metadata: Metadata = {
  title: "Truck Dispatch Service, Flat Weekly Rate",
  description:
    "Dispatch for owner-operators and small fleets. One flat price per truck per week, 24/7 dispatchers, broker checks, paperwork included.",
  alternates: {
    canonical: "/dispatch",
    languages: { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" },
  },
};

export default function DispatchPage() {
  return <DispatchPageContent lang="EN" />;
}
