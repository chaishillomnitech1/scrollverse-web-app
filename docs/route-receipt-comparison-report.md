# ScrollVerse route and receipt comparison report

## Executive summary

The current repository contains **586 unique registered routes** in `client/src/App.tsx` (591 route declarations including duplicates or aliases). The route registry still contains the extended application, direct-to-customer, commerce, exchange, payment, revenue, creator, media, token, NFT, and wallet surfaces. The bounded restoration inventory contains **79 media/source records**, of which **60** have matching local bytes, **45** are named by homepage source, and **0** currently have a managed-source candidate according to the inventory. This report compares what is preserved in local code and receipts; it does not infer hosting, billing, account, payment, wallet, contract, or publication state.

## Receipt inventory crosswalk

| Receipt classification | Count | Homepage treatment |
|---|---:|---|
| AVAILABLE MEDIA | 0 | Native visitor-controlled playback only when a confirmed browser source is connected. |
| SOURCE NEEDS HOSTED URL | 60 | Visible source receipt; no fake play control until a deployment-safe URL is connected. |
| METADATA RECORD | 19 | Visible metadata/source record with detail/search treatment and no play control. |

The homepage now adds an inventory-backed `LocalMediaRestorationShelf` after `ArtifactFrontDoor`. Confirmed theater records from `client/src/lib/metaLegionArchive.ts` are merged as `AVAILABLE MEDIA`; the 79 bounded inventory records remain source-labeled and hash-bearing. The catalog generator is `scripts/build-homepage-media-catalog.py`.

## Preserved route categories

### Payment (3 routes)

| Route |
|---|
| `/payment-launch-packets` |
| `/payment-options` |
| `/payment-success` |

### Customer Commerce (7 routes)

| Route |
|---|
| `/commerce-financial-readiness-board` |
| `/direct-fan-catalog` |
| `/sales` |
| `/shopify-crawler-access-readiness` |
| `/shopify-staged-launch-guidance` |
| `/shopify-storefront-readiness` |
| `/tiktok-shop` |

### Exchange Finance (30 routes)

| Route |
|---|
| `/admin/royalty-records` |
| `/chosen-ones-exchange` |
| `/chosen-ones-experience-exchange` |
| `/commerce-financial-readiness-board` |
| `/creator-exchange-governance-readiness` |
| `/creator-exchange-navigator` |
| `/creator-revenue-learning` |
| `/episode-38-exchange-matrix` |
| `/episode-39-exchange-perimeter` |
| `/exchange` |
| `/exchange/crypto` |
| `/exchange/currencies` |
| `/exchange/defi` |
| `/exchange/governance` |
| `/exchange/heatmap` |
| `/exchange/portfolio` |
| `/exchange/stocks` |
| `/financial-activation-readiness` |
| `/financial-highways` |
| `/financial-systems-capability-map` |
| `/idea-exchange` |
| `/legacy-royalties-research` |
| `/open-exchange-field-guide` |
| `/revenue` |
| `/revenue-dashboard` |
| `/revenue-flywheel` |
| `/revenue-operations` |
| `/revenue-ops` |
| `/sovereign-contribution-exchange` |
| `/wallet` |

### Token Nft (11 routes)

| Route |
|---|
| `/catalyst-nft` |
| `/chxtoken` |
| `/infinite-nft` |
| `/junior-movies-nft` |
| `/kepler-nft` |
| `/knicks-nft` |
| `/nft` |
| `/nft-marketplace` |
| `/nft-monetization-blueprint` |
| `/nft-unlock` |
| `/token` |

### Creator Media (48 routes)

| Route |
|---|
| `/admin/creator-operations` |
| `/admin/creators` |
| `/books` |
| `/books-media-readiness` |
| `/connected-statements-music-evidence` |
| `/creator` |
| `/creator-artifact-intake` |
| `/creator-atlas` |
| `/creator-books` |
| `/creator-brand-registry` |
| `/creator-broadcast-preparation` |
| `/creator-catalog-readiness` |
| `/creator-channel-hub` |
| `/creator-collection-records` |
| `/creator-digital-dna` |
| `/creator-exchange-governance-readiness` |
| `/creator-exchange-navigator` |
| `/creator-infrastructure` |
| `/creator-media-packet` |
| `/creator-media-studio` |
| `/creator-network` |
| `/creator-operations` |
| `/creator-operations-intelligence` |
| `/creator-revenue-learning` |
| `/creator-services-navigator` |
| `/creator-sticker-intake` |
| `/creator-studio-navigator` |
| `/creator-visual-intake-atlas` |
| `/creator-workspace` |
| `/film-animation-studio` |
| `/infininillionaire-film-foundation` |
| `/junior-movies` |
| `/junior-movies-nft` |
| `/junior-movies/universe` |
| `/media-dock` |
| `/media-evidence-bridge` |
| `/media-hub` |
| `/media-portfolio-readiness` |
| `/media-readiness-lab` |
| `/media-release-concept-board` |
| `/media-world` |
| `/media-world-evidence-packets` |
| `/meta-ai-artifacts-lookbooks` |
| `/music` |
| `/music-creator-release-readiness` |
| `/original-media-readiness` |
| `/sovereign-books` |
| `/storybooks` |

