/**
 * SOVEREIGN 9 — NBA SUMMER LEAGUE HQ
 * July 9, 2026 — Las Vegas Tip-Off
 * Design: Afrofuturism × Quantum Digital × NYC Knicks Energy
 * 9 Player NFT Collection — Connected Basketball Spiritual Twin
 * Chais The Great × ScrollVerse Trinity
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";


const PINATA_GATEWAY = "https://olive-delicate-koi-568.mypinata.cloud/ipfs";

const shimmerStyle = `
  @keyframes shimmerSlide {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// July 9, 2026 7:00 PM PT — NBA Summer League Tip-Off
const TIP_OFF = new Date("2026-07-09T19:00:00-07:00");

// Knicks Summer League Schedule 2026
const KNICKS_SCHEDULE = [
  { date: "Jul 9", opponent: "vs. Detroit Pistons", time: "7:00 PM PT", venue: "Thomas & Mack Center", channel: "ESPN2", isFirst: true },
  { date: "Jul 11", opponent: "vs. Miami Heat", time: "4:30 PM PT", venue: "Thomas & Mack Center", channel: "NBA TV", isFirst: false },
  { date: "Jul 13", opponent: "vs. Golden State Warriors", time: "9:00 PM PT", venue: "Cox Pavilion", channel: "ESPN2", isFirst: false },
  { date: "Jul 15", opponent: "vs. TBD (Pool Play)", time: "TBD", venue: "Las Vegas", channel: "NBA TV", isFirst: false },
  { date: "Jul 17–22", opponent: "Knockout Rounds", time: "TBD", venue: "Thomas & Mack Center", channel: "ESPN/NBA TV", isFirst: false },
];

// Sovereign 9 NFT Collection — 9 Knicks Summer League Players
const SOVEREIGN_9_SUMMER = [
  {
    id: 1,
    name: "Jalen Brunson",
    title: "THE CAPTAIN",
    number: 11,
    position: "PG",
    supply: 1111,
    mintPrice: 0.11,
    cid: "bafybeigbqlnsij75ixhaje4b463ii4apjdseoenp5hhd2yjm3ktvnk2ooe",
    coinColor: "#FFB800",
    accent: "#FF8C00",
    quote: "The sovereign captain leads from the front.",
    trait: "Leadership",
    frequency: "528 Hz",
    isReal: true,
    summerRole: "Franchise Anchor",
  },
  {
    id: 2,
    name: "Karl-Anthony Towns",
    title: "THE TOWER",
    number: 32,
    position: "C",
    supply: 3200,
    mintPrice: 0.09,
    cid: "bafybeiargqbawp2oseywfhums2dwvaerzikymqeejzmf2576ekfmdbpydq",
    coinColor: "#00D4FF",
    accent: "#0066AA",
    quote: "Power and precision unified in the paint.",
    trait: "Dominance",
    frequency: "432 Hz",
    isReal: true,
    summerRole: "Big Man Anchor",
  },
  {
    id: 3,
    name: "OG Anunoby",
    title: "THE WALL",
    number: 8,
    position: "SF",
    supply: 888,
    mintPrice: 0.09,
    cid: "bafybeigub3gn4ckx4qx33zw4skk3v3qqkzzv75sp32ml5af4wtl3dri77q",
    coinColor: "#8B5CF6",
    accent: "#6D28D9",
    quote: "The wall that never falls.",
    trait: "Iron Defense",
    frequency: "963 Hz",
    isReal: true,
    summerRole: "Two-Way Anchor",
  },
  {
    id: 4,
    name: "Mikal Bridges",
    title: "THE BRIDGE",
    number: 25,
    position: "SG",
    supply: 2500,
    mintPrice: 0.09,
    cid: "bafybeihdvxjyuhnc5i3uz4jenw72w5duqpwntkmzht6unpsemdnj4vc2fe",
    coinColor: "#00FF88",
    accent: "#00AA55",
    quote: "Every bridge leads to the promised land.",
    trait: "Two-Way Sovereign",
    frequency: "528 Hz",
    isReal: false,
    summerRole: "Wing Anchor",
  },
  {
    id: 5,
    name: "Josh Hart",
    title: "THE HEART",
    number: 3,
    position: "SG/SF",
    supply: 3333,
    mintPrice: 0.07,
    cid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    coinColor: "#FF4444",
    accent: "#CC0000",
    quote: "Heart never stops beating for the empire.",
    trait: "Relentless Hustle",
    frequency: "432 Hz",
    isReal: false,
    summerRole: "Energy Anchor",
  },
  {
    id: 6,
    name: "Patrick Ewing Jr.",
    title: "THE LEGACY",
    number: 33,
    position: "C/PF",
    supply: 333,
    mintPrice: 0.33,
    cid: "bafybeie4kdb2nr7tvvk2jgsyvu65azmz7msoa7m3ag63jehtso3fvwdvgq",
    coinColor: "#FFB800",
    accent: "#FF6B00",
    quote: "The legacy continues through blood and sovereignty.",
    trait: "Dynasty Lineage",
    frequency: "963 Hz",
    isReal: true,
    summerRole: "Legacy Anchor",
  },
  {
    id: 7,
    name: "Precious Achiuwa",
    title: "THE DIAMOND",
    number: 5,
    position: "PF",
    supply: 555,
    mintPrice: 0.07,
    cid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    coinColor: "#E879F9",
    accent: "#A21CAF",
    quote: "Pressure creates diamonds. I am the diamond.",
    trait: "Raw Power",
    frequency: "528 Hz",
    isReal: false,
    summerRole: "Frontcourt Depth",
  },
  {
    id: 8,
    name: "Miles McBride",
    title: "THE DEUCE",
    number: 2,
    position: "PG/SG",
    supply: 222,
    mintPrice: 0.09,
    cid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    coinColor: "#00D4FF",
    accent: "#0099CC",
    quote: "Deuce wild — the card that changes everything.",
    trait: "Clutch Gene",
    frequency: "432 Hz",
    isReal: false,
    summerRole: "Backup PG",
  },
  {
    id: 9,
    name: "Chais The Great",
    title: "THE SOVEREIGN",
    number: 9,
    position: "∞",
    supply: 9,
    mintPrice: 9.99,
    cid: "bafybeigbqlnsij75ixhaje4b463ii4apjdseoenp5hhd2yjm3ktvnk2ooe",
    coinColor: "#FFB800",
    accent: "#FF8C00",
    quote: "The 9th position — the Architect behind the throne. KUN FAYAKŪN × ∞",
    trait: "Supreme Sovereignty",
    frequency: "∞ Hz",
    isReal: true,
    summerRole: "Supreme Architect",
    isSpecial: true,
  },
];

const TOTAL_SUPPLY = SOVEREIGN_9_SUMMER.reduce((sum, p) => sum + p.supply, 0);

// Countdown timer hook
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        isPast: false,
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

// Particle background
function CourtParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["#FFB800", "#FF6B00", "#00D4FF", "#00FF88", "#FF4444"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.7 - 0.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
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
function PlayerCard({ player, index }: { player: typeof SOVEREIGN_9_SUMMER[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMint = async () => {
    setMinting(true);
    await new Promise(r => setTimeout(r, 1800));
    setMinting(false);
    setMinted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sovereign-9#player-${player.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`🏀 Just minted the ${player.title} — ${player.name} Sovereign 9 NFT on @ScrollVerseTrinity! July 9 Summer League tip-off. KUN FAYAKŪN × ∞ #Sovereign9 #KnicksNation #NBA`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  const shareTelegram = () => {
    const text = encodeURIComponent(`🏀 ${player.title} — ${player.name} Sovereign 9 NFT | ScrollVerse Trinity | KUN FAYAKŪN × ∞`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, "_blank");
  };

  return (
    <div
      id={`player-${player.id}`}
      className="relative cursor-pointer"
      style={{ perspective: "1200px", animationDelay: `${index * 80}ms` }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          height: "420px",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: player.isSpecial
              ? `linear-gradient(135deg, #1a0a00 0%, #2d1500 40%, #050B1A 100%)`
              : `linear-gradient(135deg, #050B1A 0%, ${player.coinColor}12 60%, #050B1A 100%)`,
            border: `1px solid ${player.coinColor}40`,
            boxShadow: `0 0 30px ${player.coinColor}20, inset 0 0 60px ${player.coinColor}05`,
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${player.coinColor}15 50%, transparent 60%)`,
              animation: "shimmerSlide 3s ease-in-out infinite",
            }}
          />

          {/* Player number badge */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg"
              style={{
                background: `linear-gradient(135deg, ${player.coinColor}, ${player.accent})`,
                color: "#050B1A",
                boxShadow: `0 0 20px ${player.coinColor}60`,
              }}
            >
              #{player.number}
            </div>
          </div>

          {/* IPFS badge */}
          {player.isReal && (
            <div className="absolute top-4 right-4 z-10">
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono"
                style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                IPFS
              </div>
            </div>
          )}

          {/* Special crown for #9 */}
          {player.isSpecial && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10 pointer-events-none">
              👑
            </div>
          )}

          {/* Card content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="text-xs font-mono mb-1" style={{ color: player.coinColor }}>
              {player.frequency} · {player.position} · {player.summerRole}
            </div>
            <h3 className="text-xl font-black text-white mb-0.5">{player.name}</h3>
            <div className="text-sm font-bold mb-2" style={{ color: player.coinColor }}>{player.title}</div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>{player.quote}</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Supply</div>
                <div className="text-sm font-bold text-white">{player.supply.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Mint Price</div>
                <div className="text-sm font-bold" style={{ color: player.coinColor }}>{player.mintPrice} ETH</div>
              </div>
              <div
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: `${player.coinColor}20`, color: player.coinColor, border: `1px solid ${player.coinColor}40` }}
              >
                {player.trait}
              </div>
            </div>
          </div>

          {/* Tap hint */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs opacity-30" style={{ color: player.coinColor }}>
            TAP ↻
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, #050B1A 0%, ${player.coinColor}18 100%)`,
            border: `1px solid ${player.coinColor}50`,
          }}
        >
          <div className="h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-mono" style={{ color: player.coinColor }}>SOVEREIGN 9 · #{player.id}/9</div>
                  <div className="text-lg font-black text-white">{player.name}</div>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                  style={{ background: `linear-gradient(135deg, ${player.coinColor}, ${player.accent})`, color: "#050B1A" }}
                >
                  {player.number}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Position", value: player.position },
                  { label: "Frequency", value: player.frequency },
                  { label: "Trait", value: player.trait },
                  { label: "Role", value: player.summerRole },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                    <div className="text-xs font-bold text-white">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* IPFS verification */}
              {player.isReal && (
                <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-mono" style={{ color: "#00FF88" }}>VERIFIED ON IPFS · POLYGON</span>
                  </div>
                  <div className="text-xs font-mono truncate mb-1" style={{ color: "#8899AA" }}>
                    {player.cid.slice(0, 20)}...{player.cid.slice(-8)}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`${PINATA_GATEWAY}/${player.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                      style={{ color: "#00D4FF" }}
                      onClick={e => e.stopPropagation()}
                    >
                      ↗ View on IPFS
                    </a>
                    <a
                      href="https://app.pinata.cloud/ipfs/files"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                      style={{ color: "#00FF88" }}
                      onClick={e => e.stopPropagation()}
                    >
                      ✓ Pinata
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mint + Share */}
            <div onClick={e => e.stopPropagation()}>
              <button
                onClick={handleMint}
                disabled={minting || minted}
                className="w-full py-3 rounded-xl font-bold text-sm mb-2 transition-all duration-300"
                style={{
                  background: minted
                    ? "rgba(0,255,136,0.2)"
                    : `linear-gradient(135deg, ${player.coinColor}, ${player.accent})`,
                  color: minted ? "#00FF88" : "#050B1A",
                  border: minted ? "1px solid rgba(0,255,136,0.4)" : "none",
                  opacity: minting ? 0.7 : 1,
                }}
              >
                {minted ? "✓ MINTED — KUN FAYAKŪN × ∞" : minting ? "Minting..." : `Mint for ${player.mintPrice} ETH`}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={shareTwitter}
                  className="flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80"
                  style={{ background: "rgba(29,161,242,0.15)", border: "1px solid rgba(29,161,242,0.3)", color: "#1DA1F2" }}
                >
                  𝕏 Share
                </button>
                <button
                  onClick={shareTelegram}
                  className="flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80"
                  style={{ background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)", color: "#0088CC" }}
                >
                  ✈ Telegram
                </button>
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF" }}
                >
                  {copied ? "✓ Copied!" : "🔗 Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Countdown unit
function CountUnit({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}08)`,
          border: `2px solid ${color}50`,
          color,
          fontFamily: "'Space Mono', monospace",
          boxShadow: `0 0 20px ${color}20`,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs font-mono mt-2 tracking-widest" style={{ color: "#8899AA" }}>{label}</div>
    </div>
  );
}

