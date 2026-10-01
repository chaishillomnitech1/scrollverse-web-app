# Interactive Portfolio Filtering Implementation Plan

> **For agentic workers:** Execute this plan inline in the current ScrollVerse portal workspace.

**Goal:** Add accessible category filtering and catalog-date sorting to the homepage interactive creator portfolio.

**Architecture:** Keep the portfolio data-driven inside `InteractiveCreatorPortfolio`, adding an ISO `catalogDate` to each item and deriving the visible list from category and sort state. Use native buttons for categories and a labeled native `<select>` for newest/oldest ordering so keyboard and screen-reader behavior remain built in.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind utility classes, Vitest.

**Spec:** User request in the current task; regression contract in `server/phase938.interactivePortfolio.test.ts`.

## Global Constraints

- Keep all portfolio destinations on existing first-party routes.
- Preserve source labels and visual fallbacks; do not add autoplay, upload, publication, payment, wallet, token, contract, or release behavior.
- Use ISO `YYYY-MM-DD` catalog dates and stable IDs.
- Keep controls keyboard reachable with visible focus states, labels, and comfortable touch targets.
- Respect reduced-motion behavior already established by the global stylesheet.

---

### Task 1: Add portfolio metadata and filtering controls

**Files:**
- Modify: `client/src/pages/Home.tsx:1047-1097`
- Test: `server/phase938.interactivePortfolio.test.ts`

**Interfaces:**
- Consumes: existing `PortfolioCategory`, portfolio item list, and `activeCategory` state.
- Produces: `sortMode` state, `catalogDate` item metadata, date-sorted `visiblePortfolio`, and a labeled date-sort select.

- [x] Write the failing assertions for `catalogDate`, `sortMode`, `Newest first`, `Oldest first`, `Sort portfolio by catalog date`, and `Cataloged`.
- [x] Run `pnpm vitest run server/phase938.interactivePortfolio.test.ts` and confirm the new assertions fail because the production component has no date metadata or sort control.
- [x] Add `type PortfolioSort = "newest" | "oldest"`, initialize `sortMode` to `"newest"`, and add a stable ISO `catalogDate` to every portfolio item.
- [x] Derive `visiblePortfolio` by first applying the active category and then sorting a copied list by descending or ascending `catalogDate`.
- [x] Add a labeled `<select aria-label="Sort portfolio by catalog date">` with `newest` / `oldest` options and render each card’s date as `Cataloged YYYY-MM-DD`.
- [x] Run the focused portfolio suite and confirm all assertions pass without changing external-action boundaries.

### Task 2: Extend the reusable portfolio skill

**Files:**
- Modify: `/home/ubuntu/skills/scrollverse-source-led-portfolio/SKILL.md`

**Interfaces:**
- Consumes: the existing source-led portfolio workflow and item contract.
- Produces: reusable guidance for category/date filters with provenance-safe date semantics.

- [x] Add a concise workflow rule requiring category filters plus a labeled newest/oldest catalog-date sort when item dates are available.
- [x] Extend the `PortfolioItem` contract with `catalogDate: string` and state that dates describe local catalog/accession timing, not creation, publication, rights, or external verification.
- [x] Run `python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py scrollverse-source-led-portfolio`.

### Task 3: Verify and checkpoint

**Files:**
- Modify: `todo.md`

- [x] Add a completed Phase 942 entry only after fresh evidence exists.
- [x] Run focused tests, full Vitest, TypeScript, memory-safe production build, `git diff --check`, and skill validation.
- [x] Save a checkpoint with the exact local scope and no external publication or account actions.
