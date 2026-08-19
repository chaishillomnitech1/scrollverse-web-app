import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/August28LaunchCommandCenter.tsx"), "utf8");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 562 August 28 Creator Launch Command Center", () => {
  it("registers the active browser-local milestone route and homepage discovery link", () => {
    expect(router).toContain('import August28LaunchCommandCenter from "./pages/August28LaunchCommandCenter"');
    expect(router).toContain('<Route path={"/august-28-launch"} component={August28LaunchCommandCenter} />');
    expect(home).toContain('{ label: "August 28 Launch", href: "/august-28-launch" }');
  });

  it("organizes evidence, SKU, media, learning, and exact release lanes", () => {
    expect(page).toContain("Creator evidence");
    expect(page).toContain("First creator SKU");
    expect(page).toContain("Original media");
    expect(page).toContain("Free knowledge");
    expect(page).toContain("Exact release gate");
  });

  it("keeps the launch experience source-led and fail-closed", () => {
    expect(page).toContain("BROWSER-LOCAL CONTROLS AVAILABLE NOW");
    expect(page).toContain("No financial, provider, account, payment, wallet, contract, token, media, repository, schedule, upload, or publishing action is created here.");
    expect(page).toContain('useSovereignHeartbeat({ page: "august-28-launch-command-center" })');
    expect(page).toContain("PortalTrustLens");
  });
});
