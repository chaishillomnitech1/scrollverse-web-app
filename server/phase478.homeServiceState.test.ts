import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 478 — Home service-state correction", () => {
  it("does not represent SaferWay as accepting bookings from the home page", () => {
    expect(home).toContain("SAFERWAY AUTO DETAIL · VINELAND, NJ · SERVICE READINESS");
    expect(home).toContain("Open readiness →");
    expect(home).not.toContain("ACCEPTING BOOKINGS");
    expect(home).not.toContain("Book Now →");
  });

  it("labels the gateway cards as service readiness and metrics research", () => {
    expect(home).toContain('desc: "Premium Auto Detailing · Service readiness"');
    expect(home).toContain('badge: "READINESS"');
    expect(home).toContain('desc: "Metrics research · 44:OMNI Frequency"');
    expect(home).toContain('badge: "RESEARCH"');
  });
});
