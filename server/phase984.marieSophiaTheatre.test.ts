import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = () => readFileSync(resolve(process.cwd(), "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");

describe("Phase 984 Marie Sophia and theatre discovery cards", () => {
  it("exposes source-labeled Marie Sophia 721 lookbook concepts", () => {
    const source = read();
    expect(source).toContain("MARIE SOPHIA 721");
    expect(source).toContain("STILL LIGHT FIELD CYBER");
    expect(source).toContain("SOPHIA 8 BILLION SEALED");
    expect(source).toContain("OMNI-MERGE INFINITE PROTOCOL");
  });

  it("exposes the supplied Free Comic and Motherload theatre references", () => {
    const source = read();
    expect(source).toContain("Free Comic Book Series · Block 131");
    expect(source).toContain("Motherload Omniverse Theatre · Block 128");
    expect(source).toContain("Open source reference");
  });
});
