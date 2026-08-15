import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 237 — protected media catalog evidence", () => {
  const packet = read("client/src/pages/CreatorMediaPacket.tsx");
  const directory = read("client/src/pages/MasterDirectory.tsx");

  it("keeps a browser-local packet for book, audio, visual, and mixed-media catalog preparation", () => {
    expect(packet).toContain("Book / reader edition");
    expect(packet).toContain("Audio book / listening edition");
    expect(packet).toContain("Album / music catalog");
    expect(packet).toContain("Browser-local planning and local JSON export are available");
  });

  it("separates title/source, recording, composition, contributors, master, distribution, accessibility, and release evidence", () => {
    expect(packet).toContain("Recording / master rights state");
    expect(packet).toContain("Composition / text rights state");
    expect(packet).toContain("Contributor, credit, and permission questions");
    expect(packet).toContain("Audio / visual / reader master state");
    expect(packet).toContain("Distribution metadata state");
    expect(packet).toContain("Accessibility plan");
    expect(packet).toContain("Release decision");
  });

  it("retains no-upload, no-provider, no-distribution, no-mint, no-payment, no-wallet, and no-public-release boundaries", () => {
    expect(packet).toContain("No file upload, provider delivery");
    expect(packet).toContain("distribution delivery, listing, sale, license, collectible, or transaction");
    expect(directory).toContain("Catalog Evidence Packet");
  });
});
