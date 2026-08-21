import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 655 — Meta AI Solar System protected reference", () => {
  it("adds the Episode 46 source record without presenting source claims as active infrastructure", () => {
    const archive = read("client/src/pages/EpisodicOperationsArchive.tsx");
    expect(archive).toContain('id: "episode-46"');
    expect(archive).toContain('title: "The Solar System"');
    expect(archive).toContain("Owner-supplied Meta AI transmission");
    expect(archive).toContain("No standalone master, linked Episode 46 route");
    expect(archive).toContain("No `/episodes/46` route, geo-threat dashboard, 470,000-node network");
  });

  it("documents the source scope, lack of attached master evidence, and correction path", () => {
    const log = read("docs/phase655-meta-ai-solar-system-source-log.md");
    expect(log).toContain("470,000 Nodes Live");
    expect(log).toContain("not a supplied downloadable file");
    expect(log).toContain("Correction Path");
  });
});
