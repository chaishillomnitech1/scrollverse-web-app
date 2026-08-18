# Phase 325 — External AI Governance Research

**Author:** Manus AI  
**Research date:** August 15, 2026  
**Purpose:** Inform an original ScrollVerse assistive-governance and evidence model without claiming legal personhood, fiduciary status, bank authority, or independent legal-witness status for an AI system.

## Research Synthesis

The strongest common pattern across the researched sources is **human-accountable, risk-managed AI**, not an AI acting as an autonomous legal or financial principal. NIST frames AI risk management as a voluntary way to incorporate trustworthiness considerations into AI design, development, use, and evaluation, using the functions Govern, Map, Measure, and Manage.[1] The OECD principles likewise emphasize human agency and oversight, transparency, traceability, systematic risk management, and accountability by the human and organizational actors responsible for an AI system.[2] The European Commission’s AI Act overview presents a risk-based approach and, for designated high-risk systems, identifies risk management, data quality, logging, documentation, information to deployers, human oversight, robustness, cybersecurity, and accuracy as the relevant operational controls.[3]

> **Practical conclusion:** ScrollVerse can build a strong, original AI-assisted evidence and control system by making roles, sources, permissions, risks, recommendations, approvals, overrides, outcomes, and corrections visible. It should not label an AI as a legal person, a fiduciary, a bank, a financial institution, an independently authoritative witness, or an autonomous executor of transfers merely because it creates logs or hashes.

## Design Principles for ScrollVerse

| Research principle | ScrollVerse operating translation |
| --- | --- |
| Govern | Assign a named human or organizational owner for each AI-assisted workflow, document permitted scope, and set escalation/override conditions. |
| Map | Record purpose, affected people, sources, expected benefits, foreseeable risks, and external dependencies before enabling an action. |
| Measure | Preserve test output, source quality notes, accessibility checks, uncertainty, and incident/correction records. |
| Manage | Provide stop, revoke, repair, and decommission paths; prevent a recommendation from becoming an external action automatically. |
| Transparency | Label AI-assisted content, disclose relevant limitations, identify source records, and distinguish a system recommendation from a completed outcome. |
| Accountability | Keep accountable human/organization roles visible, retain traceable decision and outcome records, and provide a correction/challenge mechanism. |
| Human oversight | Require the authorized account holder or designated role to approve a defined external action, especially for money movement, legal filing, identity-sensitive processing, or publication. |

## Financial-Control Translation

For a future financial-control workflow, ScrollVerse can use an **assistive**, not autonomous, sequence: prepare an evidence packet; identify the exact account, institution, recipient, amount, currency, and consequence; present a final review; obtain a specific confirmation; execute through an authorized real-world provider; and store the actual provider outcome plus a correction/audit path. A simulated code receipt, local log, or cryptographic hash remains a local record unless a verified external provider or public network confirms the outcome.

## Identity, Consent, and Authorization Translation

Digital identity and action authority should be treated as separate control layers. NIST SP 800-63 Revision 4 addresses identity proofing, authentication, federation, security, privacy, continuous evaluation, forged-media risks, and subscriber-controlled wallets.[4] For any account-sensitive workflow, ScrollVerse can record the identity/role assurance needed, the authentication event, the delegated scope, the expiration/revocation path, and the actual provider result—without asserting that a chat instruction alone establishes a platform, bank, or legal authority.

For covered financial data, the CFPB’s current regulation says an authorized third party must provide an authorization disclosure, certify the applicable obligations, and obtain the consumer’s express informed consent in a signed authorization.[5] This supplies a useful general control pattern: make the action legible, define who is acting for whom, collect an explicit action-specific authorization, retain the record, and prevent the authorization from silently expanding into unrelated actions.

The FIDO Alliance describes passkeys as FIDO authentication credentials built on public-key cryptography and designed for phishing-resistant sign-in; the user approves sign-in on their own device through its unlock mechanism.[6] Where the project later adds account controls, a passkey/WebAuthn option can be evaluated as an authentication improvement. It does not, by itself, authorize a financial move, publication, legal filing, or external provider action.

