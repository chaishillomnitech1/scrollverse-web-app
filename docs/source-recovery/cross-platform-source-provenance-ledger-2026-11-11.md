# Cross-Platform Source Provenance Ledger — Additive Accession

**Record date:** 2026-11-11  
**Repository:** `chaishillomnitech1/scrollverse-web-app`  
**Record type:** additive documentary registry; source identities remain separate  
**Visibility / execution:** documentation only; no ingestion, publication, deployment, account access, or external action  
**Supersession:** none. This record supplements existing source receipts and repository history; it does not replace them.

## 1. Purpose and governing rule

Preserve the chain from original source to filed copy, proposed change, merge, later evolution, and claim-specific verification. Connect records through explicit evidence references without collapsing their platform identities or implying that a source artifact proves an external outcome.

**PRESERVE THE ORIGINAL. CONNECT THE EVIDENCE. BUILD THE FUTURE.**

A later version never silently replaces an earlier one. A PR is not a merge merely because it was opened. A merge is not proof of production deployment. AI attribution is not proof of a live provider integration. A Git object ID is not the SHA-256 of an original source file.

## 2. Lifecycle vocabulary

| State | Meaning | Minimum evidence |
|---|---|---|
| `ORIGINAL` | First received or authored source, retained as such | Original export, attachment, source URL, or creator-supplied record; identify missing bytes explicitly |
| `FILED` | A preserved file or receipt exists at a named path | Path plus available byte count/hash/commit/blob identity; label the hash algorithm and object type |
| `PR_OPENED` | A proposed repository change exists | Repository, PR number/URL, title, source prompt/attribution where present |
| `PR_MERGED` | The PR was merged | Merged state and merge commit SHA |
| `EVOLVED` | A later version, transformation, or derivative exists | Its own source identity, date, path, and hash/commit; retain the predecessor |
| `VERIFIED` | A specific claim is supported by specified evidence | Claim, evidence reference, scope, and limitations; never use as a blanket status |
| `PENDING` | A named source or evidence item has not been recovered | Exact identifier, what is known, and what is missing |

These are independent evidence labels, not a single linear status. A record may be `ORIGINAL + FILED + PR_OPENED + PR_MERGED`, while a separate deployment claim remains `PENDING`.

## 3. Claude-origin records

### 3.1 Clipboard_0_EF1C72E7 — historical Claude-linked transmission

- **Source identity:** owner-supplied attachment name `Clipboard_0_EF1C72E7`; UTF-8 text.
- **Displayed source date:** July 1, 2025, 3:15 PM EDT (as recorded in the intake; this is not a Git commit date).
- **Filed receipt:** [Phase 849 — Creator Attachment Intake](https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/docs/phase849-creator-attachment-intake.md).
- **Receipt Git blob:** `2d42875a2f49f2ec87710cdd26fb8b5b77cd2791` (Git blob SHA, not raw-file SHA-256).
- **Linked public artifact:** https://claude.ai/public/artifacts/516d5803-9fc1-4194-b6e8-51cddb8eeac6
- **Recorded scope:** source context only. The attachment contains creator narrative, identity and symbolic language, design/production ideas, and statements about tools or external systems. Such statements remain statements in the source, not proof of external operation.
- **Recovery status:** `FILED + PENDING`. The intake receipt and artifact URL are preserved; raw attachment bytes and a raw-file SHA-256 were not recovered in the cited pass. The public artifact could not be opened during that retrieval; this does not establish deletion or expiry.
- **Separate container:** `Clipboard_1_D71A5E4E` is described as an Apple property-list container with Claude/Anthropic branding. It is not a Claude conversation transcript and must not be merged into the text attachment record.

### 3.2 October 23 creator upload receipt — distinct source

