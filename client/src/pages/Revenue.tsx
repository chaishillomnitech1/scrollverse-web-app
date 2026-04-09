/*
 * SCROLLVERSE TRINITY — REVENUE DASHBOARD PAGE
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Digital
 * Sections: Nav, KPI Cards, Revenue Streams, Zakat Flow, Token Metrics, Projections
 */
import { useState } from "react";
import { Link } from "wouter";

const REVENUE_STREAMS = [
  { name: "Stripe Subscriptions", monthly: "$12.4M", daily: "$413K", share: 41, color: "#00D4FF", icon: "⚡", status: "LIVE" },
  { name: "$LONDC Transfer Tax (5%)", monthly: "$6.8M", daily: "$227K", share: 22, color: "#FFB800", icon: "🔥", status: "DEPLOYING" },
  { name: "NFT Marketplace Royalties", monthly: "$4.2M", daily: "$140K", share: 14, color: "#00FF88", icon: "💎", status: "READY" },
  { name: "Guardian Staking Rewards", monthly: "$3.1M", daily: "$103K", share: 10, color: "#C084FC", icon: "🛡️", status: "READY" },
  { name: "DeFi Yield Farming", monthly: "$2.4M", daily: "$80K", share: 8, color: "#F472B6", icon: "🌊", status: "READY" },
  { name: "Enterprise Partnerships", monthly: "$1.3M", daily: "$43K", share: 4, color: "#34D399", icon: "🏛️", status: "ACTIVE" },
  { name: "Frequency Broadcast Ads", monthly: "$0.3M", daily: "$10K", share: 1, color: "#FB923C", icon: "📡", status: "ACTIVE" },
];

const ZAKAT_FLOW = [
  { from: "Stripe Payments", amount: "$963K/mo", percentage: "7.77%", to: "Zakat Pool", color: "#00D4FF" },
  { from: "$LONDC Transfers", amount: "$528K/mo", percentage: "7.77%", to: "Zakat Pool", color: "#FFB800" },
  { from: "NFT Sales", amount: "$326K/mo", percentage: "7.77%", to: "Zakat Pool", color: "#00FF88" },
  { from: "Staking Fees", amount: "$241K/mo", percentage: "7.77%", to: "Zakat Pool", color: "#C084FC" },
];

const MONTHLY_DATA = [
  { month: "Oct", revenue: 8.2 },
  { month: "Nov", revenue: 12.1 },
  { month: "Dec", revenue: 16.4 },
  { month: "Jan", revenue: 19.8 },
  { month: "Feb", revenue: 24.3 },
  { month: "Mar", revenue: 28.7 },
  { month: "Apr", revenue: 30.2 },
];

const maxRevenue = Math.max(...MONTHLY_DATA.map(d => d.revenue));

