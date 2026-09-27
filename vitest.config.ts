import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "server-only" throws on plain import outside Next's bundler, which
      // sets the "react-server" export condition to swap it for a no-op.
      // Vitest runs in plain Node, so alias it to that same no-op directly.
      "server-only": path.resolve(__dirname, "./node_modules/server-only/empty.js"),
    },
  },
});
