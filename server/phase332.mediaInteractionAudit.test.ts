import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const mediaHub = fs.readFileSync(path.join(root, "client/src/pages/MediaHub.tsx"), "utf8");
const mediaWorld = fs.readFileSync(path.join(root, "client/src/pages/MediaWorld.tsx"), "utf8");
const juniorMovies = fs.readFileSync(path.join(root, "client/src/pages/JuniorMovies.tsx"), "utf8");
const digitalShips = fs.readFileSync(path.join(root, "client/src/pages/DigitalShips.tsx"), "utf8");
const voiceStudio = fs.readFileSync(path.join(root, "client/src/pages/VoiceLanguageStudio.tsx"), "utf8");
const books = fs.readFileSync(path.join(root, "client/src/pages/Books.tsx"), "utf8");

describe("Phase 332 — Local media and visitor interaction audit", () => {
  it("exposes Media Hub program and response selection as accessible browser-local controls", () => {
    expect(mediaHub).toContain('aria-label="Select a ScrollVerse media program"');
    expect(mediaHub).toContain("aria-pressed={selected}");
    expect(mediaHub).toContain('aria-label="Select an audience response"');
    expect(mediaHub).toContain("aria-pressed={reaction === choice}");
  });

  it("keeps the Media World brief workflow resilient and clearly labeled", () => {
    expect(mediaWorld).toContain("Clipboard access is unavailable");
    expect(mediaWorld).toContain('htmlFor="media-world-format"');
    expect(mediaWorld).toContain('id="media-world-brief"');
  });

  it("makes Junior Movies preview and channel playback controls keyboard-reachable", () => {
    expect(juniorMovies).toContain('aria-label="Play THOTH in the Junior Movies player"');
    expect(juniorMovies).toContain('aria-label="Play RA in the Junior Movies player"');
    expect(juniorMovies).toContain('aria-controls="junior-movies-channel-player"');
    expect(juniorMovies).toContain('id="junior-movies-channel-player"');
  });

  it("keeps Digital Ships and Voice Studio choices visibly stateful", () => {
    expect(digitalShips).toContain("aria-pressed={motionPaused}");
    expect(digitalShips).toContain("aria-pressed={activeGuide === index}");
    expect(voiceStudio).toContain('aria-label="Select a voice delivery direction"');
    expect(voiceStudio).toContain("aria-pressed={profileId === profile.id}");
  });

  it("avoids a nested button within the Books free-reader link and labels book options", () => {
    expect(books).toContain('role="tablist" aria-label={`${book.title} options`}');
    expect(books).toContain("aria-pressed={tab === t}");
    expect(books).toContain('className="flex-1 rounded-xl py-2.5 text-center text-sm font-bold');
  });
});
