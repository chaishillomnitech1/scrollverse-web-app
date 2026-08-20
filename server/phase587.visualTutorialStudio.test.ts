import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 587 — Visual Tutorial Studio", () => {
  it("registers a browser-local visual tutorial route and homepage discovery links", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");

    expect(app).toContain('import VisualTutorialStudio from "./pages/VisualTutorialStudio"');
    expect(app).toContain('<Route path={"/tutorial-studio"} component={VisualTutorialStudio} />');
    expect(home).toContain('href: "/tutorial-studio"');
    expect(home).toContain('label: "Tutorial Studio"');
  });

  it("keeps tutorials accessible, route-linked, and explicit about the Skool video release gate", () => {
    const page = read("client/src/pages/VisualTutorialStudio.tsx");

    expect(page).toContain('useSovereignHeartbeat({ page: "tutorial-studio" })');
    expect(page).toContain('verbatim captions');
    expect(page).toContain('SKOOL RELEASE REQUIRED');
    expect(page).toContain('does not generate a video, clone a voice, create a Skool account, upload media, publish a lesson');
    expect(page).toContain('route: "/scrollverse-chess-arena"');
    expect(page).toContain('route: "/creator-books"');
    expect(page).toContain('route: "/ai-constellation"');
  });
});
