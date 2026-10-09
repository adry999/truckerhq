// Lists launch placeholders (XXX phone/prices, outline legal text) left in src/.
// Warn-only by default so CI stays green until real values exist; pass
// --strict to fail the run once they should all be filled in.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const PATTERNS = [/X{3,}/, /Outline only/, /\b00000\b/];
const strict = process.argv.includes("--strict");
const inCi = Boolean(process.env.GITHUB_ACTIONS);

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
process.exit(strict && hits.length > 0 ? 1 : 0);
