import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 855 — Chais Sabir Allah Mirror", () => {
  it("builds a creator-authored Mirror profile with direct first-party collaboration paths", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ChaisSabirAllahMirror.tsx"), "utf8");
    expect(page).toContain("CHAIS SABIR ALLAH MIRROR · FIRST-PARTY PROFILE");
    expect(page).toContain("CREATOR-AUTHORED DIGITAL TWIN");
    expect(page).toContain("44:OMNI");
    expect(page).toContain("Speak with the Mirror");
    expect(page).toContain('href: "/ai-twin"');
    expect(page).toContain('href: "/ai-chat-upload"');
    expect(page).toContain('href: "/ai-companion-hub"');
    expect(page).toContain('href: "/ai-legion-apex"');
    expect(page).toContain("does not initiate external account, financial, contract, provider, physical-world, or governance actions");
    expect(page).toContain("OWNER-AUTHORED PURPOSE ARC");
    expect(page).toContain("each practical capability is added only when it has a visible first-party path");
  });

  it("registers the public Mirror route and connects it from Digital DNA, the home beacon, and AI Legion", () => {
    const app = readFileSync(resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const dna = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorDigitalDNA.tsx"), "utf8");
    const home = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    const legion = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AILegionApex.tsx"), "utf8");
    expect(app).toContain("ChaisSabirAllahMirror");
    expect(app).toContain('path={"/chais-sabir-allah-mirror"}');
    expect(dna).toContain("Chais Sabir Allah Mirror");
    expect(dna).toContain('route: "/chais-sabir-allah-mirror"');
    expect(home).toContain("Meet the Mirror");
    expect(home).toContain('href="/chais-sabir-allah-mirror"');
    expect(legion).toContain("CREATOR-CONTEXT HANDOFF");
    expect(legion).toContain("Open Mirror profile");
  });
});