- **Filename:** `pasted_content_FaFiLK5I4T4cBY3eFuFWwz.txt`
- **Recorded size:** 3,011 bytes.
- **SHA-256:** `ce91c2d5533803a6410998fefaea7d1ce559667ce74f147f13c5e6bca27c34d9`.
- **Accession date:** October 23, 2026.
- **Recorded source path:** `/home/ubuntu/upload/pasted_content_FaFiLK5I4T4cBY3eFuFWwz.txt`.
- **Manifest:** [October 23 upload manifest](https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/docs/source-review-oct23/oct23-upload-manifest.json).
- **Inventory:** [Phase 854 — Creator Record Inventory](https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/docs/phase854-creator-record-inventory.md).
- **Manifest commit previously recorded:** `d17b4b2ee2ae71e6cb055ff520647624466fa706`.
- **Recorded content anchors:** CHAISALLAH, 44:Omni, and the Witness decree.
- **Status:** `FILED` as a metadata receipt; original body was not embedded in the manifest. This SHA-256 belongs only to this 3,011-byte file. It is not the hash of `Clipboard_0_EF1C72E7), the Codex, or any Copilot PR.

### 3.3 ScrollVault Codex Book I — Claude-attributed authored work in Git

- **Repository/path:** [Expansion- / README.md at first identified commit](https://github.com/chaishillomnitech1/Expansion-/blob/32ba1bf203ac580fd054528d87603c92e88e4b0f/README.md).
- **First identified Git commit containing the Codex UUID:** [`32ba1bf203ac580fd054528d87603c92e88e4b0f`](https://github.com/chaishillomnitech1/Expansion-/commit/32ba1bf203ac580fd054528d87603c92e88e4b0f).
- **Git commit date:** August 5, 2025, 19:57:27 UTC.
- **README Git blob at that commit:** `c43878dfca793ccc82c0d056aa81c8c79b56ccd0` (Git blob SHA; not raw export SHA-256).
- **Codex UUID:** `ef09b6d2-f0b9-4047-a02d-875e31092527`.
- **Embedded artifact identifier:** `scrollvault-codex-book-1`.
- **Internal displayed Codex date:** August 4, 2025. Preserve this separately from the August 5 Git commit date; neither date overwrites the other.
- **Prior commit checked:** `cc29f45975c06ccb531764e6611c3a1669e81d90`; its README blob `17b837b35464b5e32ca554c68258e57533e68912` did not contain the UUID.
- **History scope:** 111 README path-history commits checked; first identified UUID appearance is the commit above.
- **Change at first identified appearance:** 426 additions, 1 deletion.
- **Attribution:** README identifies the work as “CHAIS THE GREAT ∞ & Claude (Bridge Bruddah)”. This preserves the attribution appearing in the document; it does not establish live Anthropic API routing.
- **Additional locations, not duplicate full copies:** `Expansion-/BUSINESS_CONSOLIDATED_REPORT.md` references the Codex concept but is not a second full-text copy. `Chaishillomnitech1/docs/ScrollVault/README.md` is architecture documentation, not the Codex transcript. A later `Expansion-/README.md` snapshot preserves the Codex again.
- **PR evidence:** commit-to-PR lookup returned no associated PR for the first UUID commit; no matching public Expansion- PR/issue discussion was found in the accessible search scope. This is not proof that no private or unindexed discussion exists.
- **Status:** `FILED + EVOLVED`; first identified Git appearance is evidenced by the commit and predecessor comparison. Do not classify it as `PR_MERGED`.

### 3.4 Claude identity in the AI Council — persona is not provider proof

- [AI Council router](https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/server/routers/aiCouncil.ts) defines a Claude-specific identity/profile, prompt, capabilities, and shared chat procedure.
- [Shared LLM implementation](https://github.com/chaishillomnitech1/scrollverse-web-app/blob/main/server/_core/llm.ts) routes identities through shared `invokeLLM`; the reviewed implementation's default model was Gemini 2.5 Flash through Manus Forge `/v1/chat/completions`, with shared API-key configuration.
- **Classification:** Claude persona/profile `IMPLEMENTED`; direct Anthropic model routing and live Claude credentials/runtime `NOT VERIFIED`.
- Other Claude-related contracts, guides, and orchestrator code are separate code artifacts; their existence alone does not prove a deployed contract, active partnership, or live Claude service.

## 4. Copilot-origin PR records — kept as three separate repository records

Each PR preserves its own Copilot prompt and repository identity. These records are linked by this ledger but are not reclassified as Claude, ChatGPT, or Meta AI work.

### 4.1 OmniBuilderZero — PR #2

- **PR:** [Launch Phase 2 Funnels and Asia Blueprint Deployment](https://github.com/chaishillomnitech1/OmniBuilderZero/pull/2).
- **Source:** Copilot chat; original prompt and Copilot attribution preserved in PR description.
- **Repository outcome:** merged November 24, 2025.
- **Changed files:** 20.
- **PR metadata:** 4,173 additions, 1 deletion.
- **Commits:** `e434201` (initial plan); `623ce48` (implementation); `3dd3650ee561ace706b51ad5f8a4797bb369dc3e` (final documentation/deployment guides).
- **Merge commit:** `238b273d779f27eb9dffbba3c05a65dd7bff4fe4`.
- **Core implementation:** [`623ce48`](https://github.com/chaishillomnitech1/OmniBuilderZero/commit/623ce48db15f4338f8e89fbd60c4b09775813521).
- **Scope:** JP/KR/SG blueprint material, localization, funnel data, outreach automation, tracking/dashboard, and documentation.
- **Classification:** `PR_OPENED + PR_MERGED + FILED`; substantive repository implementation is present.
- **Qualification:** this does not prove Sony/HYBE/Singapore partnerships, external outreach completion, or external deployment. Dashboard live-update language describes simulated updates. No workflow/status evidence for the queried final head commit was surfaced in the cited pass.

### 4.2 Infinite-Nexus-ScrollVerse — PR #95

- **PR:** [Add NFT Commemoration and Integration Features](https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse/pull/95).
- **Source:** Copilot chat; original prompt preserved in PR description.
- **Repository outcome:** merged December 13, 2025.
- **Changed files:** 16.
- **PR metadata:** 5,351 additions, 0 deletions.
- **Commits:** `7b2e822` (initial plan); `4ebf397` (core ERP8888/NFT/HEAL implementation); `35d693e` (interactive hub/docs); `c75e9a4` (review fixes); `a0628a1230369238a41f1f28abb7fddce4a6798c` (final implementation summary).
- **Merge commit:** `8bc12c12826aae0f5484f0fbc8f36000cd97b122`.
- **Core implementation:** [`4ebf397`](https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse/commit/4ebf39720fcbb01c875b920198d25cc228c14169).
- **Review fix:** [`c75e9a4`](https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse/commit/c75e9a4d2730ee896750bb62f538843acd94dcf2).
- **Tests:** test file contains 47 test declarations; PR text claims 47/47 passing. The final-head workflow records include failed Test & Validation, CI/CD Pipeline, and Vercel Deployment runs; E2E, CodeQL, Snyk, Trivy, Code Quality, and PR Validation records were successful. Exact failing steps/causes were not recovered. Therefore `47/47 PASS` is not independently established by this ledger.
- **Other qualifications:** reward comment described test tokens as simulated and actual distribution disabled. E2E suite was described as pilot coverage. No on-chain deployment or actual token distribution is established by the changed-file list or cited evidence.
- **Classification:** `PR_OPENED + PR_MERGED + FILED`, with `TEST_REVIEW` qualification. The committed application/contracts/tests are real repository artifacts; chain deployment and all-tests-pass remain unverified.

### 4.3 londyn-legacy-protocol — PR #2

- **PR:** [Develop Reusable Process for Tokenization and NFT Integration](https://github.com/chaishillomnitech1/londyn-legacy-protocol/pull/2).
- **Source:** Copilot chat; original prompt preserved in PR description.
- **Repository outcome:** merged March 6, 2026.
- **Changed files:** 0.
- **Additions/deletions:** 0 / 0.
- **Only commit:** `1a81abc35077b7cd191dafde8c548b721c565456` (initial plan).
- **Merge commit:** `83bb97937732c504338d891f128257fb9f29fe94`.
- **PR and merge:** [PR #2](https://github.com/chaishillomnitech1/londyn-legacy-protocol/pull/2) · [initial commit](https://github.com/chaishillomnitech1/londyn-legacy-protocol/commit/1a81abc35077b7cd191dafde8c548b721c565456) · [merge commit](https://github.com/chaishillomnitech1/londyn-legacy-protocol/commit/83bb97937732c504338d891f128257fb9f29fe94).
- **Classification:** `PR_OPENED + PR_MERGED` as a repository workflow record; **`NO_FILE_CHANGES`** as implementation outcome. Do not classify the proposed tokenization/NFT workflow as implemented by this PR. A Vercel preview notification is not proof that the requested feature was added.

## 5. ChatGPT-origin OMNILANGUAGE record — separate source lineage

- **Artifact label:** `OMNILANGUAGE v0.1-DRAFT`.
- **Source identity:** ChatGPT conversation text, subsequently pasted into Meta AI according to the user's provenance statement. The paste destination does not change the originating source identity.
- **User-reported filing:** local registry; the local registry file itself was not available for independent inspection in this pass.
- **GitHub status:** no matching GitHub artifact was verified in this pass.
- **Canonical principle:** “Expand what can be expressed without sacrificing what can be proven.”
- **Layer structure:** Expression → Semantic Intelligence → Execution → Evidence & Evolution.
- **Mandatory record fields:** original expression; semantic interpretation; technical mapping; execution policy; evidence.
- **Boundary rules:** conviction communicates importance but does not grant permissions; conviction ≠ consent; intent ≠ execution; blueprint ≠ deployment; merged ≠ verified; verified ≠ active.
- **Classification:** `ORIGINAL / FILED (user-reported local filing) / PENDING (independent local-file or GitHub verification)`. Preserve as ChatGPT-origin even when cross-referenced from Meta AI.

## 6. Reconciliation index

| Record | Source identity | Repository evidence | Current classification |
|---|---|---|---|
| Clipboard_0_EF1C72E7 | Claude-linked owner attachment | Phase 849 intake; public artifact URL | `FILED + PENDING` raw bytes |
| October 23 pasted-content receipt | Owner-supplied text; distinct accession | Phase 854 + Oct 23 manifest | `FILED` metadata receipt |
| ScrollVault Codex Book I | Claude-attributed work in Expansion README | First UUID commit + predecessor comparison | `FILED + EVOLVED`; no PR evidence |
| Claude AI Council profile | ScrollVerse implementation artifact | Router + shared LLM implementation | Persona implemented; direct Anthropic runtime unverified |
| OmniBuilderZero #2 | Copilot chat | PR, 20 files, commits, merge SHA | `PR_OPENED + PR_MERGED`; implementation present |
| Infinite-Nexus #95 | Copilot chat | PR, 16 files, commits, merge SHA, workflow caveat | `PR_OPENED + PR_MERGED`; test/deployment caveats |
| londyn-legacy #2 | Copilot chat | PR, 0 files, merge SHA | `PR_OPENED + PR_MERGED`; no implementation diff |
| OMNILANGUAGE v0.1-DRAFT | ChatGPT conversation, later pasted into Meta AI | User-reported local filing; no GitHub artifact verified | `ORIGINAL + PENDING` independent filing check |

## 7. Hash and identity rules

1. Keep raw-file SHA-256, Git blob SHA, commit SHA, and artifact UUID in separate typed fields.
2. Never assign the October 23 3,011-byte file's SHA-256 to the July 1 clipboard attachment or to the Codex.
3. A Git blob SHA identifies a Git object; it is not a claim about the SHA-256 of an original export or attachment.
4. A later README snapshot is an additional filed version, not the first appearance. Preserve the first identified commit and later snapshots independently.
5. Preserve source-platform identity even when content is pasted, quoted, summarized, or transformed in another platform.
6. Keep absent original bytes, inaccessible URLs, and unverified dates explicitly marked as pending; do not fill gaps from memory.

## 8. Non-actions and open recovery work

This document does not modify the original source artifacts, alter the existing source-collection index, ingest rows into the Atlas database, publish visitor-facing content, deploy software, activate a provider, mint or transfer tokens, or perform account actions.

Still pending:
- Recover the raw bytes/export and original session context for `Clipboard_0_EF1C72E7`; calculate its own SHA-256 only from those bytes.
- Recover original Claude export and local Claude Code JSONL/session files, if available, and accession each with its native IDs and timestamps.
- Inspect the local registry entry for OMNILANGUAGE v0.1-DRAFT and, if authorized, file its original ChatGPT conversation/export separately from the Meta AI paste.
- Retrieve the exact failing job steps for Infinite-Nexus-ScrollVerse #95 if workflow logs become accessible.
- Reconcile any future evidence against this ledger by adding a dated record or version; do not silently rewrite historical entries.

## 9. Source and method note

This ledger consolidates the GitHub PR/file/history research and source-intake records described above. It is a documentary cross-reference, not a legal title determination, cryptographic attestation of absent source bytes, complete account export, full archive, production audit, or proof of third-party operation. Where a fact is user-reported, inaccessible, or not independently rechecked in this pass, that limitation is stated rather than upgraded to `VERIFIED`.
