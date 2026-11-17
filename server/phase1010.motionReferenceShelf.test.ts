import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1010 motion reference shelf", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("surfaces the supplied video batch as visible source-labeled records", () => {
    expect(home).toContain("NEWLY SUPPLIED MOTION REFERENCES");
    expect(home).toContain("video(29).mp4");
    expect(home).toContain("video(25).mp4");
    expect(home).toContain("video(19).mp4");
    expect(home).toContain("video(15).mp4");
    expect(home).toContain("882624278_1137936855357590_1709471996901120998_n.mp4");
    expect(home).toContain("METADATA-ONLY SOURCE RECEIPT");
  });

  it("keeps each record visitor-controlled and routes to the accession desk", () => {
    expect(home).toContain("Choose a source record to review");
    expect(home).toContain("/digitalship-accession");
    expect(home).toContain("No autoplay");
    expect(home).toContain("raw upload remains outside the production bundle");
  });
});
