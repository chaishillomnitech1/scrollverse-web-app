import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 504 Episodic Production Slate", () => {
  it("registers a source-labeled episodic planning route", () => {
    const router = read("client/src/App.tsx");
    expect(router).toContain('import EpisodicProductionSlate from "./pages/EpisodicProductionSlate"');
    expect(router).toContain('<Route path={"/episodic-production-slate"} component={EpisodicProductionSlate} />');
  });

  it("keeps owner-provided episode source material in rights-aware research", () => {
    const page = read("client/src/pages/EpisodicProductionSlate.tsx");
    expect(page).toContain("Pasted_content_88.txt");
    expect(page).toContain("Pasted_content_89.txt and Pasted_content_90.txt");
    expect(page).toContain("Original character/title decision");
    expect(page).toContain("No episode is published, playing, licensed, or represented as complete.");
  });

  it("does not create media, playback, or provider actions from a local outline", () => {
    const page = read("client/src/pages/EpisodicProductionSlate.tsx");
    const lookbooks = read("client/src/pages/MetaAIArtifactsLookbooks.tsx");
    expect(page).toContain("No script, narration, media, playback, or publication action was created.");
    expect(page).toContain("cannot create a script, narration, media asset, player, hosting destination, release, product, or paid experience");
    expect(lookbooks).toContain('href="/episodic-production-slate"');
  });
});
