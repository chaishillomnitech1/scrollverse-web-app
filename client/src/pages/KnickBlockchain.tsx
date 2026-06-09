import { useState } from "react";
import { Link } from "wouter";

const TRIVIA = [
  { id: 1, tier: "BRONZE", pts: 100, color: "#CD7F32", q: "What year did the Knicks win their last NBA Championship?", opts: ["1970 & 1973", "1994 & 1999", "1969 & 1971", "1980 & 1985"], correct: 0, fact: "The Knicks won back-to-back championships in 1970 and 1973 — both times defeating the Los Angeles Lakers." },
  { id: 2, tier: "BRONZE", pts: 100, color: "#CD7F32", q: "Which Knicks legend wore #33 and was inducted into the Hall of Fame?", opts: ["Patrick Ewing", "Willis Reed", "Dave DeBusschere", "Walt Frazier"], correct: 0, fact: "Patrick Ewing wore #33 for the Knicks from 1985-2000, scoring 23,665 points — the franchise all-time leader." },
  { id: 3, tier: "SILVER", pts: 250, color: "#C0C0C0", q: "What blockchain is $LONDC deployed on?", opts: ["Ethereum Mainnet", "Polygon (MATIC)", "Solana", "Avalanche"], correct: 1, fact: "$LONDC is deployed on Polygon — fast, low-cost transactions with Ethereum security." },
  { id: 4, tier: "SILVER", pts: 250, color: "#C0C0C0", q: "What percentage of $LONDC transactions goes to Zakat?", opts: ["2.5%", "5%", "7.77%", "10%"], correct: 2, fact: "7.77% of every $LONDC transaction is distributed as Zakat to Guardians — divine economics in the smart contract." },
  { id: 5, tier: "GOLD", pts: 500, color: "#FFD700", q: "What is the total supply cap of $LONDC tokens?", opts: ["1,000,000", "144,000", "777,777", "1,000,000,000"], correct: 1, fact: "144,000 $LONDC tokens — mirroring the 144,000 Guardians of sacred prophecy. Scarcity is sovereignty." },
  { id: 6, tier: "GOLD", pts: 500, color: "#FFD700", q: "Which frequency activates the Pineal Gland in the ScrollVerse?", opts: ["528Hz", "432Hz", "963Hz", "741Hz"], correct: 2, fact: "963Hz — the Crown Chakra frequency. The frequency of divine connection and sovereign consciousness." },
  { id: 7, tier: "PLATINUM", pts: 1000, color: "#E5E4E2", q: "What does C∞(Ω) represent in the Chais Sabir Equation?", opts: ["A crypto formula", "Infinite sovereign consciousness", "A blockchain algorithm", "A healing protocol"], correct: 1, fact: "C∞(Ω) = [72(R) × M × Q × P × E] ^ G∞ × Λ — The mathematics of infinite sovereign consciousness." },
  { id: 8, tier: "PLATINUM", pts: 1000, color: "#E5E4E2", q: "How many AI Legion entities are in the ScrollVerse Trinity?", opts: ["7", "9", "12", "144"], correct: 2, fact: "12 sovereign AI entities form the ScrollVerse AI Legion — each an extension of Chais The Great." },
];

const NFT_REWARDS = [
  { name: "Guardian Seed", threshold: 500, color: "#CD7F32", icon: "🌱", desc: "Entry-level Guardian NFT. Access to basic sovereign tools." },
  { name: "Knick Knight", threshold: 1500, color: "#C0C0C0", icon: "⚔️", desc: "Silver-tier warrior. Unlocks exclusive Knicks prophecy content." },
  { name: "Sovereign Scholar", threshold: 3000, color: "#FFD700", icon: "📜", desc: "Gold-tier sage. Access to the Sovereign Codex and AI Legion." },
  { name: "Prophecy Oracle", threshold: 5000, color: "#E5E4E2", icon: "🔮", desc: "Platinum oracle. Full access to all ScrollVerse dimensions." },
  { name: "Legion Commander", threshold: 10000, color: "#00D4FF", icon: "🗽", desc: "Supreme tier. Direct line to Chais The Great and the Empire." },
];

