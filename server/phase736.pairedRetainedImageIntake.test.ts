import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");
describe("Phase 736 — Paired Retained Image Intake", () => {
  it("registers the bounded paired intake route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import PairedRetainedImageIntake from "./pages/PairedRetainedImageIntake"');
    expect(app).toContain('<Route path="/paired-retained-image-intake" component={PairedRetainedImageIntake} />');
  });
  it("preserves five sources, one confirmed byte-identical duplicate pair, and stable fingerprints", () => {
    const page = read("client/src/pages/PairedRetainedImageIntake.tsx");
    for (const file of ["6A8DBC25-4183-49B4-9CA1-513D2E815F87.JPEG", "6A8DBC25-4183-49B4-9CA1-513D2E815F87_01.JPEG", "6C7C388D-60E9-45B8-ACB9-8A632BAACD14.JPG", "71C880FF-2BD5-4089-B825-3028DC6DA40C.JPEG", "7209859A-EE8F-431B-B915-63F5B7A6DE3D.JPEG"]) expect(page).toContain(file);
    expect(page).toContain("Byte-identical duplicate pair");
    expect(page).toContain("2e2358306dbfe16f9482b64ed1effe0dcf7f990ed0b91577006cd8123854dcf1");
  });
  it("keeps protected people, scenes, apparel, and external markings outside public claims", () => {
    const page = read("client/src/pages/PairedRetainedImageIntake.tsx");
    expect(page).toContain("No source images are displayed");
    expect(page).toContain("does not establish identity, event, location, attendance, affiliation, brand ownership, rights, inventory, sale, campaign, or release state");
    expect(page).toContain("scrollverse-paired-retained-image-intake.json");
  });
});
