# Phase 800 — Sovereign Commerce & Settlement Fabric

**Record date:** 2026-11-14  
**Repository:** `scrollverse-web-app`  
**Purpose:** Build a provider-neutral, merchant-directed commerce and settlement control plane that can serve the ScrollVerse portfolio and independently operated repository businesses.

## Operating model

GitHub is the source-of-truth home base for each repository's code, release history, business-unit record, service ownership, and operating evidence. Each repository can be registered as an independent operating unit with its own product catalog, brand identity, customer terms, revenue attribution, and provider adapters. A repository is not automatically a separate legal entity: incorporation, tax registration, banking, ownership, and contracting must be evidenced per entity before it is represented as such.

ScrollVerse owns the customer experience, product/order model, routing policy, provider-adapter contracts, internal accounting records, reconciliation workflow, and operational visibility. Payment networks, banks, acquirers, and wallet providers remain replaceable external rails.

## Payment and value routes

| Route | Customer choice | Settlement design | Current release condition |
|---|---|---|---|
| Card / local payment methods | Card, eligible wallet-based card method, or local method shown at checkout | A contracted acquirer or processor settles to the merchant's approved account | Merchant underwriting, live account status, live credentials, pricing, refund/dispute rules, webhook verification, and production test |
| Stablecoin payment acceptance | Customer chooses a USDC payment route | Coinbase Developer Platform Payment Acceptance provides a payment API with authorization/capture, instant settlement, refunds, and webhook resources | CDP credentials, operator configuration, merchant onboarding, supported jurisdictions/assets, webhook verification, reconciliation, and production approval |
| Bank transfer / ACH | Customer-authorized bank payment | Approved ODFI / bank / ACH processor sends settlement to the named merchant account | Executed bank-partner agreement, merchant underwriting, ACH authorization, return handling, reconciliation, and applicable legal review |
| Self-custody wallet | Customer selects a compatible wallet and asset | Customer signs from their own wallet; payment goes directly to the merchant's verified address or audited checkout contract | Mainnet contract/address verification, exact asset and amount, network fee disclosure, customer receipt, refund policy, security review, and explicit customer signature |
| Wallet connection | MetaMask, Coinbase Wallet, Robinhood Wallet, or another compatible wallet | Connection only; does not itself charge, trade, custody, or transfer | WalletConnect / injected-provider SDK, chain allowlist, permission minimization, disconnect controls, and privacy review |
| Storefront | Customer purchases a specific creator-owned SKU | Store or merchant-of-record settlement | Published products, rights, price/currency, tax, shipping/delivery, refunds, inventory, support, and checkout verification |
| Exchange / conversion | Customer selects a supported asset pair and quote | Licensed venue or contracted regulated provider executes; ScrollVerse can route and present the quote | Jurisdiction, product classification, licensing/partner authority, market-data source, quote expiry, spread/fee disclosure, custody model, security, surveillance, and customer terms |

## The ScrollVerse-owned layer

1. **Business registry:** maps repository, operator, legal entity (where evidenced), brand/sigil, catalog, domain, support owner, revenue share, and reporting scope.
2. **Order service:** creates an immutable order ID, item/version, quantity, price, currency, tax, delivery terms, and customer acceptance record.
3. **Quote and route selector:** displays only routes supported for that product, amount, customer location, currency, and provider health. No silent currency or asset substitution.
4. **Provider adapters:** normalized interfaces for card acquirers, bank/ACH partners, merchant-of-record services, wallet connections, and on-chain settlement.
5. **Webhook intake:** verifies provider signatures, deduplicates event IDs, rejects stale/replayed events, and records the provider's original event reference.
6. **Double-entry ledger:** records receivable, clearing, fees, settlement, refund, chargeback, and merchant payable as separate entries. A ledger entry is not proof that a bank transfer settled.
7. **Reconciliation:** matches order, provider event, bank settlement, wallet transaction, and merchant payout. Unmatched items stay visibly pending.
8. **Customer controls:** itemized fees, currency, provider, refund/return terms, delivery, privacy, support, and clear cancel/confirm choice.
9. **Operations and recovery:** provider health, retry with idempotency, circuit breakers, manual review, audit trail, dispute workflow, and an exportable statement.

