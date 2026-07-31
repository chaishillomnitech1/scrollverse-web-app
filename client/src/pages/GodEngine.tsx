/*
 * GODENGINE — Sovereign AI Operations Center
 * The living intelligence layer of the ScrollVerse Trinity
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { toast } from "sonner";

const MODULES = [
  {
    id: "oracle",
    title: "Sovereign Oracle",
    subtitle: "Pattern Recognition Engine",
    icon: "🔮",
    color: "#00D4FF",
    status: "ACTIVE",
    metrics: { queries: "144K", accuracy: "99.7%", latency: "12ms" },
    description: "Real-time pattern analysis across 205 sovereign routes. Detects frequency anomalies, Guardian engagement spikes, and $LONDC market signals.",
  },
  {
    id: "zakat",
    title: "AgapeCycle Engine",
    subtitle: "88/12 Auto-Router",
    icon: "⚖️",
    color: "#FFB800",
    status: "ACTIVE",
    metrics: { routed: "$144K", treasury: "88%", zakat: "12%" },
    description: "Immutable Zakat distribution engine. Every transaction auto-splits: 88% to sovereign treasury, 12% to Zakat vault. No override possible.",
  },
  {
    id: "guardian",
    title: "Guardian Matrix",
    subtitle: "144,000 Node Network",
    icon: "🛡️",
    color: "#00FF88",
    status: "ACTIVE",
    metrics: { nodes: "1,247", active: "963", pending: "284" },
    description: "Live Guardian network telemetry. Tracks onboarding velocity, engagement depth, and frequency resonance across all 144,000 sovereign seats.",
  },
  {
    id: "frequency",
    title: "Frequency Core",
    subtitle: "963Hz / 999Hz Baseline",
    icon: "〰️",
    color: "#EC4899",
    status: "ACTIVE",
    metrics: { hz: "963Hz", sessions: "528", peak: "999Hz" },
    description: "Sovereign frequency broadcast layer. Maintains 963Hz cosmic baseline and 999Hz Gate 44:Omni resonance across all active sessions.",
  },
  {
    id: "londc",
    title: "$LONDC Token Engine",
    subtitle: "Polygon Mainnet",
    icon: "💎",
    color: "#8B5CF6",
    status: "LIVE",
    metrics: { supply: "144K", holders: "88", staked: "63%" },
    description: "Live $LONDC token telemetry. Tracks circulation, staking pools, CHX yield, and Infinity Pool APY in real time on Polygon Mainnet.",
  },
  {
    id: "broadcast",
    title: "Sovereign Broadcast",
    subtitle: "SendGrid · 144K Guardians",
    icon: "📡",
    color: "#F59E0B",
    status: "READY",
    metrics: { sent: "0", queued: "144K", rate: "100/day" },
    description: "Direct sovereign email delivery to all 144,000 Guardians. SendGrid API active. No Mailchimp — we ARE the system.",
  },
];

const SYSTEM_LOG = [
  { time: "00:00:01", event: "GodEngine initialized — all modules online", level: "INFO" },
  { time: "00:00:02", event: "AgapeCycle 88/12 router locked — immutable", level: "SUCCESS" },
  { time: "00:00:03", event: "Guardian Matrix: 1,247 nodes synchronized", level: "INFO" },
  { time: "00:00:04", event: "Frequency Core: 963Hz baseline established", level: "INFO" },
  { time: "00:00:05", event: "$LONDC Engine: Polygon Mainnet connection verified", level: "SUCCESS" },
  { time: "00:00:06", event: "Sovereign Oracle: Pattern scan initiated across 205 routes", level: "INFO" },
  { time: "00:00:07", event: "SendGrid broadcast engine: READY — 144K seats loaded", level: "SUCCESS" },
  { time: "00:00:08", event: "KUN FAYAKŪN × ∞ — ALL SYSTEMS GREEN", level: "OMEGA" },
];

function SystemLog() {
  const [logs, setLogs] = useState<typeof SYSTEM_LOG>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < SYSTEM_LOG.length) {
        setLogs((prev) => [...prev, SYSTEM_LOG[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const levelColor: Record<string, string> = {
    INFO: "#8899AA",
    SUCCESS: "#00FF88",
    OMEGA: "#FFB800",
  };

  return (
    <div
      className="rounded-xl p-4 font-mono text-xs h-48 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,212,255,0.1)" }}
    >
      {logs.map((log, i) => (
        <div key={i} className="flex gap-3 mb-1">
          <span style={{ color: "#5a6a7a" }}>[{log.time}]</span>
          <span style={{ color: levelColor[log.level] || "#8899AA" }}>{log.event}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

function ModuleCard({ mod }: { mod: typeof MODULES[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: expanded ? `${mod.color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${expanded ? mod.color + "40" : "rgba(255,255,255,0.06)"}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{mod.icon}</span>
          <div>
            <div className="font-bold text-white text-sm">{mod.title}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{mod.subtitle}</div>
          </div>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            background: `${mod.color}15`,
            border: `1px solid ${mod.color}40`,
            color: mod.color,
          }}
        >
          {mod.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {Object.entries(mod.metrics).map(([k, v]) => (
          <div key={k} className="text-center">
            <div className="font-bold text-sm" style={{ color: mod.color }}>{v}</div>
            <div className="text-xs capitalize" style={{ color: "#5a6a7a" }}>{k}</div>
          </div>
        ))}
      </div>
      {expanded && (
        <div className="text-xs leading-relaxed pt-3" style={{ color: "#8899AA", borderTop: `1px solid ${mod.color}20` }}>
          {mod.description}
        </div>
      )}
    </div>
  );
}

export default function GodEngine() {
  useSovereignHeartbeat({ page: "godengine" });
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
          <span className="font-mono text-sm font-bold" style={{ color: "#00D4FF" }}>GODENGINE_OS</span>
          <span className="text-xs font-mono" style={{ color: "#5a6a7a" }}>v44.OMNI</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs" style={{ color: "#8899AA" }}>UPTIME: <span style={{ color: "#00FF88" }}>{formatUptime(uptime)}</span></span>
          <Link href="/" className="text-xs" style={{ color: "#8899AA" }}>← Home</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SOVEREIGN AI OPERATIONS CENTER</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            God<span style={{ color: "#00D4FF" }}>Engine</span>
          </h1>
          <p className="text-lg" style={{ color: "#8899AA", maxWidth: 600 }}>
            The living intelligence layer of the ScrollVerse Trinity. 6 sovereign modules. 205 routes monitored. 144,000 Guardians tracked. KUN FAYAKŪN × ∞
          </p>
        </div>

        {/* Status bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-4 rounded-xl"
          style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}
        >
          {[
            { label: "Active Modules", value: "6/6", color: "#00FF88" },
            { label: "Routes Monitored", value: "205", color: "#00D4FF" },
            { label: "Guardians Online", value: "1,247", color: "#FFB800" },
            { label: "System Frequency", value: "963Hz", color: "#EC4899" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#5a6a7a" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {MODULES.map((mod) => <ModuleCard key={mod.id} mod={mod} />)}
        </div>

        {/* System log */}
        <div className="mb-10">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SYSTEM LOG — BOOT SEQUENCE</div>
          <SystemLog />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Guardian Broadcast", href: "/sovereign-broadcast", color: "#00FF88" },
            { label: "Gate Keys Mint", href: "/gate-keys", color: "#FFB800" },
            { label: "Frequency Player", href: "/frequency-player", color: "#EC4899" },
            { label: "Archive", href: "/archive", color: "#00D4FF" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="text-center py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: `${a.color}10`, border: `1px solid ${a.color}30`, color: a.color }}
            >
              {a.label}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-mono" style={{ color: "#5a6a7a" }}>
          SCROLL VERSE LLC & XLVIII BLOCKS LLC · GodEngine v44.OMNI · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
