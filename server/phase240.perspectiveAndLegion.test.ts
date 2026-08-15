import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 240 — first-party perspective and AI Legion entry", () => {
  const lens = read("client/src/components/PortalTrustLens.tsx");
  const legion = read("client/src/pages/AILegionApex.tsx");

  it("centers source-led routes on first-party perspective and visitor assessment", () => {
    expect(lens).toContain("PORTAL PERSPECTIVE LENS");
    expect(lens).toContain("first-party ScrollVerse perspective");
    expect(lens).toContain("make your own assessment");
    expect(lens).toContain("independent due diligence");
  });

  it("opens a selected entity chat instead of routing to an unregistered ai-entity path", () => {
    expect(legion).toContain("OPEN CHAT →");
    expect(legion).toContain("onSelect(entity)");
    expect(legion).not.toContain("href={`/ai-entity/${entity.id}`}");
  });

  it("prevents Enter-key navigation while preserving keyboard message submission", () => {
    expect(legion).toContain("e.preventDefault();\n              handleSend();");
    expect(legion).toContain("e.preventDefault();\n              councilMutation.mutate");
    expect(legion).toContain("e.preventDefault();\n              analysisMutation.mutate");
  });
});
