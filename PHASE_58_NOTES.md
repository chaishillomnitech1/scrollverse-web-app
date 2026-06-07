# Phase 58 Five-Vector Integration Notes

## 5 Vectors (All Execute Simultaneously)
1. Vector 1: Notifications tRPC Router (Guardian Alerts, Real-time Updates)
2. Vector 2: Casino tRPC Router (Slots, Spin Wheel, Scratch Cards, Lose-to-Earn, Jackpots)
3. Vector 3: SynterAnalytics Routes (Data Visualization, Analytics Dashboard)
4. Vector 4: MassiveStorage Routes (File Upload/Download Integration)
5. Vector 5: App.tsx Registration & Maximum Integration Wiring

## Vector 1: Notifications Router Pattern (from PDF)
- Uses getDb() pattern
- Procedures: getAll, getUnreadCount, markAsRead, createGuardianAlert, createCasinoWin, createStreamReward, delete, clearRead
- All use publicProcedure (not protectedProcedure) with userId as input
- Notification types: guardian_alert, casino_win, stream_reward

## Vector 2: Casino Router Pattern (from PDF)
- Uses getDb() pattern
- Procedures: playSlots, playSpinWheel, playScratchCard, getJackpot, getUserStats
- Provably fair: crypto.randomBytes(32).toString("hex") + createHash("sha256").update(seed).digest("hex")
- Slots: 35% win rate, 1-5x multiplier
- Spin Wheel: 8 segments [0, 0.5, 1, 1.5, 2, 3, 5, 10] multipliers (lose-to-earn included)
- Scratch Card: 40% win rate, 1-10x multiplier
- Jackpot: updated when multiplier >= 4 (10% of winAmount added to pool)

## Vector 3: SynterAnalytics Routes (Express Router)
- File: server/routes/synteranalytics.ts
- Uses express.Router() (not tRPC)
- Routes: GET /dashboard, GET /campaigns, POST /track
- Dashboard: totalUsers, totalSessions, totalRevenue, timeSeries (30 days)
- Campaigns: from synterAds.ts getCampaigns()
- Track: POST event tracking

## Vector 4: MassiveStorage Routes (Express Router)
- File: server/routes/massive.ts
- Routes: POST /upload, GET /files, DELETE /files/:key
- Uses massiveStorage.ts helpers

## Vector 5: App.tsx
- Register all new routes: /casino, /notifications, /synter-analytics, /massive-storage
- Add notification bell to navbar
- Wire NotificationBell component

## Additional Requests from User
- WebSocket real-time notifications
- Zero-knowledge proof gaming (Groth16)
- Multi-sig treasury
- Fractional NFT land deeds (ERC-1155)
- KYC compliance layer
- ERC-4626 yield strategies
- ERC-6551 token bound accounts
- Decentralized identity protocols
- Casino backed by portfolio assets
- Galactic franchise (hotel/AirBnB in cosmic space)
- Waitlist pre-payments
- Synter Ads deeper integration
- GTM configuration export

## Status
- casino_sessions table: LIVE in DB
- casino_jackpot table: LIVE in DB
- notifications table: LIVE in DB
- casino.ts router: WRITTEN (needs getDb fix done)
- notifications.ts router: WRITTEN (needs db usage fix)
- Need: fix use-toast import in MassiveStorage.tsx and SynterAnalytics.tsx
- Need: fix synter.ts argument count error
- Need: register all routes in routers.ts and App.tsx
- Need: build Casino frontend page
- Need: build NotificationBell component
