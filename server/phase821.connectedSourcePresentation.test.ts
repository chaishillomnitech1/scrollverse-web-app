import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 821 — Connected Source Registry presentation", () => {
  it("centers creator context and reader-led source pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(page).toContain("SOURCE CONTEXT &amp; NEXT PATH");
    expect(page).toContain("This registry keeps source scope and creator context visible.");
    expect(page).toContain("ready for the next source handoff");
    expect(page).not.toContain("SOURCE BOUNDARY");
  });
});
