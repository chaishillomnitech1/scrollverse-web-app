import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase935-scrollcmd-source-receipt.md";

describe("Phase 935 — scrollcmd source receipt", () => {
  it("preserves the supplied destination and task reference without opening it", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const receipt = readFileSync(receiptPath, "utf8");
    expect(receipt).toContain("https://scrollcmd-dkhxx9gf.manus.space");
    expect(receipt).toContain("https://manus.im/app");
    expect(receipt).toContain("Black Batman Franchise and FlameCourt Ceremony Development");
    expect(receipt).toContain("Metadata-only continuation path");
    expect(receipt).toContain("No external page was opened");
    expect(receipt).toContain("No external link was embedded");
    expect(receipt).toContain("No publication, deployment, account, wallet, token, contract, or payment action");
  });
});
