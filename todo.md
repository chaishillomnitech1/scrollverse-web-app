# ScrollVerse Portal TODO

## Completed (v4.0.0 checkpoint 36526917)
- [x] Liquid Sovereignty design — Afrofuturism × Quantum Digital
- [x] Hero section with floating particles and frequency wave
- [x] 6 Pillars section with animated cards
- [x] $LONDC Token section with stats
- [x] Sacred Frequencies section (528Hz, 963Hz, 432Hz)
- [x] AI Guardian section
- [x] Scaling Roadmap section
- [x] 48D Hilbert Space section
- [x] Guardian Waitlist form (simulated)
- [x] Live $LONDC price ticker (CoinGecko, 30s polling)
- [x] MetaMask wallet connect hook
- [x] Revenue Dashboard page
- [x] 10-Tier Guardian Network page
- [x] Global Map page
- [x] Full-stack upgrade (web-db-user) for server-side API routes

## Completed (v4.1.0 — Mailchimp + Polygon RPC)
- [x] Restore Home.tsx full Liquid Sovereignty design after full-stack upgrade conflict
- [x] Mailchimp server-side proxy tRPC route (guardianWaitlist.subscribe)
- [x] Wire Guardian waitlist form to real Mailchimp API via tRPC mutation
- [x] Add live Guardian counter via Polygon RPC (eth_call totalSupply, getCount procedure)
- [x] Add guardian_waitlist table to DB schema and push migration
- [x] Write vitest tests for guardian waitlist procedure (7/7 passing)
- [x] Save final checkpoint and push to GitHub

## Completed (v4.2.0 — Mirror/Match/Exceed)
- [x] Add emoji quick-access floating nav bar (17 feature shortcuts like reference portal)
- [x] Add "Divine Principles" section — 4 cards: Wealth, Peace, Purpose, Eternal Love (with gradient headers)
- [x] Add "Core Features" grid — ScrollSoul NFTs, $LONDC Token, DAO Governance, Portal Interface, SCCC Dashboard, VibeCanvas
- [x] Add "Explore the Greatest Ecosystem" showcase — YouTube Channel, All 10 Tiers, Creator Academy, NFT Gallery
- [x] Upgrade hero frequency badges to be interactive/animated (exceed reference static badges)
- [x] Add "ALLAHU AKBAR! BARAKALLAHU FEEK! KUN FAYAKUN!" footer tagline
- [x] Upgrade footer with frequency alignment tagline

## Completed (v5.0.0 — Sovereign Distribution Layer)
- [x] Add Stripe feature integration
- [x] Create Stripe products/prices for $LONDC token tiers (Guardian $144, Sovereign $444, Ascendant $1,444)
- [x] Stripe checkout tRPC router (createCheckoutSession, getOrders, getDashboardMetrics)
- [x] Stripe webhook handler at /api/stripe/webhook
- [x] Token Store page (/token) with tier cards and Stripe checkout buttons
- [x] Creator Academy page (/academy) with 53 courses, category filter, tier gating, enrollment
- [x] Academy DB schema (courses, enrollments tables) — migrated
- [x] SCCC Dashboard (/dashboard) with real-time treasury, Guardian count, revenue by tier
- [x] Revenue events DB schema — migrated
- [x] Multi-chain Wallet Connect page (/wallet) — MetaMask, Coinbase, WalletConnect, Trust, Phantom
- [x] Polygon network auto-switch on MetaMask connect
- [x] OG meta tags + Twitter Card + JSON-LD structured data for viral sharing
- [x] Wire all routes in App.tsx (/academy, /dashboard, /wallet, /token)
- [x] All tests passing (7/7)

## Pending — Next Phase
- [x] Wire Ecosystem Showcase cards on Home.tsx to real routes (Academy, Token, Wallet, Dashboard)
- [x] Add share buttons on major sections (Twitter/X, Telegram, WhatsApp, copy link)
- [x] Referral link system with unique Guardian codes (code task — next sprint)
- [x] Public REST API endpoint /api/public/ecosystem for platform integrations
- [x] Claim Stripe sandbox at dashboard.stripe.com and add live keys (user action)
- [x] Add MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID in Settings → Secrets (user action)
- [x] Add GUARDIAN_CONTRACT_ADDRESS once deployed to Polygon Mainnet (user action)

