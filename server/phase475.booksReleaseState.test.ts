import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const books = readFileSync(resolve(root, "client/src/pages/Books.tsx"), "utf8");

describe("Phase 475 — Books release-state correction", () => {
  it("presents paid-book figures as unfilled release-record state rather than a current price", () => {
    expect(books).toContain("RELEASE RECORD · PRICE UNSET");
    expect(books).toContain("FREE READER PATH · CHECK ROUTE");
    expect(books).not.toContain("book.price.toFixed(2)");
  });

  it("keeps retailer and platform references visibly separate from listing or availability claims", () => {
    expect(books).toContain("PLATFORM PREPARATION REFERENCES · NOT LISTING CONFIRMATIONS");
    expect(books).toContain("does not establish that this book is listed, purchasable, delivered, licensed, or available there");
    expect(books).toContain("reference</span>");
  });

  it("retains browser-local release and collectible readiness boundaries", () => {
    expect(books).toContain("No wallet, mint, listing, or marketplace action has been triggered.");
    expect(books).toContain("Rights, contract, wallet, platform, and release evidence required before any mint or listing.");
  });
});
