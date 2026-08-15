import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
describe("Phase 265 — Universal Commons", () => {
  it("registers the navigation layer and exposes it from Home", () => { expect(read("client/src/App.tsx")).toContain('path="/universal-commons"'); expect(read("client/src/pages/Home.tsx")).toContain('href: "/universal-commons"'); });
  it("routes only to existing first-party participation pathways with browser-local planning", () => { const page = read("client/src/pages/UniversalCommons.tsx"); expect(page).toContain("BROWSER-LOCAL CONTRIBUTION PLANNER"); expect(page).toContain("Legion Commons"); expect(page).toContain("Think Space"); expect(page).toContain("External chat, streaming, upload"); });
});
