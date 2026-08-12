import { describe, expect, it } from "vitest";
import { CREATOR_OPERATIONS_BOUNDARY, canAssignedReviewerRecordFeedback, canSubmitReleaseAssetForFeedback, releaseAssetRequiresPrivateImage } from "@shared/creatorOperationsPolicy";

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

  it("requires real uploaded imagery only for visual release-material records", () => {
    expect(releaseAssetRequiresPrivateImage("APP_ICON")).toBe(true);
    expect(releaseAssetRequiresPrivateImage("SCREENSHOT")).toBe(true);
    expect(releaseAssetRequiresPrivateImage("STORE_COPY")).toBe(false);
    expect(releaseAssetRequiresPrivateImage("RELEASE_NOTE")).toBe(false);
  });

  it("only lets the assigned internal reviewer record completeness feedback", () => {
    expect(canAssignedReviewerRecordFeedback(42, 42)).toBe(true);
    expect(canAssignedReviewerRecordFeedback(42, 7)).toBe(false);
    expect(canAssignedReviewerRecordFeedback(null, 42)).toBe(false);
  });
});
