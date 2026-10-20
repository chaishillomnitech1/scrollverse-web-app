import { describe, expect, it } from "vitest";
import {
  filterInvestorRelationRecords,
  sortInvestorRelationRecords,
} from "../client/src/lib/investorRelations";
import {
  filterVisitorObservations,
  sortVisitorObservations,
  VISITOR_OBSERVATIONS,
} from "../client/src/lib/visitorObservations";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("Phase 962 local dashboard enhancements", () => {
  it("filters the Investor Relations catalog by still, motion, or all", () => {
    expect(filterInvestorRelationRecords("motion")).toHaveLength(3);
    expect(filterInvestorRelationRecords("still")).toHaveLength(6);
    expect(filterInvestorRelationRecords("all")).toHaveLength(9);
  });

  it("sorts Investor Relations records without mutating the source order", () => {
    const original = filterInvestorRelationRecords("all");
    const sorted = sortInvestorRelationRecords(original, "title-desc");
    expect(sorted.map((record) => record.id)).not.toEqual(original.map((record) => record.id));
    expect(original).toHaveLength(9);
  });

  it("filters and sorts visitor observations by metric and displayed value", () => {
    expect(filterVisitorObservations("engagement")).toEqual(
      expect.arrayContaining([expect.objectContaining({ metric: "duration" })]),
    );
    const values = sortVisitorObservations(VISITOR_OBSERVATIONS, "value-desc");
    expect(values[0].value).toBeGreaterThanOrEqual(values.at(-1)!.value);
  });

  it("labels both new interactive surfaces as source-labeled local displays", () => {
    const investor = read("client/src/pages/InvestorRelations.tsx");
    const metrics = read("client/src/pages/OmniMetrics.tsx");
    expect(investor).toContain("Motion to still masterpieces");
    expect(investor).toContain("aria-live");
    expect(investor).toContain("motion-reduce");
    expect(metrics).toContain("Visitor observation records");
    expect(metrics).toContain("aria-live");
    expect(metrics).toContain("Sort observations");
  });
});
