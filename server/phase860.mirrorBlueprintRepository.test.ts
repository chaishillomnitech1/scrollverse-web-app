import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(import.meta.dirname, `../${path}`), "utf8");

describe("Phase 860 — Mirror Blueprint Repository Record", () => {
  it("adds a source-led Mirror accession to the first-party Special Repository", () => {
    const page = read("client/src/pages/SpecialRepository.tsx");
    expect(page).toContain("SV-DIGI-MIRROR-001");
    expect(page).toContain("Chais Sabir Allah Mirror Blueprint Repository Record");
    expect(page).toContain('handoff: "/chais-sabir-allah-mirror"');
    expect(page).toContain("not an external repository, credential store, wallet, contract, or provider integration");
    expect(page).toContain("Mirror Blueprint Record");
  });

  it("keeps the Mirror profile connected to its source registry and blueprint record", () => {
    const mirror = read("client/src/pages/ChaisSabirAllahMirror.tsx");
    const registry = read("client/src/pages/ConnectedSourceRegistry.tsx");
    expect(mirror).toContain("Open Mirror Blueprint Record");
    expect(mirror).toContain('href="/special-repository"');
    expect(mirror).toContain("Open blueprint record");
    expect(registry).toContain("SRC-022");
    expect(registry).toContain("Chais Sabir Allah Mirror Blueprint Repository Record");
    expect(registry).toContain('localHref: "/special-repository"');
  });
});
