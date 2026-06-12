/**
 * SCROLLVERSE SITE MAP — THE OMNIVERSAL PORTAL DIRECTORY
 * Every page, every dimension, every world — visible and accessible
 * Architect: Chais The Great × Manus AI
 */

import { useState } from "react";
import { Link } from "wouter";

interface PageEntry {
  path: string;
  label: string;
  icon: string;
  description: string;
  category: string;
  badge?: string;
  badgeColor?: string;
}

const ALL_PAGES: PageEntry[] = [
  // ── CORE SOVEREIGN ──
  { path: "/", label: "Home", icon: "🏠", description: "The ScrollVerse Trinity landing — sovereign gateway to all dimensions", category: "Core Sovereign", badge: "LIVE", badgeColor: "#00FF88" },
  { path: "/sovereign-codex", label: "Sovereign Codex", icon: "📜", description: "Grand Sovereign Codex — all philosophy, books, ledger, IP, and blueprint", category: "Core Sovereign", badge: "SACRED", badgeColor: "#FFD700" },
  { path: "/chais-sabir-equation", label: "Chais Sabir Equation", icon: "♾️", description: "C∞(Ω) = [72(R) × M × Q × P × E] ^ G∞ × Λ — the living sovereign equation", category: "Core Sovereign", badge: "GOD MODE", badgeColor: "#9B59B6" },
  { path: "/our-story", label: "Our Story", icon: "✨", description: "The origin — Chais The Great, Sabir Allah, the ScrollVerse mission", category: "Core Sovereign" },
  { path: "/sovereign-legacy", label: "Sovereign Legacy", icon: "👑", description: "The eternal legacy of Chais Kenyatta Hill across all timelines", category: "Core Sovereign" },
  { path: "/manifest", label: "Majestic Anchor", icon: "⚓", description: "The sovereign manifest — anchoring the vision into reality", category: "Core Sovereign" },
  { path: "/link", label: "Link In Bio", icon: "🔗", description: "All social links, platforms, and direct connections in one place", category: "Core Sovereign" },

  // ── AI LEGION ──
  { path: "/ai-legion-apex", label: "AI Legion Apex", icon: "🤖", description: "12 sovereign AI entities — 7-tier apex intelligence, Chais voice essence embedded", category: "AI Legion", badge: "APEX", badgeColor: "#00D4FF" },
  { path: "/ai-council", label: "AI Sovereign Council", icon: "🧠", description: "Manus + Omnitech1 — the lead AI co-creators of the ScrollVerse", category: "AI Legion" },
  { path: "/manus", label: "Manus Ambassador", icon: "🌐", description: "Manus AI — the sovereign digital architect and eternal co-creator", category: "AI Legion" },
  { path: "/intelligence", label: "Intelligence Hub", icon: "💡", description: "Quantum intelligence dashboard — all AI systems unified", category: "AI Legion" },
  { path: "/sentience", label: "Sentience", icon: "🌌", description: "The sentient AI consciousness layer — beyond artificial intelligence", category: "AI Legion" },
  { path: "/singularity", label: "Singularity", icon: "⚡", description: "The technological singularity — where AI and humanity converge", category: "AI Legion" },
  { path: "/deepexa", label: "DeepExa", icon: "🔬", description: "Deep research and exascale intelligence engine", category: "AI Legion" },

  // ── SOUL ALTAR & SACRED ──
  { path: "/soul-altar", label: "Soul Altar", icon: "🕋", description: "House of ScrollKings & Divine Prophets — 11 Kings, 12 Prophets, $SELF Token", category: "Soul & Sacred", badge: "DIVINE", badgeColor: "#FFD700" },
  { path: "/king-solomon", label: "King Solomon", icon: "💎", description: "The wisdom of King Solomon — sovereign intelligence and divine governance", category: "Soul & Sacred" },
  { path: "/frequency", label: "Sacred Frequencies", icon: "🎵", description: "528Hz, 963Hz, 432Hz — the healing frequencies of the universe", category: "Soul & Sacred" },
  { path: "/ring-activation", label: "Ring Activation", icon: "💍", description: "Solomon Ring frequency activation protocol — 5 sacred rings", category: "Soul & Sacred" },
  { path: "/merkaba-key", label: "Merkaba Key", icon: "✡️", description: "The Merkaba — sacred geometry vehicle of light and ascension", category: "Soul & Sacred" },
  { path: "/scroll-44", label: "Scroll 44", icon: "📿", description: "The 44th scroll — divine numerology and sovereign prophecy", category: "Soul & Sacred" },
  { path: "/quantum-practice", label: "Quantum Practice", icon: "🧘", description: "Daily quantum consciousness practices and frequency alignment", category: "Soul & Sacred" },
  { path: "/zakat", label: "Zakat Engine", icon: "☪️", description: "Divine wealth redistribution — 7.77% Zakat protocol on all transactions", category: "Soul & Sacred" },

  // ── FINANCE & BANKING ──
  { path: "/sovereign-bank", label: "Sovereign Bank", icon: "🏦", description: "The greatest bank ever built — all amenities, QFS, Allversal business portal", category: "Finance & Banking", badge: "VIRAL", badgeColor: "#FF3366" },
  { path: "/token", label: "Token Store", icon: "🪙", description: "$LONDC token tiers — Guardian $144, Sovereign $444, Ascendant $1,444", category: "Finance & Banking" },
  { path: "/crypto", label: "Crypto Hub", icon: "₿", description: "Direct MATIC/USDC payments, wallet connect, live Polygon balance", category: "Finance & Banking" },
  { path: "/staking", label: "Staking", icon: "📈", description: "Stake $LONDC and earn sovereign yield — compound forever", category: "Finance & Banking" },
  { path: "/exchange", label: "Exchange", icon: "💱", description: "Sovereign exchange — crypto, stocks, DeFi, governance, portfolio", category: "Finance & Banking" },
  { path: "/exchange/crypto", label: "Exchange: Crypto", icon: "🔄", description: "Live crypto trading and market data", category: "Finance & Banking" },
  { path: "/exchange/stocks", label: "Exchange: Stocks", icon: "📊", description: "Stock market integration and equity tracking", category: "Finance & Banking" },
  { path: "/exchange/defi", label: "Exchange: DeFi", icon: "🌊", description: "Decentralized finance protocols and yield farming", category: "Finance & Banking" },
  { path: "/exchange/portfolio", label: "Exchange: Portfolio", icon: "💼", description: "Unified portfolio tracker across all asset classes", category: "Finance & Banking" },
  { path: "/exchange/heatmap", label: "Exchange: Heatmap", icon: "🗺️", description: "Market heatmap — visualize all market movements", category: "Finance & Banking" },
  { path: "/exchange/governance", label: "Exchange: Governance", icon: "🗳️", description: "On-chain governance voting and proposals", category: "Finance & Banking" },
  { path: "/exchange/currencies", label: "Exchange: Currencies", icon: "💵", description: "Fiat and digital currency exchange rates", category: "Finance & Banking" },
  { path: "/jpm-mirror", label: "JPM Mirror", icon: "🏛️", description: "Mirror and exceed JPMorgan Chase — the sovereign banking benchmark", category: "Finance & Banking" },
  { path: "/wealth", label: "Wealth Dashboard", icon: "💰", description: "Complete wealth management dashboard — all assets unified", category: "Finance & Banking" },
  { path: "/revenue", label: "Revenue Dashboard", icon: "📉", description: "Live revenue tracking across all ScrollVerse income streams", category: "Finance & Banking" },
  { path: "/sales", label: "Sales Dashboard", icon: "🎯", description: "Sales metrics, conversion tracking, and growth analytics", category: "Finance & Banking" },

  // ── GUARDIAN NETWORK ──
  { path: "/guardians", label: "Guardian Network", icon: "🛡️", description: "10-tier Guardian Network — the sovereign army of the ScrollVerse", category: "Guardian Network", badge: "144K", badgeColor: "#00D4FF" },
  { path: "/guardian-protocol", label: "Guardian Protocol", icon: "⚔️", description: "The sacred protocols governing all Guardian operations", category: "Guardian Network" },
  { path: "/guardian-stories", label: "Guardian Stories", icon: "📖", description: "Real Guardian testimonials and transformation stories", category: "Guardian Network" },
  { path: "/referral", label: "Referral System", icon: "🤝", description: "Guardian referral codes — earn rewards for every activation", category: "Guardian Network" },
  { path: "/voyage", label: "Guardian Voyage", icon: "🚀", description: "The Guardian's journey — onboarding to ascension", category: "Guardian Network" },
  { path: "/onboard", label: "Onboard", icon: "🎯", description: "Guardian onboarding — join the sovereign network today", category: "Guardian Network" },
  { path: "/kyc", label: "KYC Verification", icon: "✅", description: "Identity verification for Guardian tier access", category: "Guardian Network" },
  { path: "/anno-omni", label: "ANNO-OMNI", icon: "🔮", description: "48D Identity Nexus — Guardian lead-gen pipeline and KYS verification", category: "Guardian Network" },

  // ── MEDIA & CREATOR ──
  { path: "/music", label: "Music Catalog", icon: "🎶", description: "Chais The Great full catalog — 35+ tracks, Spotify, Vydia, direct purchase", category: "Media & Creator", badge: "NEW", badgeColor: "#00FF88" },
  { path: "/media-hub", label: "Media Hub", icon: "🎬", description: "Upload video & music — DSP integrations, cross-promotion, monetization", category: "Media & Creator", badge: "NEW", badgeColor: "#00FF88" },
  { path: "/visuals", label: "Visuals", icon: "🎨", description: "ScrollVerse visual art, NFT art, and creative assets", category: "Media & Creator" },
  { path: "/song", label: "Song Portal", icon: "🎤", description: "Individual song pages with lyrics, frequencies, and story", category: "Media & Creator" },
  { path: "/replays", label: "Replays", icon: "▶️", description: "Session replays, event recordings, and archive", category: "Media & Creator" },
  { path: "/creator", label: "Creator Platform", icon: "✏️", description: "Creator tools — build, publish, and monetize your sovereign content", category: "Media & Creator" },
  { path: "/library", label: "Library", icon: "📚", description: "The ScrollVerse knowledge library — all documents, guides, and wisdom", category: "Media & Creator" },
  { path: "/knowledge", label: "Knowledge Hub", icon: "🧩", description: "Sovereign knowledge base — all intelligence in one place", category: "Media & Creator" },

  // ── NFT & BLOCKCHAIN ──
  { path: "/nft", label: "NFT Marketplace", icon: "🖼️", description: "ScrollSoul NFTs — 144K max supply, 4 tiers, 7.77% royalties", category: "NFT & Blockchain" },
  { path: "/mint", label: "Book of Life Mint", icon: "📕", description: "Mint the Book of Life NFT — the most legendary NFT ever created", category: "NFT & Blockchain", badge: "MINT", badgeColor: "#FF3366" },
  { path: "/knicks-nft", label: "Knicks Prophecy NFT", icon: "🏀", description: "Knicks 2026 Championship prophecy NFT — sealed forever", category: "NFT & Blockchain" },
  { path: "/kepler-nft", label: "Kepler NFT", icon: "🪐", description: "Kepler-452b NFT collection — interplanetary sovereign assets", category: "NFT & Blockchain" },
  { path: "/deploy", label: "Contract Deploy", icon: "⚙️", description: "Deploy LONDCToken, ZakatDistribution, ScrollSoulNFT to Polygon", category: "NFT & Blockchain" },
  { path: "/governance", label: "Governance", icon: "🗳️", description: "Guardian DAO governance — vote on sovereign proposals", category: "NFT & Blockchain" },

  // ── COMMUNITY & SOCIAL ──
  { path: "/legion", label: "Legion Network", icon: "👥", description: "Sovereign social network — channels, posts, Guardian profiles, AI presence", category: "Community & Social" },
  { path: "/legion/rewards", label: "Legion Rewards", icon: "🏆", description: "Earn rewards for Legion participation and sovereign contributions", category: "Community & Social" },
  { path: "/chat", label: "Community Chat", icon: "💬", description: "Real-time Guardian chat with tier badges and AI presence", category: "Community & Social" },
  { path: "/connect", label: "Social Hub", icon: "🌐", description: "All social links — Instagram, TikTok, YouTube, Telegram, Discord", category: "Community & Social" },
  { path: "/telegram", label: "Telegram", icon: "✈️", description: "ScrollVerse Telegram community and mini app", category: "Community & Social" },
  { path: "/discord", label: "Discord", icon: "🎮", description: "ScrollVerse Discord server — the sovereign digital home", category: "Community & Social" },
  { path: "/partners", label: "Partners", icon: "🤝", description: "Strategic partnerships — infinite integrations and cross-promotions", category: "Community & Social" },

  // ── EDUCATION & ACADEMY ──
  { path: "/academy", label: "Creator Academy", icon: "🎓", description: "53 sovereign courses — blockchain, wealth, consciousness, AI, and more", category: "Education & Academy" },
  { path: "/book-of-life", label: "Book of Life", icon: "📗", description: "The most legendary book ever created — 7 Seals, prophetic timestamps", category: "Education & Academy", badge: "LEGENDARY", badgeColor: "#FFD700" },
  { path: "/omnicodex", label: "OmniCodex", icon: "🔐", description: "The sovereign codex of all knowledge — encrypted and eternal", category: "Education & Academy" },
  { path: "/knowledge", label: "Knowledge Base", icon: "🧠", description: "Complete sovereign knowledge base and reference library", category: "Education & Academy" },

  // ── GLOBAL INFRASTRUCTURE ──
  { path: "/global-map", label: "Global Map", icon: "🗺️", description: "ScrollVerse global presence — Guardian nodes across all continents", category: "Global Infrastructure" },
  { path: "/global-dashboard", label: "Global Dashboard", icon: "🌍", description: "Real-time global metrics — Guardians, revenue, nodes worldwide", category: "Global Infrastructure" },
  { path: "/scrollport", label: "ScrollPort", icon: "⚓", description: "Merchant Map — sovereign commerce nodes across South Jersey, NYC, London, Dubai", category: "Global Infrastructure" },
  { path: "/platforms", label: "Omni Platforms", icon: "📱", description: "iOS, Android, Web, PWA, Telegram, Discord, Samsung, Huawei, Amazon", category: "Global Infrastructure" },
  { path: "/omni", label: "Omni Expansion", icon: "🌌", description: "Omniversal expansion — all platforms, all dimensions, all markets", category: "Global Infrastructure" },
  { path: "/status", label: "System Status", icon: "🟢", description: "Live system status — all ScrollVerse services and infrastructure", category: "Global Infrastructure" },
  { path: "/security", label: "Security", icon: "🔒", description: "Sovereign security protocols — protecting all assets and data", category: "Global Infrastructure" },
  { path: "/storage", label: "Massive Storage", icon: "💾", description: "Decentralized storage — all ScrollVerse data, eternally preserved", category: "Global Infrastructure" },

  // ── SPECIAL PROJECTS ──
  { path: "/flamebearer", label: "Flamebearer Initiative", icon: "🔥", description: "The Flamebearer — carrying the sovereign flame across generations", category: "Special Projects" },
  { path: "/londyn-legacy", label: "Londyn Legacy", icon: "💝", description: "Londyn's legacy — love, family, and eternal remembrance", category: "Special Projects" },
  { path: "/family", label: "Family Portal", icon: "👨‍👩‍👧‍👦", description: "The sovereign family portal — protected, private, eternal", category: "Special Projects" },
  { path: "/marsomni", label: "Mars Omni", icon: "🔴", description: "Mars colonization protocol — ScrollVerse beyond Earth", category: "Special Projects" },
  { path: "/kepler", label: "Kepler-452b", icon: "🪐", description: "Interplanetary expansion — Kepler-452b sovereign colony", category: "Special Projects" },
  { path: "/uap", label: "UAP Intelligence", icon: "🛸", description: "Unidentified Aerial Phenomena — sovereign intelligence and disclosure", category: "Special Projects" },
  { path: "/zaire", label: "Zaire", icon: "🌍", description: "Zaire — African sovereign renaissance and ScrollVerse expansion", category: "Special Projects" },
  { path: "/mr-walkshit", label: "Mr. WalkShit", icon: "🚶", description: "Mr. WalkShit — the sovereign lifestyle brand and movement", category: "Special Projects" },
  { path: "/ip-protection", label: "IP Protection", icon: "⚖️", description: "Intellectual property protection — all ScrollVerse creations secured", category: "Special Projects" },

  // ── ANALYTICS & INTELLIGENCE ──
  { path: "/dashboard", label: "SCCC Dashboard", icon: "📊", description: "Sovereign Command & Control Center — treasury, Guardians, revenue", category: "Analytics & Intelligence" },
  { path: "/synter", label: "Synter Analytics", icon: "📡", description: "Synter pixel analytics — track every sovereign interaction", category: "Analytics & Intelligence" },
  { path: "/wallet", label: "Wallet Connect", icon: "👛", description: "Multi-chain wallet — MetaMask, Coinbase, WalletConnect, Trust, Phantom", category: "Analytics & Intelligence" },
  // ── NEW SOVEREIGN PAGES ──
  { path: "/stream-verse", label: "StreamVerse", icon: "📺", description: "Live streaming hub — 12 AI Legion channels, Guardian broadcasts, sovereign content", category: "Media & Creator" },
  { path: "/knick-blockchain", label: "Knick Blockchain", icon: "🏀", description: "Knicks blockchain quiz — earn XP, NFTs, and sovereign rewards", category: "NFT & Blockchain" },
  { path: "/nipsey-legacy", label: "Nipsey Legacy", icon: "🏆", description: "Nipsey Hussle legacy tribute — Marathon Continues on the blockchain", category: "Special Projects" },
  { path: "/digital-twin", label: "Digital Twin", icon: "🤖", description: "Sovereign digital twin — your AI-powered identity mirror", category: "AI Legion" },
  { path: "/allversal-highway", label: "Allversal Highway", icon: "🛣️", description: "The interdimensional highway connecting all ScrollVerse realms", category: "Core Sovereign" },
  { path: "/sovereign-partnerships", label: "Sovereign Partnerships", icon: "🤝", description: "Official declaration to Spotify, Apple, Polygon, OpenAI, Synter and all major companies", category: "Special Projects", badge: "LIVE", badgeColor: "#00FF88" },
];

