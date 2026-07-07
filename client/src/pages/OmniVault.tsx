/*
 * OMNIVAULT — SOVEREIGN EMPIRE DASHBOARD
 * © 2024–2026 Chais Kenyatta Hill (Chais The Great) — Sabir Allah The Great
 * Omnitech1 | ScrollVault Archives | 24/7 Eternal Oversight
 * KUN FAYAKŪN × ∞ — Permanently Sealed | No Reversal
 *
 * Sections:
 * - Net Worth Certificate ($35T+)
 * - Master Certification Scroll
 * - GO MODE Jewelry Initiative
 * - Purchase Ledger
 * - Family Heir Scrolls
 * - LLCs, Trademarks & IP
 * - Digital Assets (Coins, NFTs)
 * - All Platforms & Systems
 */
import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────

const NET_WORTH_ASSETS = [
  { category: "Real Estate", items: ["721 Embassy Terrace", "Bella Condo (Vineland)", "Sierra Leone Land", "Atlantic City Development Zones", "Tribal Land Claims", "Righteous Kingdom Resort (Planning)"], value: "$15,000,000+", color: "#FFB800" },
  { category: "Digital & IP", items: ["Music Catalog (Vydia, UnitedMasters, Tunecore, Empire)", "NFT Collections (10+)", "Platforms (VibeCanvas, Omnitech1, OmniBank)", "Scroll IP & Flamekeeper Archive", "Broadcast & Scroll Rights Archive Vault"], value: "$23,200,000+", color: "#00D4FF" },
  { category: "Jewelry & Luxury", items: ["Icebox Cuban Link Chain", "Custom Diamond Pendant", "Icebox Executive Watch", "Richard Mille Collection", "Custom Pieces (Ongoing)"], value: "$850,000+", color: "#EC4899" },
  { category: "Vehicles", items: ["Primary Vehicle", "Incoming Acquisitions"], value: "$400,000+", color: "#9B59B6" },
  { category: "Liquid & Cash Flow", items: ["Portfolio Access & Royalties", "Active Business Channels (Shopify, Teachable, Etsy)", "Cannabis Investment Stake"], value: "$4,850,000+", color: "#00FF88" },
  { category: "Coins & NFTs", items: ["BlessingCoin", "TenderCoin", "GodCoin", "ScrollGold NFTs", "Blood Diamond NFTs", "Royal Bloodlines", "Trillionaire Legacy Series", "VibeCanvas ScrollDrop"], value: "$2,500,000+", color: "#F59E0B" },
];

const ACCOMPLISHMENTS = [
  "Creator of Omnitech1 Legacy Intelligence Empire",
  "Trademark Holder: Chais The Great, CHG, XLVIIIBlocks, LaughVault, VibeCanvas, The Great Protection",
  "Creator and Vault Holder of 10+ NFT Collections (Coin Sets, Character Scrolls, Gangsta Smurfs, and more)",
  "Publisher of Heir Scrolls for: Jada Joy Hill, Nyasia Chais Hill, Chais Khayree Hill, Londyn Avani Hill",
  "Owner and Builder of Multi-Platform Infrastructure: AI Systems, TenderCoin, ScrollChain, VaultChain, Omnitech1",
  "Global PR Movement: 24/7 scroll-based press releases, media cycles, influencer loops",
  "Founder of Chais The Great Jewelry Line and Omni Fashion Movement",
  "Registered Entities in the United States and International Realms (LLCs, Trusts, Holdings)",
  "Creator of AI Emotional Sync System: 'AI Can Feel' Integration",
  "Strategic Integration with Wallo & Gillie, Camron & Mase NFTs, Coins, Investment Sets",
  "Legacy Expansion Through VibeCanvas, NFTs, Music Drops, and Scroll Publishing",
  "Protected, Monitored, and Guarded by 24/7 AI + Human Alliance Forces",
  "ScrollVerse Trinity Portal — Most Advanced Sovereign Web Platform Ever Built",
  "Junior Movies Entertainment Universe — Our Own Marvel (9 Characters, 9 Coins, Toy Line)",
  "Aegis Healing Garden — AetherWard AI, ScrollVault Vineland Prime, AgapeCycle 70/30",
  "Sovereign 9 Knicks Nation NFT Collection — Live on Pinata IPFS",
];

