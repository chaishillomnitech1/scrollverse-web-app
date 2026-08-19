import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 584 ScrollVerse Chess Initiative", () => {
  it("keeps the active chess route browser-local while adding transparent learning and safety pathways", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const arena = read("client/src/pages/ScrollVerseChessArena.tsx");

    expect(app).toContain('<Route path="/scrollverse-chess-arena" component={ScrollVerseChessArena} />');
    expect(home).toContain('title: "ScrollVerse Chess Initiative"');
    expect(home).toContain('label: "♟️ Chess Initiative", href: "/scrollverse-chess-arena"');
    expect(arena).toContain("ScrollVerse Chess Initiative");
    expect(arena).toContain("BEGINNER · BOARD FOUNDATIONS");
    expect(arena).toContain("INTERMEDIATE · TACTICAL VISION");
    expect(arena).toContain("ADVANCED · STRATEGY & ENDGAMES");
    expect(arena).toContain("PRACTICE PROMPT · LOCAL COPY");
    expect(arena).toContain("ADULT-SUPPORTED PARTICIPATION");
    expect(arena).toContain("PARTNERSHIP READINESS");
    expect(arena).toContain("No account, profile, matchmaking, public chat, player rating, prize, wager, token, payment");
    expect(arena).toContain("FIDE safeguarding framework");
    expect(arena).toContain('from "chess.js"');
    expect(arena).toContain("The local guide uses a bounded local heuristic");
  });
});
