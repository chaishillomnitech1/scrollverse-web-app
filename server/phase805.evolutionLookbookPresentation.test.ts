import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/EvolutionLookbook.tsx");

describe("Phase 805 — Evolution Lookbook public presentation", () => {
  it("leads with creator context and item-specific release paths", () => {
    const page = fs.readFileSync(pagePath, "utf8");

    expect(page).toContain("Visitors can view the work, follow the creative threads, and decide for themselves.");
    expect(page).toContain("future financial, token, or marketplace activity follows the item-specific release path");
    expect(page).toContain("Complete the exact item record before any upload");
    expect(page).toContain("through its creator context and connected collection record");
    expect(page).not.toContain("without an implied transaction");
  });
});
