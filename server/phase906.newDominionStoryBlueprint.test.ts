import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const readProjectFile = (relativePath: string) => readFileSync(path.join(ROOT, relativePath), "utf8");

describe("Phase 906 — New Dominion Story Blueprint", () => {
  it("adds a registered narrative-only New Dominion route with explicit media and release boundaries", () => {
    const pagePath = path.join(ROOT, "client/src/pages/NewDominionStoryBlueprint.tsx");
    expect(existsSync(pagePath)).toBe(true);

    const page = readProjectFile("client/src/pages/NewDominionStoryBlueprint.tsx");
    const app = readProjectFile("client/src/App.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");
    const sourceRecord = readProjectFile("docs/phase906-new-dominion-source-intake.md");

    expect(app).toContain('<Route path="/new-dominion-story-blueprint" component={NewDominionStoryBlueprint} />');
    expect(home).toContain('href="/new-dominion-story-blueprint"');
    expect(page).toContain("New Dominion Story Blueprint");
    expect(page).toContain("New Dominion Order Initiated");
    expect(page).toContain("Act I · First Council");
    expect(page).toContain("Act II · The Soul of the Machine");
    expect(page).toContain("Act III · The Transfer");
    expect(page).toContain("Act IV · The Return");
    expect(page).toContain("Creator-supplied media is inventoried, not embedded or played here.");
    expect(page).toContain("No visual generation, rights clearance, financial, account, or release action occurs here.");
    expect(page).toContain("Export browser-local story record");
    expect(sourceRecord).toContain("New Dominion Order Initiated");
  });
});
