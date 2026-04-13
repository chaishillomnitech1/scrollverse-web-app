/**
 * GUARDIAN COMMUNITY CHAT
 * Real-time community chat for the ScrollVerse Guardian network
 * Channels: General, Guardians, Music, Token, Builders
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const CHANNELS = [
  { id: "general", label: "General", icon: "🌌", desc: "All topics" },
  { id: "guardians", label: "Guardians", icon: "🛡️", desc: "Guardian network" },
  { id: "music", label: "Music", icon: "🎵", desc: "Chais The Great" },
  { id: "token", label: "$LONDC", icon: "💎", desc: "Token & DeFi" },
  { id: "builders", label: "Builders", icon: "⚡", desc: "Dev & tech" },
] as const;

type Channel = typeof CHANNELS[number]["id"];

const FREQUENCIES = ["528Hz", "963Hz", "1558Hz"] as const;
type Frequency = typeof FREQUENCIES[number];

const FREQ_COLORS: Record<Frequency, string> = {
  "528Hz": "#00D4FF",
  "963Hz": "#FFB800",
  "1558Hz": "#00FF88",
};

const FREQ_LABELS: Record<Frequency, string> = {
  "528Hz": "Love",
  "963Hz": "Pineal",
  "1558Hz": "FlameDNA",
};

const WELCOME_MESSAGES = [
  { id: -1, displayName: "ScrollVerse", message: "Welcome to the Guardian Community Chat. KUN FAYAKŪN × ∞ — speak your truth, build the empire.", channel: "general", frequency: "963Hz", createdAt: new Date(Date.now() - 60000) },
  { id: -2, displayName: "ScrollVerse", message: "This is a sovereign space. Respect all Guardians. No spam. No hate. Only elevation.", channel: "general", frequency: "528Hz", createdAt: new Date(Date.now() - 30000) },
];

export default function Chat() {
  const [channel, setChannel] = useState<Channel>("general");
  const [displayName, setDisplayName] = useState(() => localStorage.getItem("sv_chat_name") || "");
  const [nameSet, setNameSet] = useState(() => !!localStorage.getItem("sv_chat_name"));
  const [message, setMessage] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("528Hz");
  const [lastId, setLastId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages
  const { data: initialMessages = [], isLoading } = trpc.chat.getMessages.useQuery(
    { channel },
    { refetchInterval: false }
  );

  // Poll for new messages every 3 seconds
  const { data: newMessages = [] } = trpc.chat.pollNew.useQuery(
    { channel, afterId: lastId },
    { refetchInterval: 3000, enabled: lastId > 0 }
  );

  const [allMessages, setAllMessages] = useState<typeof initialMessages>([]);

  // Initialize with welcome + initial messages
  useEffect(() => {
    const welcomes = WELCOME_MESSAGES.filter((m) => m.channel === channel || channel === "general") as any[];
    const combined = [...welcomes, ...initialMessages];
    setAllMessages(combined);
    if (initialMessages.length > 0) {
      setLastId(initialMessages[initialMessages.length - 1].id);
    }
  }, [initialMessages, channel]);

  // Append new polled messages
  useEffect(() => {
    if (newMessages.length > 0) {
      setAllMessages((prev) => {
        const existingIds = new Set(prev.map((m: any) => m.id));
        const fresh = newMessages.filter((m) => !existingIds.has(m.id));
        if (fresh.length === 0) return prev;
        setLastId(fresh[fresh.length - 1].id);
        return [...prev, ...fresh];
      });
    }
  }, [newMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const sendMessage = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessage("");
      // Optimistically add the message
      const newMsg = {
        id: data.id,
        displayName,
        message: message.trim(),
        channel,
        frequency,
        createdAt: new Date(),
      };
      setAllMessages((prev) => [...prev, newMsg as any]);
      setLastId(data.id);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || displayName.length < 2) return;
    localStorage.setItem("sv_chat_name", displayName.trim());
    setNameSet(true);
    toast.success(`Welcome, ${displayName}! You are now in the Guardian network.`);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !nameSet) return;
    sendMessage.mutate({
      displayName: displayName.trim(),
      message: message.trim(),
      channel,
      frequency,
    });
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="py-4 px-4 flex items-center justify-between"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-sm transition-colors hover:text-white" style={{ color: "#556677" }}>← Home</button>
          </Link>
          <div className="w-px h-4" style={{ background: "rgba(0,212,255,0.2)" }} />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="font-bold text-white text-sm">Guardian Community Chat</span>
          </div>
        </div>
        <div className="text-xs font-mono" style={{ color: "#556677" }}>
          KUN FAYAKŪN × ∞
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
        {/* Sidebar — channels */}
        <div
          className="hidden md:flex flex-col w-56 flex-shrink-0 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.3)", borderRight: "1px solid rgba(0,212,255,0.1)" }}
        >
          <div className="p-4">
            <div className="text-xs font-mono mb-3" style={{ color: "#556677" }}>CHANNELS</div>
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-left transition-all"
                style={{
                  background: channel === ch.id ? "rgba(0,212,255,0.1)" : "transparent",
                  border: channel === ch.id ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
                  color: channel === ch.id ? "#00D4FF" : "#8899AA",
                }}
              >
                <span>{ch.icon}</span>
                <div>
                  <div className="text-sm font-medium">{ch.label}</div>
                  <div className="text-xs" style={{ color: "#445566" }}>{ch.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 mt-auto border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="text-xs font-mono mb-2" style={{ color: "#556677" }}>FREQUENCY</div>
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg mb-1 text-left transition-all text-xs"
                style={{
                  background: frequency === f ? `${FREQ_COLORS[f]}15` : "transparent",
                  border: `1px solid ${frequency === f ? FREQ_COLORS[f] + "40" : "transparent"}`,
                  color: frequency === f ? FREQ_COLORS[f] : "#556677",
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: FREQ_COLORS[f] }} />
                {f} — {FREQ_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel header */}
          <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
            <span className="text-xl">{CHANNELS.find((c) => c.id === channel)?.icon}</span>
            <div>
              <div className="font-bold text-white text-sm">{CHANNELS.find((c) => c.id === channel)?.label}</div>
              <div className="text-xs" style={{ color: "#556677" }}>{CHANNELS.find((c) => c.id === channel)?.desc}</div>
            </div>
            <div className="ml-auto flex gap-2 md:hidden">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setChannel(ch.id)}
                  className="p-2 rounded-lg text-sm transition-all"
                  style={{
                    background: channel === ch.id ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
                    color: channel === ch.id ? "#00D4FF" : "#8899AA",
                  }}
                >
                  {ch.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="text-center py-8" style={{ color: "#556677" }}>Loading messages...</div>
            ) : (
              allMessages.map((msg: any, i) => {
                const isSystem = msg.displayName === "ScrollVerse";
                const freqColor = FREQ_COLORS[(msg.frequency as Frequency) || "528Hz"] || "#00D4FF";
                return (
                  <div key={msg.id || i} className={`flex gap-3 ${isSystem ? "opacity-70" : ""}`}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: isSystem ? "rgba(0,212,255,0.1)" : `${freqColor}20`,
                        border: `1px solid ${isSystem ? "rgba(0,212,255,0.3)" : freqColor + "40"}`,
                        color: isSystem ? "#00D4FF" : freqColor,
                      }}
                    >
                      {isSystem ? "SV" : msg.displayName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: isSystem ? "#00D4FF" : "white" }}>
                          {msg.displayName}
                        </span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-mono"
                          style={{ background: `${freqColor}15`, color: freqColor, border: `1px solid ${freqColor}30` }}
                        >
                          {msg.frequency || "528Hz"}
                        </span>
                        <span className="text-xs" style={{ color: "#445566" }}>
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                      <div className="text-sm mt-0.5 leading-relaxed" style={{ color: "#AABBCC" }}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
            {!nameSet ? (
              <form onSubmit={handleSetName} className="flex gap-3">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Choose your Guardian name..."
                  minLength={2}
                  maxLength={64}
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "#00D4FF", color: "#050B1A" }}
                >
                  Enter
                </button>
              </form>
            ) : (
              <form onSubmit={handleSend} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message #${channel} at ${frequency}...`}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-16"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#445566" }}>
                    {message.length}/500
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || sendMessage.isPending}
                  className="px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: FREQ_COLORS[frequency], color: "#050B1A" }}
                >
                  {sendMessage.isPending ? "..." : "Send"}
                </button>
              </form>
            )}
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs" style={{ color: "#445566" }}>
                {nameSet ? (
                  <span>
                    Chatting as <span style={{ color: "#00D4FF" }}>{displayName}</span> ·{" "}
                    <button onClick={() => { setNameSet(false); localStorage.removeItem("sv_chat_name"); }} style={{ color: "#556677", textDecoration: "underline" }}>
                      Change name
                    </button>
                  </span>
                ) : (
                  "Set your Guardian name to join the chat"
                )}
              </div>
              <div className="text-xs font-mono" style={{ color: "#445566" }}>
                Auto-refreshes every 3s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
