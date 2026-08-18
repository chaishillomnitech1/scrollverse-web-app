# Phase 455 — Physical Artwork Provenance Token Blueprint

**Status:** Architecture and metadata only. No token, coin, NFT, contract, payment, artist compensation, wallet, listing, custody transfer, or chain deployment exists.

## Purpose

The ScrollVerse Physical Artwork Provenance Token is designed first as a **collector-record model**, not as an artwork-image token. It can attest to a named, owner-held physical object and its evidence trail without treating physical possession as permission to reproduce the work or without attaching a public artwork image.

## Two representation modes

| Mode | What the record can contain | Required before use |
| --- | --- | --- |
| **Physical-object provenance only** | Accession ID, owner-held statement, visible title/artist/edition transcription, non-public evidence hashes, condition/provenance fields, and public museum catalog text | Owner release, exact chain/service/custody/fee record if minted; no public artwork image or derivative included |
| **Rights-cleared public image or derivative** | The above plus a specific public image, artwork-derived media, or collector license | Written permission for the exact public use, documented rights holder, approved metadata/media URI, artist recognition/compensation terms if applicable, and owner release |

The current Bridge of Faith manifest is prepared only for the first mode. It deliberately leaves public media, chain, network, edition, custody destination, fee ceiling, artist compensation, and rights approval unset.

## Smart-contract interface specification

This is a control-interface specification, not deployable code. Any future implementation should enforce the following state conditions before a token can be minted.

```text
PhysicalArtworkProvenanceRecord
  accessionId: string
  representationMode: provenanceOnly | rightsClearedImage | rightsClearedDerivative
  evidenceHashes: bytes32[]
  physicalPossession: ownerHeld
  publicImageRight: notEstablished | cleared
  artistRecognition: notConfigured | approved
  compensation: notConfigured | approved
  rightsApprovalReference: URI | null
  publicMetadataURI: URI | null
  mintState: research | requiresOwnerRelease | mintReady | minted

mint(record)
  requires mintState == mintReady
  requires evidenceHashes.length > 0
  requires ownerReleaseReference is current
  requires exact chain, network, custody destination, and maximum fee are confirmed off-chain
  if representationMode != provenanceOnly:
     requires publicImageRight == cleared
     requires rightsApprovalReference != null
  if artistRecognition == approved or compensation == approved:
     requires approved credit/recipient/terms reference
  emits ProvenanceMinted(accessionId, representationMode, evidenceRoot)
```

## Artist Recognition Band integration

If, and only if, an approved rights and compensation record exists, the `artistRecognition` and `compensation` fields can reference a separately documented agreement. The token does not invent a recipient, determine a payout, or automatically route funds. The current Bridge of Faith manifest has `artist_recognition_state: not-configured` and `compensation_state: not-configured`.

## Exact execution gate

Before any irreversible action, the owner must name: the accession ID, representation mode, chain and network, contract or minting service, edition/supply, public metadata decision, public custody destination, maximum fee, artist-recognition/compensation state, and marketplace/price decision if one exists. A token issuance remains a separate choice from public display and a public display remains separate from a sale.

## References

[1]: https://www.copyright.gov/what-is-copyright/ "U.S. Copyright Office — What Is Copyright?"
[2]: https://www.thomaskinkade.com/pages/copyright-information "Thomas Kinkade Studios — Copyright Information"
