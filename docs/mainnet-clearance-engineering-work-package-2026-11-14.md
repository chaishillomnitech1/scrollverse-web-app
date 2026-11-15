# ScrollVerse Polygon Mainnet Clearance — Engineering Work Package

**Review date:** 2026-11-14  
**Release state:** NOT CLEARED — engineering work may proceed; no deployment or financial action is authorized by this record.

## Selected release path

The existing Phase 163 audit selects the Polygon package in this repository:
- LONDCToken
- ZakatDistribution
- MetatronCodex

It separately records Scroll zkEVM as a distinct network path. Do not substitute a Scroll chain address, a wallet address, or another repository's contract for this Polygon release.

## Findings from the current source

1. Polygon Amoy is configured with chain ID 80002, but the old public RPC fallback is retired.
2. Polygon mainnet's public polygon-rpc.com fallback is also retired.
3. The deployment script previously accepted the deployer EOA as the fallback vault and platform wallet.
4. The deployment script previously accepted placeholder NFT metadata.
5. The deployment script previously left ownership with the deployer EOA.
6. The contract set does not currently implement the ERC-2981 royalty path described by some legacy portal material. Do not market this release as royalty-enabled until the selected contract design is reconciled.
7. LONDCToken.transferWithZakat is opt-in; ordinary ERC-20 transfer does not automatically route Zakat.
8. ZakatDistribution has owner-controlled recipient and distribution functions. Its exact governance model must be approved and tested.
9. The existing Phase 163 audit reports a successful local compile of 30 Solidity files on 2026-08-13, not a fresh Amoy deployment, external audit, or mainnet verification.

## Changes in this work branch

- Remove silent public Polygon RPC defaults. AMOY_RPC_URL and POLYGON_RPC_URL must be explicitly configured; the network entries are omitted if the matching provider URL is absent.
- Add a pure deployment preflight validator for network/chain matching, non-zero addresses, separate deployer and multisig ownership, non-placeholder metadata, explorer verification key, and an explicit mainnet environment gate.
- Require deployed contract code at the nominated multisig address before deployment proceeds.
- Set up the three contracts under a temporary deployer owner, configure the final Zakat vault, then transfer ownership to the designated multisig before the deployment script completes.
- Record the final multisig owner and setup transaction hashes in the local deployment record.
- Add unit tests for the deployment preflight. No deployment command is run by this work package.

## Required Amoy rehearsal

1. Configure a dedicated Amoy RPC provider in AMOY_RPC_URL; do not use the retired Polygon-operated public RPC endpoint.
2. Configure a dedicated Amoy deployer key in the secure runtime only.
3. Deploy and verify the chosen Safe/multisig on Amoy; confirm its threshold and independent signers.
4. Supply the Amoy multisig address, platform wallet, real metadata URI, and Polygonscan API key through secure environment settings.
5. Run unit tests, compile, deploy to Amoy, verify all three sources, and exercise every public/admin function.
6. Verify owner roles on-chain after the ownership transfer and retain deployment JSON, transaction hashes, compiler settings, source verification URLs, and test reports.
7. Rehearse pause/recovery, Zakat distribution, guardian stake/unstake, NFT mint/sponsored mint, metadata changes, and failed-call behavior.

## Required mainnet gates

- Independent security audit of the exact commit and compiled artifacts.
- Remediation of every critical/high finding and retest.
- Final contract-design decision for Zakat semantics, supply, fee constants, token utility, and NFT royalty expectations.
- Verified source and constructor arguments for the exact Amoy-tested artifact.
- Mainnet RPC provider confirmed healthy and independent from the retired public endpoints.
- Multisig deployed, signers independently controlled, threshold and recovery procedure documented.
- Stripe security incident and payout status reconciled against the correct live account.
- Public disclosures, rights/licensing, support, refunds, and any required operating/compliance review completed.
- Explicit owner approval in the active release conversation immediately before any mainnet transaction.

