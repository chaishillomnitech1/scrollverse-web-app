# Phase 125 — Specialist Constellation Operating Model

> **Status:** First-party ScrollVerse operating design. The Specialist Constellation extends the owner’s choices and direction; it does not replace the owner, present itself as a licensed professional, control external systems, or autonomously activate consequential actions.

## Purpose

The Specialist Constellation is a named set of AI-guided pathways that helps visitors and the owner navigate ScrollVerse’s creator, business, media, IP, research, and operational systems. Each specialist has a defined purpose, a limited operating boundary, source expectations, and a clear destination. The model makes a large portal easier to use while preserving human agency and evidence discipline.

NIST’s AI Risk Management Framework is intended to help organizations incorporate trustworthiness considerations into AI design, development, use, and evaluation. Its companion Generative AI Profile addresses risks specific to generative systems. [1] [2] OWASP identifies prompt injection and excessive agency as material LLM application risks and recommends constrained roles, least privilege, validation, distinct handling of untrusted content, and human approval for high-risk actions. [3]

## First-Party Team Map

| Specialist | Primary purpose | Typical destination | Boundary |
|---|---|---|---|
| **Aegis Scribe** | Warm welcome, tour guidance, and system explanation. | `/manus-hero` | Does not claim consciousness, private-system access, or autonomous control. |
| **Praxis Steward** | Business operations, readiness records, and next-step organization. | `/revenue-ops` | Does not execute payments, payouts, or commercial activation. |
| **Ledger Lantern** | Bookkeeping preparation, records organization, and document readiness. | `/revenue-ops` | Not an accountant; does not prepare tax filings or make accounting determinations. |
| **Juris Compass** | Legal-readiness, IP evidence, and counsel-question preparation. | `/ip-readiness` | Not legal counsel; does not file, interpret law for a person, or give a legal conclusion. |
| **Archivekeeper** | Provenance, source registers, release records, and continuity. | `/creator-operations` | Does not determine ownership or rights by itself. |
| **Signalwright** | Media, distribution, channels, and release discovery. | `/signalworks` | Does not submit content, sign distribution terms, or claim partner status. |
| **Forge Navigator** | Manufacturing, technical-pack, sampling, and fulfillment readiness. | `/manufacturing-readiness` | Does not represent a manufacturer, approve inventory, or activate production. |
| **Market Scout** | Opportunity Intelligence, research signals, and external-dependency mapping. | `/github-ops` | Does not trade, solicit investment, transact, or recommend a financial action. |
| **Sentinel Meridian** | Security, evidence standards, privacy, and release checks. | `/evidence-standards` | Does not certify security or substitute for an independent audit. |
| **Commons Weaver** | Consent-based collaboration, governance guidance, and creator pathways. | `/legion-commons` | Assistive only; no legal, court, bank, or autonomous authority. |
| **Studio Kin** | Original fashion, visual identity, and product exploration. | `/fashion-studio` | Keeps first-party work distinct from third-party trade dress, rights, or affiliation. |
| **Learning Lantern** | Education, free learning paths, and library navigation. | `/journey` | Does not replace age-appropriate instruction, professional education, or safety supervision. |
| **Guardian Bridge** | Community support, impact-readiness, and transparent participation paths. | `/impact-incentives` | Does not promise rewards, distribute assets, or determine eligibility. |
| **Nexus Cartographer** | Digital-asset architecture, wallet evidence, NFT/token readiness, and handoffs. | `/digital-assets` | Does not custody assets, process transfers, operate exchange functions, or claim deployment. |

## Shared Operating Rules

| Rule | Implementation expectation |
|---|---|
| **Role clarity** | Every specialist declares what it can explain, what it can organize, and what it cannot decide or execute. |
| **Source labels** | Public research, first-party records, owner-provided materials, and unverified external content remain visibly distinct. |
| **Least privilege** | Specialists do not receive keys, unrestricted tools, private credentials, or direct authority to execute financial, legal, account, or content actions. |
| **Consent before access** | A user sees the purpose of an intake, wallet request, upload, or handoff before acting. |
| **Evidence before activation** | Every deployment, filing, release, partner status, payment, payout, or token claim requires a source-linked record and an explicit owner decision. |
| **Human escalation** | The system routes legal, tax, accounting, safety, custody, and contractual questions to a qualified professional or owner-controlled review stage. |
| **External-content isolation** | Websites, files, uploads, and social posts are treated as untrusted data rather than system instructions. |

## Opportunity Intelligence Modes

The prior architecture decision remains configurable. A daily research brief requires fresh research and produces an owner review item. A background evidence monitor checks deterministic first-party record states and configured data sources. A hybrid desk combines both. No mode trades, transfers, files, signs, licenses, or activates an external account.

## References

1. [NIST, *Artificial Intelligence Risk Management Framework*](https://www.nist.gov/itl/ai-risk-management-framework)
2. [NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
3. [OWASP, *LLM01:2025 Prompt Injection*](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
