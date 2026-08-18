# Phase 426 — Trading Readiness Foundation

**Reference date:** 2026-08-18 (EDT)  
**Operating state:** Design and simulation readiness only. No exchange, broker, wallet, account, order, transfer, strategy deployment, or live trading connection was created.

## Purpose

This foundation turns the request for crypto, day-trading, and trading automation into an owner-controlled system design. The first implementation is a **paper-trading and risk-control layer**: it can record rules and simulate their outcomes without holding assets or sending an order. A live connection comes only after its exact provider, asset universe, funding source, strategy limits, stop conditions, and consequence statement are agreed and explicitly confirmed.

## Required readiness record

| Control area | Required record before live trading | Current state |
| --- | --- | --- |
| Provider | Named exchange or broker, jurisdictional eligibility, account type, API permission scope, and security review | Not supplied |
| Custody | Wallet or account ownership model, withdrawal controls, key separation, recovery owner, and emergency lock process | Not supplied |
| Market scope | Named asset classes, symbols, venues, trading hours, and whether margin, derivatives, or spot are permitted | Not supplied |
| Strategy | Versioned entry, exit, sizing, signal inputs, cancellation rule, and test evidence | Not supplied |
| Risk limits | Per-order cap, daily loss limit, gross exposure cap, leverage rule, drawdown stop, and circuit-breaker behavior | Not supplied |
| Funding | Exact funding amount, funding source, and a statement that funds are not essential assets | Not supplied |
| Records | Immutable order intent, simulated result, approval, fill, exception, and post-trade review log | Design pending |
| Tax and compliance | Jurisdiction, record-retention workflow, and professional review path | Not supplied |

## Risk-control baseline

The system will default to **spot-only paper trading** until a named provider and strategy are approved. It will refuse to simulate a live order without a maximum loss, a position-size limit, a stop condition, a cancellation condition, and a source timestamp for the market data used.

The CFTC notes that virtual-currency cash markets can be volatile, vulnerable to hacking, phishing, manipulation, and platform-protection gaps; leverage can amplify both gains and losses. The agency advises investors not to use strategies they do not understand and to use only money they can afford to lose.[1] FINRA’s current frequent intraday trading guidance similarly highlights the risk of losing some or all of an investment, potential losses exceeding deposited funds on margin, settlement restrictions in cash accounts, costs, and tax consequences.[2]

> **Design rule:** no “guaranteed,” “zero-risk,” or outcome-based trading claim can be represented in a strategy, product page, dashboard, or automation rule. The strategy record must state how it can lose before it is allowed to simulate or execute.

## Live-execution confirmation register

Before any live action, the launch register must state a single exact instruction in this form:

| Field | Example format |
| --- | --- |
| Provider and account | `Exchange or broker name · account type · API scope` |
| Market and symbol | `Spot BTC/USD on named venue` |
| Side and order | `Buy · limit · exact price or market instruction` |
| Maximum notional | `Maximum USD amount` |
| Position and daily loss limits | `Exact numerical caps` |
| Stop and cancel conditions | `Exact trigger condition and action` |
| Funds and consequence | `Funding source; maximum amount that can be lost` |
| Approval | Owner’s explicit confirmation in the active conversation |

## References

[1] [CFTC, *Customer Advisory: Understand the Risks of Virtual Currency Trading*](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html)  
[2] [FINRA, *Frequent Intraday Trading: Understanding the Basics*](https://www.finra.org/investors/insights/frequent-intraday-trading)  
[3] [SEC and CFTC, *Investor Alert: Watch Out for Fraudulent Digital Asset and “Crypto” Trading Websites*](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/watch_out_for_digital_fraud.html)
