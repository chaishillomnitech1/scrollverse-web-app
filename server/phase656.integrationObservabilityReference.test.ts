import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 656 — Integration Observability Reference", () => {
  it("presents webhook, database, listener, and delivery concepts as protected references", () => {
    const page = read("client/src/pages/IntegrationObservabilityReference.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "integration-observability-reference" })');
    expect(page).toContain("Notification Dispatcher");
    expect(page).toContain("Local Event Record");
    expect(page).toContain("On-Chain Listener");
    expect(page).toContain("Release & Delivery Protocol");
    expect(page).toContain("No webhook is active here.");
    expect(page).toContain('externalAction: "none"');
  });

  it("registers the protected reference route and documents its external-action boundary", () => {
    const app = read("client/src/App.tsx");
    const log = read("docs/phase656-google-webhook-onchain-source-log.md");
    expect(app).toContain('import IntegrationObservabilityReference from "./pages/IntegrationObservabilityReference"');
    expect(app).toContain('<Route path={"/integration-observability-reference"} component={IntegrationObservabilityReference} />');
    expect(log).toContain("No Discord, Slack, Telegram, Shopify, Prisma, Postgres");
    expect(log).toContain("No secrets, private keys, seed phrases, or recovery credentials");
  });
});
