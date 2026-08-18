# ScrollVerse Portfolio-Wide Evidence-First Operating Roadmap

> **First-party operating position:** This roadmap organizes the owner-authorized ScrollVerse portfolio for original creation, preservation, collaboration, and future release. It does not claim that every referenced title, account, master, technical component, provider, asset, commercial term, or on-chain record is already public or active. Each asset receives its own evidence packet and direct operating state.

## Portfolio Workstream Map

| Workstream | Typical works | Evidence packet required | Portal state before owner release |
|---|---|---|---|
| Screen and story | Episodes, films, treatments, comics, trailers, podcasts | Script/version, author credits, contributor permissions, visual/score sources, captions, transcript, age review | Research |
| Music and sound | Singles, albums, score cues, spoken-word, audio editions | Writers, performers, producer/master rights, splits, ISRC/metadata plan, lyric sheet, master/stems, accessibility | Research |
| Visual and fashion | Covers, art, photos, lookbooks, apparel concepts, animated visuals | Artist/source, likeness/mark review, print/design permissions, alt text, flash/sensitivity review, product decision | Requires owner release |
| Books and learning | Manuscripts, study guides, audio books, lessons, free knowledge editions | Text source, author/editor credits, citations, accessibility, youth-safety plan, format/version | Research |
| Archive and legacy | Family pages, historical records, oral history, birthday/synchronization records | Source date, family/privacy decision, media permissions, correction contact, archive placement | Research |
| Contributor commons | Submitted songs, videos, art, show ideas, research corrections | Submitter identity/role, intended use, rights statement, sources, accessibility, moderation/response record | Requires owner release |
| Technical concepts | Media catalog, creator tools, research navigator, data models, route plans | Requirement source, data classification, threat model, test plan, owner-controlled provider/release choice | Research |

## One Asset, One Evidence Packet

Every asset—whether a song, video, book chapter, art image, learning module, or software-facing claim—moves through the same small packet. The packet is intentionally repeatable so a growing catalog can be operated consistently.

| Packet area | Record to collect | Completion signal |
|---|---|---|
| Identity | Title, version, creative lane, owner-stated intended use, date received | The asset can be located and distinguished from similar drafts |
| Source | Original local path or trusted URL, date, checksum/version where helpful | A reviewer can trace the asset back to its source record |
| Rights and credit | Writers, performers, producers, artists, footage, marks, likenesses, contributor permissions | Every person or source with a required credit or permission is recorded |
| Accessibility and care | Captions, transcript, lyric sheet, alt text, audio description, content/sensitivity notes, adult-supported participation where relevant | A visitor can encounter the work with an appropriate access path |
| Master and metadata | Final master/version, format, artwork, descriptive metadata, destination selection | The actual release object is identified instead of a concept or screenshot |
| Release decision | Owner approval, available state, destination, date, free/paid decision, correction/takedown route | The asset changes from **requires owner release** to **available now** |

## Dependency Order

```text
Original idea or supplied reference
        ↓
Intake + source label
        ↓
Original draft or structured review
        ↓
Rights / contributor / accessibility packet
        ↓
Final master or approved technical version
        ↓
Explicit owner release for named destination
        ↓
Available-now portal entry + correction path
```

This order keeps the portal expressive without requiring it to pretend that a plan is already a release, that a source is already a license, or that a reference is already a live integration.

## Cross-Lane Integration Pattern

The strongest integration is not a single automatic system. It is a shared asset identity that allows one original work to appear across multiple aligned lanes only after the same evidence packet is complete.

| Example asset | Connected lanes after evidence is complete | Still requires separate decisions |
|---|---|---|
| Original episode | Media World, Scroll TV, transcript/reader edition, discussion room, learning guide | Video host, final master, public release date, audience settings |
| Original single | Music page, story episode, lyric reader, score notes, visualizer/cover page | Master, credits/splits, artwork, DSP/direct destination, commercial choice |
| Original book chapter | Archive, free reader, audio edition, lesson module, source-note record | Final text, narrator, accessibility files, distribution choice |
| Original visual | Episode page, cover, lookbook, artist record, contributor gallery | Source file, artist agreement, subject permissions, alt text, product decision |
| Technical design | Owner Workstation, research navigator, implementation backlog, source record | Architecture review, test plan, credentials, provider activation, deployment authorization |

## Reusable Operating Templates

### A. Original Work Intake Card

```text
Asset title / version:
Lane:
Owner-stated intended use:
Source path or URL:
Received date:
Current state: Research | Requires owner release | Available now
Original / licensed / contributor / public-reference classification:
Next evidence needed:
Correction contact or route:
```

### B. Release Decision Card

```text
Asset identity confirmed: Yes / No
Rights and credits confirmed: Yes / No
Accessibility packet complete: Yes / No
Youth-safety review complete where applicable: Yes / No
Final master or approved technical version recorded: Yes / No
Named destination selected: Yes / No
Explicit owner release for this destination: Yes / No
Available-now state: only when every required field is Yes
```

### C. Technical Concept Card

```text
Problem being solved:
Source or user need:
Data categories involved:
Browser-local / server / third-party-provider boundary:
Threat and privacy considerations:
Tests required:
Operational state: Research
Activation gate: owner-selected provider, credentials through secure settings, validated implementation, explicit release
```

## Current Operating-States

| Portfolio lane | Current state | Immediate productive work |
|---|---|---|
| Original production drafts | Research | Finish scripts, score briefs, creative treatments, credits, and accessibility plans |
| Protected media intake | Research | Select one asset at a time and complete its packet |
| Creator/contributor material | Requires owner release | Obtain scope, rights, source, accessibility, and moderation records |
| Commerce, royalties, tokens, wallets, contracts, and payments | Requires owner release | Keep fail-closed until product, rights, terms, provider setup, and owner authorization are complete |
| Technical concepts | Research | Convert concepts into testable requirements and source-labeled architecture records |
| Published portal changes in this local workspace | Requires managed synchronization resolution | Preserve local changes; publish only after the conflict with remote checkpoint `2ba0cc6a` is safely resolved |

## Correction and Stewardship

Every record should provide a way to correct a source, update a credit, replace a version, request a review, or withdraw a submission. The correction path is part of the work’s integrity: it keeps the record capable of improving without erasing its history.

## References

[1]: Owner-supplied `Pasted_content_100.txt`, received August 15, 2026. Treated as protected planning context; no embedded system, provider, financial, contract, account, release, or deployment claim was independently verified or executed.

[2]: /home/ubuntu/skills/scrollverse-evidence-production-workflow/SKILL.md "ScrollVerse Evidence-First Production Workflow"

[3]: /home/ubuntu/skills/scrollverse-evidence-production-workflow/references/release-evidence-packet.md "Release Evidence Packet Template"
