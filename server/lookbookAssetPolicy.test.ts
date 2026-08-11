import { describe, expect, it } from "vitest";
import { validateLookbookAssetReferences } from "../shared/lookbookAssetPolicy";

describe("lookbook asset policy", () => {
  it("rejects s3 placeholders and staging labels from approval eligibility", () => {
    const review = validateLookbookAssetReferences([
      "s3://omnitech-vault/atlantis/set1-hero-300dpi.png",
      "https://cdn.example.test/atlantis/staging-detail.png",
    ]);
    expect(review.eligible).toBe(false);
    expect(review.reasons).toHaveLength(2);
  });

  it("accepts a managed browser-deliverable reference for a later human review", () => {
    expect(validateLookbookAssetReferences(["https://files.manuscdn.com/approved/atlantis-hero.png"])).toEqual({ eligible: true, reasons: [] });
  });
});
