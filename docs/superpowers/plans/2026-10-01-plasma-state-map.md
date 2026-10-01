# Phase 932 Plasma State Map Implementation Plan

> **For agentic workers:** Execute this plan task-by-task with a red–green test cycle and a final verification gate. This run uses inline execution in the existing WebDev project.

**Goal:** Add a browser-local, zero-new-dependency visual state map connecting an orbit, its sine projection, and a selected phase, without asserting new physics.

**Architecture:** A pure geometry helper supplies normalized values. A React page renders a responsive canvas drawing and an equivalent text readout with four preset phase controls, a scrubber, opt-in play/pause, and local JSON snapshot export. The current app adds one lazy route and a clearly marked first-party discovery handoff. No supplied code or media is executed or embedded.

**Tech Stack:** React 19, TypeScript, Canvas 2D, Tailwind 4, Wouter, Vitest.

**Spec:** Creator-supplied Phase 930 source receipt (`docs/phase930-creator-source-receipt.md`) and the existing portal's local planning convention.

## Global Constraints

- Local work only; no external URL, hosting, billing, account, wallet, token, contract, deployment, or public release action.
- Geometric illustration, not a plasma simulation or experimental result. No measured frequencies or physical claims.
- Match the existing near-black/cyan/amber/soft-violet palette and typography; do not introduce media, external fonts, or dependencies.
- Interactive controls are keyboard-accessible and labeled; animation is opt-in, stopped on reduced-motion preference, and cleaned up on unmount.

---

### Task 1: Pure geometry

**Files:** Create `client/src/lib/plasmaStateMath.ts`; test `server/phase932.plasmaStateMap.test.ts`.

**Interfaces:** `getPlasmaState(degrees: number)` returns `{degrees, radians, x, y, amplitude, label}`. `x = sin(radians)`, `y = -cos(radians)`, `amplitude = sin(radians)`; angle clamps to `[0, 360]`.

- [x] Write tests for 0°, 90°, 180°, 270°, 360°, and out-of-range input, using numeric assertions.
- [x] Run `pnpm vitest run server/phase932.plasmaStateMap.test.ts` and confirm failure because helper is missing.
- [x] Implement the helper; rerun focused tests and confirm pass.

### Task 2: Accessible visual route

**Files:** Create `client/src/pages/PlasmaStateMap.tsx`; modify `client/src/App.tsx` and `client/src/pages/SourceLabeledStorybookIndex.tsx` (small handoff only); extend `server/phase932.plasmaStateMap.test.ts`.

**Interfaces:** Route `/plasma` renders a named canvas plus an equivalent DOM state readout. User controls set angle, opt into animation, pause it, and export the current geometric snapshot using Blob and Object URL.

- [x] Write route and control tests; verify red because the page and registration do not exist.
- [x] Implement the responsive canvas composition and real keyboard-reachable controls, without fetching media or new dependencies.
- [x] Verify focused tests and manually inspect the route at desktop/mobile size; correct observable issues.

### Task 3: Tracker, verification, checkpoint

**Files:** Modify `todo.md`.

- [x] Record Phase 932 completion only after behavior passes.
- [x] Run full `pnpm test -- --reporter=dot`, `pnpm exec tsc --noEmit`, memory-safe build, and `git diff --check`.
- [ ] Inspect the working tree and checkpoint the verified local change with `webdev_save_checkpoint`; do not publish or change external hosting.