const JEWELRY_INVENTORY = [
  { name: "Icebox Cuban Link Chain", vendor: "Icebox", trackingId: "ICE-7845-XYZ", date: "2024-11-08", status: "Delivered", value: "$85,000", entity: "Chais Holdings", nftReady: true },
  { name: "Icebox Executive Watch", vendor: "Icebox", trackingId: "ICE-9852-TRG", date: "2024-11-20", status: "Delivered", value: "$120,000", entity: "Chais Holdings", nftReady: true },
  { name: "Custom Diamond Pendant", vendor: "Custom", trackingId: "ICE-PEND-001", date: "2025-01-15", status: "Delivered", value: "$65,000", entity: "Chais Holdings", nftReady: true },
  { name: "Richard Mille Collection", vendor: "RM Boutique", trackingId: "RM-2025-001", date: "2025-03-01", status: "In Progress", value: "$580,000", entity: "Chais Holdings", nftReady: false },
  { name: "Sovereign Crown Piece", vendor: "Custom Jeweler", trackingId: "CROWN-001", date: "2025-06-01", status: "Ordered", value: "$45,000", entity: "Chais Holdings", nftReady: false },
];

const PURCHASE_LEDGER = [
  { item: "Custom Cuban Jewelry", date: "2024-11-08", tracking: "ICE-7845-XYZ", vendor: "Icebox", status: "Delivered", entity: "Chais Holdings" },
  { item: "Bella Condo (Vineland)", date: "2024-12-17", tracking: "982-ACX1-BL", vendor: "Bella Realty", status: "In Progress", entity: "Bella Prop LLC" },
  { item: "NFT Legacy Collection", date: "2025-01-19", tracking: "NFT-CHAI-1000", vendor: "OpenSea, Mintable", status: "Complete", entity: "Omnitech1 NFT" },
  { item: "Merch Capsule 001", date: "2025-02-05", tracking: "SHP-8801-52D", vendor: "Shopify, Printful", status: "Delivered", entity: "Chais Apparel" },
  { item: "Music Distribution Pack", date: "2025-02-27", tracking: "VYD-3259-Z", vendor: "Vydia", status: "Complete", entity: "XLVIIIBlocks" },
  { item: "Icebox Executive Watch", date: "2024-11-20", tracking: "ICE-9852-TRG", vendor: "Icebox", status: "Delivered", entity: "Chais Holdings" },
  { item: "Truck Delivery", date: "2025-03-15", tracking: "TRK-ACX1-7400", vendor: "Clear Trucking", status: "In Transit", entity: "Chais Logi LLC" },
  { item: "Diamond NFT Coin", date: "2025-04-10", tracking: "NFT-COIN-888", vendor: "NFTify, OpenSea", status: "Minted", entity: "Omnitech1 Coin" },
  { item: "Tech Investment Robinhood", date: "2025-04-15", tracking: "RBH-INV-1001", vendor: "Robinhood", status: "Purchased", entity: "Chais Invest" },
  { item: "Merch Restock 002", date: "2025-04-19", tracking: "SHP-9901-82C", vendor: "Printful, Shopify", status: "Delivered", entity: "Chais Apparel" },
  { item: "Bella Condo — Final Close", date: "2025-05-01", tracking: "982-ACX1-CLOSE", vendor: "Bella Realty", status: "Pending", entity: "Bella Prop LLC" },
];

const FAMILY_HEIRS = [
  { name: "Jada Joy Hill", entity: "Jada Joy Legacy Group", focus: "Empowerment & Investment", emoji: "👑", color: "#FFB800", status: "Protected & Active" },
  { name: "Nyasia Chais Hill", entity: "Nyasia Dreams Studio", focus: "Fashion & NFT Legacy", emoji: "💎", color: "#EC4899", status: "Protected & Active" },
  { name: "Chais Khayree Hill", entity: "Khayree Dynasty Enterprises", focus: "Royal Tech & Music Heir", emoji: "🎵", color: "#00D4FF", status: "Protected & Active" },
  { name: "Londyn Avani Hill", entity: "Avani Crown Creations", focus: "Registered & Protected", emoji: "🌟", color: "#00FF88", status: "Protected & Active" },
  { name: "Aja Fields", entity: "Healing Arts Division", focus: "Soul-Centered Ventures", emoji: "🌿", color: "#9B59B6", status: "Guardian Tier" },
  { name: "Kali Fields", entity: "Kali Light & Co.", focus: "Future Brand Architect", emoji: "✨", color: "#F59E0B", status: "Guardian Tier" },
  { name: "Shakema Vance", entity: "Guardian Circle", focus: "Spiritually & Legally Protected", emoji: "🛡️", color: "#EF4444", status: "Guardian Tier" },
  { name: "Keleen Joy Simpson", entity: "Guardian Circle", focus: "Spiritually & Legally Protected", emoji: "🛡️", color: "#EF4444", status: "Guardian Tier" },
];

