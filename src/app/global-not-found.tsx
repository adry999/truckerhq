import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import NotFoundContent from "@/components/NotFoundContent";
import { SITE_URL } from "@/shared/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found | Trucker HQ",
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <NotFoundContent />
    </RootDocument>
  );
}
