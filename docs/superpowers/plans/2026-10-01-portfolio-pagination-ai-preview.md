# Portfolio pagination and AI preview implementation plan

> **For agentic workers:** Execute test-first within the ScrollVerse portal workspace; no external publication is part of this plan.

**Goal:** Paginate the creator portfolio, give users an on-demand AI-written artifact overview on hover/focus, and show meaningful loading feedback during search/filter changes.

**Architecture:** A pure filter/pagination helper applies category, keyword, date sort, then bounds the page; the homepage mounts only the page's cards/images. A public tRPC read accepts only registered artifact IDs, passes server-owned metadata to a constrained LLM prompt, and caches in-flight and completed summaries. A short search debounce displays a motion-safe progress shimmer only while the queued search is being applied; hover/focus waits briefly to avoid incidental paid calls, and a visible button supports touch.

**Tech Stack:** React 19, tRPC 11, Vitest, server-side built-in Forge LLM, Tailwind 4.

**Spec:** Current user request, with existing source and release boundaries maintained.

## Global constraints

- Keep the six existing first-party destinations, media, and source labels unchanged.
- Do not send user search text, arbitrary URLs, image bytes, private files, or browser credentials to the LLM. Only a registered artifact ID selects server-owned public metadata.
- Cache repeated summaries, limit response length, and do not auto-request for off-page cards. Do not claim page slicing reduces the whole homepage bundle; it limits card DOM and image fetches.
- Keep pagination and preview controls keyboard/touch accessible; preserve focus outlines and reduced-motion behavior.

### Task 1 — Filter/paginate

**Files:** Create `client/src/lib/portfolioPagination.ts` and `server/phase944.portfolioPagination.test.ts`; update `client/src/pages/Home.tsx`.

**Interface:** `paginatePortfolio(items, { category, query, sort, page, pageSize })` returns `{ items, total, page, pageCount }`. Reset page to one on category, search, and sort changes; clamp the current page when the result set shrinks. Render only `items`, plus Previous/Next and numbered page buttons with `aria-current="page"`. Test boundary cases: zero items, exact page-size multiples, filtered results, and out-of-range pages.

### Task 2 — On-demand AI summary

**Files:** Create `server/routers/portfolioSummary.ts` and `server/phase944.portfolioSummary.test.ts`; update `server/routers.ts`, `server/_core/llm.ts`, and `client/src/pages/Home.tsx`.

**Interface:** `getArtifactSummary(id, generator)` validates against server-owned IDs, caches promises by ID and retries failed requests. Use an explicit supported model and bounded prompt via `invokeLLM`; return plain text `{ summary }` only. Debounce hover/focus for 550ms, show text while loading, and provide a visible button for touch/keyboard. Keep original detail visible on errors. Verify unknown ID rejection, deduplication, bounded output, retry after failure, and UI wiring.

### Task 3 — Responsive feedback, skill, and verification

**Files:** Update `client/src/pages/Home.tsx`, `client/src/index.css`, `/home/ubuntu/skills/scrollverse-source-led-portfolio/SKILL.md`, and `todo.md`.

Use a 160ms search debounce with `aria-busy` and a subtle, reduced-motion-safe shimmer while queued. Verify focused tests, full Vitest suite, TypeScript, memory-guarded production build, skill validation, and responsive visual behavior; checkpoint the validated state. No live deployment, payment, wallet, repo push, or other external release is included.

## Verification record

- Completed the filter/pagination and summary service test-first. Focused tests passed, then the full suite passed **388 files / 1,045 tests**.
- TypeScript and the guarded production build passed; `git diff --check` and skill validation passed.
- A real local tRPC call returned an AI-generated preview for `omniland`; an unknown ID returned HTTP 400. Browser interaction confirmed page two shows only its two cards, keyword search resets to page one, and a touch-accessible AI overview resolves for the selected card.
- Mobile inspection at 390px showed the portfolio section has no horizontal overflow; page-one images load after replacing the Dynasty poster (HTTP 403) with the verified archive seal (HTTP 200).
- Pagination reduces mounted cards/image requests, not the homepage JavaScript bundle. Public domain deployment and billing were not changed.
