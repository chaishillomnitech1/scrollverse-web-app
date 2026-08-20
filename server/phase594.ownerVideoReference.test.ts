import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 594 — Owner-supplied video reference archive", () => {
  it("records the direct source reference and original narration direction without source-media reproduction", () => {
    const archive = read("docs/phase594-owner-video-reference-archive.md");
    const packet = read("client/src/pages/CreatorMediaPacket.tsx");

    expect(archive).toContain("Gv_3sj5qsb4");
    expect(archive).toContain("calm, smooth, clear");
    expect(archive).toContain("not replication of a person");
    expect(packet).toContain("OWNER-SUPPLIED VIDEO REFERENCE INDEX · RESEARCH");
    expect(packet).toContain("Narration direction retained for original ScrollVerse productions.");
  });

  it("retains the source boundary and requires original approved production inputs", () => {
    const archive = read("docs/phase594-owner-video-reference-archive.md");
    const packet = read("client/src/pages/CreatorMediaPacket.tsx");

    expect(archive).toContain("does not copy dialogue, clone a voice, download the video");
    expect(archive).toContain("exact piece title");
    expect(packet).toContain("No video is embedded, downloaded, reproduced, or used for voice imitation.");
  });
});
