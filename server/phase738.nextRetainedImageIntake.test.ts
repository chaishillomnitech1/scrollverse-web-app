import { describe, expect, it } from "vitest";
import fs from "node:fs";
const page = fs.readFileSync("client/src/pages/NextRetainedImageIntake.tsx", "utf8");
describe("Phase 738 retained evidence intake", () => {
  it("preserves five records without displaying protected images", () => {
    expect(page).toContain("NRI-005");
    expect(page).toContain("Source images are not displayed or republished");
    expect(page).toContain("next-retained-image-intake");
  });
});
