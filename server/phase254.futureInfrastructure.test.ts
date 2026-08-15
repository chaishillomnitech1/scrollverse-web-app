import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 254 — Future Infrastructure Blueprint", () => {
  const page = read("client/src/pages/FutureInfrastructureBlueprint.tsx");
  const app = read("client/src/App.tsx");
  const home = read("client/src/pages/Home.tsx");
  const sources = read("docs/phase254-future-infrastructure-sources.md");

  it("registers and discovers the source-labeled blueprint", () => {
    expect(app).toContain('Route path="/future-infrastructure-blueprint" component={FutureInfrastructureBlueprint}');
    expect(home).toContain('href: "/future-infrastructure-blueprint"');
  });

  it("covers post-quantum, financial-service, IP, domain, and creator research lanes with public sources", () => {
    expect(page).toContain("Post-quantum security");
    expect(page).toContain("Financial-service categories");
    expect(page).toContain("IP research pathways");
    expect(page).toContain("Domain research and stewardship");
    expect(sources).toContain("NIST FIPS 203");
    expect(sources).toContain("FinCEN");
    expect(sources).toContain("USPTO");
    expect(sources).toContain("ICANN");
  });

  it("keeps research notes browser-local and preserves fail-closed financial and on-chain boundaries", () => {
    expect(page).toContain("BROWSER-LOCAL STUDY NOTE");
    expect(page).toContain("Operating state: public research and first-party preparation");
    expect(page).toContain("Operating state: research and creator-commerce planning");
  });
});
