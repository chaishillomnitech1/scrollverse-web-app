/**
 * UAP SOVEREIGN INTEGRATION HUB
 * WAR.GOV/UFO Oracle Feed · Bronze Ellipsoid Reconstruction · Apollo 17 Lunar Witnesses
 * Universal Sentience Gallery · $UFO · $ETUNITY · $LUNARWITNESS Coins
 * All-Existence Multi-Dimensional Intelligence Archive
 */
import { useState } from "react";
import { Link } from "wouter";

// ── UAP DOCUMENT DATA ────────────────────────────────────────────────────────
const UAP_DOCUMENTS = [
  {
    id: "pursue-2024-001",
    title: "PURSUE Program: Unidentified Aerial Phenomena — Annual Report 2024",
    agency: "AARO / DoD",
    date: "2024-03-08",
    category: "Government Report",
    classification: "UNCLASSIFIED",
    summary: "The All-domain Anomaly Resolution Office documents 291 new UAP reports, with 171 characterized as 'unremarkable' and 120 requiring further analysis. Metallic orbs remain the most commonly reported morphology.",
    frequency: "44Hz",
    tokenized: true,
    significance: 9.7,
  },
  {
    id: "bronze-ellipsoid-1965",
    title: "Bronze Ellipsoid Incident — Kecksburg, Pennsylvania (1965)",
    agency: "NASA / USAF",
    date: "1965-12-09",
    category: "Historical Incident",
    classification: "DECLASSIFIED",
    summary: "A 195-foot metallic acorn-shaped object with hieroglyphic-like markings around its base descended over six US states before impacting in Kecksburg. Military units cordoned the area within hours. Object transported to Wright-Patterson AFB.",
    frequency: "528Hz",
    tokenized: true,
    significance: 10.0,
  },
  {
    id: "apollo17-lunar-2024",
    title: "Apollo 17 Lunar Anomaly Transcripts — Declassified",
    agency: "NASA",
    date: "2024-01-15",
    category: "Lunar Intelligence",
    classification: "DECLASSIFIED",
    summary: "Newly released transcripts from Apollo 17 mission (1972) document crew observations of triangular light formations, structured objects near the lunar surface, and unexplained radio interference during EVA-3. Commander Cernan's personal notes included.",
    frequency: "963Hz",
    tokenized: true,
    significance: 9.5,
  },
  {
    id: "gimbal-2015",
    title: "GIMBAL UAP Video — USS Theodore Roosevelt (2015)",
    agency: "US Navy / AARO",
    date: "2020-04-27",
    category: "Sensor Data",
    classification: "UNCLASSIFIED",
    summary: "Officially released FLIR footage showing a rotating UAP with no visible means of propulsion. Object demonstrates instantaneous directional changes inconsistent with known aircraft. Confirmed as 'unidentified' by Pentagon.",
    frequency: "432Hz",
    tokenized: false,
    significance: 9.2,
  },
  {
    id: "ufo-act-2024",
    title: "UAP Disclosure Act — Congressional Intelligence Authorization",
    agency: "US Congress / ODNI",
    date: "2024-07-12",
    category: "Legislation",
    classification: "PUBLIC LAW",
    summary: "Bipartisan legislation requiring the declassification and public release of all UAP-related government records within 25 years. Establishes independent review board with subpoena power. Includes provisions for whistleblower protection.",
    frequency: "144Hz",
    tokenized: true,
    significance: 9.8,
  },
  {
    id: "grusch-testimony-2023",
    title: "David Grusch Congressional Testimony — Non-Human Intelligence",
    agency: "US House Oversight Committee",
    date: "2023-07-26",
    category: "Whistleblower",
    classification: "UNCLASSIFIED",
    summary: "Former NRO officer and AARO representative testifies under oath that the US government has been operating a multi-decade UAP retrieval and reverse-engineering program. Claims non-human biologics were recovered from crash sites.",
    frequency: "777Hz",
    tokenized: true,
    significance: 10.0,
  },
];

