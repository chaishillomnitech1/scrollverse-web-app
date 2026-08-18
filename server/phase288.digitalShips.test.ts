import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const digitalShips = fs.readFileSync(path.join(root, "client/src/pages/DigitalShips.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const juniorMovies = fs.readFileSync(path.join(root, "client/src/pages/JuniorMovies.tsx"), "utf8");
const books = fs.readFileSync(path.join(root, "client/src/pages/Books.tsx"), "utf8");

describe("Phase 288 — Digital Ships comic interaction", () => {
  it("registers an original browser-local comic room with motion, voice-ready cues, and release boundaries", () => {
    expect(app).toContain('path={"/digital-ships"} component={DigitalShips}');
    expect(digitalShips).toContain('useSovereignHeartbeat({ page: "digital-ships" })');
    expect(digitalShips).toContain("speechSynthesis");
    expect(digitalShips).toContain("prefers-reduced-motion");
    expect(digitalShips).toContain("browser-local draft only");
    expect(digitalShips).toContain("Adult-supported participation");
    expect(digitalShips).toContain("no public reactions, posting, or external voice service is active");
    expect(juniorMovies).toContain('href="/digital-ships"');
    expect(books).toContain('href="/digital-ships"');
  });

  it("keeps Legion Story Hub guides original, browser-local, and creator controlled", () => {
    expect(digitalShips).toContain("LEGION_GUIDES");
    expect(digitalShips).toContain("The Archivist");
    expect(digitalShips).toContain("The Carekeeper");
    expect(digitalShips).toContain("original browser-local story roles");
    expect(digitalShips).toContain("not connected accounts, autonomous public actors, legal authorities, or external AI systems");
    expect(digitalShips).toContain("Use guide lens in draft");
    expect(digitalShips).toContain("scheduled programming");
  });
});
