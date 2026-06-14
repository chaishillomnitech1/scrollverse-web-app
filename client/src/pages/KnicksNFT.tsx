/**
 * KNICKS PROPHECY NFT — ScrollVerse Trinity
 * Dynamic Prediction NFTs: Value increases if prophecy is correct
 * Immutable on-chain proof + rare collectible set
 * Scroll zkEVM deployment ready
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const PROPHECIES = [
  {
    id: "P001",
    title: "Knicks 2025-26 NBA Champions",
    description: "The New York Knicks claim the 2025-26 NBA Championship — the first title since 1973. Sealed on-chain as immutable sovereign prophecy.",
    rarity: "LEGENDARY",
    price: "0.144 ETH",
    priceUSD: "$444",
    supply: 144,
    minted: 89,
    color: "#FF6B35",
    accentColor: "#FFB800",
    oracle: "Chainlink Sports Oracle",
    resolveDate: "June 2026",
    multiplier: "10x if correct",
    contractAddress: "0x...Scroll zkEVM",
    traits: [
      { name: "Prophecy Type", value: "Championship" },
      { name: "Season", value: "2025-26" },
      { name: "Oracle", value: "Chainlink Functions" },
      { name: "Chain", value: "Scroll zkEVM" },
      { name: "Zakat", value: "7.77% auto-routed" },
    ],
  },
  {
    id: "P007",
    title: "Knicks Eastern Conference Finals MVP",
    description: "A Knicks player wins Eastern Conference Finals MVP — sealed in the Akashic records and verified by oracle at resolution.",
    rarity: "EPIC",
    price: "0.044 ETH",
    priceUSD: "$144",
    supply: 444,
    minted: 201,
    color: "#6B35FF",
    accentColor: "#00D4FF",
    oracle: "Chainlink Sports Oracle",
    resolveDate: "May 2026",
    multiplier: "5x if correct",
    contractAddress: "0x...Scroll zkEVM",
    traits: [
      { name: "Prophecy Type", value: "MVP Award" },
      { name: "Season", value: "2025-26" },
      { name: "Oracle", value: "Chainlink Functions" },
      { name: "Chain", value: "Scroll zkEVM" },
      { name: "Zakat", value: "7.77% auto-routed" },
    ],
  },
  {
    id: "P052",
    title: "Knicks 50+ Win Regular Season",
    description: "The Knicks finish with 50 or more wins in the 2025-26 regular season — a sovereign bet on the rise of the empire.",
    rarity: "RARE",
    price: "0.014 ETH",
    priceUSD: "$44",
    supply: 1440,
    minted: 677,
    color: "#00FF88",
    accentColor: "#00D4FF",
    oracle: "Chainlink Sports Oracle",
    resolveDate: "April 2026",
    multiplier: "3x if correct",
    contractAddress: "0x...Scroll zkEVM",
    traits: [
      { name: "Prophecy Type", value: "Season Record" },
      { name: "Season", value: "2025-26" },
      { name: "Oracle", value: "Chainlink Functions" },
      { name: "Chain", value: "Scroll zkEVM" },
      { name: "Zakat", value: "7.77% auto-routed" },
    ],
  },
];

const RARITY_COLORS: Record<string, string> = {
  LEGENDARY: "#FFB800",
  EPIC: "#9B59B6",
  RARE: "#00D4FF",
};

function ProphecyCard({ prophecy, onMint }: { prophecy: typeof PROPHECIES[0]; onMint: (id: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  const pct = Math.round((prophecy.minted / prophecy.supply) * 100);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "420px",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${prophecy.color}18, rgba(5,11,26,0.95))`,
            border: `1px solid ${prophecy.color}40`,
          }}
        >
          {/* Rarity badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full font-bold"
              style={{ background: `${RARITY_COLORS[prophecy.rarity]}20`, color: RARITY_COLORS[prophecy.rarity], border: `1px solid ${RARITY_COLORS[prophecy.rarity]}40` }}
            >
              ◈ {prophecy.rarity}
            </span>
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>#{prophecy.id}</span>
          </div>

          {/* NFT Visual */}
          <div
            className="w-full rounded-xl mb-4 flex items-center justify-center"
            style={{
              height: "160px",
              background: `radial-gradient(circle at 50% 50%, ${prophecy.color}30, ${prophecy.accentColor}10, transparent)`,
              border: `1px solid ${prophecy.color}30`,
            }}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🗽</div>
              <div className="text-xs font-mono" style={{ color: prophecy.color }}>KNICKS × SCROLLVERSE</div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-black text-white mb-2 leading-tight">{prophecy.title}</h3>
          <p className="text-xs mb-4 flex-1" style={{ color: "#8899AA" }}>{prophecy.description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1" style={{ color: "#8899AA" }}>
              <span>{prophecy.minted} minted</span>
              <span>{prophecy.supply - prophecy.minted} remaining</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${prophecy.color}, ${prophecy.accentColor})` }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Mint Price</div>
              <div className="font-bold text-white">{prophecy.price} <span className="text-xs" style={{ color: "#8899AA" }}>({prophecy.priceUSD})</span></div>
            </div>
            <div className="text-xs text-right" style={{ color: prophecy.color }}>
              <div className="font-bold">{prophecy.multiplier}</div>
              <div style={{ color: "#8899AA" }}>Resolves {prophecy.resolveDate}</div>
            </div>
          </div>

          <div className="mt-2 text-center text-xs" style={{ color: "#8899AA" }}>Click to see traits →</div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, rgba(5,11,26,0.98), ${prophecy.color}15)`,
            border: `1px solid ${prophecy.color}40`,
          }}
        >
          <div className="text-xs font-mono mb-4" style={{ color: prophecy.color }}>NFT TRAITS & ORACLE</div>
          <div className="space-y-2 flex-1">
            {prophecy.traits.map(t => (
              <div key={t.name} className="flex justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span className="text-xs" style={{ color: "#8899AA" }}>{t.name}</span>
                <span className="text-xs font-bold text-white">{t.value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-xs" style={{ color: "#8899AA" }}>If Correct</span>
              <span className="text-xs font-bold" style={{ color: "#00FF88" }}>{prophecy.multiplier}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs" style={{ color: "#8899AA" }}>If Incorrect</span>
              <span className="text-xs font-bold" style={{ color: "#FF6B6B" }}>Rare Collectible (no refund)</span>
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); onMint(prophecy.id); }}
            className="w-full py-3 rounded-xl font-bold text-sm mt-4 transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${prophecy.color}, ${prophecy.accentColor})`, color: "#050B1A" }}
          >
            MINT PROPHECY — {prophecy.price}
          </button>
          <div className="mt-2 text-center text-xs" style={{ color: "#8899AA" }}>Click card to flip back</div>
        </div>
      </div>
    </div>
  );
}

