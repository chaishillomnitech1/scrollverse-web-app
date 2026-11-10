import { describe, expect, it } from "vitest";
import {
  approvalBoundaries,
  engineRecords,
  evidenceSnapshotAt,
  integrationRecords,
} from "./omniControlTowerRegistry";

describe("Omni Control Tower registry baseline", () => {
  it("contains all six Fusion engines exactly once", () => {
    expect(engineRecords.map((engine) => engine.id)).toEqual([
      "atlas",
      "nexus",
      "deployment",
      "legion",
      "creator",
      "archive",
    ]);
  });

  it("uses unique provider identifiers and records evidence for every provider", () => {
    const ids = integrationRecords.map((provider) => provider.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(integrationRecords.length).toBeGreaterThanOrEqual(20);
    for (const provider of integrationRecords) {
      expect(provider.name.trim().length).toBeGreaterThan(0);
      expect(provider.evidence.trim().length).toBeGreaterThan(0);
      expect(provider.note.trim().length).toBeGreaterThan(0);
      expect([
        "verified",
        "not-verified",
        "not-applicable",
      ]).toContain(provider.productionActive);
    }
  });

  it("keeps the evidence baseline explicitly dated", () => {
    expect(evidenceSnapshotAt).toMatch(/^\\d{4}-\\d{2}-\\d{2}$/);
  });

  it("defines approval boundaries for consequential actions", () => {
    expect(approvalBoundaries.length).toBeGreaterThanOrEqual(5);
    expect(approvalBoundaries.some((item) => item.action.toLowerCase().includes("migration"))).toBe(true);
    expect(approvalBoundaries.some((item) => item.action.toLowerCase().includes("financial"))).toBe(true);
  });
});
