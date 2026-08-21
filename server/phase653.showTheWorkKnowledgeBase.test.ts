import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 653 — Show-the-Work Knowledge Base", () => {
  it("presents source-led examples with a compact reusable path and external-action boundary", () => {
    const page = read("client/src/pages/ShowTheWorkKnowledgeBase.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "show-the-work-knowledge-base" })');
    expect(page).toContain("Show the real artifact. Preserve the route. Let people decide.");
    expect(page).toContain("ONE-TO-TWO-STEP PATH");
    expect(page).toContain("EXACT BOUNDARY");
    expect(page).toContain("Visual Story Archive");
    expect(page).toContain("Film + Animation Production Pack");
    expect(page).toContain('providerAction: "none"');
  });

  it("registers the knowledge-base route and retains connected creator examples", () => {
    const app = read("client/src/App.tsx");
    const page = read("client/src/pages/ShowTheWorkKnowledgeBase.tsx");
    expect(app).toContain('import ShowTheWorkKnowledgeBase from "./pages/ShowTheWorkKnowledgeBase"');
    expect(app).toContain('<Route path={"/show-the-work-knowledge-base"} component={ShowTheWorkKnowledgeBase} />');
    expect(page).toContain('href: "/creator-atlas"');
    expect(page).toContain('href: "/youtube-episode-release-desk"');
  });
});
