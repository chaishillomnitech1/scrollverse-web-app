import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 692 — Protected visual batch intake", () => {
  it("records all five supplied visual sources as source-bounded evidence entries", () => {
    const page = read("client/src/pages/ProtectedVisualBatchIntake.tsx");
    expect(page).toContain("IMG_1520.png");
    expect(page).toContain("IMG_1521.png");
    expect(page).toContain("IMG_1522.png");
    expect(page).toContain("IMG_1523.png");
    expect(page).toContain("IMG_1524.png");
    expect(page).toContain("PVB-692-05");
  });

  it("does not treat the third-party visual language as an approved health, scientific, offer, account, or publication state", () => {
    const page = read("client/src/pages/ProtectedVisualBatchIntake.tsx");
    expect(page).toContain("The pixels stay protected.");
    expect(page).toContain("not a verified capability, medical claim, public offer, account connection, or release authorization");
    expect(page).toContain("does not verify a health, therapy, scientific, operational, audio, or product claim");
    expect(page).toContain("No protected image pixels are displayed or exported");
    expect(page).toContain('externalAction: "none"');
  });

  it("registers the direct intake route and preserves evidence-hub discovery", () => {
    const app = read("client/src/App.tsx");
    const hub = read("client/src/pages/ProtectedVisualEvidenceHub.tsx");
    expect(app).toContain('path="/protected-visual-batch-intake" component={ProtectedVisualBatchIntake}');
    expect(hub).toContain("PVE-07");
    expect(hub).toContain("/protected-visual-batch-intake");
  });
});
