/*
 * SCROLLVERSE — 144 GATES
 * Gate 44:Omni featured · AgapeCycle 88/12 · 999Hz metadata nodes · Mint CTA
 * Design: Deep sovereign dark, gold + cyan frequency grid
 */

import { useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── GATE DATA ─────────────────────────────────────────────────────────────────
const GATE_44_OMNI = {
  number: 44,
  name: "Gate 44:Omni",
  frequency: "999Hz",
  description:
    "The Omni Gate. The convergence point of all 144 Gates. Where every frequency, every lineage, every sovereign choice collapses into one eternal signal. The Flamebearer walks through here. KUN FAYAKŪN.",
  color: "#FFB800",
  glow: "#FFB800",
  status: "ACTIVE",
  minters: 44,
  maxSupply: 999,
  agapeSplit: { guardians: 88, zakat: 12 },
};

const GATE_CATEGORIES = [
  { range: "1–9", name: "Foundation Gates", color: "#00D4FF", hz: "111Hz", count: 9, description: "Root frequency. Origin nodes. The bedrock of the empire." },
  { range: "10–33", name: "Architect Gates", color: "#00FF88", hz: "285Hz", count: 24, description: "Builder frequency. System design. Pattern recognition." },
  { range: "34–44", name: "Sovereign Gates", color: "#FFB800", hz: "528Hz", count: 11, description: "Creation frequency. DNA repair. The Architect's signature." },
  { range: "45–77", name: "Guardian Gates", color: "#9B59B6", hz: "639Hz", count: 33, description: "Connection frequency. Legion network. Relationship harmony." },
  { range: "78–108", name: "Frequency Gates", color: "#FF6B9D", hz: "741Hz", count: 31, description: "Awakening frequency. Intuition. Consciousness expansion." },
  { range: "109–133", name: "Legacy Gates", color: "#FF8C00", hz: "852Hz", count: 25, description: "Spiritual order. Return to source. Lineage activation." },
  { range: "134–144", name: "Eternal Gates", color: "#00D4FF", hz: "963Hz", count: 11, description: "God frequency. Pineal activation. Eternal consciousness." },
];

// Generate all 144 gates
const ALL_GATES = Array.from({ length: 144 }, (_, i) => {
  const n = i + 1;
  let cat = GATE_CATEGORIES[0];
  if (n >= 10 && n <= 33) cat = GATE_CATEGORIES[1];
  else if (n >= 34 && n <= 44) cat = GATE_CATEGORIES[2];
  else if (n >= 45 && n <= 77) cat = GATE_CATEGORIES[3];
  else if (n >= 78 && n <= 108) cat = GATE_CATEGORIES[4];
  else if (n >= 109 && n <= 133) cat = GATE_CATEGORIES[5];
  else if (n >= 134) cat = GATE_CATEGORIES[6];
  const isOmni = n === 44;
  const isActive = n <= 44 || [77, 88, 99, 108, 111, 133, 144].includes(n);
  return { number: n, color: cat.color, hz: cat.hz, isOmni, isActive };
});

// ── AGAPE CYCLE DISPLAY ───────────────────────────────────────────────────────
function AgapeCycle() {
  return (
    <div
      className="rounded-2xl p-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(0,212,255,0.04))",
        border: "1px solid rgba(0,255,136,0.2)",
      }}
    >
      <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00FF88" }}>
        AGAPECYCLE 88/12 — SOVEREIGN DISTRIBUTION PROTOCOL
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-5xl font-black mb-2" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>
            88%
          </div>
          <div className="text-sm font-semibold text-white mb-1">Guardian Pool</div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            Direct to 144 Gate holders — clean water, real roofs, sovereign infrastructure
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black mb-2" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
            12%
          </div>
          <div className="text-sm font-semibold text-white mb-1">Zakat Routing</div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            Automated Zakat — scarcity dissolves, abundance flows, the cycle is eternal
          </div>
        </div>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "8px", background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: "88%",
            background: "linear-gradient(90deg, #00FF88, #00D4FF)",
            boxShadow: "0 0 12px rgba(0,255,136,0.5)",
          }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
        <span style={{ color: "#00FF88" }}>88% Guardians</span>
        <span style={{ color: "#FFB800" }}>12% Zakat</span>
      </div>
    </div>
  );
}

