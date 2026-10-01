import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { getPlasmaState } from "../client/src/lib/plasmaStateMath";

describe("Phase 932 — Plasma State Map geometry", () => {
  it.each([
    { degrees: 0, x: 0, y: -1, amplitude: 0, label: "crossing" },
    { degrees: 90, x: 1, y: 0, amplitude: 1, label: "crest" },
    { degrees: 180, x: 0, y: 1, amplitude: 0, label: "crossing" },
    { degrees: 270, x: -1, y: 0, amplitude: -1, label: "trough" },
    { degrees: 360, x: 0, y: -1, amplitude: 0, label: "crossing" },
  ])("maps $degrees° to its orbit and sine projection", ({ degrees, x, y, amplitude, label }) => {
    const state = getPlasmaState(degrees);
    expect(state.degrees).toBe(degrees);
    expect(state.x).toBeCloseTo(x, 6);
    expect(state.y).toBeCloseTo(y, 6);
    expect(state.amplitude).toBeCloseTo(amplitude, 6);
    expect(state.label).toBe(label);
  });

  it("clamps an out-of-range angle and returns a rising or falling state", () => {
    expect(getPlasmaState(-40).degrees).toBe(0);
    expect(getPlasmaState(420).degrees).toBe(360);
    expect(getPlasmaState(45).label).toBe("rising");
    expect(getPlasmaState(135).label).toBe("falling");
    expect(getPlasmaState(225).label).toBe("falling");
    expect(getPlasmaState(315).label).toBe("rising");
  });
});

describe("Phase 932 — first-party Plasma State Map", () => {
  it("registers a local route with labeled controls and an accessible textual alternative", () => {
    const pagePath = "client/src/pages/PlasmaStateMap.tsx";
    expect(existsSync(pagePath)).toBe(true);
    const app = readFileSync("client/src/App.tsx", "utf8");
    const page = readFileSync(pagePath, "utf8");
    expect(app).toContain('path="/plasma" component={PlasmaStateMap}');
    expect(page).toContain("Plasma State Map");
    expect(page).toContain("Selected angle");
    expect(page).toContain('type="range"');
    expect(page).toContain("prefers-reduced-motion");
    expect(page).toContain("cancelAnimationFrame");
    expect(page).toContain("Download local state snapshot");
    expect(page).toContain("Geometric illustration, not a plasma simulation");
  });

  it("exposes the storybook, artifact, and plasma paths together on the home page", () => {
    const home = readFileSync("client/src/pages/Home.tsx", "utf8");
    expect(home).toContain('href: "/plasma"');
    expect(home).toContain('href: "/source-labeled-storybook-index"');
    expect(home).toContain('href: "/gemini-storybook-collection"');
    expect(home).toContain('href: "/fashion-artifact-atlas"');
    expect(home).toContain('href: "/public-footprint"');
    expect(home).toContain("Music + visual outlet");
    expect(home).toContain("CreatorResearchBeacon");
    expect(home).toContain("<CreatorResearchBeacon />");
  });
});
