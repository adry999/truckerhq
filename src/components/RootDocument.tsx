import { Barlow_Condensed, Inter, Overpass, Roboto_Condensed } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import "@/app/globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ["700", "800"],
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const overpass = Overpass({
  variable: "--font-overpass",
  weight: ["800", "900"],
  subsets: ["latin"],
});

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

export default function RootDocument({
  lang,
  children,
}: {
  lang: "en" | "ru";
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${barlowCondensed.variable} ${robotoCondensed.variable} ${inter.variable} ${overpass.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
