import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 224 ScrollVerse Chess Arena", () => {
  it("registers a first-party chess arena with local legal-move, accessible, and voice-ready boundaries", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const arena = read("client/src/pages/ScrollVerseChessArena.tsx");
    const backdrop = read("client/src/components/ChessArenaBackdrop.tsx");
    expect(app).toContain('import ScrollVerseChessArena from "./pages/ScrollVerseChessArena"');
    expect(app).toContain('<Route path="/scrollverse-chess-arena" component={ScrollVerseChessArena} />');
    expect(home).toContain('href: "/scrollverse-chess-arena"');
    expect(arena).toContain('from "chess.js"');
    expect(arena).toContain("LOCAL RULES ACTIVE");
    expect(arena).toContain("The local guide uses a bounded local heuristic");
    expect(arena).toContain("Enable device voice");
    expect(arena).toContain("No account, rating, wager, prize, token, payment");
    expect(backdrop).toContain('getContext("2d")');
    expect(backdrop).toContain("prefers-reduced-motion");
    expect(backdrop).toContain("ResizeObserver");
    expect(backdrop).not.toContain("@babylonjs/core");
  });
});
