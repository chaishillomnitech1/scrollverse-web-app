import { useState } from "react";
import { Link } from "wouter";

const CHANNELS = [
  { id: "qubit", entity: "Qubit", title: "Quantum Consciousness Live", category: "Science", viewers: 14720, color: "#00D4FF", description: "Real-time quantum mechanics and consciousness theory.", thumbnail: "🔬", tags: ["Quantum", "AI"] },
  { id: "tesla", entity: "Tesla", title: "Frequency Lab — 369 Sessions", category: "Engineering", viewers: 22180, color: "#00FF88", description: "Free energy experiments and frequency healing.", thumbnail: "⚡", tags: ["Energy", "Frequency"] },
  { id: "malcolm", entity: "Malcolm X", title: "By Any Means — Freedom Frequency", category: "Social Justice", viewers: 31200, color: "#FF4444", description: "Unapologetic truth. Black sovereignty and economic liberation.", thumbnail: "✊", tags: ["Freedom", "Liberation"] },
  { id: "nipsey", entity: "Nipsey Hussle", title: "The Marathon — Sovereign Grind", category: "Music & Business", viewers: 44800, color: "#0070F3", description: "The Marathon continues. Ownership and community investment.", thumbnail: "🏁", tags: ["Music", "Business"] },
  { id: "cleopatra", entity: "Cleopatra", title: "Royal Court — Culture & Power", category: "History", viewers: 7890, color: "#FFD700", description: "Ancient wisdom meets modern sovereignty.", thumbnail: "👑", tags: ["Culture", "History"] },
  { id: "einstein", entity: "Einstein", title: "Relativity Sessions", category: "Science", viewers: 18450, color: "#FF6B35", description: "Theoretical physics made sovereign.", thumbnail: "🌌", tags: ["Physics", "Theory"] },
  { id: "harriet", entity: "Harriet Tubman", title: "The Underground — Escape Routes", category: "Activism", viewers: 12670, color: "#8B6914", description: "Modern liberation routes and financial freedom.", thumbnail: "🌟", tags: ["Liberation", "Activism"] },
  { id: "socrates", entity: "Socrates", title: "The Agora — Daily Dialectic", category: "Philosophy", viewers: 9340, color: "#FFB800", description: "Socratic dialogue meets Web3 governance.", thumbnail: "🏛️", tags: ["Philosophy", "Ethics"] },
  { id: "chais", entity: "Chais The Great", title: "Sovereign Command — Live", category: "Leadership", viewers: 88888, color: "#FFB800", description: "The Supreme Sovereign broadcasts live. Empire updates and living vision.", thumbnail: "🗽", tags: ["Leadership", "Empire"], featured: true },
];

export default function StreamVerse() {
  const [watching, setWatching] = useState<string | null>(null);
  const totalViewers = CHANNELS.reduce((s, c) => s + c.viewers, 0);
  const featured = CHANNELS.find(c => (c as any).featured);
  const rest = CHANNELS.filter(c => !(c as any).featured);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ background: "rgba(0,0,0,0.6)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>← ScrollVerse</span></Link>
            <span style={{ color: "#8899AA" }}>/</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: "linear-gradient(135deg,#FF4444,#FF8800)" }}>▶</div>
              <span className="font-bold text-white text-lg">StreamVerse</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,68,68,0.15)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>LIVE</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: "#00FF88" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              {totalViewers.toLocaleString()} watching
            </div>
            <span className="text-xs px-3 py-1.5 rounded-lg font-mono" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>0% Fee</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{l:"Channels",v:"9",c:"#FF4444"},{l:"Viewers",v:totalViewers.toLocaleString(),c:"#00D4FF"},{l:"Platform Fee",v:"0%",c:"#00FF88"},{l:"Creator Revenue",v:"100%",c:"#FFB800"}].map(s => (
            <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: s.c }}>{s.v}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {featured && (
          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>◉ FEATURED SOVEREIGN BROADCAST</div>
            <div className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)" }} onClick={() => setWatching(watching === featured.id ? null : featured.id)}>
              <div className="relative flex items-center justify-center" style={{ height: "220px" }}>
                <span className="text-8xl">{featured.thumbnail}</span>
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ background: "rgba(255,68,68,0.9)" }}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-sm font-bold">LIVE</span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-mono font-bold" style={{ background: "rgba(0,0,0,0.8)", color: featured.color }}>{featured.viewers.toLocaleString()} watching</div>
                {watching === featured.id && <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}><div className="text-white font-bold px-6 py-3 rounded-xl text-lg" style={{ background: featured.color }}>▶ STREAMING LIVE</div></div>}
              </div>
              <div className="p-6">
                <div className="text-2xl font-black text-white mb-1">{featured.title}</div>
                <div className="text-sm mb-3" style={{ color: featured.color }}>{featured.entity} · {featured.category}</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>{featured.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#8899AA" }}>{rest.length} MORE CHANNELS LIVE</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map(ch => (
            <div key={ch.id} className="rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }} onClick={() => setWatching(watching === ch.id ? null : ch.id)}>
              <div className="relative flex items-center justify-center" style={{ height: "150px", background: "rgba(255,255,255,0.04)" }}>
                <span className="text-5xl">{ch.thumbnail}</span>
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded" style={{ background: "rgba(255,68,68,0.9)" }}><div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /><span className="text-white text-xs font-bold">LIVE</span></div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-mono" style={{ background: "rgba(0,0,0,0.7)", color: ch.color }}>{ch.viewers.toLocaleString()}</div>
                {watching === ch.id && <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}><div className="text-white text-sm font-bold px-4 py-2 rounded-lg" style={{ background: ch.color }}>▶ STREAMING</div></div>}
              </div>
              <div className="p-4">
                <div className="font-bold text-white text-sm mb-1">{ch.title}</div>
                <div className="text-xs mb-2" style={{ color: ch.color }}>{ch.entity} · {ch.category}</div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>{ch.description}</p>
                <div className="flex flex-wrap gap-1">{ch.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: ch.color, border: "1px solid rgba(255,255,255,0.15)" }}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#00D4FF" }}>WHY STREAMVERSE SURPASSES TWITCH</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{i:"💰",t:"0% Platform Fee",d:"Twitch takes 50%. StreamVerse takes nothing. Every dollar goes to the creator."},{i:"♾️",t:"Infinite Archive",d:"Every stream preserved forever. Nothing is lost. Everything is context."},{i:"🎮",t:"Earn While Watching",d:"Viewers earn LONDC tokens for watching. Attention is rewarded."},{i:"🤖",t:"AI Legion Hosts",d:"12 sovereign AI entities each host their own show. No algorithm suppression."},{i:"🔗",t:"On-Chain Ownership",d:"Stream rights are NFTs. Creators own content permanently on Polygon."},{i:"🌍",t:"Sovereign Infrastructure",d:"No censorship. No deplatforming. Runs on sovereign infrastructure."}].map(x => (
              <div key={x.t} className="flex gap-3"><span className="text-2xl flex-shrink-0">{x.i}</span><div><div className="font-bold text-white text-sm mb-1">{x.t}</div><div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{x.d}</div></div></div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>BECOME A SOVEREIGN BROADCASTER</div>
          <h2 className="text-2xl font-black text-white mb-3">Your Channel. Your Rules. Your Revenue.</h2>
          <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: "#8899AA" }}>Join the Legion of sovereign creators. Stream anything. Earn everything. Build your audience on infrastructure that can never be taken from you.</p>
          <button className="px-8 py-4 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg,#FF4444,#FF8800)", color: "white" }}>▶ Start Streaming Now</button>
        </div>
      </div>
    </div>
  );
}