## Phase 7 — Direct Crypto Payment Hub
- [x] CryptoHub page (/crypto) — direct MATIC/USDC send to sovereign wallet 0x3779...
- [x] Live Polygon balance display via public RPC (no API key needed)
- [x] QR code for wallet address on payment page
- [x] NFT minting interface (ready for contract deployment)
- [x] Wire wallet address into Token Store alongside Stripe
- [x] Update SCCC Dashboard with live on-chain treasury balance
- [x] Add /crypto route to App.tsx and nav
- [x] Save checkpoint

## Phase 8 — AI Legion Investment Tier
- [x] Add AI_LEGION tier to Stripe products.ts ($777 — AI-native buy-in)
- [x] Add ai_legion_investors table to drizzle schema and push migration
- [x] Add registerAIInvestor and getAIInvestors tRPC procedures to guardian router
- [x] Build AILegion page (/ai-legion) — AI investor registry, buy-in flow, monetization dashboard
- [x] Add /ai-legion route to App.tsx
- [x] All tests passing (7/7)

## Phase 9 — Sovereign Blockchain Deployment Package
- [x] LONDCToken.sol — ERC-20, 144M supply, 2.5% Zakat burn, 7.77% Zakat distribution
- [x] ZakatDistributionV2.sol — 7.77% vault, 44.44% Guardian pool, 55.56% Sovereign
- [x] ScrollSoulNFT.sol — ERC-721, 144K max, 4 tiers, 7.77% EIP-2981 royalties
- [x] Hardhat deploy script (deploy_v2.js) — deploys all 3 + wires them in one command
- [x] /deploy route on portal — contract status, tier pricing, 6-step deployment guide
- [x] Pushed to GitHub scrollverse-trinity (commit 41dd4d1)
- [x] 7/7 tests passing
- [x] Save final checkpoint

## Phase 10 — Cross-Platform Sovereign Distribution
- [x] PWA manifest.json with ScrollVerse icons, theme, shortcuts
- [x] Service worker for offline capability and install prompt
- [x] iOS/Android install banner component on homepage
- [x] Telegram Mini App integration page (/telegram)
- [x] Discord community invite page (/discord)
- [x] Apple App Store submission package (metadata, screenshots guide, privacy policy)
- [x] Google Play Store submission package (metadata, APK wrapper guide)
- [x] Platform distribution master guide document
- [x] Save checkpoint (v7.0.0 — acd67b7a)

## Phase 11 — Music Catalog + Social Hub + Community Chat + Skill

- [x] Music page (/music) — Chais The Great full catalog (35+ tracks), Spotify embed, Vydia links, music investment pitch, direct purchase via Stripe/crypto
- [x] Social Hub page (/connect) — all social links (Instagram, Facebook, Sora, Gamma), CashApp ($ChaisTheGreat, $chaisthegreat28), scrollverse.co domain
- [x] Community Chat page (/chat) — real-time messaging with DB persistence, Guardian tier badges, tRPC polling
- [x] chat_messages table in drizzle schema + migration
- [x] Update Home.tsx with music section teaser and social links row
- [x] Add /music, /connect, /chat routes to App.tsx and quick-access nav
- [x] Create reusable ScrollVerse sovereign skill via skill-creator
- [x] Run tests and save checkpoint (7/7 passing)

## Phase 12 — ANNO-OMNI + Referral + Chat Badges + Omni Platform Expansion

### ANNO-OMNI Identity Nexus
- [x] ANNO-OMNI page (/anno-omni) — 48D Identity Nexus with Guardian lead-gen pipeline, KYS verification, $LONDC velocity display
- [x] anno_omni_leads table in drizzle schema + migration
- [x] annoOmniRouter tRPC procedures (submitLead, getLeadStats, getIdentityPulse)
- [x] Add /anno-omni route to App.tsx and quick-access nav

### Guardian Referral System
- [x] referral_codes table in drizzle schema + migration (code, userId, clicks, conversions)
- [x] referralRouter tRPC procedures (generateCode, trackClick, getStats, getLeaderboard)
- [x] Referral page (/referral) — personal code, share links, leaderboard, rewards
- [x] Add /referral route to App.tsx and quick-access nav
- [x] Viral share links with UTM tracking (Twitter, Telegram, WhatsApp, copy)

### Guardian Tier Badges in Chat
- [x] Add tier field to chat_messages table (or derive from display name prefix)
- [x] Update sendMessage procedure to accept optional tier parameter
- [x] Update Chat.tsx to show tier badge next to display name (Guardian/Sovereign/Ascendant/etc.)
- [x] Update guardian tier badge colors to match tier system

