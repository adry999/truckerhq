import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    setupFiles: ["tests/support/setup-dom.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/app/**/opengraph-image.tsx",
      ],
      reporter: ["text-summary", "html"],
      // Ratchet these up as coverage grows.
      thresholds: { lines: 23, statements: 24, functions: 20, branches: 17 },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      // "server-only" throws on plain import outside Next's bundler, which
      // sets the "react-server" export condition to swap it for a no-op.
      // Vitest runs in plain Node, so alias it to that same no-op directly.
      "server-only": path.resolve(import.meta.dirname, "./node_modules/server-only/empty.js"),
    },
  },
});
