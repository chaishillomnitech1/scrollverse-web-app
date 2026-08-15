import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 241 — ScrollVerse Mesopotamia Commons", () => {
  const page = read("client/src/pages/MesopotamiaCommons.tsx"); const app = read("client/src/App.tsx"); const home = read("client/src/pages/Home.tsx");
  it("registers the commons in App and Home", () => { expect(app).toContain('Route path="/mesopotamia-commons"'); expect(home).toContain('href: "/mesopotamia-commons"'); });
  it("links study, archive, creation, access, and contribution pathways", () => { ["/open-research-navigator", "/open-knowledge-verse", "/mesopotamia-library", "/creator-studio-navigator", "/voice-language-studio", "/co-creation-navigator"].forEach((route) => expect(page).toContain(route)); });
  it("keeps the learning compass browser-local and source-labeled", () => { expect(page).toContain("PortalTrustLens lane=\"Mesopotamia Commons\""); expect(page).toContain("browser-local learning layer"); expect(page).toContain("does not assign a universal conclusion"); expect(page).toContain("Nothing is uploaded from this panel"); });
});
