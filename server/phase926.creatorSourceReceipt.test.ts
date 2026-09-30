import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase926-creator-source-receipt.md";

describe("Phase 926 — Creator Source Receipt", () => {
  it("preserves the supplied batch metadata and source boundaries", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const receipt = readFileSync(receiptPath, "utf8");

    expect(receipt).toContain("pasted_content_4.txt");
    expect(receipt).toContain("708");
    expect(receipt).toContain("28,787");
    expect(receipt).toContain("e4a4dfe43b4af023c3eae9f390bcd045cda1ad767d7af04897bc84edc23397d5");
    expect(receipt).toContain("Marketplace and token proposals");
    expect(receipt).toContain("Supplied deployment and telemetry examples");
    expect(receipt).toContain("No external URL was opened");
    expect(receipt).toContain("No wallet, contract, payment, or deployment action occurred");
  });
});
