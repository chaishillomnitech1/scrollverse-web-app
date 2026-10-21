import { describe, expect, it } from "vitest";
import { filterVisitorObservations, getVisitorObservationStatus, VISITOR_OBSERVATIONS } from "../client/src/lib/visitorObservations";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("Phase 963 gallery lightbox and observation search", () => {
  it("filters visitor observations by category and case-insensitive search text", () => {
    expect(filterVisitorObservations("all", "DURATION").every((item) => item.metric === "duration")).toBe(true);
    expect(filterVisitorObservations("reach", "visitors")).toEqual(
      expect.arrayContaining([expect.objectContaining({ metric: "visitors" })]),
    );
    expect(filterVisitorObservations("quality", "not-a-record")).toHaveLength(0);
  });

  it("provides explicit visual status tags for source observations", () => {
    expect(getVisitorObservationStatus(VISITOR_OBSERVATIONS.find((item) => item.id === "oct20-views-724")!)).toBe("elevated");
    expect(getVisitorObservationStatus(VISITOR_OBSERVATIONS.find((item) => item.id === "oct20-bounce-533")!)).toBe("watch");
  });

  it("exposes an accessible full-size gallery dialog and observation quick search", () => {
    const investor = read("client/src/pages/InvestorRelations.tsx");
    const metrics = read("client/src/pages/OmniMetrics.tsx");
    expect(investor).toContain("View full-size");
    expect(investor).toContain('aria-modal="true"');
    expect(investor).toContain("Close full-size preview");
    expect(metrics).toContain("Search observation records");
    expect(metrics).toContain("status tag");
  });
});
