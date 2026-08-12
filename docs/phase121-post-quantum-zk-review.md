# Phase 121 — Sovereign Integration Engine: ZK and Post-Quantum Review Track

## Purpose

This document translates the submitted Sovereign Integration Engine concept into an implementable, first-party engineering path. It is an **evidence-led build plan**, not a representation that a post-quantum verifier, a zero-knowledge circuit, a contract audit, a testnet deployment, or a Layer-2 deployment has already occurred.

The intended sequence is source → review → test → human-controlled release decision. This fits the portal’s broader approach: first-party work may be designed and prepared inside ScrollVerse, while provider access, key custody, contract deployment, charges, transfers, token issuance, and other irreversible external actions remain separately controlled.

## Architecture Translation

| Submitted layer | Build-track interpretation | Required evidence before a release decision |
|---|---|---|
| Circom lattice circuit and witness generator | A versioned circuit project with constrained public/private inputs, source hashes, reproducible build scripts, and negative test vectors. | Circuit source review, deterministic build record, witness validation, proof-valid and proof-invalid tests. |
| `snarkjs` Groth16 proof formatter | An off-chain developer tool that emits typed calldata fixtures; it is not an authorization layer by itself. | Verified proving key provenance, verification key hash, fixture corpus, on-chain verifier round-trip test. |
| Solidity assembly signature parser | A narrowly scoped candidate that must be equivalent to a reference implementation across valid and malformed signatures. | Differential fuzz tests, malformed calldata tests, replay/nullifier tests, gas report, independent audit scope. |
| Post-quantum anchor | A migration-research track based on a specified algorithm and protocol boundary, rather than a generic “quantum-resistant” label. | Algorithm choice, key lifecycle, interoperability test vectors, independent cryptographic review, operational migration plan. |
| Layer-2 routing | A controlled deployment target selection, not a claim of live routing. | Target-chain configuration, testnet deployment record, RPC/provider verification, fee model, rollback and incident plan. |

## Technical Baseline

NIST’s FIPS 204 specifies ML-DSA for digital signatures and describes the standard as a set of algorithms for generating and verifying signatures that is believed to remain secure against an adversary with a large-scale quantum computer. It is therefore an appropriate **research baseline** when the track reaches concrete signature migration design; it does not itself provide an EVM contract implementation, a key-management policy, or an audit.[1]

Ethereum describes a zero-knowledge proof as a proof of validity that does not reveal the underlying statement. Its explanation highlights the distinction between a prover, verifier, witness, public inputs, completeness, soundness, and zero-knowledge. These are the properties that the future circuit and verifier test plan must demonstrate, rather than assuming from an interface name.[2]

The submitted Node interlock’s use of `fullProve` and Solidity calldata export is structurally consistent with documented `snarkjs` workflows. However, Groth16 requires a circuit-specific trusted setup: the project must preserve the contribution and verification history for the final proving key, and it must not use an uncontributed initial `zkey` as a production artifact.[3]

The submitted `UltraQuantumValidator` is a **candidate draft**, not a verified hybrid cryptographic validator. In its current described form, the lattice input is only checked for non-empty bytes; no lattice-signature verification or Groth16 proof verification is performed. The review track therefore treats the following as distinct work items: reference signature verification, lattice/PQC verification, proof verification, nullifier binding, and authorization policy. Solidity’s own security guidance emphasizes that contract code is publicly exposed, that correct behavior is insufficient if unexpected use remains possible, and that security review must consider input validation, reentrancy, gas-bounded loops, and compiler/platform risk.[4]

## Evidence Matrix

| Work package | Positive evidence | Negative evidence | Human-controlled decision |
|---|---|---|---|
| Circuit semantics | Inputs that satisfy the intended statement generate a valid proof. | Invalid witness, altered public signal, altered proof, and out-of-range values fail. | Approve a circuit hash for testnet only. |
| Setup provenance | Reproducible ceremony and verification-key transcripts are recorded and independently checked. | Mismatched circuit/key, altered transcript, or unverified contribution fails build. | Choose setup method and custodians. |
| EVM verifier | On-chain verifier accepts only valid fixture proofs and correct public inputs. | Invalid proof, wrong verifier key, wrong chain/domain, and malformed calldata revert. | Approve a testnet verifier address. |
| Classical signature layer | Reference and assembly implementations agree across a bounded property-test corpus. | Wrong signer, wrong `v`, malformed length, replay, high-`s` cases, and bad action binding fail. | Approve or reject assembly optimization. |
| PQC migration | ML-DSA algorithm parameters and test vectors are pinned; an off-chain verifier integration is reproducible. | Invalid key, invalid signature, wrong parameter set, and downgraded algorithm path fail. | Select a production migration strategy after independent review. |
| Layer-2 readiness | Target configuration, contract bytecode, test results, gas snapshots, and incident procedure are recorded. | Unsupported chain ID, unexpected bytecode, failed simulation, or gas ceiling breach blocks the release candidate. | Explicitly authorize a testnet or mainnet transaction. |

## Deterministic Build Stages

The first stage is a repository-local proof harness. It should compile the circuit with inspection enabled, emit a constraint report, generate deterministic fixture inputs, calculate a witness, test the witness against the R1CS, generate a proof, and independently verify the proof. The result is a hashed evidence bundle; it does not touch a chain.

The second stage is an EVM verifier harness. It should deploy only to a local simulator or explicitly selected testnet, call the generated verifier using the saved fixture payload, confirm successful verification for known-valid fixtures, and prove rejection for mutated fixtures. The output should include compiler version, optimizer settings, verifier bytecode hash, gas snapshots, and test output.

The third stage is a signature and nullifier harness. The assembly parser, if retained, must be tested against a straightforward reference implementation using generated valid signatures and deliberately malformed forms. The test suite should assert that an action ID, signer, signature, public-key record, nullifier, and chain context cannot be mixed across calls.

The fourth stage is a separate post-quantum migration study. It should identify the exact ML-DSA parameter set, key lifecycle, storage format, interoperability library, threat model, and on-chain/off-chain boundary. No claim of post-quantum protection should appear in public-facing copy until that scope is implemented, reviewed, and evidenced.

## Release Boundary

> **Build evidence may proceed; deployment authority stays explicit.**

The portal can host the research map, source links, review records, and test evidence today. It must not present the submitted draft as an audited security product, a deployed validator, a live Layer-2 router, or a post-quantum-secure payment, custody, token, or exchange mechanism. Any testnet or mainnet transaction remains a distinct action with a clear owner decision, network selection, key custody plan, and release evidence.

## References

[1] [NIST, *FIPS 204: Module-Lattice-Based Digital Signature Standard*](https://csrc.nist.gov/pubs/fips/204/final)

[2] [Ethereum.org, *What are zero-knowledge proofs?*](https://ethereum.org/en/zero-knowledge-proofs/)

[3] [iden3, *snarkjs documentation and ceremony workflow*](https://github.com/iden3/snarkjs)

[4] [Solidity, *Security Considerations*](https://docs.soliditylang.org/en/latest/security-considerations.html)
