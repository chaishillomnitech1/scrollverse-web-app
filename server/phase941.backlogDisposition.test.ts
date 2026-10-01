import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const registerPath = "docs/phase941-local-backlog-disposition.md";

describe("Phase 941 — local backlog disposition", () => {
  it("records all 31 remaining open items without marking blocked work complete", () => {
    expect(existsSync(registerPath)).toBe(true);
    const source = readFileSync(registerPath, "utf8");
    expect(source).toContain("31 remaining open tracker items");
    expect(source).toContain("OWNER / ACCOUNT / PROVIDER GATE");
    expect(source).toContain("LOCAL PREPARATION AVAILABLE");
    expect(source).toContain("not marked complete");
    expect((source.match(/^- \|/gm) ?? []).length).toBe(31);
  });

  it("keeps external actions and consequential release lanes explicit", () => {
    const source = readFileSync(registerPath, "utf8");
    expect(source).toContain("billing");
    expect(source).toContain("wallet");
    expect(source).toContain("contract");
    expect(source).toContain("public repository");
    expect(source).toContain("store submission");
    expect(source).toContain("exact owner confirmation");
  });
});
