import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 504 Meta AI Artifacts and Lookbooks", () => {
  it("registers the dedicated source-labeled visual discovery route", () => {
    const router = read("client/src/App.tsx");
    expect(router).toContain('import MetaAIArtifactsLookbooks from "./pages/MetaAIArtifactsLookbooks"');
    expect(router).toContain('<Route path={"/meta-ai-artifacts-lookbooks"} component={MetaAIArtifactsLookbooks} />');
  });

  it("keeps selected owner-brand assets visual while preserving release boundaries", () => {
    const page = read("client/src/pages/MetaAIArtifactsLookbooks.tsx");
    expect(page).toContain("SV-VIS-490-001");
    expect(page).toContain("SV-VIS-490-004");
    expect(page).toContain("/manus-storage/chais_bust_gold_transparent_4f1b33be.png");
    expect(page).toContain("not listings, product claims, price records, licenses");
    expect(page).toContain("No media, product, checkout, or publishing action was created.");
  });

  it("adds an immediate main-page artifact atlas handoff", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('title: "Meta AI Artifacts & Lookbooks"');
    expect(home).toContain('href: "/meta-ai-artifacts-lookbooks"');
  });
});
