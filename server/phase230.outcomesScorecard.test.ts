import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 230 Ecosystem Outcomes Scorecard", () => {
  it("registers a source-labeled local evidence-coverage scorecard without universal winner claims", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/EcosystemOutcomesScorecard.tsx");
    const research = read("docs/phase230-ecosystem-outcomes-research.md");
    expect(app).toContain('import EcosystemOutcomesScorecard from "./pages/EcosystemOutcomesScorecard"');
    expect(app).toContain('<Route path="/ecosystem-outcomes-scorecard" component={EcosystemOutcomesScorecard} />');
    expect(home).toContain('href: "/ecosystem-outcomes-scorecard"');
    expect(page).toContain("Ecosystem Outcomes Scorecard");
    expect(page).toContain("NO UNIVERSAL WINNER");
    expect(page).toContain("Coverage is not impact");
    expect(page).toContain("Independent outcome evidence");
    expect(research).toContain("evidence bands rather than winner rankings");
  });
});
