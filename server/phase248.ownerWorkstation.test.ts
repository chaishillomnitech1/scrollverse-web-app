import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 248 — Owner-exclusive ScrollVerse Workstation", () => {
  const page = read("client/src/pages/OwnerWorkstation.tsx");
  const app = read("client/src/App.tsx");
  const admin = read("client/src/pages/AdminCreatorOperations.tsx");

  it("registers the private workstation and provides a protected internal discovery path", () => {
    expect(app).toContain('Route path="/owner-workstation" component={OwnerWorkstation}');
    expect(admin).toContain('href="/owner-workstation"');
  });

  it("requires authentication and administrator access before rendering the workstation tools", () => {
    expect(page).toContain("if (!isAuthenticated)");
    expect(page).toContain('if (user?.role !== "admin")');
    expect(page).toContain("OWNER ACCESS REQUIRED");
  });

  it("labels connection states and preserves no-provider, no-wallet, no-payment, and no-transaction boundaries", () => {
    expect(page).toContain('"CONNECTION REQUIRED"');
    expect(page).toContain('"RESEARCH REFERENCE"');
    expect(page).toContain("Connection status is part of the tool.");
    expect(page).toContain("No credential display, provider takeover, wallet connection, payment, payout, contract deployment, or transaction");
    expect(page).toContain("This brief stays in the current browser state.");
  });
});
