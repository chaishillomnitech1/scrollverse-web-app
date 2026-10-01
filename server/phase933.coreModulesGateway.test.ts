import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = () => readFileSync("client/src/pages/Home.tsx", "utf8");
const app = () => readFileSync("client/src/App.tsx", "utf8");

const modules = [
  "site-map",
  "omni-chess",
  "sacred-frequencies",
  "zernio-distribution",
  "red-diamond-fleet",
  "knicks-nft",
  "manifest",
  "chxtoken",
  "crypto",
  "library",
  "global-map",
  "codex-1587",
];

describe("Phase 933 — Core Modules homepage gateway", () => {
  it("exposes every requested module as a local first-party path", () => {
    const source = home();
    for (const slug of modules) {
      expect(source).toContain(`href: "/${slug}"`);
    }
    expect(source).toContain("CoreModulesGateway");
    expect(source).toContain("FIRST-PARTY ROUTE");
    expect(source).toContain("<CoreModulesGateway />");
  });

  it("keeps the gateway aligned with registered App routes", () => {
    const source = app();
    for (const slug of modules) {
      expect(source).toContain(`/${slug}`);
    }
  });
});
