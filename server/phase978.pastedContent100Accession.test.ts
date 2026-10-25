import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const docs = path.resolve(process.cwd(), "docs/source-review-oct24");
const receiptPath = path.join(docs, "pasted-content-100-receipt.json");
const notePath = path.join(docs, "pasted-content-100-accession.md");

describe("Phase 978 pasted content 100 accession", () => {
  it("keeps the exact receipt metadata and metadata-only boundary", () => {
    expect(fs.existsSync(receiptPath)).toBe(true);
    const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
    expect(receipt.filename).toBe("pasted_content_100.txt");
    expect(receipt.bytes).toBe(76988);
    expect(receipt.sha256).toBe("a3acba0d8ba7fb5b222c07dd85ca97c168631c83febddad1e48cd54d4d07fb8e");
    expect(receipt.displayScope).toBe("metadata-only");
    expect(receipt.execution).toBe("not executed");
  });

  it("keeps a human-readable source note with no independent-evidence upgrade", () => {
    const note = fs.readFileSync(notePath, "utf8");
    expect(note).toContain("pasted_content_100.txt");
    expect(note).toContain("No source body was opened");
    expect(note).toContain("creator claims remain source-labeled");
  });
});