export default function KnicksNFT() {
  const { user } = useAuth();
  const [mintStatus, setMintStatus] = useState<Record<string, "idle" | "pending" | "success" | "error">>({});
  const [totalMinted] = useState(967);
  const [livePrice, setLivePrice] = useState<string | null>(null);

  // Simulate live oracle price feed
  useEffect(() => {
    const prices = ["$0.0144", "$0.0147", "$0.0151", "$0.0148", "$0.0155"];
    let i = 0;
    const interval = setInterval(() => {
      setLivePrice(prices[i % prices.length]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMint = async (id: string) => {
    if (!user) {
      window.location.href = getLoginUrl();
      return;
    }
    setMintStatus(s => ({ ...s, [id]: "pending" }));
    // Simulate mint (replace with real contract call via wagmi/ethers)
    await new Promise(r => setTimeout(r, 2000));
    setMintStatus(s => ({ ...s, [id]: "success" }));
    setTimeout(() => setMintStatus(s => ({ ...s, [id]: "idle" })), 4000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── PROPHECY FULFILLED TOP BANNER ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] py-2 text-center text-xs font-mono font-bold tracking-widest"
        style={{ background: "linear-gradient(90deg, #FF6B35, #FFB800, #00FF88, #FFB800, #FF6B35)", color: "#050B1A" }}
      >
        🏆 PROPHECY FULFILLED — KNICKS NBA CHAMPIONS 2026 — NY 94 · SA 90 FINAL — JALEN BRUNSON FINALS MVP — 10x PAYOUT TRIGGERED 🏆
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(255,107,53,0.15)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>PROPHECY NFT</span>
          </Link>
          <div className="flex items-center gap-4">
            {livePrice && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span style={{ color: "#8899AA" }}>$LONDC</span>
                <span className="font-bold" style={{ color: "#FF6B35" }}>{livePrice}</span>
              </div>
            )}
            <Link href="/casino" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>Casino</Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">

        {/* ── CHAMPIONSHIP FULFILLED SECTION ── */}
        <section className="container py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-4" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              ORACLE RESOLVED — PROPHECY FULFILLED — JUNE 2026
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-3 leading-none">
              THE LOOP IS{" "}
              <span style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HEALED</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto mb-2" style={{ color: "#8899AA" }}>
              Chais Kenyatta Hill — Sabir Allah The Great — called this championship before the season began.
              The ScrollVerse oracle is now resolved. Every Prophecy NFT holder receives the 10x multiplier.
            </p>
            <p className="font-bold text-lg" style={{ color: "#FFB800" }}>
              "I was at the destination. I was just waiting for my team to catch up."
            </p>
            <p className="text-sm mt-1" style={{ color: "#FF6B35" }}>— Chais Kenyatta Hill, Sovereign Architect</p>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,107,53,0.3)", background: "rgba(255,107,53,0.04)" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/knicks-1999-vs-2026_eb0ea593.png"
                alt="MSG 1999 vs 2026 — Same Energy"
                className="w-full object-cover"
                style={{ maxHeight: "280px" }}
              />
              <div className="p-4">
                <div className="text-xs font-mono mb-1" style={{ color: "#FF6B35" }}>TIMELINE ANCHOR — MSG NETWORKS</div>
                <div className="font-bold text-white">1999 → 2026 — Same Energy. Loop Healed.</div>
                <div className="text-sm mt-1" style={{ color: "#8899AA" }}>27 years of faith. The Garden roared the same roar. The prophecy was always written in the stars.</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.04)" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/knicks-finals-94-90_204db49a.jpg"
                alt="NBA Finals — NY 94 SA 90 FINAL"
                className="w-full object-cover"
                style={{ maxHeight: "280px" }}
              />
              <div className="p-4">
                <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>NBA FINALS — GAME 7 — JUNE 2026</div>
                <div className="font-bold text-white">NY 94 · SA 90 — FINAL</div>
                <div className="text-sm mt-1" style={{ color: "#8899AA" }}>Jalen Brunson — Finals MVP. The Knicks are NBA Champions for the first time since 1973. KUN FAYAKŪN × ∞</div>
              </div>
            </div>
          </div>

          {/* Championship Video */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid rgba(255,183,0,0.3)", background: "rgba(255,183,0,0.04)" }}>
            <video
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/knicks-championship-celebration_6fe1aced.mp4"
              controls
              playsInline
              className="w-full"
              style={{ maxHeight: "420px" }}
            />
            <div className="p-4 text-center">
              <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>SOVEREIGN ARCHIVE — CHAMPIONSHIP CELEBRATION</div>
              <div className="font-bold text-white">The Moment the Prophecy Resolved — Sealed Forever in the ScrollVerse</div>
            </div>
          </div>

          {/* 10x Payout Banner */}
          <div className="p-6 rounded-2xl text-center max-w-3xl mx-auto" style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,212,255,0.08))", border: "1px solid rgba(0,255,136,0.25)" }}>
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>ORACLE RESOLUTION — AUTOMATIC PAYOUT TRIGGERED</div>
            <div className="text-4xl font-black text-white mb-2">10x MULTIPLIER ACTIVATED</div>
            <div className="text-sm" style={{ color: "#8899AA" }}>All Knicks Championship Prophecy NFT holders receive the 10x multiplier automatically via Chainlink oracle on Scroll zkEVM. Zakat (7.77%) routed to Guardian welfare pool. The prophecy is complete.</div>
          </div>
        </section>

        {/* HERO */}
        <section className="container py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-6" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)", color: "#FF6B35" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF6B35" }} />
            ORACLE-VERIFIED PROPHECY NFTs — SCROLL zkEVM
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">
            KNICKS<br />
            <span style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PROPHECY</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            The world's first oracle-backed prediction NFT collection. Mint your prophecy. If it comes true, your NFT multiplies in value — verified by Chainlink on Scroll zkEVM. Immutable proof. Eternal legacy.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { label: "Total Minted", value: totalMinted.toLocaleString() },
              { label: "Total Supply", value: "144,000" },
              { label: "Oracle", value: "Chainlink" },
              { label: "Chain", value: "Scroll zkEVM" },
              { label: "Zakat", value: "7.77%" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: "#FF6B35" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { step: "01", title: "Mint", desc: "Choose your prophecy and mint on Scroll zkEVM" },
              { step: "02", title: "Hold", desc: "Your NFT is sealed with Chainlink oracle verification" },
              { step: "03", title: "Resolve", desc: "Oracle verifies the outcome at the resolution date" },
              { step: "04", title: "Multiply", desc: "Correct prophecy = NFT value multiplies. Wrong = rare collectible" },
            ].map(s => (
              <div key={s.step} className="rounded-xl p-4 text-left" style={{ background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.15)" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#FF6B35" }}>STEP {s.step}</div>
                <div className="font-bold text-white mb-1">{s.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* NFT COLLECTION */}
        <section className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono mb-2" style={{ color: "#FF6B35" }}>ACTIVE PROPHECIES</div>
            <h2 className="text-3xl font-black text-white">Choose Your Prophecy</h2>
            <p className="text-sm mt-2" style={{ color: "#8899AA" }}>Click any card to reveal traits. Flip to mint.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PROPHECIES.map(p => (
              <div key={p.id} className="relative">
                {mintStatus[p.id] === "success" && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl" style={{ background: "rgba(0,255,136,0.15)", border: "2px solid #00FF88" }}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">✓</div>
                      <div className="font-bold text-white">Prophecy Minted!</div>
                      <div className="text-xs mt-1" style={{ color: "#00FF88" }}>Sealed in the Akashic records</div>
                    </div>
                  </div>
                )}
                {mintStatus[p.id] === "pending" && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl" style={{ background: "rgba(5,11,26,0.85)" }}>
                    <div className="text-center">
                      <div className="text-2xl mb-2 animate-spin">⚡</div>
                      <div className="text-sm text-white font-bold">Minting on Scroll zkEVM...</div>
                    </div>
                  </div>
                )}
                <ProphecyCard prophecy={p} onMint={handleMint} />
              </div>
            ))}
          </div>
        </section>

        {/* SMART CONTRACT INFO */}
        <section className="container py-20">
          <div className="max-w-3xl mx-auto rounded-2xl p-8" style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.2)" }}>
            <div className="text-xs font-mono mb-4" style={{ color: "#FF6B35" }}>SMART CONTRACT ARCHITECTURE</div>
            <h3 className="text-2xl font-black text-white mb-6">KnicksProphecySet.sol</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-bold text-white mb-3">Contract Features</div>
                <ul className="space-y-2">
                  {[
                    "ERC-721 with dynamic metadata",
                    "Chainlink Functions oracle resolution",
                    "On-chain value multiplier logic",
                    "7.77% Zakat auto-routing",
                    "Scroll zkEVM gas optimized",
                    "Groth16 ZK proof verification",
                    "ERC-4626 yield vault integration",
                    "Soulbound option post-resolution",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#8899AA" }}>
                      <span style={{ color: "#FF6B35" }}>›</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-3">Deployment</div>
                <div className="space-y-3">
                  {[
                    { label: "Network", value: "Scroll Sepolia (testnet)" },
                    { label: "Standard", value: "ERC-721 + ERC-4626" },
                    { label: "Oracle", value: "Chainlink Functions v1.3" },
                    { label: "Proof System", value: "Groth16 (Halo2)" },
                    { label: "Gas Limit", value: "5-10M per tx" },
                    { label: "Status", value: "Testnet Ready" },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between py-1 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="text-xs" style={{ color: "#8899AA" }}>{d.label}</span>
                      <span className="text-xs font-bold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl text-xs font-mono" style={{ background: "rgba(0,0,0,0.3)", color: "#00D4FF" }}>
              {`// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n// KnicksProphecySet — Oracle-backed Dynamic NFT\n// Deploy: npx hardhat deploy --network scroll-sepolia\n// Verify: npx hardhat verify --network scroll-sepolia <address>`}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-10 text-center">
          <div className="max-w-xl mx-auto rounded-2xl p-8" style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,184,0,0.05))", border: "1px solid rgba(255,107,53,0.3)" }}>
            <div className="text-3xl mb-4">🗽🏆</div>
            <h3 className="text-2xl font-black text-white mb-3">The Prophecy Is Sealed</h3>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              Every NFT minted is an immutable declaration. The oracle will verify. The chain will confirm. The legacy is eternal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kepler-nft" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", color: "#050B1A" }}>
                Kepler-452b Land NFTs →
              </Link>
              <Link href="/casino" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>
                ScrollVerse Casino →
              </Link>
            </div>
            <div className="mt-4 text-xs" style={{ color: "#8899AA" }}>
              KUN FAYAKŪN × ∞ — The empire expands. The prophecy lives. 🕋
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
