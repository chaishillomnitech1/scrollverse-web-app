import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "client/src/pages/BoundedResearchOperations.tsx"), "utf8");
const research = fs.readFileSync(path.join(root, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");

describe("Phase 470 — Bounded Research Operations", () => {
  it("registers a browser-local schedule-options route", () => {
    expect(app).toContain('path={"/bounded-research-operations"} component={BoundedResearchOperations}');
    expect(page).toContain('useSovereignHeartbeat({ page: "bounded-research-operations" })');
    expect(page).toContain("SCHEDULE OPTIONS · NO TASK ENABLED");
    expect(page).toContain("PortalTrustLens");
  });

  it("offers bounded manual, agent-proposal, and readiness-audit choices", () => {
    expect(page).toContain("Owner-initiated research review");
    expect(page).toContain("Bounded agent research proposal");
    expect(page).toContain("Deterministic release-readiness audit");
    expect(page).toContain("Frequency proposal");
    expect(page).toContain("Pause or stop rule");
    expect(page).toContain("Copy bounded-operation decision");
  });

  it("keeps every schedule, callback, provider, financial, and publication action fail-closed", () => {
    expect(page).toContain("No recurring task is selected or created.");
    expect(page).toContain("does not create, update, pause, resume, or delete a schedule");
    expect(page).toContain("No task identifier, cron expression, endpoint, cookie, business record, execution log");
    expect(page).toContain("creates no schedule, callback, provider action, customer communication, payment, wallet action, trade, or publication");
    expect(page).not.toContain("createHeartbeatJob");
    expect(page).not.toContain("node-cron");
    expect(page).not.toContain("setInterval");
  });

  it("connects the decision route from Synchronization Research without implying an enabled task", () => {
    expect(research).toContain('href: "/bounded-research-operations"');
    expect(research).toContain("Bounded Research Operations");
    expect(research).toContain("no schedule is enabled here");
    expect(research).toContain("no recurring task is active");
  });
});
