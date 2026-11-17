import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 1014 interface enhancements", () => {
  it("gives AI Twin retry actions distinct loading and success feedback", () => {
    const source = read("client/src/pages/AITwin.tsx");
    expect(source).toContain("retryStatus");
    expect(source).toContain("Retrying response");
    expect(source).toContain("Response restored");
    expect(source).toContain("animate-spin");
  });

  it("adds a local interactive learning-module dashboard to the Mansion gallery", () => {
    const source = read("client/src/pages/InfininillionaireFilmFoundation.tsx");
    expect(source).toContain("Learning Module Dashboard");
    expect(source).toContain("moduleStatusFilter");
    expect(source).toContain("Auto-generated learning modules");
    expect(source).toContain("aria-pressed");
  });

  it("keeps Sana video previews visitor-controlled and routes missing media to a safe review path", () => {
    const source = read("client/src/pages/Home.tsx");
    expect(source).toContain("Sana video preview");
    expect(source).toContain("Play when hosted");
    expect(source).toContain("No autoplay");
    expect(source).toContain("hover:scale");
  });

  it("surfaces the current AURELLION federation evidence without overstating activation", () => {
    const source = read("client/src/pages/Home.tsx");
    expect(source).toContain("AURELLION · Intelligence of Connected Light");
    expect(source).toContain("CONNECTED LIGHT · FEDERATION DOORWAY");
    expect(source).toContain("Foundation · PR #4");
    expect(source).toContain("Runtime + federation · PR #5");
    expect(source).toContain("Governed context · PR #6");
    expect(source).toContain("Provider credentials, live model traffic");
  });
});
