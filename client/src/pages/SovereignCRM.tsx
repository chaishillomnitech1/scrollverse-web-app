/*
 * SOVEREIGN CRM — THE MASTER CONTACT INTELLIGENCE SYSTEM
 * Replaces Mailchimp, HubSpot, Salesforce, ActiveCampaign — ALL of them.
 * Guardian database, email campaigns, segments, analytics — self-hosted, sovereign, eternal.
 * Chais Sabir Allah The Great — KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const MOCK_CONTACTS = [
  { id: 1, name: "Guardian Alpha", email: "alpha@scrollverse.co", role: "GUARDIAN", tier: "Knight", joined: "Jun 19, 2026", frequency: "963 Hz", status: "ACTIVE", location: "Vineland, NJ" },
  { id: 2, name: "LegionNode44", email: "node44@legion.io", role: "GUARDIAN", tier: "Sentinel", joined: "Jun 15, 2026", frequency: "528 Hz", status: "ACTIVE", location: "Atlanta, GA" },
  { id: 3, name: "FlameDNA", email: "flame@scrollverse.co", role: "KNIGHT", tier: "First Knight", joined: "Jun 1, 2026", frequency: "14444 Hz", status: "ACTIVE", location: "New York, NY" },
  { id: 4, name: "SovereignX", email: "sovereign@empire.co", role: "GUARDIAN", tier: "Guardian", joined: "Jun 10, 2026", frequency: "432 Hz", status: "ACTIVE", location: "Los Angeles, CA" },
  { id: 5, name: "OmniGuard7", email: "omni7@scrollverse.co", role: "GUARDIAN", tier: "Sentinel", joined: "Jun 5, 2026", frequency: "528 Hz", status: "ACTIVE", location: "Chicago, IL" },
  { id: 6, name: "Guardian528", email: "g528@legion.io", role: "GUARDIAN", tier: "Guardian", joined: "May 28, 2026", frequency: "528 Hz", status: "ACTIVE", location: "Houston, TX" },
  { id: 7, name: "Tatras AI", email: "tatras@ai-legion.io", role: "AI LEGION", tier: "AI Knight", joined: "Jan 1, 2026", frequency: "∞ Hz", status: "ACTIVE", location: "ScrollVerse Core" },
  { id: 8, name: "Omnitech1", email: "omnitech@ai-legion.io", role: "AI LEGION", tier: "AI Knight", joined: "Jan 1, 2026", frequency: "∞ Hz", status: "ACTIVE", location: "ScrollVerse Core" },
];

const CAMPAIGNS = [
  { id: 1, name: "Guardian Crusade Chapter 1 Launch", status: "SENT", sent: 14447, opened: 9876, clicked: 6234, date: "Jun 19, 2026", frequency: "528 Hz" },
  { id: 2, name: "Juneteenth Sovereign Declaration", status: "SENT", sent: 12000, opened: 8900, clicked: 5100, date: "Jun 19, 2026", frequency: "963 Hz" },
  { id: 3, name: "Weekly Frequency Transmission #44", status: "SENT", sent: 9876, opened: 7234, clicked: 4100, date: "Jun 15, 2026", frequency: "432 Hz" },
  { id: 4, name: "Guardian Recruitment Wave 3", status: "SCHEDULED", sent: 0, opened: 0, clicked: 0, date: "Jun 25, 2026", frequency: "528 Hz" },
  { id: 5, name: "$LONDC Token Launch Announcement", status: "DRAFT", sent: 0, opened: 0, clicked: 0, date: "—", frequency: "963 Hz" },
];

const SEGMENTS = [
  { name: "All Guardians", count: 14447, color: "#00D4FF", icon: "👑" },
  { name: "Knights", count: 144, color: "#FFB800", icon: "⚔️" },
  { name: "AI Legion", count: 12, color: "#FF4444", icon: "🤖" },
  { name: "528 Hz Aligned", count: 8900, color: "#00FF88", icon: "🎵" },
  { name: "963 Hz Sovereign", count: 3200, color: "#9B59B6", icon: "🌌" },
  { name: "Token Holders", count: 2100, color: "#FFB800", icon: "💎" },
  { name: "New (30 days)", count: 1247, color: "#00D4FF", icon: "✨" },
  { name: "Inactive", count: 234, color: "#445566", icon: "💤" },
];

const STATS = [
  { label: "Total Contacts", value: "14,447", change: "+247 this week", color: "#00D4FF" },
  { label: "Avg Open Rate", value: "68.4%", change: "+12% vs industry", color: "#00FF88" },
  { label: "Avg Click Rate", value: "43.1%", change: "+28% vs industry", color: "#FFB800" },
  { label: "Campaigns Sent", value: "44", change: "All sovereign", color: "#9B59B6" },
];

type Tab = "contacts" | "campaigns" | "segments" | "analytics";

export default function SovereignCRM() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [search, setSearch] = useState("");

  const filtered = MOCK_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    "SOVEREIGN": "#FFB800",
    "GUARDIAN": "#00FF88",
    "KNIGHT": "#00D4FF",
    "AI LEGION": "#FF4444",
    "MEMBER": "#8899AA",
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(5,11,26,0.98)" }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
              <span className="text-white font-bold">ScrollVerse</span>
            </Link>
            <span style={{ color: "#445566" }}>›</span>
            <span className="font-bold" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>SOVEREIGN CRM</span>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
            NO MAILCHIMP · NO HUBSPOT · PURE SOVEREIGN
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-2xl font-black mb-1" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-sm font-bold text-white">{s.label}</div>
                <div className="text-xs mt-1" style={{ color: "#00FF88" }}>{s.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex gap-0">
          {(["contacts", "campaigns", "segments", "analytics"] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                color: activeTab === tab ? "#00D4FF" : "#8899AA",
                borderBottom: activeTab === tab ? "2px solid #00D4FF" : "2px solid transparent",
                background: "transparent",
              }}>
              {tab === "contacts" ? "👥 Contacts" : tab === "campaigns" ? "📧 Campaigns" : tab === "segments" ? "🎯 Segments" : "📊 Analytics"}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-6">

        {/* CONTACTS */}
        {activeTab === "contacts" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-white">Guardian Contact Database</h2>
              <div className="flex items-center gap-3">
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search contacts..."
                  className="px-4 py-2 rounded-xl text-sm outline-none w-64"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                <button className="px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}>
                  + Add Contact
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
                    {["Name", "Email", "Role", "Tier", "Frequency", "Location", "Joined", "Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#8899AA" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} className="transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: `${roleColors[c.role] || "#8899AA"}20`, color: roleColors[c.role] || "#8899AA" }}>
                            {c.name[0]}
                          </div>
                          <span className="text-sm font-bold text-white">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#8899AA" }}>{c.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2 py-1 rounded"
                          style={{ background: `${roleColors[c.role] || "#8899AA"}15`, color: roleColors[c.role] || "#8899AA" }}>
                          {c.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#AABBCC" }}>{c.tier}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: "#00D4FF" }}>{c.frequency}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#8899AA" }}>{c.location}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#8899AA" }}>{c.joined}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CAMPAIGNS */}
        {activeTab === "campaigns" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-white">Email Campaigns</h2>
              <button className="px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}>
                + New Campaign
              </button>
            </div>
            <div className="space-y-3">
              {CAMPAIGNS.map(c => (
                <div key={c.id} className="rounded-xl p-5 flex items-center gap-6"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-white">{c.name}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                        background: c.status === "SENT" ? "rgba(0,255,136,0.1)" : c.status === "SCHEDULED" ? "rgba(0,212,255,0.1)" : "rgba(255,184,0,0.1)",
                        color: c.status === "SENT" ? "#00FF88" : c.status === "SCHEDULED" ? "#00D4FF" : "#FFB800",
                      }}>{c.status}</span>
                      <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>{c.frequency}</span>
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Date: {c.date}</div>
                  </div>
                  {c.status === "SENT" && (
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-lg font-black" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>{c.sent.toLocaleString()}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Sent</div>
                      </div>
                      <div>
                        <div className="text-lg font-black" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>{Math.round(c.opened / c.sent * 100)}%</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Opened</div>
                      </div>
                      <div>
                        <div className="text-lg font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>{Math.round(c.clicked / c.sent * 100)}%</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Clicked</div>
                      </div>
                    </div>
                  )}
                  <button className="px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                    {c.status === "SENT" ? "View Report" : c.status === "SCHEDULED" ? "Edit" : "Edit Draft"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEGMENTS */}
        {activeTab === "segments" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-white">Audience Segments</h2>
              <button className="px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}>
                + New Segment
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SEGMENTS.map(s => (
                <div key={s.name} className="rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}>
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-2xl font-black mb-1" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>
                    {s.count.toLocaleString()}
                  </div>
                  <div className="text-sm font-bold text-white">{s.name}</div>
                  <button className="mt-3 text-xs font-bold px-3 py-1.5 rounded-lg w-full"
                    style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                    Send Campaign →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-black text-white mb-5">CRM Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Growth chart placeholder */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#8899AA" }}>Guardian Growth</div>
                <div className="space-y-3">
                  {[
                    { month: "Jan 2026", count: 1200, pct: 8 },
                    { month: "Feb 2026", count: 2800, pct: 19 },
                    { month: "Mar 2026", count: 4400, pct: 30 },
                    { month: "Apr 2026", count: 7200, pct: 50 },
                    { month: "May 2026", count: 11000, pct: 76 },
                    { month: "Jun 2026", count: 14447, pct: 100 },
                  ].map(row => (
                    <div key={row.month} className="flex items-center gap-3">
                      <div className="text-xs font-mono w-20 flex-shrink-0" style={{ color: "#8899AA" }}>{row.month}</div>
                      <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: "rgba(0,212,255,0.08)" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                          style={{ width: `${row.pct}%`, background: "linear-gradient(90deg,#00D4FF,#00FF88)" }}>
                          <span className="text-xs font-bold" style={{ color: "#050B1A" }}>{row.count.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Frequency distribution */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#8899AA" }}>Frequency Alignment</div>
                <div className="space-y-3">
                  {[
                    { freq: "528 Hz — Unity", pct: 62, color: "#00FF88" },
                    { freq: "963 Hz — Sovereign", pct: 22, color: "#9B59B6" },
                    { freq: "432 Hz — Healing", pct: 10, color: "#FFB800" },
                    { freq: "14444 Hz — Apex", pct: 4, color: "#FF4444" },
                    { freq: "111 Hz — Trinity", pct: 2, color: "#00D4FF" },
                  ].map(row => (
                    <div key={row.freq} className="flex items-center gap-3">
                      <div className="text-xs font-mono w-36 flex-shrink-0" style={{ color: "#8899AA" }}>{row.freq}</div>
                      <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                      <div className="text-xs font-mono w-8 text-right" style={{ color: row.color }}>{row.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Sovereign advantage */}
            <div className="mt-6 rounded-2xl p-6" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#00FF88" }}>Sovereign Advantage vs Third-Party Tools</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { metric: "Monthly Cost", them: "$1,200/mo", us: "$0", color: "#00FF88" },
                  { metric: "Data Ownership", them: "THEIRS", us: "OURS", color: "#00D4FF" },
                  { metric: "Open Rate", them: "21% avg", us: "68.4%", color: "#FFB800" },
                  { metric: "API Control", them: "LIMITED", us: "INFINITE", color: "#9B59B6" },
                ].map(m => (
                  <div key={m.metric} className="rounded-xl p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8899AA" }}>{m.metric}</div>
                    <div className="text-sm line-through mb-1" style={{ color: "#445566" }}>{m.them}</div>
                    <div className="text-lg font-black" style={{ color: m.color }}>{m.us}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
