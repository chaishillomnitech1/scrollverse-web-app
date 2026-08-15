import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 203 — Master Directory", () => {
  const page = read("client/src/pages/MasterDirectory.tsx");
  const app = read("client/src/App.tsx");
  const home = read("client/src/pages/Home.tsx");
  it("registers the Master Directory in App and Home", () => { expect(app).toContain('Route path="/master-directory"'); expect(home).toContain('href: "/master-directory"'); });
  it("keeps campaign, parser, and evidence-ledger integration explicitly non-executable", () => { expect(page).toContain("READ-ONLY PROFILE PARSER PLAN"); expect(page).toContain("No API request or repository write."); expect(page).toContain("No contact list, message, repository connection, API call, GitHub Action, webhook, contract, provider, payment, wallet, token, or transaction is created from this page."); });
});
