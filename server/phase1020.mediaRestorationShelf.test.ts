import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const catalog = readFileSync(resolve(process.cwd(), "client/src/lib/localMediaCatalog.ts"), "utf8");

describe("Phase 1020 — inventory-backed media restoration shelf", () => {
  it("renders a data-driven shelf from the bounded local inventory", () => {
    expect(home).toContain("function LocalMediaRestorationShelf()");
    expect(home).toContain("LOCAL_MEDIA_CATALOG");
    expect(home).toContain('id="local-media-restoration"');
    expect(catalog).toContain("METADATA RECORD");
    expect(catalog).toContain("video(15).mp4");
  });

  it("never presents play controls for records without a connected video source", () => {
    expect(home).toContain("record.sourceUrl ?");
    expect(home).toContain("OPEN RECORD");
    expect(home).not.toContain('>PLAY WHEN HOSTED<');
  });

  it("keeps connected playback visitor-controlled and non-autoplaying", () => {
    expect(home).toContain('controls preload="none"');
    expect(home).toContain("playsInline");
    expect(home).not.toContain("autoPlay");
  });
});
