import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 657 — First-Party Sites and Shopify Activation Register", () => {
  it("separates available, research, and owner-release site states from provider operations", () => {
    const page = read("client/src/pages/FirstPartySitesRegister.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "first-party-sites-register" })');
    expect(page).toContain("ScrollVerse Portal");
    expect(page).toContain("Chais Hill Omnitech1 GitHub");
    expect(page).toContain("Meta AI Source Intake");
    expect(page).toContain("ScrollVerse Shopify Storefront");
    expect(page).toContain('state: "requires owner release"');
    expect(page).toContain('providerAction: "none"');
  });

  it("registers the route and documents the provider boundary", () => {
    const app = read("client/src/App.tsx");
    const log = read("docs/phase657-first-party-sites-register.md");
    expect(app).toContain('import FirstPartySitesRegister from "./pages/FirstPartySitesRegister"');
    expect(app).toContain('<Route path={"/first-party-sites-register"} component={FirstPartySitesRegister} />');
    expect(log).toContain("The register makes no Shopify, GitHub, Manus, Meta");
    expect(log).toContain("Provider operations remain separate exact actions.");
  });
});
