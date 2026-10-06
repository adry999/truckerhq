import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "Page not found | Trucker HQ",
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <NotFoundContent />
    </RootDocument>
  );
}
