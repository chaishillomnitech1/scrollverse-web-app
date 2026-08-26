import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(import.meta.dirname, relativePath), "utf8");

describe("Phase 841 — creator-owned source consolidation", () => {
  it("registers the central Omniland Source Atlas and connects it to the portal", () => {
    const app = read("../client/src/App.tsx");
    const omniland = read("../client/src/pages/Omniland.tsx");
    const home = read("../client/src/pages/Home.tsx");

    expect(app).toContain('const OmnilandSourceAtlas = lazy(() => import("@/pages/OmnilandSourceAtlas"))');
    expect(app).toContain('<Route path="/omniland-source-atlas" component={OmnilandSourceAtlas} />');
    expect(omniland).toContain('href="/omniland-source-atlas"');
    expect(home).toContain('title: "Omniland Source Atlas"');
    expect(home).toContain('{ label: "Omniland Atlas", href: "/omniland-source-atlas" }');
  });

  it("consolidates visible concepts while preserving source-label and external-state distinctions", () => {
    const atlas = read("../client/src/pages/OmnilandSourceAtlas.tsx");

    expect(atlas).toContain("Story + character worlds");
    expect(atlas).toContain("Visual + fashion worlds");
    expect(atlas).toContain("Music + media worlds");
    expect(atlas).toContain("Game + learning worlds");
    expect(atlas).toContain("Nia Vale · Orun · Miro");
    expect(atlas).toContain("Lumenwright");
    expect(atlas).toContain("Concepts travel with their source trail.");
    expect(atlas).toContain("does not reproduce restricted artwork");
  });
});