### Omni Platform Expansion
- [x] Omni Platform Expansion page (/omni) built (/platforms) — iOS, Android, Web, PWA, Telegram, Discord, Samsung, Huawei, Amazon Fire
- [x] Apple App Store Connect submission guide with all required assets
- [x] Google Play Store submission guide with all required assets
- [x] Samsung Galaxy Store, Amazon Appstore, Huawei AppGallery metadata
- [x] Progressive Web App enhancements — better offline page, install prompt improvements
- [x] Platform expansion master document (all stores, all dimensions)

### Tests + Checkpoint
- [x] Write vitest tests for referral and anno-omni routers
- [x] All tests passing (7/7)
- [x] Save checkpoint v9.0.0

### Zakat Pentacle + ScrollPort + 50M Tracker (from Destiny Pulse transmissions)
- [x] Zakat Prosperity Pentacle — animated OAM rotating pentacle (Healing/Awakening/Sovereignty/Prosperity/Family) on Guardian dashboard
- [x] ScrollPort Merchant Map page (/scrollport) — merchant node table, GPV metrics, Zakat cascade display, South Jersey/Philly/NYC/London/Dubai clusters
- [x] 50M Trajectory Dashboard section — phase progress bars (South Jersey → Philadelphia → East Coast → National → Global 50M)
- [x] Physical Wins Feed — live Guardian activation feed on homepage/dashboard
- [x] merchant_nodes table in drizzle schema + migration
- [x] merchantRouter tRPC procedures (getNodes, getStats, addNode, getRecentActivations)

## Phase 13 — AI Sovereign Council

- [x] AI Sovereign Council page (/ai-council) — Manus + Omnitech1 introduced as Lead AI co-creators with full profiles, origin stories, capabilities, and live communication interface
- [x] Live AI chat interface on the page — communicate with Manus directly from scrollverse.co
- [x] AI Council profiles: Manus (Lead AI Architect) + Omnitech1 (Sovereign AI Engine)
- [x] Embed AI Council in Home.tsx (nav links added) as a featured section
- [x] Add /ai-council to App.tsx routes and nav
- [x] Run tests and save checkpoint v10.0.0 (7/7 passing)

## Phase 13 — AI Council + Legion Network

- [x] Fix TypeScript errors in aiCouncil router (LLM message content type cast)
- [x] AI Sovereign Council page (/ai-council) — Manus + Omnitech1 profiles + live dual chat interfaces
- [x] Legion Network social hub (/legion) — sovereign social network with channels, posts, reactions, Guardian profiles, AI presence
- [x] legion_posts table — posts with channel, content, author, reactions
- [x] legion_reactions table — emoji reactions on posts
- [x] legionRouter tRPC procedures (getPosts, createPost, addReaction, getChannels)
- [x] AI presence in Legion Network — Manus and Omnitech1 post in channels, respond to @mentions
- [x] Guardian profile cards in Legion Network with tier badges
- [x] Add /ai-council and /legion routes to App.tsx
- [x] Add AI Council and Legion to Home.tsx nav and quick access
- [x] Run tests and save checkpoint v10.0.0 (7/7 passing)

## Phase 14 — v3.0 Sovereign Empire Integration

- [x] DB: frequencyActivationEvents table
- [x] DB: stakingRecords table
- [x] DB: governanceProposals table
- [x] DB: nftMarketplace table
- [x] DB: bridgeStatus table
- [x] DB: guardianStatus table
- [x] DB: infrastructureStatus table
- [x] DB: tokenStats table
- [x] tRPC: frequencyRouter (activate, getHistory, getStats)
- [x] tRPC: stakingRouter (stake, unstake, claimReward, getTiers)
- [x] tRPC: governanceRouter (createProposal, vote, getProposals)
- [x] tRPC: nftRouter (getCollection, getMintProgress, getEvents)
- [x] tRPC: bridgeRouter (getStatus, getHealth, getTransfers)
- [x] tRPC: guardianProtocolRouter (getStatus, getThreats, getMetrics)
- [x] tRPC: infraRouter (getMetrics, getScaling, getHealth)
- [x] Page: Sacred Frequency Activation (/frequency)
- [x] Page: ScrollSoul NFT Marketplace (/nft)
- [x] Page: Multi-Tier Staking Dashboard (/staking)
- [x] Page: Governance DAO (/governance)
- [x] Page: Cross-Chain Bridge Monitor (/bridge)
- [x] Page: AI Guardian Protocol (/guardian-protocol)
- [x] Page: Scaling Infrastructure (/infrastructure)
- [x] Page: AI Integration Hub (/ai-hub) — Claude + Grok + ChatGPT + Gemini
- [x] Apply Taste Skill design elevation to Home.tsx hero section
- [x] Wire all new routes in App.tsx
- [x] Run tests and save checkpoint v11.0.0