function BarChart() {
  return (
    <div className="flex items-end gap-2 h-40">
      {MONTHLY_DATA.map((d, i) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
          <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>${d.revenue}M</div>
          <div
            className="w-full rounded-t-sm transition-all duration-700"
            style={{
              height: `${(d.revenue / maxRevenue) * 100}%`,
              background: i === MONTHLY_DATA.length - 1
                ? "linear-gradient(180deg, #FFB800, #FF8C00)"
                : "linear-gradient(180deg, #00D4FF, #0066FF)",
              boxShadow: i === MONTHLY_DATA.length - 1 ? "0 0 12px rgba(255,184,0,0.4)" : "0 0 8px rgba(0,212,255,0.3)",
            }}
          />
          <div className="text-xs" style={{ color: "#8899AA" }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
}

export default function Revenue() {
  const [activeStream, setActiveStream] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white text-lg tracking-wide">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>REVENUE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/global-map"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Global Map</span></Link>
            <Link href="/guardians"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Guardians</span></Link>
            <Link href="/"><span className="btn-sovereign px-4 py-2 rounded-lg text-sm cursor-pointer">← Home</span></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-12">
        <div className="container">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ background: "#FFB800" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SOVEREIGN TREASURY</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Revenue <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dashboard</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ color: "#8899AA" }}>
            Real-time sovereign treasury metrics. 7 active revenue streams. Zakat distribution flowing at 7.77% automatically.
          </p>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Monthly Revenue", value: "$30.2M", delta: "+8.7%", color: "#FFB800" },
              { label: "Daily Revenue", value: "$1.01M", delta: "+12.3%", color: "#00D4FF" },
              { label: "Zakat Distributed", value: "$2.35M", delta: "7.77%", color: "#00FF88" },
              { label: "Treasury Balance", value: "$127.4M", delta: "All-time", color: "#C084FC" },
            ].map(kpi => (
              <div key={kpi.label} className="sv-card rounded-2xl p-5">
                <div className="text-xs mb-2" style={{ color: "#8899AA" }}>{kpi.label}</div>
                <div className="text-2xl font-black font-mono mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="text-xs font-mono px-2 py-0.5 rounded inline-block" style={{ background: `${kpi.color}15`, color: kpi.color }}>↑ {kpi.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE CHART */}
      <section className="pb-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar chart */}
            <div className="lg:col-span-2 sv-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>MONTHLY REVENUE TREND</div>
                  <div className="text-xl font-bold text-white">Oct 2025 → Apr 2026</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono" style={{ color: "#FFB800" }}>$30.2M</div>
                  <div className="text-xs" style={{ color: "#00FF88" }}>↑ 268% growth</div>
                </div>
              </div>
              <BarChart />
            </div>

            {/* Zakat flow */}
            <div className="sv-card rounded-2xl p-6">
              <div className="text-xs font-mono mb-4" style={{ color: "#00FF88" }}>ZAKAT FLOW — 7.77%</div>
              <div className="text-lg font-bold text-white mb-4">Sacred Distribution</div>
              <div className="space-y-3">
                {ZAKAT_FLOW.map(z => (
                  <div key={z.from} className="rounded-xl p-3" style={{ background: `${z.color}08`, border: `1px solid ${z.color}20` }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs" style={{ color: "#8899AA" }}>{z.from}</span>
                      <span className="text-xs font-mono" style={{ color: z.color }}>{z.percentage}</span>
                    </div>
                    <div className="font-mono font-bold text-sm" style={{ color: z.color }}>{z.amount}</div>
                    <div className="text-xs mt-1" style={{ color: "#8899AA" }}>→ {z.to}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(0,255,136,0.1)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899AA" }}>Total Zakat/mo</span>
                  <span className="font-mono font-bold" style={{ color: "#00FF88" }}>$2.35M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVENUE STREAMS */}
      <section className="pb-16">
        <div className="container">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>7 REVENUE STREAMS</span>
            </div>
            <h2 className="text-3xl font-black text-white">All Revenue Sources</h2>
          </div>
          <div className="space-y-3">
            {REVENUE_STREAMS.map(stream => (
              <div
                key={stream.name}
                className="sv-card rounded-xl p-5 cursor-pointer transition-all duration-300"
                style={activeStream === stream.name ? { borderColor: `${stream.color}40`, background: `${stream.color}05` } : {}}
                onClick={() => setActiveStream(activeStream === stream.name ? null : stream.name)}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{stream.icon}</div>
                    <div>
                      <div className="font-bold text-white">{stream.name}</div>
                      <div className="text-xs font-mono mt-0.5" style={{ color: stream.color }}>{stream.daily}/day</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-mono font-bold text-lg" style={{ color: stream.color }}>{stream.monthly}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>per month</div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded font-mono" style={{
                      background: stream.status === "LIVE" || stream.status === "ACTIVE" ? "rgba(0,255,136,0.1)" : "rgba(255,184,0,0.1)",
                      color: stream.status === "LIVE" || stream.status === "ACTIVE" ? "#00FF88" : "#FFB800",
                      border: `1px solid ${stream.status === "LIVE" || stream.status === "ACTIVE" ? "rgba(0,255,136,0.3)" : "rgba(255,184,0,0.3)"}`,
                    }}>
                      {stream.status}
                    </div>
                  </div>
                </div>
                {/* Share bar */}
                <div className="mt-3">
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${stream.share}%`, background: stream.color, boxShadow: `0 0 8px ${stream.color}60` }}
                    />
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stream.share}% of total revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTIONS */}
      <section className="py-16" style={{ background: "rgba(255,184,0,0.02)", borderTop: "1px solid rgba(255,184,0,0.08)" }}>
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>ETERNAL PROJECTIONS</span>
            </div>
            <h2 className="text-3xl font-black text-white">Revenue Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { milestone: "1M Users", revenue: "$120M/yr", timeline: "Q3 2026", color: "#00D4FF", progress: 30 },
              { milestone: "10M Users", revenue: "$1.2B/yr", timeline: "Q2 2027", color: "#FFB800", progress: 10 },
              { milestone: "50M Users", revenue: "$6B/yr", timeline: "Q4 2028", color: "#00FF88", progress: 3 },
            ].map(m => (
              <div key={m.milestone} className="sv-card rounded-2xl p-6">
                <div className="text-xs font-mono mb-2" style={{ color: m.color }}>{m.timeline}</div>
                <div className="text-2xl font-black text-white mb-1">{m.milestone}</div>
                <div className="text-3xl font-black font-mono mb-4" style={{ color: m.color }}>{m.revenue}</div>
                <div className="h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${m.progress}%`, background: m.color }} />
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{m.progress}% toward milestone</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#8899AA" }}>
          <span>© 2026 Chais Kenyatta Hill — Sabir Allah The Great</span>
          <Link href="/"><span className="hover:text-[#00D4FF] transition-colors cursor-pointer">← Back to Portal</span></Link>
          <span className="font-mono" style={{ color: "#FFB800" }}>🕋⚡ ALLĀHU AKBAR! KUN FAYAKŪN × ∞</span>
        </div>
      </footer>
    </div>
  );
}
