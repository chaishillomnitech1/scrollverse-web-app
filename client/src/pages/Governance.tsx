/*
 * SCROLLVERSE GOVERNANCE DAO — v3.0
 * Shura-based participatory governance
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CATEGORY_COLORS: Record<string, string> = {
  general: "#8899AA",
  treasury: "#FFB800",
  protocol: "#00D4FF",
  community: "#00FF88",
  frequency: "#FF6B35",
  guardian: "#9B59B6",
};

const STATUS_COLORS: Record<string, string> = {
  active: "#00FF88",
  passed: "#00D4FF",
  rejected: "#FF4444",
  pending: "#FFB800",
};

export default function Governance() {
  const [filter, setFilter] = useState<"all" | "active" | "passed" | "rejected" | "pending">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", proposerName: "", category: "general", durationDays: 7 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [voterName, setVoterName] = useState("");

  const { data, refetch } = trpc.governance.getProposals.useQuery({ status: filter, limit: 20 }, { refetchInterval: 15000 });
  const { data: stats } = trpc.governance.getStats.useQuery();
  const createMutation = trpc.governance.createProposal.useMutation();
  const voteMutation = trpc.governance.vote.useMutation();

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.proposerName.trim()) return;
    setSubmitting(true);
    try {
      await createMutation.mutateAsync({
        title: form.title,
        description: form.description,
        proposerName: form.proposerName,
        category: form.category as "general" | "treasury" | "protocol" | "community" | "frequency" | "guardian",
        durationDays: form.durationDays,
      });
      setSubmitted(true);
      setShowForm(false);
      setForm({ title: "", description: "", proposerName: "", category: "general", durationDays: 7 });
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (proposalId: string, vote: "for" | "against") => {
    if (!voterName.trim()) return;
    try {
      await voteMutation.mutateAsync({ proposalId, voterName, vote, votingPower: 144 });
      setVotingId(null);
      setVoterName("");
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </div></Link>
        <div className="flex items-center gap-4">
          <Link href="/staking"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Staking</span></Link>
          <Link href="/frequency"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Frequency</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>SCROLLVERSE DAO</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sovereign <span style={{ color: "#00FF88" }}>Governance</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Shura-based participatory governance. Every Guardian has a voice. Every vote shapes the empire.
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 font-bold rounded-xl"
            style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}
          >
            + Submit Proposal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active", value: stats?.active ?? 0, color: "#00FF88" },
            { label: "Passed", value: stats?.passed ?? 0, color: "#00D4FF" },
            { label: "Rejected", value: stats?.rejected ?? 0, color: "#FF4444" },
            { label: "Total", value: stats?.total ?? 0, color: "#FFB800" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}30` }}>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Create Proposal Form */}
        {showForm && (
          <div className="rounded-2xl p-8 mb-10" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <h3 className="text-xl font-bold text-white mb-6">Submit a Proposal</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>PROPOSAL TITLE</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What do you propose?" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }} />
              </div>
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>YOUR NAME</label>
                <input type="text" value={form.proposerName} onChange={e => setForm(f => ({ ...f, proposerName: e.target.value }))} placeholder="Guardian name..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>DESCRIPTION</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your proposal in detail..." rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>CATEGORY</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }}>
                  {["general", "treasury", "protocol", "community", "frequency", "guardian"].map(c => (
                    <option key={c} value={c} style={{ background: "#050B1A" }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>VOTING DURATION (DAYS)</label>
                <input type="number" value={form.durationDays} onChange={e => setForm(f => ({ ...f, durationDays: parseInt(e.target.value) || 7 }))} min={1} max={30} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }} />
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 font-bold rounded-xl" style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}>
              {submitting ? "SUBMITTING..." : "SUBMIT TO DAO"}
            </Button>
          </div>
        )}

        {submitted && (
          <div className="rounded-xl p-4 mb-6 text-center" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
            <span style={{ color: "#00FF88" }}>✓ Proposal submitted to the DAO. Guardians will vote.</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "active", "passed", "rejected", "pending"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: filter === f ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${filter === f ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filter === f ? "#00D4FF" : "#8899AA",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {data?.proposals?.length ? (
            data.proposals.map(p => {
              const totalVotes = p.votesFor + p.votesAgainst;
              const forPct = totalVotes > 0 ? Math.round((p.votesFor / totalVotes) * 100) : 0;
              const catColor = CATEGORY_COLORS[p.category] ?? "#8899AA";
              const statusColor = STATUS_COLORS[p.status] ?? "#8899AA";

              return (
                <div key={p.id} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${catColor}20`, color: catColor }}>{p.category}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor}20`, color: statusColor }}>{p.status}</span>
                        <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{p.proposalId}</span>
                      </div>
                      <h3 className="font-bold text-white text-lg">{p.title}</h3>
                      <p className="text-sm mt-1" style={{ color: "#8899AA" }}>{p.description.slice(0, 150)}{p.description.length > 150 ? "..." : ""}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3" style={{ color: "#8899AA" }}>
                    <span>By {p.proposerName}</span>
                    <span>Ends {new Date(p.endsAt).toLocaleDateString()}</span>
                  </div>

                  {/* Vote Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "#8899AA" }}>
                      <span style={{ color: "#00FF88" }}>FOR {p.votesFor.toLocaleString()}</span>
                      <span style={{ color: "#FF4444" }}>AGAINST {p.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${forPct}%`, background: "linear-gradient(90deg, #00FF88, #00D4FF)" }} />
                    </div>
                    <div className="text-xs mt-1 text-center" style={{ color: "#8899AA" }}>{forPct}% in favor · {p.votingPower.toLocaleString()} total voting power</div>
                  </div>

                  {/* Vote Actions */}
                  {p.status === "active" && (
                    votingId === p.proposalId ? (
                      <div className="flex gap-2 items-center">
                        <input type="text" value={voterName} onChange={e => setVoterName(e.target.value)} placeholder="Your name..." className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                        <Button onClick={() => handleVote(p.proposalId, "for")} className="px-4 py-2 text-sm font-bold rounded-lg" style={{ background: "rgba(0,255,136,0.2)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>FOR</Button>
                        <Button onClick={() => handleVote(p.proposalId, "against")} className="px-4 py-2 text-sm font-bold rounded-lg" style={{ background: "rgba(255,68,68,0.2)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>AGAINST</Button>
                        <Button onClick={() => setVotingId(null)} variant="ghost" className="text-xs" style={{ color: "#8899AA" }}>Cancel</Button>
                      </div>
                    ) : (
                      <Button onClick={() => setVotingId(p.proposalId)} variant="outline" className="text-sm" style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                        Cast Vote
                      </Button>
                    )
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-sm" style={{ color: "#8899AA" }}>
              No proposals yet. Be the first to shape the ScrollVerse empire.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
