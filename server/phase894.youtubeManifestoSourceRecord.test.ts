import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 894 YouTube and manifesto source record", () => {
  it("keeps the public video external and source-labeled while retaining operational claims as unverified context", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/DynastyVisualArchive.tsx"), "utf8");
    const record = fs.readFileSync(path.resolve(import.meta.dirname, "../docs/phase894-youtube-manifesto-source-record.md"), "utf8");

    expect(page).toContain("EXTERNAL SOURCE · YOUTUBE");
    expect(page).toContain("Infinite Insights · Public YouTube Reference");
    expect(page).toContain('url: "https://youtu.be/0_oCySkU4Jc"');
    expect(page).toContain("not ScrollVerse facts or operational plans");
    expect(page).not.toContain("<iframe");
    expect(page).not.toContain("autoplay");
    expect(record).toContain("Phase 894 — YouTube and Manifesto Source Record");
    expect(record).toContain("does **not** treat those statements as verified evidence");
    expect(record).toContain("owner-supplied narrative and unverified operational context");
    expect(record).toContain("Family contribution status");
  });
});
