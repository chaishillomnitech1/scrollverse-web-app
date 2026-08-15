import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
describe("Phase 269 — Media World", () => {
  it("registers the Media World navigator and exposes it from Home", () => { expect(read("client/src/App.tsx")).toContain('path="/media-world"'); expect(read("client/src/pages/Home.tsx")).toContain('href: "/media-world"'); });
  it("keeps contributor inspection rights-aware and production planning browser-local", () => { const page = read("client/src/pages/MediaWorld.tsx"); expect(page).toContain("ALIGNED MATERIAL INSPECTOR"); expect(page).toContain("BROWSER-LOCAL MEDIA WORLD BRIEF"); expect(page).toContain("Discoverability is not clearance"); });
});
