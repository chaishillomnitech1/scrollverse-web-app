import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 893 Dynasty motion-source inventory", () => {
  it("keeps supplied motion records metadata-only, locally selectable, and gated from playback or release", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/DynastyVisualArchive.tsx"), "utf8");
    const record = fs.readFileSync(path.resolve(import.meta.dirname, "../docs/phase893-dynasty-motion-source-inventory.md"), "utf8");

    expect(page).toContain("MOTION_SOURCES");
    expect(page).toContain("DYNASTY MOTION SOURCE INVENTORY · METADATA ONLY");
    expect(page).toContain("Eleven supplied motion references, held for the next brief.");
    expect(page).toContain("No video is embedded or played here");
    expect(page).toContain("episode-4-the-civic-seal---dutch-angle-low-angle-o.mp4");
    expect(page).toContain("selectedMotionReference");
    expect(page).not.toContain("<video");
    expect(page).not.toContain("fetch(");
    expect(record).toContain("metadata-only source record");
    expect(record).toContain("A filename is not a production brief.");
    expect(record).toContain("No video is copied to the public site");
  });
});
