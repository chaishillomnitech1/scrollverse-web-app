import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 187 public portfolio governance boundary", () => {
  it("keeps public repository patterns separate from private access, external authority, and commercial activation", () => {
    const register = read("docs/phase187-public-portfolio-governance-source-register.md");
    const handoff = read("docs/phase187-public-portfolio-governance-review-handoff.md");
    const app = read("client/src/App.tsx");
    expect(register).toContain("51 publicly visible repositories");
    expect(register).toContain("No repository code was executed");
    expect(handoff).toContain("does not access private repositories");
    expect(handoff).toContain("Absence of a record is an evidence gap");
    expect(app).toContain('<Route path="/public-portfolio-governance" component={PublicPortfolioGovernance} />');
  });
});
