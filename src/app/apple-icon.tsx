import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E5C3A",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 900,
            fontSize: 84,
            color: "#F7F7F5",
          }}
        >
          HQ
        </div>
      </div>
    ),
    size,
  );
}
