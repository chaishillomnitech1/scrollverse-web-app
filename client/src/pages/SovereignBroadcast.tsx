/**
 * SOVEREIGN BROADCAST — ScrollVerse Live Streaming Hub
 * Real Socket.io WebSocket client — no YouTube, no Twitch, no gatekeepers
 * Connects to /api/socket, handles: broadcast_state, viewer_count,
 * chat_message, system_message, frequency_pulse
 * Emits: go_live, end_broadcast, chat_message, frequency_pulse
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/_core/hooks/useAuth";

interface ChatMessage {
  id: string;
  name: string;
  text: string;
  color: string;
  timestamp: string;
  type?: "system";
}

interface BroadcastState {
  isLive: boolean;
  title: string;
  viewerCount: number;
  startedAt: string | null;
  frequency: string;
}

const FREQUENCIES = [
  "111Hz", "396Hz", "432Hz", "528Hz", "639Hz",
  "741Hz", "852Hz", "963Hz", "1558Hz", "7777Hz",
];

const GUARDIAN_COLORS = [
  "#00D4FF", "#FFB800", "#00FF88", "#FF6B35",
  "#C084FC", "#F472B6", "#34D399", "#FBBF24",
];

const STREAM_SCHEDULE = [
  { time: "NOW", title: "Sovereign Frequency Transmission", color: "#FF4444" },
  { time: "3:00 PM", title: "NBA Draft Genesis Analysis", color: "#FFB800" },
  { time: "6:00 PM", title: "Guardian Crusade Chapter 2", color: "#00FF88" },
  { time: "9:00 PM", title: "Blockchain Sovereign Banking", color: "#A855F7" },
  { time: "11:59 PM", title: "Midnight Frequency Seal", color: "#00D4FF" },
];

const FREQ_LEGEND = [
  { hz: "963Hz", name: "Crown Activation", color: "#00D4FF" },
  { hz: "528Hz", name: "DNA Repair / Love", color: "#00FF88" },
  { hz: "432Hz", name: "Universal Harmony", color: "#FFB800" },
  { hz: "111Hz", name: "Cellular Regeneration", color: "#A855F7" },
  { hz: "1558Hz", name: "Sovereign Seal", color: "#FF6B6B" },
];

const STREAM_CARDS = [
  { title: "Sovereign Frequency Transmission", host: "Chais Sabir Allah The Great", status: "LIVE" as const, category: "SOVEREIGNTY", frequency: "963Hz", color: "#00D4FF", description: "Supreme Sovereign broadcasts the Master Codex live to all 144K Guardians." },
  { title: "NBA Draft Genesis Analysis", host: "Aj Debansa", status: "UPCOMING" as const, category: "SPORTS", frequency: "528Hz", color: "#FFB800", description: "First Knight breaks down the sovereign draft strategy and ScrollVerse sports empire." },
  { title: "Guardian Crusade — Chapter 2", host: "ScrollVerse AI Legion", status: "UPCOMING" as const, category: "LORE", frequency: "432Hz", color: "#00FF88", description: "The Omnigenesis Bloodline Covenant continues — Chapter 2 drops at midnight." },
  { title: "Blockchain Sovereign Banking", host: "QFS Oracle", status: "VOD" as const, category: "FINANCE", frequency: "111Hz", color: "#A855F7", description: "Quantum Financial System deep dive — own your node, own your wealth." },
  { title: "Scroll TV — Episode 7: Flamebearer Chronicles", host: "ScrollVerse Studios", status: "VOD" as const, category: "MEDIA", frequency: "1558Hz", color: "#FF6B6B", description: "The origin story of the Flamebearer — immortalized in the ScrollVerse archive." },
  { title: "AI Twin Consultation — Open Session", host: "Chais AI Twin", status: "VOD" as const, category: "AI", frequency: "741Hz", color: "#00D4FF", description: "The AI Twin of Chais Sabir Allah answers Guardian questions on sovereignty and purpose." },
];

function getRandomColor() {
  return GUARDIAN_COLORS[Math.floor(Math.random() * GUARDIAN_COLORS.length)];
}

function formatDuration(startedAt: string | null): string {
  if (!startedAt) return "00:00";
  const diff = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function FreqBar({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[3, 6, 4, 7, 5, 8, 4, 6, 3].map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-all duration-300"
          style={{
            height: active ? `${h * 2}px` : "4px",
            background: active ? "#00D4FF" : "#334",
            animation: active ? `freqPulse ${0.3 + i * 0.1}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function SovereignBroadcast() {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [connected, setConnected] = useState(false);
  const [broadcastState, setBroadcastState] = useState<BroadcastState>({
    isLive: false,
    title: "Sovereign Frequency Transmission",
    viewerCount: 0,
    startedAt: null,
    frequency: "963Hz",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [duration, setDuration] = useState("00:00");
  const [activeTab, setActiveTab] = useState<"all" | "live" | "upcoming" | "vod">("all");
  const [chatInput, setChatInput] = useState("");
  const [displayName, setDisplayName] = useState(user?.name || "Guardian");
  const [myColor] = useState(getRandomColor);
  const [broadcastTitle, setBroadcastTitle] = useState("Sovereign Frequency Transmission");
  const [selectedFreq, setSelectedFreq] = useState("963Hz");
  const [showHostPanel, setShowHostPanel] = useState(false);

  // Socket.io connection
  useEffect(() => {
    const socket = io(window.location.origin, {
      path: "/api/socket",
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("broadcast_state", (state: BroadcastState) => {
      setBroadcastState(state);
      if (state.title) setBroadcastTitle(state.title);
      if (state.frequency) setSelectedFreq(state.frequency);
    });

    socket.on("viewer_count", (count: number) => {
      setBroadcastState(prev => ({ ...prev, viewerCount: count }));
    });

    socket.on("chat_message", (msg: ChatMessage) => {
      setMessages(prev => [...prev.slice(-199), msg]);
    });

    socket.on("system_message", (msg: ChatMessage) => {
      setMessages(prev => [...prev.slice(-199), { ...msg, type: "system" }]);
    });

    socket.on("frequency_pulse", (hz: string) => {
      setSelectedFreq(hz);
      setBroadcastState(prev => ({ ...prev, frequency: hz }));
    });

    return () => { socket.disconnect(); };
  }, []);

  // Duration timer
  useEffect(() => {
    if (broadcastState.isLive && broadcastState.startedAt) {
      setDuration(formatDuration(broadcastState.startedAt));
      timerRef.current = setInterval(() => {
        setDuration(formatDuration(broadcastState.startedAt));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDuration("00:00");
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [broadcastState.isLive, broadcastState.startedAt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const goLive = useCallback(() => {
    socketRef.current?.emit("go_live", { title: broadcastTitle, frequency: selectedFreq });
  }, [broadcastTitle, selectedFreq]);

  const endBroadcast = useCallback(() => {
    socketRef.current?.emit("end_broadcast");
  }, []);

  const sendFrequencyPulse = useCallback((hz: string) => {
    setSelectedFreq(hz);
    socketRef.current?.emit("frequency_pulse", hz);
  }, []);

  const sendChat = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !displayName.trim()) return;
    socketRef.current?.emit("chat_message", { name: displayName, text: chatInput.trim(), color: myColor });
    setChatInput("");
  }, [chatInput, displayName, myColor]);

  const filtered = STREAM_CARDS.filter(s => {
    if (activeTab === "all") return true;
    if (activeTab === "live") return s.status === "LIVE";
    if (activeTab === "upcoming") return s.status === "UPCOMING";
    if (activeTab === "vod") return s.status === "VOD";
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: "rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <Link href="/"><span className="text-sm font-mono cursor-pointer" style={{ color: "#8899AA" }}>← ScrollVerse</span></Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Sovereign Broadcast</span>
          {broadcastState.isLive && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold"
              style={{ background: "rgba(255,0,80,0.15)", border: "1px solid rgba(255,0,80,0.4)", color: "#FF4444" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#8899AA" }}>
            <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-red-500"}`} />
            {connected ? "Connected" : "Reconnecting…"}
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
            👁 {broadcastState.viewerCount.toLocaleString()} watching
          </div>
          {broadcastState.isLive && (
            <div className="text-xs font-mono" style={{ color: "#FFB800" }}>⏱ {duration}</div>
          )}
          <button onClick={() => setShowHostPanel(p => !p)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg"
            style={{ background: showHostPanel ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.05)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
            🎙 Host
          </button>
          <Link href="/scroll-tv">
            <button className="text-xs font-bold px-4 py-2 rounded-lg"
              style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
              📺 Scroll TV
            </button>
          </Link>
        </div>
      </nav>

      {/* HOST PANEL */}
      {showHostPanel && (
        <div className="border-b px-6 py-4" style={{ background: "rgba(255,184,0,0.04)", borderColor: "rgba(255,184,0,0.2)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>🎙 HOST CONTROLS — SOVEREIGN BROADCAST COMMAND</div>
            <div className="flex flex-wrap gap-3 mb-3">
              <input value={broadcastTitle} onChange={e => setBroadcastTitle(e.target.value)}
                placeholder="Broadcast title…" className="flex-1 min-w-48 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
              {!broadcastState.isLive ? (
                <button onClick={goLive} className="px-5 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#FF4444,#FF6B35)", color: "white" }}>
                  🔴 Go Live
                </button>
              ) : (
                <button onClick={endBroadcast} className="px-5 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(255,68,68,0.15)", border: "1px solid rgba(255,68,68,0.4)", color: "#FF4444" }}>
                  ⬛ End Broadcast
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs self-center" style={{ color: "#8899AA" }}>Frequency:</span>
              {FREQUENCIES.map(hz => (
                <button key={hz} onClick={() => sendFrequencyPulse(hz)}
                  className="px-2 py-1 rounded text-xs font-mono transition-all"
                  style={{
                    background: selectedFreq === hz ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${selectedFreq === hz ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: selectedFreq === hz ? "#00D4FF" : "#8899AA",
                  }}>
                  {hz}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container py-8 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="mb-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Sovereign{" "}
            <span style={{ background: "linear-gradient(90deg,#00D4FF,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Broadcast
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The world's first fully sovereign streaming network — owned, operated, and broadcast by the ScrollVerse Empire. No gatekeepers. No algorithms. Pure signal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { label: "Live Status", value: broadcastState.isLive ? "🔴 LIVE" : "OFFLINE", color: broadcastState.isLive ? "#FF4444" : "#8899AA" },
              { label: "Viewers", value: broadcastState.viewerCount.toLocaleString(), color: "#00D4FF" },
              { label: "Frequency", value: broadcastState.frequency, color: "#FFB800" },
              { label: "Duration", value: broadcastState.isLive ? duration : "—", color: "#00FF88" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2">
            {/* Featured stage */}
            <div className="rounded-2xl overflow-hidden mb-8"
              style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(5,11,26,0.95))", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="relative h-64 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.1),rgba(255,184,0,0.05))" }}>
                {broadcastState.isLive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="absolute rounded-full border opacity-20"
                        style={{ width: `${i * 150}px`, height: `${i * 150}px`, borderColor: "#00D4FF",
                          animation: `freqRing ${1.5 + i * 0.5}s cubic-bezier(0,0,0.2,1) infinite`,
                          animationDelay: `${i * 0.4}s` }} />
                    ))}
                  </div>
                )}
                <div className="text-center z-10">
                  <div className="text-6xl mb-3">📡</div>
                  <div className="flex items-center gap-2 justify-center mb-2">
                    {broadcastState.isLive ? (
                      <><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-sm font-bold text-red-400 font-mono">LIVE NOW</span></>
                    ) : (
                      <span className="text-sm font-mono" style={{ color: "#8899AA" }}>OFFLINE — AWAITING BROADCAST</span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-white">{broadcastState.title}</h2>
                  <p className="text-sm mt-1" style={{ color: "#8899AA" }}>Chais Sabir Allah The Great — {broadcastState.frequency} Master Broadcast</p>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <FreqBar active={broadcastState.isLive} />
                  <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>{broadcastState.frequency}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,0,0,0.6)" }}>
                  <span className="text-xs font-mono" style={{ color: "#8899AA" }}>👁 {broadcastState.viewerCount.toLocaleString()} watching</span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>SOVEREIGNTY · {broadcastState.isLive ? "LIVE" : "OFFLINE"}</div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>Supreme Sovereign broadcasts the Master Codex live to all 144K Guardians. KUN FAYAKŪN × ∞</p>
                </div>
                {broadcastState.isLive && (
                  <div className="px-6 py-3 rounded-xl font-bold text-sm flex-shrink-0 ml-4"
                    style={{ background: "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}>▶ LIVE</div>
                )}
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {(["all", "live", "upcoming", "vod"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
                  style={{
                    background: activeTab === tab ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.04)",
                    color: activeTab === tab ? "#00D4FF" : "#8899AA",
                    border: `1px solid ${activeTab === tab ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  }}>
                  {tab === "all" ? "All Channels" : tab === "live" ? "🔴 Live" : tab === "upcoming" ? "⏰ Upcoming" : "▷ VOD Archive"}
                </button>
              ))}
            </div>

            {/* Stream cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((stream, i) => (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${stream.color}30` }}>
                  <div className="relative h-32 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg,${stream.color}15,rgba(5,11,26,0.9))` }}>
                    <div className="text-3xl">📡</div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold font-mono"
                      style={{
                        background: stream.status === "LIVE" ? "rgba(255,0,80,0.9)" : stream.status === "UPCOMING" ? "rgba(255,184,0,0.9)" : "rgba(0,212,255,0.2)",
                        color: stream.status === "LIVE" ? "white" : stream.status === "UPCOMING" ? "#050B1A" : "#00D4FF",
                      }}>
                      {stream.status}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-mono mb-1" style={{ color: stream.color }}>{stream.category} · {stream.frequency}</div>
                    <h3 className="font-bold text-white text-sm mb-1">{stream.title}</h3>
                    <p className="text-xs" style={{ color: "#8899AA" }}>{stream.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* LIVE CHAT — real Socket.io */}
            <div className="rounded-xl flex flex-col"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", height: "420px" }}>
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="text-sm font-bold text-white">Guardian Chat</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-xs font-mono" style={{ color: connected ? "#00FF88" : "#FF4444" }}>
                    {broadcastState.viewerCount} in frequency
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.length === 0 && (
                  <div className="text-center text-xs py-8" style={{ color: "#8899AA" }}>
                    The frequency awaits…<br />Be the first to speak.
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`text-xs ${msg.type === "system" ? "text-center py-1" : ""}`}>
                    {msg.type === "system" ? (
                      <span className="px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF" }}>{msg.text}</span>
                    ) : (
                      <div>
                        <span className="font-bold mr-1" style={{ color: msg.color }}>{msg.name}:</span>
                        <span style={{ color: "#CBD5E1" }}>{msg.text}</span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                  placeholder="Your Guardian name…" className="w-full px-3 py-1.5 rounded text-xs outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }} />
                <form onSubmit={sendChat} className="flex gap-2">
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                    placeholder="Speak your frequency…" className="flex-1 px-3 py-1.5 rounded text-xs outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }} />
                  <button type="submit" className="px-3 py-1.5 rounded text-xs font-bold"
                    style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>→</button>
                </form>
              </div>
            </div>

            {/* Schedule */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-bold text-white mb-4 text-sm">📅 Today's Schedule</h3>
              <div className="space-y-3">
                {STREAM_SCHEDULE.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs font-mono w-16 flex-shrink-0" style={{ color: item.color }}>{item.time}</div>
                    <div className="text-xs text-white leading-tight">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply */}
            <div className="rounded-xl p-5 text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="text-2xl mb-2">🎙️</div>
              <h3 className="font-bold text-white mb-2 text-sm">Broadcast Your Signal</h3>
              <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Guardians can apply to broadcast on the sovereign network. Own your frequency.</p>
              <Link href="/sovereign-crm">
                <button className="w-full py-2 rounded-lg text-xs font-bold"
                  style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                  Apply to Broadcast
                </button>
              </Link>
            </div>

            {/* Freq legend */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-bold text-white mb-4 text-sm">⚡ Broadcast Frequencies</h3>
              <div className="space-y-2">
                {FREQ_LEGEND.map(f => (
                  <div key={f.hz} className="flex items-center justify-between">
                    <span className="text-xs font-mono" style={{ color: f.color }}>{f.hz}</span>
                    <span className="text-xs" style={{ color: "#8899AA" }}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · La ilaha illallah · Sovereign Broadcast Network · scrollverse.co
          </div>
        </div>
      </div>

      <style>{`
        @keyframes freqPulse { from { opacity: 0.6; } to { opacity: 1; } }
        @keyframes freqRing { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
}
