import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const homePath = path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx");
const homeSource = fs.readFileSync(homePath, "utf8");

describe("Phase 355 — Penny for Your Thoughts persistent navigation", () => {
  it("keeps a concise primary navigation handoff to the main-page listening spotlight", () => {
    expect(homeSource).toContain('{ label: "Penny", href: "#penny-for-your-thoughts" }');
    expect(homeSource).toContain('id="penny-for-your-thoughts"');
    expect(homeSource).toContain("Enter the video");
    expect(homeSource).toContain("Release-readiness path");
  });
});
