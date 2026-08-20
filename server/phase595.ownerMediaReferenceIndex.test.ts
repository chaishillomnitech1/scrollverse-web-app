import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 595 — Owner-supplied media reference index", () => {
  it("preserves the two direct owner-supplied video entries as separate research records", () => {
    const index = read("docs/phase595-owner-media-reference-index.md");
    const packet = read("client/src/pages/CreatorMediaPacket.tsx");

    expect(index).toContain("SV-MEDIA-REF-001");
    expect(index).toContain("SV-MEDIA-REF-002");
    expect(index).toContain("_9hsUbs5v6o");
    expect(packet).toContain("OWNER-SUPPLIED VIDEO REFERENCE INDEX · RESEARCH");
    expect(packet).toContain("Reference 02 ↗");
  });

  it("keeps both entries separate from copying, provider, and publication claims", () => {
    const index = read("docs/phase595-owner-media-reference-index.md");

    expect(index).toContain("not copying source media");
    expect(index).toContain("does not embed, download, capture, transcribe, reproduce, republish");
    expect(index).toContain("does not claim a provider connection");
  });
});
