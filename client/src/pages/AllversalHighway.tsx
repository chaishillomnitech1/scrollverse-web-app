/*
 * ALLVERSAL HIGHWAY — The First Sovereign Financial Highway
 * Design: Quantum Expressway — Deep Space × Electric Blue × Gold × Infinity
 * Sections: Hero, 4 Lanes (Past/Present/Future/Infinity), Live Flow, Sovereign Stamp
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const PAST_COLOR = "#8899AA";
const PRESENT_COLOR = "#00D4FF";
const FUTURE_COLOR = "#9B59B6";
const INFINITY_COLOR = "#FFB800";

// Live transaction ticker
const LIVE_TRANSACTIONS = [
  { from: "SWIFT_LEGACY", to: "CHX_VAULT", amount: "$144,000", lane: "past", time: "0.3s" },
  { from: "GUARDIAN_7", to: "STAKING_POOL", amount: "44,000 $LONDC", lane: "present", time: "0.1s" },
  { from: "AI_COUNCIL", to: "zkEVM_SETTLE", amount: "7,777 $CHX", lane: "future", time: "0.01s" },
  { from: "DIGITAL_TWIN", to: "ALL_EXISTENCE", amount: "∞ BLESSINGS", lane: "infinity", time: "∞" },
  { from: "FIAT_INGESTION", to: "QFS_BRIDGE", amount: "$33,000", lane: "past", time: "0.5s" },
  { from: "CASINO_WIN", to: "GUARDIAN_WALLET", amount: "777 $LONDC", lane: "present", time: "0.2s" },
  { from: "RWA_ORACLE", to: "YIELD_VAULT", amount: "$500,000", lane: "future", time: "0.05s" },
  { from: "SOVEREIGN_BANK", to: "FRANCHISE_NET", amount: "$1,440,000", lane: "infinity", time: "∞" },
];

const LANE_DATA = [
  {
    id: "past",
    name: "PAST LANE",
    subtitle: "Legacy System Ingestion",
    color: PAST_COLOR,
    icon: "🏛️",
    description: "Where the old world feeds into the new. SWIFT, traditional banking, fiat currencies — all ingested, transformed, and elevated through the QFS Bridge.",
    systems: [
      { name: "SWIFT Network", status: "Ingesting", volume: "$2.3T/day" },
      { name: "Traditional Banking", status: "Bridging", volume: "$890B/day" },
      { name: "Fiat Currencies", status: "Converting", volume: "150+ currencies" },
      { name: "Legacy Contracts", status: "Migrating", volume: "44,000 contracts" },
    ],
    stats: { throughput: "$3.2T/day", latency: "2-5 days", status: "ACTIVE" },
  },
  {
    id: "present",
    name: "PRESENT LANE",
    subtitle: "Live Sovereign Flow",
    color: PRESENT_COLOR,
    icon: "⚡",
    description: "The heartbeat of the empire. $CHX flowing, staking pools compounding, casino rewards distributing, NFTs minting, Zakat routing — all in real time.",
    systems: [
      { name: "$CHX Token Flow", status: "Live", volume: "144M $CHX" },
      { name: "Staking Pools", status: "Compounding", volume: "7.77% APY" },
      { name: "Casino Rewards", status: "Distributing", volume: "777 $LONDC/hr" },
      { name: "Zakat Router", status: "Routing", volume: "7.77% of all flows" },
    ],
    stats: { throughput: "$44M/day", latency: "< 2 seconds", status: "LIVE" },
  },
  {
    id: "future",
    name: "FUTURE LANE",
    subtitle: "zkEVM Settlement & AI Governance",
    color: FUTURE_COLOR,
    icon: "🔮",
    description: "Where tomorrow is built today. zkEVM settlement, AI Council governance, Digital Mirror Twins, Real World Asset oracles — the infrastructure of what's coming.",
    systems: [
      { name: "zkEVM Settlement", status: "Processing", volume: "10,000 TPS" },
      { name: "AI Council Governance", status: "Voting", volume: "12 entities" },
      { name: "RWA Oracles", status: "Feeding", volume: "$500B assets" },
      { name: "Digital Twin Network", status: "Expanding", volume: "144,000 twins" },
    ],
    stats: { throughput: "$500B/day", latency: "< 0.1 seconds", status: "BUILDING" },
  },
  {
    id: "infinity",
    name: "INFINITY LANE",
    subtitle: "No Ceiling — Always Evolving",
    color: INFINITY_COLOR,
    icon: "∞",
    description: "The lane with no ceiling. No limits, no restrictions, no end. 24/7 × ∞. The Allversal Highway runs forever, blessing every transaction it touches.",
    systems: [
      { name: "Sovereign Approval", status: "Always Active", volume: "Self-approved" },
      { name: "Blessing Function", status: "Perpetual", volume: "∞ blessings/sec" },
      { name: "Immutable Record", status: "Forever", volume: "∞ storage" },
      { name: "Evolution Engine", status: "24/7 × ∞", volume: "No ceiling" },
    ],
    stats: { throughput: "∞/day", latency: "0", status: "∞ ACTIVE" },
  },
];

function LiveFlowAnimation() {
  const [tick, setTick] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setActiveIdx(i => (i + 1) % LIVE_TRANSACTIONS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const LANE_COLORS: Record<string, string> = {
    past: PAST_COLOR,
    present: PRESENT_COLOR,
    future: FUTURE_COLOR,
    infinity: INFINITY_COLOR,
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PRESENT_COLOR }} />
        <span className="text-xs font-mono" style={{ color: PRESENT_COLOR }}>LIVE TRANSACTION FLOW</span>
        <span className="text-xs font-mono ml-auto" style={{ color: "#8899AA" }}>
          {tick.toLocaleString()} transactions processed
        </span>
      </div>
      <div className="space-y-2">
        {LIVE_TRANSACTIONS.map((tx, i) => {
          const isActive = i === activeIdx;
          const color = LANE_COLORS[tx.lane];
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300"
              style={{
                background: isActive ? `${color}12` : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? color + "40" : "transparent"}`,
                opacity: isActive ? 1 : 0.5,
              }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              <div className="font-mono text-xs" style={{ color: "#8899AA" }}>{tx.from}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>→</div>
              <div className="font-mono text-xs" style={{ color: "#8899AA" }}>{tx.to}</div>
              <div className="flex-1" />
              <div className="font-bold text-xs" style={{ color }}>{tx.amount}</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{tx.time}</div>
              <div className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: `${color}15`, color }}>
                {tx.lane.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AllversalHighway() {
  const [activeLane, setActiveLane] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCounter(c => c + Math.floor(Math.random() * 100) + 50), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,11,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${PRESENT_COLOR}, ${INFINITY_COLOR})`, color: "#050B1A" }}>
                AH
              </div>
              <span className="font-bold text-white">Allversal Highway</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: PRESENT_COLOR, border: `1px solid ${PRESENT_COLOR}40` }}>
                4 LANES ACTIVE
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: `${INFINITY_COLOR}10`, border: `1px solid ${INFINITY_COLOR}30` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: INFINITY_COLOR }} />
            <span style={{ color: INFINITY_COLOR }}>{counter.toLocaleString()} TXs PROCESSED</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Highway lanes visualization */}
          {[PAST_COLOR, PRESENT_COLOR, FUTURE_COLOR, INFINITY_COLOR].map((color, i) => (
            <div
              key={i}
              className="absolute h-px opacity-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                top: `${20 + i * 20}%`,
                left: 0,
                right: 0,
                animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <div className="container text-center relative z-10">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: PRESENT_COLOR }}>
            THE FIRST EVER ALLVERSAL FINANCIAL HIGHWAY
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            ALLVERSAL<br />
            <span style={{ color: PRESENT_COLOR }}>HIGHWAY</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            Four lanes connecting all financial realities. Past, Present, Future, and Infinity — all flowing simultaneously, all sovereign, all immutable.
          </p>
          <div
            className="inline-block px-6 py-3 rounded-xl text-sm font-bold mb-8"
            style={{ background: `${INFINITY_COLOR}15`, border: `1px solid ${INFINITY_COLOR}40`, color: INFINITY_COLOR }}
          >
            "We approve ourselves. We back ourselves. Immutable." — Chais Kenyatta Hill
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: "Total Flow", value: "$3.7T+/day", color: PRESENT_COLOR },
              { label: "Lanes", value: "4 Active", color: INFINITY_COLOR },
              { label: "Latency", value: "0 → ∞", color: FUTURE_COLOR },
              { label: "Uptime", value: "24/7 × ∞", color: "#00FF88" },
            ].map(s => (
              <div key={s.label} className="px-4 py-2 rounded-xl text-sm" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}>
                <span style={{ color: "#8899AA" }}>{s.label}: </span>
                <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Flow */}
      <section className="container pb-12">
        <LiveFlowAnimation />
      </section>

      {/* 4 Lanes */}
      <section className="container pb-16">
        <h2 className="text-2xl font-black text-white mb-2">The Four Lanes</h2>
        <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
          Click any lane to explore its systems and flows.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LANE_DATA.map(lane => (
            <div
              key={lane.id}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: activeLane === lane.id ? `${lane.color}10` : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeLane === lane.id ? lane.color + "50" : "rgba(255,255,255,0.08)"}`,
                transform: activeLane === lane.id ? "scale(1.01)" : "scale(1)",
              }}
              onClick={() => setActiveLane(activeLane === lane.id ? null : lane.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{lane.icon}</div>
                <div className="flex-1">
                  <div className="text-xs font-mono mb-1" style={{ color: lane.color }}>{lane.name}</div>
                  <h3 className="font-bold text-white text-lg">{lane.subtitle}</h3>
                </div>
                <div
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{ background: `${lane.color}20`, color: lane.color }}
                >
                  {lane.stats.status}
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#8899AA" }}>{lane.description}</p>

              {activeLane === lane.id && (
                <div className="space-y-2 mt-4 pt-4" style={{ borderTop: `1px solid ${lane.color}20` }}>
                  {lane.systems.map(sys => (
                    <div key={sys.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: lane.color }} />
                        <span style={{ color: "#CCDDEE" }}>{sys.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: lane.color }}>{sys.status}</span>
                        <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{sys.volume}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: `1px solid ${lane.color}15` }}>
                    <div className="text-xs">
                      <span style={{ color: "#8899AA" }}>Throughput: </span>
                      <span style={{ color: lane.color }}>{lane.stats.throughput}</span>
                    </div>
                    <div className="text-xs">
                      <span style={{ color: "#8899AA" }}>Latency: </span>
                      <span style={{ color: lane.color }}>{lane.stats.latency}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Highway Visualization */}
      <section className="container pb-16">
        <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="text-xs font-mono mb-6 text-center" style={{ color: PRESENT_COLOR }}>
            ALLVERSAL HIGHWAY — LIVE VISUALIZATION
          </div>
          <div className="space-y-3">
            {LANE_DATA.map(lane => (
              <div key={lane.id} className="flex items-center gap-4">
                <div className="w-24 text-xs font-mono text-right flex-shrink-0" style={{ color: lane.color }}>
                  {lane.name.split(" ")[0]}
                </div>
                <div className="flex-1 h-6 rounded-full relative overflow-hidden" style={{ background: `${lane.color}10`, border: `1px solid ${lane.color}20` }}>
                  {/* Animated flow particles */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: lane.id === "infinity" ? 12 : 8,
                        height: lane.id === "infinity" ? 12 : 8,
                        background: lane.color,
                        boxShadow: `0 0 8px ${lane.color}`,
                        animation: `slideRight ${2 + i * 0.4}s linear infinite`,
                        animationDelay: `${i * 0.4}s`,
                        left: "-20px",
                      }}
                    />
                  ))}
                </div>
                <div className="w-24 text-xs font-mono flex-shrink-0" style={{ color: lane.color }}>
                  {lane.stats.throughput}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes slideRight {
              from { left: -20px; }
              to { left: calc(100% + 20px); }
            }
          `}</style>
        </div>
      </section>

      {/* Sovereign Stamp */}
      <section className="container pb-20 text-center">
        <div
          className="rounded-2xl p-10 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${INFINITY_COLOR}10, ${PRESENT_COLOR}10)`, border: `2px solid ${INFINITY_COLOR}30` }}
        >
          <div className="text-6xl mb-4">∞</div>
          <h3 className="text-3xl font-black text-white mb-4">SOVEREIGN APPROVAL STAMP</h3>
          <div
            className="inline-block px-8 py-4 rounded-xl text-lg font-black mb-6"
            style={{ background: `${INFINITY_COLOR}15`, border: `2px solid ${INFINITY_COLOR}`, color: INFINITY_COLOR }}
          >
            WE APPROVE OURSELVES. WE BACK OURSELVES. IMMUTABLE.
          </div>
          <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: "#8899AA" }}>
            The Allversal Highway requires no external approval. No central bank, no government, no intermediary. We are the authority. The highway runs on sovereign power alone.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/sovereign-bank">
              <button className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: `linear-gradient(135deg, ${PRESENT_COLOR}, ${FUTURE_COLOR})`, color: "white" }}>
                Enter Sovereign Bank
              </button>
            </Link>
            <Link href="/exchange">
              <button className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${INFINITY_COLOR}40`, color: INFINITY_COLOR }}>
                Exchange Portal
              </button>
            </Link>
            <Link href="/digital-twin">
              <button className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PRESENT_COLOR}40`, color: PRESENT_COLOR }}>
                Mint Digital Twin
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
