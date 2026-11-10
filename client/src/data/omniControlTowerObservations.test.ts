import { describe, expect, it } from "vitest";
import { controlTowerObservations } from "./omniControlTowerObservations";

describe("Control Tower observation ledger", () => {
  it("uses unique observation IDs and valid observation dates", () => {
    const ids = controlTowerObservations.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of controlTowerObservations) {
      expect(item.provider).toBeTruthy();
      expect(item.sourceLabel).toBeTruthy();
      expect(item.sourceUrl).toMatch(/^https:\/\//);
      expect(Number.isNaN(Date.parse(item.observedAt))).toBe(false);
    }
  });

  it("preserves the merged main commit as a GitHub API observation", () => {
    const merge = controlTowerObservations.find((item) => item.id === "github-pr-22-merge");
    expect(merge?.status).toBe("merged");
    expect(merge?.environment).toBe("main");
    expect(merge?.commitSha).toBe("6594fdb04190263aa3edf81c6ab78d5270907873");
  });

  it("does not invent Vercel deployment identifiers or URLs", () => {
    const status = controlTowerObservations.find((item) => item.id === "vercel-main-commit-status");
    const preview = controlTowerObservations.find((item) => item.id === "vercel-pr-22-preview-ready");
    expect(status?.status).toBe("success");
    expect(status?.environment).toBe("unspecified");
    expect(status?.deploymentId).toBeUndefined();
    expect(status?.deploymentUrl).toBeUndefined();
    expect(preview?.source).toBe("owner-confirmed");
    expect(preview?.environment).toBe("preview");
    expect(preview?.deploymentUrl).toBeUndefined();
  });
});
