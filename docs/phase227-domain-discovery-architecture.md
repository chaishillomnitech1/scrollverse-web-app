# Phase 227 — Manus-Wide Domain and Artifact Discovery Architecture

> **Purpose.** This architecture organizes the ScrollVerse public web presence, source-linked artifacts, and original-component discovery without creating DNS records, buying domains, configuring redirects, changing a registrar, or activating a token, wallet, sale, or transfer.

## Current Observed Hostnames

| Hostname | Observed state on August 14, 2026 | Intended role | Boundary |
| --- | --- | --- | --- |
| `scrollverse.co` | Active project domain | **Primary public destination** | This record does not assert ownership, DNS-provider access, or a specific redirect configuration. |
| `www.scrollverse.co` | Active project domain | Secondary public hostname | The preferred canonical relation must be confirmed/configured by the owner before being represented as live. |
| `scrollport-xkjtdnvi.manus.space` | Project-managed platform hostname | Platform fallback and preview-compatible route | It is not a substitute for a branded canonical domain in public campaign material. |
| Public GitHub repository URLs | Public source destinations | Code, documentation, and provenance links | A public repository is a source record, not proof of a product, service, transaction, rights clearance, deployment, or commercial availability. |

## Recommended Public Discovery Model

`https://scrollverse.co/` should remain the one public front door. The Portal uses **paths first** for sections that are part of the same product: `/open-knowledge-verse`, `/manifesto-builders-book`, `/music-creator-release-readiness`, `/brand-feature-studio`, `/xlviii-blocks-monograph`, `/ip-digital-evidence-navigator`, and `/nft-monetization-blueprint`.

Dedicated subdomains should be created only when a separate deployment, operational owner, security posture, or product boundary requires one. The following names are planning labels only and are not live claims:

| Potential hostname | Future function | Required decision before binding |
| --- | --- | --- |
| `play.scrollverse.co` | Standalone interactive experiences such as Chess Arena | Confirm the separate deployment, owner, support scope, accessibility standard, and canonical relationship. |
| `studio.scrollverse.co` | Authenticated creator tools and protected workflows | Confirm access control, privacy posture, data retention, and authenticated ownership. |
| `media.scrollverse.co` | Publicly cleared media catalog or press/asset gateway | Confirm rights, captions/transcripts, metadata, takedown process, and media host. |
| `archive.scrollverse.co` | Source-labeled public records and published dossier pages | Confirm the public/private classification and correction/review procedure. |
| `artifacts.scrollverse.co` | Published, cleared original-artifact landing pages | Confirm asset rights, evidence state, canonical landing URL, and any separate collectible decision. |

## Free, Low-Cost, and Branded Options

The currently observed project-managed `*.manus.space` hostname is a platform-provided address. It can be useful as a fallback/preview route but should not be confused with a free registrable custom domain. A branded apex or subdomain requires control of the parent domain. Manus documents that it can connect a domain or subdomain the owner controls and can provide the required DNS record; it also offers an in-product purchase path. [1]

For independent static documentation, a public GitHub Pages deployment can use the default project address at no hosting cost under the applicable GitHub plan. A custom hostname still requires domain control and the required repository/DNS configuration. GitHub recommends verifying a domain before associating it with a site and warns against wildcard DNS records because of takeover risk. [2]

## Canonical, Redirect, and Search-Discovery Policy

The recommended public canonical is **`https://scrollverse.co/`**, pending owner confirmation. When the owner chooses a preferred `www` or apex variant, the deployment should align server redirects, self-referential canonical markup, and sitemap URLs to the same preferred origin. Google identifies redirects and `rel="canonical"` annotations as strong canonicalization signals and sitemap inclusion as a supporting signal; it also recommends internal links consistently use the canonical URL. [3]

No redirect, canonical-header, sitemap, robots rule, DNS record, or Search Console setting is created by this document.

## Artifact and Original-Component Pattern

Every public original component can receive a first-party **artifact landing record** containing the following fields:

| Field | Meaning | Does not establish |
| --- | --- | --- |
| Original component title and version | Identifies the specific ScrollVerse implementation | Rights to a similarly named third-party product or a patent. |
| Source pattern register | Notes public standards, public code, or public articles reviewed | Affiliation, permission, endorsement, or a claim that the source is copied. |
| Rights and contribution context | Records owner/contributor review state | A complete legal clearance unless a qualified reviewer has separately confirmed it. |
| Integrity/provenance reference | Optional hash or source record for a released artifact | Ownership, custody, permanence, or a blockchain transaction by itself. |
| Distribution state | Labels public page, protected review, or future-release preparation | Inventory, availability, price, purchase, delivery, or provider acceptance. |
| Collectible readiness | Optional future attachment path | A live NFT, token, wallet connection, sale, royalty, or incentive. |

Original first-party implementation must be created from the project’s own requirements and source-labeled learning. Public patterns can inform interoperable ideas, but no protected code, trade dress, media, or trademark is copied merely because it is visible on the internet.

## Owner-Controlled Activation Checklist

Before attaching a new hostname or changing an existing one, the owner should make the specific request and confirm the exact target property. The bounded sequence is: verify parent-domain control; choose the exact hostname and canonical origin; obtain/apply the required DNS record at the registrar; bind the hostname to the correct site; verify HTTPS and route behavior; confirm that the old hostname redirects as intended; inspect mobile and source links; then publish the final canonical/sitemap configuration. GitHub’s documentation notes that DNS propagation may take time and that domain verification helps reduce takeover risk. [2]

Before activating a token/collectible attachment, the separate artifact record must have rights/provenance review, the contract and security review must be complete, the release terms/support path must exist, and the owner must explicitly authorize the exact network, contract, asset, recipient, and action. No such activation is created by this architecture.

## References

[1] [Manus — Custom Domains: Professionalize Your Brand](https://manus.im/docs/website-builder/custom-domains)

[2] [GitHub Docs — Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

[3] [Google Search Central — Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