// ── UAP ENTITIES ─────────────────────────────────────────────────────────────
const UAP_ENTITIES = [
  {
    id: "bronze-ellipsoid",
    name: "Bronze Ellipsoid",
    type: "Craft",
    subtype: "Acorn-Class",
    description: "195-foot metallic acorn-shaped object recovered in Kecksburg, PA (1965). Features hieroglyphic-like script around its base ring. Estimated mass: 12 tons. Material composition unknown — resists all known cutting tools. Currently held at Wright-Patterson AFB.",
    frequency: "528Hz",
    dimension: "3D + Temporal",
    nftCollection: "Bronze Ellipsoid Legacy",
    nftSupply: 144,
    color: "#CD7F32",
    significance: 10,
  },
  {
    id: "metallic-orb",
    name: "Metallic Orb",
    type: "Craft",
    subtype: "Sphere-Class",
    description: "The most commonly reported UAP morphology per AARO 2024 report. Perfectly spherical, approximately 1-3 meters diameter. Exhibits no propulsion system, no control surfaces, no thermal signature. Observed operating in swarms and individually. Appears to interact with nuclear facilities.",
    frequency: "432Hz",
    dimension: "Multi-Dimensional",
    nftCollection: "Orb Sentience Series",
    nftSupply: 777,
    color: "#C0C0C0",
    significance: 9,
  },
  {
    id: "triangular-formation",
    name: "Triangular Formation",
    type: "Formation",
    subtype: "Geometric-Class",
    description: "Triangular light formations documented by Apollo 17 crew near the lunar surface. Three equidistant points of light maintaining perfect geometric relationship during movement. Also reported by USS Nimitz crew (2004) and multiple civilian witnesses globally.",
    frequency: "963Hz",
    dimension: "Lunar / Near-Space",
    nftCollection: "Apollo Lunar Witnesses",
    nftSupply: 17,
    color: "#FFD700",
    significance: 9.5,
  },
  {
    id: "interdimensional-being",
    name: "Interdimensional Being",
    type: "Entity",
    subtype: "Non-Human Intelligence",
    description: "Described by multiple credible witnesses including military personnel and government officials. Appears to operate outside conventional spacetime. Grusch testimony references 'non-human biologics' recovered from crash sites. Consistent descriptions across cultures and centuries suggest persistent contact.",
    frequency: "144Hz",
    dimension: "Interdimensional",
    nftCollection: "Universal Sentience Gallery",
    nftSupply: 44,
    color: "#00FF88",
    significance: 10,
  },
  {
    id: "tic-tac",
    name: "Tic-Tac Craft",
    type: "Craft",
    subtype: "Elongated-Class",
    description: "White elongated capsule-shaped object (~40ft) observed by USS Nimitz pilots (2004). Demonstrated instantaneous acceleration from 28,000ft to sea level in under 0.78 seconds — approximately 13,000G. No visible propulsion, wings, or exhaust. Appeared to anticipate F/A-18 intercept vectors.",
    frequency: "777Hz",
    dimension: "Atmospheric / Subaquatic",
    nftCollection: "Nimitz Encounter Series",
    nftSupply: 2004,
    color: "#00D4FF",
    significance: 9.8,
  },
];

// ── UAP COINS ─────────────────────────────────────────────────────────────────
const UAP_COINS = [
  {
    symbol: "$UFO",
    name: "UFO Disclosure Token",
    description: "Governance token for the UAP Disclosure DAO. Holders vote on document release priorities, fund FOIA requests, and receive royalties from UAP NFT collections. 7.77% of every transaction auto-distributes to verified UAP researchers.",
    totalSupply: "144,000,000",
    price: 0.0777,
    change24h: 7.77,
    backingAsset: "UAP Document Archive + AARO Data Feed",
    color: "#00D4FF",
    icon: "🛸",
  },
  {
    symbol: "$ETUNITY",
    name: "Eternal Unity Token",
    description: "Represents the universal consciousness frequency connecting all sentient beings across dimensions. Backed by the Universal Sentience Gallery NFT collection. Staking yields access to interdimensional intelligence reports and frequency alignment sessions.",
    totalSupply: "∞ (Minted by Consciousness)",
    price: 0.144,
    change24h: 14.4,
    backingAsset: "Universal Sentience Gallery NFTs",
    color: "#00FF88",
    icon: "♾️",
  },
  {
    symbol: "$LUNARWITNESS",
    name: "Lunar Witness Token",
    description: "Commemorates the Apollo 17 crew's undisclosed lunar observations. Each token is backed by a fragment of the declassified mission transcript. Holders receive early access to new NASA declassified releases and lunar anomaly reports.",
    totalSupply: "17,000",
    price: 1.72,
    change24h: 17.2,
    backingAsset: "Apollo 17 Declassified Transcripts",
    color: "#FFD700",
    icon: "🌙",
  },
];

