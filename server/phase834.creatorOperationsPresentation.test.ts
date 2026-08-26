import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 834 — Creator Operations public presentation", () => {
  it("leads with creator records and dedicated operational pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorOperations.tsx"), "utf8");
    expect(page).toContain("external release decisions each continue through their dedicated record");
    expect(page).toContain("listing, rights, and release decisions continue through their dedicated owner or provider record");
    expect(page).toContain("Visit each connected destination directly");
    expect(page).not.toContain("this workspace does not manage any of the associated accounts");
  });
});
