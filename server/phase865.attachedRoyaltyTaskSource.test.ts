import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 865 attached royalty task source record", () => {
  it("keeps the attached historical task visible as a source record without asserting financial or provider outcomes", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(page).toContain("SRC-023");
    expect(page).toContain("Transforming Blockchain Royalties into Global Wealth");
    expect(page).toContain("cyMGdw94X7ekXdmhla8SgL?replay=1");
    expect(page).toContain("does not, by itself, establish a royalty payment");
    expect(page).toContain("{SOURCES.length} SOURCE RECORDS");
  });
});
