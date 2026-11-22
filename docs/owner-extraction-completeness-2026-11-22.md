# ScrollVerse Complete Owner Extraction — 2026-11-22

## Completeness rule

This extraction is complete only when the delivery index closes against the local SHA-256 manifest: every manifest record appears exactly once in a byte-bearing media part or in the verified code/database package, with matching path, byte count, and SHA-256. A large archive or a manifest-only receipt is not sufficient.

## Required components

| Component | Local evidence | Delivery state |
|---|---|---|
| Full verified portal code | Code archive from checkpoint `18589d8` | Included in owner package |
| Full database | 102 tables discovered, 102 exported, zero errors | Included in owner package |
| `/home/ubuntu/upload` | 1,100 files, 2,652,811,346 bytes, exact SHA-256 manifest | Byte-bearing media archive being prepared and split into parts |
| `/home/ubuntu/webdev-static-assets` | 76 files, 88,030,806 bytes, exact SHA-256 manifest | Byte-bearing media archive being prepared and split into parts |
| Total local media | 1,176 files, 2,740,663,722 bytes | Must close at 1,176/1,176 before calling complete |
| Pilot / Comic / Ledger source context | `pilot-comic-ledger-accession.json` | Local Comic/Ledger bytes included; Instagram reel remains source-reference-only because its bytes are not local |

## Named Pilot / Comic / Ledger addition

The local source record `pasted_content_163.txt` (495,316 bytes; SHA-256 `d14f169505f0313bc509c56137eac7614f5f08a6b4fa20cc3f0b67616ee6f248`) contains the truncated Instagram reference for `@chaisthegreat_mrwalk`, including the `Debut soon on my platform` context. The remote reel was not fetched. Local matching artifacts include `Free-Comic-Book-Series-Block131.html`, `ScrollVerse_Block145_OmniGaze_Resurrection_Comic.pdf`, and `Scrollverse-Block145-Comic.html`; their exact hashes are recorded in the accession JSON and master manifest.

Any Pilot page, panel, image, or video not present in the bounded local roots or verified checkpoint code remains an explicit unhosted/source-needed record. It must not be fabricated or counted as a byte match.

## Part closure procedure

1. Hash every media part.
2. Concatenate parts for each root and verify the tar listing.
3. Extract into a clean temporary directory.
4. Recompute all file hashes and compare path, byte count, and SHA-256 to the master manifest.
5. Record `manifestCount`, `deliveredCount`, `missingCount`, `duplicateCount`, and `hashMismatchCount`.
6. Mark the extraction complete only when counts are `1176`, `1176`, `0`, `0`, and `0`.

No external platform, Instagram account, domain, billing system, repository, wallet, payment rail, or provider was contacted for this local extraction.
