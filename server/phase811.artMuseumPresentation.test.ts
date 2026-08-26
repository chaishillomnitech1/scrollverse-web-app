import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 811 — Art Museum public presentation", () => {
  it("centers collection stories, source trails, and dedicated item pathways", () => {
    const museum = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ArtMuseum.tsx"), "utf8");
    expect(museum).toContain("Every added work begins with its story and record.");
    expect(museum).toContain("living collection memory");
    expect(museum).toContain("dedicated collection path");
    expect(museum).not.toContain("Every added work begins with a record—not a claim.");
  });
});
