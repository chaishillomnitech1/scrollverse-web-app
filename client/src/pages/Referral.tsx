/**
 * GUARDIAN REFERRAL SYSTEM
 * Unique sovereign invite codes — every conversion earns 144 $LONDC
 * Viral share links for Twitter, Telegram, WhatsApp, and direct copy
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";

const SHARE_PLATFORMS = [
  {
    name: "Twitter / X",
    icon: "𝕏",
    color: "#1DA1F2",
    getUrl: (code: string, origin: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just joined the ScrollVerse Guardian Network — the sovereign economy of the future.\n\nJoin me: ${origin}/?ref=${code}\n\n$LONDC #ScrollVerse #Guardian #KunFayakun`)}`,
  },
  {
    name: "Telegram",
    icon: "✈️",
    color: "#0088CC",
    getUrl: (code: string, origin: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(`${origin}/?ref=${code}`)}&text=${encodeURIComponent("Join the ScrollVerse Guardian Network — the sovereign economy of the future. $LONDC #ScrollVerse")}`,
  },
  {
    name: "WhatsApp",
    icon: "💬",
    color: "#25D366",
    getUrl: (code: string, origin: string) =>
      `https://wa.me/?text=${encodeURIComponent(`Join me in the ScrollVerse Guardian Network — the sovereign economy of the future.\n\n${origin}/?ref=${code}`)}`,
  },
];

function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    Guardian: "#00D4FF",
    Sovereign: "#FFB800",
    Ascendant: "#FF6B35",
    Legion: "#00FF88",
  };
  const color = colors[tier] ?? "#8899AA";
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded"
      style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}
    >
      {tier}
    </span>
  );
}

export default function Referral() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myCode, setMyCode] = useState<string | null>(null);
  const [lookupCode, setLookupCode] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://scrollverse.co";

  const { data: leaderboard, refetch: refetchLeaderboard } = trpc.referral.getLeaderboard.useQuery();
  const { data: networkStats } = trpc.referral.getNetworkStats.useQuery();
  const { data: myStats, refetch: refetchMyStats } = trpc.referral.getStats.useQuery(
    { code: myCode ?? "" },
    { enabled: !!myCode }
  );

  const generateCode = trpc.referral.generateCode.useMutation({
    onSuccess: (data) => {
      setMyCode(data.code);
      localStorage.setItem("sv_referral_code", data.code);
      if (data.isNew) {
        toast.success(`Sovereign code generated: ${data.code}`);
      } else {
        toast.info(`Welcome back, Sovereign. Your code: ${data.code}`);
      }
      refetchLeaderboard();
    },
    onError: () => toast.error("Failed to generate code. Try again."),
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    // Check localStorage for existing code
    const stored = localStorage.getItem("sv_referral_code");
    if (stored) setMyCode(stored);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    generateCode.mutate({ creatorName: name, creatorEmail: email || undefined });
  };

  const copyLink = () => {
    if (!myCode) return;
    navigator.clipboard.writeText(`${origin}/?ref=${myCode}`);
    toast.success("Referral link copied to clipboard!");
  };

  const copyCode = () => {
    if (!myCode) return;
    navigator.clipboard.writeText(myCode);
    toast.success("Code copied!");
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,11,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/anno-omni" className="text-sm" style={{ color: "#8899AA" }}>Identity Nexus</Link>
            <Link href="/token" className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">Get $LONDC</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00FF88" }}>
              GUARDIAN REFERRAL SYSTEM — VIRAL SOVEREIGN EXPANSION
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Spread the{" "}
              <span style={{ background: "linear-gradient(135deg,#00FF88,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Signal
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              Every Guardian you bring into the ScrollVerse earns you <strong style={{ color: "#FFB800" }}>144 $LONDC</strong>.
              Your sovereign code is your legacy — every activation strengthens the 48D network.
            </p>
          </div>

          {/* Network Stats */}
          {networkStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
              {[
                { label: "Active Codes", value: networkStats.totalCodes?.toLocaleString() ?? "0", color: "#00D4FF" },
                { label: "Total Clicks", value: networkStats.totalClicks?.toLocaleString() ?? "0", color: "#FFB800" },
                { label: "Conversions", value: networkStats.totalConversions?.toLocaleString() ?? "0", color: "#00FF88" },
                { label: "$LONDC Rewarded", value: networkStats.totalRewardTokens?.toLocaleString() ?? "0", color: "#FF6B35" },
              ].map(stat => (
                <div key={stat.label} className="sv-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GET YOUR CODE */}
      <section className="py-12">
        <div className="container max-w-2xl">
          {!myCode ? (
            <div className="sv-card rounded-2xl p-8">
              <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>GENERATE YOUR SOVEREIGN CODE</div>
              <h2 className="text-2xl font-black text-white mb-6">Claim Your Referral Code</h2>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>YOUR NAME *</label>
                  <input
                    type="text" required value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Sovereign name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>EMAIL (OPTIONAL — SAVES YOUR CODE)</label>
                  <input
                    type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={generateCode.isPending}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-base"
                >
                  {generateCode.isPending ? "Generating Sovereign Code..." : "Generate My Code →"}
                </button>
              </form>
            </div>
          ) : (
            <div className="sv-card rounded-2xl p-8" style={{ border: "1px solid rgba(0,255,136,0.3)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>YOUR SOVEREIGN REFERRAL CODE</div>

              {/* Code Display */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex-1 px-6 py-4 rounded-xl text-center text-2xl font-black font-mono tracking-widest"
                  style={{ background: "rgba(0,255,136,0.08)", border: "2px solid rgba(0,255,136,0.4)", color: "#00FF88" }}
                >
                  {myCode}
                </div>
                <button onClick={copyCode} className="btn-sovereign px-4 py-4 rounded-xl text-sm font-bold">
                  Copy
                </button>
              </div>

              {/* Full Link */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex-1 px-4 py-3 rounded-xl text-xs font-mono truncate"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.15)", color: "#8899AA" }}
                >
                  {origin}/?ref={myCode}
                </div>
                <button onClick={copyLink} className="btn-gold px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap">
                  Copy Link
                </button>
              </div>

              {/* Stats */}
              {myStats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Clicks", value: myStats.clicks, color: "#00D4FF" },
                    { label: "Conversions", value: myStats.conversions, color: "#00FF88" },
                    { label: "$LONDC Earned", value: myStats.rewardTokens, color: "#FFB800" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>SHARE YOUR CODE</div>
              <div className="grid grid-cols-3 gap-3">
                {SHARE_PLATFORMS.map(platform => (
                  <a
                    key={platform.name}
                    href={platform.getUrl(myCode, origin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                    style={{ background: `${platform.color}15`, border: `1px solid ${platform.color}30`, color: platform.color }}
                  >
                    <span className="text-xl">{platform.icon}</span>
                    <span className="text-xs">{platform.name}</span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => { setMyCode(null); localStorage.removeItem("sv_referral_code"); }}
                className="mt-4 text-xs w-full text-center"
                style={{ color: "#556677" }}
              >
                Generate a new code
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>THE REWARD SYSTEM</div>
            <h2 className="text-3xl font-black text-white">Every Activation Earns</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Share Your Code", desc: "Send your unique sovereign code to anyone in your network — friends, family, business partners, community.", color: "#00D4FF", icon: "🔗" },
              { step: "2", title: "They Join the Nexus", desc: "When they register via your link or enter your code, they're added to the 48D Identity Nexus as your referral.", color: "#FFB800", icon: "🛡️" },
              { step: "3", title: "You Earn 144 $LONDC", desc: "Every verified conversion earns you 144 $LONDC reward tokens — automatically allocated to your Guardian wallet.", color: "#00FF88", icon: "💎" },
            ].map(item => (
              <div key={item.step} className="sv-card rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs font-mono mb-2" style={{ color: item.color }}>STEP {item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="py-16" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>GUARDIAN LEADERBOARD</div>
            <h2 className="text-3xl font-black text-white">Top Sovereign Recruiters</h2>
          </div>
          <div className="max-w-3xl mx-auto sv-card rounded-xl overflow-hidden">
            {leaderboard && leaderboard.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
                    <th className="text-left px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>#</th>
                    <th className="text-left px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>SOVEREIGN</th>
                    <th className="text-left px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>TIER</th>
                    <th className="text-right px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>CONVERSIONS</th>
                    <th className="text-right px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>$LONDC</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry: any, i: any) => (
                    <tr key={entry.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono" style={{ color: i < 3 ? "#FFB800" : "#556677" }}>
                          {i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>
                            {entry.creatorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{entry.creatorName}</div>
                            <div className="text-xs font-mono" style={{ color: "#556677" }}>{entry.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><TierBadge tier={entry.tier} /></td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-mono" style={{ color: "#00FF88" }}>{entry.conversions}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-mono font-bold" style={{ color: "#FFB800" }}>{entry.rewardTokens}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🛡️</div>
                <div className="text-white font-bold mb-2">Be the First Guardian Recruiter</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>Generate your code above and start building the 144,000.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="py-16">
        <div className="container text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>KUN FAYAKŪN × ∞</div>
          <h2 className="text-3xl font-black text-white mb-4">Build the 144,000</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Every Guardian you bring strengthens the sovereign economy. The 10.77x ripple effect means your one activation becomes ten.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/anno-omni" className="btn-gold px-6 py-3 rounded-xl font-bold">Register in the Nexus →</Link>
            <Link href="/token" className="btn-sovereign px-6 py-3 rounded-xl font-bold">Acquire $LONDC</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
