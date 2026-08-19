import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 563 — AI Constellation Hub", () => {
  it("registers the public AI Constellation route and homepage discovery link", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('import AIConstellationHub from "./pages/AIConstellationHub"');
    expect(app).toContain('<Route path={"/ai-constellation"} component={AIConstellationHub} />');
    expect(home).toContain('{ label: "AI Constellation", href: "/ai-constellation" }');
  });

  it("keeps the AI hub source-led, tutorial-ready, and fail-closed", () => {
    const page = read("client/src/pages/AIConstellationHub.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "ai-constellation" })');
    expect(page).toContain("PortalTrustLens");
    expect(page).toContain("AI TUTORIAL STUDIO");
    expect(page).toContain("VIDEO REQUIRES RELEASE");
    expect(page).toContain("A discovery link is not an integration.");
    expect(page).toContain("BROWSER-LOCAL INTEGRATION BRIEF");
    expect(page).toContain("No external AI provider is connected through this page.");
  });
});
