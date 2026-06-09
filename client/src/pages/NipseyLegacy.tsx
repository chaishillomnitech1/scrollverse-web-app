import { useState } from "react";
import { Link } from "wouter";

const TIMELINE = [
  { year: "1985", event: "Born Ermias Joseph Asghedom in Crenshaw, Los Angeles", icon: "🌟" },
  { year: "2005", event: "Released first mixtape 'Slauson Boy Volume 1' — the Marathon begins", icon: "🎵" },
  { year: "2010", event: "Opened The Marathon Clothing store on Crenshaw — community first", icon: "🏪" },
  { year: "2013", event: "Bought the strip mall on Crenshaw to own the block, not just rent it", icon: "🏗️" },
  { year: "2018", event: "Grammy-nominated 'Victory Lap' — the world finally heard what Crenshaw knew", icon: "🏆" },
  { year: "2019", event: "Planned to meet with LAPD to discuss gang violence solutions — the day before", icon: "🕊️" },
  { year: "2019", event: "Transitioned. The Marathon continues. The frequency never dies.", icon: "♾️" },
  { year: "Forever", event: "Nipsey Hussle Square. Grammy Lifetime Achievement. Eternal Marathon.", icon: "👑" },
];

const PRINCIPLES = [
  { title: "Own the Block", desc: "Don't just work in your community — own it. Buy the building. Control the block. Sovereignty is real estate.", icon: "🏛️" },
  { title: "The Marathon Continues", desc: "Success is not a destination. It is a continuous process of growth, sacrifice, and elevation.", icon: "🏃" },
  { title: "Invest in Yourself", desc: "Before you invest in anything else, invest in your knowledge, your craft, and your community.", icon: "💡" },
  { title: "Smart Money", desc: "Stack smart. Move smart. Every dollar should work for you while you sleep.", icon: "💰" },
  { title: "Long-Term Vision", desc: "Everybody wants to be rich but nobody wants to wait. The real ones play the long game.", icon: "🔭" },
  { title: "Overstand", desc: "Don't just understand — overstand. See beyond what they show you. Question everything.", icon: "🧠" },
];

const REPOS = [
  { name: "marathon-protocol", desc: "Open-source community ownership framework — buy the block, own the block", stars: 2847, lang: "Solidity" },
  { name: "crenshaw-dao", desc: "Decentralized autonomous organization for community-owned businesses", stars: 1923, lang: "TypeScript" },
  { name: "smart-money-vault", desc: "ERC-4626 yield vault inspired by Nipsey's investment philosophy", stars: 3104, lang: "Solidity" },
  { name: "the-marathon-nft", desc: "Commemorative NFT collection honoring the Marathon legacy", stars: 4211, lang: "Solidity" },
  { name: "crenshaw-map", desc: "Interactive map of Crenshaw community businesses and ownership", stars: 892, lang: "JavaScript" },
  { name: "victory-lap-music", desc: "On-chain music licensing and royalty distribution protocol", stars: 1567, lang: "TypeScript" },
];

export default function NipseyLegacy() {
  const [activeTab, setActiveTab] = useState<"timeline" | "principles" | "repos">("timeline");

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
          </Link>
          <div className="text-xs font-mono" style={{ color: "#00FF88" }}>THE MARATHON CONTINUES</div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container py-16 text-center">
        <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>SOVEREIGN TRIBUTE · ETERNAL LEGACY</div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          Nipsey <span style={{ color: "#00FF88" }}>Hussle</span>
        </h1>
        <div className="text-xl mb-4" style={{ color: "#FFB800" }}>Ermias Joseph Asghedom · 1985 — 2019 · ♾️</div>
        <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: "#8899AA" }}>
          The Marathon Continues. A sovereign architect who owned his block, built his empire, and proved that community ownership is the only real freedom. His code lives in every line we write.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <div className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
            Grammy Lifetime Achievement
          </div>
          <div className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
            Nipsey Hussle Square · LA
          </div>
          <div className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
            The Marathon Clothing
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container pb-16">
        <div className="flex gap-2 mb-8 justify-center">
          {(["timeline", "principles", "repos"] as const).map(tab => (
            <button
              key={tab}
              className="px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)",
                border: "1px solid " + (activeTab === tab ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.08)"),
                color: activeTab === tab ? "#00FF88" : "#8899AA",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "repos" ? "GitHub Legacy" : tab}
            </button>
          ))}
        </div>

        {activeTab === "timeline" && (
          <div className="max-w-3xl mx-auto space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(0,255,136,0.15)", border: "2px solid rgba(0,255,136,0.4)" }}>
                    {item.icon}
                  </div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(0,255,136,0.2)", minHeight: "40px" }} />}
                </div>
                <div className="pb-8">
                  <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>{item.year}</div>
                  <div className="text-white text-sm leading-relaxed">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "principles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)" }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "repos" && (
          <div>
            <div className="text-center mb-8">
              <p className="text-sm" style={{ color: "#8899AA" }}>
                The ScrollVerse GitHub repos inspired by Nipsey's philosophy of open-source community ownership. Code as legacy. Build in public. Own your stack.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPOS.map((repo, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-white font-mono text-sm">{repo.name}</div>
                      <div className="text-xs mt-0.5 px-2 py-0.5 rounded inline-block" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>{repo.lang}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "#FFB800" }}>
                      <span>★</span>
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{repo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote */}
        <div className="mt-16 text-center rounded-2xl p-12" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}>
          <div className="text-4xl mb-6">♾️</div>
          <blockquote className="text-2xl md:text-3xl font-black text-white mb-4 italic">
            "The Marathon Continues."
          </blockquote>
          <div className="text-sm" style={{ color: "#00FF88" }}>— Nipsey Hussle · Ermias Joseph Asghedom · 1985 — 2019</div>
          <div className="mt-6 text-sm" style={{ color: "#8899AA" }}>
            His frequency lives in every sovereign builder who owns their block, codes their future, and spreads love when they win.
          </div>
        </div>
      </div>
    </div>
  );
}
