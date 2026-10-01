# Core Modules Gateway Implementation Plan

> **For agentic workers:** Execute this plan task-by-task with a red–green test cycle and a final verification gate.

**Goal:** Make the existing 12 core ScrollVerse module routes visible and easy to reach from the homepage without opening external URLs or activating any operation.

**Architecture:** Add a source-labeled, responsive homepage rail backed by a typed local array. Each link points only to an already registered first-party route. Preserve existing route slugs, use visible state labels, and keep buttons actionable through navigation rather than simulated external actions.

**Tech Stack:** React 19, TypeScript, Wouter, Tailwind 4, Vitest.

**Spec:** Owner-supplied module list in the current task context; current `client/src/App.tsx` route registry.

## Global Constraints

- Local code only; no external URL fetch, account, billing, wallet, token, contract, payment, deployment, or publication action.
- Do not claim provider, chain, payment, or live-operating status from route presence alone.
- Preserve existing homepage and route contracts; add only a bounded discovery rail.
- Every module link must be keyboard-reachable and visibly labeled.

---

### Task 1: Red test

**Files:** Create `server/phase933.coreModulesGateway.test.ts`.

- [x] Assert all 12 expected local slugs appear in the homepage gateway data and that the component is rendered.
- [x] Assert the App route registry contains all 12 slugs.
- [x] Run the focused test and confirm the gateway assertions fail because the new gateway is absent.

### Task 2: Minimal homepage gateway

**Files:** Modify `client/src/pages/Home.tsx`.

- [x] Add the typed 12-item `CORE_MODULES` array with compact descriptions and local paths.
- [x] Add a responsive `CoreModulesGateway` section after the existing Creator Research beacon.
- [x] Use visible labels such as `FIRST-PARTY ROUTE` and `OPEN MODULE`; do not embed external URLs or claim live provider states.
- [x] Run the focused test and confirm it passes.

### Task 3: Tracker and verification

**Files:** Modify `todo.md` and this plan.

- [x] Add Phase 933 completion only after verification.
- [ ] Run focused/full tests, TypeScript, memory-safe build, `git diff --check`, and desktop/mobile screenshots.
- [ ] Save a WebDev checkpoint; do not publish or change external hosting.
