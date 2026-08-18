# Phase 450 — ScrollVerse Art Museum Accession Standard

**Purpose:** Provide a durable, evidence-first standard for adding owner-held physical artworks to the evolving ScrollVerse Art Museum.

## Museum principle

The ScrollVerse Art Museum is a living owner-held collection archive. It presents the object record, the owner’s relationship to the work, the evidence that supports its description, and the next information needed for a stronger record. The museum can grow as artworks are obtained or added without converting a physical-object record into an artwork-image license, appraisal, sale, or token claim.

## Accession classes

| Class | Meaning | Default display state |
| --- | --- | --- |
| **Owner-held physical artwork** | An object in the owner’s physical collection, recorded through an owner statement and visual evidence | Available now as a collection record |
| **Owner-created original artwork** | A work created by the owner, with creator/source record available | Requires source and rights packet before public release |
| **Research reference artwork** | A work studied for historical, cultural, or visual context but not held by the owner | Research |
| **Loan or temporary custody** | A work physically present under a limited arrangement | Requires owner release and stated custody terms |

## Public-display states

| State | Museum behavior |
| --- | --- |
| **Collection record available** | Show a source-labeled object description, accession ID, and non-sensitive provenance fields. |
| **Owner-held; image review required** | Show an object card without a public high-resolution work image while image/reproduction treatment is unresolved. |
| **Public image released** | Show only the approved image and context after a separate rights and owner-release record. |
| **Research** | Present limited archival context and a correction path; do not make collector, authenticity, or market claims. |
| **Requires owner release** | Keep the work in the internal/local collection inventory until the named release conditions are complete. |

## Required accession fields

| Field | Purpose |
| --- | --- |
| Accession ID | Stable internal reference, e.g. `SV-PHYS-ART-###` |
| Owner-held context | A dated owner statement of collection status or custody |
| Object title and artist/attribution | Visible transcription or documented source; note uncertainty where present |
| Object evidence | Full-object, label, signature, back, frame, or certificate sources with file hashes where available |
| Visible description | Neutral account of what is visible in the supplied source material |
| Owner-authored interpretation | A separately labeled personal relationship, memory, or meaning |
| Physical fields | Dimensions, medium, frame, edition, condition, storage, and acquisition context when available |
| Rights and public-display state | Physical possession, public image/reproduction decision, and any future commercial or tokenization status |
| Correction path | A dated way to add clearer attribution, documentation, condition evidence, or a revised record |

## Future acquisition intake

Each new artwork should begin with a small evidence packet: a full front photograph, close-ups of title/artist/signature/edition labels, back and frame photographs, dimensions, owner-held acquisition statement, any certificate or receipt the owner chooses to preserve, and a brief condition note. The Museum route may prepare these fields in the browser, but no submission, storage, public display, provider connection, listing, appraisal, compensation, tokenization, or external message occurs from a preparation form.

## Collection connections

Every accession can connect to a **provenance record**, **condition record**, **owner interpretation**, **source and rights record**, **future public-display decision**, and, where appropriate, a **tokenization readiness record**. Each connection has its own operating state and does not inherit a release status from another field.

## Current accession roster

| Accession ID | Museum title | Current record |
| --- | --- | --- |
| `SV-PHYS-ART-001` | *Bridge of Faith* — Thomas Kinkade, Library Edition | Owner-held physical record with confirmed visible plaque transcription |
| `SV-PHYS-ART-002` | *Cosmic Knowledge Artwork* — working descriptive museum title | Owner-held physical record with partial visible attribution context and owner-authored interpretation |
