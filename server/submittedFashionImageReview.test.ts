import { describe, expect, it } from "vitest";
import { submittedFashionImageReview } from "../shared/submittedFashionImageReview";

describe("submitted fashion image review ledger", () => {
  it("keeps all submitted candidates pending and unlinked from catalog approval", () => {
    expect(submittedFashionImageReview).toHaveLength(29);
    expect(submittedFashionImageReview.every(item => item.status === "PENDING_SOURCE_RIGHTS_AND_SKU_REVIEW")).toBe(true);
    expect(submittedFashionImageReview.every(item => item.tentativeCollectionFit === "UNASSIGNED" || item.tentativeCollectionFit === "COLLECTION_OVERVIEW")).toBe(true);
  });
});
