import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Copilot artifact access boundary", () => {
  const notePath = resolve(process.cwd(), "docs/source-review-copilot-access.md");
  const note = readFileSync(notePath, "utf8");

  it("keeps the exact supplied source and records the unavailable public view", () => {
    expect(existsSync(notePath)).toBe(true);
    expect(note).toContain("https://copilot.microsoft.com/shares/artifacts/1u59LAfqcvyWrjuF8kJEa");
    expect(note).toContain("Copilot sign-in screen");
    expect(note).toContain("held research reference");
  });

  it("does not invent family attribution or external actions", () => {
    expect(note).toContain("no family contribution is attributed");
    expect(note).toContain("not executed, rendered, uploaded, embedded, transformed, published");
    expect(note).toContain("wallet, token, contract");
  });
});
