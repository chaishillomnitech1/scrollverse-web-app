import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 726 — Retained Image Visual Intake", () => {
  it("registers the browser-local protected-image intake route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import RetainedImageIntake from "./pages/RetainedImageIntake"');
    expect(app).toContain('<Route path="/retained-image-intake" component={RetainedImageIntake} />');
  });

  it("records all five fingerprints and suppresses financial and external claims", () => {
    const page = read("client/src/pages/RetainedImageIntake.tsx");
    for (const file of ["IMG_1467.png", "IMG_1468.png", "IMG_1473.png", "IMG_1474.png", "IMG_1494.jpeg"]) expect(page).toContain(file);
    for (const hash of ["27b46ad20d3cae17b0190081f69e97c1809a883d3790272df5c0c4e6551fe905", "af8df1a654aded73ff432e1dc5b1988035310c737c06537d4fc95abc018227af", "e363172a8bfbf3189f70f0b4a63f8947e58d8644240bca04a87d30878c920a26", "6b846f872d7701895df0a4dcdff9ea3e85a796559f26c51c9060ddf74c28aa74", "e802516a82b4e47262cf95fee9827decf8d0f36066589e64fa79e0f3bd551937"]) expect(page).toContain(hash);
    expect(page).toContain("numerical display intentionally withheld");
    expect(page).toContain("No claim about real people, organizations, events, political systems");
    expect(page).toContain("No image bytes are republished");
  });

  it("keeps local export, correction, and archive handoffs browser-local", () => {
    const page = read("client/src/pages/RetainedImageIntake.tsx");
    expect(page).toContain("scrollverse-retained-image-intake.json");
    expect(page).toContain("BROWSER-LOCAL CORRECTION PATH");
    expect(page).toContain('href="/protected-visual-intake"');
    expect(page).toContain('href="/creator-visual-intake-atlas"');
    expect(page).toContain('href="/empire-power-index"');
  });
});
