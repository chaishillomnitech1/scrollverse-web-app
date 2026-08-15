import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 239 — Open Research Navigator", () => {
  const page = read("client/src/pages/OpenResearchNavigator.tsx"); const app = read("client/src/App.tsx"); const home = read("client/src/pages/Home.tsx");
  it("registers the navigator in App and Home", () => { expect(app).toContain('Route path="/open-research-navigator"'); expect(home).toContain('href: "/open-research-navigator"'); });
  it("distinguishes evidence states and keeps study notes browser-local", () => { expect(page).toContain("Established science"); expect(page).toContain("Official public record"); expect(page).toContain("Unresolved question"); expect(page).toContain("A public record can document an observation"); expect(page).toContain("Browser-local study note only"); expect(page).toContain("No token, wallet, payment, provider account"); });
});
