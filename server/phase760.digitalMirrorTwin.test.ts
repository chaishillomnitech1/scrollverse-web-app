import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 760 — Digital Mirror Twin", () => {
  it("registers the Digital Mirror Twin as a browser-local route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/digital-mirror-twin" component={DigitalMirrorTwin}');
  });

  it("connects five mirror lanes to source, visual, media, fashion, and game-world routes", () => {
    const page = read("client/src/pages/DigitalMirrorTwin.tsx");
    for (const label of ["Source trail", "Image and style", "Story and sound", "Fashion and identity", "Game-world extension"]) expect(page).toContain(label);
    for (const route of ["/connected-source-registry", "/protected-visual-evidence-hub", "/media-release-concept-board", "/fashion-empire", "/game-worlds-studio"]) expect(page).toContain(route);
    expect(page).toContain("SIGNATURE SYSTEM");
    expect(page).toContain("COLLECTIBLE READINESS");
  });

  it("keeps the concept separate from a token, wallet, contract, or marketplace action", () => {
    const page = read("client/src/pages/DigitalMirrorTwin.tsx");
    const notes = read("docs/phase760-digital-mirror-twin-source-intake.md");
    expect(page).toContain("This concept route does not mint an NFT, issue a coin or token, deploy a contract");
    expect(notes).toContain("It does not independently establish a minted asset, digital coin, private repository, token contract");
    expect(notes).toContain("No token mint, contract creation, wallet action, token issue, asset listing, sale, transfer, or exchange");
  });
});
