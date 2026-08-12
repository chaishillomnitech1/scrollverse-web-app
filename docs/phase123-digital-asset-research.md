# Phase 123 — Digital Asset Architecture Research Notes

## Scope

This record supports a first-party ScrollVerse architecture for NFT, token, wallet, and customer pathways. It is an engineering and operations record, not legal or financial advice and not an authorization to custody assets, operate an exchange, transmit value, issue a financial product, or make a deployment.

## Primary Findings

FinCEN’s guidance distinguishes a virtual-currency **user** from an **administrator** or **exchanger**. FinCEN states that a user obtaining convertible virtual currency to buy goods or services is not an MSB under its regulations, while an administrator or exchanger that accepts and transmits convertible virtual currency or buys or sells it may be a money transmitter unless an exemption or limitation applies. FinCEN describes the assessment as facts-and-circumstances dependent. [1]

FinCEN’s digital-certificate ruling illustrates why product architecture matters: a service that goes beyond direct brokered payment and enables unrestricted transfer of customer value can be treated as money transmission; the ruling also describes potential AML, recordkeeping, reporting, and registration implications where the stated facts amount to money transmission. [2]

The SEC’s 2025 crypto-asset FAQ explains that custody, broker-dealer control, recordkeeping, transfer-agent, trading, and settlement questions depend on the functions actually performed and applicable rules. It also notes that non-security crypto assets may not receive SIPC protection and that customer-facing custody records deserve careful treatment. [3]

## Architecture Implications for ScrollVerse

| Design decision | First-party implementation direction | Why |
|---|---|---|
| Wallet connection | Connect a user-controlled wallet; do not request, collect, store, or transmit seed phrases or private keys. | Keeps the portal focused on user-controlled signing and avoids creating a private-key custody surface. |
| NFT provenance | Record creator-provided source, release material, rights status, and reviewer notes before presenting release readiness. | Separates provenance and review evidence from a claim of ownership, valuation, or a live mint. |
| Token lifecycle | Keep token concept, contract source, deployment evidence, market data, and customer disclosures as separate records. | A UI, source file, or ticker is not proof of a deployed token, a market, or customer protections. |
| Customer journeys | Clearly distinguish information, wallet connection, protected intake, external-provider handoff, and any future regulated function. | Visitors should know when they are staying in ScrollVerse and when a third party controls the next step. |
| Transfers and payouts | Do not add portal-triggered customer-to-customer transfers, pooled balances, redemption, exchange matching, or beneficiary payout logic without a dedicated authorization, compliance, and security track. | These functions can change the regulatory and security profile of the system. |
| Security record | Require independent review, reproducible tests, contract addresses, chain IDs, deployment transaction references, and incident/rollback planning before saying a chain function is active. | Prevents confusing research or code presence with a live, reviewable deployment. |

## Wallet and Contract Engineering Findings

EIP-1193 defines an event-driven provider interface for wallet interoperability. Its security section emphasizes that the provider is exposed in an untrusted environment, should contain no private user data, and should be treated as potentially adversarial; wallet/client layers should validate and rate-limit provider requests. It also recommends opt-in account exposure instead of exposing accounts by default. [4]

For ScrollVerse, this supports a user-controlled wallet pattern: request account access only after a visitor takes an explicit action, display the expected chain before any signature request, handle account and chain changes, and never ask for seed phrases, private keys, or opaque signatures.

OpenZeppelin’s contract documentation describes community-vetted ERC-20 and ERC-721 implementations and role-based permissioning, while warning that upgrading across major-version storage layouts is unsafe and that contract libraries do not substitute for an independent security audit. [5]

| Engineering control | ScrollVerse design response |
|---|---|
| **Wallet consent** | Start with read-only public information. Ask for account access only when a user explicitly connects a supported wallet. |
| **Network visibility** | Show the expected chain ID and visible mismatch state before enabling any user-initiated contract interaction. |
| **Signature clarity** | Explain the purpose, data domain, and outcome of a signature request; do not use a signature as a silent authorization for a different action. |
| **Key safety** | Treat seed phrases, private keys, and recovery material as prohibited input across all public and protected forms. |
| **Contract provenance** | Require source repository reference, exact commit/tag, audited dependency version, compiler setting, bytecode/verification record, chain ID, deployed address, and transaction reference. |
| **Authorization** | Keep administrative mint, pause, royalty, and upgrade functions behind explicit role design, tests, and human release decisions. |
| **Deployment claim** | Do not call a contract live until the address, chain, verification source, transaction reference, and review record are all present. |

## Research Sources

1. [FinCEN, *Application of FinCEN’s Regulations to Persons Administering, Exchanging, or Using Virtual Currencies* (2013)](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering)
2. [FinCEN, *Application of FinCEN’s Regulations to Persons Issuing Physical or Digital Negotiable Certificates of Ownership of Precious Metals* (2015)](https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/application-fincens-regulations-persons)
3. [U.S. SEC Division of Trading and Markets, *FAQs Relating to Crypto Asset Activities and Distributed Ledger Technology* (2025)](https://www.sec.gov/rules-regulations/staff-guidance/trading-markets-frequently-asked-questions/frequently-asked-questions-relating-crypto-asset-activities-distributed-ledger-technology)
4. [Ethereum Improvement Proposal 1193, *Ethereum Provider JavaScript API*](https://eips.ethereum.org/EIPS/eip-1193)
5. [OpenZeppelin, *Contracts 5.x Documentation*](https://docs.openzeppelin.com/contracts/5.x)
