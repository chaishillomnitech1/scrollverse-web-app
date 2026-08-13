# Phase 160 — Platform Foundations Research

**Research date:** August 13, 2026

| Foundation | Official source | Practical pattern adapted for ScrollVerse | Boundary |
|---|---|---|---|
| Accessible structure | [W3C WAI Page Structure Tutorial](https://www.w3.org/WAI/tutorials/page-structure/) | Use clear regions, nested headings, meaningful structural elements, and labeled route groups so visitors can orient themselves and move efficiently. | This supports access and discoverability; it does not guarantee accessibility conformance without full assessment. |
| Semantic navigation | [MDN `<nav>` element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav) | Treat major link clusters as distinct navigation routes, using clear names and only the links relevant to a visitor’s chosen path. | A page may have several navigational areas; this does not create access to linked external systems. |
| Community onboarding | [Discord Community Onboarding FAQ](https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ) | Start with a small set of useful entry paths, use short preference questions only when a real choice exists, and make later discovery available without overwhelming a new visitor. | Discord’s tools and permissions remain external and provider-controlled; the ScrollVerse adaptation is an original local route pattern. |

## Implementation decision

The Platform Foundations Navigator will use a first-party choice map rather than an account connector or external community control. Each path will show a purpose, source state, and next internal route; source evidence, media preparation, community context, and distribution discovery remain separate and visibly labeled.
