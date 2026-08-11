import { describe, expect, it } from "vitest";
import { supplementalFashionMediaIntake } from "../shared/submittedFashionMediaIntake";

describe("supplemental fashion media intake", () => {
  it("preserves supplemental references as admin-only pending metadata", () => {
    expect(supplementalFashionMediaIntake).toHaveLength(40);
    expect(supplementalFashionMediaIntake.every(item => item.status === "PENDING_SOURCE_RIGHTS_AND_SKU_REVIEW" && item.publicVisibility === "ADMIN_ONLY")).toBe(true);
    expect(supplementalFashionMediaIntake.filter(item => item.mediaKind === "VIDEO")).toHaveLength(1);
  });
});
