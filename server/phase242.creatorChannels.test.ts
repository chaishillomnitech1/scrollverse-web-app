import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 242 — public creator-channel source review", () => {
  it("records the reviewed Mansa AI sources as external learning references", () => {
    const data = read("client/src/data/creatorChannelHandoffs.ts");
    const hub = read("client/src/pages/CreatorChannelHub.tsx");
    expect(data).toContain("Mansa AI Dreams — creator-learning reference");
    expect(data).toContain("Mansa AI overview — third-party source");
    expect(data).toContain("not independently adopted as ScrollVerse claims or financial guidance");
    expect(hub).toContain('"Mansa AI Dreams — creator-learning reference": "Learning reference"');
    expect(hub).toContain('"Mansa AI overview — third-party source": "Learning reference"');
  });

  it("retains the platform, monetization, and outcome boundaries", () => {
    const data = read("client/src/data/creatorChannelHandoffs.ts");
    expect(data).toContain("retain all access, rights, monetization, publishing, and policy decisions");
    expect(data).toContain("does not claim affiliation, endorsement, automation, or outcome verification");
  });
});