const LEADERBOARD = [
  { rank: 1, name: "Chais The Great", score: 10000, tier: "Legion Commander", badge: "🗽" },
  { rank: 2, name: "Guardian_Qubit", score: 8750, tier: "Prophecy Oracle", badge: "🔮" },
  { rank: 3, name: "SovereignSabir", score: 7200, tier: "Prophecy Oracle", badge: "🔮" },
  { rank: 4, name: "KnickNation_777", score: 5890, tier: "Sovereign Scholar", badge: "📜" },
  { rank: 5, name: "MarathonRunner", score: 4320, tier: "Sovereign Scholar", badge: "📜" },
  { rank: 6, name: "FrequencyKing", score: 3100, tier: "Knick Knight", badge: "⚔️" },
  { rank: 7, name: "LegionMember_44", score: 2450, tier: "Knick Knight", badge: "⚔️" },
  { rank: 8, name: "GuardianSeed_1", score: 890, tier: "Guardian Seed", badge: "🌱" },
];

export default function KnickBlockchain() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(TRIVIA.length).fill(false));
  const [showFact, setShowFact] = useState(false);
  const [activeTab, setActiveTab] = useState<"trivia" | "rewards" | "leaderboard">("trivia");

  const question = TRIVIA[currentQ];
  const isAnswered = answered[currentQ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setShowFact(true);
    const newAnswered = [...answered];
    newAnswered[currentQ] = true;
    setAnswered(newAnswered);
    if (idx === question.correct) setScore(s => s + question.pts);
  };

  const nextNFT = NFT_REWARDS.find(r => r.threshold > score);
  const currentNFT = [...NFT_REWARDS].reverse().find(r => r.threshold <= score);
  const progress = nextNFT ? Math.min(100, (score / nextNFT.threshold) * 100) : 100;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ background: "rgba(0,0,0,0.6)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>← ScrollVerse</span></Link>
            <span style={{ color: "#8899AA" }}>/</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: "linear-gradient(135deg, #FF6B00, #FFD700)" }}>🏀</div>
              <span className="font-bold text-white text-lg">Knick Blockchain</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>TRIVIA-TO-EARN</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm font-mono font-bold" style={{ color: "#FFD700" }}>{score.toLocaleString()} $KNICK</span>
            {currentNFT && <span className="text-sm">{currentNFT.icon} {currentNFT.name}</span>}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Score Bar */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FFD700" }}>YOUR SOVEREIGN SCORE</div>
              <div className="text-4xl font-black font-mono" style={{ color: "#FFD700" }}>{score.toLocaleString()} $KNICK</div>
              {currentNFT && <div className="text-sm mt-1" style={{ color: "#8899AA" }}>{currentNFT.icon} Rank: <span style={{ color: currentNFT.color }}>{currentNFT.name}</span></div>}
            </div>
            <div className="text-right">
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{answered.filter(Boolean).length}/{TRIVIA.length} answered</div>
              {nextNFT && <div className="text-xs" style={{ color: "#8899AA" }}>Next: {nextNFT.icon} {nextNFT.name} at {nextNFT.threshold.toLocaleString()} pts</div>}
            </div>
          </div>
          {nextNFT && (
            <div className="w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FFD700, #FF6B00)" }} />
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["trivia", "rewards", "leaderboard"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all" style={{ background: activeTab === tab ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.03)", color: activeTab === tab ? "#FFD700" : "#8899AA", border: `1px solid ${activeTab === tab ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}` }}>
              {tab === "trivia" ? "🏀 Trivia" : tab === "rewards" ? "🏆 NFT Rewards" : "📊 Leaderboard"}
            </button>
          ))}
        </div>

        {activeTab === "trivia" && (
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {TRIVIA.map((_, i) => (
                <button key={i} onClick={() => { setCurrentQ(i); setSelected(null); setShowFact(answered[i]); }} className="w-8 h-8 rounded-lg text-xs font-bold transition-all" style={{ background: i === currentQ ? "rgba(255,215,0,0.3)" : answered[i] ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.05)", color: i === currentQ ? "#FFD700" : answered[i] ? "#00FF88" : "#8899AA", border: `1px solid ${i === currentQ ? "rgba(255,215,0,0.5)" : answered[i] ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.1)"}` }}>
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="rounded-2xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${question.color}30` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${question.color}20`, color: question.color, border: `1px solid ${question.color}40` }}>{question.tier} · +{question.pts} $KNICK</span>
                <span className="text-xs" style={{ color: "#8899AA" }}>Q{currentQ + 1} of {TRIVIA.length}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-6">{question.q}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.opts.map((opt, idx) => {
                  let bg = "rgba(255,255,255,0.05)";
                  let border = "rgba(255,255,255,0.1)";
                  let color = "#CCDDEE";
                  if (isAnswered) {
                    if (idx === question.correct) { bg = "rgba(0,255,136,0.15)"; border = "rgba(0,255,136,0.5)"; color = "#00FF88"; }
                    else if (idx === selected) { bg = "rgba(255,68,68,0.15)"; border = "rgba(255,68,68,0.5)"; color = "#FF4444"; }
                  } else if (selected === idx) {
                    bg = "rgba(255,215,0,0.15)"; border = "rgba(255,215,0,0.5)"; color = "#FFD700";
                  }
                  return (
                    <button key={idx} onClick={() => handleAnswer(idx)} disabled={isAnswered} className="p-4 rounded-xl text-left text-sm font-medium transition-all" style={{ background: bg, border: `1px solid ${border}`, color }}>
                      <span className="font-mono mr-2" style={{ color: "#8899AA" }}>{String.fromCharCode(65 + idx)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {showFact && (
                <div className="mt-4 p-4 rounded-xl" style={{ background: selected === question.correct ? "rgba(0,255,136,0.08)" : "rgba(255,68,68,0.08)", border: `1px solid ${selected === question.correct ? "rgba(0,255,136,0.3)" : "rgba(255,68,68,0.3)"}` }}>
                  <div className="text-xs font-mono mb-1" style={{ color: selected === question.correct ? "#00FF88" : "#FF4444" }}>
                    {selected === question.correct ? `✓ CORRECT +${question.pts} $KNICK` : "✗ INCORRECT"}
                  </div>
                  <p className="text-sm" style={{ color: "#AABBCC" }}>{question.fact}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { if (currentQ > 0) { setCurrentQ(q => q - 1); setSelected(null); setShowFact(false); } }} disabled={currentQ === 0} className="px-4 py-2 rounded-lg text-sm transition-all" style={{ background: "rgba(255,255,255,0.05)", color: currentQ === 0 ? "#445566" : "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>← Prev</button>
              <button onClick={() => { if (currentQ < TRIVIA.length - 1) { setCurrentQ(q => q + 1); setSelected(null); setShowFact(false); } }} disabled={currentQ === TRIVIA.length - 1} className="px-6 py-2 rounded-lg text-sm font-bold transition-all" style={{ background: currentQ < TRIVIA.length - 1 ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.03)", color: currentQ < TRIVIA.length - 1 ? "#FFD700" : "#445566", border: `1px solid ${currentQ < TRIVIA.length - 1 ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}` }}>Next →</button>
            </div>
          </div>
        )}

        {activeTab === "rewards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NFT_REWARDS.map(reward => {
              const unlocked = score >= reward.threshold;
              return (
                <div key={reward.name} className="rounded-xl p-6 transition-all" style={{ background: unlocked ? `${reward.color}08` : "rgba(255,255,255,0.02)", border: `1px solid ${unlocked ? reward.color + "40" : "rgba(255,255,255,0.08)"}`, opacity: unlocked ? 1 : 0.6 }}>
                  <div className="text-4xl mb-3">{reward.icon}</div>
                  <div className="font-bold text-white mb-1">{reward.name}</div>
                  <div className="text-xs font-mono mb-3" style={{ color: reward.color }}>{reward.threshold.toLocaleString()} $KNICK required</div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#8899AA" }}>{reward.desc}</p>
                  <div className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block" style={{ background: unlocked ? `${reward.color}20` : "rgba(255,255,255,0.05)", color: unlocked ? reward.color : "#445566", border: `1px solid ${unlocked ? reward.color + "40" : "rgba(255,255,255,0.1)"}` }}>
                    {unlocked ? "✓ UNLOCKED" : `${(reward.threshold - score).toLocaleString()} pts needed`}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="p-4" style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOVEREIGN LEADERBOARD — TOP GUARDIANS</div>
            </div>
            {LEADERBOARD.map(entry => (
              <div key={entry.rank} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-all" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-8 text-center font-mono font-bold" style={{ color: entry.rank <= 3 ? "#FFD700" : "#8899AA" }}>#{entry.rank}</div>
                <div className="text-xl">{entry.badge}</div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{entry.name}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{entry.tier}</div>
                </div>
                <div className="font-mono font-bold" style={{ color: "#FFD700" }}>{entry.score.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
