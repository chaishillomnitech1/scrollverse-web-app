import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 638 — Digital Intelligence Safeguards", () => {
  it("registers the safeguard workspace and public discovery entry", () => {
    expect(read("client/src/App.tsx")).toContain('path={"/digital-intelligence-safeguards"}');
    expect(read("client/src/pages/Home.tsx")).toContain('href: "/digital-intelligence-safeguards"');
  });

  it("keeps owner-held, proposed, and public-reference records visibly distinct", () => {
    const page = read("client/src/pages/DigitalIntelligenceSafeguards.tsx");
    for (const text of ["OWNER-HELD", "PROPOSED", "PUBLIC REFERENCE", "Creator identity record", "Protection stewardship intent", "Responsible-AI reference set"]) expect(page).toContain(text);
    expect(page).toContain("This owner-stated record is held in the ScrollVerse source trail");
    expect(page).toContain('externalPath: "Use the exact provider or public record where applicable"');
  });

  it("includes browser-local corrections, JSON export, and independent public-reference sources", () => {
    const page = read("client/src/pages/DigitalIntelligenceSafeguards.tsx");
    const log = read("docs/phase638-public-safeguard-source-log.md");
    expect(page).toContain("Browser-local correction");
    expect(page).toContain("Local safeguard record exported.");
    for (const title of ["OECD AI Principles", "NIST AI RMF", "NIST AI 100-4", "NIST AI 600-1"]) expect(log).toContain(title);
  });
});
