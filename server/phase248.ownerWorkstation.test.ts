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
    expect(page).toContain("does not share access, credentials, private prompts, provider accounts, or team records");
    expect(page).toContain("This brief stays in the current browser state.");
  });

  it("provides browser-local brief composition, quality gates, mission staging, and connection-state filtering", () => {
    expect(page).toContain("CREATION BRIEF COMPOSER · BROWSER LOCAL");
    expect(page).toContain("QUALITY-GATE BOARD");
    expect(page).toContain("LOCAL MISSION QUEUE");
    expect(page).toContain("Add local mission card");
    expect(page).toContain("ALL CONNECTION STATES");
    expect(page).toContain("It does not assign people, send messages, invoke an AI provider, create a job, or authorize external action.");
  });

  it("uses progressive capability lanes to guide repository-informed work without claiming universal live integrations", () => {
    expect(page).toContain("REPOSITORY-INFORMED CAPABILITY MAP");
    expect(page).toContain("One clear lane first. Deeper tools when you need them.");
    expect(page).toContain("NEXT BEST LANE");
    expect(page).toContain("It is not a live synchronization claim, a repository scanner, or a connection to every external system.");
    expect(page).toContain("This stays a capability map, not proof of a live external integration or autonomous function.");
  });
});