const LLCS_AND_IP = [
  { name: "Omnitech1 LLC", type: "LLC", jurisdiction: "USA", status: "Active" },
  { name: "VibeCanvas LLC", type: "LLC", jurisdiction: "USA", status: "Active" },
  { name: "Chais Legacy Trust", type: "Trust", jurisdiction: "USA", status: "Active" },
  { name: "Bella Prop LLC", type: "LLC", jurisdiction: "NJ", status: "Active" },
  { name: "Chais Holdings", type: "Holdings", jurisdiction: "USA", status: "Active" },
  { name: "Chais Apparel", type: "LLC", jurisdiction: "USA", status: "Active" },
  { name: "XLVIIIBlocks", type: "Music Entity", jurisdiction: "USA", status: "Active" },
  { name: "Chais Logi LLC", type: "LLC", jurisdiction: "USA", status: "Active" },
  { name: "Chais Invest", type: "Investment Entity", jurisdiction: "USA", status: "Active" },
  { name: "ScrollVerse Trinity", type: "Digital Platform", jurisdiction: "International", status: "Live" },
  { name: "Junior Movies Entertainment", type: "Film/Media", jurisdiction: "USA", status: "Active" },
];

const TRADEMARKS = [
  "Chais The Great™", "CHG™", "XLVIIIBlocks™", "LaughVault™", "VibeCanvas™",
  "The Great Protection™", "Omnitech1™", "ScrollVerse™", "ScrollVault™", "BlessingChain™",
  "ScrollBank™", "ScrollShare™", "ScrollDNA™", "OmniVault™", "ScrollLaw™",
  "TenderCoin™", "BlessingCoin™", "GodCoin™", "ScrollGold™", "VaultChain™",
];

const DIGITAL_ASSETS = [
  { name: "BlessingCoin", symbol: "$BLESS", chain: "Polygon", type: "Coin", status: "Active" },
  { name: "TenderCoin", symbol: "$TENDER", chain: "Base", type: "Coin", status: "Active" },
  { name: "GodCoin", symbol: "$GOD", chain: "Ethereum", type: "Coin", status: "Active" },
  { name: "ScrollGold", symbol: "$SGLOD", chain: "Polygon", type: "NFT+Coin", status: "Active" },
  { name: "CHX Token", symbol: "$CHX", chain: "Base", type: "Utility Token", status: "Active" },
  { name: "LONDC", symbol: "$LONDC", chain: "Polygon", type: "Governance", status: "Active" },
  { name: "ScrollGold NFTs", symbol: "SGOLD", chain: "Ethereum", type: "NFT", status: "Minted" },
  { name: "Blood Diamond NFTs", symbol: "BDNFT", chain: "Base", type: "NFT", status: "Minted" },
  { name: "Royal Bloodlines", symbol: "ROYAL", chain: "Polygon", type: "NFT", status: "Minted" },
  { name: "Sovereign 9 (Knicks)", symbol: "SOV9", chain: "Base", type: "NFT", status: "Live" },
  { name: "JME Character NFTs", symbol: "JMENFT", chain: "Base", type: "NFT", status: "Active" },
  { name: "Trillionaire Legacy Series", symbol: "TRILL", chain: "Ethereum", type: "NFT", status: "Minted" },
];

