import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 679 Protected Attachment Accession", () => {
  it("preserves both protected attachment hashes and detected source formats", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ProtectedAttachmentAccession.tsx"), "utf8");
    expect(page).toContain("0332a717673e468e9cc599f68291566e944ae871ce5f4a8a6378932ab9340fc5");
    expect(page).toContain("d5a59e6a5f1dc2b77a84eddd1864b9f2edc0a20f5be7e3083c33aa2856d17f77");
    expect(page).toContain("Apple binary property list / keyed archive");
  });

  it("keeps restoration language distinct from independently verified operating state", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ProtectedAttachmentAccession.tsx"), "utf8");
    expect(page).toContain("Candidate vocabulary, not a completion certificate");
    expect(page).toContain("does not replace primary transcripts");
    expect(page).toContain("until an item-specific record shows otherwise");
  });

  it("registers the protected attachment accession as a portal route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path="/protected-attachment-accession"');
    expect(app).toContain("ProtectedAttachmentAccession");
  });
});
