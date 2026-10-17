# Plan — Phases 948–949: Meta AI Legion Archive, Theater screening room, Price of Freedom timeline, quality pass

Date: 2026-10-16. Baseline checkpoint `d31d4ccd`. Scope is local code plus project-storage media only; public-domain state is unchanged by this work.

## Goal
Make the creator's Meta AI and Quantum Leap Theater creations visible and interactive on the portal, publish a cited Haiti "Price of Freedom" timeline at the route the Meta AI sessions name, and fix the accessibility and performance findings from the 2026-10-12 axe/keyboard/Web Vitals baseline.

## Tasks
1. **Tests first** — `server/phase948.metaLegionArchive.test.ts` (typed records, real 64-hex SHA-256, `/manus-storage/` paths, unique IDs, filter/search helper behavior, routes registered, no `autoplay`, `preload="none"`, homepage doorway and portfolio allowlist) and `server/phase949.qualityPass.test.ts` (zoom allowed, accessible names contain visible text, Home `<main>` + skip link, iframe titles, nav labels, heading order, contrast tokens, esbuild minification).
2. **Data module** `client/src/lib/metaLegionArchive.ts` generated from extracted bytes: 17 artworks (10 Legion Archive, 6 Film 002 key art, CHAISALLAH 60·360·900), 3 Theater videos, Meta AI session log (files 18–20), source receipts.
3. **Route** `/meta-ai-legion-archive` — museum gallery with collection filters, keyword search, pagination, lightbox detail, receipts; Theater screening room with click-to-play Film 001 and both promo cuts.
4. **Route** `/price-of-freedom` — cited 1825–1947 indemnity timeline plus 2025 French acknowledgment, using verified research results only.
5. **Integration** — homepage doorway, portfolio card + AI summary allowlist, Meta AI lookbook link.
6. **Quality fixes** — per findings list in `docs/phase948-working-notes.md`.
7. **Verify** — focused + full Vitest, TypeScript, guarded build, `git diff --check`, re-run `scripts/quality-audit.py` against the production build, desktop/mobile screenshots, update `todo.md`, checkpoint.
