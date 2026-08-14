import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 235 ScrollVerse Consortium", () => {
  it("registers the source-labeled consortium route with continuity, consent, and resilience boundaries", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/ConsortiumNexus.tsx");
    const blueprint = read("docs/phase235-scrollverse-consortium.md");
    const resilience = read("docs/phase235-self-hosted-resilience-input.md");
    const protectedMaterials = read("docs/phase235-protected-agent-materials.md");

    expect(app).toContain('import ConsortiumNexus from "./pages/ConsortiumNexus"');
    expect(app).toContain('<Route path="/consortium-nexus" component={ConsortiumNexus} />');
    expect(home).toContain('href: "/consortium-nexus"');
    expect(home).toContain('href: "/recovery-materials"');
    expect(home).toContain("Continuity & Recovery Record");
    expect(page).toContain("SCROLLVERSE CONSORTIUM");
    expect(page).toContain("One readable map. Many independent systems.");
    expect(page).toContain("No hidden handoffs. No shared secrets. No invisible authority.");
    expect(page).toContain("does not access, combine, recover, synchronize, or control external accounts");
    expect(page).toContain("AI roles are assistive patterns");
    expect(page).toContain("PROTECTED TRANSACTION AND SECRET GATE · FAIL-CLOSED");
    expect(page).toContain("Documentation is not execution. A simulation review is not authorization.");
    expect(page).toContain("Secret material belongs only in an owner-approved secret-management channel");
    expect(blueprint).toContain("One readable map; many independent systems; explicit consent at every connection");
    expect(resilience).toContain("No local model, Ollama instance, Docker service, n8n server");
    expect(resilience).toContain("not guaranteed permanence or uninterrupted access");
    expect(protectedMaterials).toContain("protected, non-executable architecture material");
    expect(protectedMaterials).toContain("Do not download, display, store, or copy");
    expect(protectedMaterials).toContain("Broadcasting, swapping, transferring, or signing before a fresh explicit confirmation");
  });

  it("keeps the institutional systems discovery key unique on the home page", () => {
    const home = read("client/src/pages/Home.tsx");
    const matches = home.match(/href: "\/institutional-systems-atlas"/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
