# Portable Identity and Saves

## Scope

This track covers portable save data, local-first persistence, export/import, identity continuity, and privacy-preserving synchronization for a console-less, low-overhead Omniland product. These notes describe technical foundations and recommendations only; they do **not** claim that ScrollVerse external systems are activated.

## Findings

### 1. Make the browser a local-first system of record

**Fact.** IndexedDB is a transactional, asynchronous, same-origin database for substantial structured data, including files and blobs. It supports indexed lookup and object stores, making it a better primary save store than `localStorage` for structured game state.[1]

**Fact.** Browser storage is normally best-effort. An origin can request persistent storage with `navigator.storage.persist()`, but approval is browser-dependent: Firefox may show a permission UI, while Safari and Chromium-based browsers may decide from site engagement and other signals.[2]

**Recommendation.** Store canonical saves in IndexedDB, keep a compact manifest and schema version, and request persistent storage after a clear user action. Never treat browser persistence as the only backup; the product should always expose export/import.

### 2. Use a versioned, self-describing save package for portability

**Fact.** IndexedDB is scoped by origin, so data does not automatically follow a user to another domain, browser profile, or device.[1] The File System API gives web applications user-mediated file access through file pickers; selected files can be read, written, and saved, subject to HTTPS and browser support.[3]

**Recommendation.** Define a portable package such as `omniland-save-v1` containing: schema version, app/world identifier, stable player profile identifier, save slot metadata, monotonic revision, timestamps, content hash, and the actual state payload. Export as a downloadable JSON or compressed JSON package, optionally encrypted. Import should validate schema, size, checksum, compatibility, and conflicts before replacing or merging local state. Preserve the original package as a recovery copy.

### 3. Separate continuity identity from authentication identity

**Fact.** WebAuthn discoverable credentials are public-key credentials that an authenticator or client platform can discover without the relying party first supplying a credential ID. Credentials are scoped to a relying-party identifier; the private key remains with the authenticator, while the service stores the public key used to verify assertions.[4]

**Implication.** A passkey can provide low-friction account continuity across supported authenticators, but it is not itself a portable save file and should not be the only recovery path. A user can lose access to an authenticator, use a different browser profile, or need an offline/local-only mode.

**Recommendation.** Give every local profile an opaque, random continuity ID unrelated to email, display name, or analytics identifiers. Offer optional passkey sign-in for authenticated sync, while keeping guest/local play and encrypted export/import fully usable without an account. Provide a recovery phrase or user-held recovery key only if the product can explain the operational consequences safely.

### 4. Encrypt sync payloads before they leave the device

**Fact.** Web Cryptography provides secure-context APIs for key generation, encryption/decryption, signing/verification, derivation, import/export, and key wrapping.[5] The API supplies cryptographic primitives; it does not design the product’s account recovery, synchronization, key lifecycle, or metadata policy.

**Recommendation.** Use an end-to-end encrypted envelope for remote synchronization: the server stores opaque ciphertext plus minimal routing metadata, while plaintext save state and encryption keys remain client-side. Derive per-purpose keys with a reviewed construction such as HKDF, bind the derived key to the product, world, profile, and schema via context information, and use authenticated encryption with unique nonces. Do not invent cryptography or imply that Web Crypto alone makes a sync service private.

### 5. Keep synchronization conflict-aware and privacy-minimizing

**Fact.** Browser APIs do not provide a ready-made save synchronization protocol. WebAuthn authenticates a relying-party-scoped public-key credential, while Web Crypto exposes primitives; the application still has to define revisions, conflict handling, deletion, and recovery.[4][5]

**Recommendation.** Start with a low-overhead last-writer-safe model: each save is an immutable revision with parent revision, device/profile ID, logical clock, and content hash. Upload only encrypted revisions; download and decrypt locally. If two devices diverge, present “keep local,” “keep remote,” and a conservative field-level merge only for explicitly mergeable fields. Never silently overwrite progress. Avoid collecting raw save contents, behavioral telemetry, or stable cross-site identifiers unless necessary.

## Suggested minimal data model

```text
Profile
  continuity_id: random opaque identifier
  display_name: user-chosen, optional
  auth_links: optional passkey public-key references

SaveRevision
  save_id, profile_id, world_id, schema_version
  parent_revision, device_id, logical_clock
  created_at, content_hash
  payload: local plaintext; encrypted envelope for sync/export

SyncEnvelope
  envelope_version, algorithm_suite, key_context
  nonce, ciphertext, authentication_tag
  revision metadata required for routing/conflict checks
```

The server, if introduced, should be able to route and retain encrypted envelopes without being able to read the save payload. Keep `profile_id`, world identifiers, revision metadata, and timestamps as a deliberately small metadata surface because encryption does not hide metadata by itself.

## Practical recommendations for a console-less, low-overhead product

1. Ship offline-first guest play with IndexedDB as the canonical local store; add a migration harness for every save schema version.
2. Add one-tap **Export save** and **Import save** using a versioned, checksummed package. Make export available before sign-in and before any sync upsell.
3. Add a visible backup-health indicator: last local write, last export, and last successful encrypted sync. Warn when storage is best-effort, private browsing is detected, or an import would replace newer progress.
4. Keep identity optional. Use an opaque local continuity ID by default and offer WebAuthn/passkey linking only when a user opts into cross-device sync.
5. Encrypt payloads client-side, minimize server metadata, and define deterministic conflict behavior before enabling multi-device sync. Use established cryptographic libraries and have the design reviewed; do not implement a bespoke protocol from raw primitives.
6. Test browser eviction, quota exhaustion, private browsing, interrupted writes, malformed imports, stale revisions, clock skew, lost credentials, and offline reconnects as first-class failure cases.

## Sources

[1] MDN, "IndexedDB API." Evidence: IndexedDB is a low-level client-side store for significant structured data, supports indexes and transactions, operates asynchronously, and follows same-origin policy. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

[2] MDN, "Storage quotas and eviction criteria." Evidence: browser storage is origin-scoped; best-effort storage can be evicted; `navigator.storage.persist()` requests persistent storage; behavior and quotas vary by browser. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

[3] MDN, "File System API." Evidence: file access is available in secure contexts, user-selected files/directories can be read and written through picker-based handles, and OPFS is private to the origin. https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

[4] W3C, "Web Authentication: An API for accessing Public Key Credentials — Level 3." Evidence: discoverable credentials can be used without a supplied credential ID; credentials are scoped to an RP ID; authenticators retain private keys and the relying party verifies with the public key. https://www.w3.org/TR/webauthn-3/

[5] W3C, "Web Cryptography Level 2." Evidence: `SubtleCrypto` exposes encryption, decryption, signing, verification, key generation, derivation, import/export, and wrapping in secure contexts. https://www.w3.org/TR/webcrypto-2/
