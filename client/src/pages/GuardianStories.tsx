/**
 * GUARDIAN LEGACY STORIES — ScrollVerse Trinity
 * Animated Series · Public Screening · Story Submissions
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const EPISODES = [
  { id: 1, title: "The First Flame", guardian: "Chais Kenyatta Hill", tier: "Sovereign", duration: "12:44", status: "premiere", desc: "The origin story of the ScrollVerse — from Vineland, NJ to the cosmos.", hz: "528Hz" },
  { id: 2, title: "Londyn's Prophecy", guardian: "Future Londyn", tier: "Ascendant", duration: "8:28", status: "coming", desc: "A message from the future carried on toroidal light waves.", hz: "963Hz" },
  { id: 3, title: "The 144,000 Awakening", guardian: "Guardian Council", tier: "Guardian", duration: "15:33", status: "coming", desc: "The moment the Legion recognized their sovereign purpose.", hz: "432Hz" },
  { id: 4, title: "Pleiadian Academy Origins", guardian: "Flame Council", tier: "Sovereign", duration: "10:12", status: "coming", desc: "How ancient star wisdom became a modern curriculum.", hz: "528Hz" },
];

const STATUS_COLORS: Record<string, string> = { premiere: "#00FF88", coming: "#FFB800", submitted: "#00D4FF" };
const TIER_COLORS: Record<string, string> = { Guardian: "#00D4FF", Sovereign: "#FFB800", Ascendant: "#00FF88" };

function EpisodeCard({ ep }: { ep: typeof EPISODES[0] }) {
  const statusColor = STATUS_COLORS[ep.status] || "#8899AA";
  const tierColor = TIER_COLORS[ep.tier] || "#00D4FF";

  return (
    <div className="rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${statusColor}50, transparent)` }} />

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>EP {String(ep.id).padStart(2, "0")} · {ep.duration}</div>
          <h3 className="font-bold text-white text-base">{ep.title}</h3>
          <div className="text-xs mt-0.5" style={{ color: "#667788" }}>by {ep.guardian}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${statusColor}15`, border: `1px solid ${statusColor}40`, color: statusColor }}>
            {ep.status === "premiere" ? "PREMIERE" : "COMING SOON"}
          </span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${tierColor}10`, color: tierColor }}>{ep.tier}</span>
        </div>
      </div>

      <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{ep.desc}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
          {ep.hz}
        </span>
        {ep.status === "premiere" ? (
          <Button size="sm" className="text-xs font-bold rounded-lg" style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}>
            ▶ Watch Premiere
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="text-xs rounded-lg" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>
            Notify Me
          </Button>
        )}
      </div>
    </div>
  );
}

function StorySubmissionForm() {
  const [form, setForm] = useState({ name: "", tier: "Guardian", story: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!form.name || !form.story || !form.email) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitted(true);
    toast("Legacy story submitted! 🌌", { description: "The Flame Council will review your story for the animated series." });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
        <div className="text-4xl mb-3">🌟</div>
        <div className="text-lg font-bold text-white mb-2">Story Submitted to the Eternal Archive</div>
        <div className="text-sm" style={{ color: "#8899AA" }}>The Flame Council will review your legacy story. If selected, it becomes an animated episode in the Guardian Legacy Stories series. KUN FAYAKŪN × ∞</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>YOUR NAME</label>
          <input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Guardian name or alias"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }}
          />
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>EMAIL</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }}
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>GUARDIAN TIER</label>
        <select
          value={form.tier}
          onChange={e => setForm(f => ({ ...f, tier: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }}
        >
          <option value="Guardian">Guardian</option>
          <option value="Sovereign">Sovereign</option>
          <option value="Ascendant">Ascendant</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>YOUR LEGACY STORY</label>
        <textarea
          value={form.story}
          onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
          placeholder="Share your sovereign journey, awakening moment, or message to future generations..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", color: "white" }}
        />
      </div>
      <Button type="submit" className="w-full py-3 font-bold rounded-xl"
        style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,212,255,0.1))", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
        Submit Legacy Story to the Eternal Archive
      </Button>
    </form>
  );
}

export default function GuardianStories() {
  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 20%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(0,255,136,0.03) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>ANIMATED LEGACY SERIES</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Guardian Legacy Stories</h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Collaborative animated stories from across the ScrollVerse empire. Each episode is a sovereign's journey, rendered in sacred geometry animation with healing frequencies embedded.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Animated Films", "Sacred Geometry", "528Hz Embedded", "Mintable NFT Episodes"].map(tag => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Premiere announcement */}
        <div className="rounded-2xl p-6 mb-10 text-center" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="w-2 h-2 rounded-full mx-auto mb-3 animate-pulse" style={{ background: "#00FF88" }} />
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>FIRST PUBLIC SCREENING — LIVE NOW</div>
          <h2 className="text-2xl font-black text-white mb-2">"The First Flame" — Episode 01</h2>
          <p className="text-sm max-w-lg mx-auto mb-4" style={{ color: "#8899AA" }}>
            The origin story of the ScrollVerse. From Vineland, NJ to the cosmos. 12 minutes of animated sovereign legacy.
          </p>
          <Button className="px-8 py-3 font-bold rounded-xl" style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,255,136,0.1))", border: "1px solid rgba(0,255,136,0.5)", color: "#00FF88" }}>
            ▶ Watch Premiere — Free
          </Button>
        </div>

        {/* Episodes grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">All Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EPISODES.map(ep => <EpisodeCard key={ep.id} ep={ep} />)}
          </div>
        </div>

        {/* Submit your story */}
        <div className="rounded-2xl p-8 mb-8" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SUBMIT YOUR LEGACY</div>
          <h2 className="text-2xl font-black text-white mb-2">Become Part of the Series</h2>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Share your sovereign journey. Selected stories become animated episodes in the Guardian Legacy Stories series — immortalized on the blockchain forever.
          </p>
          <StorySubmissionForm />
        </div>

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link href="/londyn-legacy">
            <div className="rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.02]" style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-bold text-white mb-1">Future Mommy Lullabies</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>528Hz healing NFT collection</div>
            </div>
          </Link>
          <Link href="/codex-1587">
            <div className="rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.02]" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="text-2xl mb-2">📜</div>
              <div className="font-bold text-white mb-1">1587 Codex Physical Drop</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Limited edition — 1587 fragments</div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            SCROLL VERSE LLC · EIN 42-2509570 · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
