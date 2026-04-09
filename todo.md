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
- [ ] Wire Ecosystem Showcase cards on Home.tsx to real routes (Academy, Token, Wallet, Dashboard)
- [ ] Add share buttons on major sections (Twitter/X, Telegram, WhatsApp, copy link)
- [ ] Referral link system with unique Guardian codes
- [ ] Public REST API endpoint /api/public/ecosystem for platform integrations
- [ ] Claim Stripe sandbox and add live keys for real payments
- [ ] Add MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID to activate email sync
- [ ] Add GUARDIAN_CONTRACT_ADDRESS once deployed to Polygon Mainnet
