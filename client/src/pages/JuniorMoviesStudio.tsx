/*
 * JUNIOR MOVIES ENTERTAINMENT — SOVEREIGN CREATIVE STUDIO
 * © 2024–2026 Chais Kenyatta Hill — Sabir Allah The Great
 * KUN FAYAKŪN × ∞ — Our Own Marvel. Positive. Substance. Imagination.
 *
 * Features:
 * - AI Creative Chat for children (ideas, stories, history)
 * - Comic Book Creator (panel builder)
 * - Cartoon Character Designer
 * - Real History & Facts Learning Module
 * - Engagement Rewards Engine (auto NFT + crypto incentives)
 * - Impact Score tracking
 */
import { useState, useRef, useEffect } from "react";

// ── REAL HISTORY FACTS ─────────────────────────────────────────────────────
const HISTORY_FACTS = [
  { title: "Ancient Egypt", fact: "Ancient Egyptians invented paper (papyrus), writing (hieroglyphics), and the 365-day calendar over 5,000 years ago.", icon: "𓂀", color: "#FFB800" },
  { title: "Mansa Musa", fact: "Mansa Musa of Mali (1280–1337) was the richest person in all of human history. His empire produced more than half the world's gold.", icon: "👑", color: "#FFD700" },
  { title: "Imhotep", fact: "Imhotep was the world's first physician and architect, designing the Step Pyramid 4,600 years ago. He was later worshipped as a god of medicine.", icon: "⚕️", color: "#00D4FF" },
  { title: "Timbuktu", fact: "Timbuktu, Mali was home to the world's first university — Sankore — with over 25,000 students and 700,000 manuscripts in the 1300s.", icon: "📚", color: "#00FF88" },
  { title: "Queen Nzinga", fact: "Queen Nzinga of Angola (1583–1663) was a brilliant military strategist who fought European colonizers for 40 years and never surrendered.", icon: "⚔️", color: "#EC4899" },
  { title: "Nikola Tesla", fact: "Nikola Tesla invented AC electricity, radio, and wireless power. He spoke 8 languages and had a photographic memory.", icon: "⚡", color: "#00D4FF" },
  { title: "Mae Jemison", fact: "Dr. Mae Jemison became the first Black woman in space in 1992. She was also a medical doctor, engineer, and speaks 4 languages.", icon: "🚀", color: "#9B59B6" },
  { title: "Sundiata Keita", fact: "Sundiata Keita founded the Mali Empire in 1235 after defeating the Sosso Empire. He was said to have been unable to walk as a child but rose to become a great warrior king.", icon: "🦁", color: "#FF6B35" },
  { title: "Ancient Nubia", fact: "The Kingdom of Kush (Nubia) ruled Egypt for nearly 100 years. Nubian pyramids outnumber Egyptian pyramids — there are over 200 of them!", icon: "🔺", color: "#FFB800" },
  { title: "Garrett Morgan", fact: "Garrett Morgan, a Black inventor, created the traffic light and the gas mask. His gas mask saved lives in a 1916 tunnel explosion.", icon: "🚦", color: "#00FF88" },
];

// ── COMIC PANEL TEMPLATES ──────────────────────────────────────────────────
const PANEL_TEMPLATES = [
  { id: "action", label: "Action Scene", emoji: "💥", bg: "from-red-900 to-orange-900" },
  { id: "dialogue", label: "Dialogue", emoji: "💬", bg: "from-blue-900 to-cyan-900" },
  { id: "discovery", label: "Discovery", emoji: "✨", bg: "from-purple-900 to-pink-900" },
  { id: "journey", label: "Journey", emoji: "🗺️", bg: "from-green-900 to-teal-900" },
  { id: "power", label: "Power Reveal", emoji: "⚡", bg: "from-yellow-900 to-amber-900" },
  { id: "wisdom", label: "Wisdom", emoji: "📜", bg: "from-indigo-900 to-violet-900" },
];

// ── CHARACTER TEMPLATES ────────────────────────────────────────────────────
const CHARACTER_TEMPLATES = [
  { name: "Warrior", emoji: "⚔️", traits: ["Brave", "Strong", "Loyal"], power: "Battle Mastery" },
  { name: "Scholar", emoji: "📚", traits: ["Wise", "Curious", "Creative"], power: "Ancient Knowledge" },
  { name: "Healer", emoji: "💚", traits: ["Compassionate", "Gentle", "Powerful"], power: "Life Force" },
  { name: "Explorer", emoji: "🗺️", traits: ["Adventurous", "Bold", "Resourceful"], power: "Navigation" },
  { name: "Inventor", emoji: "⚙️", traits: ["Ingenious", "Patient", "Visionary"], power: "Creation" },
  { name: "Guardian", emoji: "🛡️", traits: ["Protective", "Honorable", "Fearless"], power: "Sovereignty" },
];

