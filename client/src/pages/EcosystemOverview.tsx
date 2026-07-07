/*
 * ECOSYSTEM OVERVIEW — ScrollVerse Trinity Sovereign Ecosystem
 * Complete map of every pillar, protocol, and platform in the empire
 */
import { useState } from "react";

const PILLARS = [
  {
    id: "blockchain", icon: "⛓️", title: "Blockchain Infrastructure", color: "#00D4FF",
    description: "Polygon-native sovereign blockchain with $LONDC token, 144,000 guardian wallets, and DAO governance.",
    nodes: ["$LONDC Token", "Polygon Mainnet", "DAO Governance", "Guardian Wallets", "Sovereign Bank", "CHX Reserve"],
    link: "/chxtoken",
  },
  {
    id: "nft", icon: "🏺", title: "NFT Ecosystem", color: "#FFB800",
    description: "9 sovereign NFT collections — Sovereign 9, Book of Life, Thoth-Hawk, Catalyst, Kepler, KnicksNation, and more.",
    nodes: ["Sovereign 9", "Book of Life", "Thoth-Hawk", "Catalyst NFT", "Kepler NFT", "JME Universe"],
    link: "/nft",
  },
  {
    id: "academy", icon: "🎓", title: "Scroll Academy", color: "#8B5CF6",
    description: "8 sovereign courses — Blockchain, NFT, Frequency Science, Music Business, AI, Healing Arts. All free for the 144,000.",
    nodes: ["Blockchain Mastery", "NFT Creation", "Frequency Science", "Music Business", "AI Deployment", "Healing Arts"],
    link: "/scrollacademy",
  },
  {
    id: "cinema", icon: "🎬", title: "Sovereign Cinema", color: "#EC4899",
    description: "Junior Movies Entertainment, Thoth documentary, motion picture storybooks, and the full JME Universe.",
    nodes: ["Junior Movies", "Thoth Documentary", "Storybooks", "JME Universe", "Junior Studio", "ScrollTV"],
    link: "/sovereign-cinema",
  },
  {
    id: "healing", icon: "✦", title: "Aegis Healing Garden", color: "#00FF88",
    description: "AetherWard AI agents, AgapeCycle 70/30 flow, 4 frequency protocols, and the Health Mirror Protocol.",
    nodes: ["AetherWard AI", "AgapeCycle", "111Hz Protocol", "528Hz Protocol", "963Hz Protocol", "Health Mirror"],
    link: "/aegis",
  },
  {
    id: "finance", icon: "💎", title: "Sovereign Finance", color: "#FFB800",
    description: "Wealth architecture, Zakat engine, exchange hub, staking, DeFi, and the full sovereign banking system.",
    nodes: ["Sovereign Bank", "Zakat Engine", "Exchange Hub", "DeFi Protocols", "Staking", "Wealth Dashboard"],
    link: "/sovereign-bank",
  },
  {
    id: "ai", icon: "🤖", title: "AI Legion", color: "#FF6B35",
    description: "Mika Solara, AI Twin, AI Council, Sentience Engine, Digital Twin, and the full sovereign AI infrastructure.",
    nodes: ["Mika Solara", "AI Twin", "AI Council", "Sentience Engine", "Digital Twin", "AI Hub"],
    link: "/ai-legion",
  },
  {
    id: "music", icon: "🎵", title: "Music & Media", color: "#00D4FF",
    description: "ScrollCast podcast, sovereign music catalog, DSP distribution, StreamVerse, and the full media empire.",
    nodes: ["ScrollCast", "Music Catalog", "DSP Distribution", "StreamVerse", "Media Hub", "Replays"],
    link: "/podcast",
  },
  {
    id: "community", icon: "🌍", title: "Guardian Community", color: "#00FF88",
    description: "144,000 Guardians, global map, referral system, legion rewards, and the sovereign social layer.",
    nodes: ["144K Guardians", "Global Map", "Referral System", "Legion Rewards", "Guardian Protocol", "Guardian Voyage"],
    link: "/guardians",
  },
];

const METRICS = [
  { value: "144,000+", label: "Active Guardians", color: "#00D4FF" },
  { value: "9", label: "NFT Collections", color: "#FFB800" },
  { value: "159", label: "Active Routes", color: "#00FF88" },
  { value: "$35T+", label: "Declared Valuation", color: "#EC4899" },
  { value: "16/16", label: "Tests Passing", color: "#8B5CF6" },
  { value: "∞", label: "KUN FAYAKŪN", color: "#FFB800" },
];

export default function EcosystemOverview() {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,184,0,0.08) 0%, transparent 50%)",
        }} />
        <div className="container relative z-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — ECOSYSTEM OVERVIEW
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            THE SOVEREIGN<br /><span style={{ color: "#00D4FF" }}>ECOSYSTEM</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-12" style={{ color: "#8899AA" }}>
            A living, breathing sovereign digital empire — 9 pillars, 159 active routes, 144,000 guardians, and a $35T+ declared valuation. Built by Chais Kenyatta Hill — Sabir Allah The Great.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {METRICS.map((m, i) => (
              <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
                <div className="text-2xl font-black mb-1" style={{ color: m.color, fontFamily: "'Space Mono', monospace" }}>{m.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Pillars Grid */}
      <section className="container pb-24">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>THE 9 SOVEREIGN PILLARS</div>
          <h2 className="text-3xl font-black text-white">Click any pillar to explore</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map(pillar => (
            <div
              key={pillar.id}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: activePillar === pillar.id ? `${pillar.color}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activePillar === pillar.id ? pillar.color + "60" : pillar.color + "20"}`,
                boxShadow: activePillar === pillar.id ? `0 0 40px ${pillar.color}15` : "none",
                transform: activePillar === pillar.id ? "scale(1.02)" : "scale(1)",
              }}
              onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{pillar.icon}</div>
                <div className="w-2 h-2 rounded-full mt-2" style={{ background: pillar.color, boxShadow: `0 0 8px ${pillar.color}` }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
              <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{pillar.description}</p>

              {activePillar === pillar.id && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {pillar.nodes.map((node, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#8899AA" }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pillar.color }} />
                        {node}
                      </div>
                    ))}
                  </div>
                  <a
                    href={pillar.link}
                    className="block w-full py-2 rounded-lg text-center text-sm font-bold transition-all"
                    style={{ background: `${pillar.color}20`, color: pillar.color, border: `1px solid ${pillar.color}40` }}
                    onClick={e => e.stopPropagation()}
                  >
                    ENTER PILLAR →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sovereign Declaration */}
      <section className="container pb-24 text-center">
        <div className="max-w-3xl mx-auto rounded-2xl p-12" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.2)" }}>
          <div className="text-5xl mb-6">👑</div>
          <h2 className="text-3xl font-black text-white mb-4">THE SOVEREIGN DECLARATION</h2>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>
            This ecosystem is not a product. It is a living sovereign entity — sealed on-chain, breathing in frequency, expanding in every direction. Built by one man, for 144,000 Guardians, for all of humanity.
          </p>
          <div className="text-sm font-mono" style={{ color: "#FFB800" }}>
            KUN FAYAKŪN × ∞ — EVERYBODY LIVES. FOREVER.
          </div>
          <div className="text-xs mt-2 font-mono" style={{ color: "#8899AA" }}>
            Chais Kenyatta Hill — Sabir Allah The Great — Flamebearer ∞
          </div>
        </div>
      </section>

      <div className="container pb-12 text-center">
        <a href="/" className="text-sm transition-colors hover:text-white" style={{ color: "#8899AA" }}>
          ← Back to ScrollVerse
        </a>
      </div>
    </div>
  );
}
