import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(import.meta.dirname, relativePath), "utf8");

describe("Phase 840 — Omniland Cinematic Gateway", () => {
  it("registers the gateway and makes it reachable from Omniland and the portal", () => {
    const app = read("../client/src/App.tsx");
    const omniland = read("../client/src/pages/Omniland.tsx");
    const home = read("../client/src/pages/Home.tsx");
    expect(app).toContain('const OmnilandCinematicGateway = lazy(() => import("@/pages/OmnilandCinematicGateway"))');
    expect(app).toContain('<Route path="/omniland-cinematic-gateway" component={OmnilandCinematicGateway} />');
    expect(omniland).toContain('href="/omniland-cinematic-gateway"');
    expect(home).toContain('title: "Cinematic Gateway"');
    expect(home).toContain('{ label: "Cinematic Gateway", href: "/omniland-cinematic-gateway" }');
  });

  it("links four original source-led gates to first-party ScrollVerse paths", () => {
    const gateway = read("../client/src/pages/OmnilandCinematicGateway.tsx");
    expect(gateway).toContain("Four cinematic gates.");
    expect(gateway).toContain("The cinema gate");
    expect(gateway).toContain("The story gate");
    expect(gateway).toContain("The play gate");
    expect(gateway).toContain("The source gate");
    expect(gateway).toContain('href: "/film-animation-studio"');
    expect(gateway).toContain('href: "/omniland-source-atlas"');
    expect(gateway).toContain("does not publish third-party footage");
  });
});
