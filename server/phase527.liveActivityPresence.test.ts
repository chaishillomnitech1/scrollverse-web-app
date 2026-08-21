import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { __presenceTest } from "./routers/presence";

describe("Phase 527 privacy-aware live activity indicator", () => {
  it("uses only short-lived anonymous session tokens and prunes stale presence", () => {
    __presenceTest.activeSessions.clear();
    __presenceTest.activeSessions.set("anonymous_session_123456", Date.now() - __presenceTest.windowMs - 1);
    __presenceTest.prunePresence();
    expect(__presenceTest.activeSessions.size).toBe(0);
  });

  it("keeps the homepage indicator browser-local without a visitor-total claim", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "./routers.ts"), "utf8");
    const indicator = home.slice(home.indexOf("function LiveActivityIndicator"), home.indexOf("export default function Home"));
    expect(indicator).toContain("scrollverse_browser_session_started_at");
    expect(indicator).toContain("BROWSER-LOCAL SESSION");
    expect(indicator).toContain("no visitor count");
    expect(indicator).not.toContain("presence.active");
    expect(home).toContain("<LiveActivityIndicator />");
    expect(router).toContain("presence: presenceRouter");
  });
});
