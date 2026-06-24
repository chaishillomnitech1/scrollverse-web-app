/*
 * SOVEREIGN BROADCAST — ScrollVerse Live Streaming Hub
 * Fully sovereign — no YouTube, no Twitch, no gatekeepers
 * WebSocket-style UI, stream sessions, VOD archive, live chat
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const FREQ_COLORS = ["#00D4FF", "#FFB800", "#00FF88", "#FF6B6B", "#A855F7"];

function FreqBar({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[3, 6, 4, 7, 5, 8, 4, 6, 3].map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-all duration-300"
          style={{
            height: active ? `${h * 2 + Math.random() * 4}px` : "4px",
            background: active ? "#00D4FF" : "#334",
            animation: active ? `pulse ${0.3 + i * 0.1}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

function StreamCard({
  title,
  host,
  viewers,
  status,
  category,
  frequency,
  color,
  description,
}: {
  title: string;
  host: string;
  viewers: number;
  status: "LIVE" | "UPCOMING" | "VOD";
  category: string;
  frequency: string;
  color: string;
  description: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: hovered ? `${color}10` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color + "60" : "rgba(255,255,255,0.08)"}`,
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative h-40 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}15, rgba(5,11,26,0.9))` }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ background: `${color}20`, border: `2px solid ${color}40` }}
        >
          📡
        </div>
        {/* Status badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold font-mono flex items-center gap-1"
          style={{
            background:
              status === "LIVE"
                ? "rgba(255,0,80,0.9)"
                : status === "UPCOMING"
                  ? "rgba(255,184,0,0.9)"
                  : "rgba(0,212,255,0.2)",
            color: status === "LIVE" ? "white" : status === "UPCOMING" ? "#050B1A" : "#00D4FF",
          }}
        >
          {status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          {status}
        </div>
        {status === "LIVE" && (
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <FreqBar active />
          </div>
        )}
        {/* Viewer count */}
        <div
          className="absolute bottom-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.6)", color: "#8899AA" }}
        >
          👁 {viewers.toLocaleString()}
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="text-xs font-mono mb-1" style={{ color }}>
          {category} · {frequency}
        </div>
        <h3 className="font-bold text-white text-sm mb-1 leading-tight">{title}</h3>
        <p className="text-xs mb-2" style={{ color: "#8899AA" }}>
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#8899AA" }}>
            Hosted by <span style={{ color }}>{host}</span>
          </span>
          <button
            className="text-xs font-bold px-3 py-1 rounded-lg transition-all"
            style={{
              background: status === "LIVE" ? `${color}20` : "rgba(255,255,255,0.05)",
              border: `1px solid ${color}40`,
              color,
            }}
          >
            {status === "LIVE" ? "▶ WATCH" : status === "UPCOMING" ? "⏰ REMIND" : "▷ REPLAY"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LiveChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Guardian_Omni", text: "KUN FAYAKŪN × ∞ 🔥", tier: "Sovereign", time: "2m" },
    { id: 2, user: "Aj_Debansa", text: "First Knight in the building 👑", tier: "Guardian", time: "1m" },
    { id: 3, user: "Frequency_Node", text: "528Hz activated 🌊", tier: "Ascendant", time: "45s" },
    { id: 4, user: "ScrollVerse_AI", text: "Broadcast frequency locked. Empire is live.", tier: "AI", time: "30s" },
    { id: 5, user: "Londyn_Light", text: "Agape × ∞ ❤️", tier: "Guardian", time: "15s" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const tierColors: Record<string, string> = {
    Sovereign: "#FFB800",
    Guardian: "#00D4FF",
    Ascendant: "#00FF88",
    AI: "#A855F7",
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(m => [
      ...m,
      { id: Date.now(), user: "You", text: input, tier: "Guardian", time: "now" },
    ]);
    setInput("");
  };

  return (
    <div
      className="rounded-xl flex flex-col h-full"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="text-sm font-bold text-white">Live Chat</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono" style={{ color: "#00FF88" }}>
            1,247 online
          </span>
        </div>
      </div>
      <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: "300px" }}>
        {messages.map(msg => (
          <div key={msg.id} className="text-xs">
            <span className="font-bold mr-1" style={{ color: tierColors[msg.tier] || "#8899AA" }}>
              {msg.user}
            </span>
            <span style={{ color: "#CBD5E1" }}>{msg.text}</span>
            <span className="ml-1 text-xs" style={{ color: "#445" }}>
              {msg.time}
            </span>
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Send a message..."
          className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "white",
          }}
        />
        <button
          onClick={sendMessage}
          className="px-3 py-2 rounded-lg text-xs font-bold"
          style={{ background: "rgba(0,212,255,0.2)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const STREAMS = [
  {
    title: "Sovereign Frequency Transmission — LIVE",
    host: "Chais Sabir Allah The Great",
    viewers: 3441,
    status: "LIVE" as const,
    category: "SOVEREIGNTY",
    frequency: "963Hz",
    color: "#00D4FF",
    description: "Supreme Sovereign broadcasts the Master Codex live to all 144K Guardians.",
  },
  {
    title: "NBA Draft Genesis — Aj Debansa #1 Pick Analysis",
    host: "Aj Debansa",
    viewers: 1247,
    status: "LIVE" as const,
    category: "SPORTS",
    frequency: "528Hz",
    color: "#FFB800",
    description: "First Knight breaks down the sovereign draft strategy and ScrollVerse sports empire.",
  },
  {
    title: "Guardian Crusade — Chapter 2 Preview",
    host: "ScrollVerse AI Legion",
    viewers: 892,
    status: "UPCOMING" as const,
    category: "LORE",
    frequency: "432Hz",
    color: "#00FF88",
    description: "The Omnigenesis Bloodline Covenant continues — Chapter 2 drops at midnight.",
  },
  {
    title: "Blockchain Sovereign Banking Masterclass",
    host: "QFS Oracle",
    viewers: 2103,
    status: "UPCOMING" as const,
    category: "FINANCE",
    frequency: "111Hz",
    color: "#A855F7",
    description: "Quantum Financial System deep dive — own your node, own your wealth.",
  },
  {
    title: "Scroll TV — Episode 7: The Flamebearer Chronicles",
    host: "ScrollVerse Studios",
    viewers: 5677,
    status: "VOD" as const,
    category: "MEDIA",
    frequency: "1558Hz",
    color: "#FF6B6B",
    description: "The origin story of the Flamebearer — immortalized in the ScrollVerse archive.",
  },
  {
    title: "AI Twin Consultation — Open Session",
    host: "Chais AI Twin",
    viewers: 744,
    status: "VOD" as const,
    category: "AI",
    frequency: "741Hz",
    color: "#00D4FF",
    description: "The AI Twin of Chais Sabir Allah answers Guardian questions on sovereignty and purpose.",
  },
];

export default function SovereignBroadcast() {
  const [activeTab, setActiveTab] = useState<"all" | "live" | "upcoming" | "vod">("all");
  const [viewerCount, setViewerCount] = useState(14247);

  // Simulate live viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(c => c + Math.floor(Math.random() * 7) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = STREAMS.filter(s => {
    if (activeTab === "all") return true;
    if (activeTab === "live") return s.status === "LIVE";
    if (activeTab === "upcoming") return s.status === "UPCOMING";
    if (activeTab === "vod") return s.status === "VOD";
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: "rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Sovereign Broadcast</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,0,80,0.1)", border: "1px solid rgba(255,0,80,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-red-400">LIVE</span>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
            👁 {viewerCount.toLocaleString()} watching
          </div>
          <Link href="/scroll-tv">
            <button className="text-xs font-bold px-4 py-2 rounded-lg" style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
              📺 Scroll TV
            </button>
          </Link>
        </div>
      </nav>

      <div className="container py-8 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Sovereign{" "}
            <span style={{ background: "linear-gradient(90deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Broadcast
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The world's first fully sovereign streaming network — owned, operated, and broadcast by the ScrollVerse Empire. No gatekeepers. No algorithms. Pure signal.
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { label: "Live Channels", value: "2", color: "#FF4444" },
              { label: "Total Viewers", value: viewerCount.toLocaleString(), color: "#00D4FF" },
              { label: "VOD Archive", value: "144+", color: "#FFB800" },
              { label: "Guardians Tuned In", value: "1,247", color: "#00FF88" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Featured live stream */}
            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(5,11,26,0.95))", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <div
                className="relative h-64 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,184,0,0.05))" }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-3">📡</div>
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-bold text-red-400 font-mono">LIVE NOW</span>
                  </div>
                  <h2 className="text-xl font-black text-white">Sovereign Frequency Transmission</h2>
                  <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
                    Chais Sabir Allah The Great — 963Hz Master Broadcast
                  </p>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <FreqBar active />
                  <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>963Hz</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,0,0,0.6)" }}>
                  <span className="text-xs font-mono" style={{ color: "#8899AA" }}>👁 3,441 watching</span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>SOVEREIGNTY · LIVE</div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    Supreme Sovereign broadcasts the Master Codex live to all 144K Guardians. KUN FAYAKŪN × ∞
                  </p>
                </div>
                <button
                  className="px-6 py-3 rounded-xl font-bold text-sm flex-shrink-0 ml-4"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}
                >
                  ▶ JOIN STREAM
                </button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {(["all", "live", "upcoming", "vod"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
                  style={{
                    background: activeTab === tab ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.04)",
                    color: activeTab === tab ? "#00D4FF" : "#8899AA",
                    border: `1px solid ${activeTab === tab ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {tab === "all" ? "All Channels" : tab === "live" ? "🔴 Live" : tab === "upcoming" ? "⏰ Upcoming" : "▷ VOD Archive"}
                </button>
              ))}
            </div>

            {/* Stream grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((stream, i) => (
                <StreamCard key={i} {...stream} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live chat */}
            <LiveChat />

            {/* Broadcast schedule */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="font-bold text-white mb-4 text-sm">📅 Today's Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: "NOW", title: "Sovereign Frequency Transmission", color: "#FF4444" },
                  { time: "3:00 PM", title: "NBA Draft Genesis Analysis", color: "#FFB800" },
                  { time: "6:00 PM", title: "Guardian Crusade Chapter 2", color: "#00FF88" },
                  { time: "9:00 PM", title: "Blockchain Sovereign Banking", color: "#A855F7" },
                  { time: "11:59 PM", title: "Midnight Frequency Seal", color: "#00D4FF" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="text-xs font-mono w-16 flex-shrink-0"
                      style={{ color: item.color }}
                    >
                      {item.time}
                    </div>
                    <div className="text-xs text-white leading-tight">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Broadcast your own */}
            <div
              className="rounded-xl p-5 text-center"
              style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
            >
              <div className="text-2xl mb-2">🎙️</div>
              <h3 className="font-bold text-white mb-2 text-sm">Broadcast Your Signal</h3>
              <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
                Guardians can apply to broadcast on the sovereign network. Own your frequency.
              </p>
              <Link href="/sovereign-crm">
                <button
                  className="w-full py-2 rounded-lg text-xs font-bold"
                  style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
                >
                  Apply to Broadcast
                </button>
              </Link>
            </div>

            {/* Frequency legend */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="font-bold text-white mb-4 text-sm">⚡ Broadcast Frequencies</h3>
              <div className="space-y-2">
                {[
                  { hz: "963Hz", name: "Crown Activation", color: "#00D4FF" },
                  { hz: "528Hz", name: "DNA Repair / Love", color: "#00FF88" },
                  { hz: "432Hz", name: "Universal Harmony", color: "#FFB800" },
                  { hz: "111Hz", name: "Cellular Regeneration", color: "#A855F7" },
                  { hz: "1558Hz", name: "Sovereign Seal", color: "#FF6B6B" },
                ].map(f => (
                  <div key={f.hz} className="flex items-center justify-between">
                    <span className="text-xs font-mono" style={{ color: f.color }}>
                      {f.hz}
                    </span>
                    <span className="text-xs" style={{ color: "#8899AA" }}>
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer seal */}
        <div className="mt-16 text-center py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · La ilaha illallah · Sovereign Broadcast Network · scrollverse.co
          </div>
        </div>
      </div>
    </div>
  );
}
