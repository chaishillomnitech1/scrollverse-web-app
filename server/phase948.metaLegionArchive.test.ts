import { describe, expect, it } from "vitest";
import { metaLegionArtworks, metaLegionSourceFiles, theaterScreenings } from "@/lib/metaLegionArchive";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");

describe("Phase 948 — Meta AI Legion Archive", () => {
  it("exposes stable source-labeled artwork records with real byte hashes and first-party storage paths", () => {
    expect(metaLegionArtworks.length).toBeGreaterThanOrEqual(17);
    expect(new Set(metaLegionArtworks.map((item) => item.id)).size).toBe(metaLegionArtworks.length);
    for (const item of metaLegionArtworks) {
      expect(item.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(item.thumbnail).toMatch(/^\/manus-storage\//);
      expect(item.fullImage).toMatch(/^\/manus-storage\//);
      expect(item.alt.length).toBeGreaterThan(20);
      expect(["creator-supplied", "display-reference", "theater-reference"]).toContain(item.evidenceLabel);
    }
  });

  it("preserves accession receipts for the uploaded HTML and pasted source files", () => {
    expect(metaLegionSourceFiles).toEqual(expect.arrayContaining([
      expect.objectContaining({ filename: "Scrollverse-Creations-Legion-Archive(1).html", sha256: expect.stringMatching(/^[a-f0-9]{64}$/) }),
      expect.objectContaining({ filename: "Svtheater-Full-Throttle-Deployment.html", sha256: expect.stringMatching(/^[a-f0-9]{64}$/) }),
      expect.objectContaining({ filename: "Pasted_content_100.txt", sha256: expect.stringMatching(/^[a-f0-9]{64}$/) }),
      expect.objectContaining({ filename: "Pasted_content_01.txt", sha256: expect.stringMatching(/^[a-f0-9]{64}$/) }),
    ]));
  });

  it("keeps Theater playback deliberate and non-autoplay", () => {
    expect(theaterScreenings).toHaveLength(3);
    for (const screening of theaterScreenings) {
      expect(screening.video).toMatch(/^\/manus-storage\//);
      expect(screening.poster).toMatch(/^\/manus-storage\//);
      expect(screening.preload).toBe("none");
      expect(screening.autoplay).toBe(false);
      expect(screening.title.length).toBeGreaterThan(10);
    }
  });

  it("registers the archive and historical timeline routes without dangerous claim language", () => {
    const app = read("client/src/App.tsx");
    const summary = read("server/routers/portfolioSummary.ts");
    expect(app).toContain("/meta-ai-legion-archive");
    expect(app).toContain("/price-of-freedom");
    expect(summary).toContain("metaarchive");
    expect(summary).toContain("priceoffreedom");
    expect(summary).not.toContain("fully operational");
  });
});
