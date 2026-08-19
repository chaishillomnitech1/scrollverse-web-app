import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const catalog = readFileSync(resolve(root, "client/src/pages/CreatorCatalogReadiness.tsx"), "utf8");
const blueprint = readFileSync(resolve(root, "client/src/pages/EnterpriseSystemsBlueprint.tsx"), "utf8");

describe("Phase 491 — Creator commerce and systems-offering discovery", () => {
  it("connects catalog readiness to the buyer-facing Systems Blueprint", () => {
    expect(catalog).toContain('href="/enterprise-systems-blueprint"');
    expect(catalog).toContain("Systems offering blueprint");
    expect(catalog).toContain("SYSTEMS OFFERING PATH");
    expect(blueprint).toContain('href="/creator-catalog-readiness"');
    expect(blueprint).toContain("Creator commerce readiness");
  });

  it("makes item-level customer readiness and AgapeCycle preparation visible without asserting a transaction", () => {
    expect(catalog).toContain("AgapeCycle 88/12 allocation basis");
    expect(catalog).toContain("delivery, support, correction, and exact release decision");
    expect(catalog).toContain("not as a made-up current transaction");
    expect(catalog).toContain("EXACT CHECKOUT ACTIVATION GATE");
  });

  it("keeps provider-side commerce and B2B engagement fail-closed until separately approved", () => {
    expect(catalog).toContain("does not create a Shopify product, collection, catalog, inventory, price, checkout");
    expect(catalog).toContain("exact current owner confirmation");
    expect(blueprint).toContain("does not contact a buyer");
    expect(blueprint).toContain("does not create a contract, set a price, grant a license");
  });
});
