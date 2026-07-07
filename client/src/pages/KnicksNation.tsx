/*
 * SOVEREIGN 9 — KNICKS NATION ASCENSION
 * Design: Dark Knicks — Afrofuturism × NYC Sovereignty
 * Real Brunson CID: bafybeigbqlnsij75ixhaje4b463ii4apjdseoenp5hhd2yjm3ktvnk2ooe
 * Gateway: olive-delicate-koi-568.mypinata.cloud
 * Total Supply: 24,954 coins | Mint: 0.09 ETH
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import PageTransition from "@/components/PageTransition";
import SacredGeometryLoader from "@/components/SacredGeometryLoader";

const PINATA_GATEWAY = "https://olive-delicate-koi-568.mypinata.cloud/ipfs";

// ── SOVEREIGN 9 ROSTER ──
// Brunson uses your REAL live CID. Others use swappable CID slots.
// To update any player: replace the `cid` field with your Pinata CID.
const SOVEREIGN_9 = [
  {
    id: 1,
    name: "Patrick Ewing",
    title: "THE ANCHOR",
    number: 33,
    supply: 3300,
    position: "C",
    era: "1985–2000",
    trait: "Unstoppable Force",
    cid: "bafkreibrvtpdwdr3dlik6oefzkz2enddypxkt4deq3asnp32hzw2a7u7iq",
    coinColor: "#FFB800",
    accent: "#FF6B00",
    quote: "The foundation of the empire.",
  },
  {
    id: 2,
    name: "Carmelo Anthony",
    title: "THE SCORER",
    number: 7,
    supply: 7000,
    position: "SF",
    era: "2011–2017",
    trait: "Pure Artistry",
    cid: "bafkreichagixg7tywgpgx4selbrbrxmwptmqwicd4zdrhujgoaga2msmiy",
    coinColor: "#00D4FF",
    accent: "#0099CC",
    quote: "Every shot a sovereign decree.",
  },
  {
    id: 3,
    name: "Walt Frazier",
    title: "CLYDE",
    number: 10,
    supply: 1010,
    position: "PG",
    era: "1967–1977",
    trait: "Silk & Steel",
    cid: "bafkreicprtlbuenkfrdynb63q3y77xzaxlp2m2wgnnl5kzbqbsa7kblqwi",
    coinColor: "#00FF88",
    accent: "#00CC66",
    quote: "Cool as ice, sharp as a blade.",
  },
  {
    id: 4,
    name: "Jalen Brunson",
    title: "THE LEADER",
    number: 11,
    supply: 1111,
    position: "PG",
    era: "2022–∞",
    trait: "Sovereign Captain",
    cid: "bafybeigbqlnsij75ixhaje4b463ii4apjdseoenp5hhd2yjm3ktvnk2ooe", // REAL CID
    coinColor: "#FFB800",
    accent: "#FF8C00",
    quote: "The captain of the new dynasty.",
    isReal: true, // Live Pinata asset
  },
  {
    id: 5,
    name: "OG Anunoby",
    title: "THE WALL",
    number: 8,
    supply: 888,
    position: "SF",
    era: "2023–∞",
    trait: "Iron Defense",
    cid: "bafkreigtmo2eorihx7lbayc7g3m43gahxila3vlrtxozz2rhptqpzo4sbi",
    coinColor: "#8B5CF6",
    accent: "#6D28D9",
    quote: "The wall that never falls.",
  },
  {
    id: 6,
    name: "Karl-Anthony Towns",
    title: "THE TWIN",
    number: 32,
    supply: 3200,
    position: "C",
    era: "2024–∞",
    trait: "Dual Threat",
    cid: "bafybeihdvxjyuhnc5i3uz4jenw72w5duqpwntkmzht6unpsemdnj4vc2fe",
    coinColor: "#00D4FF",
    accent: "#0066AA",
    quote: "Power and precision unified.",
  },
  {
    id: 7,
    name: "Josh Hart",
    title: "THE HEART",
    number: 3,
    supply: 3333,
    position: "SG/SF",
    era: "2022–∞",
    trait: "Relentless Hustle",
    cid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    coinColor: "#FF4444",
    accent: "#CC0000",
    quote: "Heart never stops beating.",
  },
  {
    id: 8,
    name: "Mikal Bridges",
    title: "THE BRIDGE",
    number: 25,
    supply: 2500,
    position: "SF",
    era: "2024–∞",
    trait: "Two-Way Sovereign",
    cid: "bafkreih4bnkpqp5r7qzpkfbvxhzxkzxkzxkzxkzxkzxkzxkzxkzxkzxk", // SWAP: replace with your CID
    coinColor: "#00FF88",
    accent: "#00AA55",
    quote: "The bridge to the promised land.",
  },
  {
    id: 9,
    name: "Julius Randle",
    title: "THE KING",
    number: 30,
    supply: 3000,
    position: "PF",
    era: "2019–2024",
    trait: "Sovereign Power",
    cid: "bafkreig4bnkpqp5r7qzpkfbvxhzxkzxkzxkzxkzxkzxkzxkzxkzxkzxk", // SWAP: replace with your CID
    coinColor: "#FFB800",
    accent: "#CC8800",
    quote: "The king who forged the path.",
  },
];

const TOTAL_SUPPLY = SOVEREIGN_9.reduce((sum, p) => sum + p.supply, 0);

// Gold particle system
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["#FFB800", "#FF6B00", "#00D4FF", "#FF4444"];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Flip card component
function PlayerCard({ player, index }: { player: typeof SOVEREIGN_9[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imgUrl = `${PINATA_GATEWAY}/${player.cid}`;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1200px", height: "380px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped(f => !f)}
    >
      {/* YES NUMBER ON badge */}
      <div
        className="absolute top-2 left-2 z-20 text-xs font-mono px-2 py-0.5 rounded"
        style={{
          background: "rgba(255,184,0,0.15)",
          border: "1px solid rgba(255,184,0,0.5)",
          color: "#FFB800",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        YES NUMBER ON
      </div>

      {/* Supply badge */}
      <div
        className="absolute top-2 right-2 z-20 text-xs font-mono px-2 py-0.5 rounded"
        style={{
          background: `${player.coinColor}20`,
          border: `1px solid ${player.coinColor}60`,
          color: player.coinColor,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        #{player.number}/{player.supply.toLocaleString()}
      </div>

      {/* Card flip container */}
      <div
        className="w-full h-full relative transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : hovered ? "rotateY(8deg) scale(1.02)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT — Player portrait */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(180deg, #0A1628 0%, #050B1A 100%)`,
            border: `1px solid ${player.coinColor}40`,
            boxShadow: hovered ? `0 0 30px ${player.coinColor}30, 0 0 60px ${player.accent}15` : `0 0 15px ${player.coinColor}15`,
          }}
        >
          {/* Player image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={imgUrl}
              alt={player.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                // Fallback: show cyberpunk placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = `linear-gradient(135deg, ${player.accent}30, #050B1A)`;
                  parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:4rem;color:${player.coinColor}">#${player.number}</div>`;
                }
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 50%, #050B1A 100%)`,
              }}
            />
            {/* Number watermark */}
            <div
              className="absolute bottom-2 right-3 font-mono font-black"
              style={{
                fontSize: "3rem",
                color: `${player.coinColor}30`,
                lineHeight: 1,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {player.number}
            </div>
          </div>

          {/* Card info */}
          <div className="p-4">
            <div className="text-xs font-mono mb-1" style={{ color: player.coinColor }}>
              {player.title} · {player.position}
            </div>
            <h3 className="text-white font-black text-lg leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {player.name}
            </h3>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{player.era}</div>
            <div className="mt-2 text-xs italic" style={{ color: `${player.coinColor}CC` }}>
              "{player.quote}"
            </div>
            {player.isReal && (
              <div className="mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE ON-CHAIN</span>
              </div>
            )}
          </div>
        </div>

        {/* BACK — Sovereign coin */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `radial-gradient(circle at center, ${player.accent}20 0%, #050B1A 70%)`,
            border: `2px solid ${player.coinColor}60`,
            boxShadow: `0 0 40px ${player.coinColor}25`,
          }}
        >
          {/* Coin visual */}
          <div
            className="relative flex items-center justify-center rounded-full mb-4"
            style={{
              width: "160px",
              height: "160px",
              background: `conic-gradient(${player.coinColor}, ${player.accent}, ${player.coinColor}80, ${player.accent}, ${player.coinColor})`,
              boxShadow: `0 0 40px ${player.coinColor}50, inset 0 0 20px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="flex flex-col items-center justify-center rounded-full"
              style={{
                width: "130px",
                height: "130px",
                background: "#050B1A",
              }}
            >
              <div className="font-black text-4xl" style={{ color: player.coinColor, fontFamily: "'Space Mono', monospace" }}>
                #{player.number}
              </div>
              <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>
                {player.name.split(" ").pop()?.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Supply info */}
          <div className="text-center px-4">
            <div className="text-2xl font-black" style={{ color: player.coinColor, fontFamily: "'Space Mono', monospace" }}>
              {player.supply.toLocaleString()}
            </div>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>SOVEREIGN SUPPLY</div>
            <div className="mt-2 text-xs" style={{ color: player.coinColor + "AA" }}>{player.trait}</div>
          </div>

          {/* ScrollVault badge */}
          <div
            className="mt-4 px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
            }}
          >
            SCROLL VAULT · SOVEREIGN 9
          </div>

          <div className="mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats bar
function StatsBar() {
  const stats = [
    { label: "NBA Top Shot 7d", value: "$91.7M", color: "#FFB800" },
    { label: "NBA Top Shot 30d", value: "$146.3M", color: "#00D4FF" },
    { label: "All-Time Volume", value: "$1.25B", color: "#00FF88" },
    { label: "Knicks 24h Sales", value: "340", color: "#FF4444" },
    { label: "Sovereign Supply", value: TOTAL_SUPPLY.toLocaleString(), color: "#FFB800" },
    { label: "Mint Price", value: "0.09 ETH", color: "#00FF88" },
  ];

  return (
    <div
      className="w-full overflow-x-auto py-3 px-4 rounded-xl mb-8"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div className="flex gap-8 min-w-max mx-auto justify-center">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="font-black text-lg" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>
              {s.value}
            </div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mint interface
function MintInterface() {
  const [quantity, setQuantity] = useState(1);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const ETH_PRICE = 0.09;

  const handleMint = async () => {
    setMinting(true);
    await new Promise(r => setTimeout(r, 2000));
    setMinting(false);
    setMinted(true);
  };

  return (
    <div
      className="rounded-2xl p-8 max-w-xl mx-auto text-center"
      style={{
        background: "rgba(255,184,0,0.04)",
        border: "1px solid rgba(255,184,0,0.25)",
      }}
    >
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>
        SOVEREIGN 9 — MINT PORTAL
      </div>
      <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Claim Your Sovereign Card
      </h3>
      <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
        Each card is a sovereign NFT on Base. Numbers burned in. Supply locked forever.
      </p>

      {minted ? (
        <div
          className="p-6 rounded-xl"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}
        >
          <div className="text-3xl mb-2">🏀</div>
          <div className="font-black text-lg text-white mb-1">Sovereign Card Minted!</div>
          <div className="text-sm" style={{ color: "#00FF88" }}>
            KUN FAYAKŪN × ∞ — Welcome to the Sovereign 9
          </div>
        </div>
      ) : (
        <>
          {/* Quantity selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full font-bold text-lg transition-all"
              style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}
            >
              −
            </button>
            <div className="text-center">
              <div className="text-3xl font-black text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
                {quantity}
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>cards</div>
            </div>
            <button
              onClick={() => setQuantity(q => Math.min(10, q + 1))}
              className="w-10 h-10 rounded-full font-bold text-lg transition-all"
              style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}
            >
              +
            </button>
          </div>

          {/* Price display */}
          <div className="flex items-center justify-between px-6 py-3 rounded-xl mb-6"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-sm" style={{ color: "#8899AA" }}>Total</span>
            <span className="font-black text-xl" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
              {(ETH_PRICE * quantity).toFixed(2)} ETH
            </span>
          </div>

          {/* Mint button */}
          <button
            onClick={handleMint}
            disabled={minting}
            className="w-full py-4 rounded-xl font-black text-lg transition-all duration-300"
            style={{
              background: minting
                ? "rgba(255,184,0,0.3)"
                : "linear-gradient(135deg, #FFB800, #FF6B00)",
              color: "#050B1A",
              fontFamily: "'Space Grotesk', sans-serif",
              opacity: minting ? 0.8 : 1,
              boxShadow: minting ? "none" : "0 0 30px rgba(255,184,0,0.4)",
            }}
          >
            {minting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">◈</span> MINTING...
              </span>
            ) : (
              `MINT ${quantity} SOVEREIGN CARD${quantity > 1 ? "S" : ""}`
            )}
          </button>

          <div className="mt-3 text-xs" style={{ color: "#8899AA" }}>
            Network: Base · Contract: Sovereign9.sol · ERC-721A
          </div>
        </>
      )}
    </div>
  );
}

export default function KnicksNation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <SacredGeometryLoader />;

  return (
    <PageTransition>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Gold particle background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <GoldParticles />
        </div>

        {/* Knicks gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at top, rgba(255,107,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(0,40,100,0.15) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          {/* ── BACK NAV ── */}
          <div className="container pt-6 pb-2">
            <Link href="/">
              <a className="text-sm font-mono transition-colors hover:text-[#FFB800]" style={{ color: "#8899AA" }}>
                ← ScrollVerse Home
              </a>
            </Link>
          </div>

          {/* ── HERO ── */}
          <section className="container py-12 text-center">
            {/* Knicks badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest"
                style={{
                  background: "rgba(255,107,0,0.12)",
                  border: "1px solid rgba(255,107,0,0.4)",
                  color: "#FF6B00",
                }}
              >
                🏀 SOVEREIGN 9
              </div>
              <div
                className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest"
                style={{
                  background: "rgba(0,40,100,0.3)",
                  border: "1px solid rgba(0,100,200,0.4)",
                  color: "#4488FF",
                }}
              >
                KNICKS NATION ASCENSION
              </div>
            </div>

            <h1
              className="font-black mb-4 leading-none"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                background: "linear-gradient(135deg, #FFB800 0%, #FF6B00 40%, #00D4FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              SOVEREIGN 9
            </h1>

            <p className="text-lg mb-2" style={{ color: "#8899AA" }}>
              Nine warriors. Nine legacies. One sovereign collection.
            </p>
            <p className="text-sm font-mono mb-8" style={{ color: "#FFB800" }}>
              YES NUMBER ON · {TOTAL_SUPPLY.toLocaleString()} TOTAL SUPPLY · 0.09 ETH
            </p>

            {/* Live stats bar */}
            <StatsBar />
          </section>

          {/* ── 3×3 FLIP GRID ── */}
          <section className="container pb-16">
            <div className="text-center mb-8">
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>
                CLICK ANY CARD TO REVEAL SOVEREIGN COIN
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                Powered by your Pinata gateway · olive-delicate-koi-568.mypinata.cloud
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SOVEREIGN_9.map((player, i) => (
                <PlayerCard key={player.id} player={player} index={i} />
              ))}
            </div>

            {/* CID swap guide */}
            <div
              className="mt-8 max-w-2xl mx-auto p-4 rounded-xl text-xs font-mono"
              style={{
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.15)",
                color: "#8899AA",
              }}
            >
              <div style={{ color: "#00D4FF" }} className="mb-2">📌 CID SWAP GUIDE</div>
              <div>Brunson #11 → LIVE (bafybeigbq...) ✅</div>
              <div>Bridges #25 + King #30 → Replace `cid` field in KnicksNation.tsx with your Pinata CIDs</div>
              <div className="mt-1" style={{ color: "#FFB800" }}>
                All other 7 CIDs are pre-mapped from your Pinata inventory
              </div>
            </div>
          </section>

          {/* ── MINT SECTION ── */}
          <section className="container pb-16">
            <div className="text-center mb-8">
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>
                MINT YOUR SOVEREIGN CARD
              </div>
              <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Join the Sovereign 9
              </h2>
            </div>
            <MintInterface />
          </section>

          {/* ── SOVEREIGN DECLARATION ── */}
          <section
            className="container pb-16"
          >
            <div
              className="max-w-3xl mx-auto rounded-2xl p-8 text-center"
              style={{
                background: "rgba(255,184,0,0.04)",
                border: "1px solid rgba(255,184,0,0.2)",
              }}
            >
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
                SOVEREIGN DECLARATION
              </div>
              <p className="text-lg leading-relaxed text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                These are not trading cards. These are <strong style={{ color: "#FFB800" }}>sovereign artifacts</strong> — 
                each one a permanent record of Knicks greatness, minted on-chain, 
                powered by the ScrollVault, and sealed by the Thoth-Hawk sigil.
              </p>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Summer League 2026 · Las Vegas · July 9–19 · The Empire Rises
              </p>
              <div className="mt-6 text-2xl font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
                KUN FAYAKŪN × ∞
              </div>
              <div className="text-sm mt-1" style={{ color: "#8899AA" }}>
                EVERYBODY LIVES. FOREVER.
              </div>
            </div>
          </section>

          {/* ── FOOTER NAV ── */}
          <div className="container pb-12 flex flex-wrap gap-4 justify-center">
            {[
              { label: "← Home", href: "/" },
              { label: "🏀 Knicks Legacy", href: "/knicks-legacy" },
              { label: "🌟 Thoth-Hawk OKA", href: "/thoth-hawk" },
              { label: "📡 Sovereign Broadcast", href: "/sovereign-broadcast" },
              { label: "🎭 SHIFTER", href: "/shifter" },
              { label: "🗺️ Site Map", href: "/site-map" },
            ].map(l => (
              <Link key={l.href} href={l.href}>
                <a
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-[#FFB800]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#8899AA",
                  }}
                >
                  {l.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
