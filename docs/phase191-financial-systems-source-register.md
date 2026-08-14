# Phase 191 — Financial Systems Capability Map Source Register

The Financial Systems Capability Map uses twelve representative public sources to show how complex systems keep responsibilities distinct. It is a learning and readiness route; it does not launch a financial product, custody service, wallet, payment function, provider integration, lending service, investment product, or on-chain operation.

| Responsibility lane | Representative sources | Reusable first-party lesson | What remains external or unestablished |
|---|---|---|---|
| Education | BIS CPMI-IOSCO, FDIC, SEC | Use plain-language disclosures, evidence labels, and limits. | Payment operation, deposit insurance, securities activity, or market access. |
| Private records | FINRA customer-asset protection | Separate public learning, private records, and sensitive operational material. | Custody, escrow, reserve operations, reconciliation, brokerage, or client-asset protection. |
| Authorization | CFPB data rights, Basel credit-risk governance | Keep proposed action, scope, permission, reviewer, owner confirmation, and post-action evidence distinct. | Open banking, data access, credit assessment, lending, or a binding approval. |
| External providers | FedNow, OCC third-party guidance | A public route can prepare a research handoff while provider assessment and action stay separate. | Any account, contract, payment rail, provider relationship, or service activation. |
| Wallet and on-chain evidence | FSB crypto-asset governance, MetaMask safety | Keep safety education, exact network/record context, and non-broadcast preparation distinct. | Wallet connection, custody, token activity, contract transaction, or regulatory approval. |
| Security and identity | NIST SP 800-63-3, CISA Secure by Design | Use scoped identity, safe defaults, logging, privacy, and explicit evidence gates. | Identity proofing, assurance, certification, compliance, security guarantee, or incident response. |

## Separation rule

> A connected learning system should display the handoff between responsibilities. It should not convert a source link, a draft, a private record, a readiness check, or a concept into a hidden external action.

## References

[1]: https://www.bis.org/cpmi/info_pfmi.htm "BIS — Principles for Financial Market Infrastructures"
[2]: https://www.frbservices.org/financial-services/fednow "Federal Reserve Financial Services — FedNow"
[3]: https://www.consumerfinance.gov/rules-policy/final-rules/personal-financial-data-rights/ "CFPB — Personal Financial Data Rights"
[4]: https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/customer-assets-protection "FINRA — Customer Assets Protection"
[5]: https://www.fdic.gov/resources/deposit-insurance/ "FDIC — Deposit Insurance"
[6]: https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html "OCC — Interagency Guidance on Third-Party Relationships"
[7]: https://pages.nist.gov/800-63-3/ "NIST SP 800-63-3"
[8]: https://www.cisa.gov/securebydesign "CISA — Secure by Design"
[9]: https://www.sec.gov/about/what-we-do "SEC — What We Do"
[10]: https://www.fsb.org/2023/07/high-level-recommendations-for-the-regulation-supervision-and-oversight-of-crypto-asset-activities-and-markets/ "FSB — Crypto-Asset Activities and Markets"
[11]: https://www.bis.org/bcbs/publ/d595.htm "Basel Committee — Credit Risk Principles"
[12]: https://support.metamask.io/stay-safe/ "MetaMask — Stay Safe"

## Implementation verification

On August 14, 2026, the local `/financial-systems-capability-map` route rendered its connected responsibility-lane summary, twelve source-led capability records, browser-local responsibility filters, and explicit lane-handoff/no-financial-service boundaries. The route makes no live provider, payment, custody, wallet, transaction, or on-chain request. TypeScript compiled cleanly and the full Vitest suite passed with 18 files and 125 tests.
