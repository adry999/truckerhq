// Lists launch placeholders (XXX phone/prices, outline legal text) left in src/.
// Warn-only by default so CI and staging builds stay green until real values
// exist. Strict (fails) with --strict or on an indexable build, which runs this
// before `next build`: search engines must never index placeholder pages.
// shortcut: reads only the real process env, not .env files; set
// NEXT_PUBLIC_INDEXABLE in the host's env (Hostinger panel), as the runbook says.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
// The last pattern catches bracketed drafting notes such as "[To be written by your lawyer.]".
const PATTERNS = [/X{3,}/, /Outline only/, /\b00000\b/, /"\[[A-Z][^"\]]*\]"/];
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";
const strict = process.argv.includes("--strict") || indexable;
const inCi = Boolean(process.env.GITHUB_ACTIONS);

// Without it canonicals, sitemap and JSON-LD point at http://localhost:3000.
if (indexable && !/^https:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL ?? "")) {
  console.error("NEXT_PUBLIC_INDEXABLE=true needs NEXT_PUBLIC_SITE_URL set to the https:// domain.");
  process.exit(1);
}

function* sourceFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) yield path;
  }
}

const hits = [];
for (const file of sourceFiles(SRC)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (PATTERNS.some((p) => p.test(line))) {
        hits.push({ file: relative(ROOT, file).replaceAll("\\", "/"), line: i + 1, text: line.trim() });
      }
    });
}

const level = strict ? "error" : "warning";
for (const hit of hits) {
  console.log(
    inCi
      ? `::${level} file=${hit.file},line=${hit.line}::Placeholder: ${hit.text.slice(0, 120)}`
      : `${hit.file}:${hit.line}  ${hit.text.slice(0, 120)}`,
  );
}
console.log(`${hits.length} placeholder(s) found.`);
if (strict && hits.length > 0 && indexable) {
  console.error("Indexable build blocked: replace the placeholders above, or unset NEXT_PUBLIC_INDEXABLE.");
}
process.exit(strict && hits.length > 0 ? 1 : 0);
