import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const files = [
  "client/src/components/SharedToolRegistry.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/CEOMuseTheGreat.tsx",
  "client/src/pages/AILegion.tsx",
].map((file) => readFileSync(file, "utf8"));

describe("Phase 1040 — shared tool registry embedding", () => {
  it("embeds the shared registry across ScrollVerse.co, Muse, and the Legion surface", () => {
    expect(files[0]).toContain("SHARED TOOL REGISTRY");
    expect(files[0]).toContain("CONNECTED");
    expect(files[0]).toContain("WAITING ON AUTHORIZATION");
    expect(files[0]).toContain("named record");
    for (const page of files.slice(1)) expect(page).toContain("SharedToolRegistry");
  });

  it("keeps embedding metadata-only and does not activate connectors", () => {
    expect(files[0]).toContain("does not invoke external connectors");
    expect(files[0]).toContain("every Legion citizen inherits this shared layer");
  });
});
