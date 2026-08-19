import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/VibeCanvasRoadmap.tsx"), "utf8");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 536 Vibe Canvas evidence roadmap", () => {
  it("registers a reachable browser-local Vibe Canvas route", () => {
    expect(router).toContain('import VibeCanvasRoadmap from "./pages/VibeCanvasRoadmap"');
    expect(router).toContain('<Route path={"/vibe-canvas"} component={VibeCanvasRoadmap} />');
    expect(home).toContain('{ label: "Vibe Canvas", href: "/vibe-canvas" }');
  });

  it("keeps the external board handoff explicitly release-gated", () => {
    expect(page).toContain("BROWSER-LOCAL ROADMAP AVAILABLE NOW");
    expect(page).toContain("EXTERNAL BOARD REQUIRES OWNER RELEASE");
    expect(page).toContain("External Vibe Canvas workspace/board: not yet identified in the current project record.");
    expect(page).toContain("No Vibe Canvas account, workspace, board, API, import, export, sharing action");
  });

  it("provides source, next-input, boundary, and accessibility controls", () => {
    expect(page).toContain("SOURCE CONTEXT");
    expect(page).toContain("NEXT REAL INPUT");
    expect(page).toContain("adult-supported participation guidance");
    expect(page).toContain("useSovereignHeartbeat({ page: \"vibe-canvas-roadmap\" })");
    expect(page).toContain("PortalTrustLens");
  });
});