// ── AI RESPONSES (simulated — replace with real LLM call) ──────────────────
const AI_RESPONSES: Record<string, string> = {
  default: "That's an amazing idea! Every great story starts with a spark of imagination. Tell me more about your character — what special power do they have?",
  story: "Wow, what a powerful story! Your character sounds like a true sovereign. In ancient Africa, warriors and scholars were often the same person. Would you like to add a historical fact to your story?",
  history: "You're learning like a true scholar of Timbuktu! Did you know that ancient African kingdoms had libraries with hundreds of thousands of books? Your curiosity is your superpower.",
  comic: "Your comic panel is coming to life! The greatest comic creators — like Jack Kirby and Neal Adams — always started with a simple sketch and a big idea. What happens next in your story?",
  character: "Your character is incredible! Every great character needs a name that carries meaning. In ancient Egypt, names were sacred — they believed your name was part of your soul.",
  reward: "🏆 ACHIEVEMENT UNLOCKED! You just earned 10 $JME tokens and a Creator Badge NFT for your creative contribution! Keep creating — the more you build, the more you earn!",
};

// ── REWARD SYSTEM ─────────────────────────────────────────────────────────
interface Reward {
  type: "nft" | "token" | "badge";
  name: string;
  amount?: number;
  emoji: string;
  color: string;
}

const REWARDS: Reward[] = [
  { type: "token", name: "$JME Tokens", amount: 10, emoji: "🪙", color: "#FFB800" },
  { type: "nft", name: "Creator Badge NFT", emoji: "🏆", color: "#00D4FF" },
  { type: "badge", name: "History Scholar", emoji: "📜", color: "#00FF88" },
  { type: "nft", name: "Comic Artist NFT", emoji: "🎨", color: "#EC4899" },
  { type: "token", name: "$THOTH Tokens", amount: 5, emoji: "𓂀", color: "#9B59B6" },
];

