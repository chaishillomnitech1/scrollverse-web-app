# Phase 654 — Portal Runtime Repair Record

## Reported Signals

The owner-reported home-route console contained two independent signals: a tRPC client parse error when an upstream rate limit returned plain text, and a React duplicate-key warning for two discovery records that both used `/recovery-materials` as their key.

## Repair

The tRPC transport now normalizes a non-JSON upstream response into a structured tRPC-compatible error payload. A `429` response is presented as a clear request-limit message instead of being parsed as raw text JSON. Global query and mutation handlers classify that state as a rate-limit warning rather than reporting it as an unparseable API error.

The homepage artifact grid now derives its React key from the route and the visible record title, allowing distinct discovery records to link to one shared route without a key collision.

## Browser Verification

The development home route was opened at `/?from_webdev=1` after the repair. The visual hero, navigation, source-led content blocks, media panels, and discovery page loaded successfully. Console-specific verification remains part of the final validation pass.

## Operating State

This repair changes client-side error normalization and local list identity only. It does not alter external accounts, data, provider limits, payment, token, wallet, contract, upload, publication, or deployment configuration.
