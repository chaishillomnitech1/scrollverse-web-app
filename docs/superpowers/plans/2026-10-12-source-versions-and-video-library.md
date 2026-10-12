# Source Versions and Video Library Implementation Plan

**Goal:** Retain October accession metadata when same-name uploads change, incorporate batches 15–16 and the six replacement texts, and expose supplied YouTube references with deliberate playback.

**Architecture:** Freeze the reviewed historical catalog as a JSON seed. Add hash-identified source versions separately; build canonical records and duplicate title citations deterministically. Keep the video library in a lazy route, with no iframe until a visitor selects a video.

**Tech stack:** React, Wouter, Python catalog builder, Vitest, browser-local exports, Playwright.

## Tasks

- [x] Add a failing test detecting replacement-file hash substitution, new batch citations and duplicate title occurrence retention.
- [x] Save the historical receipt/title seed without copying private source bodies; preserve replacements outside the deployed project using hash-qualified filenames. Builder consumes the seed and current versions independently.
- [x] Extend the catalog with batch 15 titles, batch 16 revisions and THE DUAT; incorporate the replacement-file review proposals by their exact new IDs.
- [x] Add failing video-reference normalization/deduplication tests and a gallery route contract.
- [x] Extract supplied YouTube IDs and line citations from accessible local text records, excluding counsel/dispute passages. Keep titles neutral unless source-authored.
- [x] Add paginated search, a selected-video click-to-load YouTube player, external watch links, and homepage/synchronization handoffs. No automatic playback, media upload or download.
- [x] Inspect homepage visuals at desktop/mobile widths and correct broken-image displays without inventing source assets.
- [x] Run focused tests, complete suite, TypeScript, guarded build, browser tests and whitespace audit. Package the blueprints and reusable skill; save the verified managed checkpoint.

## External status

On October 12, the actual browser response at https://scrollverse.co/ is **Site Unavailable / Site unavailable due to unpaid billing**. Sandbox HTTP requests returned 403. These observations do not establish subscription status. Account questions go to https://help.manus.im. GitHub access was proposed but not enabled; no repository push is available under that account connection. Preserve a downloadable blueprint package without claiming an external push.

## Verified completion

Final scope: 15 version receipts, 16 collections, 482 unique titles, 619 title occurrences and six unique YouTube references from nine occurrences. Full suite: 393 files / 1,070 tests passed; TypeScript, memory-safe build, whitespace, gallery/download/favorites and desktop/mobile video checks passed. Visible broken homepage images: zero in both audits. No raw private corpus or external account action included.
