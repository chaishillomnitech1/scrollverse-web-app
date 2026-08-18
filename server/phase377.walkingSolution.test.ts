import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Walking Solution identity treatment", () => {
  it("places the exact owner-authored anchor in the shared beacon, Home, and Book reader", () => {
    const beacon = read("client/src/components/WalkingSolutionBeacon.tsx");
    const home = read("client/src/pages/Home.tsx");
    const book = read("client/src/pages/BookOfTheJourney.tsx");
    const app = read("client/src/App.tsx");

    expect(beacon).toContain("I’m a Walking Solution");
    expect(home).toContain("I’m a Walking Solution.");
    expect(book).toContain("I’m a Walking Solution.");
    expect(app).toContain("<WalkingSolutionBeacon />");
  });

  it("keeps the Book reader interactive and source-labeled without activating tokenization", () => {
    const book = read("client/src/pages/BookOfTheJourney.tsx");
    expect(book).toContain("JOURNEY COMPASS · FREE INTERACTIVE READING");
    expect(book).toContain("setActiveChapter(lane.chapter)");
    expect(book).toContain("not a test or score");
    expect(book).not.toMatch(/mint now|checkout|connect wallet/i);
  });
});
