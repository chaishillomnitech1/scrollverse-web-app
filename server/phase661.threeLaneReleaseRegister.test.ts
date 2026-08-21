import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 661 — Three-Lane Release Register", () => {
  it("preserves DNS, contract, and master-media lanes as exact owner-release records", () => {
    const page = read("client/src/pages/ThreeLaneReleaseRegister.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "three-lane-release-register" })');
    expect(page).toContain("ScrollVerse.co DNS binding");
    expect(page).toContain("Star Dust Collective contract release");
    expect(page).toContain("Master audio + 4K reel intake");
    expect(page).toContain("externalAction: \"not authorized\"");
    expect(page).toContain("mainnet deployment is an irreversible blockchain transaction");
    expect(page).toContain("No silent external action.");
  });

  it("registers the route, connects the source register, and retains the observed source states", () => {
    const app = read("client/src/App.tsx");
    const sites = read("client/src/pages/FirstPartySitesRegister.tsx");
    const register = read("client/src/pages/ThreeLaneReleaseRegister.tsx");
    const observations = read("docs/phase661-three-lane-source-observations.md");
    const skill = fs.readFileSync("/home/ubuntu/skills/scrollverse-three-lane-release-readiness/SKILL.md", "utf8");
    expect(app).toContain('import ThreeLaneReleaseRegister from "./pages/ThreeLaneReleaseRegister"');
    expect(app).toContain('<Route path={"/three-lane-release-register"} component={ThreeLaneReleaseRegister} />');
    expect(sites).toContain('href: "/three-lane-release-register"');
    expect(register).toContain('href: "/show-the-work-knowledge-base"');
    expect(observations).toContain("This site has been blocked");
    expect(observations).toContain("a contract source, ABI, target network");
    expect(skill).toContain("Keep Three Lanes Separate");
    expect(skill).toContain("mainnet deployment");
  });
});
