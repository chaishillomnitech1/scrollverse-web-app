import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 764 — Portfolio Asset Evidence Inventory", () => {
  it("registers the browser-local asset-evidence route", () => {
    expect(read("client/src/App.tsx")).toContain('path="/portfolio-asset-evidence-inventory" component={PortfolioAssetEvidenceInventory}');
  });

  it("includes physical, material, digital, and business asset context fields with local export actions", () => {
    const page = read("client/src/pages/PortfolioAssetEvidenceInventory.tsx");
    for (const label of ["Physical", "Material", "Digital", "Business", "Asset category", "Evidence reference", "Owner-entered status"]) expect(page).toContain(label);
    expect(page).toContain("Copy local evidence packet");
    expect(page).toContain("Download local JSON");
  });

  it("keeps the inventory outside appraisal, ownership, collateral, and funding claims", () => {
    const page = read("client/src/pages/PortfolioAssetEvidenceInventory.tsx");
    expect(page).toContain("The inventory does not upload or inspect evidence, verify ownership, determine market value, perform an appraisal, establish title, create collateral");
    expect(read("docs/phase764-portfolio-asset-evidence-inventory.md")).toContain("It does not verify ownership, appraise an item, determine market value, establish collateral eligibility");
  });
});
