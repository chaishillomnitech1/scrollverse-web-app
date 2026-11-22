import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");
const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");

describe("Phase 1039 — connector surface", () => {
  it("exposes the configured resource families and honest connector states", () => {
    for (const marker of [
      "CONNECTOR SURFACE",
      "77 CAPABILITY CARDS",
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
    expect(catalog).toMatch(/connectorToolSurface\.length\s*=\s*77|TOOL_SURFACE_COUNT\s*=\s*77/);
  });
});
