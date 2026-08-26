import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 833 — Creator Network public presentation", () => {
  it("centers source-led discovery and dedicated external pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorNetwork.tsx"), "utf8");
    expect(page).toContain("keeps its source context visible");
    expect(page).toContain("dedicated connection pathways");
    expect(page).toContain("explore the creator source trail");
    expect(page).not.toContain("The network is a discovery map, not a claim");
  });
});
