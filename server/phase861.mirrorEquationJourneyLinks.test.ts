import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const page = (name: string) => fs.readFileSync(path.resolve(import.meta.dirname, `../client/src/pages/${name}`), "utf8");

describe("Phase 861 Mirror equation and journey research links", () => {
  it("connects the Mirror, Creator Equation, and synchronization research through registered first-party paths", () => {
    const mirror = page("ChaisSabirAllahMirror.tsx");
    const equation = page("ChaisSabirEquation.tsx");
    const research = page("SynchronizationResearchIndex.tsx");
    expect(mirror).toContain('href: "/chais-sabir-equation"');
    expect(mirror).toContain('href: "/synchronization-research"');
    expect(equation).toContain('href="/chais-sabir-allah-mirror"');
    expect(equation).toContain("Meet the Mirror");
    expect(research).toContain('href: "/chais-sabir-allah-mirror"');
    expect(research).toContain("Chais Sabir Allah Mirror");
  });

  it("records the creator-authored claim as provenance without representing a formal rights outcome", () => {
    const repository = page("SpecialRepository.tsx");
    expect(repository).toContain("Owner-Authored Claim Record");
    expect(repository).toContain("creator claim recorded");
    expect(repository).toContain("not a filing, registration, license, adjudication, transfer, or enforcement outcome");
    expect(repository).toContain('handoff: "/creator-brand-registry"');
  });
});
