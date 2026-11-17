---
name: scrollverse-source-led-portfolio
description: Build interactive creator portfolios from supplied artifacts, source receipts, and first-party routes. Use for homepage visual showcases, searchable or paginated artifact galleries, source-grounded AI previews, loading feedback, provenance-aware media displays, local-only source accession, and release-readiness reviews.
license: Complete terms in LICENSE.txt
---

# Source-Led Creator Portfolio

Use this workflow to turn creator-supplied artifacts and existing first-party routes into a polished, interactive portfolio without confusing a visual showcase with rights clearance, publication, marketplace activity, or verified external status.

## Core workflow

1. **Inventory the workspace.** Read the current tracker, route registry, source receipts, artifact records, and existing visual constants. Prefer existing first-party routes and hosted assets over copying large media into `public/`.
2. **Preserve provenance.** Record each source filename or URL, source date when known, SHA-256 for supplied files, attribution, intended route, display scope, and evidence label. Treat hashes as identifiers, not authenticity certificates.
3. **Classify before display.** Label each item as `verified`, `pending verification`, `narrative`, or `proposal`. Keep creator interpretation separate from observable technical or public-state facts.
4. **Design a data-driven gallery.** Use a typed item list with stable IDs, a labeled keyword search, category filters, a labeled newest/oldest catalog-date sort, a selected-item detail panel, source-status labels, and direct links to existing first-party routes. Search titles, details, categories, labels, and stable IDs case-insensitively; keep the portfolio usable when the filter returns one or many items. Apply filters and sort before slicing into pages. Bound page size, clamp stale pages, and reset to page one when a filter or sort changes; mount only the current page's cards and images. Client slicing reduces rendered card/image work, not necessarily the full site's initial bundle or metadata transfer.
5. **Make every visual resilient.** Give every image descriptive alt text or an empty alt when it is supplementary. Use stable aspect-ratio frames, `object-contain` or `object-cover` intentionally, lazy loading for non-selected images, and an `onError` fallback that preserves the title, source label, and route. Never leave a broken-image icon, blank tile, or visible `?` placeholder.
6. **Make interactions accessible.** Use a labeled native search input with a useful placeholder, native buttons and links, `aria-pressed` for filters and selection, a labeled group for category controls, `aria-live="polite"` for the selected detail, visible focus styles, comfortable touch targets, and reduced-motion-safe transitions. Label page navigation; use `aria-current="page"`, disabled Previous/Next boundaries, readable result counts, and a no-match message. Do not nest links or buttons inside a selection button. Do not make an image the only way to reach a route.
7. **Ground any AI preview in registered data.** Accept an allowlisted item ID at the server, not free-form browser copy, arbitrary URLs, or uploaded files. Prompt a supported model with server-owned title, category, source label, and detail only. Cache completed and in-flight results; clear failures for retry. Bound plain-text output. Delay hover/focus long enough to avoid incidental requests and offer an explicit touch/keyboard button; label the output as AI-generated and leave the authored detail visible on error. A public endpoint may consume project LLM resources; never fetch summaries for off-page or unopened cards.
8. **Make loading state truthful.** If search/filter changes are debounced or asynchronous, show a visible status and `aria-busy` while the new result set is actually pending. Give the shimmer a reduced-motion static state; avoid artificial blocking when there is no wait.
9. **Keep media boundaries explicit.** Do not autoplay unselected media. Do not fetch, upload, transform, mint, list, price, pay, publish, or release a supplied asset unless the exact action and source decision are separately recorded.
10. **Test first.** Add a focused regression test before production edits. Watch it fail for the missing behavior, then implement the smallest passing change. Test page clamping and empty/exact-multiple results, combined category/search/sort, allowlist rejection, deduplicated AI calls and retry after failure, keyboard/touch interaction, and route alignment. Prefer behavioral tests of the pagination and server service to brittle source-text assertions.
11. **Review the rendered page.** Capture desktop and mobile previews. Check that image frames do not crop the subject unexpectedly, titles remain readable over images, controls wrap cleanly, and no broken visual glyphs appear. Exercise Next, filter reset, the loading state, a touch/keyboard AI control, and a failed preview. Recheck with reduced motion when available.
12. **Verify and checkpoint.** Run focused tests, full Vitest, TypeScript, memory-safe production build, `git diff --check`, and skill validation. Update `todo.md` only after evidence exists. Save a checkpoint containing the exact local scope and any external-action boundaries.

