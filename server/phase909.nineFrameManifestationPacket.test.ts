import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const readProjectFile = (relativePath: string) => readFileSync(path.join(ROOT, relativePath), "utf8");

describe("Phase 909 — Nine-Frame Manifestation Planning Packet", () => {
  it("adds a registered creator-led frame packet with local exports and source-aware media boundaries", () => {
    const pagePath = path.join(ROOT, "client/src/pages/NineFrameManifestationPacket.tsx");
    expect(existsSync(pagePath)).toBe(true);

    const page = readProjectFile("client/src/pages/NineFrameManifestationPacket.tsx");
    const app = readProjectFile("client/src/App.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const receipt = readProjectFile("docs/phase908-creator-record-continuation-receipt.md");

    expect(app).toContain('<Route path="/nine-frame-manifestation-packet" component={NineFrameManifestationPacket} />');
    expect(home).toContain('href="/nine-frame-manifestation-packet"');
    expect(page).toContain("Nine-Frame Manifestation Planning Packet");
    expect(page).toContain("The Form");
    expect(page).toContain("The Chatbot");
    expect(page).toContain("Avatar in a Box");
    expect(page).toContain("The Manifestation");
    expect(page).toContain("Source reference is text-only; no supplied image or video is selected, embedded, or played here.");
    expect(page).toContain("Narrative-only route export");
    expect(page).toContain("Download formatted PDF");
    expect(page).toContain("Download CSV");
    expect(page).toContain("downloadNarrativeRoutePdf");
    expect(page).toContain("downloadNarrativeRouteCsv");
    expect(page).toContain('href="/new-dominion-story-blueprint"');
    expect(page).toContain('href="/digitalship-accession"');
    expect(receipt).toContain("Nine-Frame Manifestation Planning Packet");
  });
});
