import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const fashion = readFileSync(resolve(root, "client/src/pages/FashionEmpire.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("Phase 476 — Fashion Empire release-state correction", () => {
  it("presents product and production entries as concepts rather than active commercial records", () => {
    expect(fashion).toContain("Price unset");
    expect(fashion).toContain("Potential production research path · no agreement verified");
    expect(fashion).toContain("Production Research");
    expect(fashion).toContain("not supplier relationships, quotes, agreements, inventory, lead-time commitments, or fulfillment arrangements");
  });

  it("replaces mint feedback with a non-transactional concept review", () => {
    expect(fashion).toContain("Review concept");
    expect(fashion).toContain("No mint, sale, wallet, or transfer occurred.");
    expect(fashion).not.toContain("minted! NFT incoming");
  });

  it("keeps all coin and collectible language in a release-gated concept state", () => {
    expect(fashion).toContain("Collectible concept · no issuance");
    expect(fashion).toContain("No coin, allocation, sale incentive, or collectible issuance is active.");
    expect(fashion).toContain("require separate evidence, terms, and owner release");
  });

  it("registers the short Fashion path as an alias so it does not return a route error", () => {
    expect(app).toContain('<Route path="/fashion" component={FashionEmpire} />');
  });
});
