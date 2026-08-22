import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 729 — Generic Retained Image Visual Intake", () => {
  it("registers the bounded generic retained-image route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import GenericRetainedImageIntake from "./pages/GenericRetainedImageIntake"');
    expect(app).toContain('<Route path="/generic-retained-image-intake" component={GenericRetainedImageIntake} />');
  });

  it("preserves five source files, four unique visuals, and the confirmed byte-identical pair", () => {
    const page = read("client/src/pages/GenericRetainedImageIntake.tsx");
    for (const file of ["082AD519-EB49-4C59-9277-44A5CB297EAE.JPEG", "082AD519-EB49-4C59-9277-44A5CB297EAE_01.JPEG", "0a33ffe9aa3bf28666ba7989631fbd9d.JPEG", "1527a8fb5f8055bd4408f44bed6225d8.JPEG", "17F2D8E0-C117-4F34-8267-FD513FF064DA.JPEG"]) expect(page).toContain(file);
    expect(page).toContain("5 SOURCE FILES · 4 UNIQUE VISUALS");
    expect(page).toContain("Byte-identical to GRI-002");
    expect(page).toContain("Byte-identical to GRI-001");
    expect(page).toContain("d153a78418db94b52c0d18ccd401aa677a5c674d008d48e96f1b9497585eac8e");
  });

  it("keeps photo and apparel sources out of release, commercial, and identity claims", () => {
    const page = read("client/src/pages/GenericRetainedImageIntake.tsx");
    expect(page).toContain("Reference is not release");
    expect(page).toContain("No source images are displayed");
    expect(page).toContain("No brand ownership, production, inventory, sizing, price, sale, license, rights, or release claim");
    expect(page).toContain("scrollverse-generic-retained-image-intake.json");
  });
});
