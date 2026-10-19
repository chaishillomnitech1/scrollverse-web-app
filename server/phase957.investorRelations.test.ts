import { describe, expect, it } from "vitest";
import { INVESTOR_RELATIONS_RECORDS, getInvestorRelationSummary } from "@/lib/investorRelations";

describe("Phase 957 — local Investor Relations surface", () => {
  it("registers both still and motion records with source labels", () => {
    expect(INVESTOR_RELATIONS_RECORDS.some((record) => record.kind === "still")).toBe(true);
    expect(INVESTOR_RELATIONS_RECORDS.some((record) => record.kind === "motion")).toBe(true);
    expect(INVESTOR_RELATIONS_RECORDS.every((record) => record.sourceLabel.length > 0)).toBe(true);
    expect(INVESTOR_RELATIONS_RECORDS.every((record) => record.displayScope === "source-labeled local display")).toBe(true);
  });

  it("reports a local catalog summary without implying investment or deployment status", () => {
    const summary = getInvestorRelationSummary(INVESTOR_RELATIONS_RECORDS);
    expect(summary.total).toBe(INVESTOR_RELATIONS_RECORDS.length);
    expect(summary.stills).toBeGreaterThan(0);
    expect(summary.motion).toBeGreaterThan(0);
    expect(summary.externalActions).toBe("none");
  });
});
