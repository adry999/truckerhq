import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Overpass } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const overpass = Overpass({
  variable: "--font-overpass",
  weight: ["800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://truckerhq.com"),
  title: {
    default: "Trucker HQ — Flat-Rate Dispatch, CDL Jobs & Free Carrier Tools",
    template: "%s | Trucker HQ",
  },
  description:
    "Flat weekly dispatch, no percentage. CDL jobs with pay posted up front. Free carrier tools: DOT/MC lookup, profit-per-mile calculator, compliance alerts. English and Russian, 24/7.",
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trucker HQ",
  url: "https://truckerhq.com",
  description:
    "Flat-rate truck dispatch, CDL driver jobs and free carrier tools built on public FMCSA data.",
  areaServed: "US",
  availableLanguage: ["English", "Russian"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${overpass.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={ORGANIZATION_SCHEMA} />
        {children}
      </body>
    </html>
  );
}
