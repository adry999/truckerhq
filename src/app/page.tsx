import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = buildMetadata({
  title: "Trucker HQ: Flat-Rate Truck Dispatch, CDL Jobs, Carrier Tools",
  description:
    "Truck dispatch for a flat weekly fee, never a percentage. English and Russian-speaking dispatchers 24/7. CDL jobs and free carrier lookup.",
  path: "/",
  languages: { en: "/", ru: "/ru", "x-default": "/" },
});

export default function HomePage() {
  return <HomePageContent lang="EN" />;
}
