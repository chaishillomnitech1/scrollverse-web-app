import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 706 — Episode 52 Source-Absence Gate", () => {
  it("preserves the owner-supplied title without fabricating underlying episode content", () => {
    const episode = read("client/src/pages/Episode45ProtectedReference.tsx");
    expect(episode).toContain("Episode52ProtectedReference");
    expect(episode).toContain("Final Structural Expansion");
    expect(episode).toContain("Direct Episode 52 source · not present in active workspace");
    expect(episode).toContain("NO SYNTHETIC COMPLETION");
  });

  it("retains explicit source reattachment and no-execution boundaries", () => {
    const episode = read("client/src/pages/Episode45ProtectedReference.tsx");
    expect(episode).toContain("source reattachment required");
    expect(episode).toContain("does not reconstruct, publish, infer, execute, or validate");
    expect(episode).toContain("externalAction: \"none\"");
  });

  it("registers the Episode 52 recovery-gate route", () => {
    expect(read("client/src/App.tsx")).toContain("/episode-52-final-structural-expansion");
  });
});