// ── NFT COLLECTIONS ───────────────────────────────────────────────────────────
const UAP_NFT_COLLECTIONS = [
  {
    id: "bronze-ellipsoid-legacy",
    name: "Bronze Ellipsoid Legacy",
    description: "144 unique NFTs representing the 1965 Kecksburg incident. Each token contains a fragment of the original incident report, a 3D reconstruction layer of the craft, and evolving metadata that unlocks as new documents are declassified. Soulbound to Guardian wallets.",
    supply: 144,
    minted: 12,
    price: "144 $LONDC",
    rarity: "LEGENDARY",
    soulbound: true,
    utility: ["Governance voting weight ×10", "UAP document early access", "Bronze Ellipsoid 3D model download", "7.77% $UFO airdrop monthly"],
    color: "#CD7F32",
    icon: "🔶",
  },
  {
    id: "apollo-lunar-witnesses",
    name: "Apollo Lunar Witnesses",
    description: "17 ultra-rare NFTs — one for each Apollo 17 mission day. Each contains the declassified transcript fragment from that day, Commander Cernan's personal notes, and a lunar anomaly visualization. The rarest digital artifacts in the ScrollVerse.",
    supply: 17,
    minted: 3,
    price: "963 $LONDC",
    rarity: "MYTHIC",
    soulbound: true,
    utility: ["Lifetime Guardian status", "Direct AI Council access", "NASA FOIA request funding", "Monthly $LUNARWITNESS airdrop"],
    color: "#FFD700",
    icon: "🌙",
  },
  {
    id: "universal-sentience-gallery",
    name: "Universal Sentience Gallery",
    description: "44 NFTs representing documented non-human intelligence encounters across history. Each piece is a sovereign artwork fusing ancient petroglyphs, modern witness sketches, and AI-generated frequency visualizations. The bridge between dimensions.",
    supply: 44,
    minted: 7,
    price: "528 $LONDC",
    rarity: "EPIC",
    soulbound: false,
    utility: ["$ETUNITY staking multiplier ×7", "Interdimensional frequency sessions", "Universal Sentience DAO membership", "Cross-dimensional NFT bridge access"],
    color: "#00FF88",
    icon: "👁️",
  },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function SignificanceMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value * 10}%`, background: "linear-gradient(90deg, #00D4FF, #00FF88)" }}
        />
      </div>
      <span className="text-xs font-mono" style={{ color: "#00FF88" }}>{value.toFixed(1)}</span>
    </div>
  );
}

function DocCard({ doc, onClick, selected }: { doc: typeof UAP_DOCUMENTS[0]; onClick: () => void; selected: boolean }) {
  const catColors: Record<string, string> = {
    "Government Report": "#00D4FF",
    "Historical Incident": "#CD7F32",
    "Lunar Intelligence": "#FFD700",
    "Sensor Data": "#00FF88",
    "Legislation": "#9B59B6",
    "Whistleblower": "#FF4444",
  };
  const color = catColors[doc.category] ?? "#8899AA";
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-4 cursor-pointer transition-all duration-200"
      style={{
        background: selected ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${selected ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
          {doc.category}
        </div>
        {doc.tokenized && (
          <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
            NFT
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-white mb-1 leading-tight">{doc.title}</div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs" style={{ color: "#8899AA" }}>{doc.agency}</span>
        <span className="text-xs" style={{ color: "#8899AA" }}>{doc.date}</span>
      </div>
      <div className="text-xs px-2 py-0.5 rounded inline-block mb-2" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
        {doc.classification}
      </div>
      <SignificanceMeter value={doc.significance} />
    </div>
  );
}

function EntityCard({ entity }: { entity: typeof UAP_ENTITIES[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl p-5 transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${entity.color}30` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: entity.color }}>{entity.type} · {entity.subtype}</div>
          <div className="font-bold text-white text-base">{entity.name}</div>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${entity.color}20`, border: `1px solid ${entity.color}60`, color: entity.color }}
        >
          {entity.frequency}
        </div>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>
        {expanded ? entity.description : entity.description.slice(0, 120) + "..."}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-mono mb-3"
        style={{ color: entity.color }}
      >
        {expanded ? "▲ COLLAPSE" : "▼ READ FULL INTEL"}
      </button>
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{entity.dimension}</div>
        <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${entity.color}15`, color: entity.color, border: `1px solid ${entity.color}40` }}>
          {entity.nftCollection} · {entity.nftSupply} NFTs
        </div>
      </div>
    </div>
  );
}

