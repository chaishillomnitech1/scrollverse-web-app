import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 734 — Retained Photo Visual Intake", () => {
  it("registers the bounded retained photo intake route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import RetainedPhotoIntake from "./pages/RetainedPhotoIntake"');
    expect(app).toContain('<Route path="/retained-photo-intake" component={RetainedPhotoIntake} />');
  });

  it("preserves five protected source records, apparent garment-view context, and stable fingerprints", () => {
    const page = read("client/src/pages/RetainedPhotoIntake.tsx");
    for (const file of ["213C0867-6158-40B6-817B-42022E4F7A01.JPEG", "526A115A-A193-40FD-86D4-6C4039FDE654.JPG", "537e040995459d6aaa78426d04d1a3c5.JPEG", "605b48a13d2552c4a7c79d87d0a32816.JPEG", "68B08323-83CC-4F5D-B3C2-1261491780FF.JPG"]) expect(page).toContain(file);
    expect(page).toContain("Apparent garment-view complement");
    expect(page).toContain("24d34a3244a98fc283f61b707597fbec3b7842149b52b7cf7c47079e20d31546");
    expect(page).toContain("fbb86c9f7926fcf264afdb32302a63d3fc1db436ab88b3f5cbb733c9f4b820ed");
  });

  it("keeps protected people, apparel, marks, and performance-style imagery outside release claims", () => {
    const page = read("client/src/pages/RetainedPhotoIntake.tsx");
    expect(page).toContain("NO IMAGE REPUBLICATION");
    expect(page).toContain("No source images are displayed");
    expect(page).toContain("No brand ownership, production, inventory, sizing, quality, price, sale, license, rights, or release claim");
    expect(page).toContain("scrollverse-retained-photo-intake.json");
  });
});
