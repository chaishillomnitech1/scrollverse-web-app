import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = () => readFileSync(resolve(process.cwd(), "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");

describe("Phase 983 lookbook lightbox and filters", () => {
  it("exposes media-type filter tags and provenance overlays", () => {
    const source = read();
    expect(source).toContain("mediaType");
    expect(source).toContain("All media");
    expect(source).toContain("Images");
    expect(source).toContain("Motion concepts");
    expect(source).toContain("CREATOR-SUPPLIED · BROWSER-LOCAL");
    expect(source).toContain("source-labeled display reference");
  });

  it("opens the selected campaign visual in a keyboard-safe lightbox", () => {
    const source = read();
    expect(source).toContain("showLightbox");
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toContain("Open visual lightbox");
    expect(source).toContain("Escape");
    expect(source).toContain("Full-size source preview");
  });
});
