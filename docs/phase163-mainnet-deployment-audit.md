# Phase 163 — Controlled Polygon Mainnet Deployment Audit

**Audit date:** August 13, 2026

This audit distinguishes the current deployable code from portal copy, legacy guides, and user-provided status text. User-provided material is retained as a reference record; it is not treated as proof of a live mainnet deployment until confirmed by on-chain transaction and explorer evidence.

| Area | Current deployable source | Audit result | Mainnet gate |
|---|---|---|---|
| Deployer configuration | `blockchain/config/hardhat.config.cjs` | Uses `DEPLOYER_PRIVATE_KEY`, `POLYGON_RPC_URL`, and chain ID `137`. The default private-key fallback is unsafe for any release and must never be used. | Secure secret binding and an address check are required. |
| Token | `blockchain/contracts/LONDCToken.sol` | Mints 144,000,000 LONDC to the initial owner. Its Zakat path is the opt-in `transferWithZakat` method at 250 basis points; ordinary ERC-20 transfers do not invoke this method. | Confirm that this is the intended live token design before broadcast. |
| Distribution vault | `blockchain/contracts/ZakatDistribution.sol` | Owner-managed recipient registry with equal or custom token distributions. | Confirm the recipient model and owner address before broadcast. |
| NFT leg deployed by script | `blockchain/contracts/MetatronCodex.sol` | ERC-721 URI contract with a 70-token cap and a platform-wallet mint payment path. It does **not** implement ERC-2981 royalties. | Do not describe or release it as a royalty-enabled ScrollSoul contract without an approved contract change and fresh validation. |
| Deployment script | `blockchain/scripts/deploy.js` | Deploys `LONDCToken`, `ZakatDistribution`, and `MetatronCodex`, updates the token vault, then writes local deployment JSON. | Must be compiled and run only after the contract set, constructor inputs, and metadata URI are confirmed. |
| Portal/legacy material | `DEPLOYMENT.md`, `client/src/pages/Deploy.tsx`, legacy status text | Describes a different `ScrollSoulNFT` / ERC-2981-oriented path and different Zakat mechanics. | Resolve or label this drift before presenting mainnet addresses in the portal. |

## Required secure configuration

The current script expects the following values through secure project configuration, never through source files or chat:

| Secret | Required for | Validation before broadcast |
|---|---|---|
| `DEPLOYER_PRIVATE_KEY` | Signing the deployment transaction | Derive the deployer address and show only the address; confirm dedicated-wallet funding. |
| `POLYGON_RPC_URL` | Polygon mainnet RPC connection | Confirm chain ID `137` and reachable latest block. |
| `POLYGONSCAN_API_KEY` | Source verification | Confirm a verification request can be prepared after the deployment. |
| `ZAKAT_VAULT_ADDRESS` | LONDC constructor | Validate address syntax and display its checksum form. |
| `PLATFORM_WALLET_ADDRESS` | LONDC and MetatronCodex constructors | Validate address syntax and display its checksum form. |
| `CODEX_BASE_URI` | MetatronCodex constructor | Confirm a non-placeholder content URI and public metadata availability. |

## Broadcast boundary

Mainnet deployment is an irreversible on-chain action that spends the deployer wallet’s MATIC. Before running the deployment command, the release record must name the exact contract set, chain ID, deployer address, Zakat vault address, platform wallet address, metadata URI, and expected fee commitment. The final broadcast remains subject to a fresh explicit confirmation in this conversation.

## User-referenced public-source findings

The owner-supplied GitHub profile identifies **Scroll Verse LLC**, links to `scrollverse.co`, and shows public repositories using Solidity, TypeScript, and JavaScript. The following references were reviewed on August 13, 2026 as public repository context:

