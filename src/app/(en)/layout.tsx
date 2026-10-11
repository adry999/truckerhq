import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import { rootMetadata } from "@/shared/seo/metadata";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
