import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase929-creator-source-receipt.md";

describe("Phase 929 — Creator Source Receipt", () => {
  it("preserves the supplied batch metadata and local-only boundaries", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const receipt = readFileSync(receiptPath, "utf8");

    expect(receipt).toContain("pasted_content_5.txt");
    expect(receipt).toContain("2,027");
    expect(receipt).toContain("99,780");
    expect(receipt).toContain("d9867f0f89d9ef7a8402148739dfca0d4a9e6d911adb3af61cbb928e7ff267f4");
    expect(receipt).toContain("ERC-721, ERC-6551 token-bound account");
    expect(receipt).toContain("Browser-local accession schema");
    expect(receipt).toContain("No external URL was opened");
    expect(receipt).toContain("No wallet, token, contract, payment, deployment, or publication action occurred");
  });
});
