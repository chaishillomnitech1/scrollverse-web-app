# Phase 123 — ScrollVerse Digital Asset Operating Architecture

> **Design status:** First-party architecture and readiness model. It does not assert a live token market, exchange, custody program, financial product, customer transfer rail, or contract deployment.

## Architecture Intent

ScrollVerse can offer a coherent digital-asset experience without becoming a custodian, exchange, bank, broker, transfer agent, or payment intermediary. The primary design is a **creator-owned information, provenance, and user-controlled wallet layer**. The portal can show clear evidence, prepare assets, connect a user-controlled wallet at that user’s request, and send visitors to external providers through visible handoffs. It must not receive private keys, seed phrases, customer fiat, pooled crypto, or authority to move customer assets.

FinCEN distinguishes users of virtual currency from administrators or exchangers, and describes money-transmitter analysis as facts-and-circumstances dependent. [1] The architecture therefore preserves a non-custodial posture until a distinct authorization, compliance, and security program exists. EIP-1193 also treats the provider as an untrusted browser-facing object and recommends opt-in account exposure, data validation, and no private user data in the provider. [2]

## Customer Journey Map

| Journey | Current ScrollVerse role | Non-negotiable control | Release evidence needed to progress |
|---|---|---|---|
| **Discover an asset** | Explain a first-party identity asset, NFT concept, token concept, or creator release record. | Separate fact, concept, and external source labels. | Source record, rights status, public metadata. |
| **Connect a wallet** | Ask a visitor to connect a self-custody wallet through an explicit action. | No seed phrases, private keys, or automatic background connection. | EIP-1193/EIP-6963 implementation, expected chain display, consent and error states. |
| **Read on-chain evidence** | Display a contract, token, or NFT only where chain ID, address, source verification, and transaction evidence are available. | Do not infer deployment from UI text or source code. | Chain ID, deployed address, explorer verification, deployment transaction, test and review record. |
| **Sign an assertion** | Allow a user to sign a clearly described non-financial message or provenance assertion. | Use typed, human-readable data; no opaque signing. | EIP-712 domain, message description, verification method, retention rules. |
| **Prepare a creator release** | Link creator materials, provenance, metadata, and reviewer completeness feedback. | A review is not a legal rights determination or mint authorization. | Cleared asset, source record, rights/territory note, reviewer decision. |
| **External execution** | Hand a visitor to a third-party provider or chain interface when that provider controls the action. | Visible domain change and no implied platform affiliation. | Provider choice, terms/risk disclosure, explicit user action. |

## Asset Classes and Evidence Gates

| Asset class | First-party feature now | Gated next step | Must never be inferred from a page alone |
|---|---|---|---|
| **Identity art and sigils** | Spiral Signature identity route, public QR identity record, creator-owned concept assets. | Formal IP review and release bundle completion. | Trademark registration, exclusive legal rights, app-store asset approval. |
| **NFT or edition concept** | Provenance-ready creator release records and NFT-facing portal routes. | Metadata freeze, cleared media, contract evidence, independent review. | A mint, sale, market value, royalty receipt, or collector entitlement. |
| **Token concept** | Token, wallet, governance, and evidence routes. | Contract source, chain and address evidence, audit/review record, clear disclosures. | A deployed supply, tradable market, value, yield, or customer protection. |
| **Wallet connection** | Existing self-custody connection experience and proposed standards upgrade. | Provider discovery, event handling, user consent, chain mismatch UX. | Custody, identity verification, purchase, or portfolio ownership. |
| **Creator royalties** | Documented research and design concepts. | Rights terms, contract design, legal/accounting review, deployment evidence. | An entitlement, payout, resale revenue, or allocation. |
| **Impact incentives** | Safeguarded readiness record for owner-controlled on-chain asset references. | Verified partners, recipient safeguards, rules, reviews, and release decision. | An active reward, transfer, beneficiary payout, or token distribution. |

## Technical Baseline

### 1. Non-Custodial Wallet Boundary

The portal should adopt an opt-in wallet connection pattern based on EIP-1193 and multi-provider discovery where appropriate. It should listen for account and chain changes, show the active chain, and display readable error states. EIP-1193 notes that providers are exposed in an untrusted environment; the portal must therefore treat provider data as untrusted input and retain no private user material. [2]

### 2. Provenance and Metadata Boundary

NFT or edition metadata should receive a content-addressed storage reference, media hash, version history, creator source record, and release decision. EIP-721 and ERC-1155 provide interoperable token models, while EIP-2981 is a royalty-information interface rather than proof that a royalty has been received. [3] [4] [5]

### 3. Contract Evidence Boundary

If a contract is ever presented as deployed, the project record must include the exact source repository and commit/tag, compiler settings, audited dependency version, chain ID, contract address, verified explorer page, transaction reference, test record, audit or review state, and the human release decision. OpenZeppelin provides widely used ERC-20/ERC-721 implementations and access-control tools, but its documentation explicitly notes that using a library is not a substitute for an independent audit. [6]

### 4. Customer Disclosure Boundary

Before any wallet connection, signature, or external provider handoff, the portal should tell visitors whether the interaction is read-only, a wallet consent request, a non-financial assertion, or an external action. The SEC notes that custody and customer protections depend on the function performed, and that non-security crypto assets may not have SIPC protection. [7]

## Release Decision Matrix

| Decision | Portal may prepare | Owner-controlled decision required | Independent evidence required |
|---|---|---|---|
| Display original asset concept | Yes | No, if clearly labelled concept-only | Creator source record and original-work boundary. |
| Connect self-custody wallet | Yes | Visitor’s explicit consent | Provider safety implementation and UX testing. |
| Sign provenance assertion | Yes, after clear message display | Visitor’s explicit signature | Typed-data schema and verification approach. |
| Publish NFT metadata record | Yes, as a draft or reviewed record | Owner release decision | Cleared media, metadata hash, rights record, review note. |
| Deploy or upgrade contract | No automatic action | Explicit owner decision | Test suite, independent security review, roles/multisig plan, chain evidence. |
| Offer exchange, custody, transfers, or yield | No | Distinct business and authorization decision | Legal/compliance architecture, security review, provider/custody evidence, customer disclosures. |

## Reusable Workflow

1. **Register** the source asset or concept in a first-party record.
2. **Classify** it as original, external reference, unverified submission, or approved release material.
3. **Attach** provenance, metadata, rights, and reviewer evidence.
4. **Test** wallet, signature, metadata, and contract components in reproducible environments.
5. **Publish** only the status supported by evidence.
6. **Release** only through an explicit owner decision; scheduled monitors may report readiness but cannot activate value movement.

## References

1. [FinCEN, *Application of FinCEN’s Regulations to Persons Administering, Exchanging, or Using Virtual Currencies*](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering)
2. [EIP-1193, *Ethereum Provider JavaScript API*](https://eips.ethereum.org/EIPS/eip-1193)
3. [EIP-721, *Non-Fungible Token Standard*](https://eips.ethereum.org/EIPS/eip-721)
4. [EIP-1155, *Multi Token Standard*](https://eips.ethereum.org/EIPS/eip-1155)
5. [EIP-2981, *NFT Royalty Standard*](https://eips.ethereum.org/EIPS/eip-2981)
6. [OpenZeppelin, *Contracts 5.x Documentation*](https://docs.openzeppelin.com/contracts/5.x)
7. [U.S. SEC, *FAQs Relating to Crypto Asset Activities and Distributed Ledger Technology*](https://www.sec.gov/rules-regulations/staff-guidance/trading-markets-frequently-asked-questions/frequently-asked-questions-relating-crypto-asset-activities-distributed-ledger-technology)
