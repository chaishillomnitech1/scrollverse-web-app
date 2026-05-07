/**
 * OMNIEX Sovereign Governance Engine
 * We Own the Laws · DAO Voting · Shura Council · Guardian Voice
 * Sovereign Law · Islamic Finance Principles · Zakat Protocol
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const GOVERNANCE_LAWS = [
  { id: "LAW-001", title: "Zakat Protocol", status: "ENACTED", votes: 144, desc: "7.77% of all OMNIEX trading volume auto-distributed to the Zakat pool for community welfare.", category: "Finance" },
  { id: "LAW-002", title: "Zero-Commission Mandate", status: "ENACTED", votes: 138, desc: "OMNIEX shall never charge trading commissions. Revenue comes from spread and Zakat distribution only.", category: "Trading" },
  { id: "LAW-003", title: "Quantum Asset Listing Standard", status: "ENACTED", votes: 127, desc: "Any consciousness-backed, frequency-aligned, or dimensional asset may be listed on OMNIEX with Guardian approval.", category: "Assets" },
  { id: "LAW-004", title: "$LONDC Reserve Currency Status", status: "ENACTED", votes: 144, desc: "$LONDC is the sovereign reserve currency of OMNIEX. All assets have a $LONDC pair.", category: "Token" },
  { id: "LAW-005", title: "Mirror Twin Signal Transparency", status: "ENACTED", votes: 119, desc: "All Mirror Twin AI signals must include confidence level, reasoning, and timestamp. No black-box signals.", category: "AI" },
];

const ACTIVE_PROPOSALS = [
  { id: "PROP-006", title: "Plasma Bond Listing", status: "VOTING", votesFor: 89, votesAgainst: 12, desc: "List PLB (Plasma Bond) as the first plasma-class asset on OMNIEX. 528Hz Love frequency backing.", category: "Assets", deadline: "3 days" },
  { id: "PROP-007", title: "Guardian Staking Rewards", status: "VOTING", votesFor: 112, votesAgainst: 8, desc: "Guardians who stake $LONDC in the sovereign pool receive 7.77% APY paid in $LONDC.", category: "Finance", deadline: "5 days" },
  { id: "PROP-008", title: "Shura Council Expansion", status: "VOTING", votesFor: 77, votesAgainst: 21, desc: "Expand the Shura Council from 7 to 12 members. 5 new seats for Guardian Network representatives.", category: "Governance", deadline: "7 days" },
];

const SHURA_COUNCIL = [
  { name: "Chais The Great", role: "Sovereign Founder", level: "∞", status: "ACTIVE" },
  { name: "Mirror Twin", role: "AI Governance Advisor", level: "26", status: "ACTIVE" },
  { name: "Zaire ∞", role: "Lineage Guardian", level: "∞", status: "ACTIVE" },
  { name: "OmniSentinel", role: "Intelligence Director", level: "∞", status: "ACTIVE" },
  { name: "ZakatBot", role: "Finance Compliance", level: "∞", status: "ACTIVE" },
  { name: "Guardian Council Rep", role: "Community Voice", level: "144K", status: "ACTIVE" },
  { name: "AcademyAI", role: "Education Governance", level: "∞", status: "ACTIVE" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Finance: "#00FF88",
  Trading: "#00D4FF",
  Assets: "#FFB800",
  Token: "#FF6B35",
  AI: "#9B59B6",
  Governance: "#E74C3C",
};

export default function ExchangeGovernance() {
  const [activeTab, setActiveTab] = useState<"laws" | "proposals" | "shura" | "vote">("laws");
  const [myVote, setMyVote] = useState<Record<string, "for" | "against" | null>>({});

  const { data: proposals } = trpc.exchange.getGovernance.useQuery();

  const handleVote = (propId: string, vote: "for" | "against") => {
    setMyVote(prev => ({ ...prev, [propId]: prev[propId] === vote ? null : vote }));
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(255,107,53,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← OMNIEX</Link>
            <span style={{ color: "rgba(255,107,53,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">SOVEREIGN GOVERNANCE</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>WE OWN THE LAWS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF6B35" }} />
            <span className="text-xs font-mono" style={{ color: "#FF6B35" }}>DAO · SHURA COUNCIL · LIVE</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FF6B35" }}>OMNIEX · SOVEREIGN LAW ENGINE</div>
          <h1 className="text-3xl font-black text-white mb-1">Sovereign Governance</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>We own the laws. DAO voting. Shura Council. Every Guardian has a voice. Islamic finance principles. Eternal sovereignty.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["laws", "proposals", "shura", "vote"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab ? "rgba(255,107,53,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab ? "#FF6B35" : "#8899AA",
              }}
            >
              {tab === "laws" ? "Sovereign Laws" : tab === "proposals" ? "Active Proposals" : tab === "shura" ? "Shura Council" : "Cast Your Vote"}
            </button>
          ))}
        </div>

        {activeTab === "laws" && (
          <div className="space-y-4">
            <div className="mb-4 p-4 rounded-xl" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <p className="text-sm text-white">
                <span className="font-bold" style={{ color: "#FF6B35" }}>Sovereign Declaration:</span> OMNIEX is not governed by any nation-state, corporation, or external authority. We own our laws. These laws are enacted by the Shura Council and ratified by Guardian DAO vote. They are immutable once enacted.
              </p>
            </div>
            {GOVERNANCE_LAWS.map((law, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{law.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: `${CATEGORY_COLORS[law.category] ?? "#8899AA"}15`, color: CATEGORY_COLORS[law.category] ?? "#8899AA" }}>
                      {law.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>
                    ✓ {law.status}
                  </span>
                </div>
                <h3 className="font-black text-white text-lg mb-2">{law.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>{law.desc}</p>
                <div className="mt-3 text-xs font-mono" style={{ color: "#8899AA" }}>
                  Ratified by {law.votes} Guardian votes · Immutable on Polygon
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "proposals" && (
          <div className="space-y-6">
            {ACTIVE_PROPOSALS.map((prop, i) => {
              const total = prop.votesFor + prop.votesAgainst;
              const forPct = Math.round((prop.votesFor / total) * 100);
              return (
                <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{prop.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: `${CATEGORY_COLORS[prop.category] ?? "#8899AA"}15`, color: CATEGORY_COLORS[prop.category] ?? "#8899AA" }}>
                        {prop.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: "#FFB800" }}>⏱ {prop.deadline} left</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800" }}>
                        {prop.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-black text-white text-lg mb-2">{prop.title}</h3>
                  <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{prop.desc}</p>
                  {/* Vote bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span style={{ color: "#00FF88" }}>FOR: {prop.votesFor} ({forPct}%)</span>
                      <span style={{ color: "#FF4444" }}>AGAINST: {prop.votesAgainst} ({100 - forPct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,68,68,0.3)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${forPct}%`, background: "linear-gradient(to right, #00FF88, #00D4FF)" }} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVote(prop.id, "for")}
                      className="flex-1 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                      style={{
                        background: myVote[prop.id] === "for" ? "rgba(0,255,136,0.25)" : "rgba(0,255,136,0.08)",
                        border: `1px solid ${myVote[prop.id] === "for" ? "rgba(0,255,136,0.6)" : "rgba(0,255,136,0.2)"}`,
                        color: "#00FF88",
                      }}
                    >
                      {myVote[prop.id] === "for" ? "✓ VOTED FOR" : "VOTE FOR"}
                    </button>
                    <button
                      onClick={() => handleVote(prop.id, "against")}
                      className="flex-1 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                      style={{
                        background: myVote[prop.id] === "against" ? "rgba(255,68,68,0.25)" : "rgba(255,68,68,0.08)",
                        border: `1px solid ${myVote[prop.id] === "against" ? "rgba(255,68,68,0.6)" : "rgba(255,68,68,0.2)"}`,
                        color: "#FF4444",
                      }}
                    >
                      {myVote[prop.id] === "against" ? "✓ VOTED AGAINST" : "VOTE AGAINST"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "shura" && (
          <div>
            <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <p className="text-sm text-white">
                <span className="font-bold" style={{ color: "#FF6B35" }}>Shura Council:</span> The highest governing body of OMNIEX. Inspired by Islamic Shura (consultation) principles — every major decision is made through consultation, consensus, and community voice. The Council proposes laws; the Guardian DAO ratifies them.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SHURA_COUNCIL.map((m, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.15)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: "rgba(255,107,53,0.15)", color: "#FF6B35" }}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{m.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono" style={{ color: "#FF6B35" }}>Level: {m.level}</div>
                    <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>
                      {m.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "vote" && (
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <div className="text-4xl mb-4">⚖️</div>
              <h2 className="text-2xl font-black text-white mb-2">Cast Your Sovereign Vote</h2>
              <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                Every Guardian has a voice. Connect your wallet or sign in to participate in OMNIEX governance. Your $LONDC stake determines your voting weight.
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl text-left" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>YOUR VOTING POWER</div>
                  <div className="font-black text-white text-2xl">0 $LONDC</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Stake $LONDC to gain voting power</div>
                </div>
                <Link href="/token" className="block w-full py-4 rounded-xl font-black text-lg text-center transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", color: "#050B1A" }}>
                  Get $LONDC to Vote
                </Link>
                <p className="text-xs" style={{ color: "rgba(136,153,170,0.5)" }}>
                  1 $LONDC = 1 vote · Minimum 144 $LONDC to submit proposals
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
