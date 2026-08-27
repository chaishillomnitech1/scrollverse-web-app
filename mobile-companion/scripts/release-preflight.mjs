import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(currentDirectory, "..");
const portalRoot = path.resolve(sourceRoot, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(sourceRoot, relativePath), "utf8");
}

function containsAll(value, expected) {
  return expected.every((entry) => value.includes(entry));
}

const config = read("app.config.ts");
const tabs = read("app/(tabs)/_layout.tsx");
const portal = read("lib/portal.ts");
const packet = fs.readFileSync(
  path.join(portalRoot, "docs/scrollverse-app-store-owner-packet.md"),
  "utf8",
);
const easConfigExists = fs.existsSync(path.join(sourceRoot, "eas.json"));

const checks = [
  {
    label: "Source-only application identity is present",
    passes: containsAll(config, [
      'name: "ScrollVerse Mobile Companion"',
      'slug: "scrollverse-mobile-companion"',
      'scheme: "scrollversecompanion"',
    ]),
  },
  {
    label: "Store-bound iOS and Android identifiers are absent",
    passes: !config.includes("bundleIdentifier:") && !config.includes("package:"),
  },
  {
    label: "No EAS submission profile is configured",
    passes: !easConfigExists,
  },
  {
    label: "All five companion tabs are registered",
    passes: containsAll(tabs, [
      'name="index"',
      'name="omniland"',
      'name="mirror"',
      'name="create"',
      'name="sources"',
    ]),
  },
  {
    label: "Portal handoffs remain first-party ScrollVerse routes",
    passes: containsAll(portal, [
      'PORTAL_ORIGIN = "https://scrollverse.co"',
      'mirror: "/chais-sabir-allah-mirror"',
      'create: "/episode-brief-builder"',
    ]),
  },
  {
    label: "Owner release packet includes privacy and final-release gates",
    passes: containsAll(packet, [
      "Current source-kit baseline",
      "Privacy, data safety, and browser handoff review",
      "Final-release rule",
    ]),
  },
];

const failedChecks = checks.filter((check) => !check.passes);

console.log("ScrollVerse Mobile Companion — source-only release-gate preflight");
for (const check of checks) {
  console.log(`${check.passes ? "PASS" : "FAIL"}  ${check.label}`);
}

if (failedChecks.length > 0) {
  console.error(`\nPreflight stopped: ${failedChecks.length} release-gate check(s) require review.`);
  process.exitCode = 1;
} else {
  console.log("\nPreflight passed: source-only boundaries remain intact. No store action has been performed.");
}
