import { describe, expect, it } from "vitest";
import { EVIDENCE_SYSTEMS, summarizeEvidenceSystems } from "@shared/evidenceStandards";

describe("ScrollVerse evidence and standards model", () => {
  it("keeps every system inside an explicit public status vocabulary", () => {
    const summary = summarizeEvidenceSystems();
    expect(summary).toHaveLength(4);
    expect(summary.reduce((total, item) => total + item.count, 0)).toBe(EVIDENCE_SYSTEMS.length);
    expect(EVIDENCE_SYSTEMS.map(system => system.status)).toContain("FIRST_PARTY_IMPLEMENTED");
    expect(EVIDENCE_SYSTEMS.map(system => system.status)).toContain("EXTERNAL_OPTIONAL");
    expect(EVIDENCE_SYSTEMS.map(system => system.status)).toContain("CONCEPTUAL");
  });

  it("requires a boundary disclosure alongside every public evidence record", () => {
    for (const system of EVIDENCE_SYSTEMS) {
      expect(system.name).not.toHaveLength(0);
      expect(system.evidence).not.toHaveLength(0);
      expect(system.boundary).not.toHaveLength(0);
      expect(system.href.startsWith("/")).toBe(true);
    }
  });
});
