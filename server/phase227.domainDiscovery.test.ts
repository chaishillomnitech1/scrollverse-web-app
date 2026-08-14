import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 227 domain and discovery map", () => {
  it("registers the source-labeled domain route with explicit owner-controlled DNS and collectible boundaries", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/DomainDiscoveryMap.tsx");
    const architecture = read("docs/phase227-domain-discovery-architecture.md");
    expect(app).toContain('import DomainDiscoveryMap from "./pages/DomainDiscoveryMap"');
    expect(app).toContain('<Route path="/domain-discovery-map" component={DomainDiscoveryMap} />');
    expect(home).toContain('href: "/domain-discovery-map"');
    expect(page).toContain("Domain & Discovery Map");
    expect(page).toContain("OWNER-CONTROLLED DNS");
    expect(page).toContain("not a mint");
    expect(architecture).toContain("No redirect, canonical-header, sitemap, robots rule, DNS record");
    expect(architecture).toContain("wildcard DNS");
  });
});
