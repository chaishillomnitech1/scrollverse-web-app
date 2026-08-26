import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 650 — Authenticity Frequency Brand Identity Record", () => {
  it("presents the original working company, mark, mascot, asset, and exact release boundary", () => {
    const page = read("client/src/pages/BrandIdentityRecord.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "brand-identity-record" })');
    expect(page).toContain("Origin Ark Studios");
    expect(page).toContain("The Open Ark Seal");
    expect(page).toContain("Auri, the Signal Warden");
    expect(page).toContain("Authenticity is the highest frequency.");
    expect(page).toContain("externalAction: \"none\"");
    expect(page).toContain("origin-ark-studios-auri-signal-warden-logo_62a2af6b.png");
  });

  it("registers the route and retains the original-concept and dedicated release pathways", () => {
    const app = read("client/src/App.tsx");
    const brief = read("docs/phase650-authenticity-frequency-brand-brief.md");
    expect(app).toContain('import BrandIdentityRecord from "./pages/BrandIdentityRecord"');
    expect(app).toContain('<Route path={"/brand-identity-record"} component={BrandIdentityRecord} />');
    expect(brief).toContain("original browser-local **working identity**");
    expect(brief).toContain("Any external filing");
    expect(read("client/src/pages/BrandIdentityRecord.tsx")).toContain("DEDICATED RELEASE PATH");
    expect(read("client/src/pages/BrandIdentityRecord.tsx")).toContain("ready for their next record");
  });
});