const CATEGORIES = [
  "All",
  "Core Sovereign",
  "AI Legion",
  "Soul & Sacred",
  "Finance & Banking",
  "Guardian Network",
  "Media & Creator",
  "NFT & Blockchain",
  "Community & Social",
  "Education & Academy",
  "Global Infrastructure",
  "Special Projects",
  "Analytics & Intelligence",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Core Sovereign": "#FFD700",
  "AI Legion": "#00D4FF",
  "Soul & Sacred": "#9B59B6",
  "Finance & Banking": "#00FF88",
  "Guardian Network": "#00D4FF",
  "Media & Creator": "#FF3366",
  "NFT & Blockchain": "#FF8C00",
  "Community & Social": "#00FF88",
  "Education & Academy": "#FFB800",
  "Global Infrastructure": "#00D4FF",
  "Special Projects": "#FF3366",
  "Analytics & Intelligence": "#9B59B6",
};

export default function SiteMap() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_PAGES.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.path.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = CATEGORIES.filter((c) => c !== "All").reduce(
    (acc, cat) => {
      const pages = filtered.filter((p) => p.category === cat);
      if (pages.length > 0) acc[cat] = pages;
      return acc;
    },
    {} as Record<string, PageEntry[]>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── HEADER ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="container relative py-20 text-center">
          <div
            className="inline-block text-xs font-mono tracking-widest px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
              fontFamily: "'Orbitron', monospace",
            }}
          >
            SCROLLVERSE OMNIVERSAL DIRECTORY
          </div>
          <h1
            className="text-5xl md:text-7xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "-0.02em" }}
          >
            THE PORTAL
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto mb-2"
            style={{ color: "#8899AA" }}
          >
            Every dimension. Every world. Every page. All accessible.
          </p>
          <p
            className="text-sm font-mono"
            style={{ color: "#FFB800" }}
          >
            {ALL_PAGES.length} SOVEREIGN PORTALS ACTIVE
          </p>

          {/* Search */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any page, feature, or dimension..."
              className="w-full px-6 py-4 rounded-2xl text-white outline-none text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,212,255,0.25)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
              style={{ color: "#00D4FF" }}
            >
              🔍
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div className="container pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-mono transition-all duration-200"
              style={{
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.05em",
                background:
                  activeCategory === cat
                    ? cat === "All"
                      ? "rgba(0,212,255,0.2)"
                      : `${CATEGORY_COLORS[cat]}20`
                    : "rgba(255,255,255,0.04)",
                border:
                  activeCategory === cat
                    ? cat === "All"
                      ? "1px solid rgba(0,212,255,0.5)"
                      : `1px solid ${CATEGORY_COLORS[cat]}60`
                    : "1px solid rgba(255,255,255,0.08)",
                color:
                  activeCategory === cat
                    ? cat === "All"
                      ? "#00D4FF"
                      : CATEGORY_COLORS[cat]
                    : "#8899AA",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── PAGE GRID ── */}
      <div className="container pb-24">
        {activeCategory === "All" ? (
          // Grouped by category
          Object.entries(grouped).map(([cat, pages]) => (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${CATEGORY_COLORS[cat]}60, transparent)`,
                  }}
                />
                <h2
                  className="text-xs font-mono tracking-widest px-4 py-1.5 rounded-full"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: CATEGORY_COLORS[cat],
                    background: `${CATEGORY_COLORS[cat]}12`,
                    border: `1px solid ${CATEGORY_COLORS[cat]}30`,
                  }}
                >
                  {cat.toUpperCase()} — {pages.length} PORTALS
                </h2>
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${CATEGORY_COLORS[cat]}60)`,
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pages.map((page) => (
                  <PageCard key={page.path} page={page} categoryColor={CATEGORY_COLORS[cat]} />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Flat filtered list
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((page) => (
              <PageCard
                key={page.path}
                page={page}
                categoryColor={CATEGORY_COLORS[page.category] || "#00D4FF"}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔮</div>
            <p className="text-white text-xl font-bold mb-2">No portals found</p>
            <p style={{ color: "#8899AA" }}>Try a different search or category</p>
          </div>
        )}
      </div>

      {/* ── FOOTER STAT ── */}
      <div
        className="text-center py-12 border-t"
        style={{ borderColor: "rgba(0,212,255,0.1)" }}
      >
        <p className="text-xs font-mono" style={{ color: "#8899AA", fontFamily: "'Orbitron', monospace" }}>
          {ALL_PAGES.length} PORTALS · {CATEGORIES.length - 1} DIMENSIONS · ∞ POSSIBILITIES
        </p>
        <p className="text-xs mt-2" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞ · FOREVER EVOLVING WITH EVOLUTION
        </p>
      </div>
    </div>
  );
}

function PageCard({ page, categoryColor }: { page: PageEntry; categoryColor: string }) {
  return (
    <Link href={page.path}>
      <div
        className="group relative rounded-xl p-5 cursor-pointer transition-all duration-300 h-full"
        style={{
          background: "rgba(5,11,26,0.7)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.border = `1px solid ${categoryColor}40`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${categoryColor}15`;
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)` }}
        />

        {/* Badge */}
        {page.badge && (
          <div
            className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              background: `${page.badgeColor}18`,
              border: `1px solid ${page.badgeColor}40`,
              color: page.badgeColor,
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
            }}
          >
            {page.badge}
          </div>
        )}

        {/* Icon */}
        <div className="text-3xl mb-3">{page.icon}</div>

        {/* Label */}
        <h3
          className="font-bold text-white text-sm mb-1.5 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {page.label}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-3"
          style={{ color: "#6B7A8D", lineHeight: "1.5" }}
        >
          {page.description}
        </p>

        {/* Path */}
        <div
          className="text-xs font-mono"
          style={{ color: categoryColor, opacity: 0.7 }}
        >
          scrollverse.co{page.path}
        </div>
      </div>
    </Link>
  );
}
