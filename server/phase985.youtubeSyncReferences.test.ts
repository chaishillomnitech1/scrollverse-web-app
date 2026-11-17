import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 985 YouTube synchronization references", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/pages/ChaisVideos.tsx"), "utf8");

  it("keeps the supplied YouTube references visible as source-labeled direct handoffs", () => {
    expect(source).toContain("https://youtu.be/0_oCySkU4Jc?is=55sHsCeqVrk8KztP");
    expect(source).toContain("https://youtu.be/rX4frFXGUfs");
    expect(source).toContain("SOURCE SYNCHRONIZATION REFERENCES");
    expect(source).toContain("Open source on YouTube");
  });

  it("does not turn synchronization references into autoplay embeds", () => {
    expect(source).toContain("No autoplay or account action");
    expect(source).not.toContain("autoplay=1");
  });
});