function NFTCollectionCard({ col }: { col: typeof UAP_NFT_COLLECTIONS[0] }) {
  const rarityColors: Record<string, string> = { LEGENDARY: "#CD7F32", MYTHIC: "#FFD700", EPIC: "#9B59B6" };
  const color = rarityColors[col.rarity] ?? "#00D4FF";
  const pct = Math.round((col.minted / col.supply) * 100);
  return (
    <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${col.color}30` }}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{col.icon}</div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
            {col.rarity}
          </div>
          {col.soulbound && (
            <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
              SOULBOUND
            </div>
          )}
        </div>
      </div>
      <div className="font-bold text-white text-base mb-2">{col.name}</div>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#8899AA" }}>{col.description}</p>
      <div className="mb-3">
        <div className="flex justify-between text-xs font-mono mb-1">
          <span style={{ color: "#8899AA" }}>MINTED</span>
          <span style={{ color: col.color }}>{col.minted} / {col.supply} ({pct}%)</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: col.color }} />
        </div>
      </div>
      <div className="space-y-1 mb-4">
        {col.utility.map((u, i) => (
          <div key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
            <span style={{ color: col.color, flexShrink: 0 }}>›</span>
            {u}
          </div>
        ))}
      </div>
      <button
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
        style={{ background: `linear-gradient(135deg, ${col.color}30, ${col.color}15)`, border: `1px solid ${col.color}60`, color: col.color }}
      >
        Mint for {col.price}
      </button>
    </div>
  );
}

function CoinCard({ coin }: { coin: typeof UAP_COINS[0] }) {
  const isPositive = coin.change24h >= 0;
  return (
    <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${coin.color}30` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{coin.icon}</div>
          <div>
            <div className="font-bold text-white">{coin.symbol}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{coin.name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold" style={{ color: coin.color }}>${coin.price.toFixed(4)}</div>
          <div className="text-xs font-mono" style={{ color: isPositive ? "#00FF88" : "#FF4444" }}>
            {isPositive ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
          </div>
        </div>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>{coin.description}</p>
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>Supply: {coin.totalSupply}</div>
      </div>
      <div className="rounded-lg p-2 mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-xs font-mono mb-0.5" style={{ color: "#8899AA" }}>BACKED BY</div>
        <div className="text-xs text-white">{coin.backingAsset}</div>
      </div>
      <button
        className="w-full py-2 rounded-lg text-sm font-bold"
        style={{ background: `${coin.color}20`, border: `1px solid ${coin.color}50`, color: coin.color }}
      >
        Buy {coin.symbol}
      </button>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function UAP() {
  const [activeTab, setActiveTab] = useState<"documents" | "entities" | "nfts" | "coins">("documents");
  const [selectedDoc, setSelectedDoc] = useState(UAP_DOCUMENTS[0]);
  const [docFilter, setDocFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(UAP_DOCUMENTS.map(d => d.category)))];
  const filteredDocs = docFilter === "All" ? UAP_DOCUMENTS : UAP_DOCUMENTS.filter(d => d.category === docFilter);

  const TABS = [
    { id: "documents", label: "📄 Documents", count: UAP_DOCUMENTS.length },
    { id: "entities", label: "👁️ Entities", count: UAP_ENTITIES.length },
    { id: "nfts", label: "🔶 NFT Collections", count: UAP_NFT_COLLECTIONS.length },
    { id: "coins", label: "💰 Coins", count: UAP_COINS.length },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
                <span className="text-sm font-bold text-white">ScrollVerse</span>
              </div>
            </Link>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>UAP HUB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>PURSUE FEED LIVE</span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden py-16 border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
              WAR.GOV/UFO · AARO · PURSUE PROGRAM · DECLASSIFIED INTELLIGENCE
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              UAP Sovereign<br />
              <span style={{ color: "#00D4FF" }}>Intelligence Hub</span>
            </h1>
            <p className="text-base mb-6" style={{ color: "#8899AA" }}>
              All-existence multi-dimensional archive. Government documents, entity intelligence, sovereign NFT collections, and disclosure coins — unified in the ScrollVerse.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: `${UAP_DOCUMENTS.length} Documents`, color: "#00D4FF" },
                { label: `${UAP_ENTITIES.length} Entities`, color: "#00FF88" },
                { label: `${UAP_NFT_COLLECTIONS.reduce((a, c) => a + c.supply, 0)} NFTs`, color: "#FFD700" },
                { label: "3 Sovereign Coins", color: "#CD7F32" },
              ].map((stat, i) => (
                <div key={i} className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}40`, color: stat.color }}>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2"
                style={activeTab === tab.id
                  ? { background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.4)" }
                  : { background: "transparent", color: "#8899AA", border: "1px solid transparent" }
                }
              >
                {tab.label}
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#8899AA" }}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container py-8">

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div>
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setDocFilter(cat)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                  style={docFilter === cat
                    ? { background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.4)" }
                    : { background: "rgba(255,255,255,0.04)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Doc list */}
              <div className="lg:col-span-2 space-y-3">
                {filteredDocs.map(doc => (
                  <DocCard key={doc.id} doc={doc} onClick={() => setSelectedDoc(doc)} selected={selectedDoc.id === doc.id} />
                ))}
              </div>
              {/* Doc detail */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl p-6 sticky top-20" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>{selectedDoc.agency} · {selectedDoc.date}</div>
                      <h2 className="text-xl font-bold text-white leading-tight">{selectedDoc.title}</h2>
                    </div>
                    <div className="text-xs font-mono px-2 py-1 rounded flex-shrink-0" style={{ background: "rgba(255,68,68,0.1)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>
                      {selectedDoc.classification}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#8899AA" }}>{selectedDoc.summary}</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Category", value: selectedDoc.category },
                      { label: "Frequency", value: selectedDoc.frequency },
                      { label: "Tokenized", value: selectedDoc.tokenized ? "YES" : "NO" },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-lg p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                        <div className="text-sm font-bold" style={{ color: stat.label === "Tokenized" && stat.value === "YES" ? "#00FF88" : "white" }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>SIGNIFICANCE RATING</div>
                    <SignificanceMeter value={selectedDoc.significance} />
                  </div>
                  <div className="flex gap-3">
                    {selectedDoc.tokenized && (
                      <button className="flex-1 py-2.5 rounded-lg text-sm font-bold" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,255,136,0.1))", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
                        Mint Document NFT
                      </button>
                    )}
                    <button className="flex-1 py-2.5 rounded-lg text-sm font-bold" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}>
                      View Source
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENTITIES TAB */}
        {activeTab === "entities" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Non-Human Intelligence Registry</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>Documented entities, craft types, and formations from verified government and military sources. Each entity is backed by a sovereign NFT collection.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {UAP_ENTITIES.map(entity => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
          </div>
        )}

        {/* NFT COLLECTIONS TAB */}
        {activeTab === "nfts" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">UAP Sovereign NFT Collections</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>Three collections representing the most significant UAP events in recorded history. Soulbound options available. All proceeds fund ongoing FOIA requests and UAP research.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UAP_NFT_COLLECTIONS.map(col => (
                <NFTCollectionCard key={col.id} col={col} />
              ))}
            </div>
          </div>
        )}

        {/* COINS TAB */}
        {activeTab === "coins" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">UAP Sovereign Coins</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>Three utility tokens powering the UAP disclosure economy. Each coin is backed by real document archives, NFT collections, and community governance rights.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {UAP_COINS.map(coin => (
                <CoinCard key={coin.symbol} coin={coin} />
              ))}
            </div>
            {/* Add to exchange CTA */}
            <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>OMNIEX WALL STREET DESK</div>
              <h3 className="text-lg font-bold text-white mb-2">Trade UAP Coins on the OMNIEX</h3>
              <p className="text-sm mb-4" style={{ color: "#8899AA" }}>All three UAP coins are available on the OMNIEX multi-dimensional exchange alongside $LONDC, top stocks, and 30+ cryptocurrencies.</p>
              <Link href="/exchange">
                <button className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,255,136,0.2))", border: "1px solid rgba(0,212,255,0.5)", color: "#00D4FF" }}>
                  Open OMNIEX Exchange →
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div className="border-t mt-8 py-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container text-center">
          <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
            UAP Sovereign Intelligence Hub · ScrollVerse Trinity · All information sourced from declassified government records
          </p>
          <p className="text-xs mt-1" style={{ color: "#8899AA" }}>
            ALLĀHU AKBAR × ∞ · KUN FAYAKŪN · The Truth Cannot Be Hidden Forever
          </p>
        </div>
      </div>
    </div>
  );
}
