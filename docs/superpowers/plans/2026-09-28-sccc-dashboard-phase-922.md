# SCCC Dashboard Phase 922 Implementation Plan

> **For agentic workers:** Implement each task with a failing test first, then verify the focused test before moving on.

**Goal:** Extend the browser-local SCCC dashboard with filtered, clickable milestone details, polished card motion, and a downloadable current-state export while documenting the workflow as a reusable skill.

**Architecture:** Keep all milestone data in the existing local `Dashboard.tsx` module. Add category filtering and accessible detail disclosure using native buttons, derive export rows from the same filtered/current dashboard state, and generate a browser-local CSV without server or external side effects. Add only GPU-friendly CSS transitions with reduced-motion fallbacks. Package the repeatable workflow as a concise skill under `/home/ubuntu/skills/sccc-dashboard-workflow`.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind 4, Vitest, browser Blob/download APIs, Markdown skill package.

**Spec:** User request dated 2026-09-28: enhance SCCC timeline interactions, card transitions, export, and reusable skill.

## Global Constraints

- Keep all dashboard data read-only and browser-local.
- Do not perform billing, domain, account, wallet, token, contract, repository, publishing, or external release actions.
- Preserve keyboard access, visible focus, aria state, and reduced-motion behavior.
- Do not embed or open supplied media.

### Task 1: Define regression coverage

**Files:** Modify `server/phase921.scccDashboardInteractions.test.ts`.

- [x] Add failing assertions for milestone categories/filter controls, detail disclosure, export handler, and card transition classes.
- [x] Run the focused test and confirm it fails for missing Phase 922 behavior.

### Task 2: Implement SCCC interactions

**Files:** Modify `client/src/pages/Dashboard.tsx`.

- [x] Add category metadata and a native category filter control.
- [x] Make filtered milestones clickable with an accessible detail panel and selected state.
- [x] Add browser-local CSV export for the visible milestones and read-only status snapshot.
- [x] Add transition classes to metric and dashboard cards without changing external data behavior.

### Task 3: Add motion styling

**Files:** Modify `client/src/index.css`.

- [x] Add dashboard-card hover/focus transitions using transform and opacity only.
- [x] Add reduced-motion overrides.

### Task 4: Validate and document

**Files:** Modify `todo.md`; create `/home/ubuntu/skills/sccc-dashboard-workflow/SKILL.md` and its minimal package files as needed.

- [x] Run focused tests, full Vitest, TypeScript, production build, whitespace checks, and browser review.
- [x] Validate the reusable skill with `quick_validate.py`.
- [x] Record Phase 922 only after fresh verification evidence.