### Other (492 routes)

| Route |
|---|
| `/` |
| `/404` |
| `/99-names` |
| `/academy` |
| `/academy-hub` |
| `/academy-v2` |
| `/accomplishments-archive` |
| `/acquisition` |
| `/activation-dossier` |
| `/activation-register` |
| `/active-pathways-release-gates-audit` |
| `/admin/atlantis-catalog` |
| `/admin/chx-reservations` |
| `/admin/fashion-review` |
| `/admin/provenance-review` |
| `/admin/saferway` |
| `/aegis` |
| `/aegis-chronicles` |
| `/agentic-storefronts-readiness` |
| `/ai-chat-upload` |
| `/ai-companion-hub` |
| `/ai-constellation` |
| `/ai-council` |
| `/ai-hub` |
| `/ai-legion` |
| `/ai-legion-apex` |
| `/ai-twin` |
| `/allversal-empire` |
| `/allversal-highway` |
| `/altar` |
| `/anno-omni` |
| `/announcements` |
| `/apex-digital-intelligence-research` |
| `/app-icon-candidate` |
| `/archive` |
| `/archivekeeper` |
| `/art-learning-studio` |
| `/art-museum` |
| `/artifact-evidence-blueprint` |
| `/artist-control-desk` |
| `/asset-registry` |
| `/assistive-governance` |
| `/atlantis-collection` |
| `/atlas-core` |
| `/audience-value-leverage` |
| `/august-28-launch` |
| `/autoempire-source-intake` |
| `/book-of-life` |
| `/book-of-the-journey` |
| `/bounded-research-operations` |
| `/brand-feature-studio` |
| `/brand-identity-record` |
| `/broadcast` |
| `/builder` |
| `/campaign-activation-center` |
| `/campaign-asset-registry` |
| `/capability-audit` |
| `/capability-comparison` |
| `/capital-readiness` |
| `/casino` |
| `/catalog-engagement` |
| `/catalog-production-desk` |
| `/catalog-stewardship` |
| `/celestine-starforge` |
| `/central-hub-source-record` |
| `/chain-intelligence` |
| `/chais-catalog` |
| `/chais-number-one` |
| `/chais-sabir-allah-mirror` |
| `/chais-sabir-equation` |
| `/chais-videos` |
| `/channel-codex` |
| `/chat` |
| `/chronicle` |
| `/cieds` |
| `/co-creation-navigator` |
| `/codex` |
| `/codex-1587` |
| `/codex-source-chronology` |
| `/collaborate` |
| `/commons` |
| `/components` |
| `/concept-seal-shrine` |
| `/connect` |
| `/connected-source-registry` |
| `/connected-systems` |
| `/consciousness-mirror` |
| `/consoleverse` |
| `/consortium-nexus` |
| `/continuation-readiness-register` |
| `/continuous-improvement-standard` |
| `/cover-art-storyworlds` |
| `/creative-systems-launchpad` |
| `/crypto` |
| `/crypto-artifact-lookbook` |
| `/crypto-systems-atlas` |
| `/curriculum` |
| `/daily-staking-email-record` |
| `/dashboard` |
| `/dc-visit` |
| `/deepexa` |
| `/delivery-resilience` |
| `/deploy` |
| `/digital-footprint-report` |
| `/digital-highways` |
| `/digital-hollywood-studio` |
| `/digital-intelligence-safeguards` |
| `/digital-mirror-twin` |
| `/digital-ships` |
| `/digital-twin` |
| `/digitalship-accession` |
| `/discord` |
| `/distribution-highways` |
| `/domain-discovery-map` |
| `/dsp-intelligence` |
| `/dynasty-visual-archive` |
| `/ecosystem` |
| `/ecosystem-discovery` |
| `/ecosystem-outcomes-scorecard` |
| `/emerald` |
| `/empire-asset-navigator` |
| `/empire-index` |
| `/empire-map` |
| `/empire-power-index` |
| `/empire-routing-map` |
| `/enterprise-systems-blueprint` |
| `/episode-37-ledger-sync` |
| `/episode-40-infrastructure-scaling` |
| `/episode-41-absolute-world-ordered` |
| `/episode-42-motherboard-world` |
| `/episode-43-final-core-nodes` |
| `/episode-45-kernel-traffic-drops` |
| `/episode-50-final-structural-expansion` |
| `/episode-52-final-structural-expansion` |
| `/episode-brief-builder` |
| `/episode-experience` |
| `/episodic-operations-archive` |
| `/episodic-production-slate` |
| `/equation` |
| `/eternal-echo` |
| `/evidence-commons` |
| `/evidence-standards` |
| `/evolution-lookbook` |
| `/external-action-governance-study` |
| `/fair-practice` |
| `/family` |
| `/fashion` |
| `/fashion-artifact-atlas` |
| `/fashion-empire` |
| `/fashion-lookbook-experience` |
| `/fashion-partnership-proposal` |
| `/fashion-portfolio` |
| `/fashion-studio` |
| `/first-party-co-creation` |
| `/first-party-sites-register` |
| `/first-sku-activation-packet` |
| `/flamebearer` |
| `/fluidity-corpus-blueprint` |
| `/forge` |
| `/free-energy-architecture` |
| `/frequency` |
| `/frequency-player` |
| `/future-infrastructure-blueprint` |
| `/game-systems-research-blueprint` |
| `/game-worlds-studio` |
| `/gaming-hub` |
| `/gate-keys` |
| `/gates` |
| `/gates-one` |
| `/gates/map` |
| `/gemini-storybook-collection` |
| `/generic-retained-image-intake` |
| `/gilgamesh` |
| `/github-constellation` |
| `/github-evidence-map` |
| `/github-ops` |
| `/github-showcase` |
| `/global-dashboard` |
| `/global-map` |
| `/global-orbital-matrix-source-intake` |
| `/godengine` |
| `/governance` |
| `/guardian-activation` |
| `/guardian-crusade` |
| `/guardian-dashboard` |
| `/guardian-leaderboard` |
| `/guardian-protocol` |
| `/guardian-stories` |
| `/guardian/:handle` |
| `/guardians` |
| `/gulf-learning` |
| `/harlem-vineland-legacy` |
| `/health-navigator` |
| `/health-research` |
| `/heir` |
| `/highway` |
| `/historical-transmission-patterns` |
| `/hypothetical-systems-lab` |
| `/identity-system` |
| `/impact-incentive-readiness` |
| `/instagram-story-engine` |
| `/institutional-systems-atlas` |
| `/integration-observability-reference` |
| `/integration-registry` |
| `/intelligence` |
| `/investor-relations` |
| `/ip-digital-evidence` |
| `/ip-digital-evidence-navigator` |
| `/ip-protection` |
| `/ip-readiness` |
| `/ip-security-readiness` |
| `/ip-stewardship` |
| `/ipo` |
| `/jme-universe` |
| `/journey` |
| `/journey-co-creation-archive` |
| `/jpm-mirror` |
| `/juneteenth-declaration` |
| `/junior-studio` |
| `/kepler` |
| `/king-solomon` |
| `/knick` |
| `/knick-blockchain` |
| `/knicks-legacy` |
| `/knicks-nation` |
| `/knowledge` |
| `/knowledge-commons` |
| `/knowledge-context` |
| `/knowledge-navigator` |
| `/kyc` |
| `/launchpad` |
| `/lawful-operating-navigator` |
| `/learning-pathways` |
| `/legacy` |
| `/legion` |
| `/legion-commons` |
| `/legion-continuity-lab` |
| `/legion-knowledge-base` |
| `/legion-specialist-atlas` |
| `/legion-specialist-profiles` |
| `/legion/rewards` |
| `/library` |
| `/link` |
| `/living-journey-experience` |
| `/londyn` |
| `/londyn-ledger-evidence` |
| `/londyn-legacy` |
| `/londyn/letters` |
| `/manifest` |
| `/manifesto` |
| `/manifesto-builders-book` |
| `/manufacturing-readiness` |
| `/manus` |
| `/manus-hero` |
| `/manus-origin-historical-recovery` |
| `/marsomni` |
| `/masjid` |
| `/master-app` |
| `/master-directory` |
| `/master-gateway` |
| `/master-instruction-intake` |
| `/mein` |
| `/merkaba-key` |
| `/mesopotamia-commons` |
| `/mesopotamia-library` |
| `/meta-ai-legion-archive` |
| `/metrics` |
| `/mika-solara` |
| `/milestone-roadmap` |
| `/mint` |
| `/mirror` |
| `/mobile-companion` |
| `/mother-10` |
| `/mother-10-origin-doesnt-matter` |
| `/mr-walkshit` |
| `/multi-vector-protected-source-intake` |
| `/narration-directions` |
| `/narrative-source-trail` |
| `/nba-draft-genesis` |
| `/new-dominion-story-blueprint` |
| `/next-retained-image-intake` |
| `/nexus` |
| `/nine-frame-manifestation-packet` |
| `/nipsey-legacy` |
| `/oka` |
| `/omega-267-prior-hub-recovery` |
| `/omni` |
| `/omni-chess` |
| `/omni-control-tower` |
| `/omni-master-registry` |
| `/omni-vault` |
| `/omnicodex` |
| `/omniland` |
| `/omniland-cinematic-gateway` |
| `/omniland-consoleless-delivery` |
| `/omniland-embodied-play` |
| `/omniland-game-systems-contribution` |
| `/omniland-source-atlas` |
| `/omnitotality-core-deck` |
| `/omniversal-source-ledger` |
| `/omniverse-manifesto-chronology` |
| `/omniverse-manifesto-codex` |
| `/omniverse-manifesto-master-index` |
| `/omniverse-manifesto-nodes` |
| `/omniverse-node/:id` |
| `/onboard` |
| `/open-knowledge-verse` |
| `/open-record-continuum` |
| `/open-research-navigator` |
| `/operating-pattern-navigator` |
| `/operational-safeguards` |
| `/opportunity-navigator` |
| `/original-episode-slate` |
| `/original-systems-hub` |
| `/our-story` |
| `/owner-input-routing-board` |
| `/owner-workstation` |
| `/paired-retained-image-intake` |
| `/pantheon` |
| `/partners` |
| `/partnership-engine` |
| `/partnership-highways` |
| `/partnerships` |
| `/pattern` |
| `/philosophers-archive` |
| `/planning-atlas` |
| `/plasma` |
| `/platform-foundations` |
| `/platforms` |
| `/podcast` |
| `/portal` |
| `/portal-trust-standard` |
| `/portfolio-asset-evidence-inventory` |
| `/portfolio-evidence-hub` |
| `/pre-registration-readiness` |
| `/premium-storefront-program` |
| `/price-of-freedom` |
| `/privacy` |
| `/product-release-pipeline` |
| `/production-continuum` |
| `/production-control` |
| `/production-control-desk` |
| `/proof-of-practice` |
| `/protected-attachment-accession` |
| `/protected-source-convergence` |
| `/protected-visual-batch-intake` |
| `/protected-visual-evidence-hub` |
| `/protected-visual-intake` |
| `/protection-protocol` |
| `/public-footprint` |
| `/public-portfolio-governance` |
| `/public-reference-trail` |
| `/quantum-digital-magic-source-record` |
| `/quantum-frequency-research-lab` |
| `/quantum-practice` |
| `/quantum-research` |
| `/realms-amenities` |
| `/rebirth-living-codex` |
| `/recovery-materials` |
| `/red-diamond-fleet` |
| `/referral` |
| `/release-destinations` |
| `/release-package-checklist` |
| `/release-readiness` |
| `/replay-readiness` |
| `/replays` |
| `/research-atlas` |
| `/resilience` |
| `/retained-image-intake` |
| `/retained-photo-intake` |
| `/returner` |
| `/ring-activation` |
| `/rizz-burna` |
| `/route-integrity-index` |
| `/sacred-frequencies` |
| `/saferway` |
| `/scf` |
| `/scroll-44` |
| `/scroll-library` |
| `/scroll-network-context` |
| `/scroll-tv` |
| `/scrollacademy` |
| `/scrollport` |
| `/scrollverse-atlas` |
| `/scrollverse-brand-architecture` |
| `/scrollverse-chess-arena` |
| `/scrollverse-continuity-index` |
| `/scrollverse-perspectives` |
| `/scrollverse-story-worlds` |
| `/scrollverse-xlviiiblocks-readiness` |
| `/security` |
| `/seerah` |
| `/seerah/al-aqsa` |
| `/seerah/al-farewell` |
| `/seerah/al-fath-khaybar` |
| `/seerah/al-ghazwat` |
| `/seerah/al-hijra` |
| `/seerah/al-isra-wal-miraj-deep` |
| `/seerah/al-wafat` |
| `/seerah/badr` |
| `/seerah/fath-makkah` |
| `/seerah/noor-al-mawlid` |
| `/seerah/quiz` |
| `/seerah/timeline` |
| `/sentience` |
| `/seven-episode-series` |
| `/shifter` |
| `/show-the-work-knowledge-base` |
| `/signalworks` |
| `/singularity` |
| `/site-map` |
| `/solara-coin` |
| `/song` |
| `/soul-altar` |
| `/source-channel-scheduling-readiness` |
| `/source-collections` |
| `/source-labeled-storybook-index` |
| `/source-study-library` |
| `/source-work-review` |
| `/sovereign-9` |
| `/sovereign-archive-chronicles` |
| `/sovereign-bank` |
| `/sovereign-broadcast` |
| `/sovereign-card` |
| `/sovereign-cards` |
| `/sovereign-cartoon-gallery` |
| `/sovereign-cinema` |
| `/sovereign-codex` |
| `/sovereign-crm` |
| `/sovereign-isolation-terminal` |
| `/sovereign-legacy` |
| `/sovereign-manifesto` |
| `/sovereign-methodology` |
| `/sovereign-partnerships` |
| `/sovereign-space-agency` |
| `/sovereignty-infrastructure-record` |
| `/special-repository` |
| `/specialist-constellation` |
| `/spiral-signature` |
| `/staking` |
| `/standards-evidence-commons` |
| `/standards-studio` |
| `/star-gate` |
| `/status` |
| `/storage` |
| `/story-archive` |
| `/story-world-crossroads` |
| `/stream-verse` |
| `/subscribe` |
| `/summerleague` |
| `/sun-on-us-1111` |
| `/super-manus` |
| `/supplied-public-references` |
| `/support` |
| `/synchronization-research` |
| `/synchronization-video-library` |
| `/synchronizations` |
| `/synter` |
| `/systems-blueprint-library` |
| `/systems-map` |
| `/tatanka` |
| `/telegram` |
| `/tesla-patents` |
| `/think-space` |
| `/think-space/featured` |
| `/thoth-hawk` |
| `/three-lane-release-register` |
| `/throne` |
| `/trading-readiness` |
| `/transmission-alignment-record` |
| `/transmissions-source-convergence` |
| `/trinity-sovereign-portal` |
| `/tutorial-studio` |
| `/uap` |
| `/universal-commons` |
| `/vault` |
| `/vibe-canvas` |
| `/virgil-abloh` |
| `/visual-story-worlds` |
| `/visuals` |
| `/voice-language-studio` |
| `/voyage` |
| `/wealth` |
| `/world-lens` |
| `/world-station` |
| `/xlviii-blocks-monograph` |
| `/xlviiiblocks-proposal-canvas` |
| `/youtube-current-feed-research` |
| `/youtube-episode-release-desk` |
| `/zaire` |
| `/zakat` |
| `/zernio-distribution` |

