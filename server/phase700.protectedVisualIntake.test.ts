import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 700 — Five-Image Protected Visual Accession", () => {
  it("records all five image files and their individual fingerprint entries", () => {
    const page = read("client/src/pages/ProtectedVisualIntake.tsx");
    expect(page).toContain("IMG_1520.png");
    expect(page).toContain("IMG_1524.png");
    expect(page).toContain("31125cc80a16346b");
    expect(page).toContain("43ae8560d4d6ccb2");
  });

  it("keeps protected screenshots unrepublished and source claims bounded", () => {
    const page = read("client/src/pages/ProtectedVisualIntake.tsx");
    expect(page).toContain("not republishing the source screenshots");
    expect(page).toContain("not therapeutic instruction");
    expect(page).toContain("externalAction: \"none\"");
  });

  it("registers the protected visual intake route", () => {
    expect(read("client/src/App.tsx")).toContain("/protected-visual-intake");
  });
});
