#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch (e) {
    return "";
  }
}

const args = process.argv.slice(2);
const scanAll = args.includes("--all");

function listStagedFiles() {
  const out = run("git diff --cached --name-only --diff-filter=ACM");
  if (!out) return [];
  return out.split(/\r?\n/).filter(Boolean);
}

function listAllFiles() {
  const out = run("git ls-files");
  if (!out) return [];
  return out.split(/\r?\n/).filter(Boolean);
}

const files = scanAll ? listAllFiles() : listStagedFiles();
if (files.length === 0) {
  console.log(
    scanAll ? "No files in repo to scan." : "No staged files to scan."
  );
  process.exit(0);
}

const ignoreNames = [
  "node_modules/",
  "dist/",
  ".next/",
  ".git/",
  "pnpm-lock.yaml",
  "pnpm-lock.yaml.tmp",
];

function isIgnored(file) {
  for (const ign of ignoreNames) if (file.includes(ign)) return true;
  return false;
}

const rules = [
  { name: "AWS Access Key ID", regex: /AKIA[0-9A-Z]{16}/g },
  { name: "Google API Key", regex: /AIza[0-9A-Za-z\-_]{35}/g },
  { name: "Slack Token", regex: /xox[baprs]-[0-9A-Za-z-]+/g },
  {
    name: "JWT (likely)",
    regex: /eyJ[0-9A-Za-z_-]+\.[0-9A-Za-z_-]+\.[0-9A-Za-z_-]+/g,
  },
  { name: "Private key block", regex: /-----BEGIN (?:RSA )?PRIVATE KEY-----/g },
  // generic patterns: api_key, secret, token assignments
  {
    name: "Likely API/Secret assignment",
    regex:
      /(?:api[_-]?key|secret|client[_-]?secret|token)[\s'"`:=]{1,6}[A-Za-z0-9\-_=+\/\.]{8,}/gi,
  },
];

let found = [];

for (const file of files) {
  if (isIgnored(file)) continue;
  const abs = path.resolve(process.cwd(), file);
  if (!fs.existsSync(abs)) continue;
  // skip binary files by extension
  const textExt = [
    ".js",
    ".ts",
    ".json",
    ".env",
    ".md",
    ".env.local",
    ".yaml",
    ".yml",
    ".txt",
    ".pem",
    ".cfg",
    ".conf",
  ];
  const ext = path.extname(file).toLowerCase();
  if (
    !textExt.includes(ext) &&
    path.basename(file).indexOf(".") === -1 &&
    file.length > 0
  ) {
    // if no extension, try reading but limit size
  }
  let content = "";
  try {
    content = fs.readFileSync(abs, { encoding: "utf8" });
  } catch (e) {
    // skip unreadable files
    continue;
  }
  for (const r of rules) {
    const matches = content.match(r.regex);
    if (matches && matches.length) {
      const uniq = Array.from(new Set(matches));
      // filter out obvious false positives
      const filtered = uniq
        .filter((m) => {
          const mm = String(m);
          const low = mm.toLowerCase();
          // common placeholders or markers
          if (
            low.includes("your-") ||
            low.includes("your_") ||
            low.includes("encrypted") ||
            low.includes("z.string") ||
            low.includes("process.env") ||
            low.includes("_env")
          )
            return false;
          // skip truncated / redacted examples that use ellipsis (e.g. "Z7rzVUG...") or Unicode ellipsis
          if (mm.includes("...") || mm.includes("…")) return false;
          // skip matches that look like variable names (ALL_CAPS_WITH_UNDERSCORES) or simple identifiers
          const stripped = mm.replace(/[^A-Z0-9_]/g, "");
          if (
            !/["'`]/.test(mm) &&
            /^[A-Z0-9_]+$/.test(stripped) &&
            stripped.length <= 40
          )
            return false;
          // skip very short tokens
          if (mm.length < 8) return false;
          // skip matches that look like code expressions (property access or function calls) unless they are quoted literals
          // e.g. token = authz.slice(7) -> contains '.' or '(' and is not a quoted string -> false positive
          if (!/["'`]/.test(mm)) {
            if (mm.includes("(") || /[A-Za-z0-9_]+\.[A-Za-z0-9_]+/.test(mm))
              return false;
          }
          // For generic "Likely API/Secret assignment" require a quote or presence of digits/dashes/base64-like chars to reduce noise
          if (r.name === "Likely API/Secret assignment") {
            if (
              !/["'`]/.test(mm) &&
              !/[0-9]{6,}/.test(mm) &&
              !/[-\/+=]/.test(mm)
            )
              return false;
          }
          return true;
        })
        .slice(0, 5);

      if (filtered.length) {
        found.push({ file, rule: r.name, matches: filtered });
      }
    }
  }
}

if (found.length) {
  console.error("\nPossible secrets detected!\n");
  for (const f of found) {
    console.error(`- ${f.file} — ${f.rule}`);
    for (const m of f.matches) console.error(`    ${m}`);
  }
  console.error(
    "\nIf these are false positives, adjust ignoreNames or rules in scripts/check-secrets.js."
  );
  console.error("Aborting commit/push.");
  process.exit(1);
} else {
  console.log("No obvious secrets detected.");
  process.exit(0);
}
