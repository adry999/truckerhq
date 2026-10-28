import { Barlow_Condensed, Inter, Overpass, Roboto_Condensed } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import "@/app/globals.css";
import { siteGraphSchema } from "@/shared/seo/structured-data";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["700", "800"],
  subsets: ["latin"],
});

// Display fallback for Cyrillic glyphs only (Barlow has none). Not preloaded:
// its unicode-range means EN pages never fetch it, RU pages fetch it on use.
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ["700", "800"],
  subsets: ["cyrillic"],
  preload: false,
});

// EN pages preload only the Latin subset; RU pages also get Cyrillic. Both share
// the --font-inter variable, and each page applies only one of them.
const interLatin = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const interLatinCyrillic = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

// Logo-only font: not preloaded.
const overpass = Overpass({
  variable: "--font-overpass",
  weight: ["800", "900"],
  subsets: ["latin"],
  preload: false,
});

const SKIP_LABEL = { en: "Skip to content", ru: "Перейти к содержимому" } as const;

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
      className={`${barlowCondensed.variable} ${robotoCondensed.variable} ${(lang === "ru" ? interLatinCyrillic : interLatin).variable} ${overpass.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2 focus:font-semibold focus:text-asphalt focus:outline-2 focus:outline-offset-2 focus:outline-asphalt"
        >
          {SKIP_LABEL[lang]}
        </a>
        <JsonLd data={siteGraphSchema()} />
        <Analytics />
        {/* Each page renders <main id="main-content"> between its own header and footer. */}
        {children}
      </body>
    </html>
  );
}