| Source | Confirmed public evidence | Deployment relevance | Limitation |
|---|---|---|---|
| `chaishillomnitech1/vibranium-sovereignty-protocol` | Public repository with a Solidity contract directory, scripts, a Hardhat configuration, tests, and metadata directory | Demonstrates a separate public EVM development track | It is not the script or contract set currently selected by `scrollverse-portal/blockchain/scripts/deploy.js`. |
| `chaishillomnitech1/scrollsoul-music-sync` | Public TypeScript repository with deployment, security, API, and integration documentation | Supplies patterns for documentation and source-controlled service configuration | Public README endpoint lists and performance/status statements are not proof that provider credentials, accounts, payments, royalty distributions, or integrations are active in this project. |
| `chaishillomnitech1/omnitech1-portal` | Public React/TypeScript portal source describing Ethereum, Scroll, LayerZero, Polygon, and Arbitrum interface goals | Confirms multi-network portal context and a Scroll-oriented interface direction | It does not supply a transaction hash, contract address, selected contract artifact, or evidence of a completed contract deployment for the current project. |
| `https://scrollscan.com/` | Public explorer home identifies itself as an explorer for the **Scroll** network | Owner-designated direct verification route for a Scroll release | The audited local script currently selects **Polygon** (`chainId: 137`); ScrollScan cannot prove a Polygon broadcast. |

The two supplied status-text attachments are retained as owner-provided provenance references. They describe test results and previous project operations but do not contain the cryptographic transaction, contract-address, chain-ID, artifact-hash, or explorer evidence required to mark a contract deployment as confirmed.

## Direct public Knicks NFT route

The public route `https://scrollverse.co/knicks-nft` was retrieved on August 13, 2026. It presents a **Knicks Prophecy** NFT interface, describes a `KnicksProphecySet.sol` design, and names Scroll/Scroll zkEVM-oriented mechanics. The source itself simultaneously labels the deployment section **“Scroll Sepolia (testnet)”** and **“Status Testnet Ready.”** It does not expose a deployed contract address, token address, creation transaction hash, bytecode/artifact hash, or explorer link for a collection record.

| Direct public evidence | Current interpretation | Next verification requirement |
|---|---|---|
| Public first-party route with collection/interface copy | Confirms a visible ScrollVerse Knicks NFT presentation exists | Capture its designated Scroll contract address or creation transaction hash. |
| Named `KnicksProphecySet.sol` and Scroll-oriented architecture language | Identifies a separate intended contract family from the audited Polygon script | Locate the Solidity source and compiled artifact before treating it as the selected deployable release. |
| “Scroll Sepolia (testnet)” and “Status Testnet Ready” labels | Indicates the page itself represents a testnet-ready state, not a confirmed mainnet record | Inspect a linked ScrollScan address or transaction after an identifier is supplied. |

This public route is treated as direct first-party portal evidence. It does not establish any affiliation, licensing, or permission relating to third-party team, league, player, or trademark rights; those matters are outside the displayed technical record.

## Supplied Scroll zkEVM address check

The two complete addresses from the supplied Scroll zkEVM bundle were queried directly on `scrollscan.com` on August 13, 2026. The page results below describe the explorer state at that query time; they do not establish intent, ownership, or any information that the address page does not expose.

| Bundle role | Address | ScrollScan result | Evidence boundary |
|---|---|---|---|
| Zakat sovereign vault | `0xD8D3Bcb4363E12699a337BB3609BcA05e38bDf52` | Explorer labels it an EOA, with 0 transactions, 0 token transfers, 0 tokens, and 0 ETH balance. | The page does not show deployed contract bytecode, an active vault transaction history, or a 7.77% mechanism. |
| Treasury lock | `0xFa38bAE836C004C1385E4319a1b90b83Fb81405E` | Explorer shows 0 transactions, 0 token transfers, 0 tokens, 0 internal transactions, and 0 ETH balance. | The page does not expose a deployed contract or locked treasury record. |
| Primary `MeinSigilMint.sol` | `0x4E1nC0rE...MEIN` in the supplied bundle | Abbreviated string only; it is not a full valid EVM address and cannot be queried. | An exact 42-character hexadecimal contract address or creation transaction hash is still required for ScrollScan verification. |

The current locally audited release package remains a separate **Polygon** configuration (`chainId: 137`). The supplied bundle identifies **Scroll zkEVM** (`chainId: 534352`). They are now preserved as separate network records and must not be substituted for each other.
