import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 720 — Creator Visual Intake Atlas", () => {
  it("unifies the two completed visual intake families into ten source records", () => {
    const page = read("client/src/pages/CreatorVisualIntakeAtlas.tsx");
    expect(page).toContain("10 SOURCE RECORDS");
    expect(page).toContain('family: "Sticker variants"');
    expect(page).toContain('family: "Artifact variants"');
    expect(page).toContain("SV-STICKER-001");
    expect(page).toContain("SV-ARTIFACT-005");
  });

  it("provides filters, local export, source boundaries, and intake handoffs without republishing images", () => {
    const page = read("client/src/pages/CreatorVisualIntakeAtlas.tsx");
    expect(page).toContain("ALL FAMILIES");
    expect(page).toContain("Creator visual atlas exported.");
    expect(page).toContain("does not republish protected source images");
    expect(page).toContain("/creator-sticker-intake");
    expect(page).toContain("/creator-artifact-intake");
    expect(page).toContain("/sovereign-cartoon-gallery");
    expect(page).toContain("/empire-power-index");
  });

  it("registers the browser-local Creator Visual Intake Atlas route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/creator-visual-intake-atlas"');
    expect(app).toContain("CreatorVisualIntakeAtlas");
  });
});
