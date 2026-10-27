import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Receipt = {
  filename: string;
  bytes: number;
  sha256: string;
  classification: string;
  displayScope: string;
};

describe("Phase 991 Copilot recap accession", () => {
  const manifestPath = resolve(
    process.cwd(),
    "docs/source-review-oct27/copilot-podcast-recap-accession.json",
  );
  const notePath = resolve(
    process.cwd(),
    "docs/source-review-oct27/copilot-podcast-recap-accession.md",
  );

  it("preserves a metadata-only source receipt without executing the recap", () => {
    expect(existsSync(manifestPath)).toBe(true);
    expect(existsSync(notePath)).toBe(true);

    const receipt = JSON.parse(readFileSync(manifestPath, "utf8")) as Receipt;
    expect(receipt.filename).toBe("Copilot-podcast-recap.md");
    expect(receipt.bytes).toBe(560);
    expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(receipt.classification).toBe("creator-supplied narrative source");
    expect(receipt.displayScope).toBe("metadata-only local receipt");

    const note = readFileSync(notePath, "utf8");
    expect(note).toContain("Copilot-podcast-recap.md");
    expect(note).toContain("not executed, rendered, interpreted, uploaded, embedded, or published");
    expect(note).toContain("does not establish public availability, authorship, rights, or external deployment");
  });
});
