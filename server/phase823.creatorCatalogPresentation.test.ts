import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 823 — Creator Catalog Readiness presentation", () => {
  it("centers creator catalog context and dedicated release pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorCatalogReadiness.tsx"), "utf8");
    expect(page).toContain("This workspace keeps creator catalog context visible.");
    expect(page).toContain("records each continue through their dedicated release pathways");
    expect(page).not.toContain("This workspace does not create a Shopify product");
  });
});
