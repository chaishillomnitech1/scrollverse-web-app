import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 283 — accessible living-signal system", () => {
  it("mounts a global visitor-controlled signal layer and connects priority book and visual paths", () => {
    expect(read("client/src/App.tsx")).toContain("<LivingSignalLayer />");
    expect(read("client/src/index.css")).toContain("prefers-reduced-motion: reduce");
    expect(read("client/src/components/LivingSignalLayer.tsx")).toContain("Signal: {isAmbient ? \"Ambient\" : \"Quiet\"}");
    expect(read("client/src/pages/Books.tsx")).toContain("Enter the Storybook worlds");
    expect(read("client/src/pages/JuniorMovies.tsx")).toContain("ScrollVerse Books");
    expect(read("client/src/pages/MediaHub.tsx")).toContain("Books & Story Worlds");
  });
});
