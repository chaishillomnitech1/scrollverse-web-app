import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const read = (relativePath: string) => fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");

describe("Phase 603 — Evidence-led capability comparison", () => {
  it("registers the browser-local comparison route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import CapabilityComparison from "./pages/CapabilityComparison"');
    expect(app).toContain('path={"/capability-comparison"}');
  });

  it("uses cited standards and bounded capability states instead of a global-ranking claim", () => {
    const page = read("client/src/pages/CapabilityComparison.tsx");
    expect(page).toContain("WCAG 2.2");
    expect(page).toContain("OWASP ASVS");
    expect(page).toContain("NIST SSDF");
    expect(page).toContain("DEMONSTRATED LOCALLY");
    expect(page).toContain("PREPARED FOR OWNER RELEASE");
    expect(page).toContain("NOT ASSESSED");
    expect(page).toContain("Download local scorecard");
  });

  it("preserves the public-anchor source record and correction path", () => {
    const record = read("docs/phase603-evidence-led-capability-comparison.md");
    expect(record).toContain("Web Content Accessibility Guidelines (WCAG) 2.2");
    expect(record).toContain("Application Security Verification Standard");
    expect(record).toContain("Secure Software Development Framework");
    expect(record).toContain("does not establish that ScrollVerse is globally ranked");
    expect(record).toContain("Correction Path");
  });
});
