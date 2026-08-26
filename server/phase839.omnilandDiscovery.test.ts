import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(import.meta.dirname, relativePath), "utf8");

describe("Phase 839 — Omniland discovery world", () => {
  it("registers a first-party Omniland route and front-door discovery links", () => {
    const app = read("../client/src/App.tsx");
    const home = read("../client/src/pages/Home.tsx");

    expect(app).toContain('const Omniland = lazy(() => import("@/pages/Omniland"))');
    expect(app).toContain('<Route path="/omniland" component={Omniland} />');
    expect(home).toContain('title: "Omniland Discovery World"');
    expect(home).toContain('{ label: "Omniland", href: "/omniland" }');
  });

  it("keeps original visual worlds and clearly labeled Manus sources accessible", () => {
    const page = read("../client/src/pages/Omniland.tsx");

    expect(page).toContain("Enter the worlds");
    expect(page).toContain("Film + animation commons");
    expect(page).toContain("Game worlds studio");
    expect(page).toContain("Story vault");
    expect(page).toContain("MANUS CONNECTIONS");
    expect(page).toContain("External social source. Omniland’s artwork is original");
    expect(page).toContain('href: "/omniland-consoleless-delivery"');
    expect(page).toContain('href: "/game-worlds-studio"');
  });
});