## Specialist workstream routing

The AI Legion manifest defines 25 specialist roles. This routing matrix keeps each identity distinct and gives every role a concrete clearance lane. It is a work assignment map; it does not claim that 25 independent hosted agent processes have been launched.

| Agent | Specialist lane | Mainnet-clearance contribution |
|---|---|---|
| 01 Mission Discovery | Asset and blocker inventory | Identify unfinished release artifacts and missing evidence |
| 02 Strategic Planning | Dependency graph | Sequence work by critical path |
| 03 Execution Coordination | Isolated execution | Coordinate branch-scoped tasks and review gates |
| 04 Progress Intelligence | Status ledger | Track evidence-backed state changes |
| 05 Conversation Recovery | Origin history | Preserve the original handoff and source context |
| 06 Digital Archive | Artifact archive | Preserve screenshots, manifests, builds, and reports |
| 07 Provenance | Integrity | Hash and attribute release artifacts |
| 08 Knowledge Index | Cross-reference | Connect contract, portal, and provider records |
| 09 Ecosystem Integration | Network map | Keep Polygon PoS, Scroll, Base, and Ethereum paths distinct |
| 10 GitHub Intelligence | Repository and CI | Inspect commits, PRs, workflows, and dependency state |
| 11 Platform Connectivity | RPC and APIs | Validate provider configuration and service connectivity |
| 12 Universal Discovery | Explorer evidence | Resolve authoritative chain and explorer records |
| 13 Software Quality | Code and tests | Review Solidity, scripts, and dependency changes |
| 14 Website Quality | Public experience | Reconcile deploy status and customer-facing claims |
| 15 Evidence Verification | Claims and proof | Separate owner reports, source observations, and independent verification |
| 16 Integration Test | End-to-end rehearsal | Test Amoy contracts and portal integration |
| 17 Creator Experience | Product interface | Ensure wallet, staking, and NFT states are accurately presented |
| 18 Education | User disclosures | Prepare plain-language network and risk explanations |
| 19 Product Development | Contract product design | Resolve token, Zakat, staking, and royalty specifications |
| 20 Distribution | Release package | Prepare a versioned, reviewable launch bundle |
| 21 Cybersecurity | Incident and threat review | Review Stripe exposure, secret handling, RPC, and permissions |
| 22 Intellectual Property | Rights and licensing | Review metadata, art, marks, and third-party rights |
| 23 Privacy and Governance | Authority controls | Verify multisig, least privilege, and approval records |
| 24 Infrastructure Resilience | Provider and recovery | Verify RPC redundancy, backups, monitoring, and recovery |
| 25 Omni Intelligence | Synthesis | Reconcile findings and identify the next verified action |

## Evidence boundaries

- User-reported staking totals and reward growth remain owner-reported until matched to source account/job records and, where applicable, chain transactions.
- Manus email screenshots in the archive establish the displayed notification text, not the underlying account ledger or on-chain transaction.
- PR #163 in Infinite-Nexus-ScrollVerse is a merged Prettier dependency update. Its Guardian comment reports 9/100 and 0/50 seal scores; its reward comment explicitly labels 2,000 tokens as simulated test tokens. It is not a contract audit or mainnet-readiness assessment.
- The Stripe connected-account reads must be matched to the exact merchant account named in the payout dispute before any amount is treated as reconciled.
- No mainnet deployment, key rotation, payout change, wallet signature, token transfer, or merge is performed by this work package.

## Primary external references

- Polygon Amoy network announcement: https://polygon.technology/blog/polygon-pos-and-polygon-zkevm-new-testnets-for-polygon-protocols
- Polygon's July 2026 public RPC retirement notice: https://forum.polygon.technology/t/deprecation-of-polygons-public-rpc-endpoints-mainnet-amoy/22014
- Stripe compromised-key response: https://support.stripe.com/questions/protecting-against-compromised-api-keys
