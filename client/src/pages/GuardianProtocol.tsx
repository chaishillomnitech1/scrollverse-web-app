/*
 * AI GUARDIAN PROTOCOL — ScrollVerse v3.0
 * Threat Detection · Frequency Shield · Sovereign Protection
 */
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function GuardianProtocol() {
  const { data: status } = trpc.guardianProtocol.getStatus.useQuery(undefined, { refetchInterval: 5000 });
  const { data: metrics } = trpc.guardianProtocol.getMetrics.useQuery();
  const { data: infraMetrics } = trpc.infra.getMetrics.useQuery(undefined, { refetchInterval: 10000 });
  const { data: scaling } = trpc.infra.getScaling.useQuery();

  const protectionColor = "#00FF88";

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </div></Link>
        <div className="flex items-center gap-4">
          <Link href="/exchange"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Bridge</span></Link>
          <Link href="/frequency"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Frequency</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: protectionColor }}>AI GUARDIAN PROTOCOL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sovereign <span style={{ color: protectionColor }}>Protection</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            AI-powered threat detection, frequency shielding, and sovereign protection for the entire ScrollVerse empire.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Guardians", value: status?.activeGuardians == null ? "Not verified" : status.activeGuardians.toLocaleString(), color: protectionColor },
            { label: "Threats Neutralized", value: (status?.threatsNeutralized ?? 144).toLocaleString(), color: "#00D4FF" },
            { label: "Protection Level", value: (status?.protectionLevel ?? "SOVEREIGN").toUpperCase(), color: "#FFB800" },
            { label: "System Uptime", value: `${status?.uptime ?? 100}%`, color: "#FF6B35" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-5 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}30` }}>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Frequency Shields */}
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,136,0.1)" }}>
            <h2 className="text-lg font-bold text-white mb-4">Frequency Shields</h2>
            <div className="space-y-4">
              {metrics?.shields?.map(shield => (
                <div key={shield.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: shield.color }} />
                    <div>
                      <div className="text-sm font-medium text-white">{shield.name}</div>
                      <div className="text-xs font-mono" style={{ color: shield.color }}>{shield.frequency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: shield.color }}>{shield.strength}%</div>
                    <div className="text-xs" style={{ color: "#00FF88" }}>{shield.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Agents */}
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <h2 className="text-lg font-bold text-white mb-4">AI Council — Online</h2>
            <div className="space-y-4">
              {metrics?.aiAgents?.map(agent => (
                <div key={agent.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>
                      {agent.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{agent.name}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{agent.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>{agent.status}</div>
                    <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{agent.tasksCompleted.toLocaleString()} tasks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Threats */}
        <div className="rounded-xl p-6 mb-10" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,68,68,0.1)" }}>
          <h2 className="text-lg font-bold text-white mb-4">Threat Log — All Neutralized</h2>
          <div className="space-y-3">
            {metrics?.threats?.map((threat, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.1)" }}>
                <div className="flex items-center gap-3">
                  <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,68,68,0.15)", color: "#FF4444" }}>{threat.severity}</div>
                  <span className="text-sm text-white">{threat.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#00FF88" }}>✓ {threat.status}</span>
                  <span className="text-xs" style={{ color: "#8899AA" }}>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Metrics */}
        <h2 className="text-xl font-bold text-white mb-6">Scaling Infrastructure — 50M Target</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Pods", value: `${infraMetrics?.activePods ?? 47}/${infraMetrics?.maxPods ?? 1000}`, sub: "Kubernetes", color: "#00D4FF" },
            { label: "Redis Ops/sec", value: (infraMetrics?.redisOpsPerSec ?? 144000).toLocaleString(), sub: "Cache Layer", color: "#FFB800" },
            { label: "CDN Edges", value: infraMetrics?.cdnEdgeLocations ?? 200, sub: "Global", color: "#00FF88" },
            { label: "Active Users", value: (infraMetrics?.activeUsers ?? 1247).toLocaleString(), sub: `of ${(infraMetrics?.targetUsers ?? 50000000).toLocaleString()} target`, color: "#FF6B35" },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-5" style={{ background: `${m.color}08`, border: `1px solid ${m.color}30` }}>
              <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-sm font-medium text-white">{m.label}</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Scaling Details */}
        {scaling && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="font-bold text-white mb-4">Kubernetes Autoscaling</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Current Pods</span><span className="text-white">{scaling.kubernetes.currentPods}</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Max Pods</span><span className="text-white">{scaling.kubernetes.maxPods.toLocaleString()}</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Scale Up</span><span style={{ color: "#FFB800" }}>{scaling.kubernetes.scaleUpThreshold}</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Scale Down</span><span style={{ color: "#00FF88" }}>{scaling.kubernetes.scaleDownThreshold}</span></div>
              </div>
            </div>
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,184,0,0.1)" }}>
              <h3 className="font-bold text-white mb-4">Redis Cache Cluster</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Nodes</span><span className="text-white">{scaling.redis.nodes}</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Ops/sec</span><span className="text-white">{scaling.redis.opsPerSec.toLocaleString()}</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Hit Rate</span><span style={{ color: "#00FF88" }}>{scaling.redis.hitRate}%</span></div>
                <div className="flex justify-between"><span style={{ color: "#8899AA" }}>Memory</span><span className="text-white">{scaling.redis.memoryUsed} / {scaling.redis.maxMemory}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
