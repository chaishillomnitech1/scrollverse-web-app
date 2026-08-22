import fs from "node:fs";
import { describe, expect, it } from "vitest";

const page = fs.readFileSync("client/src/pages/ConnectedStatementsMusicEvidence.tsx", "utf8");

describe("Phase 770 — Referenced YouTube and SovereignHub Evidence Review", () => {
  it("preserves the SovereignHub music archive as source context rather than an external operating claim", () => {
    expect(page).toContain("SovereignHub archive and music preview");
    expect(page).toContain("silent visual loops");
    expect(page).toContain("does not independently verify current channel uploads");
  });

  it("keeps a clear current-feed research handoff", () => {
    expect(page).toContain("FIVE EVIDENCE LANES");
  });
});
