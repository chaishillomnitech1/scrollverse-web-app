import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

describe("Phase 1018 theme, navigation, and contact UX", () => {
  it("keeps a persistent accessible theme switch with stored preference support", () => {
    const app = read("client/src/App.tsx");
    const theme = read("client/src/contexts/ThemeContext.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('<ThemeProvider defaultTheme="dark" switchable>');
    expect(theme).toContain('localStorage.setItem("theme", theme)');
    expect(home).toContain("Switch to light mode");
    expect(home).toContain("Switch to dark mode");
  });

  it("provides smooth, keyboard-friendly navigation affordances", () => {
    const home = read("client/src/pages/Home.tsx");
    const styles = read("client/src/index.css");
    expect(home).toContain('aria-label="Primary navigation"');
    expect(home).toContain("hover:-translate-y-0.5");
    expect(home).toContain("focus-visible:outline-2");
    expect(styles).toContain("scroll-behavior: smooth");
    expect(styles).toContain(".sv-nav-link");
  });

  it("provides real-time contact validation without silently sending a message", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('id="scrollverse-contact-form"');
    expect(home).toContain("contactEmail");
    expect(home).toContain("contactValidation");
    expect(home).toContain("mailto:chaisthegreatsabir@gmail.com");
    expect(home).toContain("Prepare email");
    expect(home).toContain("aria-live=\"polite\"");
  });
});
