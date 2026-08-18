# ScrollVerse Catalog Engagement and Attribution Options

**Date:** August 16, 2026  
**Status:** Architecture decision record; no external analytics, payment, payout, distributor, or blockchain action has been activated by this document.

## Purpose

ScrollVerse can use on-site interest to improve music, visual, book, and learning discovery without treating attention as money or silently converting activity into an external transaction. This record maps what is already present locally, what established artist platforms document publicly, and three practical paths for creator-controlled catalog attribution.

> **Operating principle:** Measure only what has a declared purpose, use aggregated signals wherever possible, give visitors a meaningful choice, and connect engagement to a release path only after the relevant rights and destination records exist.

## Confirmed Local Starting Point

| Capability | Confirmed local state | Current limitation | Safe next use |
| --- | --- | --- | --- |
| Page engagement | `useSovereignHeartbeat` sends page label, event label, and elapsed seconds after engagement thresholds. | Current heartbeat aggregation is transient and does not retain campaign source, catalog item, or durable session attribution. | Add declared catalog-event labels and consent-aware local storage only after a selected architecture. |
| Owner attribution | The CRM and Sales Dashboard already group revenue and contacts by source, product, type, and pipeline state. | Catalog listening and content interactions do not yet connect to these records. | Create a catalog-event bridge for voluntarily submitted or purchase-confirmed attribution. |
| External ad tracking | The Synter dashboard exposes an optional server-side event adapter when its key is configured. | Availability of a key or campaign result is not an activation record; it is not the core measurement system. | Keep optional, owner-controlled, and off by default until a campaign-specific consent and destination record exists. |
| Music discovery | The Music, Creator Channel, Distribution Highways, and Penny for Your Thoughts routes provide source-labeled outbound discovery. | No verified distributor reporting import or artist-account connection is present in this audit. | Use tagged outbound links and an owner-imported release report rather than inferring streams or royalties. |

## Platform Capability Comparison

| Platform category | Documented creator capabilities | Creator-controlled lesson for ScrollVerse | Boundary |
| --- | --- | --- | --- |
| Spotify for Artists | Aggregated audience and listening analytics, editorial/discovery tools, merchandise/ticketing connections, profile and team management. [1] [2] | Preserve source-labeled listener segments and release-link paths without seeking personal listener identity. | Catalog delivery and changes are distributor-governed; individual listener PII is not provided. |
| Apple Music for Artists | Catalog performance, listener and city/country trends, Shazam and radio indicators, profile tools, and CSV reporting. [3] [4] | Support owner-imported release performance records and campaign comparisons. | Access requires an eligible live catalog and verified artist account; settlements remain distributor-managed. |
| YouTube for Artists | Official Artist Channels, aggregated analytics, audience/discovery surfaces, music delivery through authorized partners, and rights tooling. [5] [6] | Treat public video/source-channel activity as a learning and discovery entry point with an explicit outbound path. | YouTube provides aggregates, not individual listener identity; Content ID and channel eligibility require separate rights and partner records. |
| Bandcamp | Direct-to-fan catalog, flexible sales, raw sales reports, fan messaging, liner notes, and sales/order access. [7] [8] | A future direct fan lane can connect a purchaser-authorized record to catalog fulfillment. | Buyer data is subject to platform terms, consent, and payment processing requirements; it is not a general audience-surveillance model. |
| SoundCloud for Artists | Distribution metadata, engagement insights, fan interaction, revenue options, split-pay features, and rights verification tools. [9] [10] | Store release metadata, contributor splits, and owner-imported performance summaries as separate evidence records. | Distribution requires ownership/rights checks; individual streamer PII is not a creator data feed. |

## Architecture Options

| Approach | What visitors experience | Tradeoffs | Cost | Setup complexity |
| --- | --- | --- | --- | --- |
| **A. Local-first engagement ledger** | A concise privacy notice explains page/listening events. ScrollVerse records anonymous catalog action, page, duration band, and source tag; the owner sees aggregate discovery trends. | Strongest privacy and fastest local value, but no imported DSP statistics or external campaign optimization. | Uses existing project infrastructure. | Low to moderate. |
| **B. Consent-based attribution studio** | Visitors can optionally preserve a campaign/referral source when signing up, saving, or reaching an approved release path. The owner sees catalog-to-source and confirmed conversion funnels. | Better campaign measurement; requires clear consent copy, durable database events, and careful separation of interest from purchase. | Uses existing project infrastructure; external services remain optional. | Moderate. |
| **C. Authorized destination reconciliation** | The owner periodically imports/export-reconciles approved artist-account reports from distributors and artist portals into the catalog desk. | Best cross-platform picture, but only works after account access, official exports/API eligibility, and release/rights records are verified. | May require provider accounts or API access. | Moderate to high. |

## Recommended Sequencing

The three paths are cumulative rather than competing. The immediate foundation is **A**: a local, declared engagement ledger that has no payout or account-connection side effect. **B** can follow after a visitor consent model and a database schema review. **C** stays staged until the owner selects authorized providers and supplies an account/export record. This sequencing keeps the catalog useful now while preserving privacy, creator control, and accurate operating-state labels.

## Explicit Exclusions

This record does not create an account on any platform, track users across unrelated sites, collect private streaming data, upload music, confirm a stream count, submit a release, buy advertising, set prices, issue payouts, create a token, mint a collectible, route funds, or represent any future revenue as guaranteed.

## Owner Decision Needed

Choose one of the following implementation scopes:

1. **Start A** — local, aggregated catalog engagement only.
2. **Start A + B** — local engagement plus consent-based source/referral attribution.
3. **Stage A + B + C** — build the local foundation and data model, while leaving external account/report connections inactive until each provider is specifically authorized.

## References

[1]: https://artists.spotify.com/en/home "Spotify for Artists"
[2]: https://artists.spotify.com/en/analytics "Spotify for Artists Analytics"
[3]: https://artists.apple.com/ "Apple Music for Artists"
[4]: https://artists.apple.com/support/1105-understand-your-analytics "Apple Music for Artists Analytics Support"
[5]: https://support.google.com/youtube/answer/7336634?hl=en "YouTube Official Artist Channels"
[6]: https://support.google.com/youtube/answer/11610212?hl=en "YouTube Analytics for Artists"
[7]: https://bandcamp.com/guide "Bandcamp Guide"
[8]: https://get.bandcamp.help/en/articles/15263368-reading-your-raw-data-sales-report "Bandcamp Raw Data Sales Report"
[9]: https://help.soundcloud.com/hc/en-us/articles/360051038314-Distribution-with-SoundCloud-for-Artists "SoundCloud Distribution"
[10]: https://help.soundcloud.com/hc/en-us/articles/115003564988-Insights-on-SoundCloud "SoundCloud Insights"
