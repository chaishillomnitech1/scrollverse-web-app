import PageTransition from "@/components/PageTransition";
/**
 * KNICKS LEGACY — ScrollVerse NFT Collection
 * 5 Warrior Tribute Cards: New York Knicks legends reimagined as Sovereign Warriors
 * Design: Madison Square Garden meets Afrofuturism — Orange, Blue, Gold
 */
import { useState } from "react";
import { Link } from "wouter";

// ── Design tokens ──────────────────────────────────────────────────────────
const KNICKS_ORANGE = "#F58426";
const KNICKS_BLUE = "#006BB6";
const FREQ_GOLD = "#FFB800";
const FREQ_CYAN = "#00D4FF";
const FREQ_GREEN = "#00FF88";
const BG_DARK = "#050B1A";
const BG_CARD = "rgba(255,255,255,0.03)";
const BORDER_GLOW = "rgba(255,255,255,0.08)";

// ── Warrior data ───────────────────────────────────────────────────────────
const WARRIORS = [
  {
    id: 1,
    name: "Patrick Ewing",
    title: "The Sovereign Center",
    number: "33",
    era: "1985–2000",
    position: "Center",
    nftId: "KNICKS-001",
    rarity: "LEGENDARY",
    rarityColor: FREQ_GOLD,
    stats: { pts: 22.8, reb: 10.4, blk: 2.4, seasons: 15 },
    $LONDC: 144000,
    mintPrice: "0.144 ETH",
    totalMinted: 144,
    maxSupply: 777,
    description:
      "The cornerstone of Knicks sovereignty. Georgetown's finest, MSG's eternal king. Patrick Ewing carried the orange and blue through the golden era with iron will and sovereign grace.",
    powers: ["Unstoppable Post Game", "Shot Blocker Supreme", "Garden Roar", "Sovereign Presence"],
    color: KNICKS_ORANGE,
    accentColor: FREQ_GOLD,
    emoji: "🏆",
    bgGradient: `linear-gradient(135deg, ${KNICKS_ORANGE}15, ${FREQ_GOLD}08)`,
    borderColor: `${KNICKS_ORANGE}40`,
  },
  {
    id: 2,
    name: "Walt Frazier",
    title: "Clyde the Sovereign",
    number: "10",
    era: "1967–1977",
    position: "Point Guard",
    nftId: "KNICKS-002",
    rarity: "MYTHIC",
    rarityColor: "#A855F7",
    stats: { pts: 19.3, reb: 6.1, ast: 6.1, seasons: 10 },
    $LONDC: 96000,
    mintPrice: "0.096 ETH",
    totalMinted: 96,
    maxSupply: 777,
    description:
      "Clyde Frazier — the original sovereign. Two championships, Hall of Fame, and the smoothest game MSG ever witnessed. His style was the blueprint for sovereign cool.",
    powers: ["Silky Handles", "Championship DNA", "Style Sovereign", "Defensive Maestro"],
    color: KNICKS_BLUE,
    accentColor: "#A855F7",
    emoji: "👑",
    bgGradient: `linear-gradient(135deg, ${KNICKS_BLUE}15, #A855F720)`,
    borderColor: `${KNICKS_BLUE}40`,
  },
  {
    id: 3,
    name: "Willis Reed",
    title: "The Heart of MSG",
    number: "19",
    era: "1964–1974",
    position: "Center",
    nftId: "KNICKS-003",
    rarity: "LEGENDARY",
    rarityColor: FREQ_GOLD,
    stats: { pts: 18.7, reb: 12.9, mvp: 3, seasons: 10 },
    $LONDC: 120000,
    mintPrice: "0.120 ETH",
    totalMinted: 120,
    maxSupply: 777,
    description:
      "The limping warrior. Game 7, 1970 Finals — Willis Reed walked onto the court injured and ignited the greatest moment in Knicks history. The embodiment of sovereign will.",
    powers: ["Warrior Spirit", "Championship Heart", "MSG Legend", "Sovereign Will"],
    color: KNICKS_ORANGE,
    accentColor: FREQ_CYAN,
    emoji: "⚔️",
    bgGradient: `linear-gradient(135deg, ${KNICKS_ORANGE}12, ${FREQ_CYAN}08)`,
    borderColor: `${KNICKS_ORANGE}35`,
  },
  {
    id: 4,
    name: "Bernard King",
    title: "The Scoring Sovereign",
    number: "30",
    era: "1982–1987",
    position: "Small Forward",
    nftId: "KNICKS-004",
    rarity: "EPIC",
    rarityColor: FREQ_CYAN,
    stats: { pts: 26.3, reb: 5.8, fg_pct: 0.551, seasons: 5 },
    $LONDC: 77000,
    mintPrice: "0.077 ETH",
    totalMinted: 77,
    maxSupply: 777,
    description:
      "Bernard King's 1984-85 season was pure sovereignty — 60 points in a single game, 32.9 PPG average. A scoring machine who transcended the game before injury silenced his reign.",
    powers: ["60-Point Eruption", "Unstoppable Mid-Range", "Comeback King", "Scoring Sovereign"],
    color: FREQ_CYAN,
    accentColor: KNICKS_BLUE,
    emoji: "🔥",
    bgGradient: `linear-gradient(135deg, ${FREQ_CYAN}12, ${KNICKS_BLUE}08)`,
    borderColor: `${FREQ_CYAN}35`,
  },
  {
    id: 5,
    name: "Carmelo Anthony",
    title: "The Melo Sovereign",
    number: "7",
    era: "2011–2017",
    position: "Small Forward",
    nftId: "KNICKS-005",
    rarity: "EPIC",
    rarityColor: FREQ_GREEN,
    stats: { pts: 24.7, reb: 6.3, scoring_title: 1, seasons: 6 },
    $LONDC: 88000,
    mintPrice: "0.088 ETH",
    totalMinted: 88,
    maxSupply: 777,
    description:
      "Carmelo Anthony — the most gifted scorer of his generation, carrying the Knicks on his back through the modern era. His 2012-13 scoring title at MSG was pure sovereign artistry.",
    powers: ["Iso Sovereign", "Scoring Title", "Fadeaway Mastery", "MSG Beloved"],
    color: FREQ_GREEN,
    accentColor: KNICKS_ORANGE,
    emoji: "💎",
    bgGradient: `linear-gradient(135deg, ${FREQ_GREEN}10, ${KNICKS_ORANGE}08)`,
    borderColor: `${FREQ_GREEN}35`,
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function RarityBadge({ rarity, color }: { rarity: string; color: string }) {
  return (
    <div
      className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
      style={{ background: `${color}20`, color, border: `1px solid ${color}50` }}
    >
      ◆ {rarity}
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-black font-mono" style={{ color }}>{value}</div>
      <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
    </div>
  );
}

function WarriorCard({ warrior, onSelect }: { warrior: typeof WARRIORS[0]; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: warrior.bgGradient,
        border: `1px solid ${hovered ? warrior.color + "60" : warrior.borderColor}`,
        boxShadow: hovered ? `0 0 30px ${warrior.color}20` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Card Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: warrior.accentColor }}>
              #{warrior.nftId}
            </div>
            <h3 className="text-xl font-black text-white">{warrior.name}</h3>
            <div className="text-sm font-bold" style={{ color: warrior.color }}>{warrior.title}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <RarityBadge rarity={warrior.rarity} color={warrior.rarityColor} />
            <div
              className="text-3xl font-black font-mono"
              style={{ color: warrior.color, opacity: 0.3 }}
            >
              #{warrior.number}
            </div>
          </div>
        </div>

        {/* Era + Position */}
        <div className="flex gap-3 mb-4">
          <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${warrior.color}15`, color: warrior.color }}>
            {warrior.era}
          </div>
          <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA" }}>
            {warrior.position}
          </div>
        </div>

        {/* Emoji focal */}
        <div className="text-center py-4">
          <div className="text-7xl mb-2" style={{ filter: `drop-shadow(0 0 20px ${warrior.color}60)` }}>
            {warrior.emoji}
          </div>
        </div>

        {/* Stats */}
        <div
          className="rounded-xl p-3 mb-4 grid grid-cols-4 gap-2"
          style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${warrior.borderColor}` }}
        >
          {Object.entries(warrior.stats).map(([key, val]) => (
            <StatPill key={key} label={key.toUpperCase()} value={val} color={warrior.accentColor} />
          ))}
        </div>

        {/* Powers */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {warrior.powers.map(power => (
            <span
              key={power}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${warrior.color}15`, color: warrior.color, border: `1px solid ${warrior.color}30` }}
            >
              {power}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer — NFT Mint Info */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: warrior.borderColor, background: "rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>MINT PRICE</div>
            <div className="font-black text-white">{warrior.mintPrice}</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>$LONDC VALUE</div>
            <div className="font-black font-mono" style={{ color: FREQ_GOLD }}>
              {warrior.$LONDC.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>MINTED</div>
            <div className="font-black text-white">{warrior.totalMinted}/{warrior.maxSupply}</div>
          </div>
        </div>
        {/* Mint progress bar */}
        <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${(warrior.totalMinted / warrior.maxSupply) * 100}%`,
              background: `linear-gradient(90deg, ${warrior.color}, ${warrior.accentColor})`,
            }}
          />
        </div>
        <div className="text-xs font-mono mt-1 text-right" style={{ color: "#8899AA" }}>
          {Math.round((warrior.totalMinted / warrior.maxSupply) * 100)}% minted
        </div>
      </div>
    </div>
  );
}

