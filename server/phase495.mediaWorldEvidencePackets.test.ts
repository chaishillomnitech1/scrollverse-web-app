import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const mediaHub = readFileSync(resolve(root, "client/src/pages/MediaHub.tsx"), "utf8");
const packets = readFileSync(resolve(root, "client/src/pages/MediaWorldEvidencePackets.tsx"), "utf8");
const record = readFileSync(resolve(root, "docs/phase495-media-world-individual-evidence-packets.md"), "utf8");

describe("Phase 495 — Media World individual evidence packets", () => {
  it("registers the browser-local Media World packet route and exposes it from Media Hub", () => {
    expect(router).toContain('path={"/media-world-evidence-packets"}');
    expect(router).toContain("MediaWorldEvidencePackets");
    expect(mediaHub).toContain("Open visual evidence packets");
    expect(mediaHub).toContain('href: "/media-world-evidence-packets"');
  });

  it("maintains one source and release-readiness packet for each selected owner-brand visual group", () => {
    for (const id of ["SV-MW-495-001", "SV-MW-495-002", "SV-MW-495-003", "SV-MW-495-004"]) expect(packets).toContain(id);
    expect(packets).toContain("Bust trilogy");
    expect(packets).toContain("Sticker pack");
    expect(packets).toContain("Holographic pack");
    expect(packets).toContain("Black-and-gold poster");
    expect(record).toContain("SHA-256");
  });

  it("keeps the packet pathway browser-local and excludes media, commerce, provider, schedule, and outreach activation", () => {
    expect(packets).toContain("does not render the source files");
    expect(packets).toContain("publish or embed media");
    expect(packets).toContain("does not authorize media publication, upload, distribution, licensing, sale, minting, checkout, outreach, scheduling, or a provider change");
    expect(record).toContain("requires owner release");
  });
});
