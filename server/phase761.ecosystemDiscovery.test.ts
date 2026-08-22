import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 761 — ScrollVerse Ecosystem Discovery", () => {
  it("registers the browser-local ecosystem discovery route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/ecosystem-discovery" component={EcosystemDiscovery}');
  });

  it("connects the major ScrollVerse pathways with visible current states", () => {
    const page = read("client/src/pages/EcosystemDiscovery.tsx");
    for (const title of ["Digital Mirror Twin", "Sources and archive", "Visual identity", "Learning and research", "Game Worlds", "Music and media", "Fashion and catalog", "Business readiness"]) expect(page).toContain(title);
    for (const route of ["/digital-mirror-twin", "/connected-source-registry", "/protected-visual-evidence-hub", "/game-worlds-studio", "/media-release-concept-board", "/fashion-empire", "/capital-readiness"]) expect(page).toContain(route);
    expect(page).toContain('state: "available now"');
    expect(page).toContain('state: "research"');
    expect(page).toContain('state: "requires owner release"');
  });

  it("keeps external activation outside the discovery route", () => {
    const page = read("client/src/pages/EcosystemDiscovery.tsx");
    expect(page).toContain("This route does not create an account, collect payment, publish media, activate a provider, mint an asset, issue a token, conduct a financial transaction, or change an external platform state.");
  });
});
