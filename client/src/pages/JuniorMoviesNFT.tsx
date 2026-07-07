/*
 * JUNIOR MOVIES NFT VAULT — Character Collection + Coin Sets
 * Route: /junior-movies-nft
 * Every character is a sovereign NFT. Every episode is FREE.
 * KUN FAYAKŪN × ∞
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const YOUTUBE_CHANNEL = "https://youtube.com/@juniormoviesentertainment";
const THOTH_VIDEO = "https://youtu.be/Lb5t_F7UlR4";
const PINATA_GW = "https://olive-delicate-koi-568.mypinata.cloud/ipfs/";

// ── CHARACTER NFT COLLECTION ─────────────────────────────────────────────────
const CHARACTERS = [
  {
    id: "thoth",
    name: "THOTH",
    title: "The Divine Scribe",
    description: "Keeper of divine knowledge, scribe of the gods, guardian of the scrolls. The ancient one who bridges all timelines. Encoded at 963Hz God-State frequency.",
    freq: "963Hz",
    color: "#FFB800",
    rarity: "LEGENDARY",
    supply: 144,
    mintPrice: "0.144 ETH",
    coinSymbol: "$THOTH",
    coinSupply: "144,000,000",
    coinChain: "Polygon",
    episode: THOTH_VIDEO,
    episodeFree: true,
    icon: "🏺",
    traits: ["Ancient Wisdom", "Divine Scribe", "963Hz", "Sovereign", "Immortal"],
    nftId: "THOTH-001",
    chain: "Polygon",
  },
  {
    id: "ra",
    name: "RA",
    title: "The Solar Sovereign",
    description: "The sun god. Source of all light, life, and sovereign power. Every sunrise is Ra's decree. Encoded at 741Hz Power frequency.",
    freq: "741Hz",
    color: "#FF6B35",
    rarity: "LEGENDARY",
    supply: 99,
    mintPrice: "0.099 ETH",
    coinSymbol: "$RA",
    coinSupply: "99,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "☀️",
    traits: ["Solar Power", "Life Force", "741Hz", "Sovereign", "Creator"],
    nftId: "RA-001",
    chain: "Polygon",
  },
  {
    id: "isis",
    name: "ISIS",
    title: "The Divine Mother",
    description: "Goddess of healing, magic, and divine love. The mother of all creation. Her wings shelter the empire. Encoded at 528Hz Love frequency.",
    freq: "528Hz",
    color: "#00FF88",
    rarity: "LEGENDARY",
    supply: 528,
    mintPrice: "0.528 ETH",
    coinSymbol: "$ISIS",
    coinSupply: "528,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "🦅",
    traits: ["Divine Love", "Healing", "528Hz", "Magic", "Eternal Mother"],
    nftId: "ISIS-001",
    chain: "Polygon",
  },
  {
    id: "horus",
    name: "HORUS",
    title: "The Falcon King",
    description: "The sky god. Protector of the sovereign, guardian of the throne. His eye sees all. Encoded at 432Hz Harmony frequency.",
    freq: "432Hz",
    color: "#00D4FF",
    rarity: "EPIC",
    supply: 432,
    mintPrice: "0.432 ETH",
    coinSymbol: "$HORUS",
    coinSupply: "432,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "🦁",
    traits: ["Sky Guardian", "All-Seeing Eye", "432Hz", "Protector", "King"],
    nftId: "HORUS-001",
    chain: "Polygon",
  },
  {
    id: "anubis",
    name: "ANUBIS",
    title: "The Sovereign Judge",
    description: "Guardian of the underworld, weigher of hearts. Justice incarnate. No soul passes without his judgment. Encoded at 396Hz Liberation frequency.",
    freq: "396Hz",
    color: "#A78BFA",
    rarity: "EPIC",
    supply: 396,
    mintPrice: "0.396 ETH",
    coinSymbol: "$ANUBIS",
    coinSupply: "396,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "⚖️",
    traits: ["Divine Justice", "Soul Guardian", "396Hz", "Judge", "Protector"],
    nftId: "ANUBIS-001",
    chain: "Polygon",
  },
  {
    id: "osiris",
    name: "OSIRIS",
    title: "The Resurrection King",
    description: "God of resurrection, eternal life, and sovereign rule. He who was dismembered and made whole. The cycle of death and rebirth. Encoded at 852Hz frequency.",
    freq: "852Hz",
    color: "#4ADE80",
    rarity: "EPIC",
    supply: 852,
    mintPrice: "0.852 ETH",
    coinSymbol: "$OSIRIS",
    coinSupply: "852,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "🌿",
    traits: ["Resurrection", "Eternal Life", "852Hz", "Sovereign King", "Renewal"],
    nftId: "OSIRIS-001",
    chain: "Polygon",
  },
  {
    id: "bastet",
    name: "BASTET",
    title: "The Sovereign Protector",
    description: "Goddess of home, protection, and fierce love. The cat goddess who guards the empire with divine ferocity. Encoded at 111Hz Manifestation frequency.",
    freq: "111Hz",
    color: "#EC4899",
    rarity: "RARE",
    supply: 1111,
    mintPrice: "0.111 ETH",
    coinSymbol: "$BASTET",
    coinSupply: "111,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "🐱",
    traits: ["Protection", "Fierce Love", "111Hz", "Home Guardian", "Sovereign"],
    nftId: "BASTET-001",
    chain: "Polygon",
  },
  {
    id: "sekhmet",
    name: "SEKHMET",
    title: "The Warrior Goddess",
    description: "Goddess of war, healing, and transformation. The lioness who destroys what must be destroyed and heals what must be healed. Encoded at 1558Hz FlameDNA.",
    freq: "1558Hz",
    color: "#EF4444",
    rarity: "RARE",
    supply: 963,
    mintPrice: "0.963 ETH",
    coinSymbol: "$SEKHMET",
    coinSupply: "963,000,000",
    coinChain: "Polygon",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "🦁",
    traits: ["Warrior", "Healer", "1558Hz", "Transformation", "FlameDNA"],
    nftId: "SEKHMET-001",
    chain: "Polygon",
  },
  {
    id: "nefertiti",
    name: "NEFERTITI",
    title: "The Beautiful One Has Come",
    description: "The sovereign queen. Beauty, power, and divine grace unified. Her name means 'the beautiful one has come' — and she has. Encoded at 528Hz Love frequency.",
    freq: "528Hz",
    color: "#F59E0B",
    rarity: "RARE",
    supply: 744,
    mintPrice: "0.528 ETH",
    coinSymbol: "$NEFERTITI",
    coinSupply: "528,000,000",
    coinChain: "Ethereum",
    episode: YOUTUBE_CHANNEL,
    episodeFree: true,
    icon: "👑",
    traits: ["Beauty", "Sovereign Queen", "528Hz", "Grace", "Divine Power"],
    nftId: "NEFERTITI-001",
    chain: "Ethereum",
  },
];

const RARITY_COLORS: Record<string, string> = {
  LEGENDARY: "#FFB800",
  EPIC: "#A78BFA",
  RARE: "#00D4FF",
  COMMON: "#8899AA",
};

function CharacterCard({ char, onMint }: { char: typeof CHARACTERS[0]; onMint: (c: typeof CHARACTERS[0]) => void }) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer transition-all duration-500"
      style={{
        perspective: "1000px",
        height: "420px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${char.color}15, rgba(3,8,18,0.95))`,
            border: `1px solid ${hovered ? char.color + "60" : char.color + "25"}`,
            boxShadow: hovered ? `0 0 40px ${char.color}30` : "none",
            transition: "all 0.3s ease",
          }}
        >
          {/* Rarity badge */}
          <div className="flex items-center justify-between p-4 pb-0">
            <div
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${RARITY_COLORS[char.rarity]}20`, color: RARITY_COLORS[char.rarity], border: `1px solid ${RARITY_COLORS[char.rarity]}40` }}
            >
              {char.rarity}
            </div>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{char.freq}</div>
          </div>

          {/* Character icon */}
          <div
            className="flex items-center justify-center mx-4 my-4 rounded-xl"
            style={{
              height: "160px",
              background: `radial-gradient(circle at center, ${char.color}20, transparent 70%)`,
              border: `1px solid ${char.color}20`,
            }}
          >
            <div style={{ fontSize: "80px", filter: `drop-shadow(0 0 20px ${char.color})` }}>
              {char.icon}
            </div>
          </div>

          {/* Character info */}
          <div className="px-4 pb-4">
            <div className="font-black text-white text-xl mb-0.5">{char.name}</div>
            <div className="text-xs mb-2" style={{ color: char.color }}>{char.title}</div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>
              {char.description.substring(0, 100)}...
            </p>

            {/* Coin badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
              style={{ background: `${char.color}10`, border: `1px solid ${char.color}25` }}
            >
              <span className="text-xs font-bold" style={{ color: char.color }}>{char.coinSymbol}</span>
              <span className="text-xs" style={{ color: "#8899AA" }}>{char.coinSupply} supply · {char.coinChain}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onMint(char); }}
                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}
              >
                Mint {char.mintPrice}
              </button>
              <a
                href={char.episode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="px-3 py-2 rounded-lg text-xs font-bold"
                style={{ background: "rgba(255,0,0,0.15)", color: "#FF4444", border: "1px solid rgba(255,0,0,0.3)" }}
              >
                ▶ FREE
              </a>
            </div>
          </div>
        </div>

        {/* BACK (coin details) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, rgba(3,8,18,0.98), ${char.color}10)`,
            border: `1px solid ${char.color}40`,
          }}
        >
          <div className="text-center mb-4">
            <div style={{ fontSize: "48px" }}>{char.icon}</div>
            <div className="font-black text-white text-lg">{char.name}</div>
            <div className="text-xs font-mono mt-1" style={{ color: char.color }}>SOVEREIGN COIN SET</div>
          </div>

          <div className="space-y-2 mb-4">
            {[
              { label: "Coin Symbol", value: char.coinSymbol },
              { label: "Total Supply", value: char.coinSupply },
              { label: "Chain", value: char.coinChain },
              { label: "NFT Supply", value: `${char.supply} editions` },
              { label: "Mint Price", value: char.mintPrice },
              { label: "Frequency", value: char.freq },
              { label: "NFT ID", value: char.nftId },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-xs">
                <span style={{ color: "#8899AA" }}>{item.label}</span>
                <span className="font-bold" style={{ color: char.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {char.traits.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: `${char.color}15`, color: char.color }}>
                {t}
              </span>
            ))}
          </div>

          <div className="text-xs text-center" style={{ color: "#8899AA" }}>
            Click to flip back · Tap FREE to watch episode
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JuniorMoviesNFT() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mintTarget, setMintTarget] = useState<typeof CHARACTERS[0] | null>(null);
  const [filter, setFilter] = useState<"ALL" | "LEGENDARY" | "EPIC" | "RARE">("ALL");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const COLORS = ["#FFB800", "#00D4FF", "#00FF88", "#EC4899", "#A78BFA", "#FF6B35"];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.3,
        r: 0.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "88";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const filtered = filter === "ALL" ? CHARACTERS : CHARACTERS.filter(c => c.rarity === filter);

  return (
    <div className="min-h-screen relative" style={{ background: "#030812", fontFamily: "'Space Grotesk', sans-serif" }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.35 }} />

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-8 px-4">
        <div
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
        >
          🎬 JUNIOR MOVIES ENTERTAINMENT × SCROLLVERSE
        </div>

        <h1
          className="text-5xl md:text-7xl font-black mb-3"
          style={{
            background: "linear-gradient(135deg, #FFB800, #EC4899, #A78BFA, #00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Character NFT Vault
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
          Every character is a sovereign NFT with its own coin set. Every episode is FREE to watch.
          Ancient gods, sovereign warriors, and divine entities — tokenized forever on-chain.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {[
            { label: "Characters", value: `${CHARACTERS.length}`, color: "#FFB800" },
            { label: "All Episodes", value: "FREE", color: "#00FF88" },
            { label: "Coin Sets", value: `${CHARACTERS.length}`, color: "#00D4FF" },
            { label: "Chain", value: "Polygon + ETH", color: "#A78BFA" },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 rounded-lg text-sm" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30`, color: s.color }}>
              <span style={{ color: "#8899AA" }}>{s.label}: </span>
              <span className="font-bold">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Free episodes CTA */}
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "#FF0000", color: "white", boxShadow: "0 0 20px rgba(255,0,0,0.3)" }}
          >
            ▶ Watch ALL Episodes FREE
          </a>
          <a
            href={THOTH_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)" }}
          >
            🏺 Watch THOTH Now
          </a>
          <Link href="/junior-movies">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
            >
              🎬 Junior Movies Hub
            </span>
          </Link>
        </div>

        {/* Rarity filter */}
        <div className="flex gap-2 justify-center flex-wrap">
          {(["ALL", "LEGENDARY", "EPIC", "RARE"] as const).map(r => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: filter === r ? (r === "ALL" ? "#FFB800" : RARITY_COLORS[r]) : "rgba(255,255,255,0.05)",
                color: filter === r ? "#030812" : "#8899AA",
                border: `1px solid ${filter === r ? (r === "ALL" ? "#FFB800" : RARITY_COLORS[r]) : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Character grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(char => (
            <CharacterCard key={char.id} char={char} onMint={setMintTarget} />
          ))}
        </div>
      </div>

      {/* Mint modal */}
      {mintTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={() => setMintTarget(null)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full"
            style={{
              background: "#0a0f1e",
              border: `1px solid ${mintTarget.color}40`,
              boxShadow: `0 0 60px ${mintTarget.color}20`,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div style={{ fontSize: "64px" }}>{mintTarget.icon}</div>
              <div className="text-2xl font-black text-white mt-2">{mintTarget.name}</div>
              <div className="text-sm" style={{ color: mintTarget.color }}>{mintTarget.title}</div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Mint Price", value: mintTarget.mintPrice },
                { label: "Edition Size", value: `${mintTarget.supply} NFTs` },
                { label: "Coin Symbol", value: mintTarget.coinSymbol },
                { label: "Coin Supply", value: mintTarget.coinSupply },
                { label: "Chain", value: mintTarget.chain },
                { label: "Frequency", value: mintTarget.freq },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>{item.label}</span>
                  <span className="font-bold" style={{ color: mintTarget.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl font-black text-sm transition-all"
                style={{
                  background: `linear-gradient(135deg, ${mintTarget.color}, ${mintTarget.color}99)`,
                  color: "#030812",
                  boxShadow: `0 0 20px ${mintTarget.color}40`,
                }}
                onClick={() => {
                  alert(`Minting ${mintTarget.name} NFT for ${mintTarget.mintPrice} — Connect wallet to complete. Contract deployment via Thirdweb on ${mintTarget.chain}. KUN FAYAKŪN × ∞`);
                  setMintTarget(null);
                }}
              >
                ◈ MINT NOW — {mintTarget.mintPrice}
              </button>
              <button
                onClick={() => setMintTarget(null)}
                className="px-4 py-3 rounded-xl text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                ✕
              </button>
            </div>

            <div className="text-center mt-4">
              <a
                href={mintTarget.episode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs"
                style={{ color: "#FF4444" }}
              >
                ▶ Watch {mintTarget.name} episode FREE on YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞ — Junior Movies Entertainment × ScrollVerse Trinity
        </div>
        <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
          Every character is sovereign IP. Every episode is FREE. Every coin is eternal.
        </div>
      </div>
    </div>
  );
}
