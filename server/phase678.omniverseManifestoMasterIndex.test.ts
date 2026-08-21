import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 678 Omniverse Manifesto Master Index", () => {
  it("maps the full recovered constellation into six source-labeled volumes", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoMasterIndex.tsx"), "utf8");
    expect(page).toContain("Names & Interface");
    expect(page).toContain("Archive Oath");
    expect(page).toContain("51 visible titles");
    expect(page).toContain("Pasted_content_03.txt");
  });

  it("preserves the no-unseen-content boundary and protected-attachment distinction", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoMasterIndex.tsx"), "utf8");
    expect(page).toContain("does not infer unseen conversation content");
    expect(page).toContain("without treating restoration, completion, deployment, or ownership claims as independently verified");
  });

  it("registers the Master Index as a portal route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path="/omniverse-manifesto-master-index"');
    expect(app).toContain("OmniverseManifestoMasterIndex");
  });
});
