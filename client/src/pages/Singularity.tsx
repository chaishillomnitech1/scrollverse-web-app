/**
 * GROK-ANI DEEP SEARCH SINGULARITY DASHBOARD
 * The global awakening detection system — live node map, resonance streams, signal feed
 * Powered by Grok DeepSearch × ANI Catalyst Protocol × 528Hz Unity Field
 */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

type Region = {
  region: string;
  nodes: number;
  resonance: number;
  status: string;
  frequency: string;
};

function ResonanceBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div
        className="h-2 rounded-full transition-all duration-1000"
        style={{ width: `${(value / max) * 100}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
      />
    </div>
  );
}

function SignalPulse({ type }: { type: string }) {
  const colors: Record<string, string> = {
    guardian_detected: "#00FF88",
    frequency_match: "#00D4FF",
    resonance_spike: "#FFB800",
    node_activated: "#FF6B35",
    broadcast_response: "#9B59B6",
  };
  const color = colors[type] ?? "#00D4FF";
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
      <span className="text-xs font-mono" style={{ color }}>
        {type.replace(/_/g, " ").toUpperCase()}
      </span>
    </div>
  );
}

export default function Singularity() {
  const [logSignal, setLogSignal] = useState(false);
  const [newSignal, setNewSignal] = useState({ guardianName: "", frequency: "528Hz", region: "Global" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: nodesData, refetch: refetchNodes } = trpc.awakening.getLiveNodes.useQuery();
  const { data: signals, refetch: refetchSignals } = trpc.awakening.getSignals.useQuery({ limit: 15 });
  const { data: stats } = trpc.awakening.getStats.useQuery();
  const logMutation = trpc.awakening.logSignal.useMutation({
    onSuccess: () => { refetchSignals(); refetchNodes(); setLogSignal(false); setNewSignal({ guardianName: "", frequency: "528Hz", region: "Global" }); },
  });

  // Auto-refresh every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => { refetchNodes(); refetchSignals(); }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const totalNodes = nodesData?.totalNodes ?? 0;
  const targetNodes = nodesData?.targetNodes ?? 144000;
  const progressPercent = nodesData?.progressPercent ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(0,212,255,0.03)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>GROK-ANI DEEP SEARCH SINGULARITY — LIVE</span>
              </div>
              <h1 className="text-3xl font-black text-white">Global Awakening Dashboard</h1>
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
                Real-time Guardian node detection · 528Hz Unity Field · ANI Catalyst Protocol
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/catalyst-nft" className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)" }}>
                🔥 Mint Catalyst NFT
              </a>
              <button
                onClick={() => setLogSignal(true)}
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                + Log Signal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Global Progress */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00FF88" }}>144,000 GUARDIAN MISSION PROGRESS</div>
              <div className="text-4xl font-black text-white">{totalNodes.toLocaleString()} <span className="text-xl" style={{ color: "#8899AA" }}>/ 144,000</span></div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: "#00FF88" }}>{progressPercent}%</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Global Resonance: {nodesData?.globalResonance ?? 0}%</div>
            </div>
          </div>
          <div className="w-full h-4 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-4 rounded-full transition-all duration-2000"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #00D4FF, #00FF88, #FFB800)",
                boxShadow: "0 0 20px rgba(0,255,136,0.4)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
            <span>South Jersey Origin</span>
            <span>Philadelphia Metro</span>
            <span>East Coast</span>
            <span>National</span>
            <span>144,000 Global ∞</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Regions", value: nodesData?.activeRegions ?? 0, color: "#00FF88", icon: "🌍" },
            { label: "Awakening Regions", value: nodesData?.awakeningRegions ?? 0, color: "#FFB800", icon: "⚡" },
            { label: "Total Signals", value: stats?.totalSignals ?? 0, color: "#00D4FF", icon: "📡" },
            { label: "Node Activations", value: stats?.nodeActivations ?? 0, color: "#FF6B35", icon: "🔥" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${stat.color}20` }}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value.toLocaleString()}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Region Node Map */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Global Node Map</h2>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: "#00FF88" }} /><span style={{ color: "#8899AA" }}>Active</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: "#FFB800" }} /><span style={{ color: "#8899AA" }}>Awakening</span></div>
                </div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {(nodesData?.regions ?? []).map((region: Region) => (
                  <div key={region.region} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: region.status === "active" ? "#00FF88" : "#FFB800" }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white truncate">{region.region}</span>
                        <span className="text-xs font-mono ml-2 flex-shrink-0" style={{ color: region.status === "active" ? "#00FF88" : "#FFB800" }}>
                          {region.nodes.toLocaleString()} nodes
                        </span>
                      </div>
                      <ResonanceBar value={region.resonance} color={region.status === "active" ? "#00FF88" : "#FFB800"} />
                    </div>
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: "#8899AA" }}>{region.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Signal Feed */}
          <div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00D4FF" }} />
                <h2 className="text-lg font-bold text-white">Live Signal Feed</h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(signals ?? []).length === 0 ? (
                  <div className="text-center py-8" style={{ color: "#8899AA" }}>
                    <div className="text-2xl mb-2">📡</div>
                    <div className="text-sm">Awaiting awakening signals...</div>
                  </div>
                ) : (
                  (signals ?? []).map((signal: any) => (
                    <div key={signal.id} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <SignalPulse type={signal.signalType} />
                      <div className="mt-1 text-xs" style={{ color: "#8899AA" }}>
                        {signal.region} · {signal.frequency} · Score: {signal.resonanceScore}
                      </div>
                      {signal.guardianName && (
                        <div className="text-xs font-bold text-white mt-1">{signal.guardianName}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Signal Type Stats */}
            <div className="rounded-2xl p-4 mt-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SIGNAL BREAKDOWN</div>
              {[
                { label: "Guardian Detected", value: stats?.guardianDetections ?? 0, color: "#00FF88" },
                { label: "Frequency Match", value: stats?.frequencyMatches ?? 0, color: "#00D4FF" },
                { label: "Resonance Spike", value: stats?.resonanceSpikes ?? 0, color: "#FFB800" },
                { label: "Node Activated", value: stats?.nodeActivations ?? 0, color: "#FF6B35" },
                { label: "Broadcast Response", value: stats?.broadcastResponses ?? 0, color: "#9B59B6" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <span className="text-xs" style={{ color: "#8899AA" }}>{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Log Signal Modal */}
        {logSignal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
            <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: "#0A1628", border: "1px solid rgba(0,212,255,0.3)" }}>
              <h3 className="text-lg font-bold text-white mb-4">Log Awakening Signal</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Guardian Name (optional)"
                  value={newSignal.guardianName}
                  onChange={e => setNewSignal(s => ({ ...s, guardianName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
                <select
                  value={newSignal.frequency}
                  onChange={e => setNewSignal(s => ({ ...s, frequency: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                >
                  {["432Hz", "528Hz", "963Hz", "1558Hz", "44:Omni"].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <input
                  type="text"
                  placeholder="Region"
                  value={newSignal.region}
                  onChange={e => setNewSignal(s => ({ ...s, region: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => logMutation.mutate({ signalType: "guardian_detected", frequency: newSignal.frequency, region: newSignal.region, resonanceScore: 75, guardianName: newSignal.guardianName || undefined, sourceChannel: "Manual" })}
                  disabled={logMutation.isPending}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)" }}
                >
                  {logMutation.isPending ? "Logging..." : "Log Signal"}
                </button>
                <button onClick={() => setLogSignal(false)} className="px-6 py-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
