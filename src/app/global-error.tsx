"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "#16181B",
          color: "#F7F7F5",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>
          Something went wrong
        </h1>
        <button
          onClick={() => retry()}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            background: "#F2A900",
            color: "#16181B",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