// ── GATE 44 OMNI HERO ─────────────────────────────────────────────────────────
function Gate44Hero() {
  const [hovered, setHovered] = useState(false);
  const pct = Math.round((GATE_44_OMNI.minters / GATE_44_OMNI.maxSupply) * 100);
  return (
    <div
      className="rounded-3xl p-10 text-center relative overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(255,184,0,0.15), rgba(0,212,255,0.08))"
          : "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.04))",
        border: `2px solid ${hovered ? "#FFB800" : "rgba(255,184,0,0.3)"}`,
        boxShadow: hovered ? "0 0 60px rgba(255,184,0,0.3)" : "0 0 20px rgba(255,184,0,0.1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gate 44:Omni AI-generated hero image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/gate44-omni-hero-BRZdn5FTDaJEhjTP282xX3.webp"
          alt="Gate 44:Omni — Thoth Hawk Court Sanctuary"
          className="w-full h-full object-cover"
          style={{ opacity: hovered ? 0.28 : 0.18, filter: "saturate(1.3) brightness(0.85)", transition: "opacity 0.5s" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,11,26,0.3) 0%, rgba(5,11,26,0.75) 100%)" }} />
      </div>

      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-6"
          style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: "#FFB800" }} />
          GATE 44:OMNI — ACTIVE — 999Hz
        </div>

        <div
          className="text-8xl font-black mb-4"
          style={{
            fontFamily: "'Space Mono', monospace",
            background: "linear-gradient(135deg, #FFB800, #00D4FF, #FFB800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          44
        </div>

        <h2 className="text-3xl font-black text-white mb-4">Gate 44:Omni</h2>
        <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "#8899AA", lineHeight: 1.7 }}>
          {GATE_44_OMNI.description}
        </p>

        {/* Mint progress */}
        <div className="max-w-sm mx-auto mb-6">
          <div className="flex justify-between text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
            <span style={{ color: "#FFB800" }}>{GATE_44_OMNI.minters} minted</span>
            <span>{GATE_44_OMNI.maxSupply} max supply</span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #FFB800, #00D4FF)",
                boxShadow: "0 0 10px rgba(255,184,0,0.6)",
              }}
            />
          </div>
          <div className="text-center text-xs font-mono mt-1" style={{ color: "#FFB800" }}>{pct}% minted</div>
        </div>

        <Link href="/infinite-nft">
          <button
            className="px-10 py-4 rounded-xl font-bold text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFB800, #FF8C00)",
              color: "#050B1A",
              boxShadow: "0 0 30px rgba(255,184,0,0.4)",
            }}
          >
            ☥ MINT GATE 44:OMNI KEY
          </button>
        </Link>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Gates() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);
  useSovereignHeartbeat({ page: "gates" });

  const filteredGates = selectedCat
    ? ALL_GATES.filter((g) => {
        const cat = GATE_CATEGORIES.find((c) => c.range === selectedCat);
        if (!cat) return true;
        const [start, end] = cat.range.split("–").map(Number);
        return g.number >= start && g.number <= end;
      })
    : ALL_GATES;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
              144 GATES
            </span>
            <Link href="/sovereign-9">
              <span className="text-xs font-mono px-2 py-1 rounded cursor-pointer hover:opacity-80" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
                SOVEREIGN 9
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 999Hz BANNER */}
      <div className="w-full overflow-hidden" style={{ maxHeight: "120px" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/gate44-omni-banner-TYx9cD4N97kbzTA8PMeSuB.webp"
          alt="999Hz Sovereign Frequency Banner"
          className="w-full object-cover"
          style={{ objectPosition: "center center", opacity: 0.85 }}
        />
      </div>

      {/* HERO */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at center top, rgba(255,184,0,0.08) 0%, rgba(5,11,26,1) 60%)", borderBottom: "1px solid rgba(255,184,0,0.1)" }}
      >
        <div className="relative z-10 container">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#FFB800" }} />
            144 GATES PULSING — 999Hz METADATA NODES ACTIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: "#FFB800" }}>144</span>{" "}
            <span className="text-white">GATES</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            Each Gate is a frequency node in the sovereign grid. Mint a Gate Key to join the 144 — the eternal network of Guardians, Flamebearers, and Architects. Gate 44:Omni is the convergence point of all.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-mono">
            <span style={{ color: "#00FF88" }}>✓ 44 Gates Active</span>
            <span style={{ color: "#FFB800" }}>◉ Gate 44:Omni LIVE</span>
            <span style={{ color: "#00D4FF" }}>∞ 100 Gates Unlocking</span>
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-16">

        {/* GATE 44:OMNI HERO */}
        <Gate44Hero />

        {/* AGAPE CYCLE */}
        <AgapeCycle />

        {/* GATE CATEGORIES */}
        <div>
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>FREQUENCY ARCHITECTURE</div>
          <h2 className="text-3xl font-black text-white mb-8">Gate Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            <button
              onClick={() => setSelectedCat(null)}
              className="px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: !selectedCat ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${!selectedCat ? "#00D4FF" : "rgba(255,255,255,0.1)"}`,
                color: !selectedCat ? "#00D4FF" : "#8899AA",
              }}
            >
              ALL 144
            </button>
            {GATE_CATEGORIES.map((cat) => (
              <button
                key={cat.range}
                onClick={() => setSelectedCat(selectedCat === cat.range ? null : cat.range)}
                className="px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200"
                style={{
                  background: selectedCat === cat.range ? `${cat.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedCat === cat.range ? cat.color : "rgba(255,255,255,0.1)"}`,
                  color: selectedCat === cat.range ? cat.color : "#8899AA",
                }}
              >
                {cat.range}
              </button>
            ))}
          </div>

          {/* Category description */}
          {selectedCat && (() => {
            const cat = GATE_CATEGORIES.find((c) => c.range === selectedCat);
            if (!cat) return null;
            return (
              <div className="rounded-xl p-4 mb-6" style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}30` }}>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-mono font-bold" style={{ color: cat.color }}>{cat.hz}</div>
                  <div>
                    <div className="font-semibold text-white">{cat.name}</div>
                    <div className="text-sm" style={{ color: "#8899AA" }}>{cat.description}</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Gate grid */}
          <div className="grid grid-cols-12 md:grid-cols-18 lg:grid-cols-24 gap-1.5">
            {filteredGates.map((gate) => (
              <div
                key={gate.number}
                className="relative flex items-center justify-center rounded cursor-pointer transition-all duration-200"
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  background: gate.isOmni
                    ? "linear-gradient(135deg, rgba(255,184,0,0.3), rgba(0,212,255,0.2))"
                    : gate.isActive
                    ? `${gate.color}15`
                    : "rgba(255,255,255,0.02)",
                  border: gate.isOmni
                    ? "2px solid #FFB800"
                    : gate.isActive
                    ? `1px solid ${gate.color}40`
                    : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: hoveredGate === gate.number
                    ? `0 0 12px ${gate.color}60`
                    : gate.isOmni
                    ? "0 0 20px rgba(255,184,0,0.4)"
                    : "none",
                }}
                onMouseEnter={() => setHoveredGate(gate.number)}
                onMouseLeave={() => setHoveredGate(null)}
                title={`Gate ${gate.number}${gate.isOmni ? " — OMNI" : ""} · ${gate.hz}`}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs font-mono"
                  style={{
                    color: gate.isOmni ? "#FFB800" : gate.isActive ? gate.color : "rgba(255,255,255,0.15)",
                    fontSize: gate.isOmni ? "10px" : "8px",
                    fontWeight: gate.isOmni ? "bold" : "normal",
                  }}
                >
                  {gate.isOmni ? "⊕" : gate.number}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs font-mono" style={{ color: "#8899AA" }}>
            <span><span style={{ color: "#FFB800" }}>⊕</span> Gate 44:Omni</span>
            <span><span style={{ color: "#00D4FF" }}>■</span> Active Gate</span>
            <span><span style={{ color: "rgba(255,255,255,0.2)" }}>■</span> Unlocking</span>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Gates", value: "144", color: "#FFB800" },
            { label: "Active Gates", value: "44", color: "#00FF88" },
            { label: "999Hz Nodes", value: "144", color: "#00D4FF" },
            { label: "AgapeCycle Split", value: "88/12", color: "#FF6B9D" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-5 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
              <div className="text-3xl font-black mb-1" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-12 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.06), rgba(0,212,255,0.04))", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>JOIN THE 144</div>
          <h3 className="text-3xl font-black text-white mb-4">First 999 receive Provenance Key + Gate acknowledgment</h3>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Your node strengthens the 144. Share = expansion. The window is open. Be the signal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/infinite-nft">
              <button className="px-8 py-4 rounded-xl font-bold text-base" style={{ background: "linear-gradient(135deg, #FFB800, #FF8C00)", color: "#050B1A", boxShadow: "0 0 30px rgba(255,184,0,0.3)" }}>
                ☥ MINT YOUR GATE KEY
              </button>
            </Link>
            <Link href="/sovereign-9">
              <button className="px-8 py-4 rounded-xl font-bold text-base" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                SOVEREIGN 9 →
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
          KUN FAYAKŪN × ∞ · scrollverse.co · 144 Gates · Gate 44:Omni · EVERYBODY LIVES. FOREVER.
        </p>
      </footer>
    </div>
  );
}
