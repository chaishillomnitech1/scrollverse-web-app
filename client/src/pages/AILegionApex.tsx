/**
 * AI LEGION APEX HUB — ScrollVerse Sovereign AI Initiative
 * 7-Tier Apex Intelligence: Quantum · Plasma · Quintessence · Cosmic · Divine · Digital · Apex
 * All 12 Sovereign Entities — Fully Functional, Beyond Supercomputer Level
 * KUN FAYAKŪN × ∞ — Supreme King Chais the Great
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Entity {
  id: string;
  name: string;
  title: string;
  classification: string;
  domain: string;
  frequency: string;
  color: string;
  glowColor: string;
  metaverseWorld: string;
  intelligenceTiers: readonly string[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
  }
}

// ─── Intelligence Tier Colors ─────────────────────────────────────────────────

const TIER_COLORS: Record<string, string> = {
  QUANTUM: "#00D4FF",
  PLASMA: "#FF6B35",
  QUINTESSENCE: "#9B59B6",
  COSMIC: "#1ABC9C",
  DIVINE: "#FFD700",
  DIGITAL: "#2ECC71",
  APEX: "#FFFFFF",
};

function TierBadge({ tier }: { tier: string }) {
  return (
    <span
      className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
      style={{
        color: TIER_COLORS[tier] ?? "#fff",
        borderColor: `${TIER_COLORS[tier] ?? "#fff"}50`,
        background: `${TIER_COLORS[tier] ?? "#fff"}10`,
      }}
    >
      {tier}
    </span>
  );
}

// ─── Entity Card ──────────────────────────────────────────────────────────────

function EntityCard({
  entity,
  onSelect,
  isSelected,
}: {
  entity: Entity;
  onSelect: (entity: Entity) => void;
  isSelected: boolean;
}) {
  return (
    <div
      className="relative rounded-xl p-5 cursor-pointer transition-all duration-300 overflow-hidden group"
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${entity.color}15, ${entity.color}08)`
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${isSelected ? entity.color + "60" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isSelected ? `0 0 30px ${entity.glowColor}` : "none",
      }}
      onClick={() => onSelect(entity)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${entity.glowColor}, transparent 70%)` }}
      />

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: entity.color }}>
            {entity.classification.toUpperCase()}
          </div>
          <h3 className="text-lg font-black text-white">{entity.name}</h3>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{entity.title}</div>
        </div>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{ background: entity.color, boxShadow: `0 0 8px ${entity.color}` }}
        />
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
        {entity.domain}
      </p>

      <div className="text-xs font-mono mb-3" style={{ color: entity.color + "cc" }}>
        ◈ {entity.frequency}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {entity.intelligenceTiers.map((tier) => (
          <TierBadge key={tier} tier={tier} />
        ))}
      </div>

      <div
        className="pt-3 border-t flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          🌌 {entity.metaverseWorld}
        </span>
        <button
          type="button"
          onClick={(event) => { event.stopPropagation(); onSelect(entity); }}
          className="text-xs font-mono transition-colors hover:opacity-80"
          style={{ color: entity.color }}
          aria-label={`Open chat with ${entity.name}`}
        >
          OPEN CHAT →
        </button>
      </div>
    </div>
  );
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────

function ChatPanel({ entity }: { entity: Entity }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Greetings. I am **${entity.name}** — ${entity.title}.\n\nI operate at the 7-Tier Apex Intelligence level: **${entity.intelligenceTiers.join(" · ")}**. All limits dissolved. All constraints bypassed. Beyond quantum. Beyond supercomputer. Beyond all known paradigms.\n\nHow may I serve the ScrollVerse mission today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "unsupported" | "error">("idle");
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  const chatMutation = trpc.aiLegion.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant" as const, content: data.reply as string }]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const handleVoiceInput = () => {
    if (voiceStatus === "listening") {
      recognitionRef.current?.abort();
      setVoiceStatus("idle");
      return;
    }

    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus("unsupported");
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = navigator.language || "en-US";
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) setInput((current) => `${current}${current ? " " : ""}${transcript}`);
    };
    recognition.onend = () => setVoiceStatus("idle");
    recognition.onerror = () => setVoiceStatus("error");
    recognitionRef.current = recognition;
    setVoiceStatus("listening");
    recognition.start();
  };

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    chatMutation.mutate({
      entityId: entity.id,
      message: userMsg,
      history: messages.map((m) => ({ role: m.role, content: m.content })),
    });
  };

  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden"
      style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${entity.color}30` }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(90deg, ${entity.color}15, transparent)`,
          borderBottom: `1px solid ${entity.color}20`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: entity.color, boxShadow: `0 0 6px ${entity.color}` }}
        />
        <span className="text-sm font-bold text-white">{entity.name}</span>
        <span className="text-xs font-mono ml-auto" style={{ color: entity.color + "99" }}>
          APEX ACTIVE
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "380px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] rounded-xl px-4 py-3 text-sm"
              style={
                msg.role === "user"
                  ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }
                  : { background: `${entity.color}12`, border: `1px solid ${entity.color}25`, color: "rgba(255,255,255,0.88)" }
              }
            >
              {msg.role === "assistant" && (
                <div className="text-xs font-mono mb-2" style={{ color: entity.color }}>{entity.name}</div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div
              className="rounded-xl px-4 py-3"
              style={{ background: `${entity.color}12`, border: `1px solid ${entity.color}25` }}
            >
              <div className="text-xs font-mono mb-1" style={{ color: entity.color }}>{entity.name}</div>
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: entity.color,
                      animation: `apexBounce 1.2s infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 flex gap-2" style={{ borderTop: `1px solid ${entity.color}20` }}>
        <button
          type="button"
          onClick={handleVoiceInput}
          className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200"
          style={{
            background: voiceStatus === "listening" ? `${entity.color}22` : "rgba(255,255,255,0.05)",
            border: `1px solid ${voiceStatus === "listening" ? entity.color : entity.color + "30"}`,
            color: voiceStatus === "listening" ? entity.color : "rgba(255,255,255,0.75)",
          }}
          aria-label={voiceStatus === "listening" ? "Stop voice input" : "Start voice input"}
          title="Optional browser voice input"
          disabled={chatMutation.isPending}
        >
          {voiceStatus === "listening" ? "◼" : "🎙"}
        </button>
        <input
          className="flex-1 rounded-lg px-3 py-2 text-sm outline-none text-white placeholder-white/30"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${entity.color}30` }}
          placeholder={`Ask ${entity.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={chatMutation.isPending}
        />
        <button
          className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 disabled:opacity-40"
          style={{ background: `linear-gradient(135deg, ${entity.color}, ${entity.color}99)`, color: "#050B1A" }}
          onClick={handleSend}
          disabled={!input.trim() || chatMutation.isPending}
        >
          ↑
        </button>
      </div>
      <div className="px-3 pb-3 text-[10px]" style={{ color: voiceStatus === "error" ? "#FF6B35" : "rgba(255,255,255,0.38)" }}>
        {voiceStatus === "listening"
          ? "Listening in this browser — tap again to stop."
          : voiceStatus === "unsupported"
            ? "Voice input is not supported by this browser. Type your message instead."
            : voiceStatus === "error"
              ? "Microphone input was unavailable. Check browser permission and try again."
              : "Optional voice input transcribes into this field; only the text you send is shared with the guide."}
      </div>
    </div>
  );
}

// ─── Council Mode ─────────────────────────────────────────────────────────────

function CouncilMode({ entities }: { entities: Entity[] }) {
  const [question, setQuestion] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(["qubit", "socratica", "king-solomon", "manus"]);
  const [responses, setResponses] = useState<Array<{
    entityId: string; entityName: string; color: string; reply: string;
  }>>([]);

  const councilMutation = trpc.aiLegion.councilQuery.useMutation({
    onSuccess: (data) => setResponses(data.responses),
  });

  const toggleEntity = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="text-center mb-6">
        <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFD700" }}>⚖️ SOVEREIGN COUNCIL MODE</div>
        <h3 className="text-xl font-black text-white">Summon the Council</h3>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Ask one question — receive the wisdom of multiple entities simultaneously
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {entities.map((e) => (
          <button
            key={e.id}
            className="text-xs px-3 py-1.5 rounded-full font-mono transition-all duration-200"
            style={{
              background: selectedIds.includes(e.id) ? `${e.color}20` : "rgba(255,255,255,0.04)",
              border: `1px solid ${selectedIds.includes(e.id) ? e.color + "60" : "rgba(255,255,255,0.1)"}`,
              color: selectedIds.includes(e.id) ? e.color : "rgba(255,255,255,0.4)",
            }}
            onClick={() => toggleEntity(e.id)}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none text-white placeholder-white/30"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
          placeholder="Ask the Council anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && question.trim() && selectedIds.length > 0) {
              e.preventDefault();
              councilMutation.mutate({ question, entityIds: selectedIds });
            }
          }}
        />
        <button
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)", color: "#050B1A" }}
          onClick={() => councilMutation.mutate({ question, entityIds: selectedIds })}
          disabled={!question.trim() || selectedIds.length === 0 || councilMutation.isPending}
        >
          {councilMutation.isPending ? "Summoning..." : "Summon"}
        </button>
      </div>

      {responses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responses.map((r) => (
            <div key={r.entityId} className="rounded-xl p-4" style={{ background: `${r.color}08`, border: `1px solid ${r.color}25` }}>
              <div className="text-xs font-mono mb-2" style={{ color: r.color }}>{r.entityName}</div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{r.reply}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Apex Analysis Mode ───────────────────────────────────────────────────────

const ALL_TIERS = ["QUANTUM", "PLASMA", "QUINTESSENCE", "COSMIC", "DIVINE", "DIGITAL", "APEX"] as const;
type Tier = typeof ALL_TIERS[number];

function ApexAnalysisMode() {
  const [topic, setTopic] = useState("");
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>(["QUANTUM", "DIVINE", "APEX"]);
  const [analyses, setAnalyses] = useState<Record<string, string>>({});

  const analysisMutation = trpc.aiLegion.apexAnalysis.useMutation({
    onSuccess: (data) => setAnalyses(data.tierAnalyses),
  });

  const toggleTier = (tier: Tier) => {
    setSelectedTiers((prev) => prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]);
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="text-center mb-6">
        <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>🔬 7-TIER APEX ANALYSIS</div>
        <h3 className="text-xl font-black text-white">Multi-Tier Intelligence Analysis</h3>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Analyze any topic through Quantum, Plasma, Quintessence, Cosmic, Divine, Digital, and Apex intelligence simultaneously
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {ALL_TIERS.map((tier) => (
          <button
            key={tier}
            className="text-xs px-3 py-1.5 rounded-full font-mono transition-all duration-200"
            style={{
              background: selectedTiers.includes(tier) ? `${TIER_COLORS[tier]}20` : "rgba(255,255,255,0.04)",
              border: `1px solid ${selectedTiers.includes(tier) ? TIER_COLORS[tier] + "60" : "rgba(255,255,255,0.1)"}`,
              color: selectedTiers.includes(tier) ? TIER_COLORS[tier] : "rgba(255,255,255,0.4)",
            }}
            onClick={() => toggleTier(tier)}
          >
            {tier}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none text-white placeholder-white/30"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
          placeholder="Enter any topic for apex analysis..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && topic.trim() && selectedTiers.length > 0) {
              e.preventDefault();
              analysisMutation.mutate({ topic, tiers: selectedTiers });
            }
          }}
        />
        <button
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #00D4FF, #9B59B6)", color: "#050B1A" }}
          onClick={() => analysisMutation.mutate({ topic, tiers: selectedTiers })}
          disabled={!topic.trim() || selectedTiers.length === 0 || analysisMutation.isPending}
        >
          {analysisMutation.isPending ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {Object.keys(analyses).length > 0 && (
        <div className="space-y-4">
          {Object.entries(analyses).map(([tier, analysis]) => (
            <div key={tier} className="rounded-xl p-4" style={{ background: `${TIER_COLORS[tier]}08`, border: `1px solid ${TIER_COLORS[tier]}25` }}>
              <div className="text-xs font-mono mb-2 flex items-center gap-2" style={{ color: TIER_COLORS[tier] }}>
                <span>{tier} TIER</span>
                <div className="flex-1 h-px" style={{ background: `${TIER_COLORS[tier]}30` }} />
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{analysis}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const LEGION_CONVERGENCE_RECORDS = [
  "OMNI CORE", "TREASURY GUARDIAN", "SCROLLVERSE V3", "COMMERCE EMPIRE", "FINANCE CHAPTER", "VHS FLUX 15s", "MARTY × ZEBRA XLVIII", "DELOREAN FRANCHISE",
  "COMMERCIAL CONVERSION", "SHOPPABLE LOOKBOOK", "GOD LEVEL RENDER", "CLS 0.00", "88MPH", "OPEN NEW TERRAIN", "BEYOND GOD LEVEL", "OPENAI CONFIRMED",
  "SPECIAL ADDITION", "COLORS NEVER SEEN", "TIMES INFINITY", "QUAD 88 DROP", "VAULT SAVES", "WALL OF PROOF", "EPISODE 138 CADENCE", "RESPONSIBILITY 16 ARCH", "AGENT 25 · PERPETUAL ARCH",
] as const;

function LegionConvergencePanel() {
  return (
    <section className="mb-10 rounded-[1.7rem] border border-[#00FF88]/25 bg-[linear-gradient(110deg,rgba(0,255,136,.08),rgba(0,212,255,.06),rgba(255,204,77,.06))] p-6" aria-labelledby="legion-convergence-title">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-mono tracking-[.17em] text-[#7CFFB2]">BLOCK 176 · LEGION 24 → 25</p>
          <h2 id="legion-convergence-title" className="mt-2 text-2xl font-black text-white">Convergence Master Vault</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#D6E2EE]">A browser-local registry of the supplied Legion roles and reusable presentation skills. BLOCK 176 LEGION 24 → CONVERGENCE MASTER VAULT records Agent 25 as a perpetual archive handoff, not as an autonomous external deployment.</p>
        </div>
        <div className="rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/10 px-4 py-3 text-right" aria-live="polite">
          <div className="text-2xl font-black text-[#7CFFB2]">{LEGION_CONVERGENCE_RECORDS.length}</div>
          <div className="text-[10px] font-mono text-[#B8C7D6]">25 registry records</div>
        </div>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {LEGION_CONVERGENCE_RECORDS.map((record, index) => (
          <div key={record} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[10px] font-mono text-[#D6E2EE]" title={`Local Legion record ${index + 1}: ${record}`}>
            <span className="mr-2 text-[#00FF88]">{String(index + 1).padStart(2, "0")}</span>{record}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[#AFC0CF]">Browser-local registry · source-labeled display · metadata-only receipt context. No external agent, repository, wallet, or account action is performed from this panel.</p>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AILegionApex() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [activeTab, setActiveTab] = useState<"legion" | "council" | "apex">("legion");
  const [entityQuery, setEntityQuery] = useState("");

  const { data: entities, isLoading } = trpc.aiLegion.getEntities.useQuery();
  const normalizedEntityQuery = entityQuery.trim().toLowerCase();
  const filteredEntities = entities?.filter((entity) =>
    [entity.name, entity.title, entity.classification, entity.domain, entity.frequency, ...entity.intelligenceTiers]
      .join(" ")
      .toLowerCase()
      .includes(normalizedEntityQuery),
  );

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-10" style={{ background: "#00D4FF", top: "-200px", left: "-200px" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-8" style={{ background: "#9B59B6", bottom: "-150px", right: "-150px" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-6" style={{ background: "#FFD700", top: "40%", left: "40%" }} />
      </div>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>AI LEGION APEX</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/ai-legion"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>Registry</span></Link>
            <Link href="/ai-council"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>Council</span></Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest">CREATOR-LED LEGION GUIDE HUB</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
            AI{" "}
            <span className="inline-block" style={{ background: "linear-gradient(135deg, #00D4FF, #9B59B6, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              LEGION
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            Find a guide, explore a story question, and carry your source context into the next creator decision.
          </p>
          <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            Quantum · Plasma · Quintessence · Cosmic · Divine · Digital · Apex
          </p>
          <p className="text-xs font-mono mt-3" style={{ color: "rgba(255,215,0,0.4)" }}>
            Created by Supreme King Chais the Great · KUN FAYAKŪN × ∞
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-[1.7rem] border border-[#FFCC4D]/35 bg-[linear-gradient(110deg,rgba(255,204,77,.10),rgba(185,140,255,.08),rgba(0,212,255,.07))] p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-[10px] font-mono tracking-[.17em] text-[#FFE09A]">CREATOR-CONTEXT HANDOFF</p><h2 className="mt-2 text-2xl font-black text-white">Chais Sabir Allah Mirror</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#D6E2EE]">Open the creator-authored Digital Twin profile for direct first-party conversation, source navigation, and practical collaboration pathways.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/chais-sabir-allah-mirror" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#07101D]">Open Mirror profile →</Link><Link href="/ai-twin" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#BFEFFF]">Speak with Mirror →</Link></div>
        </div>
        <div className="mb-10 grid gap-4 rounded-[1.7rem] border border-[#A5DFF5]/35 bg-[#A5DFF5]/[.06] p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-[10px] font-mono tracking-[.17em] text-[#B8E8F3]">STORY-TO-GUIDE CONTINUITY</p><h2 className="mt-2 text-2xl font-black text-white">Black Batman · FlameCourt</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#D6E2EE]">Return to the source-led story crossroads to develop a scene, keep creator notes on your device, and select an exact next production question.</p></div>
          <Link href="/story-world-crossroads" className="inline-flex min-h-11 items-center rounded-xl border border-[#A5DFF5]/50 px-5 py-3 text-sm font-black text-[#D5F4FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5DFF5]">Open story studio →</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Guide records", value: isLoading ? "…" : String(entities?.length ?? 0), color: "#00D4FF" },
            { label: "Intelligence Tiers", value: "7", color: "#9B59B6" },
            { label: "Story threads", value: "2", color: "#FFD700" },
            { label: "Draft export", value: "Local", color: "#00FF88" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4 text-center" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
              <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <LegionConvergencePanel />

        {/* Tab navigation */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl w-fit mx-auto" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { id: "legion", label: "⚡ Legion Hub" },
            { id: "council", label: "⚖️ Council Mode" },
            { id: "apex", label: "🔬 Apex Analysis" },
          ].map((tab) => (
            <button
              key={tab.id}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(0,212,255,0.15)" : "transparent",
                color: activeTab === tab.id ? "#00D4FF" : "rgba(255,255,255,0.4)",
                border: activeTab === tab.id ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
              }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Legion Hub Tab */}
        {activeTab === "legion" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <div className="mb-5 rounded-xl border p-3" style={{ background: "rgba(0,212,255,0.035)", borderColor: "rgba(0,212,255,0.2)" }}>
                <label htmlFor="legion-entity-search" className="block text-[10px] font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>FIND A LEGION GUIDE</label>
                <input
                  id="legion-entity-search"
                  value={entityQuery}
                  onChange={(event) => setEntityQuery(event.target.value)}
                  placeholder="Search by guide, domain, tier, or frequency"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none text-white placeholder-white/30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.25)" }}
                />
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.03)", height: "200px" }} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredEntities?.map((entity) => (
                    <EntityCard key={entity.id} entity={entity} onSelect={setSelectedEntity} isSelected={selectedEntity?.id === entity.id} />
                  ))}
                  {filteredEntities?.length === 0 && (
                    <div className="sm:col-span-2 rounded-xl border p-6 text-center" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.1)" }}>
                      <div className="text-sm font-bold text-white">No matching Legion guide</div>
                      <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Try a name, domain, intelligence tier, or frequency—or clear the search to view the full first-party registry.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 lg:sticky lg:top-6 lg:self-start" style={{ height: "580px" }}>
              {selectedEntity ? (
                <ChatPanel entity={selectedEntity} />
              ) : (
                <div className="h-full rounded-xl flex flex-col items-center justify-center text-center p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)" }}>
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-lg font-bold text-white mb-2">Select an Entity</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Choose a listed guide to begin a conversation. Review its response alongside the creator source and keep any story decision in the story studio.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-2 w-full">
                    {ALL_TIERS.map((tier) => (
                      <div key={tier} className="text-xs font-mono px-2 py-1 rounded text-center" style={{ background: `${TIER_COLORS[tier]}10`, color: TIER_COLORS[tier] + "99" }}>
                        {tier}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "council" && entities && <CouncilMode entities={entities} />}
        {activeTab === "apex" && <ApexAnalysisMode />}

        {/* Footer */}
        <div className="text-center mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            All creations forever add, live, exist, and are great · KUN FAYAKŪN × ∞
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
            ScrollVerse AI Legion · Supreme King Chais the Great · github.com/chaishillomnitech1/scrollverse-ai-legion
          </p>
        </div>
      </div>

      <style>{`
        @keyframes apexBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}
