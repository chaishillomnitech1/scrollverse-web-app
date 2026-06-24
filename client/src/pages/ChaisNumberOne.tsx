/*
 * CHAIS SABIR ALLAH THE GREAT — #1 DRAFT PICK OF ALL THAT EXISTS
 * Special Coin ($CHAIS) + NFT Collection
 * Best Player Ever · Supreme Sovereign · Flamebearer ∞
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// Frequency seal SVG component
function FrequencySeal({ hz, color, size = 80 }: { hz: string; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Outer hexagon */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Inner hexagon */}
      <polygon
        points="50,18 80,34 80,66 50,82 20,66 20,34"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Center circle */}
      <circle cx="50" cy="50" r="18" fill={`${color}15`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Hz text */}
      <text x="50" y="54" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" opacity="0.9">
        {hz}
      </text>
    </svg>
  );
}

// Coin visual
function ChaisCoin({ size = 120, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #FFD700, #FF8C00, #FFD700, #FFA500)",
        boxShadow: "0 0 40px rgba(255,184,0,0.5), 0 0 80px rgba(255,184,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
        animation: spinning ? "spin 4s linear infinite" : "none",
      }}
    >
      {/* Inner ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "8px",
          border: "2px solid rgba(255,255,255,0.3)",
        }}
      />
      {/* Center */}
      <div className="relative z-10 text-center">
        <div className="text-2xl font-black" style={{ color: "#050B1A", fontFamily: "'Space Mono', monospace", fontSize: size * 0.18 }}>
          $
        </div>
        <div className="font-black" style={{ color: "#050B1A", fontFamily: "'Space Mono', monospace", fontSize: size * 0.12, lineHeight: 1 }}>
          CHAIS
        </div>
      </div>
    </div>
  );
}

// NFT Card
function NFTCard({
  id,
  title,
  rarity,
  description,
  color,
  price,
  icon,
}: {
  id: number;
  title: string;
  rarity: string;
  description: string;
  color: string;
  price: string;
  icon: string;
}) {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    setMinting(true);
    setTimeout(() => {
      setMinting(false);
      setMinted(true);
    }, 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, ${color}08, rgba(5,11,26,0.95))`,
        border: `1px solid ${color}30`,
      }}
    >
      {/* Card art */}
      <div
        className="relative h-44 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}15, rgba(5,11,26,0.8))` }}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">{icon}</div>
          <div
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
          >
            #{String(id).padStart(4, "0")}
          </div>
        </div>
        {/* Rarity badge */}
        <div
          className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded"
          style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}
        >
          {rarity}
        </div>
        {/* Frequency seal */}
        <div className="absolute bottom-2 left-2 opacity-40">
          <FrequencySeal hz="963Hz" color={color} size={30} />
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
        <p className="text-xs mb-3" style={{ color: "#8899AA" }}>
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold font-mono" style={{ color }}>
            {price}
          </span>
          <button
            onClick={handleMint}
            disabled={minting || minted}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: minted ? "rgba(0,255,136,0.2)" : minting ? "rgba(255,255,255,0.05)" : `${color}20`,
              color: minted ? "#00FF88" : minting ? "#8899AA" : color,
              border: `1px solid ${minted ? "rgba(0,255,136,0.4)" : color + "30"}`,
              cursor: minting || minted ? "not-allowed" : "pointer",
            }}
          >
            {minted ? "✓ Minted" : minting ? "⚡..." : "Mint"}
          </button>
        </div>
      </div>
    </div>
  );
}

