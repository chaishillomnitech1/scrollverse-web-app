import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 246 — route modularization boundary", () => {
  const deferredRoutes = [
    ["Replays", "/replays"],
    ["MarsOmni", "/marsomni"],
    ["Books", "/books"],
    ["Visuals", "/visuals"],
    ["BookOfLife", "/book-of-life"],
    ["OmniChess", "/omni-chess"],
    ["SovereignCinema", "/sovereign-cinema"],
    ["JuniorMovies", "/junior-movies"],
    ["DSPIntelligence", "/dsp-intelligence"],
  ] as const;

  it("defers selected archival and media-heavy page modules from the eager graph", () => {
    for (const [component] of deferredRoutes) {
      expect(app).toContain(`const ${component} = lazy(() => import("./pages/${component}"));`);
      expect(app).not.toContain(`import ${component} from "./pages/${component}";`);
    }
  });

  it("keeps every selected deferred page registered at its original URL", () => {
    for (const [component, route] of deferredRoutes) {
      expect(app).toContain(`Route path={"${route}"} component={${component}}`);
    }
  });

  it("retains a shared Suspense fallback around the route switch", () => {
    expect(app).toContain("<Suspense fallback={<RouteLoadingFallback />}>");
    expect(app).toContain("</Suspense>");
  });
});
