import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const read = (relativePath: string) => fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");

describe("Phase 803 — welcoming public presentation", () => {
  it("uses source context and reader choice on the public reference trail", () => {
    const page = read("client/src/pages/PublicReferenceTrail.tsx");

    expect(page).toContain("READING CONTEXT");
    expect(page).toContain("follow connections that resonate");
    expect(page).toContain("leaves room for each visitor’s own conclusion");
    expect(page).not.toContain("Limit:");
  });

  it("uses invitation-forward wording in the shared portal presentation component", () => {
    const component = read("client/src/components/PortalTrustLens.tsx");

    expect(component).toContain("READER INVITATION");
    expect(component).toContain("make your own reading");
    expect(component).not.toContain("SCOPE & CONTROL");
  });

  it("replaces defensive card labels in high-visibility study pages", () => {
    const comparison = read("client/src/pages/CapabilityComparison.tsx");
    const safeguards = read("client/src/pages/DigitalIntelligenceSafeguards.tsx");
    const monograph = read("client/src/pages/XLVIIIBlocksMonograph.tsx");

    expect(comparison).toContain("Comparable capabilities. Original evidence.");
    expect(comparison).toContain("OPEN STUDY");
    expect(comparison).toContain("READING CONTEXT");
    expect(safeguards).toContain("READER CONTEXT");
    expect(safeguards).toContain("These references enrich comparative study.");
    expect(monograph).toContain("SOURCE + READER LENS");
    expect(monograph).toContain("Reader invitation:");
    expect(monograph).toContain("Design study / explore the source layer");
    expect(monograph).not.toContain("<b className=\"text-[#F5F0EB]\">Limit:</b>");
  });
});
