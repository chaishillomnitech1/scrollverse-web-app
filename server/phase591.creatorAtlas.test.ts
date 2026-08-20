import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 591 Connected Creator Atlas", () => {
  it("registers the browser-local creator atlas and its major discovery groups", () => {
    const page = read("client/src/pages/CreatorAtlas.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(page).toContain("SCROLLVERSE CREATOR ATLAS");
    expect(page).toContain("Visual Worlds");
    expect(page).toContain("Learn the System");
    expect(page).toContain("Read the Work");
    expect(page).toContain("Source and Continuity");
    expect(page).toContain("PortalTrustLens");
    expect(app).toContain('path={"/creator-atlas"}');
    expect(home).toContain('href: "/creator-atlas"');
  });
});
