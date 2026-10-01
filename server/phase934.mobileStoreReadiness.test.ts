import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const recordPath = "docs/phase934-mobile-store-readiness-record.md";

describe("Phase 934 — local mobile store readiness", () => {
  it("preserves fresh source-kit validation and owner-controlled store gates", () => {
    expect(existsSync(recordPath)).toBe(true);
    const record = readFileSync(recordPath, "utf8");
    expect(record).toContain("Source-only validation");
    expect(record).toContain("pnpm check");
    expect(record).toContain("preflight:release");
    expect(record).toContain("No signed iOS archive");
    expect(record).toContain("No signed Android App Bundle");
    expect(record).toContain("No store upload or submission");
    expect(record).toContain("scrollverse-app-store-owner-packet.md");
  });
});