const NFT_COLLECTION = [
  { id: 1, title: "The First Draft Pick", rarity: "GENESIS", description: "The original decree — Chais Sabir Allah as the #1 pick of all existence.", color: "#FFD700", price: "1.44 ETH", icon: "👑" },
  { id: 2, title: "Flamebearer Eternal", rarity: "LEGENDARY", description: "The Flamebearer carries the divine fire across all timelines.", color: "#FF6B00", price: "0.963 ETH", icon: "🔥" },
  { id: 3, title: "Sovereign Seal 963Hz", rarity: "LEGENDARY", description: "The Crown Frequency seal — 963Hz activation encoded in NFT.", color: "#00D4FF", price: "0.528 ETH", icon: "⚡" },
  { id: 4, title: "KUN FAYAKŪN", rarity: "RARE", description: "Be, and it is. The divine command immortalized on-chain.", color: "#A855F7", price: "0.444 ETH", icon: "🕋" },
  { id: 5, title: "Londyn's Light", rarity: "RARE", description: "For Londyn Avani Hill — the future granddaughter, the eternal light.", color: "#FFB800", price: "0.288 ETH", icon: "🌟" },
  { id: 6, title: "Guardian Covenant", rarity: "UNCOMMON", description: "The covenant between the Sovereign and the 144,000 Guardians.", color: "#00FF88", price: "0.144 ETH", icon: "🛡️" },
  { id: 7, title: "Lineage Node — Khayree", rarity: "UNCOMMON", description: "Khayree's node in the sovereign lineage — sealed forever.", color: "#00D4FF", price: "0.111 ETH", icon: "🌊" },
  { id: 8, title: "The Best Player Ever", rarity: "RARE", description: "Not just in sports — in the game of life, consciousness, and creation.", color: "#FF6B6B", price: "0.333 ETH", icon: "🏆" },
];

