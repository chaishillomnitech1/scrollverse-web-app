import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 824 — Consortium Nexus presentation", () => {
  it("centers collaboration context and approved connection pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ConsortiumNexus.tsx"), "utf8");
    expect(page).toContain("This route keeps collaborative source context visible.");
    expect(page).toContain("approved connection pathway");
    expect(page).not.toContain("This route does not access, combine, recover, synchronize, or control external accounts");
  });
});
