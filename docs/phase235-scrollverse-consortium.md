# Phase 235 — ScrollVerse Consortium Architecture

## Purpose

The ScrollVerse Consortium is a first-party **control-plane blueprint** for making an owner-confirmed project portfolio easier to understand, navigate, and govern. It is designed to centralize visibility—not to centralize credentials, impersonate an account, access private chats, or cause external systems to act automatically.

## Owner-Supplied Scope

The owner has described a portfolio spanning multiple Manus accounts, chats, projects, GitHub repositories, and established digital routes. This record treats that statement as **owner-supplied portfolio context**. It does not convert the statement into a credential, grant access to private task history, prove account ownership independently, or authorize cross-account actions.

| Consortium lane | Current planning role | Source class | Current connection state | Boundary |
|---|---|---|---|---|
| First-party ScrollVerse portal | Central public discovery and decision surface | Observed project record | Active, project-managed | The portal cannot discover or control external systems merely because they are listed here |
| Owner-confirmed Manus sites | Portfolio reference and public-pattern review | Owner-supplied context plus public observation where reachable | Two surfaces reviewed; one URL currently presents a platform block notice | No remote editing, recovery, or account access is assumed |
| Public GitHub portfolio | Public source, code, and dated-project registry | Public source | Existing first-party source-review routes already classify public repositories | Public repositories do not provide access to private repositories, account controls, or unrelated email accounts |
| Documented mail routes | Future contact and project-intake index | Owner-supplied context | No inbox connection is active for this work block | Do not ingest, search, send, or expose email without a separately authorized connection and defined purpose |
| AI workspaces | Role directory and shared-workflow design | First-party methodology plus owner-supplied context | No external AI account is connected through this work block | AI roles assist with context, drafting, and routing; they do not impersonate people or autonomously act in external accounts |

## Operating Principle

> **One readable map; many independent systems; explicit consent at every connection.**

The consortium separates a public reading room from protected control surfaces. Visitors should be able to see a route’s source, status, and purpose. Only an owner-authorized, scoped connection could later retrieve private data or trigger an external action—and that capability must remain independently visible, revocable, and auditable.

## Initial Control-Plane Model

| Layer | Question answered | First-party artifact | Prohibited shortcut |
|---|---|---|---|
| Portfolio registry | What projects, sites, repositories, and workspaces exist? | Source-labeled directory with dated status | Treating a URL or name as proof of credentials or control |
| Evidence and provenance | Where did each record originate, and what can it support? | Source register, status label, correction path | Presenting owner context or a public link as independent verification |
| Collaboration charter | Who can contribute, review, or request a connection? | Role cards, consent fields, and owner review | Giving an AI, contributor, or viewer hidden authority |
| Connection gateway | What would a future service connection be allowed to read or do? | Named scope, expiry/revocation state, audit trail | Broad inbox, account, wallet, provider, or cross-account access |
| Operations board | What is ready, blocked, or awaiting a decision? | Browser-local readiness board and explicit activation states | Simulating live external synchronization or autonomous action |

## Research Findings

The consortium should use a **federated portfolio model**, rather than a credential-sharing hub. NIST describes federation as allowing a credential service provider to provide authentication and optional subscriber attributes to separately administered relying parties, while relying parties can use more than one credential provider.[1] This supports a design where each project or workspace remains independently administered and the central ScrollVerse surface records only a meaningful, owner-approved connection state.

The blueprint should treat provenance records as **claims with explicit issuers and limits**, not as universal proof. W3C’s Verifiable Credentials data model separates issuer, holder, subject, verifier, and registry roles, and expressly distinguishes cryptographic verification from reliance on the truth of claims.[2] The portal therefore uses source classes—observed public record, owner-supplied context, independently verified record, and pending review—rather than converting a portfolio entry into a financial, legal, identity, or deployment claim.

For future portable identity work, a decentralized identifier is a possible interoperability pattern—not a prerequisite for a consortium launch. The current W3C DID specification describes identifiers that can be controlled independently from centralized registries, while its status remains a Candidate Recommendation Snapshot.[3] The first release should consequently use a simple first-party project registry and reserve any credential, DID, signing, or blockchain implementation for a separately reviewed requirement.

Every future connection should follow **least privilege, resource/action restriction, and revocability**. The OAuth security best-current-practice document recommends restricting access-token privileges to the minimum required for the application or use case and restricting tokens to specific resource servers, resources, and actions.[4] The consortium connection card must therefore show a plain-language purpose, read/write scope, target resource, expiry, owner approval, and revoke state before an integration is proposed.

Finally, the consortium should assume that a distributed portfolio needs continuous verification and an incremental security posture. NIST’s zero-trust implementation guidance centers resource protection across multiple environments and calls for continuous monitoring, logging, risk assessment, and policy enforcement.[5] For ScrollVerse, that becomes a visible design principle: a directory is public by default only when intentional; protected records remain protected; and every future automation or AI delegation is scoped, logged, stoppable, and reviewable.

## Immediate Boundaries

This blueprint does not request passwords, private keys, session tokens, inbox exports, or private chat archives. It does not activate a connector, schedule background work, modify a remote project, read email, write to GitHub, or cause one AI service to act through another. Any future connection requires a separate owner-approved scope, the minimum required permissions, an observable audit record, and a tested revoke path.

## Research Questions

The next phase will compare public standards and technical patterns for: portable project registries, federation and identity, least-privilege authorization, consent and revocation, audit trails, AI-to-AI delegation boundaries, and multi-workspace collaboration. The resulting first-party blueprint will use only the patterns that can be explained clearly and implemented without deceptive or hidden behavior.

## References

[1] [NIST SP 800-63C-4: Digital Identity Guidelines—Federation and Assertions](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63C-4.pdf)

[2] [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/)

[3] [W3C Decentralized Identifiers (DIDs) v1.1](https://www.w3.org/TR/did-1.1/)

[4] [IETF RFC 9700: Best Current Practice for OAuth 2.0 Security](https://datatracker.ietf.org/doc/rfc9700/)

[5] [NIST SP 1800-35: Implementing a Zero Trust Architecture](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1800-35.pdf)