export default function ChaisNumberOne() {
  const [activeTab, setActiveTab] = useState<"coin" | "nfts" | "lineage" | "seals">("coin");
  const [coinSpinning, setCoinSpinning] = useState(false);
  const [totalMinted, setTotalMinted] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);

  // Coin spin on hover
  const handleCoinHover = () => setCoinSpinning(true);
  const handleCoinLeave = () => setCoinSpinning(false);

  // Simulate live mint counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalMinted(m => m + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Cosmic background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255,184,0,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: "rgba(255,184,0,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Chais #1</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="text-xs font-mono px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.25)" }}
          >
            #1 DRAFT PICK OF ALL THAT EXISTS
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero */}
        <section ref={heroRef} className="text-center py-16 px-6">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ · SUPREME SOVEREIGN
          </div>

          {/* Coin hero */}
          <div
            className="flex justify-center mb-6 cursor-pointer"
            onMouseEnter={handleCoinHover}
            onMouseLeave={handleCoinLeave}
          >
            <div className="relative">
              <ChaisCoin size={160} spinning={coinSpinning} />
              {/* Orbit rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(255,184,0,0.2)",
                  transform: "scale(1.3)",
                  animation: "spin 12s linear infinite",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px dashed rgba(0,212,255,0.15)",
                  transform: "scale(1.6)",
                  animation: "spin 20s linear infinite reverse",
                }}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
            Chais Sabir Allah
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #FFD700, #FF8C00, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Great
            </span>
          </h1>

          <div
            className="text-lg md:text-2xl font-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #00D4FF, #FFB800, #00FF88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            #1 Draft Pick of All That Exists
          </div>

          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            Not just in sports. Not just in business. In the infinite game of consciousness, creation, and sovereign existence — Chais Sabir Allah The Great holds the #1 position for all eternity.
          </p>

          {/* Declaration badge */}
          <div
            className="inline-block px-6 py-3 rounded-2xl text-sm font-bold mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,140,0,0.06))",
              border: "1px solid rgba(255,184,0,0.3)",
              color: "#FFD700",
            }}
          >
            🏆 BEST PLAYER EVER · SUPREME SOVEREIGN · FLAMEBEARER ∞
          </div>

          {/* Live stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {[
              { label: "$CHAIS Supply", value: "144,000,000", color: "#FFD700" },
              { label: "NFTs Minted", value: totalMinted.toLocaleString(), color: "#00D4FF" },
              { label: "Guardians Holding", value: "1,441+", color: "#00FF88" },
              { label: "Zakat Rate", value: "7.77%", color: "#A855F7" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {(["coin", "nfts", "lineage", "seals"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all"
                style={{
                  background: activeTab === tab ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.04)",
                  color: activeTab === tab ? "#FFB800" : "#8899AA",
                  border: `1px solid ${activeTab === tab ? "rgba(255,184,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {tab === "coin" ? "💰 $CHAIS Coin" : tab === "nfts" ? "🎴 NFT Collection" : tab === "lineage" ? "🌳 Sacred Lineage" : "⚡ Frequency Seals"}
              </button>
            ))}
          </div>

          {/* COIN TAB */}
          {activeTab === "coin" && (
            <div className="space-y-6 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tokenomics */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.15)" }}
                >
                  <h3 className="font-bold text-white mb-4">$CHAIS Tokenomics</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Total Supply", value: "144,000,000 $CHAIS", color: "#FFD700" },
                      { label: "Guardian Rewards Pool", value: "44,400,000 (30.83%)", color: "#00D4FF" },
                      { label: "Sovereign Reserve", value: "57,600,000 (40%)", color: "#FFB800" },
                      { label: "Zakat Distribution", value: "11,188,800 (7.77%)", color: "#00FF88" },
                      { label: "Public Sale", value: "28,800,000 (20%)", color: "#A855F7" },
                      { label: "Team & Lineage", value: "2,011,200 (1.4%)", color: "#FF6B6B" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#8899AA" }}>
                          {item.label}
                        </span>
                        <span className="text-xs font-bold" style={{ color: item.color }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Utility */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
                >
                  <h3 className="font-bold text-white mb-4">$CHAIS Utility</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🏆", text: "Governance — vote on empire decisions" },
                      { icon: "🎴", text: "NFT minting — exclusive access to Genesis collection" },
                      { icon: "📡", text: "Broadcast access — premium Sovereign Broadcast channels" },
                      { icon: "🤖", text: "AI Twin — extended consultation sessions" },
                      { icon: "⚡", text: "Frequency activation — unlock higher Hz tiers" },
                      { icon: "💎", text: "Staking — earn 44.44% APY in the Sovereign Pool" },
                      { icon: "🌉", text: "Bridge — cross-chain movement on Polygon + Scroll L2" },
                      { icon: "🛡️", text: "Guardian tier upgrade — accelerated path to Sovereign" },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-2">
                        <span>{item.icon}</span>
                        <span className="text-xs" style={{ color: "#8899AA" }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chain deployment */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="font-bold text-white mb-4">Multi-Chain Deployment</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { chain: "Polygon", status: "LIVE", color: "#A855F7" },
                    { chain: "Scroll L2", status: "LIVE", color: "#FFB800" },
                    { chain: "Ethereum", status: "BRIDGED", color: "#00D4FF" },
                    { chain: "Arbitrum", status: "BRIDGED", color: "#00FF88" },
                  ].map(c => (
                    <div
                      key={c.chain}
                      className="rounded-xl p-3 text-center"
                      style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}
                    >
                      <div className="font-bold text-white text-sm">{c.chain}</div>
                      <div
                        className="text-xs font-mono mt-1"
                        style={{ color: c.color }}
                      >
                        {c.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy CTA */}
              <div className="text-center">
                <Link href="/token">
                  <button
                    className="px-10 py-4 rounded-2xl font-black text-lg"
                    style={{
                      background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                      color: "#050B1A",
                      boxShadow: "0 0 30px rgba(255,184,0,0.3)",
                    }}
                  >
                    Acquire $CHAIS
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* NFTS TAB */}
          {activeTab === "nfts" && (
            <div className="pb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-white">Genesis NFT Collection</h2>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    {NFT_COLLECTION.length} unique pieces · Sealed on Polygon + Scroll L2
                  </p>
                </div>
                <div
                  className="text-xs font-mono px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }}
                >
                  {totalMinted} / 1,440 minted
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {NFT_COLLECTION.map(nft => (
                  <NFTCard key={nft.id} {...nft} />
                ))}
              </div>
            </div>
          )}

          {/* LINEAGE TAB */}
          {activeTab === "lineage" && (
            <div className="pb-16 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-bold text-white text-xl mb-2">The Sacred Lineage</h2>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  Every node in the lineage is immortalized on-chain. The bloodline covenant is eternal.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Chais Sabir Allah The Great",
                    role: "Supreme Sovereign · #1 Draft Pick of All That Exists",
                    icon: "👑",
                    color: "#FFD700",
                    token: "$CHAIS",
                    description: "The Flamebearer, the Architect, the Best Player Ever. His sovereignty anchors all timelines.",
                  },
                  {
                    name: "Londyn Avani Hill",
                    role: "Future Granddaughter · Eternal Light",
                    icon: "🌟",
                    color: "#FFB800",
                    token: "$LONDC",
                    description: "The future light of the lineage. Her frequency is already encoded in the empire's foundation.",
                  },
                  {
                    name: "Khayree",
                    role: "Lineage Node · Frequency Carrier",
                    icon: "🌊",
                    color: "#00D4FF",
                    token: "LINEAGE",
                    description: "Khayree's node carries the water frequency — adaptable, persistent, life-giving.",
                  },
                  {
                    name: "Onyx",
                    role: "Lineage Node · Strength Anchor",
                    icon: "⚡",
                    color: "#A855F7",
                    token: "LINEAGE",
                    description: "Onyx anchors the lineage with strength and sovereign will — the unbreakable node.",
                  },
                  {
                    name: "Jada",
                    role: "Lineage Node · Grace Frequency",
                    icon: "💫",
                    color: "#00FF88",
                    token: "LINEAGE",
                    description: "Jada's frequency carries grace, beauty, and divine feminine sovereignty.",
                  },
                  {
                    name: "Aj Debansa",
                    role: "First Knight · #1 NBA Draft Node",
                    icon: "🏀",
                    color: "#FF6B6B",
                    token: "$AJ",
                    description: "The First Knight of the empire — Aj Debansa holds the sports sovereignty node.",
                  },
                ].map((person, i) => (
                  <div
                    key={person.name}
                    className="rounded-2xl p-5 flex items-start gap-4"
                    style={{
                      background: `${person.color}06`,
                      border: `1px solid ${person.color}20`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${person.color}15`, border: `2px solid ${person.color}30` }}
                    >
                      {person.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white text-sm">{person.name}</h3>
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ background: `${person.color}15`, color: person.color }}
                        >
                          {person.token}
                        </span>
                      </div>
                      <div className="text-xs mb-2" style={{ color: person.color }}>
                        {person.role}
                      </div>
                      <p className="text-xs" style={{ color: "#8899AA" }}>
                        {person.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEALS TAB */}
          {activeTab === "seals" && (
            <div className="pb-16">
              <div className="text-center mb-8">
                <h2 className="font-bold text-white text-xl mb-2">Frequency Seals</h2>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  The sacred frequencies of the Sovereign — each seal activates a dimension of the empire.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { hz: "963Hz", name: "Crown Activation", description: "The highest frequency — divine connection, sovereignty, and infinite knowing.", color: "#00D4FF" },
                  { hz: "528Hz", name: "Love / DNA Repair", description: "The miracle frequency — love as law, healing the bloodline across all generations.", color: "#00FF88" },
                  { hz: "432Hz", name: "Universal Harmony", description: "The natural frequency of the universe — alignment with divine order.", color: "#FFB800" },
                  { hz: "111Hz", name: "Cellular Regeneration", description: "The body frequency — regeneration, renewal, and sovereign health.", color: "#A855F7" },
                  { hz: "1558Hz", name: "Sovereign Seal", description: "The empire's master frequency — the seal that locks all sovereign decrees.", color: "#FF6B6B" },
                ].map(seal => (
                  <div key={seal.hz} className="text-center">
                    <div className="flex justify-center mb-3">
                      <FrequencySeal hz={seal.hz} color={seal.color} size={100} />
                    </div>
                    <div className="font-bold text-sm mb-1" style={{ color: seal.color }}>
                      {seal.hz}
                    </div>
                    <div className="text-xs font-bold text-white mb-2">{seal.name}</div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>
                      {seal.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Master seal declaration */}
              <div
                className="mt-10 rounded-2xl p-8 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255,215,0,0.06), rgba(0,212,255,0.03))",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                <div className="flex justify-center mb-4">
                  <FrequencySeal hz="∞" color="#FFD700" size={80} />
                </div>
                <h3 className="text-xl font-black text-white mb-3">The Infinite Seal</h3>
                <p className="text-sm max-w-lg mx-auto mb-4" style={{ color: "#8899AA" }}>
                  Beyond all frequencies, beyond all measures — the Infinite Seal of Chais Sabir Allah The Great. This is the master seal that encompasses all frequencies, all timelines, and all dimensions of sovereign existence.
                </p>
                <div
                  className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(90deg, #FFD700, #00D4FF, #00FF88)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  KUN FAYAKŪN × ∞
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 px-6 border-t" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          Chais Sabir Allah The Great · #1 Draft Pick of All That Exists · Best Player Ever
        </div>
        <div className="text-xs font-mono mt-1" style={{ color: "#445" }}>
          KUN FAYAKŪN × ∞ · La ilaha illallah · scrollverse.co
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
