# Phase 891 — Dynasty Next-Motion Production Brief

## Scope and status

The Dynasty Visual Archive now includes a browser-local next-motion brief form for the currently selected supplied motion filename. It turns the required creator decisions into an explicit, exportable planning record without generating, playing, uploading, publishing, or releasing video.

## Required decisions

| Field | Purpose |
| --- | --- |
| Exact selected reference | Carries the selected `MOTION_SOURCES` record, including its supplied filename and cautious planning use |
| Creator-approved reference | Explicit checkbox confirming that the selected filename is the intended reference for this local planning record |
| Duration | Records the desired runtime in creator-provided language |
| Sound / audio direction | Records instrumental, spoken, silence, or other creator direction without activating audio generation |
| On-screen text | Records exact text or an explicit `none` decision |
| Continuity / story direction | Records what must remain consistent across the shot or sequence |
| Exact use target | Records the intended first-party story, episode, review, or other destination scope |

## Export and release boundary

The completed form exports `scrollverse-dynasty-next-motion-brief.json` through a browser-local Blob download. Export is disabled until all five text decisions are non-empty and the creator-approved reference checkbox is selected.

The export notice explicitly states:

> Browser-local planning record only. No generation, playback, upload, wallet, payment, external release, or publication occurs from this brief.

The form does not access source media, infer runtime or soundtrack from filenames, call external URLs, connect accounts, invoke a wallet, create a token, list an item, or submit the brief to a provider.

## Related route

- `/dynasty-visual-archive` — select a source record, complete the local brief, and export the JSON planning record.
- `/episode-brief-builder` — continue into the broader first-party episode planning workbench after the creator chooses to do so.
