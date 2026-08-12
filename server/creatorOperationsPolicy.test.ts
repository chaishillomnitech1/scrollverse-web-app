import { describe, expect, it } from "vitest";
import { CREATOR_OPERATIONS_BOUNDARY, canSubmitReleaseAssetForFeedback } from "@shared/creatorOperationsPolicy";

describe("Creator Operations release boundary", () => {
  it("only permits draft or information-requested records to move to completeness feedback", () => {
    expect(canSubmitReleaseAssetForFeedback("DRAFT")).toBe(true);
    expect(canSubmitReleaseAssetForFeedback("NEEDS_INFO")).toBe(true);
    expect(canSubmitReleaseAssetForFeedback("SUBMITTED")).toBe(false);
    expect(canSubmitReleaseAssetForFeedback("ACKNOWLEDGED")).toBe(false);
  });

  it("keeps first-party review distinct from platform, legal, and commercial decisions", () => {
    expect(CREATOR_OPERATIONS_BOUNDARY).toContain("not external-store acceptance");
    expect(CREATOR_OPERATIONS_BOUNDARY).toContain("not legal clearance");
    expect(CREATOR_OPERATIONS_BOUNDARY).toContain("not commercial approval");
  });
});
