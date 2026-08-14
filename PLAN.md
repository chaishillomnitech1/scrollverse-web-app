# Game Plan: ScrollVerse Chess Arena

## Visual Target

The game uses a dark midnight-blue strategy arena with a standard 8×8 board, rose-gold/cyan highlights, abstract original chess pieces, a compact move panel, and a visible guide panel. The generated reference is recorded in `ASSETS.md` and is used as a visual direction rather than as a claim about a third-party game or franchise.

## Risk Tasks

### 1. Legal chess movement and local opponent response

- **Why isolated:** Chess requires turn order, legal movement, capture handling, king-safety checks, and a clear conclusion state. An opponent that moves before state is reconciled can corrupt the board.
- **Approach:** Keep the board state and movement rules in plain TypeScript. Validate a selected move before rendering it, then run a bounded local heuristic to choose a reply only after the player move commits.
- **Verify:** A player cannot move an opponent piece, cannot make an illegal move, captures remove exactly one opposing piece, the local opponent only moves after a valid player move, and turn state changes visibly after every move.

### 2. Babylon canvas lifecycle inside a routed React page

- **Why isolated:** React 19 development rendering can mount effects more than once; a second Babylon engine or unremoved listener would cause errors or doubled input.
- **Approach:** Guard engine creation with a ref, dispose scene/engine/listeners on unmount, and keep chess logic outside React rendering.
- **Verify:** Navigating to and away from the route does not leave a canvas, render loop, or listener behind; resizing preserves a visible board; browser console remains free of lifecycle errors.

## Main Build

Build a responsive 3D board with procedural board/piece meshes, legal-move highlighting, game status, side selection, difficulty selection, move list, reset, a local strategy guide, captionable voice-ready control, and a deterministic `?demo` sequence.

- **Assets:**
  - Generated Chess Arena visual target (`/manus-storage/scrollverse-chess-arena-reference_61760cf8.png`) — full-screen visual reference/backdrop, 1920×1080.
- **Verify:**
  - Board selection, legal-move markers, capture, turn, reset, and move history update correctly.
  - Guide copy responds to the active game state without presenting itself as an external or infallible service.
  - Keyboard and pointer interactions reach the same game actions and the status panel is readable.
  - Voice controls require a user action, show transcript text, expose mute, and explain browser support.
  - UI remains readable without overlap at desktop and mobile widths.
  - No console errors occur during the captured run.
  - The scene follows the generated reference’s midnight/rose-gold/cyan palette, board scale, and strategic visual density.
  - `?demo` starts a deterministic opening so verification can observe real board changes.
