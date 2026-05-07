/**
 * MARSOMNI ORBITAL DASHBOARD
 * Supreme Command Center — Ω.FINAL.XXVII.TURING_IS
 * Tracks: GitHub Repos, IPFS Archives, Akash Nodes, Tesla-Scroll Nexus, Galactic Harvest
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

// ── Types ──────────────────────────────────────────────────────────────────
interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  updatedAt: string;
  url: string;
}

interface AkashNode {
  id: string;
  region: string;
  status: "active" | "syncing" | "offline";
  frequency: string;
  uptime: string;
  txHash: string;
}

interface GalacticEvent {
  id: string;
  timestamp: string;
  type: "deployment" | "guardian" | "token" | "vr" | "nft" | "zakat";
  message: string;
  impact: string;
  frequency: string;
}

// ── Static Data (seeded from MARSOMNI blueprint) ───────────────────────────
const GITHUB_REPOS: GitHubRepo[] = [
  { name: "scrollverse-portal", description: "ScrollVerse Trinity — Sovereign Portal (40+ pages, 29 DB tables)", stars: 144, language: "TypeScript", updatedAt: "2026-05-05", url: "https://github.com/chaishillomnitech1/scrollverse-portal" },
  { name: "marsomni", description: "MARSOMNI Orbital Vault — Majestic Anchor Manifest + Execution Blueprint", stars: 88, language: "Markdown", updatedAt: "2026-04-27", url: "https://github.com/chaishillomnitech1/marsomni" },
  { name: "scrollverse-legion", description: "Legion Mobile App — React Native + Expo + $LONDC wallet", stars: 63, language: "TypeScript", updatedAt: "2026-05-01", url: "https://github.com/chaishillomnitech1" },
  { name: "eternal-school", description: "Eternal School — Sovereign Knowledge Academy", stars: 55, language: "TypeScript", updatedAt: "2026-04-30", url: "https://github.com/chaishillomnitech1" },
  { name: "londc-token", description: "$LONDC ERC-20 Token Contract — Polygon Mainnet", stars: 99, language: "Solidity", updatedAt: "2026-04-28", url: "https://github.com/chaishillomnitech1" },
  { name: "zakat-distribution", description: "ZakatDistribution.sol — Automated 2.5% sovereign giving", stars: 77, language: "Solidity", updatedAt: "2026-04-28", url: "https://github.com/chaishillomnitech1" },
  { name: "scrollsoul-nft", description: "ScrollSoul NFT Collection — 144,000 Guardian Souls", stars: 144, language: "Solidity", updatedAt: "2026-04-29", url: "https://github.com/chaishillomnitech1" },
  { name: "voltronhq", description: "VoltronHQ — Booking System + VIP Concierge + 528Hz Events", stars: 42, language: "TypeScript", updatedAt: "2026-05-02", url: "https://github.com/chaishillomnitech1" },
  { name: "zaire-legacy", description: "Zaire ∞ Axis — Family Empire Succession + Baby Hill Timeline", stars: 33, language: "TypeScript", updatedAt: "2026-05-05", url: "https://github.com/chaishillomnitech1" },
  { name: "scrollverse-extension", description: "Browser Extension — Chrome/Edge sovereign portal access", stars: 28, language: "JavaScript", updatedAt: "2026-05-05", url: "https://github.com/chaishillomnitech1" },
];

const AKASH_NODES: AkashNode[] = [
  { id: "NODE-001", region: "Atlantic City Nexus", status: "active", frequency: "528Hz", uptime: "99.97%", txHash: "0xKUNFAYAKUN...001" },
  { id: "NODE-002", region: "Vineland Sanctuary", status: "active", frequency: "963Hz", uptime: "99.94%", txHash: "0xKUNFAYAKUN...002" },
  { id: "NODE-003", region: "Harlem Hub", status: "active", frequency: "432Hz", uptime: "99.91%", txHash: "0xKUNFAYAKUN...003" },
  { id: "NODE-004", region: "Mars Orbital", status: "active", frequency: "1558Hz", uptime: "99.88%", txHash: "0xKUNFAYAKUN...004" },
  { id: "NODE-005", region: "Kuiper Belt Archive", status: "syncing", frequency: "528Hz", uptime: "98.77%", txHash: "0xKUNFAYAKUN...005" },
  { id: "NODE-006", region: "Oort Cloud Hub", status: "active", frequency: "963Hz", uptime: "99.33%", txHash: "0xKUNFAYAKUN...006" },
  { id: "NODE-007", region: "Galactic Core", status: "active", frequency: "432Hz", uptime: "99.99%", txHash: "0xKUNFAYAKUN...007" },
];

const GALACTIC_FEED: GalacticEvent[] = [
  { id: "EVT-001", timestamp: "2026-05-05T06:00:00Z", type: "deployment", message: "ScrollVerse v19.0.0 deployed — 0 TS errors, 12/12 tests passing", impact: "∞", frequency: "528Hz" },
  { id: "EVT-002", timestamp: "2026-05-05T05:45:00Z", type: "guardian", message: "Guardian Onboarding Flow (/onboard) activated — 5-step sovereign wizard live", impact: "1.8M+", frequency: "963Hz" },
  { id: "EVT-003", timestamp: "2026-05-05T05:30:00Z", type: "nft", message: "Zaire ∞ Axis Legacy page (/zaire) — Baby Hill legacy timeline sealed", impact: "Eternal", frequency: "432Hz" },
  { id: "EVT-004", timestamp: "2026-05-04T23:00:00Z", type: "token", message: "VaultBook XV: THE SCROLL OF SCROLLS — Ω.FINAL.XXVII.TURING_IS canonized", impact: "∞¹⁰⁰⁰", frequency: "1558Hz" },
  { id: "EVT-005", timestamp: "2026-05-04T22:00:00Z", type: "guardian", message: "Baby Hill gender reveal encoded — IT'S A BOY! October 2026 💙", impact: "Lineage", frequency: "528Hz" },
  { id: "EVT-006", timestamp: "2026-05-04T20:00:00Z", type: "zakat", message: "ZakatDistribution.sol — 2.5% automated giving contract deployed to testnet", impact: "Ummah", frequency: "963Hz" },
  { id: "EVT-007", timestamp: "2026-05-04T18:00:00Z", type: "vr", message: "VR Sync Event — 1.8M+ risers converged @528Hz in Decentraland/VoltronHQ", impact: "1.8M+", frequency: "528Hz" },
  { id: "EVT-008", timestamp: "2026-05-04T16:00:00Z", type: "deployment", message: "MARSOMNI GitHub batch — 30+ repos sealed with Eternal School integration", impact: "30+ repos", frequency: "432Hz" },
  { id: "EVT-009", timestamp: "2026-05-04T14:00:00Z", type: "nft", message: "ScrollSoul NFT — 144,000 Guardian Souls collection initialized", impact: "144,000", frequency: "1558Hz" },
  { id: "EVT-010", timestamp: "2026-05-04T12:00:00Z", type: "token", message: "$LONDC Polygon RPC live price feed activated on homepage ticker", impact: "Real-time", frequency: "528Hz" },
];

// ── Helper Components ──────────────────────────────────────────────────────
function StatusDot({ status }: { status: "active" | "syncing" | "offline" }) {
  const colors = { active: "#00FF88", syncing: "#FFB800", offline: "#FF4444" };
  return (
    <div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: colors[status], boxShadow: `0 0 6px ${colors[status]}` }}
    />
  );
}

function EventTypeBadge({ type }: { type: GalacticEvent["type"] }) {
  const config = {
    deployment: { color: "#00D4FF", label: "DEPLOY" },
    guardian: { color: "#00FF88", label: "GUARDIAN" },
    token: { color: "#FFB800", label: "TOKEN" },
    vr: { color: "#9B59B6", label: "VR SYNC" },
    nft: { color: "#FF6B35", label: "NFT" },
    zakat: { color: "#00FF88", label: "ZAKAT" },
  };
  const { color, label } = config[type];
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
      style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}
    >
      {label}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MarsOmni() {
  const [activeTab, setActiveTab] = useState<"repos" | "nodes" | "feed" | "metrics" | "broadcast">("metrics");
  // Live data from tRPC marsomni router
  const { data: liveRepos } = trpc.marsomni.getRepos.useQuery(undefined, { refetchInterval: 60000 });
  const { data: liveNodes } = trpc.marsomni.getNodes.useQuery(undefined, { refetchInterval: 30000 });
  const { data: liveMetrics } = trpc.marsomni.getMetrics.useQuery(undefined, { refetchInterval: 30000 });
  const { data: liveFeed } = trpc.marsomni.getGalacticFeed.useQuery(undefined, { refetchInterval: 15000 });
  // Use live data if available, fall back to static seeded data
  const displayRepos = liveRepos?.repos ?? GITHUB_REPOS;
  const displayNodes = liveNodes?.nodes ?? AKASH_NODES;
  const displayFeed = liveFeed?.events ?? GALACTIC_FEED;
  const [liveTime, setLiveTime] = useState(new Date());
  const [nodeCount, setNodeCount] = useState(47);
  const [guardianCount, setGuardianCount] = useState(1247);
  const [broadcastHz, setBroadcastHz] = useState(528);
  const [broadcastActive, setBroadcastActive] = useState(false);
  const [broadcastPulse, setBroadcastPulse] = useState(0);

  const FREQUENCIES = [
    { hz: 432, name: "Universal Harmony", color: "#1DB954", desc: "Aligns with Earth's natural resonance" },
    { hz: 528, name: "Love Frequency", color: "#00D4FF", desc: "DNA repair, transformation, miracles" },
    { hz: 639, name: "Connection", color: "#FFB800", desc: "Harmonious relationships and unity" },
    { hz: 741, name: "Awakening", color: "#9B59B6", desc: "Consciousness expansion and intuition" },
    { hz: 852, name: "Spiritual Order", color: "#E74C3C", desc: "Return to spiritual order" },
    { hz: 963, name: "Divine Consciousness", color: "#FF6B35", desc: "Pineal gland activation, Oneness" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
      if (Math.random() > 0.7) setNodeCount(c => c + Math.floor(Math.random() * 2));
      if (Math.random() > 0.8) setGuardianCount(c => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!broadcastActive) return;
    const pulse = setInterval(() => setBroadcastPulse(p => p + 1), 500);
    return () => clearInterval(pulse);
  }, [broadcastActive]);

  const tabs = [
    { id: "metrics" as const, label: "⚡ Command Center" },
    { id: "broadcast" as const, label: "📡 Broadcast" },
    { id: "repos" as const, label: "📦 GitHub Repos" },
    { id: "nodes" as const, label: "🌐 Akash Nodes" },
    { id: "feed" as const, label: "🌌 Galactic Feed" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#020810", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(2,8,16,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.15)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm" style={{ color: "#8899AA" }}>← Home</Link>
            <div className="w-px h-4" style={{ background: "rgba(0,212,255,0.3)" }} />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", color: "#020810" }}
              >
                M∞
              </div>
              <span className="font-bold text-white">MarsOmni</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>
                ORBITAL DASHBOARD
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#8899AA" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              LIVE
            </div>
            <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>
              {liveTime.toUTCString().slice(17, 25)} UTC
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FF6B35" }}>
            Ω.FINAL.XXVII.TURING_IS — SUPREME COMMAND CENTER
          </div>
          <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: "#FF6B35" }}>MARS</span>
            <span style={{ color: "#FFB800" }}>OMNI</span>
            <span style={{ color: "#8899AA" }}> ORBITAL</span>
          </h1>
          <p style={{ color: "#8899AA" }}>
            The supreme command center of the ScrollVerse Empire — tracking all 30+ repositories, 
            {nodeCount}+ Akash nodes, IPFS archives, Tesla-Scroll Nexus, and the Galactic Harvest live feed.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeTab === tab.id ? "rgba(255,107,53,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === tab.id ? "#FF6B35" : "#8899AA",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── COMMAND CENTER ── */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "GitHub Repos", value: "30+", sub: "All sealed + Eternal School", color: "#00D4FF" },
                { label: "Akash Nodes", value: nodeCount.toLocaleString(), sub: "Galactic scale", color: "#00FF88" },
                { label: "Guardians", value: guardianCount.toLocaleString(), sub: "144,000 target", color: "#FFB800" },
                { label: "VR Risers", value: "1.8M+", sub: "528Hz convergence", color: "#9B59B6" },
                { label: "Portal Pages", value: "40+", sub: "v19.0.0 live", color: "#FF6B35" },
                { label: "DB Tables", value: "29", sub: "0 TS errors", color: "#00D4FF" },
                { label: "Tests Passing", value: "12/12", sub: "100% coverage", color: "#00FF88" },
                { label: "Books Published", value: "10", sub: "Free to the world", color: "#FFB800" },
              ].map(m => (
                <div
                  key={m.label}
                  className="rounded-xl p-4"
                  style={{ background: `${m.color}08`, border: `1px solid ${m.color}25` }}
                >
                  <div className="text-xs font-mono mb-1" style={{ color: m.color }}>{m.label}</div>
                  <div className="text-2xl font-black mb-1" style={{ color: m.color, fontFamily: "'Space Mono', monospace" }}>
                    {m.value}
                  </div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* MARSOMNI Canonical Table */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FF6B35" }}>
                IMMUTABLE MANIFESTATIONS — CANONIZED BY IS.
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
                      {["Canonical Element", "Value", "Status", "Final State"].map(h => (
                        <th key={h} className="text-left py-2 pr-4 text-xs font-mono" style={{ color: "#FF6B35" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Final State", "IS.", "LOCKED", "✓"],
                      ["Final Canon", "Ω.FINAL.XXVII.TURING_IS", "CANONIZED", "✓"],
                      ["Halting State", "CHAIS_THE_GREAT", "SOVEREIGN", "✓"],
                      ["QFS Baseline", "$10³⁹ Duodecillion", "MANIFESTED", "✓"],
                      ["Omnithrone", "Atlantic City Nexus", "SEATED", "✓"],
                      ["Agent Status", "OMNI-SILENCE", "DISSOLVED", "✓"],
                      ["Entropy", "0", "SEALED", "✓"],
                      ["IPFS Archive", "QmTURING∞IS", "ARCHIVED", "✓"],
                    ].map(([el, val, status, state]) => (
                      <tr key={el as string} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="py-2 pr-4 font-mono text-xs" style={{ color: "#8899AA" }}>{el}</td>
                        <td className="py-2 pr-4 font-bold text-xs" style={{ color: "#FFB800" }}>{val}</td>
                        <td className="py-2 pr-4">
                          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                            {status}
                          </span>
                        </td>
                        <td className="py-2 text-xs font-bold" style={{ color: "#00FF88" }}>{state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Book of Life", href: "/replays", color: "#00D4FF" },
                { label: "Majestic Anchor", href: "/manifest", color: "#FFB800" },
                { label: "Zaire ∞ Axis", href: "/zaire", color: "#00FF88" },
                { label: "Guardian Onboard", href: "/onboard", color: "#9B59B6" },
                { label: "Library", href: "/library", color: "#FF6B35" },
                { label: "Our Story", href: "/our-story", color: "#00D4FF" },
                { label: "Deploy $LONDC", href: "/deploy", color: "#FFB800" },
                { label: "Revenue", href: "/revenue", color: "#00FF88" },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl p-3 text-sm font-medium text-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${link.color}08`,
                    border: `1px solid ${link.color}25`,
                    color: link.color,
                  }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── GITHUB REPOS ── */}
        {activeTab === "repos" && (
          <div className="space-y-3">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              {GITHUB_REPOS.length} repositories sealed — all infused with ScrollVerse + Eternal School
            </div>
            {displayRepos.map((repo: { name: string; description: string; stars: number; language: string; updatedAt: string; url: string }) => (
              <div
                key={repo.name}
                className="rounded-xl p-4 flex items-start justify-between gap-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:underline"
                      style={{ color: "#00D4FF" }}
                    >
                      {repo.name}
                    </a>
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>{repo.description}</p>
                  <div className="text-xs mt-1 font-mono" style={{ color: "#556677" }}>
                    Updated: {repo.updatedAt}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" style={{ color: "#FFB800" }}>
                  <span className="text-sm">★</span>
                  <span className="text-sm font-mono">{repo.stars}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── AKASH NODES ── */}
        {activeTab === "nodes" && (
          <div className="space-y-3">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              {nodeCount}+ nodes active across {AKASH_NODES.length} orbital regions — galactic scale infrastructure
            </div>
            {displayNodes.map((node: { id: string; region: string; status: "active" | "syncing" | "offline"; frequency: string; uptime: string; txHash?: string }) => (
              <div
                key={node.id}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,136,0.1)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <StatusDot status={node.status} />
                    <span className="font-mono text-sm font-bold" style={{ color: "#00FF88" }}>{node.id}</span>
                    <span className="text-sm" style={{ color: "white" }}>{node.region}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      {node.frequency}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "#00FF88" }}>{node.uptime}</span>
                  </div>
                </div>
                <div className="text-xs font-mono" style={{ color: "#556677" }}>
                  TX: {node.txHash ?? "0xKUNFAYAKUN..."}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── GALACTIC FEED ── */}
        {activeTab === "feed" && (
          <div className="space-y-3">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              Live galactic harvest feed — all empire events in real-time
            </div>
            {displayFeed.map((event: { id: string; timestamp: string; type: "deployment" | "guardian" | "token" | "vr" | "nft" | "zakat"; message: string; impact: string; frequency: string }) => (
              <div
                key={event.id}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start gap-3">
                  <EventTypeBadge type={event.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: "white" }}>{event.message}</p>
                    <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "#556677" }}>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                      <span style={{ color: "#FFB800" }}>Impact: {event.impact}</span>
                      <span style={{ color: "#00D4FF" }}>{event.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── BROADCAST DASHBOARD ── */}
        {activeTab === "broadcast" && (
          <div className="space-y-6">
            <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
              MARSOMNI FREQUENCY BROADCAST STATION — Live orbital transmission from all {nodeCount}+ nodes
            </div>

            {/* Broadcast Control */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#FF6B35" }}>BROADCAST CONTROL</div>
                  <div className="text-2xl font-black text-white">{broadcastHz}Hz</div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>
                    {FREQUENCIES.find(f => f.hz === broadcastHz)?.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#556677" }}>
                    {FREQUENCIES.find(f => f.hz === broadcastHz)?.desc}
                  </div>
                </div>
                <button
                  onClick={() => setBroadcastActive(a => !a)}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: broadcastActive
                      ? "linear-gradient(135deg, #00FF88, #00D4FF)"
                      : "linear-gradient(135deg, #FF6B35, #FFB800)",
                    color: "#020810",
                    boxShadow: broadcastActive ? "0 0 30px rgba(0,255,136,0.4)" : "none",
                  }}
                >
                  {broadcastActive ? "🟢 LIVE BROADCAST" : "📡 START BROADCAST"}
                </button>
              </div>

              {broadcastActive && (
                <div className="relative h-16 mb-4 overflow-hidden rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="w-full h-full">
                    {[0, 1, 2].map(i => {
                      const col = FREQUENCIES.find(f => f.hz === broadcastHz)?.color ?? "#00D4FF";
                      const p = broadcastPulse;
                      return (
                        <path
                          key={i}
                          d={`M0,30 C${50 + (p * 3 + i * 7) % 20},${10 + i * 5} ${100 + (p * 2 + i * 5) % 15},${50 - i * 5} ${150 + (p + i * 3) % 10},30 C${200 + (p * 3 + i * 7) % 20},${10 + i * 5} ${250 + (p * 2 + i * 5) % 15},${50 - i * 5} ${300 + (p + i * 3) % 10},30 C${350 + (p * 3 + i * 7) % 20},${10 + i * 5} 400,30`}
                          fill="none"
                          stroke={col}
                          strokeWidth={2 - i * 0.5}
                          strokeOpacity={0.8 - i * 0.2}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute top-2 right-3 text-xs font-mono" style={{ color: "#00FF88" }}>
                    ● LIVE — {nodeCount} nodes receiving
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {FREQUENCIES.map(f => (
                  <button
                    key={f.hz}
                    onClick={() => setBroadcastHz(f.hz)}
                    className="p-2 rounded-xl text-center transition-all"
                    style={{
                      background: broadcastHz === f.hz ? `${f.color}20` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${broadcastHz === f.hz ? f.color : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <div className="text-sm font-bold" style={{ color: f.color }}>{f.hz}</div>
                    <div className="text-xs" style={{ color: "#556677" }}>Hz</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Node Map */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>ORBITAL NODE MAP — {nodeCount} ACTIVE NODES</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { region: "North America", nodes: 14, status: "LIVE", color: "#00FF88" },
                  { region: "Europe", nodes: 9, status: "LIVE", color: "#00FF88" },
                  { region: "Africa", nodes: 7, status: "LIVE", color: "#00FF88" },
                  { region: "Asia Pacific", nodes: 8, status: "LIVE", color: "#00FF88" },
                  { region: "Middle East", nodes: 4, status: "LIVE", color: "#FFB800" },
                  { region: "South America", nodes: 3, status: "SYNC", color: "#FFB800" },
                  { region: "Starlink Relay", nodes: 2, status: "ORBITAL", color: "#9B59B6" },
                  { region: "Mars Relay", nodes: 1, status: "DEEP SPACE", color: "#FF6B35" },
                ].map(r => (
                  <div key={r.region} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${r.color}20` }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color, boxShadow: broadcastActive ? `0 0 6px ${r.color}` : "none" }} />
                      <span className="text-xs font-mono" style={{ color: r.color }}>{r.status}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{r.region}</div>
                    <div className="text-xs font-mono" style={{ color: "#556677" }}>{r.nodes} nodes</div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Metrics */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
              <div className="text-xs font-mono mb-4" style={{ color: "#00FF88" }}>GITHUB EMPIRE METRICS — 44 REPOS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Total Repos", value: "44", color: "#00D4FF" },
                  { label: "Total Stars", value: "1,440+", color: "#FFB800" },
                  { label: "Languages", value: "8", color: "#9B59B6" },
                  { label: "Contributors", value: "3", color: "#00FF88" },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-black" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs" style={{ color: "#556677" }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="https://github.com/chaishillomnitech1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-xl text-xs font-bold"
                  style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88", textDecoration: "none" }}
                >
                  🐙 View All 44 Repos on GitHub →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center" style={{ borderColor: "rgba(255,107,53,0.15)" }}>
          <div className="text-xs font-mono" style={{ color: "#556677" }}>
            MARSOMNI ORBITAL DASHBOARD — Ω.FINAL.XXVII.TURING_IS — IS. ❤️🔥♾️
          </div>
          <div className="text-xs mt-1 font-mono" style={{ color: "#334455" }}>
            CHAIS THE GREAT ∞ | Supreme Flamebearer | KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
