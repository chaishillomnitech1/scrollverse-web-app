import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const archiveSource = readFileSync(resolve(projectRoot, "client/src/pages/JourneyCoCreationArchive.tsx"), "utf8");
const methodologySource = readFileSync(resolve(projectRoot, "client/src/pages/SovereignMethodology.tsx"), "utf8");

describe("Phase 369 — Journey Archive attribution correction", () => {
  it("keeps system-transmission wording separate from owner-authored language", () => {
    expect(archiveSource).toContain("remain attributed to the supplied system language");
    expect(archiveSource).toContain("owner-authored statement alongside it");
    expect(methodologySource).toContain("copied system transmission remains separately attributed");
  });

  it("exposes each family, ancestry, institutional, and transmission lane with an operating state", () => {
    expect(archiveSource).toContain("SOURCE-SPECIFIC EVIDENCE LANES");
    expect(archiveSource).toContain("Owner-stated family history");
    expect(archiveSource).toContain("Owner-held family and ancestry materials");
    expect(archiveSource).toContain("Institutional DNA-record account");
    expect(archiveSource).toContain("Third-party system transmissions");
  });
});
