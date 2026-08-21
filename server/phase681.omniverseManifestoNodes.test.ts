import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 681 Omniverse Manifesto Node Gallery", () => {
  it("preserves individual title-only records for the full 51-node constellation", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoNodes.tsx"), "utf8");
    expect(page).toContain("SV-OMNI-${String(ordinal).padStart(3, \"0\")}");
    expect(page).toContain("[51, \"Image integration options\", \"creative\"]");
    expect(page).toContain("51 INDIVIDUAL · TITLE-ONLY NODES");
    expect(page).toContain("Visible title only");
  });

  it("keeps each node subject to a primary-source expansion gate", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoNodes.tsx"), "utf8");
    expect(page).toContain("requires owner release — dated primary transcript or separately accessioned evidence");
    expect(page).toContain("No unseen text, date, author, result");
    expect(page).toContain("A title is a record, not a reconstruction");
  });

  it("registers both the gallery and individual dynamic node route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path="/omniverse-manifesto-nodes"');
    expect(app).toContain('path="/omniverse-node/:id"');
    expect(app).toContain("OmniverseManifestoNode");
  });
});
