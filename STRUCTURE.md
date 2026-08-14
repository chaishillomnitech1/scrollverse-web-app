# ScrollVerse Chess Arena Structure

```
client/src/
  components/GameCanvas.tsx              # React lifecycle shell for Babylon
  game/chess/
    types.ts                              # Piece, side, square, move, game-state types
    rules.ts                              # Move generation, move validation, check and terminal-state rules
    localOpponent.ts                      # Bounded local heuristic, not a networked chess engine
    ChessWorld.ts                         # Owns board state, Babylon meshes, selection, history, and cleanup
    scene.ts                              # Creates engine scene and returns a disposable game handle
  pages/ScrollVerseChessArena.tsx         # Route-level UI shell, guide, settings, captions, and controls
```

## Ownership

`ChessWorld` owns the board state and the Babylon board/piece meshes. `rules.ts` owns movement and legality; it has no Babylon or React dependency. `localOpponent.ts` receives a legal position and returns a legal candidate move at the selected bounded difficulty. The React page owns only visible controls and receives state snapshots/events from the game handle.

## State Model

The explicit modes are `whiteTurn`, `blackTurn`, `promotionChoice`, `check`, `checkmate`, `stalemate`, and `draw`. The first version supports standard piece movement, capture, castling, en passant, promotion, check, checkmate, and stalemate. Draw by repetition and fifty-move detection can be shown as a future extension rather than asserted if not implemented.

## Asset Hints

The generated visual target sets the color language. The board and chess pieces are procedural original meshes with material colors, ensuring clarity at game scale and avoiding third-party character or artwork use. The generated image may be used only as a subdued background/reference texture and must not obscure legal-move contrast.
