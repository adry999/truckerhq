"use client";

import { useSearchParams } from "next/navigation";
import GuidesList from "@/components/GuidesList";

export default function GuidesListFromUrl() {
  const params = useSearchParams();
  return <GuidesList cat={params.get("cat") ?? "All"} />;
}