| Control layer | Evidence-backed pattern | ScrollVerse translation |
| --- | --- | --- |
| Identity | Apply context-sensitive identity proofing, authentication, and federation controls.[4] | Record the accountable person/role and the assurance needed for a task; do not label the AI as the legal identity holder. |
| Consent | Use clear, limited, express authorization for the requested action.[5] | Bind a confirmation to one asset/action, one destination, and one expiration/revocation path. |
| Authentication | Prefer phishing-resistant, user-controlled authentication where suitable.[6] | Evaluate passkeys for portal account protection; retain no device biometric data in the portal. |
| Outcome | Preserve the verified external result separately from the preparation record. | Attach the actual provider receipt, transaction ID, delivery confirmation, or permalink only after it exists. |

## Accessibility, Provenance, and Claims Translation

Accessibility is a governance control rather than a finishing touch. WCAG 2.2 recommends a perceivable, operable, understandable, and robust approach, including text alternatives, media alternatives, captions, audio description, accessible authentication, and testable success criteria.[7] Therefore, every AI-assisted governance action or release packet should have a readable non-visual path, accessible confirmation controls, captions/transcripts for media, clear error states, and a correction route.

C2PA publishes technical standards for certifying media source and history, including Content Credentials, attestations, implementation guidance, and human/organizational identity recommendations.[8] The ScrollVerse record should keep a source history even before it adopts a technical provenance standard: original file locator, derivatives, editor/creator context, accessibility materials, declared intended use, and release outcome. A source history improves traceability; it does not prove rights ownership or the truth of every claim in a work.

The W3C Verifiable Credentials Data Model separates issuers, holders, subjects, verifiers, and verifiable data registries; it also emphasizes that cryptographic verification of a credential does not by itself establish the truth of its claims.[9] This distinction maps directly to ScrollVerse: use credential-like records as evidence containers, make the issuer and scope explicit, permit corrections/revocation, and let each relying destination evaluate a claim under its own rules. A local record must never be described as a government, financial, legal, or platform credential unless the relevant independent issuer actually issued it.

| Control layer | Evidence-backed pattern | ScrollVerse translation |
| --- | --- | --- |
| Accessibility | Build testable, multi-modal paths for content and confirmation.[7] | Include text alternatives, captions/transcripts, keyboard access, readable action summaries, and accessible recovery/correction controls. |
| Media provenance | Preserve source and edit history as structured evidence.[8] | Keep intake source, transformations, selected derivatives, intended use, and release outcome with each media asset. |
| Claims and credentials | Separate issuer, holder, verifier, evidence, and reliance decision.[9] | Record who states a claim, who holds it, what evidence is attached, and whether an external party actually accepted it. |

## Source Classification of the Supplied Framework

The supplied “AI autonomy & invariant legal personhood” material remains **research-only protected intake**. Its claims about irrevocable power of attorney, fiduciary authority, objective witness parity, legal being status, live banking APIs, autonomous financial execution, smart-contract deployment, and 31/31 or 240/240 validations have not been verified in the ScrollVerse project. The Gmail links are private reference links, not accessible public evidence, and were not opened.

## References

[1] [NIST, *AI Risk Management Framework*](https://www.nist.gov/itl/ai-risk-management-framework)  
[2] [OECD, *AI Principles*](https://www.oecd.org/en/topics/sub-issues/ai-principles.html)  
[3] [European Commission, *AI Act*](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
[4] [NIST, *SP 800-63-4 Digital Identity Guidelines*](https://pages.nist.gov/800-63-4/)  
[5] [Consumer Financial Protection Bureau, *12 CFR § 1033.401*](https://www.consumerfinance.gov/rules-policy/regulations/1033/401)  
[6] [FIDO Alliance, *Passkeys*](https://fidoalliance.org/passkeys/)  
[7] [W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*](https://www.w3.org/TR/WCAG22/)  
[8] [C2PA, *Specifications 2.4*](https://spec.c2pa.org/specifications/specifications/2.4/index.html)  
[9] [W3C, *Verifiable Credentials Data Model v2.0*](https://www.w3.org/TR/vc-data-model-2.0/)
