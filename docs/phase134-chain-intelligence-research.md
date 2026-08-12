# Phase 134 — Chain Intelligence Tracker Research Record

> **Purpose.** This record defines a source-linked Chain Intelligence Tracker for ScrollVerse. It is an educational and evidence-navigation layer. It does **not** create custody, exchange, trading, valuation, transfer, investment, contract deployment, or asset-ownership verification functionality.

## 1. Verified First-Party Starting Surface

| Surface | Existing role | What it does not prove or activate |
|---|---|---|
| `/wallet` | Multi-network wallet gateway with MetaMask connection and network-selection UI. | It does not verify balances, holdings, contract state, or ownership across connected wallets. |
| `/token` | $LONDC-facing store and book catalog with provider-controlled checkout paths. | It does not prove a live token contract, market value, or transferable token balance. |
| `/crypto` | Public crypto discovery route. | It does not establish exchange, custody, investment, or transfer functionality. |
| `/nft` | NFT tier and collection presentation with backend product sessions. | It does not establish direct chain signing, decentralized mint execution, or verified ownership. |
| `/nexus` | Genesis vault narrative, artifact references, and a QR experience. | It does not establish live provider access, a dynamic chain query, or a deployed contract. |
| `/empire-map` | First-party digital-asset operating map. | It is a navigator and does not activate financial functions. |

## 2. Network and Explorer Context

Scroll’s official portal identifies a Layer 2 Block Explorer at Scrollscan and separately identifies Ethereum’s Layer 1 explorer. Its developer documentation lists Scroll Mainnet with Chain ID `534352`, an RPC URL, and Scrollscan as the block-explorer URL.[1] [2]

| Source | Declared use in the Chain Intelligence Tracker | Boundary |
|---|---|---|
| [Scroll Portal](https://scroll.io/portal) | Network orientation plus direct L1/L2 explorer handoffs. | External source controlled by Scroll; connection does not establish a user’s wallet or transaction history. |
| [Scroll Developer Documentation](https://docs.scroll.io/en/developers/) | Network context, Chain ID, developer resources, and source links. | Network configuration is informational and must not be presented as transaction authorization. |
| [Scrollscan](https://scrollscan.com/) | External L2 address, block, contract, token, and transaction lookup handoff. | Explorer data remains third-party reporting and may require user-supplied public identifiers. |
| [Scrollscan API documentation](https://scrollscan.com/api-docs) | Future evidence-fetching feasibility reference. | No API integration, key, continuous indexing, or live response is represented by this record. |

## 3. Tracker Design Principles

The public tracker will present four separate records: **first-party portal claims**, **owner-supplied public chain references**, **external explorer observations**, and **evidence-required activation conditions**. A displayed reference must include a source URL, access date where relevant, network context, and an evidence status such as `SOURCE-LINKED`, `OWNER-SUPPLIED`, `EXTERNAL-EXPLORER`, or `NOT YET VERIFIED`.

> A public address, explorer URL, token identifier, transaction hash, IPFS content identifier, or QR code is a reference record. It is not, by itself, a legal ownership determination, proof of commercial rights, asset valuation, wallet-custody arrangement, or authorization to move funds.

## 4. Integration Decision

The Chain Intelligence Tracker should use non-custodial **external explorer handoffs first**, then add optional live data only after the data source, public identifier, privacy model, refresh cadence, and evidence treatment are individually reviewed. It will include a direct `Scrollscan` handoff, link existing ScrollVerse routes for wallet/token/NFT/Nexus education, and document the difference between a source claim, explorer observation, and release-ready evidence.

## References

[1] [Scroll Portal — Mainnet, L1/L2 explorer, and developer links](https://scroll.io/portal)

[2] [Scroll Developer FAQ — mainnet network configuration and explorer URL](https://docs.scroll.io/en/developers/)
