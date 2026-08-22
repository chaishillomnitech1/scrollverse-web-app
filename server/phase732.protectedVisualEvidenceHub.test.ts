import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 732 — Protected Visual Evidence Hub", () => {
  it("registers the unified protected visual evidence hub route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import ProtectedVisualEvidenceHub from "./pages/ProtectedVisualEvidenceHub"');
    expect(app).toContain('<Route path="/protected-visual-evidence-hub" component={ProtectedVisualEvidenceHub} />');
  });

  it("unifies the three visual evidence lanes without republishing protected images", () => {
    const page = read("client/src/pages/ProtectedVisualEvidenceHub.tsx");
    for (const route of ["/protected-visual-intake", "/retained-image-intake", "/generic-retained-image-intake"]) expect(page).toContain(route);
    expect(page).toContain("5 EVIDENCE LANES");
    expect(page).toContain("No protected image bytes are republished");
    expect(page).toContain("5 source files · 4 unique visuals");
  });

  it("keeps creator, gallery, power-index, local-export, and correction handoffs browser-local", () => {
    const page = read("client/src/pages/ProtectedVisualEvidenceHub.tsx");
    for (const route of ["/creator-visual-intake-atlas", "/sovereign-cartoon-gallery", "/empire-power-index"]) expect(page).toContain(route);
    expect(page).toContain("scrollverse-protected-visual-evidence-hub.json");
    expect(page).toContain("BROWSER-LOCAL CORRECTION PATH");
  });
});
