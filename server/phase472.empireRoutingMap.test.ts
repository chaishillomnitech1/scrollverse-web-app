import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "client/src/pages/EmpireRoutingMap.tsx"), "utf8");
const atlas = fs.readFileSync(path.join(root, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");

describe("Phase 472 — Empire Routing Map", () => {
  it("registers the routing map and connects it from the central Atlas", () => {
    expect(app).toContain('path={"/empire-routing-map"} component={EmpireRoutingMap}');
    expect(page).toContain('useSovereignHeartbeat({ page: "empire-routing-map" })');
    expect(page).toContain("PortalTrustLens");
    expect(atlas).toContain('href: "/empire-routing-map"');
  });

  it("keeps public destinations, repository sources, free paths, and release lanes source-labeled", () => {
    expect(page).toContain("VERIFIED PUBLIC DESTINATIONS");
    expect(page).toContain("scrollverse-dev.myshopify.com");
    expect(page).toContain("https://github.com/chaishillomnitech1");
    expect(page).toContain("scrollverse-omni-manifesto");
    expect(page).toContain("FREE DISCOVERY + LEARNING PATHS");
    expect(page).toContain("RELEASE-REQUIRED LANES");
    expect(page).toContain("73 total repositories are owner-stated");
  });

  it("does not imply that routing activates a store, payment, provider, account, trade, token, or external action", () => {
    expect(page).toContain("SOURCE-LABELED ROUTING · NO EXTERNAL ACTION");
    expect(page).toContain("ROUTING IS NOT ACTIVATION");
    expect(page).toContain("does not inspect private repositories");
    expect(page).toContain("access or change Shopify");
    expect(page).toContain("Before any provider-side publication");
    expect(page).not.toContain("createHeartbeatJob");
  });
});