// ── IMPACT SCORE COMPONENT ─────────────────────────────────────────────────
function ImpactScore({ score, level }: { score: number; level: string }) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
    >
      <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>IMPACT SCORE</div>
      <div className="text-3xl font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
        {score.toLocaleString()}
      </div>
      <div className="text-xs mt-1" style={{ color: "#00FF88" }}>{level}</div>
      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${Math.min((score / 1000) * 100, 100)}%`,
            background: "linear-gradient(90deg, #00D4FF, #FFB800)",
          }}
        />
      </div>
    </div>
  );
}

// ── REWARD TOAST ───────────────────────────────────────────────────────────
function RewardToast({ reward, onClose }: { reward: Reward; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 rounded-2xl p-4 shadow-2xl animate-bounce"
      style={{
        background: "rgba(5,11,26,0.97)",
        border: `1px solid ${reward.color}60`,
        boxShadow: `0 0 30px ${reward.color}30`,
        minWidth: "260px",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{reward.emoji}</div>
        <div>
          <div className="text-xs font-mono" style={{ color: reward.color }}>🎉 REWARD EARNED!</div>
          <div className="font-bold text-white">{reward.name}</div>
          {reward.amount && (
            <div className="text-xs" style={{ color: "#8899AA" }}>+{reward.amount} added to your wallet</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function JuniorMoviesStudio() {
  const [activeTab, setActiveTab] = useState<"ai-chat" | "comic" | "character" | "history">("ai-chat");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "✨ Welcome to the JME Creative Studio! I'm your AI creative partner. Tell me your story idea, ask me about history, or let's build a comic together. What's on your mind, Creator?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [impactScore, setImpactScore] = useState(0);
  const [impactLevel, setImpactLevel] = useState("Apprentice Creator");
  const [earnedRewards, setEarnedRewards] = useState<Reward[]>([]);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const [comicPanels, setComicPanels] = useState<{ template: string; text: string }[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<typeof CHARACTER_TEMPLATES[0] | null>(null);
  const [characterName, setCharacterName] = useState("");
  const [characterStory, setCharacterStory] = useState("");
  const [selectedFact, setSelectedFact] = useState<typeof HISTORY_FACTS[0] | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getImpactLevel = (score: number) => {
    if (score >= 800) return "Sovereign Creator 👑";
    if (score >= 500) return "Master Storyteller ⭐";
    if (score >= 300) return "Rising Scholar 📚";
    if (score >= 100) return "Young Guardian 🛡️";
    return "Apprentice Creator ✨";
  };

  const awardReward = (reward: Reward) => {
    setEarnedRewards(prev => [...prev, reward]);
    setActiveReward(reward);
    setImpactScore(prev => {
      const next = prev + (reward.amount || 25);
      setImpactLevel(getImpactLevel(next));
      return next;
    });
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setInputText("");

    setMessages(prev => [...prev, { role: "user", text: userMsg }]);

    // Determine AI response type
    let responseKey = "default";
    const lower = userMsg.toLowerCase();
    if (lower.includes("story") || lower.includes("once upon") || lower.includes("character")) responseKey = "story";
    if (lower.includes("history") || lower.includes("egypt") || lower.includes("africa") || lower.includes("ancient")) responseKey = "history";
    if (lower.includes("comic") || lower.includes("panel") || lower.includes("draw")) responseKey = "comic";
    if (lower.includes("power") || lower.includes("hero") || lower.includes("villain")) responseKey = "character";

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: AI_RESPONSES[responseKey] }]);
      // Award tokens for engagement
      setImpactScore(prev => {
        const next = prev + 15;
        setImpactLevel(getImpactLevel(next));
        return next;
      });
      // Milestone rewards
      if (messages.length > 0 && messages.length % 5 === 0) {
        const reward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
        awardReward(reward);
      }
    }, 800);
  };

  const addComicPanel = (templateId: string) => {
    setComicPanels(prev => [...prev, { template: templateId, text: "" }]);
    setImpactScore(prev => {
      const next = prev + 20;
      setImpactLevel(getImpactLevel(next));
      return next;
    });
    if (comicPanels.length === 2) {
      awardReward({ type: "nft", name: "Comic Artist NFT", emoji: "🎨", color: "#EC4899" });
    }
  };

  const saveCharacter = () => {
    if (!selectedCharacter || !characterName) return;
    awardReward({ type: "nft", name: `${characterName} Character NFT`, emoji: selectedCharacter.emoji, color: "#00FF88" });
    setImpactScore(prev => {
      const next = prev + 50;
      setImpactLevel(getImpactLevel(next));
      return next;
    });
  };

  const learnFact = (fact: typeof HISTORY_FACTS[0]) => {
    setSelectedFact(fact);
    setImpactScore(prev => {
      const next = prev + 30;
      setImpactLevel(getImpactLevel(next));
      return next;
    });
    if (earnedRewards.filter(r => r.type === "badge").length === 0) {
      awardReward({ type: "badge", name: "History Scholar Badge", emoji: "📜", color: "#00FF88" });
    }
  };

  const TABS = [
    { id: "ai-chat" as const, label: "AI Creative Chat", emoji: "🤖" },
    { id: "comic" as const, label: "Comic Builder", emoji: "🎨" },
    { id: "character" as const, label: "Character Creator", emoji: "⚡" },
    { id: "history" as const, label: "Real History", emoji: "📜" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Reward Toast */}
      {activeReward && (
        <RewardToast reward={activeReward} onClose={() => setActiveReward(null)} />
      )}

      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-3"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(255,184,0,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎬</div>
            <div>
              <div className="font-black text-white text-lg">JME Creative Studio</div>
              <div className="text-xs font-mono" style={{ color: "#FFB800" }}>JUNIOR MOVIES ENTERTAINMENT × SOVEREIGN UNIVERSE</div>
            </div>
          </div>
          <ImpactScore score={impactScore} level={impactLevel} />
        </div>
      </div>

      {/* Tabs */}
      <div className="container pt-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: activeTab === tab.id ? "1px solid rgba(255,184,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: activeTab === tab.id ? "#FFB800" : "#8899AA",
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ── AI CREATIVE CHAT ── */}
        {activeTab === "ai-chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}
              >
                {/* Chat messages */}
                <div className="p-4 space-y-4 overflow-y-auto" style={{ height: "420px" }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-xs lg:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed"
                        style={{
                          background: msg.role === "user"
                            ? "linear-gradient(135deg, rgba(255,184,0,0.2), rgba(0,212,255,0.1))"
                            : "rgba(255,255,255,0.05)",
                          border: msg.role === "user"
                            ? "1px solid rgba(255,184,0,0.3)"
                            : "1px solid rgba(255,255,255,0.08)",
                          color: msg.role === "user" ? "#FFD700" : "#CCDDEE",
                        }}
                      >
                        {msg.role === "ai" && <span className="text-base mr-2">🤖</span>}
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div
                  className="p-4 flex gap-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Tell me your story idea, ask about history, or describe your character..."
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "white",
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #FFB800, #FF6B35)",
                      color: "#050B1A",
                    }}
                  >
                    Send ✨
                  </button>
                </div>
              </div>

              {/* Quick prompts */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Tell me about ancient Egypt 🏺", "Help me create a hero ⚡", "What's my story idea? 📖", "Who was Mansa Musa? 👑"].map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => { setInputText(prompt); }}
                    className="px-3 py-2 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Rewards Panel */}
            <div className="space-y-4">
              <div
                className="rounded-2xl p-4"
                style={{ border: "1px solid rgba(255,184,0,0.2)", background: "rgba(255,184,0,0.03)" }}
              >
                <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>🏆 YOUR REWARDS</div>
                {earnedRewards.length === 0 ? (
                  <div className="text-xs text-center py-4" style={{ color: "#8899AA" }}>
                    Start creating to earn NFTs, tokens, and badges!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {earnedRewards.slice(-5).map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-lg">{r.emoji}</span>
                        <span style={{ color: r.color }}>{r.name}</span>
                        {r.amount && <span style={{ color: "#8899AA" }}>+{r.amount}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="rounded-2xl p-4"
                style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}
              >
                <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>💡 HOW TO EARN</div>
                <div className="space-y-2 text-xs" style={{ color: "#8899AA" }}>
                  <div>💬 Chat with AI → +15 $JME</div>
                  <div>🎨 Add comic panel → +20 $JME</div>
                  <div>⚡ Create character → +50 $JME</div>
                  <div>📜 Learn history → +30 $JME</div>
                  <div>🏆 Milestones → NFT rewards</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── COMIC BUILDER ── */}
        {activeTab === "comic" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-2">🎨 Comic Book Creator</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Build your own sovereign comic book. Add panels, write your story, earn NFTs for every creation.
              </p>
            </div>

            {/* Panel Templates */}
            <div className="mb-6">
              <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>ADD A PANEL</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {PANEL_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => addComicPanel(t.id)}
                    className={`rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 bg-gradient-to-br ${t.bg}`}
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-2xl mb-1">{t.emoji}</div>
                    <div className="text-xs font-bold text-white">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Comic Canvas */}
            {comicPanels.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{ border: "2px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="text-4xl mb-3">🎨</div>
                <div className="text-white font-bold mb-2">Your Comic Canvas is Empty</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>Click a panel type above to start building your story!</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comicPanels.map((panel, i) => {
                  const template = PANEL_TEMPLATES.find(t => t.id === panel.template)!;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden bg-gradient-to-br ${template.bg}`}
                      style={{ border: "2px solid rgba(255,255,255,0.15)", minHeight: "200px" }}
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{template.emoji}</span>
                          <span className="text-xs font-mono text-white opacity-70">PANEL {i + 1} — {template.label.toUpperCase()}</span>
                        </div>
                        <textarea
                          placeholder="Write what happens in this panel..."
                          className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none resize-none"
                          rows={4}
                          value={panel.text}
                          onChange={e => {
                            const updated = [...comicPanels];
                            updated[i] = { ...updated[i], text: e.target.value };
                            setComicPanels(updated);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {comicPanels.length > 0 && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => awardReward({ type: "nft", name: "Sovereign Comic NFT", emoji: "📖", color: "#FFB800" })}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                >
                  🏆 Mint Comic as NFT
                </button>
                <button
                  onClick={() => setComicPanels([])}
                  className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}
                >
                  Clear Canvas
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── CHARACTER CREATOR ── */}
        {activeTab === "character" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-2">⚡ Character Creator</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Design your own sovereign character. Every character becomes an NFT and gets their own coin!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Selection */}
              <div>
                <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>CHOOSE YOUR ARCHETYPE</div>
                <div className="grid grid-cols-2 gap-3">
                  {CHARACTER_TEMPLATES.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCharacter(c)}
                      className="rounded-xl p-4 text-left transition-all duration-200 hover:scale-105"
                      style={{
                        background: selectedCharacter?.name === c.name ? "rgba(255,184,0,0.12)" : "rgba(255,255,255,0.04)",
                        border: selectedCharacter?.name === c.name ? "1px solid rgba(255,184,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="text-2xl mb-2">{c.emoji}</div>
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-xs mt-1" style={{ color: "#00D4FF" }}>Power: {c.power}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {c.traits.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>{t}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Details */}
              <div
                className="rounded-2xl p-6"
                style={{ border: "1px solid rgba(255,184,0,0.2)", background: "rgba(255,184,0,0.03)" }}
              >
                <div className="text-xs font-mono mb-4" style={{ color: "#FFB800" }}>DESIGN YOUR CHARACTER</div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono block mb-1" style={{ color: "#8899AA" }}>CHARACTER NAME</label>
                    <input
                      type="text"
                      value={characterName}
                      onChange={e => setCharacterName(e.target.value)}
                      placeholder="Give your character a powerful name..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,184,0,0.2)", color: "white" }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono block mb-1" style={{ color: "#8899AA" }}>ORIGIN STORY</label>
                    <textarea
                      value={characterStory}
                      onChange={e => setCharacterStory(e.target.value)}
                      placeholder="Where did your character come from? What is their mission?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,184,0,0.2)", color: "white" }}
                    />
                  </div>

                  {selectedCharacter && (
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      <div className="text-4xl mb-2">{selectedCharacter.emoji}</div>
                      <div className="font-black text-white text-lg">{characterName || "Your Character"}</div>
                      <div className="text-xs mt-1" style={{ color: "#00D4FF" }}>Archetype: {selectedCharacter.name}</div>
                      <div className="text-xs" style={{ color: "#FFB800" }}>Power: {selectedCharacter.power}</div>
                      <div className="text-xs mt-1" style={{ color: "#00FF88" }}>Coin: ${(characterName || "CHAR").toUpperCase().slice(0, 4)}</div>
                    </div>
                  )}

                  <button
                    onClick={saveCharacter}
                    disabled={!selectedCharacter || !characterName}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                  >
                    ⚡ Mint Character as NFT + Coin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REAL HISTORY ── */}
        {activeTab === "history" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-2">📜 Real History & Facts</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Learn the real history of sovereign civilizations. Every fact you learn earns you tokens and badges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HISTORY_FACTS.map((fact, i) => (
                <button
                  key={i}
                  onClick={() => learnFact(fact)}
                  className="rounded-2xl p-5 text-left transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  style={{
                    background: selectedFact?.title === fact.title ? `${fact.color}12` : "rgba(255,255,255,0.03)",
                    border: selectedFact?.title === fact.title ? `1px solid ${fact.color}50` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: selectedFact?.title === fact.title ? `0 0 20px ${fact.color}20` : "none",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{fact.icon}</div>
                    <div>
                      <div className="font-bold text-white mb-1">{fact.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{fact.fact}</div>
                      <div className="mt-2 text-xs font-mono" style={{ color: fact.color }}>
                        {selectedFact?.title === fact.title ? "✓ LEARNED — +30 $JME earned!" : "Click to learn → +30 $JME"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Visual Apps Integration */}
            <div
              className="mt-8 rounded-2xl p-6"
              style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}
            >
              <div className="text-xs font-mono mb-4" style={{ color: "#00FF88" }}>🎬 CREATE WITH THESE TOOLS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: "CapCut", emoji: "🎬", url: "https://www.capcut.com", desc: "Video editing" },
                  { name: "Canva", emoji: "🎨", url: "https://www.canva.com", desc: "Design & art" },
                  { name: "Adobe Express", emoji: "✨", url: "https://www.adobe.com/express", desc: "Quick creation" },
                  { name: "Procreate", emoji: "🖌️", url: "https://procreate.com", desc: "Digital drawing" },
                ].map(app => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 block"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="text-2xl mb-1">{app.emoji}</div>
                    <div className="text-sm font-bold text-white">{app.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{app.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pb-8 text-center text-xs" style={{ color: "#8899AA" }}>
          © 2024–2026 Chais Kenyatta Hill — Junior Movies Entertainment Universe<br />
          <span style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞ — Every child is a sovereign creator.</span>
        </div>
      </div>
    </div>
  );
}
