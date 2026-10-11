import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { OgFont } from "@/shared/seo/og";

// The ImageResponse default font has no Cyrillic glyphs. These are the same
// families the site uses for Russian pages (Roboto Condensed display, Inter
// body), committed as woff subsets so the images render without a network call.
// Each weight needs its Latin subset too: the cards mix in "CDL", "HQ" and so on.
const fontsDir = join(process.cwd(), "src/assets/fonts");

const load = (file: string) =>
  readFile(join(fontsDir, file)).then((b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer);

const [rcCyr800, rcLat800, interCyr500, interLat500, interCyr600, interLat600] = await Promise.all([
  load("roboto-condensed-cyrillic-800-normal.woff"),
  load("roboto-condensed-latin-800-normal.woff"),
  load("inter-cyrillic-500-normal.woff"),
  load("inter-latin-500-normal.woff"),
  load("inter-cyrillic-600-normal.woff"),
  load("inter-latin-600-normal.woff"),
]);

// Satori keeps one font per family name and weight, so each subset gets its own
// family and the CSS font stack falls back from Cyrillic to Latin per glyph.
export const ruOgFonts: OgFont[] = [
  { name: "Roboto Condensed Cyrillic", data: rcCyr800, weight: 800, style: "normal" },
  { name: "Roboto Condensed Latin", data: rcLat800, weight: 800, style: "normal" },
  { name: "Inter Cyrillic", data: interCyr500, weight: 500, style: "normal" },
  { name: "Inter Latin", data: interLat500, weight: 500, style: "normal" },
  { name: "Inter Cyrillic", data: interCyr600, weight: 600, style: "normal" },
  { name: "Inter Latin", data: interLat600, weight: 600, style: "normal" },
];

export const ruOgFontConfig = {
  fonts: ruOgFonts,
  displayFont: "Roboto Condensed Cyrillic, Roboto Condensed Latin",
  bodyFont: "Inter Cyrillic, Inter Latin",
};
