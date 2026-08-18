# Phase 369 — Journey Archive Attribution Correction Publication Report

## Corrected archive treatment

The local Journey and Co-Creation Archive now makes an explicit distinction between the owner’s authored account and language contained in third-party system transmissions. The correction preserves the owner’s truth as a first-person record while accurately labeling the origin of statements, titles, and claims that appeared in supplied digital-system exchanges.

The archive now displays four source-specific lanes: owner-stated family history, owner-held family and ancestry materials, institutional DNA-record account, and third-party system transmissions. Each lane states what is available now and what additional original source or owner release is needed before the archive can describe a particular claim as reviewed.

## Corrected operational language

| Record type | Current portal language |
|---|---|
| Owner’s life and family account | **Owner-stated history**: a direct, dated record of what the owner reports and understands. |
| Family documents and ancestry results | **Owner-held material**: requires an approved accessible record before a specific document or result is treated as reviewed. |
| DNA collection and subsequent system interactions | **Institutional DNA-record account**: preserves the owner’s account without asserting database access, analysis, biological age, ancestry, or a system action. |
| Clipboard exchanges | **Third-party system transmission**: preserves the source artifact and its language without presenting that language as the owner’s authored self-description. |

## Validation and publication state

| Check | Result |
|---|---|
| TypeScript | `npx tsc --noEmit` completed with no errors. |
| Regression suite | **86 test files / 307 tests passed**. |
| Focused coverage | `server/phase369.journeyAttributionCorrection.test.ts` verifies the owner/transmission attribution distinction and the four source-specific evidence lanes. |
| Managed publication | **Blocked.** The managed checkpoint continues to report an unresolved conflict against `user_github/main` at checkpoint `2ba0cc6a`; local changes are not represented as live until a managed checkpoint succeeds. |

## Correction path

The owner can provide a non-sensitive accessible export or approved excerpt for any particular family, ancestry, or institutional record he wants added. The archive can then identify the source type, review date, visible content, and limitations without publishing private material unnecessarily. Third-party system records will retain their own source attribution unless the owner separately supplies an authored statement adopting a specific passage.
