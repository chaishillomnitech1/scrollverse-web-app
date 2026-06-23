/*
 * MASTER APP — UNIFIED SOVEREIGN APP LAUNCHER
 * The ScrollVerse OS. Every empire system in one sovereign interface.
 * Replaces: Notion, Slack, Discord (admin), HubSpot, Mailchimp, Stripe Dashboard,
 *           GitHub Dashboard, Spotify for Artists, Google Analytics — ALL of them.
 * Chais Sabir Allah The Great — KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";

const APP_GRID = [
  // Row 1 — Core Empire
  {
    category: "CORE EMPIRE",
    color: "#00D4FF",
    apps: [
      { name: "Allversal Empire", icon: "🌌", href: "/allversal-empire", desc: "Full empire command center", status: "LIVE" },
      { name: "Sovereign Bank", icon: "🏛️", href: "/sovereign-bank", desc: "Treasury & vault management", status: "LIVE" },
      { name: "Revenue Flywheel", icon: "⚙️", href: "/revenue-flywheel", desc: "Auto-compounding revenue", status: "LIVE" },
      { name: "Revenue Dashboard", icon: "📊", href: "/revenue-dashboard", desc: "Live sovereign cut extractions", status: "LIVE" },
    ],
  },
  // Row 2 — Guardian Network
  {
    category: "GUARDIAN NETWORK",
    color: "#00FF88",
    apps: [
      { name: "Guardians", icon: "🛡️", href: "/guardians", desc: "144K Guardian registry", status: "LIVE" },
      { name: "Guardian Crusade", icon: "⚔️", href: "/guardian-crusade", desc: "Chapter 1 — Bloodline Covenant", status: "LIVE" },
      { name: "Sovereign CRM", icon: "👥", href: "/sovereign-crm", desc: "Master contact intelligence", status: "LIVE" },
      { name: "Star Gate", icon: "⭐", href: "/star-gate", desc: "Lineage nodes & pyramid frequency", status: "LIVE" },
    ],
  },
  // Row 3 — Content & Media
  {
    category: "CONTENT & MEDIA",
    color: "#9B59B6",
    apps: [
      { name: "ScrollTV", icon: "📺", href: "/scroll-tv", desc: "Sovereign broadcast network", status: "LIVE" },
      { name: "Storybooks", icon: "📚", href: "/storybooks", desc: "Tokenized AI Legion storybooks", status: "LIVE" },
      { name: "Media Hub", icon: "🎬", href: "/media-hub", desc: "Music, video, art archive", status: "LIVE" },
      { name: "Eternal Echo", icon: "🔊", href: "/eternal-echo", desc: "Mika-Solara frequency transmissions", status: "LIVE" },
    ],
  },
  // Row 4 — Commerce & Token
  {
    category: "COMMERCE & TOKEN",
    color: "#FFB800",
    apps: [
      { name: "TikTok Shop", icon: "🛒", href: "/tiktok-shop", desc: "Viral commerce maximizer", status: "LIVE" },
      { name: "CHX Token", icon: "💎", href: "/chxtoken", desc: "$LONDC sovereign currency", status: "LIVE" },
      { name: "NFT Unlock", icon: "🔓", href: "/nft-unlock", desc: "Legendary Father NFT", status: "LIVE" },
      { name: "Partnerships", icon: "🤝", href: "/partnerships", desc: "Sovereign partner network", status: "LIVE" },
    ],
  },
  // Row 5 — Intelligence
  {
    category: "INTELLIGENCE",
    color: "#FF4444",
    apps: [
      { name: "AI Legion Apex", icon: "🤖", href: "/ai-legion-apex", desc: "PSYCHE16 command interface", status: "LIVE" },
      { name: "Master Gateway", icon: "🔌", href: "/master-gateway", desc: "Sovereign API hub", status: "LIVE" },
      { name: "Global Map", icon: "🗺️", href: "/global-map", desc: "Empire node visualization", status: "LIVE" },
      { name: "Soul Altar", icon: "🕋", href: "/soul-altar", desc: "Frequency & spiritual core", status: "LIVE" },
    ],
  },
  // Row 6 — Academy & Legacy
  {
    category: "ACADEMY & LEGACY",
    color: "#00D4FF",
    apps: [
      { name: "Academy", icon: "🎓", href: "/academy", desc: "Sovereign education system", status: "LIVE" },
      { name: "Our Story", icon: "📜", href: "/our-story", desc: "Bloodline & lineage archive", status: "LIVE" },
      { name: "Juneteenth", icon: "✊", href: "/juneteenth-declaration", desc: "Liberation declaration", status: "LIVE" },
      { name: "Site Map", icon: "🗂️", href: "/site-map", desc: "Full empire directory", status: "LIVE" },
    ],
  },
];

const QUICK_ACTIONS = [
  { label: "Send Campaign", icon: "📧", href: "/sovereign-crm", color: "#00D4FF" },
  { label: "View Treasury", icon: "💰", href: "/sovereign-bank", color: "#FFB800" },
  { label: "Go Live", icon: "📺", href: "/scroll-tv", color: "#9B59B6" },
  { label: "Add Guardian", icon: "🛡️", href: "/guardians", color: "#00FF88" },
  { label: "Check Routes", icon: "🔌", href: "/master-gateway", color: "#FF4444" },
  { label: "View Analytics", icon: "📊", href: "/revenue-dashboard", color: "#FFB800" },
];

export default function MasterApp() {
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();

  const allApps = APP_GRID.flatMap(g => g.apps.map(a => ({ ...a, category: g.category, color: g.color })));
  const filtered = search
    ? allApps.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase())
      )
    : null;

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
            <span className="font-bold" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>MASTER APP</span>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>
            {allApps.length} SOVEREIGN APPS · 0 SUBSCRIPTIONS
          </div>
        </div>
      </div>

      {/* Search & Quick Actions */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.08)", background: "linear-gradient(180deg,rgba(255,184,0,0.03) 0%,transparent 100%)" }}>
        <div className="container py-6">
          <h1 className="text-3xl font-black text-white mb-2">ScrollVerse OS</h1>
          <p className="mb-5" style={{ color: "#8899AA" }}>
            Every empire system. One sovereign interface. <strong style={{ color: "#FFB800" }}>No third-party apps. No subscriptions. No gatekeepers.</strong>
          </p>
          <div className="flex gap-3 mb-5">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search all apps, systems, routes..."
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white", maxWidth: "400px" }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map(q => (
              <Link key={q.label} href={q.href}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                  style={{ background: `${q.color}10`, border: `1px solid ${q.color}25`, color: q.color }}>
                  <span>{q.icon}</span>
                  {q.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Search results */}
        {filtered && (
          <div className="mb-8">
            <div className="text-sm font-bold mb-3" style={{ color: "#8899AA" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filtered.map(a => (
                <Link key={a.href} href={a.href}>
                  <div className="rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                    style={{ background: `${a.color}08`, border: `1px solid ${a.color}20` }}>
                    <div className="text-2xl mb-2">{a.icon}</div>
                    <div className="text-sm font-bold text-white mb-1">{a.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{a.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Full grid */}
        {!filtered && APP_GRID.map(group => (
          <div key={group.category} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ background: `${group.color}20` }} />
              <span className="text-xs font-bold uppercase tracking-widest px-3" style={{ color: group.color }}>{group.category}</span>
              <div className="h-px flex-1" style={{ background: `${group.color}20` }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {group.apps.map(app => (
                <Link key={app.href} href={app.href}>
                  <div className="rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.03] group"
                    style={{ background: `${group.color}06`, border: `1px solid ${group.color}18` }}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{app.icon}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>{app.status}</span>
                    </div>
                    <div className="font-bold text-white mb-1 group-hover:text-[#00D4FF] transition-colors">{app.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{app.desc}</div>
                    <div className="mt-3 text-xs font-mono" style={{ color: group.color }}>Open →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Sovereign declaration */}
        <div className="mt-4 rounded-2xl p-6 text-center"
          style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.04),rgba(255,184,0,0.04))", border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="text-2xl font-black text-white mb-2">KUN FAYAKŪN × ∞</div>
          <p className="text-sm" style={{ color: "#8899AA", maxWidth: "500px", margin: "0 auto" }}>
            Every app above is owned by <strong style={{ color: "#FFB800" }}>Chais Sabir Allah The Great</strong>.
            No corporation controls this infrastructure. The ScrollVerse Empire is self-sovereign, self-validating, and eternal.
            Banks apply to us. Platforms serve us. <strong style={{ color: "#00FF88" }}>We are the system.</strong>
          </p>
          <div className="mt-4 text-xs font-mono" style={{ color: "#FFB800" }}>
            La ilaha illallah · Everybody lives. Forever. ❤️
          </div>
        </div>
      </div>
    </div>
  );
}
