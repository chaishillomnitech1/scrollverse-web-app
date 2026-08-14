# Phase 184 — Crypto Systems Atlas Source Register

The Crypto Systems Atlas is a first-party educational map of **representative** cryptocurrency system layers. It does not claim to reproduce every company, coin, protocol, application, custody model, market, or country-specific regulatory regime. Each source defines a distinct system function and a corresponding evidence gate before ScrollVerse can safely claim to operate that function.

| System layer | Representative source | What the source supports | Minimum evidence before an operating claim |
|---|---|---|---|
| Core protocol | [Ethereum developer documentation][1] | Public EVM and network-development concepts. | Architecture, selected network, reviewable code, tests, security review, and observable operations. |
| Scroll integration | [Scroll documentation][2] | zkEVM, proof, settlement, and messaging concepts. | Complete address/transaction, artifact, constructor context, selected network, and explorer evidence. |
| Fungible tokens | [EIP-20][3] | Standard token interface. | Verified code, compliance tests, supply/privilege review, and disclosures. |
| NFTs | [EIP-721][4] | Standard non-fungible ownership/transfer interface. | Contract record, rights/provenance, metadata review, tests, and authorization. |
| Royalty metadata | [EIP-2981][5] | Voluntary royalty-information interface. | Contract-specific interface evidence, recipient configuration, terms, and marketplace review. |
| Contract libraries | [OpenZeppelin Contracts][6] | Reusable contract and access-control patterns. | Exact dependency/version, tests, privilege review, audit scope, and verified deployed code. |
| Wallet safety | [MetaMask safety guidance][7] | User safety and phishing-awareness guidance. | Specific approved integration, consent flow, signing disclosure, and security review. |
| Wallet connectivity | [WalletConnect documentation][8] | Connection/session concepts. | Configured project, tested consent flow, namespace/domain checks, and errors handled. |
| Smart accounts | [Safe documentation][9] | Multisig and account-abstraction concepts. | Exact deployed account, signer threshold, modules, recovery policy, and authorization. |
| Explorer evidence | [Etherscan][10] | Public transaction and verification discovery. | Complete link, network, address or transaction, date, and sufficient context. |
| Content integrity | [IPFS documentation][11] | Content addressing and peer-to-peer retrieval concepts. | Content identifier, integrity record, persistence/pinning evidence, access policy, and provenance. |
| Data indexing | [The Graph documentation][12] | Subgraph/indexing/query concepts. | Deployment identifier, schema, chain configuration, freshness policy, query examples, and uptime evidence. |

## Core limits

An interface standard does not guarantee value, liquidity, exchange access, royalty collection, rights ownership, security, regulatory status, or commercial success. A wallet integration does not establish custody or authorization. A content identifier does not establish permanence or confidentiality. An explorer entry does not establish title, rights, intent, or partnership. All live actions remain external, separately reviewable, and owner-controlled.

## Implementation verification

On August 14, 2026, the local `/crypto-systems-atlas` route rendered the twelve source cards, browser-local category controls, design/verify/review/release sequence, royalty and release-gate explanation, and no-transaction operating boundary. The route makes no live protocol, wallet, explorer, provider, or API request. TypeScript compiled cleanly and the full Vitest suite passed with 18 files and 121 tests.

## References

[1]: https://ethereum.org/en/developers/docs/ "Ethereum developer documentation"
[2]: https://docs.scroll.io/en/home/ "Scroll documentation"
[3]: https://eips.ethereum.org/EIPS/eip-20 "EIP-20"
[4]: https://eips.ethereum.org/EIPS/eip-721 "EIP-721"
[5]: https://eips.ethereum.org/EIPS/eip-2981 "EIP-2981"
[6]: https://docs.openzeppelin.com/contracts/5.x/ "OpenZeppelin Contracts"
[7]: https://support.metamask.io/stay-safe/ "MetaMask safety guidance"
[8]: https://docs.walletconnect.network/ "WalletConnect documentation"
[9]: https://docs.safe.global/ "Safe documentation"
[10]: https://etherscan.io/ "Etherscan"
[11]: https://docs.ipfs.tech/ "IPFS documentation"
[12]: https://thegraph.com/docs/ "The Graph documentation"
