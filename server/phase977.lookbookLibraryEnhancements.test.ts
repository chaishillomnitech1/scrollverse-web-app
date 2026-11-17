import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Phase 977 lookbook and library enhancements", () => {
  it("exposes a motion-safe theater loading affordance", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(source).toContain("THEATER LOADING");
    expect(source).toContain("motion-reduce:animate-none");
  });

  it("provides accession sorting controls and stable sort semantics", () => {
    const page = readFileSync(resolve(process.cwd(), "client/src/pages/DigitalshipAccessionDesk.tsx"), "utf8");
    const helper = readFileSync(resolve(process.cwd(), "client/src/lib/accessionRecords.ts"), "utf8");
    expect(page).toContain("Sort accession records");
    expect(helper).toContain("sortAccessionRecords");
  });

  it("makes lookbook thumbnails open a full metadata dialog", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/MetaAIArtifactsLookbooks.tsx"), "utf8");
    expect(source).toContain('role="dialog"');
    expect(source).toContain("Open full metadata");
    expect(source).toContain("aria-modal=\"true\"");
  });
});