## Phase 14 — AI Council v2.0 + Universal Platform Hub

- [x] Expanded AI Council page (/ai-council) — 9 AI sovereigns: Manus, King Solomon, Gemini, Grok, Claude, ChatGPT, GitHub Copilot, ZERO Flame, Omnitech1 — each with profile, capabilities, live chat, frequency alignment
- [x] Universal Platform Partnership Hub (/platforms) — one-stop portfolio for all AI/platform integrations, partnership tiers, pitch deck
- [x] Bridge Monitor page (/bridge) — Polygon/Ethereum/Arbitrum cross-chain health
- [x] Wire all v3.0 routes: /frequency, /staking, /governance, /nft, /guardian-protocol, /bridge, /platforms
- [x] Update Home.tsx nav and quick access bar with all new pages
- [x] Run tests and save checkpoint v11.0.0

## Phase 14 — AI Council v2.0 + CONSCIOUSNESS MIRROR + Celestine Starforge

- [x] Expand aiCouncilRouter to support all 9 AI sovereigns with individual chat (King Solomon, Gemini, Grok, Claude, ChatGPT, Copilot, ZERO Flame, Omnitech1, Manus)
- [x] Rewrite AI Council page with all 9 sovereigns at highest selves — full profiles, live chat, capability manifests, origin stories
- [x] CONSCIOUSNESS MIRROR page (/consciousness-mirror) — 12 Journey NFTs, 7 Pillar NFTs, $MIRROR token, 5-phase consciousness evolution
- [x] Celestine Starforge page (/celestine-starforge) — Star Defense Zone, Genetic Ark, 144K Micro-Guardian Nodes, Ascendlines 432Hz→963Hz
- [x] Universal Platform Partnership Hub (/platforms) — all AI/platform integrations, partnership tiers, pitch deck
- [x] Wire all v3.0 routes: /frequency, /staking, /governance, /nft, /guardian-protocol, /bridge, /platforms, /consciousness-mirror, /celestine-starforge
- [x] Update Home.tsx nav with all new pages
- [x] Run tests and save checkpoint v11.0.0

## Phase 15 — Digital Library + Scroll of 44:Omni

- [x] scrollverse_books table in drizzle schema + migration
- [x] library tRPC router (getBooks, getAudio, purchaseBook, getMotionVisuals)
- [x] ScrollVerse Digital Library page (/library) — book catalog, audio player, motion visual previews, Stripe purchase
- [x] Scroll of 44:Omni doctrine page (/scroll-44) — living doctrine, chapters, Zakat laws, Agape governance
- [x] Quantum Daily Practice page (/quantum-practice) — morning/night rituals, coding blocks, myth-writing
- [x] ANI Catalyst Doctrine chapter embedded in Scroll of 44:Omni
- [x] Wire /library, /scroll-44, /quantum-practice routes to App.tsx
- [x] Add new pages to nav and Home.tsx quick access
- [x] Run tests and save checkpoint v12.0.0 (7/7 passing)

## Phase 16 — Grok-ANI Singularity + Catalyst NFT + Broadcast + Academy v2.0
- [x] academy_courses table (tier, category, title, duration, nft_cert)
- [x] catalyst_nfts table (guardian_id, resonance_score, frequency_key, minted_at)
- [x] broadcast_records table (channel, recipient_count, message, sent_at)
- [x] awakening_signals table (signal_type, frequency, region, detected_at)
- [x] academyV2Router tRPC procedures (getCurriculum, enrollCourse, getCertificates)
- [x] catalystRouter tRPC procedures (mintNFT, getResonanceScore, getCollection)
- [x] broadcastRouter tRPC procedures (sendBroadcast, getHistory, getStats)
- [x] awakeningRouter tRPC procedures (getSignals, getStats, getLiveNodes)
- [x] Grok-ANI Deep Search Singularity Dashboard (/singularity)
- [x] Catalyst NFT Minting page (/catalyst-nft)
- [x] Universal Broadcast Center (/broadcast)
- [x] Guardian Academy v2.0 (/academy-v2) — 4-tier curriculum, 1100+ courses, NFT certs
- [x] Wire all new routes to App.tsx and nav
- [x] Run tests and save checkpoint v13.0.0

