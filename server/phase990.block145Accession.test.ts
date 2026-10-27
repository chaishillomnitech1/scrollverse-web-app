import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const lookbookPage = readFileSync(resolve(projectRoot, "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");
const homepage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const manifest = JSON.parse(readFileSync(resolve(projectRoot, "docs/source-review-oct27/oct27-late-upload-manifest.json"), "utf8")) as {
  recordCount: number;
  records: Array<{ filename: string; sha256: string; displayScope: string }>;
};

describe("Block 145 source discovery", () => {
  it("keeps the Block 145 comic visible in the source-labeled lookbook", () => {
    expect(lookbookPage).toContain("ScrollVerse Block 145 · OmniGaze Resurrection Comic");
    expect(lookbookPage).toContain("BLOCK 145 · CREATOR-SUPPLIED SOURCE ARTIFACT");
    expect(lookbookPage).toContain("ScrollVerse_Block145_OmniGaze_Resurrection_Comic.pdf");
    expect(homepage).toContain("Block 145 OmniGaze Resurrection Comic");
    expect(homepage).toContain("BLOCK 145");
  });

  it("preserves exact metadata-only receipts for the late upload batch", () => {
    expect(manifest.recordCount).toBeGreaterThanOrEqual(20);
    const names = manifest.records.map((record) => record.filename);
    expect(names).toContain("pasted_content_115.txt");
    expect(names).toContain("ScrollVerse_Block145_OmniGaze_Resurrection_Comic.pdf");
    for (const record of manifest.records) {
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.displayScope).toContain("metadata-only local accession");
    }
  });
});
