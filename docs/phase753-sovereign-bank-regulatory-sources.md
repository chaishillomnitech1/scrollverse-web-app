# Phase 753 — Sovereign Bank Regulatory Source Notes

## Scope and source boundary

The owner-supplied liquidity-ledger and infrastructure documents are protected planning context. Their embedded code, asserted system states, ledger values, security claims, transaction logic, network endpoints, service-daemon configurations, and deployment prompts have not been run, adopted, or treated as verification of a financial-services capability.

## Primary regulatory sources to review

| Topic | First-party source | Why it is relevant |
| --- | --- | --- |
| Deposit-insurance application process | [FDIC: Applications for Deposit Insurance](https://www.fdic.gov/bank-examinations/applications-deposit-insurance) | Identifies FDIC application resources for institutions seeking deposit insurance. |
| Current deposit-insurance process | [FDIC: New Review Process for Deposit Insurance Applications](https://www.fdic.gov/news/press-releases/2026/fdic-announces-new-review-process-deposit-insurance-applications) | Describes the FDIC’s August 2026 process update and will be read directly before making any timeline statement. |
| National-bank chartering | [OCC: Licensing Manual](https://www.occ.gov/publications-and-resources/publications/comptrollers-licensing-manual/index-comptrollers-licensing-manual.html) | Primary entry point for national-bank charter and licensing guidance. |
| Bank-holding-company formation | [Federal Reserve: Bank Holding Company Applications](https://www.federalreserve.gov/supervisionreg/afi/bhcfilings.htm) | Identifies the Federal Reserve approval path for a company becoming a bank holding company. |

## Current operating state

**Research:** The portal can document a bank-grade readiness pathway and required evidence. It does not yet establish a chartered bank, a deposit-insured institution, a licensed lender, a payment provider, a custodian, a yield product, or a financial account.

## Verified findings from primary sources

| Readiness area | Verified finding | Source |
| --- | --- | --- |
| De novo deposit insurance | The FDIC states that groups organizing a de novo institution should have a sound business plan, experienced board and management leadership, and appropriate capital support. It publishes a handbook and application resources for organizers. | [FDIC applications page](https://www.fdic.gov/bank-examinations/applications-deposit-insurance) |
| National-bank chartering | The OCC publishes licensing-manual booklets for charter applications, background investigations, capital and dividends, public notice and comments, changes in control, and director or senior-executive changes. | [OCC Licensing Manual](https://www.occ.gov/publications-and-resources/publications/comptrollers-licensing-manual/index-comptrollers-licensing-manual.html) |
| Bank-holding-company formation | A company proposing to become a bank holding company, acquire a subsidiary bank, or acquire control of relevant securities generally needs prior Federal Reserve approval under the Bank Holding Company Act, subject to defined notice procedures. | [Federal Reserve filing guidance](https://www.federalreserve.gov/supervisionreg/afi/bhcfilings.htm) |

These regulator-described paths are distinct from a browser-local ledger or a non-custodial software design. A technical architecture can support a future application, but it does not itself create a bank charter, deposit insurance, regulatory approval, or authority to take deposits.

## Compliance, security, and consumer-protection sources

| Readiness area | Primary source | Application to the blueprint |
| --- | --- | --- |
| BSA and anti-money-laundering | [FinCEN: The Bank Secrecy Act](https://www.fincen.gov/resources/statutes-and-regulations/bank-secrecy-act) and [FFIEC BSA/AML Manual introduction](https://bsaaml.ffiec.gov/manual/Introduction/01) | A future regulated institution requires an appropriately designed AML/BSA compliance program, reporting and recordkeeping controls, governance, and independent review—not merely ledger code. |
| Cybersecurity governance | [FFIEC Cybersecurity Awareness resources](http://www.ffiec.gov/resources/cybersecurity-awareness) | The readiness record must include a governed information-security program, vendor and incident-risk controls, testing, and documented management oversight. |
| Deposit-insurance representation | [FDIC: Understanding Deposit Insurance](https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance) | Deposit insurance can be represented only after an insured-depository institution exists; the FDIC describes coverage in relation to deposits at an FDIC-insured bank. |

The blueprint will use these sources to separate the legitimate bank-grade pathway from unverified self-approval, ledger, yield, custody, deposit, or insurance language.

## Extracted requirements that shape the route

| Topic | Regulator-described requirement or boundary | Source |
| --- | --- | --- |
| AML governance | The FFIEC BSA/AML Manual describes a risk-profile-based BSA/AML program, including risk assessment, policies and processes, independent testing, and suspicious-activity identification and reporting. | [FFIEC BSA/AML Manual](https://bsaaml.ffiec.gov/manual/Introduction/01) |
| Treasury reporting | FinCEN explains that the BSA authorizes reporting and recordkeeping requirements for financial institutions, including certain cash-transaction and suspicious-activity reporting requirements. | [FinCEN: Bank Secrecy Act](https://www.fincen.gov/resources/statutes-and-regulations/bank-secrecy-act) |
| Deposit-insurance claim boundary | FDIC deposit insurance applies to deposit accounts at FDIC-insured banks; the FDIC says it does not cover cryptocurrency or a non-FDIC-insured institution’s default or bankruptcy. | [FDIC: Understanding Deposit Insurance](https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance) |

The browser-local Sovereign Bank route will therefore use a five-stage readiness sequence: **charter and governance**, **capital and business plan**, **risk/compliance and consumer protection**, **technology and third-party controls**, and **regulator/provider approvals plus launch evidence**. None of these stages is currently marked complete by this source record.
