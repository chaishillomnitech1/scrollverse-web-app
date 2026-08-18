# Phase 321 — External Creator Infrastructure Research

**Author:** Manus AI  
**Research date:** August 15, 2026  
**Purpose:** External standards and public-good references for an original ScrollVerse creator-infrastructure roadmap.

## Research Findings

| Infrastructure area | External finding | ScrollVerse design implication |
| --- | --- | --- |
| Content provenance | C2PA describes Content Credentials as an open technical standard for establishing a digital asset’s origin and edits, and presents the information as a content-history label. [1] | Keep a clear source/version and change-history record for each asset. Treat any future cryptographic provenance layer as an optional interoperability upgrade, not a substitute for rights or platform acceptance. |
| Provenance and privacy | The Content Authenticity Initiative describes signed, tamper-evident provenance metadata while emphasizing that creator attribution and identity information can be chosen and privacy-aware. It also states that provenance does not determine whether content is “real.” [2] | Separate source/history evidence from editorial, legal, rights, or truth claims. Make creator and contributor disclosures purposeful and privacy-aware. |
| Publication accessibility | W3C’s publishing guidance recommends presenting publication accessibility declarations in clear, user-friendly ways and identifies key information such as reading modes, visual adjustments, nonvisual reading, alternative text, and prerecorded audio. [3] | For books, comics, video, and audio, keep an asset-specific accessibility record with captions, transcript, alt text/audio description, read-aloud or braille compatibility information where relevant, and a visible “no information available” state if the record is incomplete. |
| Open licensing | Creative Commons describes standardized licenses as a way for creators to communicate permissions in advance, supporting sharing, remixing, attribution, and lawful reuse under creator-selected terms. [4] | Provide a creator-selected licensing field for works intentionally released to the commons. Do not apply any open license by default; keep the owner’s release and rights choice specific to the asset. |
| Open learning | UNESCO defines OER as learning, teaching, and research materials in the public domain or released under an open license that permits no-cost access, reuse, adaptation, and redistribution. Its recommendation stresses inclusive, equitable, accessible, multilingual, and sustainably curated learning materials. [5] | Extend ScrollVerse’s free-knowledge lanes with transparent license selection, source context, accessible formats, revision history, and a contributor/correction pathway. |

## Design Boundary

These sources inform an original, interoperable creator-infrastructure model. They do not confer accreditation, legal status, platform access, publishing acceptance, licensing rights, contract authority, or a completed public release. Each ScrollVerse asset still requires its own source, rights, accessibility, destination, and owner-release record.

## References

[1] [C2PA — Advancing digital content transparency and authenticity](https://c2pa.org/)  
[2] [Content Authenticity Initiative — How it works](https://contentauthenticity.org/how-it-works)  
[3] [W3C — Accessibility Metadata Display Guide for Digital Publications 2.1](https://www.w3.org/publishing/a11y/metadata-display-guide/guidelines/)  
[4] [Creative Commons — Sharing Openly, Sharing Globally](https://creativecommons.org/cc-licenses/)  
[5] [UNESCO — Recommendation on Open Educational Resources](https://www.unesco.org/en/legal-affairs/recommendation-open-educational-resources-oer)
