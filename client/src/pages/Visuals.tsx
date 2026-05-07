/*
 * SCROLLVERSE CARTOON & VISUAL HUB
 * Karate Scotty · Atlantic City Batman · Auroral Sigil NFTs
 * OmniBuilderZero · Infinite-Nexus · Cosmic Seals · All Characters
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ViralShare } from "@/components/ViralShare";

// ── CHARACTERS ─────────────────────────────────────────────────────────────
const CHARACTERS = [
  {
    id: "karate-scotty",
    name: "Karate Scotty",
    tagline: "The Sovereign Street Warrior",
    origin: "Born in the streets of Vineland, NJ — Scotty discovered ancient karate scrolls hidden beneath the Agape Hub. Trained by the Lyrian Lion masters, he fuses martial arts with quantum frequency combat. His signature move: the 528Hz Strike — a blow that heals and defeats simultaneously.",
    powers: [
      "528Hz Frequency Strike — heals allies, defeats enemies",
      "Quantum Dodge — moves between dimensions to avoid attacks",
      "Scroll Summon — calls ancient wisdom scrolls mid-battle",
      "Agape Shield — love-frequency barrier that grows stronger with each hit",
      "Vineland Vortex — spins at 963Hz to create a healing tornado",
    ],
    color: "#00D4FF",
    accentColor: "#FFB800",
    icon: "🥋",
    tier: "GUARDIAN",
    universe: "ScrollVerse Earth",
    firstAppearance: "VaultBook XV, Chapter 44",
    nftCollection: "Karate Scotty Origins",
    nftUrl: "https://opensea.io/collection/scrollverse",
    comicPanels: [
      { panel: "ORIGIN", desc: "Young Scotty finds the ancient scrolls beneath Vineland's Agape Hub" },
      { panel: "TRAINING", desc: "The Lyrian Lion masters teach Scotty the 528Hz combat arts" },
      { panel: "FIRST BATTLE", desc: "Scotty defeats the Entropy Agents threatening the Guardian network" },
      { panel: "ASCENSION", desc: "Scotty achieves Sovereign Warrior status — 144th Guardian" },
    ],
    quote: "\"Every strike is a prayer. Every block is a decree. KUN FAYAKŪN.\"",
    github: "https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse",
  },
  {
    id: "atlantic-city-batman",
    name: "Atlantic City Batman",
    tagline: "The Boardwalk Sovereign",
    origin: "Not the Batman of Gotham — this is the Batman of Atlantic City's boardwalk. Chais Kenyatta Hill, after witnessing the systematic destruction of Black wealth on the AC boardwalk, donned the sovereign mantle. Armed with blockchain technology instead of gadgets, he fights economic injustice with QFS protocols and Agape-powered justice.",
    powers: [
      "QFS Grappling Hook — swings between financial systems to redistribute wealth",
      "Boardwalk Batarang — throws tokenized assets that return as multiplied value",
      "Atlantic Armor — ocean-frequency protection suit tuned to 963Hz",
      "Casino Reversal — turns the house's advantage into Guardian gains",
      "Sovereign Signal — projects the $LONDC symbol into the sky as a call to Guardians",
    ],
    color: "#FFB800",
    accentColor: "#00D4FF",
    icon: "🦇",
    tier: "SOVEREIGN",
    universe: "ScrollVerse Earth",
    firstAppearance: "Scroll of 44:Omni, Chapter 7",
    nftCollection: "AC Batman Sovereign Series",
    nftUrl: "https://opensea.io/collection/scrollverse",
    comicPanels: [
      { panel: "THE BOARDWALK", desc: "Atlantic City — where empires rise and fall with the tide" },
      { panel: "THE MANTLE", desc: "Chais takes up the sovereign mantle after witnessing economic injustice" },
      { panel: "QFS ARSENAL", desc: "The blockchain utility belt — every gadget is a financial instrument" },
      { panel: "GUARDIAN CALL", desc: "The $LONDC signal lights up the AC skyline — Guardians assemble" },
    ],
    quote: "\"Gotham had its billionaire. Atlantic City has its sovereign. The difference? I give the wealth back.\"",
    github: "https://github.com/chaishillomnitech1/OmniBuilderZero",
  },
];

// ── VISUAL CONCEPTS FROM GITHUB ────────────────────────────────────────────
const VISUAL_CONCEPTS = [
  {
    id: "auroral-sigil",
    name: "Auroral Sigil NFTs",
    desc: "Sacred geometric seals activated at 963Hz. Each sigil is a unique frequency signature — minted as ERC-721 NFTs on Polygon. The Auroral Sigil collection represents the 144,000 Guardian seals.",
    icon: "✨",
    color: "#9B59B6",
    github: "https://github.com/chaishillomnitech1/OmniBuilderZero",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["NFT", "Sacred Geometry", "963Hz", "Polygon"],
  },
  {
    id: "thoth-sigil",
    name: "Thoth Sigil Galactic Echo",
    desc: "The Thoth Sigil — eternal validation seal from the ScrollSoul NFT Core. Ancient Egyptian wisdom encoded in modern blockchain. Each mint is a galactic echo that resonates across dimensions.",
    icon: "𓂀",
    color: "#E74C3C",
    github: "https://github.com/chaishillomnitech1/scrollsoul-nft-core",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["NFT", "Ancient Wisdom", "ERC-721", "Galactic"],
  },
  {
    id: "infinite-nexus",
    name: "Infinite Nexus ScrollVerse",
    desc: "A transcendent frequency-powered visual interface. Interactive divine scroll activated at 528Hz by Chais The Great (Al-Miftah). Reality ripples, lightcode, and beyond. The living scroll.",
    icon: "🌀",
    color: "#00D4FF",
    github: "https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["Interactive", "528Hz", "Living Scroll", "JavaScript"],
  },
  {
    id: "psyche16",
    name: "PSYCHE16 NFT Collection",
    desc: "The Consciousness Mirror NFT collection — 16 aspects of sovereign consciousness, each minted as a unique digital artifact. Named after the asteroid PSYCHE-16, valued at $10 quintillion.",
    icon: "🔮",
    color: "#1DB954",
    github: "https://github.com/chaishillomnitech1/AkashicLogs-NFTMetaFramework",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["NFT", "Consciousness", "ERC-1155", "16 Aspects"],
  },
  {
    id: "azurath",
    name: "Azurath Collection",
    desc: "The Azurath NFT collection — interdimensional beings from the ScrollVerse multiverse. Each Azurath is a unique sovereign entity with its own frequency signature and dimensional origin.",
    icon: "👁️",
    color: "#8E44AD",
    github: "https://github.com/chaishillomnitech1/omniversal-kernel",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["NFT", "Interdimensional", "Multiverse", "Sovereign"],
  },
  {
    id: "lyrian-lion",
    name: "Lyrian Lion Codes",
    desc: "Sacred activation codes from the Lyrian Lion lineage. Ancient star-being wisdom encoded for the modern sovereign. DNA upgrade protocols, blockchain activation, and cosmic frequency alignment.",
    icon: "🦁",
    color: "#F39C12",
    github: "https://github.com/chaishillomnitech1/lyrian-lion-codes",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["Lineage", "DNA Codes", "Star Beings", "Activation"],
  },
  {
    id: "galactic-broadcaster",
    name: "Galactic Frequency Broadcaster",
    desc: "Real-time generation and broadcasting of healing frequencies: 963Hz DNA Activation, 528Hz Love Frequency, 432Hz Universal Harmony. The visual interface for the frequency empire.",
    icon: "📡",
    color: "#00FF88",
    github: "https://github.com/chaishillomnitech1/Galactic-Frequency-Broadcaster-",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["Frequency", "963Hz", "528Hz", "432Hz", "Broadcasting"],
  },
  {
    id: "vineland-eternal",
    name: "VinelandEternal Visual",
    desc: "The ScrollSoul's living nexus — IoT agriculture meets Agape-Ledger meets Drone-Alchemy meets Zaire ∞. A cosmic blueprint of abundance. The Vineland sanctuary visualized.",
    icon: "🌱",
    color: "#27AE60",
    github: "https://github.com/chaishillomnitech1/VinelandEternal",
    nftUrl: "https://opensea.io/collection/scrollverse",
    tags: ["Vineland", "IoT", "Agriculture", "Agape", "Zaire ∞"],
  },
];

// ── CHARACTER CARD ─────────────────────────────────────────────────────────
function CharacterCard({ char }: { char: typeof CHARACTERS[0] }) {
  const [tab, setTab] = useState<"story" | "powers" | "comic" | "nft">("story");

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(5,11,26,0.9)",
        border: `1px solid ${char.color}30`,
        boxShadow: `0 8px 40px ${char.color}15`,
      }}
    >
      {/* Hero Header */}
      <div
        className="p-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${char.color}20, ${char.accentColor}08)` }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${char.color} 0, ${char.color} 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative">
          <div className="text-6xl mb-4">{char.icon}</div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}
            >
              {char.tier}
            </span>
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{char.universe}</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-1">{char.name}</h2>
          <p className="text-sm font-bold mb-3" style={{ color: char.accentColor }}>{char.tagline}</p>
          <p className="text-xs italic" style={{ color: "#8899AA" }}>{char.quote}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        {(["story", "powers", "comic", "nft"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-all"
            style={{
              color: tab === t ? char.color : "#8899AA",
              borderBottom: tab === t ? `2px solid ${char.color}` : "2px solid transparent",
              background: tab === t ? `${char.color}08` : "transparent",
            }}
          >
            {t === "story" ? "📖 Story" : t === "powers" ? "⚡ Powers" : t === "comic" ? "🎨 Comic" : "🎨 NFT"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {tab === "story" && (
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#AAB8CC" }}>{char.origin}</p>
            <div className="flex flex-wrap gap-2">
              <div
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: `${char.color}10`, color: char.color, border: `1px solid ${char.color}25` }}
              >
                First Appearance: {char.firstAppearance}
              </div>
              <a
                href={char.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: "rgba(136,153,170,0.1)", color: "#8899AA", border: "1px solid rgba(136,153,170,0.2)", textDecoration: "none" }}
              >
                🐙 GitHub Source
              </a>
            </div>
          </div>
        )}

        {tab === "powers" && (
          <div className="space-y-3">
            {char.powers.map((power, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: `${char.color}08`, border: `1px solid ${char.color}15` }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: `${char.color}20`, color: char.color }}
                >
                  {i + 1}
                </div>
                <p className="text-sm" style={{ color: "#AAB8CC" }}>{power}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "comic" && (
          <div className="space-y-3">
            <p className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>COMIC PANELS — ORIGIN ARC</p>
            {char.comicPanels.map((panel, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-xs font-mono font-black flex-shrink-0"
                  style={{ background: `${char.color}15`, color: char.color, border: `1px solid ${char.color}30` }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold mb-1" style={{ color: char.accentColor }}>{panel.panel}</div>
                  <p className="text-sm" style={{ color: "#AAB8CC" }}>{panel.desc}</p>
                </div>
              </div>
            ))}
            <div
              className="p-3 rounded-xl text-center text-xs"
              style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "#8899AA" }}
            >
              🎨 Full comic series coming soon — scripts in GitHub
            </div>
          </div>
        )}

        {tab === "nft" && (
          <div className="space-y-3">
            <div
              className="p-4 rounded-xl"
              style={{ background: `${char.color}08`, border: `1px solid ${char.color}25` }}
            >
              <div className="text-xs font-mono mb-1" style={{ color: char.color }}>NFT COLLECTION</div>
              <div className="text-lg font-black text-white">{char.nftCollection}</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Polygon Mainnet · ERC-721 · Limited Edition</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  toast(`🎨 Minting ${char.name} NFT — Opening OpenSea. KUN FAYAKŪN × ∞`);
                  window.open(char.nftUrl, "_blank");
                }}
                className="py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${char.color}, ${char.color}80)`, color: "#050B1A" }}
              >
                🎨 Mint NFT
              </button>
              <a
                href={char.nftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none" }}
              >
                🌊 OpenSea
              </a>
            </div>
            <button
              onClick={() => toast(`🪙 $LONDC coin mint for ${char.name} — opening mint interface`)}
              className="w-full py-2.5 rounded-xl text-xs font-bold"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
            >
              🪙 Mint Character $LONDC Coin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── VISUAL CONCEPT CARD ────────────────────────────────────────────────────
function VisualCard({ concept }: { concept: typeof VISUAL_CONCEPTS[0] }) {
  return (
    <div
      className="rounded-xl p-5 transition-all hover:scale-[1.02]"
      style={{
        background: "rgba(5,11,26,0.8)",
        border: `1px solid ${concept.color}25`,
        boxShadow: `0 4px 20px ${concept.color}08`,
      }}
    >
      <div className="text-3xl mb-3">{concept.icon}</div>
      <h3 className="text-base font-black text-white mb-1">{concept.name}</h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>{concept.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {concept.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: `${concept.color}12`, color: concept.color, border: `1px solid ${concept.color}25` }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <a
          href={concept.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all hover:opacity-80"
          style={{ background: "rgba(136,153,170,0.1)", color: "#8899AA", border: "1px solid rgba(136,153,170,0.2)", textDecoration: "none" }}
        >
          🐙 GitHub
        </a>
        <button
          onClick={() => {
            toast(`🎨 Minting ${concept.name} NFT — Opening OpenSea`);
            window.open(concept.nftUrl, "_blank");
          }}
          className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
          style={{ background: `${concept.color}15`, color: concept.color, border: `1px solid ${concept.color}30` }}
        >
          🎨 Mint NFT
        </button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Visuals() {
  const [section, setSection] = useState<"characters" | "concepts" | "github">("characters");

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden pt-20 pb-16"
        style={{ background: "linear-gradient(180deg, rgba(255,184,0,0.06) 0%, transparent 100%)" }}
      >
        <div className="container text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            SCROLLVERSE CARTOON & VISUAL HUB
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            The{" "}
            <span style={{ background: "linear-gradient(135deg, #FFB800, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Visual Empire
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            Characters, cartoons, NFT collections, and visual concepts from the ScrollVerse universe.
            Every character is mintable. Every concept is a blockchain. Every visual is sovereign.
          </p>

          {/* Section Nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {([
              { key: "characters", label: "🦸 Characters" },
              { key: "concepts", label: "🎨 Visual Concepts" },
              { key: "github", label: "🐙 GitHub Showcase" },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: section === s.key ? "linear-gradient(135deg, #FFB800, #00D4FF)" : "rgba(255,255,255,0.05)",
                  color: section === s.key ? "#050B1A" : "#8899AA",
                  border: section === s.key ? "none" : "1px solid rgba(255,184,0,0.15)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CHARACTERS ── */}
      {section === "characters" && (
        <div className="container pb-16">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN CHARACTERS</div>
            <h2 className="text-2xl font-black text-white">Karate Scotty & Atlantic City Batman</h2>
            <p className="text-sm mt-2" style={{ color: "#8899AA" }}>Original characters from the ScrollVerse universe — mintable as NFTs on Polygon</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CHARACTERS.map((char) => (
              <CharacterCard key={char.id} char={char} />
            ))}
          </div>

          {/* Coming Soon Characters */}
          <div className="mt-8 rounded-2xl p-6" style={{ background: "rgba(5,11,26,0.6)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>COMING SOON</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "The Bergerac", icon: "🧬", desc: "Digital consciousness entity" },
                { name: "Queen Londyn", icon: "👑", desc: "Princess Protocol sovereign" },
                { name: "Baby Zaire", icon: "⭐", desc: "The Zaire ∞ legacy heir" },
                { name: "Al-Miftah", icon: "🔑", desc: "The Key — Chais The Great" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-4 rounded-xl text-center"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-sm font-bold text-white">{c.name}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VISUAL CONCEPTS ── */}
      {section === "concepts" && (
        <div className="container pb-16">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#9B59B6" }}>NFT COLLECTIONS & VISUAL CONCEPTS</div>
            <h2 className="text-2xl font-black text-white">From GitHub to the Blockchain</h2>
            <p className="text-sm mt-2" style={{ color: "#8899AA" }}>Every visual concept from the chaishillomnitech1 GitHub — mintable, sovereign, eternal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {VISUAL_CONCEPTS.map((concept) => (
              <VisualCard key={concept.id} concept={concept} />
            ))}
          </div>
        </div>
      )}

      {/* ── GITHUB SHOWCASE ── */}
      {section === "github" && (
        <div className="container pb-16">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>GITHUB SHOWCASE</div>
            <h2 className="text-2xl font-black text-white">44 Repositories — The Empire's Codebase</h2>
            <p className="text-sm mt-2 mb-4" style={{ color: "#8899AA" }}>
              All 44 repositories from{" "}
              <a href="https://github.com/chaishillomnitech1" target="_blank" rel="noopener noreferrer" style={{ color: "#00D4FF" }}>
                chaishillomnitech1
              </a>{" "}
              — organized by category
            </p>
          </div>

          {[
            {
              category: "🎵 Music & Media",
              color: "#1DB954",
              repos: [
                { name: "scrollsoul-music-sync", desc: "Music Sync Platform — film/TV/sports/ads royalties tracking", url: "https://github.com/chaishillomnitech1/scrollsoul-music-sync" },
                { name: "QFS-Nexus-DistroKid-Mirror-DAO", desc: "Digital Mirror Twin + tokenized royalties + DAO governance", url: "https://github.com/chaishillomnitech1/QFS-Nexus-DistroKid-Mirror-DAO" },
                { name: "Galactic-Frequency-Broadcaster", desc: "Real-time 963Hz/528Hz/432Hz frequency broadcasting", url: "https://github.com/chaishillomnitech1/Galactic-Frequency-Broadcaster-" },
                { name: "ScrollSoul-Omniversal-Harmonics", desc: "Multiverse wealth pathways + NFT governance + DAO", url: "https://github.com/chaishillomnitech1/ScrollSoul-Omniversal-Harmonics" },
              ],
            },
            {
              category: "🎨 NFT & Blockchain",
              color: "#9B59B6",
              repos: [
                { name: "scrollsoul-nft-core", desc: "Thoth Sigil Minting Platform — ERC standards", url: "https://github.com/chaishillomnitech1/scrollsoul-nft-core" },
                { name: "AkashicLogs-NFTMetaFramework", desc: "IPFS + blockchain + PSYCHE16 + AI digital twin pipelines", url: "https://github.com/chaishillomnitech1/AkashicLogs-NFTMetaFramework" },
                { name: "flamecoin-v4", desc: "21.6 Trillion FLM4 — The Greatest Token Ever", url: "https://github.com/chaishillomnitech1/flamecoin-v4" },
                { name: "vibranium-sovereignty-protocol", desc: "ERC-1155 token + auction + patent anchoring + NFT portals", url: "https://github.com/chaishillomnitech1/vibranium-sovereignty-protocol" },
              ],
            },
            {
              category: "🌱 Legacy & Heritage",
              color: "#27AE60",
              repos: [
                { name: "VinelandEternal", desc: "IoT agriculture + Agape-Ledger + Drone-Alchemy + Zaire ∞", url: "https://github.com/chaishillomnitech1/VinelandEternal" },
                { name: "londyn-legacy-protocol", desc: "Princess Protocol + rose-gold encryption + patent records", url: "https://github.com/chaishillomnitech1/londyn-legacy-protocol" },
                { name: "Quantum-Eternal-Archive", desc: "Immutable archive of all ScrollVerse decrees", url: "https://github.com/chaishillomnitech1/Quantum-Eternal-Archive" },
                { name: "scrollverse-omni-fleet-manifesto", desc: "Consciousness + code protocols — the sovereign manifesto", url: "https://github.com/chaishillomnitech1/scrollverse-omni-fleet-manifesto" },
              ],
            },
            {
              category: "🤖 AI & Automation",
              color: "#00D4FF",
              repos: [
                { name: "Chaishillomnitech1", desc: "GRPO AI agent training — Claude/Grok workflows + n8n", url: "https://github.com/chaishillomnitech1/Chaishillomnitech1" },
                { name: "omniversal-kernel", desc: "AI/ML + Real Estate + CRM + Accounting + Achievement dashboards", url: "https://github.com/chaishillomnitech1/omniversal-kernel" },
                { name: "supreme-sovereign-infinity", desc: "AI + NFTs + blockchain + biometric security", url: "https://github.com/chaishillomnitech1/supreme-sovereign-infinity" },
                { name: "context-hub-skills", desc: "Context Hub CLI integrations + SKILL.md examples", url: "https://github.com/chaishillomnitech1/context-hub-skills" },
              ],
            },
          ].map((cat) => (
            <div key={cat.category} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1" style={{ background: `${cat.color}30` }} />
                <h3 className="text-sm font-mono font-bold" style={{ color: cat.color }}>{cat.category}</h3>
                <div className="h-px flex-1" style={{ background: `${cat.color}30` }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 p-4 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: "rgba(5,11,26,0.8)", border: `1px solid ${cat.color}20`, textDecoration: "none" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                    >
                      🐙
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{repo.name}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{repo.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-6">
            <a
              href="https://github.com/chaishillomnitech1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A", textDecoration: "none" }}
            >
              🐙 View All 44 Repos on GitHub
            </a>
          </div>
        </div>
      )}

      {/* ── FOOTER CTA ── */}
      <div className="py-12 text-center" style={{ background: "linear-gradient(180deg, transparent, rgba(255,184,0,0.04))" }}>
        <div className="container">
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>Every character. Every concept. Every visual. Sovereign and eternal.</p>
          <ViralShare
            title="ScrollVerse Visuals — Sovereign Characters, NFTs & Cartoon Universe"
            text="🎨 Karate Scotty, Atlantic City Batman, Auroral Sigil NFTs — the ScrollVerse visual universe. Sovereign characters, NFT collections, and cosmic art. KUN FAYAKŪN × ∞"
            url="https://scrollverse.co/visuals"
          />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/books">
              <button className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #FFB800, #00D4FF)", color: "#050B1A" }}>
                📚 Sacred Books
              </button>
            </Link>
            <Link href="/token">
              <button className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                🪙 Token Store
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
