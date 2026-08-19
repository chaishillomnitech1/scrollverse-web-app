import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 518 first-SKU activation packet", () => {
  it("registers the packet route and keeps provider operations fail-closed", () => {
    const page = read("client/src/pages/FirstSkuActivationPacket.tsx");
    const app = read("client/src/App.tsx");
    expect(app).toContain('path={"/first-sku-activation-packet"}');
    expect(page).toContain("NO PROVIDER ACTION");
    expect(page).toContain("current owner confirmation");
    expect(page).toContain("does not create a product, price, inventory, checkout, payment");
    expect(page).toContain("Shopify surface");
  });
});
