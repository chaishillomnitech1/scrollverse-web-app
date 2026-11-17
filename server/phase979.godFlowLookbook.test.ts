import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Phase 979 God Flow lookbook", () => {
  it("exposes the three creator-supplied workshop looks with accessible metadata entry", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");
    expect(source).toContain("CIRCLE ZERO OUROBOROS");
    expect(source).toContain("PRETTY PAPER PAPER MAN");
    expect(source).toContain("DUAL HARMONIC DIGITAL TWIN QR");
    expect(source).toContain("GOD FLOW WORKSHOP");
    expect(source).toContain("Open full metadata");
  });

  it("uses the resilient source visual frame rather than a broken-image-only thumbnail", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");
    const visual = readFileSync(resolve(process.cwd(), "client/src/components/SourceVisual.tsx"), "utf8");
    expect(source).toContain('import SourceVisual from "@/components/SourceVisual"');
    expect(source).toContain("<SourceVisual");
    expect(visual).toContain("Text-led display");
  });
});
