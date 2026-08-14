import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 231 Hypothetical Systems Sparring Lab", () => {
  it("registers a source-labeled local comparison lab without ruler-selection or winner claims", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/HypotheticalSystemsLab.tsx");
    const method = read("docs/phase231-hypothetical-systems-sparring-lab.md");
    expect(app).toContain('import HypotheticalSystemsLab from "./pages/HypotheticalSystemsLab"');
    expect(app).toContain('<Route path="/hypothetical-systems-lab" component={HypotheticalSystemsLab} />');
    expect(home).toContain('href: "/hypothetical-systems-lab"');
    expect(page).toContain("Systems Sparring Lab");
    expect(page).toContain("No universal composite score");
    expect(page).toContain("does not select leaders");
    expect(page).toContain("Independent outcome evidence");
    expect(method).toContain("does not calculate a winner");
  });
});
