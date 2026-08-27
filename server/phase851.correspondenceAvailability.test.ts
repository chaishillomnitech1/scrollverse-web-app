import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 851 correspondence and transmission availability", () => {
  it("makes the available source trail findable without reconstructing absent email evidence", () => {
    const repository = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/SpecialRepository.tsx"), "utf8");
    const registry = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(repository).toContain("SV-DIGI-MIRROR-AVAIL-001");
    expect(repository).toContain("Creator Correspondence + Transmission Availability");
    expect(repository).toContain("does not reconstruct unavailable correspondence");
    expect(registry).toContain("SRC-027");
    expect(registry).toContain("No original email files, message headers, sender details");
    expect(registry).toContain('localHref: "/special-repository"');
  });
});
