import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 836 — Connected Source Registry public presentation", () => {
  it("centers source context and dedicated continuation pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(page).toContain("private account, provider, and token operating records each continue through their dedicated pathway");
    expect(page).toContain("checkout, payment, fulfillment, and purchase records continue through their dedicated commerce pathway");
    expect(page).toContain("Open the source. Follow its context.");
    expect(page).toContain("retain their own current source status until item-specific external evidence is available");
    expect(page).not.toContain("Open the source. Keep the boundary.");
  });
});
