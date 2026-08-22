import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 756 — Financial Continuum protected source intake", () => {
  it("preserves the supplied transmission as source context without adopting its operating assertions", () => {
    const notes = read("docs/phase756-financial-continuum-source-intake.md");
    expect(notes).toContain("protected source context");
    expect(notes).toContain("Non-executable reference only");
    expect(notes).toContain("Unverified source assertions");
    expect(notes).toContain("establish a regulated bank, broker, exchange, custodian, payment service");
  });

  it("adds the source-only boundary to the capital-readiness network", () => {
    const hub = read("client/src/pages/CapitalReadinessHub.tsx");
    expect(hub).toContain("PROTECTED SOURCE CONTEXT · FINANCIAL CONTINUUM");
    expect(hub).toContain("A supplied finance transmission is preserved as context, not operating proof.");
    expect(hub).toContain("/connected-source-registry");
  });
});
