import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const map = fs.readFileSync(path.join(root, "client/src/pages/CreatorInfrastructureMap.tsx"), "utf8");
const control = fs.readFileSync(path.join(root, "client/src/pages/ProductionControlDesk.tsx"), "utf8");

describe("Phase 321 — Creator Infrastructure Map", () => {
  it("registers the public creator infrastructure route with heartbeat telemetry", () => {
    expect(app).toContain('path="/creator-infrastructure" component={CreatorInfrastructureMap}');
    expect(map).toContain('useSovereignHeartbeat({ page: "creator-infrastructure-map" })');
    expect(map).toContain("SCROLLVERSE CREATOR INFRASTRUCTURE MAP");
    expect(control).toContain('href="/creator-infrastructure"');
  });

  it("maps local creator infrastructure without claiming external authority or automatic release", () => {
    expect(map).toContain("Source & version record");
    expect(map).toContain("Accessible from the source");
    expect(map).toContain("Open knowledge commons");
    expect(map).toContain("Destination & outcome record");
    expect(map).toContain("does not confer accreditation");
    expect(map).toContain("not a claim that an external platform");
  });

  it("keeps state filtering and blueprint export browser-local and keyboard-accessible", () => {
    expect(map).toContain('aria-pressed={active}');
    expect(map).toContain("Copy operating blueprint");
    expect(map).toContain("navigator.clipboard.writeText");
    expect(map).toContain("requires owner release");
  });
});
