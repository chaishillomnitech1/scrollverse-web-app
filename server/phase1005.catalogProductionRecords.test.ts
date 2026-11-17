import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1005 catalog production records", () => {
  const page = readFileSync(resolve(process.cwd(), "client/src/pages/DirectFanCatalog.tsx"), "utf8");
  const component = readFileSync(resolve(process.cwd(), "client/src/components/CatalogProductionRecords.tsx"), "utf8");

  it("integrates the local records surface into direct-to-fan discovery", () => {
    expect(page).toContain("CatalogProductionRecords");
    expect(component).toContain("CATALOG DISCOVERY · VALIDATED PRODUCTION RECORDS");
    expect(component).toContain("Search production records");
    expect(component).toContain("Filter by state");
  });

  it("does not imply that records are generated or published videos", () => {
    expect(component).toContain("source-labeled");
    expect(component).toContain("not a generated or published video");
    expect(component).toContain("No provider, upload, payment, or publication action");
  });
});
