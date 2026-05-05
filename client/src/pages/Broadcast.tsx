/**
 * UNIVERSAL BROADCAST CENTER
 * Dispatch sovereign messages to 144,000 Guardians across all channels
 * Email · Telegram · WhatsApp · Wallet · Legion Network
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const CHANNELS = [
  { id: "email", label: "Email", icon: "📧", color: "#00D4FF", description: "Mailchimp broadcast to all subscribers" },
  { id: "telegram", label: "Telegram", icon: "✈️", color: "#00B4D8", description: "Telegram channel announcement" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", color: "#25D366", description: "WhatsApp broadcast list" },
  { id: "legion", label: "Legion Network", icon: "🛡️", color: "#FFB800", description: "Post to all Legion channels" },
  { id: "wallet", label: "Wallet Push", icon: "💎", color: "#9B59B6", description: "On-chain notification to Guardian wallets" },
  { id: "all", label: "ALL CHANNELS", icon: "⚡", color: "#FF6B35", description: "Simultaneous broadcast across all channels" },
];

const FREQUENCIES = ["528Hz", "963Hz", "432Hz", "1558Hz", "44:Omni"];

export default function Broadcast() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["legion"]);
  const [frequency, setFrequency] = useState("528Hz");
  const [broadcastResult, setBroadcastResult] = useState<{ success: boolean; recipientCount: number; deliveryRate: number; message: string } | null>(null);

  const { data: stats } = trpc.broadcast.getStats.useQuery();
  const { data: history } = trpc.broadcast.getHistory.useQuery();

  const broadcastMutation = trpc.broadcast.sendBroadcast.useMutation({
    onSuccess: (data) => setBroadcastResult(data as typeof broadcastResult),
  });

  const toggleChannel = (id: string) => {
    if (id === "all") {
      setSelectedChannels(["all"]);
      return;
    }
    setSelectedChannels(prev => {
      const without = prev.filter(c => c !== "all");
      return without.includes(id) ? without.filter(c => c !== id) : [...without, id];
    });
  };

  const handleSend = () => {
    if (!title || !message) return;
    const channels = selectedChannels.includes("all")
      ? ["email", "telegram", "whatsapp", "legion", "wallet"]
      : selectedChannels;
    broadcastMutation.mutate({ title, message, channel: selectedChannels.includes("all") ? "all" : selectedChannels[0] as "email" | "telegram" | "whatsapp" | "wallet" | "all", frequency, sentBy: "Chais The Great" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,107,53,0.2)", background: "rgba(255,107,53,0.03)" }}>
        <div className="container py-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FF6B35" }}>UNIVERSAL BROADCAST CENTER</div>
          <h1 className="text-4xl font-black text-white mb-2">Sovereign Dispatch</h1>
          <p className="text-lg" style={{ color: "#8899AA" }}>
            Reach all 144,000 Guardians simultaneously across every channel.
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Broadcasts", value: stats?.totalBroadcasts ?? 0, color: "#00D4FF", icon: "📡" },
            { label: "Total Reached", value: stats?.totalReached ?? 0, color: "#00FF88", icon: "👥" },
            { label: "Channels Active", value: 5, color: "#FFB800", icon: "⚡" },
            { label: "Total Reached", value: stats?.totalReached ?? 0, color: "#FF6B35", icon: "🔥" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value.toLocaleString()}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Compose Broadcast */}
          <div className="lg:col-span-2">
            {broadcastResult ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.05)", border: "2px solid rgba(0,255,136,0.3)" }}>
                <div className="text-5xl mb-4">📡</div>
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>BROADCAST SENT</div>
                <h2 className="text-2xl font-black text-white mb-4">Message Dispatched to the Empire</h2>
                <div className="space-y-3 text-left mb-6 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Recipients Reached</span>
                    <span className="font-bold" style={{ color: "#00FF88" }}>{broadcastResult.recipientCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Delivery Rate</span>
                    <span className="font-bold text-white">{broadcastResult.deliveryRate}%</span>
                  </div>
                </div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{broadcastResult.message}</p>
                <button
                  onClick={() => { setBroadcastResult(null); setTitle(""); setMessage(""); }}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)" }}
                >
                  Send Another Broadcast
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,107,53,0.2)" }}>
                <h2 className="text-xl font-bold text-white mb-6">Compose Sovereign Message</h2>

                {/* Channel Selection */}
                <div className="mb-5">
                  <label className="text-xs font-mono tracking-widest mb-3 block" style={{ color: "#8899AA" }}>SELECT CHANNELS</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CHANNELS.map(ch => {
                      const isSelected = selectedChannels.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          onClick={() => toggleChannel(ch.id)}
                          className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                          style={{
                            background: isSelected ? `${ch.color}15` : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isSelected ? ch.color + "60" : "rgba(255,255,255,0.08)"}`,
                          }}
                        >
                          <span className="text-lg">{ch.icon}</span>
                          <div>
                            <div className="text-xs font-bold" style={{ color: isSelected ? ch.color : "white" }}>{ch.label}</div>
                            <div className="text-xs" style={{ color: "#8899AA" }}>{ch.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency */}
                <div className="mb-4">
                  <label className="text-xs font-mono tracking-widest mb-2 block" style={{ color: "#8899AA" }}>FREQUENCY ALIGNMENT</label>
                  <div className="flex gap-2 flex-wrap">
                    {FREQUENCIES.map(f => (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono"
                        style={{
                          background: frequency === f ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${frequency === f ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                          color: frequency === f ? "#00D4FF" : "#8899AA",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="text-xs font-mono tracking-widest mb-2 block" style={{ color: "#8899AA" }}>BROADCAST TITLE</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Sovereign Decree: Kingdom Update"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,53,0.2)", color: "white" }}
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="text-xs font-mono tracking-widest mb-2 block" style={{ color: "#8899AA" }}>MESSAGE</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write your sovereign message to the 144,000 Guardians..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,53,0.2)", color: "white" }}
                  />
                  <div className="text-right text-xs mt-1" style={{ color: "#8899AA" }}>{message.length} characters</div>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!title || !message || selectedChannels.length === 0 || broadcastMutation.isPending}
                  className="w-full py-4 rounded-xl text-sm font-black text-white transition-all"
                  style={{
                    background: title && message ? "linear-gradient(135deg, #FF6B35, #FFB800)" : "rgba(255,255,255,0.1)",
                    opacity: broadcastMutation.isPending ? 0.7 : 1,
                  }}
                >
                  {broadcastMutation.isPending ? "Dispatching to Empire..." : `⚡ Send to ${selectedChannels.includes("all") ? "ALL CHANNELS" : selectedChannels.join(", ").toUpperCase()}`}
                </button>
              </div>
            )}
          </div>

          {/* Broadcast History */}
          <div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="text-lg font-bold text-white mb-4">Broadcast History</h3>
              {(history ?? []).length === 0 ? (
                <div className="text-center py-8" style={{ color: "#8899AA" }}>
                  <div className="text-2xl mb-2">📭</div>
                  <div className="text-sm">No broadcasts yet</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {(history ?? []).map((b: any) => (
                    <div key={b.id} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="font-bold text-white text-sm mb-1 truncate">{b.title}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: "#8899AA" }}>{b.channel}</span>
                        <span style={{ color: "#00FF88" }}>{b.recipientCount.toLocaleString()} reached</span>
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
                        {new Date(b.sentAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