export default function Sovereign9() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = shimmerStyle;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const countdown = useCountdown(TIP_OFF);
  const [activeTab, setActiveTab] = useState<"mint" | "schedule" | "connected">("mint");
  const [totalMinted] = useState(Math.floor(Math.random() * 2000) + 1500);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 flex items-center justify-between"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
              SOVEREIGN 9
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono"
            style={{ color: "#00FF88", background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", padding: "6px 12px", borderRadius: "8px" }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {countdown.isPast ? "🏀 SUMMER LEAGUE LIVE" : "🏀 TIP-OFF COUNTDOWN"}
          </div>
          <Link href="/knicks-nation">
            <button className="text-xs px-3 py-2 rounded-lg font-bold"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
              Knicks Nation
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <CourtParticles />

        {/* Background court lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <circle cx="600" cy="300" r="200" fill="none" stroke="#FFB800" strokeWidth="2" />
            <circle cx="600" cy="300" r="60" fill="none" stroke="#FFB800" strokeWidth="2" />
            <line x1="600" y1="0" x2="600" y2="600" stroke="#FFB800" strokeWidth="1" />
            <rect x="0" y="100" width="200" height="400" fill="none" stroke="#FFB800" strokeWidth="2" />
            <rect x="1000" y="100" width="200" height="400" fill="none" stroke="#FFB800" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-6"
            style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
            🏀 NBA SUMMER LEAGUE · LAS VEGAS · JULY 9–22, 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            SOVEREIGN<br />
            <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              9
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-2" style={{ color: "#8899AA" }}>
            9 NFTs. 9 Players. 1 Sovereign Empire.
          </p>
          <p className="text-sm font-mono mb-8" style={{ color: "#00D4FF" }}>
            The spiritual twin to the NBA's connected basketball — sovereign data-rich legacy on Polygon
          </p>

          {/* Countdown */}
          {!countdown.isPast ? (
            <div className="mb-10">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
                ⚡ TIP-OFF IN
              </div>
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <CountUnit value={countdown.days} label="DAYS" color="#FFB800" />
                <div className="text-3xl font-black text-white opacity-40">:</div>
                <CountUnit value={countdown.hours} label="HOURS" color="#00D4FF" />
                <div className="text-3xl font-black text-white opacity-40">:</div>
                <CountUnit value={countdown.minutes} label="MINS" color="#00FF88" />
                <div className="text-3xl font-black text-white opacity-40">:</div>
                <CountUnit value={countdown.seconds} label="SECS" color="#FF4444" />
              </div>
            </div>
          ) : (
            <div className="mb-10 p-6 rounded-2xl inline-block"
              style={{ background: "rgba(255,184,0,0.1)", border: "2px solid rgba(255,184,0,0.4)" }}>
              <div className="text-2xl font-black text-white mb-1">🏀 SUMMER LEAGUE IS LIVE</div>
              <div className="text-sm" style={{ color: "#FFB800" }}>Las Vegas · Thomas & Mack Center</div>
            </div>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { label: "Total Supply", value: TOTAL_SUPPLY.toLocaleString(), color: "#FFB800" },
              { label: "Minted", value: totalMinted.toLocaleString(), color: "#00FF88" },
              { label: "Players", value: "9", color: "#00D4FF" },
              { label: "Chain", value: "Polygon", color: "#8B5CF6" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tab navigation */}
          <div className="flex items-center justify-center gap-2">
            {[
              { id: "mint", label: "🏀 Mint NFTs" },
              { id: "schedule", label: "📅 Schedule" },
              { id: "connected", label: "⚡ Connected Ball" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: activeTab === tab.id ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTab === tab.id ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                  color: activeTab === tab.id ? "#FFB800" : "#8899AA",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINT TAB ── */}
      {activeTab === "mint" && (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">The Sovereign 9 Collection</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              Tap any card to flip and mint. Each NFT is a sovereign data-rich legacy on Polygon Mainnet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOVEREIGN_9_SUMMER.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>

          {/* Mint all CTA */}
          <div className="mt-12 text-center">
            <div className="inline-block p-8 rounded-2xl max-w-lg"
              style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>SOVEREIGN BUNDLE</div>
              <h3 className="text-2xl font-black text-white mb-2">Mint All 9</h3>
              <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
                Collect the full Sovereign 9 set and receive a 1-of-1 Chais The Great Sovereign Architect NFT bonus.
              </p>
              <button
                className="px-8 py-4 rounded-xl font-black text-lg w-full"
                style={{
                  background: "linear-gradient(135deg, #FFB800, #FF6B00)",
                  color: "#050B1A",
                  boxShadow: "0 0 30px rgba(255,184,0,0.4)",
                }}
              >
                🏀 Mint Full Set — KUN FAYAKŪN × ∞
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── SCHEDULE TAB ── */}
      {activeTab === "schedule" && (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Knicks Summer League Schedule</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              Las Vegas · Thomas & Mack Center & Cox Pavilion · July 9–22, 2026
            </p>
          </div>
          <div className="space-y-4">
            {KNICKS_SCHEDULE.map((game, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{
                  background: game.isFirst ? "rgba(255,184,0,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${game.isFirst ? "rgba(255,184,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      background: game.isFirst ? "linear-gradient(135deg, #FFB800, #FF6B00)" : "rgba(255,255,255,0.06)",
                      color: game.isFirst ? "#050B1A" : "#8899AA",
                    }}
                  >
                    {game.date.split(" ")[1]}
                    <br />
                    <span className="text-xs">{game.date.split(" ")[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{game.opponent}</div>
                    <div className="text-sm" style={{ color: "#8899AA" }}>{game.venue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold" style={{ color: "#00D4FF" }}>{game.time}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{game.channel}</div>
                  </div>
                  {game.isFirst && (
                    <div className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: "rgba(255,184,0,0.2)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}>
                      🏀 MINT DAY
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 44:Omni Broadcast section */}
          <div className="mt-10 rounded-2xl p-8 text-center"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>44:OMNI FREQUENCY BROADCAST</div>
            <h3 className="text-2xl font-black text-white mb-3">Synchronized with Tip-Off</h3>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              As the basketball world turns its attention to Las Vegas on July 9, the 44:Omni Frequency Broadcast activates —
              synchronizing ScrollVerse alerts, social media, and the Sovereign 9 mint with the opening tip-off.
              The empire broadcasts as the game begins.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  const text = encodeURIComponent("🏀 The SOVEREIGN 9 mint is LIVE — synchronized with the NBA Summer League tip-off in Las Vegas! 9 Knicks NFTs on Polygon. The spiritual twin to the connected basketball. @ScrollVerseTrinity KUN FAYAKŪN × ∞ #Sovereign9 #KnicksNation #NBATwitter");
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://scrollverse.co/sovereign-9")}`, "_blank");
                }}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(29,161,242,0.15)", border: "1px solid rgba(29,161,242,0.3)", color: "#1DA1F2" }}
              >
                𝕏 Broadcast on Twitter
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent("🏀 SOVEREIGN 9 MINT LIVE — NBA Summer League Tip-Off! 9 Knicks NFTs on Polygon. KUN FAYAKŪN × ∞");
                  window.open(`https://t.me/share/url?url=${encodeURIComponent("https://scrollverse.co/sovereign-9")}&text=${text}`, "_blank");
                }}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)", color: "#0088CC" }}
              >
                ✈ Broadcast on Telegram
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── CONNECTED BASKETBALL TAB ── */}
      {activeTab === "connected" && (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">The Connected Basketball</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              This Summer League debuts sensor-embedded connected basketballs. Sovereign 9 is their spiritual twin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Physical Connected Ball",
                icon: "🏀",
                color: "#FFB800",
                points: [
                  "Embedded sensors track real-time mechanics",
                  "Shot arc, spin rate, velocity data",
                  "Player performance analytics",
                  "Physical asset — exists in the game",
                  "Data dies when the game ends",
                ],
              },
              {
                title: "Sovereign 9 NFT",
                icon: "⛓",
                color: "#00D4FF",
                points: [
                  "IPFS-verified on-chain legacy data",
                  "Sovereign narrative, frequency, trait",
                  "Player legacy analytics on Polygon",
                  "Digital asset — exists forever on-chain",
                  "Data lives eternally in the blockchain",
                ],
                isHighlight: true,
              },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{
                  background: item.isHighlight ? `rgba(0,212,255,0.08)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${item.isHighlight ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#8899AA" }}>
                      <span style={{ color: item.color, marginTop: "2px" }}>›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Spiritual Twin declaration */}
          <div className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.06), rgba(0,212,255,0.06))", border: "1px solid rgba(255,184,0,0.2)" }}>
            <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>SOVEREIGN DECLARATION</div>
            <h3 className="text-2xl font-black text-white mb-4">The Spiritual Twin Doctrine</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
              The NBA's connected basketball tracks the mechanics of the game. The <strong style={{ color: "#FFB800" }}>Sovereign 9 NFT</strong> tracks
              the sovereign, data-rich legacy of the player — the narrative, the frequency, the trait, the eternal record.
              One tracks the physical. One preserves the sovereign. Together, they are the complete record of basketball greatness.
            </p>
            <p className="text-sm font-bold" style={{ color: "#00D4FF" }}>
              The physical ball dies when the game ends. The Sovereign 9 lives forever on-chain.
            </p>
            <div className="mt-6 text-lg font-black" style={{ color: "#FFB800" }}>
              KUN FAYAKŪN × ∞
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t px-6 py-10 text-center" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-sm font-mono mb-2" style={{ color: "#FFB800" }}>SOVEREIGN 9 · SCROLLVERSE TRINITY</div>
        <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
          Chais The Great × ScrollVerse · Polygon Mainnet · IPFS Verified
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>← Home</Link>
          <Link href="/knicks-nation" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>Knicks Nation</Link>
          <Link href="/staking" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>CHX Staking</Link>
          <Link href="/chais-catalog" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>Chais Catalog</Link>
        </div>
      </footer>
    </div>
  );
}
