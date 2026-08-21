import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/CampaignActivationCenter.tsx"), "utf8");

describe("Phase 672 campaign cadence planner", () => {
  it("keeps Story and Event cadence controls browser-local", () => {
    expect(page).toContain('useState<"story" | "event">("story")');
    expect(page).toContain("NON-POSTING CAMPAIGN CADENCE");
    expect(page).toContain("They do not create a recurring job, post content, send outreach, or contact a provider.");
  });

  it("preserves an exact provider launch gate", () => {
    expect(page).toContain("Provider launch gate: name the destination, intended-use scope, visibility, exact asset, and final owner release decision before any public action.");
  });
});
