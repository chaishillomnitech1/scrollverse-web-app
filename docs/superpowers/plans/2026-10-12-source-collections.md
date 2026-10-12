# Source Collections Implementation Plan

**Goal:** Incorporate the six new creator text batches into a discoverable, searchable local source gallery without copying missing media or exposing the counsel draft.

**Architecture:** Lazy React route `/source-collections` reads a small typed catalog. The catalog stores six SHA-256 source receipts, eight canonical editorial collection records, and a duplicate-aware title index derived from batch 11. Existing portfolio pagination supplies keyword/category/page behavior. Add one portfolio doorway and an Omniversal Ledger continuation, not hundreds of cards to the homepage.

**Tech stack:** React 19, Wouter, TypeScript, Vitest, existing Tailwind design system. No new dependencies.

**Spec/design:** Source reports `docs/source-review-oct12/batch-8.md` through `batch-13.md`. Extension mode: preserve all existing anchors/routes and favorites storage key. Black/teal/gold editorial archive, current portal typography, 8px spacing, 24px radii, native 44px controls, restrained motion. Narrative role: archive workspace. Phone viewing: compact controls and single-column detail. Brand fidelity 10; motion 2; density 6; asset dependence 1; visual variance 3. Use intentional typographic collection art, not invented previews of missing files.

## Constraints
- All source statements remain creator-authored descriptions, plans or source-reported titles. No current treasury/hosting/quantum/rights conclusions.
- Exclude the batch-12 counsel draft and batch-11 Evidence Timeline from display catalog and JSON exports. Do not claim local planning routes are access-controlled vaults.
- Source line citations use newline-delimited numbering, not Python Unicode `splitlines` (Unicode separators inside long pasted lines differ).
- No media opens/uploads/playback, embedded script execution, external activation or publication.

## Task 1 — Source data and behavior tests
- [x] Write `server/phase946.sourceCollections.test.ts` asserting six receipt hashes match actual files, eight collection IDs are unique, citations fit source files, routes are registered, private draft/timeline rows absent, title-index duplicates retained, search/category/page behavior and UI route contract.
- [x] Run the test and observe missing catalog failure.
- [x] Create `client/src/lib/sourceCollections.ts` with exported `SOURCE_BATCHES`, `SOURCE_COLLECTIONS`, `SOURCE_TITLE_INDEX`. Records use `{id,title,category,detail,label,catalogDate,href,sources:[{batch,lines:[start,end]}]}`. Title index includes `occurrences` for HTML-marked title frames from batch 11 and excludes the Evidence Timeline.
- [x] Run focused tests and TypeScript.

## Task 2 — Gallery and navigation
- [x] Create `client/src/pages/SourceCollections.tsx`: Collections/Artifact Titles mode, native search, category controls, six-card pagination, selected detail with line citations and expandable hashes, local JSON export of all filtered records (not only one page), result/no-match/export feedback. Use existing `paginatePortfolio` helper. Show clearly that artifact titles are source references, not imported HTML bodies.
- [x] Register the lazy route in `App.tsx`; add a sourcecollections portfolio entry, ID and server preview allowlist record. Add a ledger handoff.
- [x] Verify gallery mode switch, combined search/filter, page changes, source detail, JSON download and mobile wrapping in the browser. Verify favorites remain functional.

## Task 3 — Reuse and checkpoint
- [x] Extend `scrollverse-source-led-portfolio/SKILL.md` with multi-batch accession, duplicate-aware titles, newline citation semantics and private-source exclusion. Validate the existing skill and prepare a downloadable package.
- [x] Consolidate the six reports into one source review artifact with exact verified metadata and retained proposals. Record that the newly referenced title-generation task is not present in the current authorized task list; do not guess or fetch it.
- [x] Run full tests, guarded TypeScript/build, whitespace and browser checks; record exact evidence in tracker. Save managed checkpoint without external release.

## Verified completion

Final scope: 15 version receipts, 16 collections, 482 unique titles, 619 title occurrences and six unique YouTube references from nine occurrences. Full suite: 393 files / 1,070 tests passed; TypeScript, memory-safe build, whitespace, gallery/download/favorites and desktop/mobile video checks passed. Visible broken homepage images: zero in both audits. No raw private corpus or external account action included.