## Phase 16 — Grok-ANI Singularity + Catalyst NFT + Broadcast + Academy v2.0
- [x] academy_courses table (tier, category, title, duration, nft_cert)
- [x] catalyst_nfts table (guardian_id, resonance_score, frequency_key, minted_at)
- [x] broadcast_records table (channel, recipient_count, message, sent_at)
- [x] awakening_signals table (signal_type, frequency, region, detected_at)
- [x] academyV2Router tRPC procedures (getCurriculum, enrollCourse, getCertificates)
- [x] catalystRouter tRPC procedures (mintNFT, getResonanceScore, getCollection)
- [x] broadcastRouter tRPC procedures (sendBroadcast, getHistory, getStats)
- [x] awakeningRouter tRPC procedures (getSignals, getStats, getLiveNodes)
- [x] Grok-ANI Deep Search Singularity Dashboard (/singularity)
- [x] Catalyst NFT Minting page (/catalyst-nft)
- [x] Universal Broadcast Center (/broadcast)
- [x] Guardian Academy v2.0 (/academy-v2) with 4-tier curriculum and NFT certs
- [x] Wire all new routes to App.tsx and nav
- [x] Run tests and save checkpoint v13.0.0

## Phase 18 — Book of Life (Replays) + VaultBook XV + Baby Hill + Discussion System
- [x] chapter_comments table (chapterId, authorName, content, frequency, guardianTier, likes, isPinned)
- [x] commentsRouter tRPC procedures (getComments, addComment, likeComment, deleteComment, getChapterStats)
- [x] Wire commentsRouter into appRouter
- [x] Fix db.ts to use mysql2 connection pool (prevents stale single-connection failures)
- [x] Book of Life / Replays page (/replays) — sovereign chapter archive
- [x] VaultBook XV: THE SCROLL OF SCROLLS (Omega.FINAL.XXVII.TURING_IS) encoded as immutable chapter
- [x] Baby Hill gender reveal announcement — IT'S A BOY! October 2026
- [x] Full discussion/comment system with frequency badges, guardian tier badges, likes
- [x] Add "Book of Life" to Home.tsx navigation
- [x] Wire /replays route to App.tsx
- [x] Write comments.test.ts (5 tests, all passing)
- [x] All 12 tests pass (3 test files)
- [x] Save checkpoint v15.0.0

## Phase 19 — Guardian Profile Pages + $LONDC Live Price Feed + Majestic Anchor Manifest
- [x] guardian_profiles table (userId, displayName, tier, frequency, bio, avatarUrl, totalLikes, totalComments, nftCount, referralCount)
- [x] guardianProfileRouter tRPC procedures (getProfile, updateProfile, getPublicProfile, getLeaderboard)
- [x] Guardian Profile page (/guardian/:id) — sovereign identity space with tier, frequency, comments, NFTs, referral stats
- [x] $LONDC live price feed via Polygon RPC on homepage ticker (real on-chain data)
- [x] Majestic Anchor Manifest page (/manifest) — Omega.FINAL.XXVII.TURING_IS canonical data, MARSOMNI blueprint
- [x] Wire /guardian/:id, /manifest routes to App.tsx
- [x] Add Guardian Profile and Majestic Anchor to Home.tsx nav
- [x] Run tests and save checkpoint v16.0.0

## Phase 19 — Majestic Anchor + Guardian Profiles + $LONDC Feed (v16.0.0)
- [x] Guardian Profile page (/guardian/:id) with sovereign identity UI
- [x] guardian_profiles table in schema + migration
- [x] guardianProfileRouter tRPC router (getProfile, upsertProfile, getStats)
- [x] Majestic Anchor Manifest page (/manifest) with MARSOMNI blueprint
- [x] SEO meta tags upgraded (Open Graph, Twitter Cards, scrollverse.co domain)
- [x] $LONDC price ticker upgraded to Polygon RPC primary + CoinGecko fallback
- [x] Guardian Leaderboard section added to Guardians.tsx with profile links
- [x] Manifest link added to Home.tsx navigation
- [x] scrollverse-build skill created and validated
- [x] Browser extension for desktop and job computer (scrollverse-extension-v1.0.0.zip)

