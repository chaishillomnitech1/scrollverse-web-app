import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 700 / 704 — Protected Visual Accession", () => {
  it("records the protected visual sequence through slide 15 with individual fingerprint entries", () => {
    const page = read("client/src/pages/ProtectedVisualIntake.tsx");
    expect(page).toContain("IMG_1520.png");
    expect(page).toContain("IMG_1524.png");
    expect(page).toContain("IMG_1525.png");
    expect(page).toContain("IMG_1529.png");
    expect(page).toContain("31125cc80a16346b");
    expect(page).toContain("43ae8560d4d6ccb2");
    expect(page).toContain("5345d25a02aa1a31");
    expect(page).toContain("3f10b62877fcac99");
  });

  it("keeps protected screenshots unrepublished and source claims bounded", () => {
    const page = read("client/src/pages/ProtectedVisualIntake.tsx");
    expect(page).toContain("not republishing the source screenshots");
    expect(page).toContain("not therapeutic instruction");
    expect(page).toContain("unverified here");
    expect(page).toContain("payment connection");
    expect(page).toContain("externalAction: \"none\"");
  });

  it("registers the protected visual intake route", () => {
    expect(read("client/src/App.tsx")).toContain("/protected-visual-intake");
  });
});