## Independence without false claims

The goal is to own the orchestration and customer relationship rather than be dependent on one processor. This is not accomplished by bypassing a provider hold or routing funds through an unapproved account. Card-network acquiring and ACH settlement still require eligible bank/processor relationships. A ScrollVerse-owned payment orchestration layer can support multiple independent providers and merchant-direct settlement while keeping each provider replaceable.

A merchant payment-processing exception is fact-specific. FinCEN guidance describes conditions around facilitating a purchase of goods/services, using qualifying clearance and settlement systems, and having the required seller/creditor agreement. New Jersey separately describes activities requiring a money-transmitter license, including receipt or transmission of money for a fee. Before ScrollVerse accepts or transmits customer funds for others, pools balances, offers exchange/conversion, or controls custody, obtain a written activity-and-jurisdiction analysis and use the required licenses or a properly authorized partner.

## Wallet and platform compatibility

- **MetaMask:** use the current MetaMask Connect SDK or standard EIP-6963 / EIP-1193 provider discovery. Ask for account access only after the customer chooses Connect.
- **Coinbase Wallet:** support injected provider discovery and WalletConnect where supported. Do not assume a wallet connection means Coinbase exchange access or fiat on-ramp approval.
- **Coinbase Payment Acceptance:** a separate stablecoin commerce adapter; the official Payment Acceptance API describes USDC payment authorization/capture, instant settlement, refunds, and webhook resources. This is a payment-provider route, not the same capability as connecting Coinbase Wallet.
- **Robinhood Wallet:** expose its WalletConnect route. Robinhood's own support describes dapp connection through its Web3 browser or WalletConnect; the user must approve the connection and any subsequent permission separately.
- **Robinhood Connect:** treat as a customer-directed crypto on-ramp/off-ramp option where supported, not as a ScrollVerse merchant acquiring account. It has its own account, identity, asset, network, and jurisdiction eligibility requirements.
- **WalletConnect:** treat as a connection transport, not a payment processor, custody provider, exchange, or proof of payment.
- **Other wallets:** use capability-based discovery rather than a hard-coded brand whitelist. Display chain and asset compatibility before any signature.

## Fail-closed technical contract

The new `paymentRails.getOptions` procedure is read-only. It reports configuration presence without exposing secrets and always returns `executionEnabled: false`. It does not create payment intents, checkout sessions, signatures, transfers, swaps, refunds, or payouts. A key's presence is not provider approval; a contract address is not independent bytecode verification; a wallet connection is not a transaction; a database ledger is not bank settlement.

Required next implementation slices:
- provider-neutral order and payment-intent schema with idempotency keys;
- card-acquirer adapter interface and webhook verifier;
- ACH partner adapter interface and return/reversal state machine;
- EIP-6963 wallet discovery plus WalletConnect SDK adapter;
- mainnet contract/address registry with chain-specific verification;
- double-entry ledger and provider/bank/on-chain reconciliation;
- merchant/entity registry for the repository portfolio;
- customer-facing fee, quote, refund, privacy, and support disclosures.

## Existing source preserved

This phase extends rather than replaces the existing Exchange, CommerceNotice, Stripe router/webhook, wallet helpers, creator release workflows, and prior Phase 121 / 243 / 371 / 386 / 491 / 583 / 782 / 799 records. Existing provider settings, payout destinations, account credentials, and customer records are not changed by this phase.

## External reference points

- FinCEN, merchant payment processor ruling: https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/definition-money-transmitter-merchant-payment/
- FinCEN, virtual currency payment system ruling: https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/request-administrative-ruling-application
- New Jersey DOBI, money transmitter licensing: https://www.nj.gov/dobi/banklicensing/formontrans.html
- MetaMask Connect: https://docs.metamask.io/metamask-connect/
- Coinbase Payment Acceptance API: https://docs.cdp.coinbase.com/api-reference/payment-acceptance/overview
- Coinbase Wallet SDK: https://docs.cdp.coinbase.com/wallet-sdk/docs
- Robinhood Wallet dapp connections: https://robinhood.com/us/en/support/articles/connect-to-dapps/
- Robinhood Connect: https://robinhood.com/us/en/support/articles/robinhood-connect/
