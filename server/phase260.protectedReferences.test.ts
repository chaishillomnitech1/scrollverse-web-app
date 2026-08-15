import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
describe("Phase 252–253 and 260 — protected reference completion", () => {
  it("records replay and clipboard material as non-executable with an explicit rest state", () => {
    const record = read("docs/phase252-253-protected-reference-review.md");
    expect(record).toContain("protected reference material");
    expect(record).toContain("No code, contract, circuit, script, build, or automation workflow was run.");
  });
  it("preserves media and settlement material as non-executable reference", () => {
    const record = read("docs/phase255-protected-operating-matrix-intake.md");
    expect(record).toContain("Pasted_content_30.txt");
    expect(record).toContain("Pasted_content_31.txt");
    expect(record).toContain("no payment, payout, deployment, or broadcast occurred");
  });
});
