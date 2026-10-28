import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = join(import.meta.dirname, "..");
const manifestPath = join(
  projectRoot,
  "docs/source-review-oct27/oct27-latest-creator-materials-manifest.json",
);
const notePath = join(
  projectRoot,
  "docs/source-review-oct27/oct27-latest-creator-materials-accession.md",
);

const expected = [
  ["pasted_content_117.txt", 19100, "cd609be21b6db01dbc47d98f5b625f456eeadabfb9717351c851936cc89f3091"],
  ["pasted_content_118.txt", 4331, "6892befa9f580f42e37b2a129aca56116101c3e629b983a734e2cf3f1d557bd2"],
  ["pasted_content_119.txt", 9589, "7551e24d600af47a9b0820e132618ebacc7f146445c2a28b8ab37b0d5e75a9ce"],
  ["Copilot-podcast-recap(12).txt", 1071, "d7b15d3929b21c7b0cd4a45edf9003c3d3307e87ce4b3c99303abe7df681b376"],
  ["Copilot-podcast-recap.md", 560, "4dedc979c86107b8dbcf9442fb112d7816e8e4945e68075f0a70577a8803e0b4"],
  ["Copilot-podcast-recap(13).txt", 1662, "2365e0fff9c77e0af33048e9ad1b62182c4ee355998b2ac7dbd2e127860c0747"],
  ["Scrollverse+Campaign+Gallery+V2.tar.gz", 5296814, "b7fa5dbcec020787bc1180c17eb1f132609ed78f44cbd1496890ac13c07672f2"],
] as const;

describe("Phase 994 latest creator-material accession", () => {
  it("preserves the delivered batch with exact byte counts and SHA-256 receipts", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      count: number;
      records: Array<{ filename: string; bytes: number; sha256: string }>;
    };

    expect(manifest.count).toBe(expected.length);
    expect(manifest.records).toHaveLength(expected.length);
    for (const [filename, bytes, sha256] of expected) {
      expect(manifest.records).toContainEqual(expect.objectContaining({ filename, bytes, sha256 }));
    }
  });

  it("keeps the batch metadata-only and separates source claims from technical evidence", () => {
    const note = readFileSync(notePath, "utf8");
    const manifest = readFileSync(manifestPath, "utf8");

    expect(note).toContain("metadata-only local accession");
    expect(note).toContain("No supplied body was executed");
    expect(note).toContain("not treated as independently verified");
    expect(manifest).toContain("not embedded or published");
    expect(manifest).toContain("No external repository");
  });
});
