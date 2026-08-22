import { describe, expect, it } from "vitest";
import fs from "node:fs";
const read = (file: string) => fs.readFileSync(file, "utf8");
const page = read("client/src/pages/NextRetainedImageIntake.tsx");
describe("Phase 738 retained evidence intake", () => {
  it("preserves five records without displaying protected images", () => {
    expect(page).toContain("NRI-005");
    expect(page).toContain("Source images are not displayed or republished");
    expect(page).toContain("next-retained-image-intake");
  });

  it("keeps the research route discoverable across the evidence hub and primary route maps", () => {
    for (const file of ["client/src/pages/ProtectedVisualEvidenceHub.tsx", "client/src/pages/EmpirePowerIndex.tsx", "client/src/pages/RouteIntegrityIndex.tsx", "client/src/pages/Home.tsx"]) {
      expect(read(file)).toContain("next-retained-image-intake");
    }
  });
});
