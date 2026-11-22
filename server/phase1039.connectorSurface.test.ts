import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");
const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");

describe("Phase 1039 — connector surface", () => {
  it("exposes the configured resource families and honest connector states", () => {
    for (const marker of [
      "CONNECTOR SURFACE",
      "77 ENUMERATED LOCALLY",
      "CONNECTED",
      "OWNER AUTHORIZATION REQUIRED",
      "AVAILABLE",
      "MANUS TOOLS",
      "GOOGLE CALENDAR",
      "OUTLOOK MAIL",
      "TRUTHFUL STATE",
      "MUSE ACCEPTANCE RULE",
    ]) {
      expect(page + catalog).toContain(marker);
    }
  });

  it("keeps the connector catalog sized to the requested capability surface", () => {
    expect(catalog).toMatch(/ENUMERATED_TOOL_SURFACE_COUNT\s*=\s*connectorToolSurface\.length/);
    expect(catalog).toContain("DISCOVERED_TOOL_SURFACE_COUNT = 424");
  });
});
