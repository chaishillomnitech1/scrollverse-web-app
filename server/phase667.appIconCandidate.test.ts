import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 667 app-icon candidate", () => {
  it("registers browser-local managed icon candidates without replacing the manifest", () => {
    const page = read("client/src/pages/AppIconCandidate.tsx");
    const app = read("client/src/App.tsx");
    const manifest = read("client/public/manifest.json");
    expect(page).toContain("scrollverse-origin-ark-app-icon-candidate-192_70e1eba8.png");
    expect(page).toContain("scrollverse-origin-ark-app-icon-candidate-512_62ef1f04.png");
    expect(page).toContain("requires authenticated owner-session decision");
    expect(page).toContain("current application manifest is not replaced");
    expect(app).toContain('path={"/app-icon-candidate"}');
    expect(manifest).toContain('"src": "/icons/icon-512x512.png"');
  });
});
