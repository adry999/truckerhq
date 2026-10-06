import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  openGraph: { ...rootMetadata.openGraph, locale: "ru_RU" },
};

export default function RuLayout({ children }: LayoutProps<"/ru">) {
  return <RootDocument lang="ru">{children}</RootDocument>;
}
