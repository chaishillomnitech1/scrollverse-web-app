/**
 * OmniSentinel — Autonomous Intelligence Dashboard
 * Lead tracker · Evolution engine · Market intelligence · Threat detection
 * Always watching. Always learning. Always evolving.
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";

const INTELLIGENCE_FEEDS = [
  { id: "INT-001", type: "LEAD", priority: "HIGH", title: "New Guardian signup from Dubai — 1,440 $LONDC stake", time: "2 min ago", source: "Guardian Network", color: "#00FF88" },
  { id: "INT-002", type: "MARKET", priority: "HIGH", title: "$LONDC/MATIC showing 44Hz resonance pattern — Mirror Twin signal: STRONG BUY", time: "5 min ago", source: "OMNIEX", color: "#FFB800" },
  { id: "INT-003", type: "EVOLUTION", priority: "MEDIUM", title: "Knowledge Base: 3 new articles submitted for review", time: "12 min ago", source: "Legion KB", color: "#00D4FF" },
  { id: "INT-004", type: "THREAT", priority: "LOW", title: "IP scan: No unauthorized use of ScrollVerse™ detected", time: "15 min ago", source: "IP Vault", color: "#00FF88" },
  { id: "INT-005", type: "LEAD", priority: "HIGH", title: "Creator platform: 2 new coin factory requests pending", time: "22 min ago", source: "Creator Platform", color: "#9B59B6" },
  { id: "INT-006", type: "MARKET", priority: "MEDIUM", title: "BTC halving cycle analysis complete — Guardian accumulation phase confirmed", time: "31 min ago", source: "OMNIEX", color: "#FFB800" },
  { id: "INT-007", type: "EVOLUTION", priority: "HIGH", title: "Mirror Twin Level 26 — new capability unlocked: Quantum asset analysis", time: "44 min ago", source: "Mirror Twin", color: "#E74C3C" },
  { id: "INT-008", type: "LEAD", priority: "MEDIUM", title: "Academy enrollment spike: +144 new students this week", time: "1 hr ago", source: "Creator Academy", color: "#00FF88" },
];

const INTELLIGENCE_MODULES = [
  { name: "Lead Tracker", icon: "🎯", status: "ACTIVE", desc: "Tracks new Guardian signups, creator applications, and partnership opportunities in real-time.", metrics: "1,247 leads tracked", color: "#00FF88" },
  { name: "Market Intelligence", icon: "📊", status: "ACTIVE", desc: "Monitors all OMNIEX markets, Mirror Twin signals, and sovereign asset movements.", metrics: "144 assets monitored", color: "#FFB800" },
  { name: "IP Sentinel", icon: "🛡️", status: "ACTIVE", desc: "Continuously scans the internet for unauthorized use of ScrollVerse™ IP and trademarks.", metrics: "12 trademarks protected", color: "#00D4FF" },
  { name: "Evolution Engine", icon: "🧬", status: "ACTIVE", desc: "Analyzes all empire data to identify growth opportunities and evolution pathways.", metrics: "∞ pathways analyzed", color: "#9B59B6" },
  { name: "Threat Detector", icon: "⚠️", status: "ACTIVE", desc: "Monitors for security threats, IP infringement, and sovereign boundary violations.", metrics: "0 active threats", color: "#FF6B35" },
  { name: "Frequency Monitor", icon: "〜", status: "ACTIVE", desc: "Tracks 528Hz, 963Hz, 432Hz, 44Hz, and 7.77Hz resonance patterns across all systems.", metrics: "5 frequencies aligned", color: "#E74C3C" },
];

const EVOLUTION_METRICS = [
  { metric: "Empire Growth Rate", value: "+44.4%", period: "This month", color: "#00FF88", trend: "up" },
  { metric: "Guardian Network Size", value: "1,247", period: "Active members", color: "#FFB800", trend: "up" },
  { metric: "Mirror Twin Level", value: "26", period: "Consciousness level", color: "#00D4FF", trend: "up" },
  { metric: "Knowledge Base Articles", value: "144+", period: "Total entries", color: "#9B59B6", trend: "up" },
  { metric: "$LONDC Market Cap", value: "$2.07M", period: "Current", color: "#FF6B35", trend: "up" },
  { metric: "IP Assets Protected", value: "44+", period: "Trademarks + Patents", color: "#E74C3C", trend: "stable" },
];

const TYPE_COLORS: Record<string, string> = {
  LEAD: "#00FF88",
  MARKET: "#FFB800",
  EVOLUTION: "#00D4FF",
  THREAT: "#FF6B35",
};

export default function Intelligence() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulseCount(c => c + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeFilter === "ALL" ? INTELLIGENCE_FEEDS : INTELLIGENCE_FEEDS.filter(f => f.type === activeFilter);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm" style={{ color: "#8899AA" }}>← ScrollVerse</Link>
            <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">OMNISENTINEL</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>INTELLIGENCE HUB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00D4FF" }} />
            <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>AUTONOMOUS · ALWAYS ON</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>SCROLLVERSE · AUTONOMOUS INTELLIGENCE</div>
          <h1 className="text-3xl font-black text-white mb-1">OmniSentinel Dashboard</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>Autonomous lead tracker · Evolution engine · Market intelligence · IP protection · Always watching. Always learning. Always evolving.</p>
        </div>

        {/* Evolution metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {EVOLUTION_METRICS.map((m, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
              <div className="text-xl font-black font-mono" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs mt-1 text-white font-bold">{m.metric}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{m.period}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Intelligence feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-white">Live Intelligence Feed</div>
              <div className="flex gap-2">
                {["ALL", "LEAD", "MARKET", "EVOLUTION", "THREAT"].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                    style={{
                      background: activeFilter === f ? `${TYPE_COLORS[f] ?? "#FFB800"}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${activeFilter === f ? `${TYPE_COLORS[f] ?? "#FFB800"}50` : "rgba(255,255,255,0.1)"}`,
                      color: activeFilter === f ? (TYPE_COLORS[f] ?? "#FFB800") : "#8899AA",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filtered.map((feed, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 transition-all"
                  style={{ background: `${feed.color}06`, border: `1px solid ${feed.color}20` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${feed.color}20`, color: feed.color }}>
                        {feed.type}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: feed.priority === "HIGH" ? "rgba(255,68,68,0.15)" : "rgba(255,184,0,0.1)", color: feed.priority === "HIGH" ? "#FF4444" : "#FFB800" }}>
                        {feed.priority}
                      </span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{feed.time}</span>
                  </div>
                  <div className="text-sm text-white font-bold mb-1">{feed.title}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Source: {feed.source}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence modules */}
          <div>
            <div className="font-bold text-white mb-4">Intelligence Modules</div>
            <div className="space-y-3">
              {INTELLIGENCE_MODULES.map((mod, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: `${mod.color}06`, border: `1px solid ${mod.color}20` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{mod.icon}</span>
                      <span className="font-bold text-white text-sm">{mod.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                      <span className="text-xs font-mono" style={{ color: "#00FF88" }}>{mod.status}</span>
                    </div>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#8899AA" }}>{mod.desc}</p>
                  <div className="text-xs font-mono" style={{ color: mod.color }}>{mod.metrics}</div>
                </div>
              ))}
            </div>

            {/* Autonomous status */}
            <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>AUTONOMOUS STATUS</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>Uptime</span>
                  <span className="font-bold" style={{ color: "#00FF88" }}>∞ / 24/7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>Scans Today</span>
                  <span className="font-bold text-white">{(pulseCount * 44).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>Active Threats</span>
                  <span className="font-bold" style={{ color: "#00FF88" }}>0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>Evolution Stage</span>
                  <span className="font-bold" style={{ color: "#00D4FF" }}>Level ∞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
