import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { theaterScreenings } from "../client/src/lib/metaLegionArchive";
import { gameBuildArtifacts, gamePreviewGenres, gamePreviewRecords } from "../client/src/lib/omnilandGamePreview";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");

describe("Phase 1034 — Omniland live game-preview build", () => {
  it("exposes the requested genre lanes and stable preview records", () => {
    expect(page).toContain("LIVE GAME-PREVIEW BUILD");
    for (const genre of ["ACTION", "SPORTS", "WAR", "URBAN STREET", "COMIC / CARTOON", "RACING", "STRATEGY / SIMULATION"] as const) expect(gamePreviewGenres).toContain(genre);
    expect(page).toContain("gamePreviewRecords");
    expect(page).toContain("OPEN RECORD");
    expect(page).toContain("sourceUrl");
    expect(gamePreviewRecords.length).toBeGreaterThanOrEqual(8);
    expect(new Set(gamePreviewRecords.map((record) => record.id)).size).toBe(gamePreviewRecords.length);
    for (const record of gamePreviewRecords) {
      expect(record.title.length).toBeGreaterThan(0);
      expect(record.description.length).toBeGreaterThan(0);
      expect(record.thumbnail.length).toBeGreaterThan(0);
      expect(record.recordHref.length).toBeGreaterThan(0);
    }
  });

  it("keeps visitor-controlled playback limited to confirmed theater records", () => {
    expect(theaterScreenings.length).toBeGreaterThan(0);
    expect(page).toContain('controls');
    expect(page).toContain('preload="none"');
    expect(page).toContain("playsInline");
    expect(page).not.toContain("autoPlay");
    expect(page).toContain("DcIHMBdxQHT");
    expect(page).toContain("visual reference");
    expect(page).not.toContain("Instagram reel playable");
    expect(gamePreviewRecords.filter((record) => record.sourceUrl).every((record) => record.sourceLabel === "CONFIRMED THEATER MEDIA")).toBe(true);
    expect(gamePreviewRecords.filter((record) => !record.sourceUrl).every((record) => record.sourceLabel === "LOCAL CATALOG RECORD")).toBe(true);
  });

  it("indexes concrete local build artifacts without presenting them as hosted downloads", () => {
    expect(page).toContain("LOCAL BUILD ARTIFACTS");
    expect(gameBuildArtifacts).toContainEqual(expect.objectContaining({
      id: "BUILD-PLAYABLE-GAME-UI-SOVEREIGN",
      filename: "Playable-Game-Ui-Sovereign.html",
      bytes: 4874590,
      sha256: "656e5c5503312c1f599351326e51a08bdb6b7ec3af3bb74784a6842f20f18c79",
      availability: "LOCAL DOWNLOAD RECORD · NOT HOSTED",
    }));
    expect(page).toContain("NOT HOSTED");
    expect(page).not.toContain('href="file:///home/ubuntu/upload');
  });
});
