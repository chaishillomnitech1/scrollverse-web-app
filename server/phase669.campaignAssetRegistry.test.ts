import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.resolve(root, "client/src/pages/CampaignAssetRegistry.tsx"), "utf8");
const app = fs.readFileSync(path.resolve(root, "client/src/App.tsx"), "utf8");

describe("Phase 669 Campaign Asset Registry", () => {
  it("records verified visual assets with source records and public-release boundaries", () => {
    expect(page).toContain("SV-CAM-001");
    expect(page).toContain("SV-CAM-002");
    expect(page).toContain("SV-CAM-003");
    expect(page).toContain("requires owner-defined destination, intended-use scope, and final release decision");
    expect(page).toContain("This registry does not post, advertise, submit, upload, boost, license, sell");
  });

  it("registers the campaign asset registry route", () => {
    expect(app).toContain("CampaignAssetRegistry");
    expect(app).toContain('path={"/campaign-asset-registry"}');
  });
});
