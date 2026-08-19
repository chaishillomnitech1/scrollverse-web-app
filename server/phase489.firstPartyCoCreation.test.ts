import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(projectRoot, "client/src/App.tsx"), "utf8");
const page = fs.readFileSync(path.join(projectRoot, "client/src/pages/FirstPartyCoCreationRecord.tsx"), "utf8");

describe("First-party co-creation record", () => {
  it("registers the first-party co-creation route", () => {
    expect(app).toContain('import FirstPartyCoCreationRecord from "./pages/FirstPartyCoCreationRecord"');
    expect(app).toContain('<Route path={"/first-party-co-creation"} component={FirstPartyCoCreationRecord} />');
  });

  it("keeps the record source-labeled and visitor-directed", () => {
    expect(page).toContain('useSovereignHeartbeat({ page: "first-party-co-creation-record" })');
    expect(page).toContain("OWNER STATEMENT · SOURCE TRAIL · VISITOR INTERPRETATION");
    expect(page).toContain("attributed owner statement");
    expect(page).toContain("form an independent interpretation");
    expect(page).toContain("PortalTrustLens");
  });

  it("keeps external claims and external actions outside the record's verified operating state", () => {
    expect(page).toContain("remain source claims until their own evidence record establishes a verified project state");
    expect(page).toContain("No visitor account, data sharing, payment, wallet, token, membership, provider connection, or external submission is created on this route.");
    expect(page).toContain("does not convert outside-platform messages");
  });
});