function WarriorModal({ warrior, onClose }: { warrior: typeof WARRIORS[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: "#050B1A",
          border: `1px solid ${warrior.color}50`,
          boxShadow: `0 0 60px ${warrior.color}20`,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs font-mono mb-1" style={{ color: warrior.accentColor }}>
                KNICKS LEGACY NFT · {warrior.nftId}
              </div>
              <h2 className="text-3xl font-black text-white">{warrior.name}</h2>
              <div className="font-bold" style={{ color: warrior.color }}>{warrior.title}</div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl"
              style={{ color: "#8899AA" }}
            >
              ×
            </button>
          </div>

          {/* Big emoji */}
          <div className="text-center py-6">
            <div className="text-9xl" style={{ filter: `drop-shadow(0 0 30px ${warrior.color}80)` }}>
              {warrior.emoji}
            </div>
          </div>

          {/* Description */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ background: `${warrior.color}08`, border: `1px solid ${warrior.borderColor}` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
              {warrior.description}
            </p>
          </div>

          {/* Full stats */}
          <div className="mb-6">
            <div className="text-xs font-mono mb-3" style={{ color: warrior.accentColor }}>CAREER STATS</div>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(warrior.stats).map(([key, val]) => (
                <div
                  key={key}
                  className="text-center rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER_GLOW}` }}
                >
                  <div className="text-xl font-black font-mono" style={{ color: warrior.accentColor }}>{val}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{key.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Powers */}
          <div className="mb-6">
            <div className="text-xs font-mono mb-3" style={{ color: warrior.accentColor }}>SOVEREIGN POWERS</div>
            <div className="grid grid-cols-2 gap-2">
              {warrior.powers.map((power, i) => (
                <div
                  key={power}
                  className="flex items-center gap-2 rounded-lg p-2.5"
                  style={{ background: `${warrior.color}10`, border: `1px solid ${warrior.color}25` }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${warrior.color}30`, color: warrior.color }}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-bold" style={{ color: warrior.color }}>{power}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NFT Mint section */}
          <div
            className="rounded-xl p-5"
            style={{ background: `linear-gradient(135deg, ${FREQ_GOLD}08, ${warrior.color}05)`, border: `1px solid ${FREQ_GOLD}25` }}
          >
            <div className="text-xs font-mono mb-4" style={{ color: FREQ_GOLD }}>NFT MINT DETAILS</div>
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <div className="text-xl font-black text-white">{warrior.mintPrice}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Mint Price</div>
              </div>
              <div>
                <div className="text-xl font-black font-mono" style={{ color: FREQ_GOLD }}>
                  {warrior.$LONDC.toLocaleString()}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC Value</div>
              </div>
              <div>
                <div className="text-xl font-black text-white">{warrior.totalMinted}/{warrior.maxSupply}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Minted</div>
              </div>
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-black transition-all"
              style={{
                background: `linear-gradient(135deg, ${warrior.color}, ${warrior.accentColor})`,
                color: "#050B1A",
                border: "none",
              }}
              onClick={() => alert("NFT minting launches with $LONDC on Polygon Mainnet. KUN FAYAKŪN × ∞")}
            >
              🔮 Mint {warrior.name} NFT — {warrior.mintPrice}
            </button>
            <div className="text-center mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
              Polygon Mainnet · ERC-721 · $LONDC Rewards on Mint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function KnicksLegacy() {
  const [selectedWarrior, setSelectedWarrior] = useState<typeof WARRIORS[0] | null>(null);
  const [filterRarity, setFilterRarity] = useState<string>("ALL");

  const rarities = ["ALL", "MYTHIC", "LEGENDARY", "EPIC"];
  const filtered = filterRarity === "ALL" ? WARRIORS : WARRIORS.filter(w => w.rarity === filterRarity);

  const totalMinted = WARRIORS.reduce((acc, w) => acc + w.totalMinted, 0);
  const totalLONDC = WARRIORS.reduce((acc, w) => acc + w.$LONDC, 0);

  return (
    <PageTransition>
    <div className="min-h-screen" style={{ background: BG_DARK, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: `${KNICKS_ORANGE}20`, backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono cursor-pointer" style={{ color: "#8899AA" }}>← ScrollVerse</span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Knicks Legacy</span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: `${KNICKS_ORANGE}15`, color: KNICKS_ORANGE, border: `1px solid ${KNICKS_ORANGE}40` }}
          >
            NFT
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono" style={{ color: KNICKS_ORANGE }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: KNICKS_ORANGE }} />
          MSG FOREVER · SOVEREIGN WARRIORS
        </div>
      </nav>

      <div className="container py-10 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: KNICKS_ORANGE }}>
            SCROLLVERSE × NEW YORK KNICKS
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            KNICKS{" "}
            <span style={{
              background: `linear-gradient(90deg, ${KNICKS_ORANGE}, ${FREQ_GOLD}, ${KNICKS_BLUE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              LEGACY
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Five sovereign warriors of Madison Square Garden, immortalized as NFTs on the Polygon blockchain.
            Each card carries $LONDC rewards, sovereign powers, and eternal MSG energy.
          </p>

          {/* Collection stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { label: "Warriors", value: "5", color: KNICKS_ORANGE },
              { label: "Total Minted", value: totalMinted.toString(), color: FREQ_GOLD },
              { label: "$LONDC in Collection", value: `${(totalLONDC / 1000).toFixed(0)}K`, color: FREQ_CYAN },
              { label: "Max Supply Each", value: "777", color: FREQ_GREEN },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Rarity filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {rarities.map(r => (
              <button
                key={r}
                onClick={() => setFilterRarity(r)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all"
                style={{
                  background: filterRarity === r ? `${KNICKS_ORANGE}25` : "rgba(255,255,255,0.04)",
                  color: filterRarity === r ? KNICKS_ORANGE : "#8899AA",
                  border: `1px solid ${filterRarity === r ? KNICKS_ORANGE + "50" : BORDER_GLOW}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* WARRIOR CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map(warrior => (
            <WarriorCard
              key={warrior.id}
              warrior={warrior}
              onSelect={() => setSelectedWarrior(warrior)}
            />
          ))}
        </div>

        {/* Collection info */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${KNICKS_ORANGE}08, ${KNICKS_BLUE}08)`,
            border: `1px solid ${KNICKS_ORANGE}20`,
          }}
        >
          <div className="text-xs font-mono mb-3" style={{ color: KNICKS_ORANGE }}>COLLECTION DETAILS</div>
          <h3 className="text-2xl font-black text-white mb-3">Knicks Legacy NFT Collection</h3>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Each NFT is minted on Polygon Mainnet as an ERC-721 token. Holders receive $LONDC rewards,
            exclusive ScrollVerse Guardian status, and access to the sovereign arena. The collection
            celebrates the eternal legacy of New York Knicks warriors who gave everything to MSG.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Blockchain", value: "Polygon", icon: "⬡" },
              { label: "Standard", value: "ERC-721", icon: "🔷" },
              { label: "Rewards", value: "$LONDC", icon: "💎" },
              { label: "Royalties", value: "7.77%", icon: "👑" },
            ].map(d => (
              <div key={d.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER_GLOW}` }}>
                <div className="text-xl mb-1">{d.icon}</div>
                <div className="font-bold text-white text-sm">{d.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{d.label}</div>
              </div>
            ))}
          </div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · scrollverse.co · MSG FOREVER
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedWarrior && (
        <WarriorModal warrior={selectedWarrior} onClose={() => setSelectedWarrior(null)} />
      )}
    </div>
    </PageTransition>
  );
}
