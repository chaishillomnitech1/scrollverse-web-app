import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 827 — Crypto Systems Atlas presentation", () => {
  it("centers source-led learning and owner-led action pathways while retaining transaction safety", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CryptoSystemsAtlas.tsx"), "utf8");
    expect(page).toContain("OWNER-LED ACTION PATHWAYS");
    expect(page).toContain("context readers can use to explore responsibly");
    expect(page).toContain("owner-led action records continue through their dedicated paths");
    expect(page).toContain("does not issue, buy, sell, hold, transfer, custody");
  });
});
