# Phase 370 — Book of the Journey Publication Report

## Delivered reader

The local ScrollVerse portal now includes **The Book of the Journey: A ScrollVerse Living Record** at `/book-of-the-journey`. It is a free, chapter-based reader that connects the owner’s first-person record, family and place context, original creative work, study pathways, protected dialogue archive, community reflection, and open-record continuation practice.

The reader contains seven navigable chapters: **The Open Page**, **Foundation: Family, Place, and Memory**, **Making the Work**, **Study as Practice**, **Transmissions and Co-Creation**, **A Record Shared**, and **Continuation Ledger**. Readers can select a chapter from an accessible table of contents, use previous/next controls, open connected ScrollVerse records, and consult the visible source shelf.

## Visual and access design

The book uses original non-figurative ScrollVerse cover art—an illuminated scroll with seven abstract pathways—to establish a visual reading experience without using third-party likenesses, protected screenshots, historic figures, or unapproved asset material. The reader is free to access and has no checkout, wallet connection, token, product, or payment control.

Every chapter labels its source lane and operating state. The book distinguishes owner-authored text, owner-stated history, owner-held material, original ScrollVerse work, public source, community first-person exchange, and protected third-party system transmissions. The recovered chat archive lane is included as a source index, not as a claim that every conversation has been publicly released or independently confirmed.

## Source and preservation ledger

The accompanying evidence ledger connects the reader to existing local ScrollVerse routes, public GitHub repository metadata, and free personal-archive and oral-history learning sources. The public repository review located archive-oriented paths in `chaishillomnitech1/Chaishillomnitech1`; it does not convert repository descriptions or copied content into verified external outcomes. [1] [2] [3] [4]

| Source group | Reader treatment |
|---|---|
| Owner-authored and owner-stated records | Presented directly with visible source labels and connected local route paths. |
| Original ScrollVerse work | Available through the Media Hub, research pages, and creator records according to each route’s operating state. |
| Recovered chat archives | Presented as a source-index lane pending individual source/date/speaker labels and owner-approved excerpts. |
| Protected family, ancestry, and private Gmail materials | Remain outside public content until an owner-approved accessible record identifies what may be included. |
| Third-party system transmissions | Preserved as attributed dialogue artifacts rather than presented as owner-authored declarations. |

## Validation and publication state

| Check | Result |
|---|---|
| TypeScript | `npx tsc --noEmit` completed with no errors. |
| Regression suite | **87 test files / 311 tests passed**. |
| Focused coverage | `server/phase370.bookOfTheJourney.test.ts` verifies the reader route, seven chapter pathways, cover art path, source labels, accessible controls, and Home/Journey Archive discovery links. |
| Local route response | `GET /book-of-the-journey` returned **200 OK** from the local development server. |
| Managed preview | The managed status tool reports a running server and no TypeScript errors. Its automated root preview capture remained blank, so it is not used as evidence of the reader’s visual rendering. |
| Managed publication | **Blocked.** The managed checkpoint continues to report an unresolved conflict against `user_github/main` at checkpoint `2ba0cc6a`; local changes are not represented as live until a managed checkpoint succeeds. |

## References

[1]: https://github.com/chaishillomnitech1/Chaishillomnitech1 "chaishillomnitech1/Chaishillomnitech1 — public repository page"
[2]: https://digitalpreservation.gov/personalarchiving/ "Library of Congress — Personal Archiving"
[3]: https://oralhistory.org/archives-principles-and-best-practices-overview/ "Oral History Association — Archiving Oral History"
[4]: https://siarchives.si.edu/history/how-do-oral-history "Smithsonian Institution Archives — How to Do Oral History"
