import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Phase 666 — Londyn ledger evidence", () => {
  it("keeps missing explorer evidence visible without implying chain state", () => {
    const page = read("client/src/pages/LondynLedgerEvidence.tsx");
    const app = read("client/src/App.tsx");
    const notes = read("docs/phase666-londyn-ledger-evidence.md");
    expect(page).toContain("Evidence before");
    expect(page).toContain("no public contract or transaction identifier has been supplied");
    expect(page).toContain("NO CHAIN ACTION");
    expect(app).toContain('path={"/londyn-ledger-evidence"}');
    expect(notes).toContain("needs source");
  });
});
