import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../mobile-companion");

describe("Phase 881 Expo companion source kit", () => {
  it("provides focused native routes and portal handoffs without hardcoding a store identity or submission flow", () => {
    const config = fs.readFileSync(path.join(root, "app.config.ts"), "utf8");
    const tabs = fs.readFileSync(path.join(root, "app/(tabs)/_layout.tsx"), "utf8");
    const portal = fs.readFileSync(path.join(root, "lib/portal.ts"), "utf8");
    const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
    expect(config).toContain('slug: "scrollverse-mobile-companion"');
    expect(config).not.toContain("bundleIdentifier:");
    expect(config).not.toContain("package:");
    expect(tabs).toContain('name="index"');
    expect(tabs).toContain('name="omniland"');
    expect(tabs).toContain('name="mirror"');
    expect(tabs).toContain('name="create"');
    expect(tabs).toContain('name="sources"');
    expect(portal).toContain('PORTAL_ORIGIN = "https://scrollverse.co"');
    expect(portal).toContain('mirror: "/chais-sabir-allah-mirror"');
    expect(portal).toContain('create: "/episode-brief-builder"');
    expect(readme).toContain("does **not** contain a store-bound iOS bundle identifier");
    expect(readme).toContain("Store-release gate");
  });
});