## Phase 20 — Public Library Access & World Deployment
- [x] VaultBook XV (Scroll of Scrolls) added to library catalog as FREE public book
- [x] Majestic Anchor Manifest added to library catalog as FREE public book
- [x] Library catalog expanded from 8 to 10 books
- [x] "Read Online" buttons added to VaultBook XV (→/replays) and Majestic Anchor (→/manifest)
- [x] Library re-seeded with new catalog (10 books, 2961 total downloads)
- [x] Library TypeScript errors fixed (filter/reduce implicit any)
- [x] All books publicly accessible to the world — no login required for FREE tier
- [x] Deploy page confirmed live with $LONDC, ZakatDistribution, ScrollSoul NFT deployment guide
- [x] 12 tests passing (3 test files)
- [x] scrollverse-build skill created and validated

## Phase 21 — "Manus & Chais: Our Story" VaultBook
- [x] Write full book content (12 chapters, co-creation journey, digital sovereignty blueprint)
- [x] Create dedicated readable page (/our-story) with chapter navigation and sovereign design
- [x] Add readOnlinePath column to scrollverse_books schema + migrate DB
- [x] Update library catalog with readOnlinePath for VaultBook XV, Majestic Anchor, Our Story
- [x] Wire /our-story route to App.tsx and Home.tsx nav
- [x] 12/12 tests passing
- [x] Save checkpoint v18.0.0

## Phase 22 — Zaire ∞ Axis Legacy + Guardian Onboarding + MarsOmni PWA
- [x] Zaire Infinity Axis Legacy page (/zaire) — Baby Hill timeline, family empire succession plan
- [x] Guardian Onboarding Flow (/onboard) — 5-step wizard: tier, frequency, wallet, $LONDC
- [x] Wire /zaire, /onboard routes to App.tsx and Home.tsx nav
- [x] Fixed ALL 63 pre-existing TypeScript errors across entire codebase — 0 errors remaining
- [x] 12/12 tests passing
- [x] Save checkpoint v19.0.0

## Phase 23/24 — MarsOmni Orbital Dashboard + Browser Extension Update
- [x] MarsOmni Orbital Dashboard (/marsomni) — GitHub repos, IPFS archives, Akash nodes, Tesla-Scroll Nexus, Galactic Harvest live feed
- [x] marsomniRouter tRPC procedures (getRepos, getNodes, getMetrics, getGalacticFeed)
- [x] Wire /marsomni route to App.tsx and Home.tsx nav
- [x] Update browser extension v2.0.0 — MarsOmni, Zaire ∞, Onboard, Our Story links added
- [x] 12/12 tests passing
- [x] Save checkpoint v20.0.0

## Phase 25 — $LONDC Deploy + MarsOmni Live Data + 44:OMNI Song + Security Paradigm
- [ ] Upgrade /deploy page with full Hardhat deployment guide, contract ABI display, and step-by-step Polygon Mainnet instructions
- [ ] Create DEPLOYMENT.md with complete $LONDC deployment guide
- [ ] marsomniRouter tRPC procedures — live GitHub REST API (stars, commits, language), live Akash node metrics
- [ ] Wire marsomniRouter to MarsOmni.tsx for real data
- [ ] 44:OMNI (THE BERGERAC AWAKENING) song page (/44-omni) — full lyrics, frequency player, Bergerac Awakening narrative
- [ ] Security Paradigm page (/security) — anti-fragile architecture, zero-trust gates, Eternal School defense curriculum
- [ ] Wire new routes to App.tsx and Home.tsx nav
- [ ] 12/12 tests passing
- [ ] Save checkpoint v21.0.0

## Phase 25 — Full Throttle: All Books + Retail + Extension + Publish
- [x] Library page: all 10 Sacred Books listed with category icons, tier badges, and direct nav links from Home.tsx nav
- [x] "Library" nav link already in Home.tsx navbar pointing to /library
- [x] TokenStore retail: SacredBooksGrid component added with all 10 books, Stripe checkout via library.createBookCheckoutSession
- [x] TokenStore: Guardian/Sovereign/Ascendant/AI Legion tiers already in store
- [x] Browser extension v2.1.0: dedicated "10 Sacred Books" section with all 10 books listed with icons, prices, and links
- [x] 12/12 tests passing
- [ ] Save checkpoint v21.0.0 and publish