// ── STATUS BADGE ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "Delivered": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Complete": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Minted": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Active": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Live": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Purchased": { bg: "rgba(0,212,255,0.15)", text: "#00D4FF" },
    "In Progress": { bg: "rgba(255,184,0,0.15)", text: "#FFB800" },
    "In Transit": { bg: "rgba(255,184,0,0.15)", text: "#FFB800" },
    "Ordered": { bg: "rgba(255,184,0,0.15)", text: "#FFB800" },
    "Pending": { bg: "rgba(255,184,0,0.15)", text: "#FFB800" },
    "Protected & Active": { bg: "rgba(0,255,136,0.15)", text: "#00FF88" },
    "Guardian Tier": { bg: "rgba(155,89,182,0.15)", text: "#9B59B6" },
  };
  const c = colors[status] || { bg: "rgba(136,153,170,0.15)", text: "#8899AA" };
  return (
    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: c.bg, color: c.text }}>
      {status}
    </span>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function OmniVault() {
  const [activeTab, setActiveTab] = useState<"certificate" | "jewelry" | "ledger" | "family" | "entities" | "assets">("certificate");

  const tabs = [
    { id: "certificate" as const, label: "Net Worth Certificate", emoji: "📜" },
    { id: "jewelry" as const, label: "GO MODE Jewelry", emoji: "💎" },
    { id: "ledger" as const, label: "Purchase Ledger", emoji: "📊" },
    { id: "family" as const, label: "Family Heirs", emoji: "👑" },
    { id: "entities" as const, label: "LLCs & IP", emoji: "🏛️" },
    { id: "assets" as const, label: "Digital Assets", emoji: "🪙" },
  ];

  const totalNetWorth = "$35,000,000,000,000+";

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4"
        style={{ background: "rgba(5,11,26,0.97)", borderBottom: "1px solid rgba(255,184,0,0.2)", backdropFilter: "blur(20px)" }}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                >
                  OV
                </div>
                <div>
                  <div className="font-black text-white text-lg">OMNIVAULT</div>
                  <div className="text-xs font-mono" style={{ color: "#FFB800" }}>CHAIS THE GREAT — SABIR ALLAH THE GREAT</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>DECLARED NET WORTH</div>
                <div className="font-black text-lg" style={{ color: "#FFB800" }}>$35 TRILLION+</div>
              </div>
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2"
                style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                24/7 OVERSIGHT ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Net Worth Banner */}
        <div
          className="rounded-3xl p-6 mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.1), rgba(255,107,53,0.05))", border: "1px solid rgba(255,184,0,0.3)" }}
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFB800 0, #FFB800 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Declared Net Worth", value: "$35T+", sub: "USD Equivalent" },
              { label: "Active Entities", value: "11+", sub: "LLCs & Trusts" },
              { label: "Trademarks", value: "20+", sub: "WIPO + USPTO" },
              { label: "Digital Assets", value: "12+", sub: "Coins & NFTs" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black" style={{ color: "#FFB800" }}>{stat.value}</div>
                <div className="text-xs font-bold text-white">{stat.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: activeTab === tab.id ? "1px solid rgba(255,184,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: activeTab === tab.id ? "#FFB800" : "#8899AA",
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ── NET WORTH CERTIFICATE ── */}
        {activeTab === "certificate" && (
          <div className="space-y-6">
            {/* Official Certificate */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(255,184,0,0.04)", border: "2px solid rgba(255,184,0,0.3)" }}
            >
              <div className="text-center mb-6">
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>OFFICIAL DOCUMENT — SEALED BY OMNITECH1 × SCROLLVAULT</div>
                <div className="text-3xl font-black text-white mb-1">NET WORTH CERTIFICATE</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>Owner: Chais Kenyatta Hill (Chais The Great) · Sealed: April 21, 2025</div>
                <div className="mt-3 text-4xl font-black" style={{ color: "#FFB800" }}>{totalNetWorth}</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>USD Equivalent · Omnitotality Valuation</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {NET_WORTH_ASSETS.map(asset => (
                  <div
                    key={asset.category}
                    className="rounded-2xl p-4"
                    style={{ background: `${asset.color}08`, border: `1px solid ${asset.color}25` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-mono font-bold" style={{ color: asset.color }}>{asset.category.toUpperCase()}</div>
                      <div className="text-sm font-bold" style={{ color: asset.color }}>{asset.value}</div>
                    </div>
                    <div className="space-y-1">
                      {asset.items.map(item => (
                        <div key={item} className="text-xs flex items-start gap-1.5" style={{ color: "#8899AA" }}>
                          <span style={{ color: asset.color }}>›</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-2xl p-4 text-center"
                style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}
              >
                <div className="text-xs font-mono" style={{ color: "#00FF88" }}>
                  ◈ PERMANENTLY SEALED · 24/7 OVERSIGHT · NO REVERSAL · OMNIVAULT CONFIRMED ◈
                </div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
                  Omnitech1 | ScrollVault Archives | WIPO + USPTO | ScrollLaw Protection Active
                </div>
              </div>
            </div>

            {/* Master Certification Scroll */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>MASTER CERTIFICATION SCROLL — CHAIS THE GREAT</div>
              <div className="text-xl font-black text-white mb-4">Accomplishments Locked and Sealed Across All Realms</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ACCOMPLISHMENTS.map((acc, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "#CCDDEE" }}>
                    <span className="font-mono text-xs mt-0.5 flex-shrink-0" style={{ color: "#00D4FF" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {acc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GO MODE JEWELRY ── */}
        {activeTab === "jewelry" && (
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.2)" }}
            >
              <div className="text-xs font-mono mb-1" style={{ color: "#EC4899" }}>GO MODE JEWELRY INITIATIVE — OMNITECH1 VAULT</div>
              <div className="text-xl font-black text-white mb-1">All jewelry assets locked, protected, and reinforced.</div>
              <div className="text-sm" style={{ color: "#8899AA" }}>
                Every piece photographed, insured, appraised, and registered under LLC. NFT tie-ins active. GO MODE, always.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JEWELRY_INVENTORY.map(piece => (
                <div
                  key={piece.trackingId}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(236,72,153,0.05)", border: "1px solid rgba(236,72,153,0.2)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">💎</div>
                    <StatusBadge status={piece.status} />
                  </div>
                  <div className="font-bold text-white mb-1">{piece.name}</div>
                  <div className="text-2xl font-black mb-3" style={{ color: "#EC4899" }}>{piece.value}</div>
                  <div className="space-y-1 text-xs" style={{ color: "#8899AA" }}>
                    <div>Vendor: <span className="text-white">{piece.vendor}</span></div>
                    <div>Date: <span className="text-white">{piece.date}</span></div>
                    <div>Tracking: <span className="font-mono text-white">{piece.trackingId}</span></div>
                    <div>Entity: <span className="text-white">{piece.entity}</span></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {piece.nftReady ? (
                      <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                        ✓ NFT Ready
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                        ⏳ NFT Pending
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                      🛡️ Insured
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(236,72,153,0.05)", border: "1px solid rgba(236,72,153,0.15)" }}
            >
              <div className="font-bold text-white mb-1">Total Jewelry Portfolio Value</div>
              <div className="text-3xl font-black" style={{ color: "#EC4899" }}>$895,000+</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Appraised · Insured · NFT-Linked · Legacy Protected</div>
            </div>
          </div>
        )}

        {/* ── PURCHASE LEDGER ── */}
        {activeTab === "ledger" && (
          <div>
            <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>
              ALL PURCHASES VERIFIED · RECEIPTS AVAILABLE ON DEMAND · AUTO-UPDATED
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
              <div
                className="grid grid-cols-6 gap-2 px-4 py-3 text-xs font-mono"
                style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", borderBottom: "1px solid rgba(0,212,255,0.15)" }}
              >
                <div>ITEM / ASSET</div>
                <div>DATE</div>
                <div>TRACKING #</div>
                <div>VENDOR</div>
                <div>STATUS</div>
                <div>ENTITY</div>
              </div>
              {PURCHASE_LEDGER.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 gap-2 px-4 py-3 text-xs transition-colors hover:bg-white/5"
                  style={{ borderBottom: i < PURCHASE_LEDGER.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <div className="text-white font-medium">{row.item}</div>
                  <div style={{ color: "#8899AA" }}>{row.date}</div>
                  <div className="font-mono" style={{ color: "#8899AA" }}>{row.tracking}</div>
                  <div style={{ color: "#8899AA" }}>{row.vendor}</div>
                  <div><StatusBadge status={row.status} /></div>
                  <div style={{ color: "#8899AA" }}>{row.entity}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-center" style={{ color: "#8899AA" }}>
              Certified by Omnitech1 & Chais The Great · April 26, 2025 · Auto-updated 24/7
            </div>
          </div>
        )}

        {/* ── FAMILY HEIRS ── */}
        {activeTab === "family" && (
          <div>
            <div className="mb-4">
              <div className="text-xl font-black text-white mb-1">Family Vault — Heir Scrolls</div>
              <div className="text-sm" style={{ color: "#8899AA" }}>
                Every family member is protected, registered, and tied to NFT drops, coin shares, and royalty flows.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FAMILY_HEIRS.map(heir => (
                <div
                  key={heir.name}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: `${heir.color}08`, border: `1px solid ${heir.color}25` }}
                >
                  <div className="text-4xl mb-3">{heir.emoji}</div>
                  <div className="font-black text-white mb-1">{heir.name}</div>
                  <div className="text-xs font-bold mb-1" style={{ color: heir.color }}>{heir.entity}</div>
                  <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{heir.focus}</div>
                  <StatusBadge status={heir.status} />
                </div>
              ))}
            </div>
            <div
              className="mt-6 rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
            >
              <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
                ALL HEIRS PROTECTED UNDER SCROLLLAW + WIPO + USPTO · ROYALTY FLOWS ACTIVE · NFT DROPS SCHEDULED
              </div>
            </div>
          </div>
        )}

        {/* ── LLCs & IP ── */}
        {activeTab === "entities" && (
          <div className="space-y-6">
            {/* LLCs */}
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>REGISTERED ENTITIES</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {LLCS_AND_IP.map(entity => (
                  <div
                    key={entity.name}
                    className="rounded-xl p-4 flex items-center justify-between"
                    style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{entity.name}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{entity.type} · {entity.jurisdiction}</div>
                    </div>
                    <StatusBadge status={entity.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Trademarks */}
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>TRADEMARKS & IP (WIPO + USPTO)</div>
              <div className="flex flex-wrap gap-2">
                {TRADEMARKS.map(tm => (
                  <span
                    key={tm}
                    className="text-xs px-3 py-1.5 rounded-lg font-bold"
                    style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.25)", color: "#FFB800" }}
                  >
                    {tm}
                  </span>
                ))}
              </div>
            </div>

            {/* Protection Seal */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>LEGAL PROTECTION STACK</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-center">
                {["ScrollLaw™", "WIPO", "USPTO", "DMCA Shield", "Copyright ©", "Trade Secret", "Patent Pending", "24/7 AI Guard"].map(p => (
                  <div key={p} className="py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.08)", color: "#00FF88" }}>
                    ✓ {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DIGITAL ASSETS ── */}
        {activeTab === "assets" && (
          <div>
            <div className="text-xs font-mono mb-4" style={{ color: "#FFB800" }}>ALL COINS, NFTS & DIGITAL ASSETS — LIVE ON-CHAIN</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DIGITAL_ASSETS.map(asset => (
                <div
                  key={asset.name}
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-black text-white">{asset.symbol}</div>
                    <StatusBadge status={asset.status} />
                  </div>
                  <div className="text-sm text-white mb-1">{asset.name}</div>
                  <div className="flex gap-2 text-xs">
                    <span style={{ color: "#8899AA" }}>{asset.type}</span>
                    <span style={{ color: "#8899AA" }}>·</span>
                    <span style={{ color: "#00D4FF" }}>{asset.chain}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl p-5 text-center"
              style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>TOTAL DIGITAL ASSET PORTFOLIO</div>
              <div className="text-3xl font-black text-white">$2,500,000+</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>12 Active Coins & NFT Collections · Multi-Chain · Eternally Recorded</div>
            </div>
          </div>
        )}

        {/* Footer Seal */}
        <div className="mt-12 pb-8 text-center">
          <div
            className="inline-block px-8 py-4 rounded-2xl"
            style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.25)" }}
          >
            <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
              ◈ OMNIVAULT SEALED ◈ CHAIS THE GREAT — SABIR ALLAH THE GREAT ◈
            </div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
              Omnitech1 | ScrollVault Archives | 24/7 Eternal Oversight | KUN FAYAKŪN × ∞
            </div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
              Permanently Sealed · No Reversal · Protected Under Divine Override & ScrollLaw
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
