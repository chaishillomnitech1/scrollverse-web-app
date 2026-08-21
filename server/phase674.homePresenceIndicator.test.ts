import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const home = fs.readFileSync(path.join(root, "client/src/pages/Home.tsx"), "utf8");
const docs = fs.readFileSync(path.join(root, "docs/phase674-home-presence-indicator.md"), "utf8");
const indicator = home.slice(home.indexOf("function LiveActivityIndicator"), home.indexOf("export default function Home"));

describe("Phase 674 — Homepage Presence Indicator Accuracy", () => {
  it("labels the state as a browser-local session rather than an active-user count", () => {
    expect(indicator).toContain("BROWSER-LOCAL SESSION");
    expect(indicator).toContain("no visitor count");
    expect(indicator).not.toContain("active now");
  });

  it("uses browser session storage and does not query or ping shared presence state", () => {
    expect(indicator).toContain("sessionStorage");
    expect(indicator).not.toContain("presence.active");
    expect(indicator).not.toContain("presence.ping");
  });

  it("documents the precise operating boundary", () => {
    expect(docs).toContain("browser-local session indicator");
    expect(docs).toContain("does not count visitors");
  });
});
