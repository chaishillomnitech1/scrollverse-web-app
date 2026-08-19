import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 488 — Google and collective protected intake", () => {
  it("keeps the supplied material documented as protected, source-labeled, and non-executable", () => {
    const intake = readProjectFile("docs/phase488-google-collective-and-visual-asset-intake.md");

    expect(intake).toContain("protected intake; source-labeled; non-executable; no public release");
    expect(intake).toContain("Do not run the embedded shell sample");
    expect(intake).toContain("No embedded script, command, API call, wallet address");
    expect(intake).toContain("Before a supplied text or visual is displayed publicly");
  });

  it("adds a protected registry card that leads only to browser-local catalog readiness", () => {
    const registry = readProjectFile("client/src/pages/AssetRegistry.tsx");

    expect(registry).toContain('id: "SV-INTAKE-488"');
    expect(registry).toContain("Google + Collective Intake");
    expect(registry).toContain("Protected review · rights and claims unverified");
    expect(registry).toContain('href: "/creator-catalog-readiness"');
    expect(registry).toContain("No public, listing, mint, sale, or provider action is active.");
  });
});
