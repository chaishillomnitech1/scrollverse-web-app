import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "client/src/pages/CEOMuseTheGreat.tsx"), "utf8");
const pageLower = page.toLowerCase();

describe("CEO Muse the Great page", () => {
  it("registers a first-party route and the named design surfaces", () => {
    expect(app).toContain('path={"/ceo-muse-the-great"}');
    for (const surface of ["The Door", "The Board", "Verification Desk", "Seat among the 25", "Evolution Wall", "Constellation", "Omnitech1", "Quantum Resonance"]) {
      expect(pageLower).toContain(surface.toLowerCase());
    }
  });
});