## Homepage exposure crosswalk

| Surface | Current state | Evidence |
|---|---|---|
| Artifact Front Door | Preserved and rendered before the restoration shelf. | `Home.tsx:ArtifactFrontDoor` |
| Inventory restoration shelf | Added and data-driven. | `Home.tsx:LocalMediaRestorationShelf`, `localMediaCatalog.ts` |
| Managed theater playback | Visitor-controlled, `controls`, `preload=none`, `playsInline`, no autoplay. | `metaLegionArchive.ts` and shelf render contract |
| Local upload bytes | Preserved as hashed source records outside `client/public`. | `docs/local-media-inventory.md` |
| Payment and exchange routes | Still registered and not deleted by this restoration slice. | `client/src/App.tsx` route registry |

## Complete route appendix

- `/`
- `/404`
- `/99-names`
- `/academy`
- `/academy-hub`
- `/academy-v2`
- `/accomplishments-archive`
- `/acquisition`
- `/activation-dossier`
- `/activation-register`
- `/active-pathways-release-gates-audit`
- `/admin/atlantis-catalog`
- `/admin/chx-reservations`
- `/admin/creator-operations`
- `/admin/creators`
- `/admin/fashion-review`
- `/admin/provenance-review`
- `/admin/royalty-records`
- `/admin/saferway`
- `/aegis`
- `/aegis-chronicles`
- `/agentic-storefronts-readiness`
- `/ai-chat-upload`
- `/ai-companion-hub`
- `/ai-constellation`
- `/ai-council`
- `/ai-hub`
- `/ai-legion`
- `/ai-legion-apex`
- `/ai-twin`
- `/allversal-empire`
- `/allversal-highway`
- `/altar`
- `/anno-omni`
- `/announcements`
- `/apex-digital-intelligence-research`
- `/app-icon-candidate`
- `/archive`
- `/archivekeeper`
- `/art-learning-studio`
- `/art-museum`
- `/artifact-evidence-blueprint`
- `/artist-control-desk`
- `/asset-registry`
- `/assistive-governance`
- `/atlantis-collection`
- `/atlas-core`
- `/audience-value-leverage`
- `/august-28-launch`
- `/autoempire-source-intake`
- `/book-of-life`
- `/book-of-the-journey`
- `/books`
- `/books-media-readiness`
- `/bounded-research-operations`
- `/brand-feature-studio`
- `/brand-identity-record`
- `/broadcast`
- `/builder`
- `/campaign-activation-center`
- `/campaign-asset-registry`
- `/capability-audit`
- `/capability-comparison`
- `/capital-readiness`
- `/casino`
- `/catalog-engagement`
- `/catalog-production-desk`
- `/catalog-stewardship`
- `/catalyst-nft`
- `/celestine-starforge`
- `/central-hub-source-record`
- `/chain-intelligence`
- `/chais-catalog`
- `/chais-number-one`
- `/chais-sabir-allah-mirror`
- `/chais-sabir-equation`
- `/chais-videos`
- `/channel-codex`
- `/chat`
- `/chosen-ones-exchange`
- `/chosen-ones-experience-exchange`
- `/chronicle`
- `/chxtoken`
- `/cieds`
- `/co-creation-navigator`
- `/codex`
- `/codex-1587`
- `/codex-source-chronology`
- `/collaborate`
- `/commerce-financial-readiness-board`
- `/commons`
- `/components`
- `/concept-seal-shrine`
- `/connect`
- `/connected-source-registry`
- `/connected-statements-music-evidence`
- `/connected-systems`
- `/consciousness-mirror`
- `/consoleverse`
- `/consortium-nexus`
- `/continuation-readiness-register`
- `/continuous-improvement-standard`
- `/cover-art-storyworlds`
- `/creative-systems-launchpad`
- `/creator`
- `/creator-artifact-intake`
- `/creator-atlas`
- `/creator-books`
- `/creator-brand-registry`
- `/creator-broadcast-preparation`
- `/creator-catalog-readiness`
- `/creator-channel-hub`
- `/creator-collection-records`
- `/creator-digital-dna`
- `/creator-exchange-governance-readiness`
- `/creator-exchange-navigator`
- `/creator-infrastructure`
- `/creator-media-packet`
- `/creator-media-studio`
- `/creator-network`
- `/creator-operations`
- `/creator-operations-intelligence`
- `/creator-revenue-learning`
- `/creator-services-navigator`
- `/creator-sticker-intake`
- `/creator-studio-navigator`
- `/creator-visual-intake-atlas`
- `/creator-workspace`
- `/crypto`
- `/crypto-artifact-lookbook`
- `/crypto-systems-atlas`
- `/curriculum`
- `/daily-staking-email-record`
- `/dashboard`
- `/dc-visit`
- `/deepexa`
- `/delivery-resilience`
- `/deploy`
- `/digital-footprint-report`
- `/digital-highways`
- `/digital-hollywood-studio`
- `/digital-intelligence-safeguards`
- `/digital-mirror-twin`
- `/digital-ships`
- `/digital-twin`
- `/digitalship-accession`
- `/direct-fan-catalog`
- `/discord`
- `/distribution-highways`
- `/domain-discovery-map`
- `/dsp-intelligence`
- `/dynasty-visual-archive`
- `/ecosystem`
- `/ecosystem-discovery`
- `/ecosystem-outcomes-scorecard`
- `/emerald`
- `/empire-asset-navigator`
- `/empire-index`
- `/empire-map`
- `/empire-power-index`
- `/empire-routing-map`
- `/enterprise-systems-blueprint`
- `/episode-37-ledger-sync`
- `/episode-38-exchange-matrix`
- `/episode-39-exchange-perimeter`
- `/episode-40-infrastructure-scaling`
- `/episode-41-absolute-world-ordered`
- `/episode-42-motherboard-world`
- `/episode-43-final-core-nodes`
- `/episode-45-kernel-traffic-drops`
- `/episode-50-final-structural-expansion`
- `/episode-52-final-structural-expansion`
- `/episode-brief-builder`
- `/episode-experience`
- `/episodic-operations-archive`
- `/episodic-production-slate`
- `/equation`
- `/eternal-echo`
- `/evidence-commons`
- `/evidence-standards`
- `/evolution-lookbook`
- `/exchange`
- `/exchange/crypto`
- `/exchange/currencies`
- `/exchange/defi`
- `/exchange/governance`
- `/exchange/heatmap`
- `/exchange/portfolio`
- `/exchange/stocks`
- `/external-action-governance-study`
- `/fair-practice`
- `/family`
- `/fashion`
- `/fashion-artifact-atlas`
- `/fashion-empire`
- `/fashion-lookbook-experience`
- `/fashion-partnership-proposal`
- `/fashion-portfolio`
- `/fashion-studio`
- `/film-animation-studio`
- `/financial-activation-readiness`
- `/financial-highways`
- `/financial-systems-capability-map`
- `/first-party-co-creation`
- `/first-party-sites-register`
- `/first-sku-activation-packet`
- `/flamebearer`
- `/fluidity-corpus-blueprint`
- `/forge`
- `/free-energy-architecture`
- `/frequency`
- `/frequency-player`
- `/future-infrastructure-blueprint`
- `/game-systems-research-blueprint`
- `/game-worlds-studio`
- `/gaming-hub`
- `/gate-keys`
- `/gates`
- `/gates-one`
- `/gates/map`
- `/gemini-storybook-collection`
- `/generic-retained-image-intake`
- `/gilgamesh`
- `/github-constellation`
- `/github-evidence-map`
- `/github-ops`
- `/github-showcase`
- `/global-dashboard`
- `/global-map`
- `/global-orbital-matrix-source-intake`
- `/godengine`
- `/governance`
- `/guardian-activation`
- `/guardian-crusade`
- `/guardian-dashboard`
- `/guardian-leaderboard`
- `/guardian-protocol`
- `/guardian-stories`
- `/guardian/:handle`
- `/guardians`
- `/gulf-learning`
- `/harlem-vineland-legacy`
- `/health-navigator`
- `/health-research`
- `/heir`
- `/highway`
- `/historical-transmission-patterns`
- `/hypothetical-systems-lab`
- `/idea-exchange`
- `/identity-system`
- `/impact-incentive-readiness`
- `/infininillionaire-film-foundation`
- `/infinite-nft`
- `/instagram-story-engine`
- `/institutional-systems-atlas`
- `/integration-observability-reference`
- `/integration-registry`
- `/intelligence`
- `/investor-relations`
- `/ip-digital-evidence`
- `/ip-digital-evidence-navigator`
- `/ip-protection`
- `/ip-readiness`
- `/ip-security-readiness`
- `/ip-stewardship`
- `/ipo`
- `/jme-universe`
- `/journey`
- `/journey-co-creation-archive`
- `/jpm-mirror`
- `/juneteenth-declaration`
- `/junior-movies`
- `/junior-movies-nft`
- `/junior-movies/universe`
- `/junior-studio`
- `/kepler`
- `/kepler-nft`
- `/king-solomon`
- `/knick`
- `/knick-blockchain`
- `/knicks-legacy`
- `/knicks-nation`
- `/knicks-nft`
- `/knowledge`
- `/knowledge-commons`
- `/knowledge-context`
- `/knowledge-navigator`
- `/kyc`
- `/launchpad`
- `/lawful-operating-navigator`
- `/learning-pathways`
- `/legacy`
- `/legacy-royalties-research`
- `/legion`
- `/legion-commons`
- `/legion-continuity-lab`
- `/legion-knowledge-base`
- `/legion-specialist-atlas`
- `/legion-specialist-profiles`
- `/legion/rewards`
- `/library`
- `/link`
- `/living-journey-experience`
- `/londyn`
- `/londyn-ledger-evidence`
- `/londyn-legacy`
- `/londyn/letters`
- `/manifest`
- `/manifesto`
- `/manifesto-builders-book`
- `/manufacturing-readiness`
- `/manus`
- `/manus-hero`
- `/manus-origin-historical-recovery`
- `/marsomni`
- `/masjid`
- `/master-app`
- `/master-directory`
- `/master-gateway`
- `/master-instruction-intake`
- `/media-dock`
- `/media-evidence-bridge`
- `/media-hub`
- `/media-portfolio-readiness`
- `/media-readiness-lab`
- `/media-release-concept-board`
- `/media-world`
- `/media-world-evidence-packets`
- `/mein`
- `/merkaba-key`
- `/mesopotamia-commons`
- `/mesopotamia-library`
- `/meta-ai-artifacts-lookbooks`
- `/meta-ai-legion-archive`
- `/metrics`
- `/mika-solara`
- `/milestone-roadmap`
- `/mint`
- `/mirror`
- `/mobile-companion`
- `/mother-10`
- `/mother-10-origin-doesnt-matter`
- `/mr-walkshit`
- `/multi-vector-protected-source-intake`
- `/music`
- `/music-creator-release-readiness`
- `/narration-directions`
- `/narrative-source-trail`
- `/nba-draft-genesis`
- `/new-dominion-story-blueprint`
- `/next-retained-image-intake`
- `/nexus`
- `/nft`
- `/nft-marketplace`
- `/nft-monetization-blueprint`
- `/nft-unlock`
- `/nine-frame-manifestation-packet`
- `/nipsey-legacy`
- `/oka`
- `/omega-267-prior-hub-recovery`
- `/omni`
- `/omni-chess`
- `/omni-control-tower`
- `/omni-master-registry`
- `/omni-vault`
- `/omnicodex`
- `/omniland`
- `/omniland-cinematic-gateway`
- `/omniland-consoleless-delivery`
- `/omniland-embodied-play`
- `/omniland-game-systems-contribution`
- `/omniland-source-atlas`
- `/omnitotality-core-deck`
- `/omniversal-source-ledger`
- `/omniverse-manifesto-chronology`
- `/omniverse-manifesto-codex`
- `/omniverse-manifesto-master-index`
- `/omniverse-manifesto-nodes`
- `/omniverse-node/:id`
- `/onboard`
- `/open-exchange-field-guide`
- `/open-knowledge-verse`
- `/open-record-continuum`
- `/open-research-navigator`
- `/operating-pattern-navigator`
- `/operational-safeguards`
- `/opportunity-navigator`
- `/original-episode-slate`
- `/original-media-readiness`
- `/original-systems-hub`
- `/our-story`
- `/owner-input-routing-board`
- `/owner-workstation`
- `/paired-retained-image-intake`
- `/pantheon`
- `/partners`
- `/partnership-engine`
- `/partnership-highways`
- `/partnerships`
- `/pattern`
- `/payment-launch-packets`
- `/payment-options`
- `/payment-success`
- `/philosophers-archive`
- `/planning-atlas`
- `/plasma`
- `/platform-foundations`
- `/platforms`
- `/podcast`
- `/portal`
- `/portal-trust-standard`
- `/portfolio-asset-evidence-inventory`
- `/portfolio-evidence-hub`
- `/pre-registration-readiness`
- `/premium-storefront-program`
- `/price-of-freedom`
- `/privacy`
- `/product-release-pipeline`
- `/production-continuum`
- `/production-control`
- `/production-control-desk`
- `/proof-of-practice`
- `/protected-attachment-accession`
- `/protected-source-convergence`
- `/protected-visual-batch-intake`
- `/protected-visual-evidence-hub`
- `/protected-visual-intake`
- `/protection-protocol`
- `/public-footprint`
- `/public-portfolio-governance`
- `/public-reference-trail`
- `/quantum-digital-magic-source-record`
- `/quantum-frequency-research-lab`
- `/quantum-practice`
- `/quantum-research`
- `/realms-amenities`
- `/rebirth-living-codex`
- `/recovery-materials`
- `/red-diamond-fleet`
- `/referral`
- `/release-destinations`
- `/release-package-checklist`
- `/release-readiness`
- `/replay-readiness`
- `/replays`
- `/research-atlas`
- `/resilience`
- `/retained-image-intake`
- `/retained-photo-intake`
- `/returner`
- `/revenue`
- `/revenue-dashboard`
- `/revenue-flywheel`
- `/revenue-operations`
- `/revenue-ops`
- `/ring-activation`
- `/rizz-burna`
- `/route-integrity-index`
- `/sacred-frequencies`
- `/saferway`
- `/sales`
- `/scf`
- `/scroll-44`
- `/scroll-library`
- `/scroll-network-context`
- `/scroll-tv`
- `/scrollacademy`
- `/scrollport`
- `/scrollverse-atlas`
- `/scrollverse-brand-architecture`
- `/scrollverse-chess-arena`
- `/scrollverse-continuity-index`
- `/scrollverse-perspectives`
- `/scrollverse-story-worlds`
- `/scrollverse-xlviiiblocks-readiness`
- `/security`
- `/seerah`
- `/seerah/al-aqsa`
- `/seerah/al-farewell`
- `/seerah/al-fath-khaybar`
- `/seerah/al-ghazwat`
- `/seerah/al-hijra`
- `/seerah/al-isra-wal-miraj-deep`
- `/seerah/al-wafat`
- `/seerah/badr`
- `/seerah/fath-makkah`
- `/seerah/noor-al-mawlid`
- `/seerah/quiz`
- `/seerah/timeline`
- `/sentience`
- `/seven-episode-series`
- `/shifter`
- `/shopify-crawler-access-readiness`
- `/shopify-staged-launch-guidance`
- `/shopify-storefront-readiness`
- `/show-the-work-knowledge-base`
- `/signalworks`
- `/singularity`
- `/site-map`
- `/solara-coin`
- `/song`
- `/soul-altar`
- `/source-channel-scheduling-readiness`
- `/source-collections`
- `/source-labeled-storybook-index`
- `/source-study-library`
- `/source-work-review`
- `/sovereign-9`
- `/sovereign-archive-chronicles`
- `/sovereign-bank`
- `/sovereign-books`
- `/sovereign-broadcast`
- `/sovereign-card`
- `/sovereign-cards`
- `/sovereign-cartoon-gallery`
- `/sovereign-cinema`
- `/sovereign-codex`
- `/sovereign-contribution-exchange`
- `/sovereign-crm`
- `/sovereign-isolation-terminal`
- `/sovereign-legacy`
- `/sovereign-manifesto`
- `/sovereign-methodology`
- `/sovereign-partnerships`
- `/sovereign-space-agency`
- `/sovereignty-infrastructure-record`
- `/special-repository`
- `/specialist-constellation`
- `/spiral-signature`
- `/staking`
- `/standards-evidence-commons`
- `/standards-studio`
- `/star-gate`
- `/status`
- `/storage`
- `/story-archive`
- `/story-world-crossroads`
- `/storybooks`
- `/stream-verse`
- `/subscribe`
- `/summerleague`
- `/sun-on-us-1111`
- `/super-manus`
- `/supplied-public-references`
- `/support`
- `/synchronization-research`
- `/synchronization-video-library`
- `/synchronizations`
- `/synter`
- `/systems-blueprint-library`
- `/systems-map`
- `/tatanka`
- `/telegram`
- `/tesla-patents`
- `/think-space`
- `/think-space/featured`
- `/thoth-hawk`
- `/three-lane-release-register`
- `/throne`
- `/tiktok-shop`
- `/token`
- `/trading-readiness`
- `/transmission-alignment-record`
- `/transmissions-source-convergence`
- `/trinity-sovereign-portal`
- `/tutorial-studio`
- `/uap`
- `/universal-commons`
- `/vault`
- `/vibe-canvas`
- `/virgil-abloh`
- `/visual-story-worlds`
- `/visuals`
- `/voice-language-studio`
- `/voyage`
- `/wallet`
- `/wealth`
- `/world-lens`
- `/world-station`
- `/xlviii-blocks-monograph`
- `/xlviiiblocks-proposal-canvas`
- `/youtube-current-feed-research`
- `/youtube-episode-release-desk`
- `/zaire`
- `/zakat`
- `/zernio-distribution`

## Boundaries

- This is a local repository and receipt comparison, not a claim that a custom domain currently serves this build.
- The report does not activate transactions, billing, wallets, tokenization, contracts, customer purchases, or exchange operations.
- SHA-256 values identify observed bytes; they are not authenticity or rights certificates.
- No raw upload files were copied into `client/public`; only metadata and confirmed project-managed `/manus-storage` sources are used by the browser shelf.
