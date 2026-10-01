import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase930-creator-source-receipt.md";

describe("Phase 930 — Creator Source Receipt", () => {
  it("preserves the supplied batch metadata and hypothesis boundaries", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const receipt = readFileSync(receiptPath, "utf8");

    expect(receipt).toContain("pasted_content_6.txt");
    expect(receipt).toContain("4,369");
    expect(receipt).toContain("221,381");
    expect(receipt).toContain("00e951a7842ad0f1ee1f268c7e7c7d0e991f81ef838d3cf43b1607304184fc7a");
    expect(receipt).toContain("water-acoustics and frequency experiments");
    expect(receipt).toContain("manifest import history");
    expect(receipt).toContain("No external URL was opened");
    expect(receipt).toContain("No billing, wallet, token, contract, payment, deployment, or publication action occurred");
  });
});
