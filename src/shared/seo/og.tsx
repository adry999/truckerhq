import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

type OgTheme = "dark" | "green" | "light";

const ARIAL = "Arial, Helvetica, sans-serif";

const THEME: Record<OgTheme, { bg: string; fg: string; subFg: string; accent: string }> = {
  dark: { bg: "#16181B", fg: "#F7F7F5", subFg: "#D4D6DA", accent: "#F2A900" },
  green: { bg: "#0E5C3A", fg: "#F7F7F5", subFg: "#E3EAE6", accent: "#F2A900" },
  light: { bg: "#F7F7F5", fg: "#16181B", subFg: "#3F444B", accent: "#0E5C3A" },
};

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 600 | 800;
  style: "normal";
};

export type OgCardConfig = {
  theme: OgTheme;
  sub?: string;
  kicker: string;
  heading: string;
  headingSize: number;
  paragraph: string;
  big: string;
  shield?: boolean;
  shieldOpacity?: number;
  // Overrides for non-Latin cards: the default font has no Cyrillic glyphs.
  fonts?: OgFont[];
  displayFont?: string;
  bodyFont?: string;
};

function RoadLine() {
  const segments = Array.from({ length: 10 });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 12,
        display: "flex",
      }}
    >
      {segments.map((_, i) => (
        <div
          key={i}
          style={{ display: "flex", width: 80, height: 12, background: "#F2A900", marginRight: 52 }}
        />
      ))}
    </div>
  );
}

function Shield({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      style={{
        display: "flex",
        width: size,
        height: (size * 108) / 100,
        opacity,
        background: "#0E5C3A",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        border: "4px solid #F7F7F5",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 900,
          fontSize: size * 0.34,
          color: "#F7F7F5",
        }}
      >
        HQ
      </div>
    </div>
  );
}

function LogoLockup({ sub, font }: { sub?: string; font: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderRadius: 10,
          background: "#0E5C3A",
          border: "3px solid #F7F7F5",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 8px 10px 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: "#F7F7F5",
          }}
        >
          Trucker
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px 10px 8px",
            borderLeft: "3px solid #F7F7F5",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 900,
            fontSize: 26,
            color: "#F2A900",
          }}
        >
          HQ
        </div>
      </div>
      {sub ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#F2A900",
            color: "#16181B",
            borderRadius: 8,
            padding: "6px 14px",
            fontFamily: font,
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
}

export function renderOgImage(c: OgCardConfig) {
  const t = THEME[c.theme];
  const display = c.displayFont ?? ARIAL;
  const body = c.bodyFont ?? ARIAL;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px 64px",
          background: t.bg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <LogoLockup sub={c.sub} font={display} />
          <div
            style={{
              display: "flex",
              fontFamily: display,
              fontWeight: 800,
              fontSize: 30,
              letterSpacing: 4,
              color: t.accent,
              textTransform: "uppercase",
            }}
          >
            {c.kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: c.shield ? 760 : 940 }}>
          <div
            style={{
              display: "flex",
              fontFamily: display,
              fontWeight: 900,
              fontSize: c.headingSize,
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: t.fg,
            }}
          >
            {c.heading}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: body,
              fontWeight: 500,
              fontSize: 32,
              lineHeight: 1.4,
              color: t.subFg,
            }}
          >
            {c.paragraph}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontFamily: body,
              fontWeight: 600,
              fontSize: 28,
              color: t.accent,
            }}
          >
            {c.big}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: body,
              fontWeight: 600,
              fontSize: 28,
              color: t.subFg,
            }}
          >
            truckerhq.com
          </div>
        </div>

        {c.shield ? (
          <div style={{ position: "absolute", right: 72, top: 184, display: "flex" }}>
            <Shield size={240} opacity={c.shieldOpacity ?? 1} />
          </div>
        ) : null}

        <RoadLine />
      </div>
    ),
    c.fonts ? { ...ogImageSize, fonts: c.fonts } : ogImageSize,
  );
}
