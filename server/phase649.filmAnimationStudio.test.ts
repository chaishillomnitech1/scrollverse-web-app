import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 649 — Film and Animation Studio", () => {
  it("builds original production packs with specialist lanes, accessibility controls, and exact release gates", () => {
    const page = read("client/src/pages/FilmAnimationStudio.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "film-animation-studio" })');
    expect(page).toContain("Story + Production");
    expect(page).toContain("Film + Animation");
    expect(page).toContain("Voice + Sound");
    expect(page).toContain("Access + Captions");
    expect(page).toContain("Vaultlight: Act I");
    expect(page).toContain("Mainboard Chamber");
    expect(page).toContain("requires owner release");
    expect(page).toContain('providerAction: "none"');
    expect(page).toContain("No final master, performer engagement");
  });

  it("registers the studio and links it from the public episode release desk", () => {
    const app = read("client/src/App.tsx");
    const desk = read("client/src/pages/YouTubeEpisodeReleaseDesk.tsx");
    expect(app).toContain('import FilmAnimationStudio from "./pages/FilmAnimationStudio"');
    expect(app).toContain('<Route path={"/film-animation-studio"} component={FilmAnimationStudio} />');
    expect(desk).toContain('href: "/film-animation-studio"');
  });
});
