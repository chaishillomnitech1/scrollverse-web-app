# Phase 616 — Browser-Local Release-Record Builder

## Purpose

The release-record builder converts a held activation lane into a concise local draft. It lets the creator select the matching lane, add a source or file reference, supply a current confirmation note, and preserve optional preparation notes before copying or exporting the record.

## Local-only boundary

The builder is a text-preparation aid. It does not upload a file, save a secret, alter a provider account, connect a wallet, submit DNS records, create a product, publish media, or transmit the draft. The resulting text is intended for creator review and for the exact corresponding preparation lane only.

## Draft schema

| Field | Purpose |
|---|---|
| Selected lane | Chooses one independent activation lane. |
| Required record | Copies the lane’s exact record request into the draft. |
| Source or file reference | Records the owner-provided source, public URL, or local file reference. |
| Current confirmation | Captures the current owner confirmation relevant to the selected lane. |
| Preparation notes | Stores optional context for the matching browser-local route. |

## Correction path

If the selected lane is wrong, choose the correct lane before exporting. If an exact record is incomplete, leave the lane held and add only the missing source reference or confirmation. Do not reuse a draft for a different external action.
