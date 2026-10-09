import { readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Module boundaries: app -> features -> shared/server. See
// .claude/skills/project-conventions/SKILL.md. Each block owns its files, because
// a later no-restricted-imports entry replaces an earlier one instead of merging.
const FEATURES = readdirSync(new URL("./src/features", import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const noFeatureImports = {
  group: ["@/features/*", "@/features/*/**"],
  message: "shared/ and server/ must not depend on a feature.",
};

const boundaryRules = [
  ...FEATURES.map((feature) => ({
    files: [`src/features/${feature}/**`],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["@/features/*", "@/features/*/**", `!@/features/${feature}`, `!@/features/${feature}/**`],
            message: "A feature never imports another feature. Use a port wired in app/, or move the shared part to shared/.",
          },
          {
            group: ["@/components/*", "@/app/*", "@/app/**"],
            message: "Features may depend only on shared/, server/ and lib/.",
          },
          {
            group: ["../../*", "../../**"],
            message: `Import across layers with @/features/${feature}/... instead of a deep relative path.`,
          },
        ],
      }],
    },
  })),
  {
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          noFeatureImports,
          { group: ["@/components/*", "@/app/**", "@/server/**"], message: "shared/ must not depend on components/, app/ or server/." },
        ],
      }],
    },
  },
  {
    files: ["src/server/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          noFeatureImports,
          { group: ["@/components/*", "@/app/**", "@/shared/ui/**", "@/shared/hooks/**"], message: "server/ must not depend on UI code." },
        ],
      }],
    },
  },
  {
    files: ["src/**"],
    ignores: ["src/features/**", "src/shared/**", "src/server/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@/features/*/*", "@/features/*/**"], message: "Import a feature only through its index: @/features/<name>." },
        ],
      }],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...boundaryRules,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference copies of the original Claude Design prototype, not part of the app:
    "docs/design/**",
    "Trucker HQ brand identity/**",
    "test-results/**",
    "playwright-report/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