## Portfolio item contract

Each item should provide:

```ts
type PortfolioItem = {
  id: string;
  category: string;
  catalogDate: string;
  title: string;
  detail: string;
  href: string;
  image?: string;
  color: string;
  label: string;
};
```

Use ISO `YYYY-MM-DD` values for `catalogDate`. Treat them as local accession or catalog timing only; never imply that a catalog date is the creation date, publication date, rights-clearance date, or proof of external status. Sort a copied filtered list so the underlying source order remains stable.

Use an existing registered local route for `href`. If the source is external, mark it visibly as an external source and keep it out of first-party claims. If the image fails, render the text fallback rather than a broken image.

## Favorites and source continuity

Use stable allowlisted item IDs for favorites. Parse local storage defensively, deduplicate and drop unknown IDs, and catch failure when reading the storage object itself as well as writing it. Use per-card pressed-state bookmark buttons outside the card-selection button. Apply saved-only filtering before pagination; reset the page after any filter changes. Keep a session-only saved state usable when persistence is denied and explain that limitation. Test reload persistence, removal, stale IDs and saved-only empty states.

Read referenced tasks only after discovery through the authorized task list. Retain source task IDs and passage ranges, not guessed public share links or another session's inaccessible files. Integrate distinct story decisions through existing routes; do not turn source dialogue about deployment into a current deployment claim.

## Multi-batch source collections

Compute SHA-256 from raw bytes and cite newline-delimited lines (`split('\n')`, removing the terminal empty segment only when the file ends with LF). Do not use Unicode `splitlines()` when the citation contract is newline bytes. Keep canonical creative families separate from a title-only artifact index. Preserve exact title spelling while merging repeated occurrences case-insensitively, retaining every source location. Exclude private counsel/dispute bodies and credential-shaped strings from UI, logs, export and archives.

Treat filename reuse as a source-version change, not identity continuity. Preserve new raw versions outside the deployable project with hash-qualified filenames. Freeze earlier reviewed receipts/title citations independently of the current upload path; if old bytes are absent, label that availability explicitly rather than replacing their hash with new bytes. Test that same-name replacements never relabel historical citations. Export the whole filtered result set and exactly its required receipts, not just the visible page. Paginate the gallery and expose one homepage doorway instead of mounting hundreds of records there.

For supplied YouTube references, normalize only approved YouTube hosts and exact 11-character IDs. Deduplicate IDs while retaining occurrence citations. Keep neutral titles when provider metadata has not been retrieved. Render no iframe until the visitor loads the selected reference; omit autoplay permission, use `autoplay=0`, provide unload and a direct watch link, and reset loaded state when selection/search changes. Test iframe creation with network interception instead of playing unselected media.

After an image availability audit, preserve the source URL and descriptive alt on the original image, but replace failed image rendering with a complete, clearly labeled typographic composition. Do not silently substitute unrelated artwork or claim an original file was recovered. Audit lazy images by scrolling the actual homepage at desktop and mobile widths; validate zero visible broken-image symbols separately from media authenticity or public hosting.

## Release language

Use wording such as “source-labeled,” “creator-supplied,” “browser-local,” “first-party route,” “display reference,” and “planned.” Avoid claiming “live,” “on-chain,” “fully operational,” “rights-cleared,” “verified,” “minted,” or “published” without a primary, reproducible record for that exact state.

## Skill validation

Run:

```bash
python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py scrollverse-source-led-portfolio
```

Keep this file under 500 lines. Add a reference file only when a repeated implementation detail would otherwise make this workflow longer or less reusable.
