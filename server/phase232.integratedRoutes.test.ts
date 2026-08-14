import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

const integratedRoutes = [
  "/scrollverse-chess-arena",
  "/xlviii-blocks-monograph",
  "/music-creator-release-readiness",
  "/open-knowledge-verse",
  "/standards-studio",
  "/hypothetical-systems-lab",
] as const;

describe("Phase 232 integrated route validation", () => {
  it("keeps every static internal Home discovery route registered in App", () => {
    const home = read("client/src/pages/Home.tsx");
    const app = read("client/src/App.tsx");
    const routes = [...home.matchAll(/href: "(\/[^\"]+)"/g)].map(match => match[1]);

    expect(routes.length).toBeGreaterThan(0);
    for (const route of new Set(routes)) {
      expect(app).toMatch(new RegExp(`path=(?:\\{\"${route}\"\\}|\"${route}\")`));
    }
  });

  it("keeps each active cross-system discovery route registered in both Home and App", () => {
    const home = read("client/src/pages/Home.tsx");
    const app = read("client/src/App.tsx");
    const audit = read("docs/phase232-integrated-route-validation.md");

    for (const route of integratedRoutes) {
      expect(home).toContain(`href: "${route}"`);
      expect(app).toContain(`<Route path="${route}"`);
      expect(audit).toContain(`\`${route}\``);
    }
  });

  it("preserves the evidence and owner-controlled activation boundaries across the integrated audit", () => {
    const audit = read("docs/phase232-integrated-route-validation.md");
    expect(audit).toContain("No wallet, wager, provider, or autonomous external action");
    expect(audit).toContain("No mint, sale, product inventory, or rights determination");
    expect(audit).toContain("No publishing, account action, payout, sale, or provider submission");
    expect(audit).toContain("No official accreditation, licensing, court, regulator, or authority output");
    expect(audit).toContain("does not imply recovery of any private account, chat, external file, or provider session");
  });
});
