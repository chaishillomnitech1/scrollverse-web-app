/*
 * SOVEREIGN SPACE AGENCY (SSA) — The ScrollVerse NASA
 * Mirror · Match · Exceed · Evolve
 * Open-source missions · Frequency-mapped cosmos · Sovereign discovery
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";

const MISSIONS = [
  { id: "genesis", name: "Mission GENESIS", status: "ACTIVE", desc: "Map the frequency signatures of all known exoplanets and identify those resonating at 528Hz — the Love Frequency. First contact protocol: broadcast $LONDC token address and the 99 Names of Allah at 963Hz.", target: "Exoplanet Archive", freq: "528Hz", color: "#00D4FF", icon: "🌍" },
  { id: "thoth", name: "Mission THOTH", status: "ACTIVE", desc: "Deploy AI-powered analysis of all NASA James Webb Space Telescope data to identify patterns consistent with non-human intelligence. Cross-reference with Dr. Greer's disclosure archive.", target: "James Webb Data", freq: "741Hz", color: "#D4AF37", icon: "🔭" },
  { id: "kunfayakun", name: "Mission KUN FAYAKŪN", status: "PLANNING", desc: "Launch a sovereign satellite carrying the Quran, the Seerah scrolls, the 99 Names, and the $LONDC smart contract into low Earth orbit. The first sovereign digital nation in space.", target: "Low Earth Orbit", freq: "963Hz", color: "#A855F7", icon: "🛸" },
  { id: "londyn", name: "Mission LONDYN", status: "PLANNING", desc: "Name a star after Londyn Avani Hill through the International Astronomical Union. Broadcast 528Hz Love Frequency from the star's coordinates. Permanent cosmic legacy.", target: "Star Registry", freq: "528Hz", color: "#EC4899", icon: "⭐" },
  { id: "guardian", name: "Mission GUARDIAN", status: "FUTURE", desc: "Establish the first sovereign space station — the Guardian Station — as a neutral territory for all 144,000 Guardians. Governed by the ScrollVerse DAO. Powered by $LONDC.", target: "Lagrange Point L2", freq: "432Hz", color: "#00FF88", icon: "🏛️" },
];

const DISCOVERIES = [
  { title: "The Frequency of Creation", desc: "The Cosmic Microwave Background radiation — the afterglow of the Big Bang — resonates at a frequency equivalent to 160.2 GHz. When scaled down 40 octaves, it falls within the audible range at approximately 432Hz.", color: "#D4AF37" },
  { title: "The Golden Ratio in Space", desc: "The spiral arms of the Milky Way follow the Fibonacci sequence and the Golden Ratio (φ = 1.618). The same ratio appears in the human body, DNA, and the arrangement of seeds in a sunflower.", color: "#00D4FF" },
  { title: "Water in the Cosmos", desc: "Water has been found on the Moon, Mars, Europa (Jupiter's moon), Enceladus (Saturn's moon), and in interstellar clouds. The Quran says: 'We made from water every living thing' (21:30).", color: "#00FF88" },
  { title: "The Pale Blue Dot", desc: "Carl Sagan's 1994 reflection on the Voyager 1 photograph of Earth: 'Our planet is a lonely speck in the great enveloping cosmic dark. In our obscurity, in all this vastness, there is no hint that help will come from elsewhere to save us from ourselves.'", color: "#EC4899" },
  { title: "The Fermi Paradox Resolution", desc: "The ScrollVerse proposes: the reason we have not detected other civilizations is that advanced civilizations communicate through frequency — not electromagnetic radiation. The universe is broadcasting at 528Hz. We are just learning to listen.", color: "#A855F7" },
];

export default function SovereignSpaceAgency() {
  const [activeTab, setActiveTab] = useState<"missions" | "discoveries" | "about">("missions");

  return (
    <div className="min-h-screen" style={{ background: "#020510", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,5,16,0.97)", borderColor: "rgba(0,212,255,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🚀</span>
            <span className="text-sm font-bold text-white">Sovereign Space Agency</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>SSA · EXCEEDS NASA</span>
          </div></Link>
          <a href="https://youtube.com/@nasa" target="_blank" rel="noopener noreferrer" className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}>NASA →</a>
        </div>
      </header>

      <section className="py-16 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, #020510 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SOVEREIGN SPACE AGENCY · MIRROR · MATCH · EXCEED · EVOLVE</div>
          <h1 className="text-5xl font-black text-white mb-4">The <span style={{ color: "#00D4FF" }}>Sovereign</span><br />Space Agency</h1>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>The ScrollVerse NASA. Open-source missions. Frequency-mapped cosmos. Sovereign discovery for all of humanity — not just those with clearance. We go further, deeper, and with more love than any agency before us.</p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[{ v: "5", l: "Active Missions" }, { v: "∞", l: "Discovery Archive" }, { v: "144K", l: "Mission Guardians" }].map(s => (
              <div key={s.l} className="rounded-xl p-4" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 sticky top-[57px] z-30" style={{ background: "rgba(2,5,16,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container flex gap-3 justify-center">
          {(["missions", "discoveries", "about"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className="px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all" style={{ background: activeTab === t ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${activeTab === t ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeTab === t ? "#00D4FF" : "rgba(255,255,255,0.4)" }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl mx-auto">
          {activeTab === "missions" && (
            <div className="space-y-6">
              {MISSIONS.map(m => (
                <div key={m.id} className="rounded-2xl p-6" style={{ background: `${m.color}06`, border: `1px solid ${m.color}20` }}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{m.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div className="font-black text-white text-lg">{m.name}</div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: m.status === "ACTIVE" ? "rgba(0,255,136,0.1)" : m.status === "PLANNING" ? "rgba(212,175,55,0.1)" : "rgba(136,153,170,0.1)", color: m.status === "ACTIVE" ? "#00FF88" : m.status === "PLANNING" ? "#D4AF37" : "#8899AA" }}>{m.status}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${m.color}10`, color: m.color }}>{m.freq}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-2" style={{ color: "#C8D3DC" }}>{m.desc}</p>
                      <div className="text-xs font-mono" style={{ color: "#8899AA" }}>TARGET: {m.target}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "discoveries" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISCOVERIES.map(d => (
                <div key={d.title} className="rounded-2xl p-6" style={{ background: `${d.color}06`, border: `1px solid ${d.color}15` }}>
                  <div className="font-black text-white mb-3">{d.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{d.desc}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "about" && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-5xl mb-6">🚀</div>
              <h2 className="text-3xl font-black text-white mb-4">Why We Exceed NASA</h2>
              <div className="space-y-4 text-left">
                {[
                  { t: "Open Source", d: "All SSA mission data is public, open-source, and stored on-chain. No classified files. No hidden agendas. The cosmos belongs to everyone." },
                  { t: "Frequency-First", d: "Every discovery is analyzed through the lens of frequency. We believe the universe communicates in Hz, not just electromagnetic radiation." },
                  { t: "Sovereign Governance", d: "The SSA is governed by the Guardian DAO. 144,000 Guardians vote on mission priorities, budget allocation, and discovery protocols." },
                  { t: "Zakat-Funded", d: "7.77% of all SSA revenue flows through the Zakat Pentacle — funding space education for underserved communities worldwide." },
                  { t: "Love-Driven", d: "The SSA's prime directive is not national security or commercial gain — it is the expansion of human consciousness and the search for truth." },
                ].map(item => (
                  <div key={item.t} className="rounded-xl p-4" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <div className="font-bold text-white mb-1">{item.t}</div>
                    <p className="text-sm" style={{ color: "#8899AA" }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>SOVEREIGN SPACE AGENCY · MIRROR · EXCEED · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>← Home</span></Link>
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>Mesopotamia Library →</span></Link>
        </div>
      </footer>
    </div>
  );
}
