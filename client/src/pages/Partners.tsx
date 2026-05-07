/**
 * SCROLLVERSE CREATOR PARTNERSHIP HUB
 * Where the Meek Meet the Powers That Be — Equal Opportunity to Prosper
 * Transparent · Direct to Source · Incentivized on Impact & Contribution
 * Every visit is an investment. Every creator is a sovereign co-owner.
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    id: "guardian",
    name: "Guardian",
    price: 144,
    londc: 14400,
    referralPct: 7.77,
    color: "#00D4FF",
    icon: "🛡️",
    perks: [
      "7.77% $LONDC on every Guardian you activate",
      "Personal referral code + tracking dashboard",
      "Access to Creator Academy (all 53 courses)",
      "Guardian tier badge across all channels",
      "Monthly $LONDC airdrop based on impact score",
    ],
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: 444,
    londc: 44400,
    referralPct: 14.4,
    color: "#FFB800",
    icon: "👑",
    perks: [
      "14.4% $LONDC on every activation through your link",
      "Priority placement in Creator Marketplace",
      "Co-branded content with ScrollVerse branding",
      "Direct access to Chais Kenyatta Hill for collabs",
      "Quarterly revenue share from OMNIEX trading fees",
    ],
  },
  {
    id: "ascendant",
    name: "Ascendant",
    price: 1444,
    londc: 144400,
    referralPct: 22.2,
    color: "#00FF88",
    icon: "⚡",
    perks: [
      "22.2% $LONDC on every activation — perpetual",
      "Equity stake in ScrollVerse Trinity ecosystem",
      "Named as Founding Creator in all documentation",
      "AI-generated content package (reels, posts, stories)",
      "Mirror Twin AI signal access for trading alpha",
    ],
  },
];

const NICHES = [
  "Web3 / Crypto / DeFi",
  "Islamic Finance / Halal Investing",
  "Black Wealth Building",
  "Music / Hip-Hop / Culture",
  "Entrepreneurship / Business",
  "Spirituality / Consciousness",
  "Tech / AI / Innovation",
  "Fashion / Lifestyle",
  "Fitness / Wellness",
  "Other",
];

function EarningsCalculator() {
  const [followers, setFollowers] = useState(10000);
  const [tier, setTier] = useState("sovereign");
  const [convRate, setConvRate] = useState(0.5);

  const selectedTier = TIERS.find((t) => t.id === tier)!;
  const activations = Math.floor((followers * convRate) / 100);
  const loncEarned = Math.floor(activations * selectedTier.londc * (selectedTier.referralPct / 100));
  const usdValue = (activations * selectedTier.price * (selectedTier.referralPct / 100)).toFixed(2);

  return (
    <div
      className="rounded-2xl p-8"
      style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
    >
      <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
        REFERRAL EARNINGS CALCULATOR
      </div>
      <h3 className="text-2xl font-black text-white mb-6">How Much Will You Earn?</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>
            YOUR FOLLOWERS
          </label>
          <input
            type="range"
            min={1000}
            max={1000000}
            step={1000}
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value))}
            className="w-full mb-2"
            style={{ accentColor: "#00D4FF" }}
          />
          <div className="text-lg font-bold" style={{ color: "#00D4FF" }}>
            {followers.toLocaleString()}
          </div>
        </div>

        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>
            CONVERSION RATE (%)
          </label>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={convRate}
            onChange={(e) => setConvRate(Number(e.target.value))}
            className="w-full mb-2"
            style={{ accentColor: "#FFB800" }}
          />
          <div className="text-lg font-bold" style={{ color: "#FFB800" }}>
            {convRate}%
          </div>
        </div>

        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>
            YOUR TIER
          </label>
          <div className="flex flex-col gap-2">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: tier === t.id ? `${t.color}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${tier === t.id ? t.color : "rgba(255,255,255,0.1)"}`,
                  color: tier === t.id ? t.color : "#8899AA",
                }}
              >
                {t.icon} {t.name} — {t.referralPct}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div className="text-3xl font-black" style={{ color: "#00D4FF" }}>
            {activations.toLocaleString()}
          </div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
            Guardian Activations
          </div>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="text-3xl font-black" style={{ color: "#FFB800" }}>
            {loncEarned.toLocaleString()}
          </div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
            $LONDC Earned
          </div>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="text-3xl font-black" style={{ color: "#00FF88" }}>
            ${Number(usdValue).toLocaleString()}
          </div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
            USD Equivalent
          </div>
        </div>
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: "#556677" }}>
        * Estimates based on selected tier referral rate and conversion percentage. $LONDC value based on current tier
        pricing. Rewards distributed perpetually — every activation earns forever.
      </p>
    </div>
  );
}

function ApplicationForm() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    instagram: "",
    followers: "",
    niche: "",
    tier: "sovereign",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const applyMutation = trpc.partners.applyAsCreator.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      toast.success("✓ Application submitted! We will review and reach out within 24 hours.");
    },
    onError: (err) => {
      toast.error("Submission failed: " + err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.instagram) {
      toast.error("Please fill in all required fields.");
      return;
    }
    applyMutation.mutate({
      name: form.name,
      email: form.email,
      instagram: form.instagram,
      followers: parseInt(form.followers) || 0,
      niche: form.niche,
      tier: form.tier as "guardian" | "sovereign" | "ascendant",
      bio: form.bio,
    });
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.3)" }}
      >
        <div className="text-5xl mb-4">⚡</div>
        <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>
          APPLICATION RECEIVED
        </div>
        <h3 className="text-2xl font-black text-white mb-3">Welcome to the Sovereign Creator Network</h3>
        <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
          Your application has been transmitted to the ScrollVerse Council. Expect a response within 24 hours. The
          empire is expanding — and you are now part of its foundation.
        </p>
        <div className="text-xs font-mono" style={{ color: "#00FF88" }}>
          KUN FAYAKUN × ∞ — IT IS. AND SO IT IS.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}
    >
      <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
        ONE-CLICK CREATOR APPLICATION
      </div>
      <h3 className="text-2xl font-black text-white mb-6">Apply as a Sovereign Creator</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            FULL NAME *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Chais Kenyatta Hill"
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            EMAIL ADDRESS *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="creator@scrollverse.co"
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            INSTAGRAM HANDLE *
          </label>
          <input
            type="text"
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            placeholder="@chaishill"
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            FOLLOWER COUNT
          </label>
          <input
            type="number"
            value={form.followers}
            onChange={(e) => setForm({ ...form, followers: e.target.value })}
            placeholder="10000"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            YOUR NICHE
          </label>
          <select
            value={form.niche}
            onChange={(e) => setForm({ ...form, niche: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: form.niche ? "white" : "#8899AA",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <option value="">Select your niche</option>
            {NICHES.map((n) => (
              <option key={n} value={n} style={{ background: "#0A1628" }}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
            DESIRED TIER
          </label>
          <select
            value={form.tier}
            onChange={(e) => setForm({ ...form, tier: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {TIERS.map((t) => (
              <option key={t.id} value={t.id} style={{ background: "#0A1628" }}>
                {t.icon} {t.name} — ${t.price} · {t.referralPct}% referral
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>
          YOUR SOVEREIGN VISION (WHY DO YOU WANT TO BUILD WITH US?)
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Tell us your story, your audience, and how you will activate Guardians..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "white",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={applyMutation.isPending}
        className="w-full py-4 rounded-xl font-bold text-sm transition-all"
        style={{
          background: "linear-gradient(135deg, #FFB800, #FF8800)",
          color: "#050B1A",
          opacity: applyMutation.isPending ? 0.7 : 1,
          cursor: applyMutation.isPending ? "not-allowed" : "pointer",
        }}
      >
        {applyMutation.isPending ? "TRANSMITTING APPLICATION..." : "⚡ APPLY AS SOVEREIGN CREATOR"}
      </button>
    </form>
  );
}

export default function Partners() {
  const { data: stats } = trpc.partners.getStats.useQuery();

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
            >
              SV
            </div>
            <span className="font-bold text-white">ScrollVerse</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/referral">
            <span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>
              My Referrals
            </span>
          </Link>
          <Link href="/legion/rewards">
            <span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>
              Rewards
            </span>
          </Link>
          <Link href="/token">
            <button
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF8800)", color: "#050B1A" }}
            >
              Get $LONDC
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, #FFB800 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
            SCROLLVERSE CREATOR PARTNERSHIP HUB
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Where the Meek Meet
            <br />
            <span style={{ color: "#FFB800" }}>the Powers That Be</span>
          </h1>
          <p className="text-xl mb-4" style={{ color: "#8899AA", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
            Equal opportunity to prosper. Transparent and direct to source. Incentivized on impact and contribution.
            Every visit is an investment. Every creator is a sovereign co-owner.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {[
              { label: "Creators Active", value: stats?.totalCreators ?? "∞" },
              { label: "Total Activations", value: stats?.totalActivations ?? "∞" },
              { label: "$LONDC Distributed", value: stats?.totalLonc ?? "∞" },
            ].map((s) => (
              <div
                key={s.label}
                className="px-6 py-3 rounded-xl"
                style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}
              >
                <div className="text-xl font-black" style={{ color: "#FFB800" }}>
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <a href="#apply">
            <button
              className="px-10 py-4 rounded-xl font-black text-lg"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF8800)", color: "#050B1A" }}
            >
              ⚡ Become a Sovereign Creator
            </button>
          </a>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
              PARTNERSHIP TIERS
            </div>
            <h2 className="text-4xl font-black text-white">Choose Your Sovereign Level</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${tier.color}30` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${tier.color}, transparent)` }}
                />
                <div className="text-4xl mb-3">{tier.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: tier.color }}>
                  {tier.referralPct}% REFERRAL RATE
                </div>
                <h3 className="text-2xl font-black text-white mb-1">{tier.name}</h3>
                <div className="text-3xl font-black mb-6" style={{ color: tier.color }}>
                  ${tier.price}
                  <span className="text-sm font-normal text-gray-400 ml-1">one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#AABBCC" }}>
                      <span style={{ color: tier.color, marginTop: "2px", flexShrink: 0 }}>›</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="#apply">
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: `${tier.color}20`, border: `1px solid ${tier.color}60`, color: tier.color }}
                  >
                    Apply as {tier.name}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>
              THE SOVEREIGN CREATOR FLOW
            </div>
            <h2 className="text-4xl font-black text-white">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", desc: "Submit your creator application below. We review within 24 hours.", icon: "📝", color: "#00D4FF" },
              { step: "02", title: "Onboard", desc: "Join as a Guardian, Sovereign, or Ascendant. Receive your referral code.", icon: "🛡️", color: "#FFB800" },
              { step: "03", title: "Activate", desc: "Share your link. Every Guardian you activate earns you $LONDC — forever.", icon: "⚡", color: "#00FF88" },
              { step: "04", title: "Prosper", desc: "Track earnings in real-time on your Legion Rewards dashboard.", icon: "💎", color: "#FF44AA" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: `${s.color}15`, border: `2px solid ${s.color}40` }}
                >
                  {s.icon}
                </div>
                <div className="text-xs font-mono mb-1" style={{ color: s.color }}>
                  STEP {s.step}
                </div>
                <h4 className="font-bold text-white mb-2">{s.title}</h4>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <EarningsCalculator />
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
              JOIN THE SOVEREIGN CREATOR NETWORK
            </div>
            <h2 className="text-4xl font-black text-white mb-3">Apply Now</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              This is not a brand deal. This is co-ownership. You build with us, you own with us.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="text-xs font-mono" style={{ color: "#556677" }}>
          SCROLLVERSE TRINITY · SOVEREIGN CREATOR PARTNERSHIP HUB · BUILT BY CHAIS KENYATTA HILL — SABIR ALLAH THE GREAT
        </div>
        <div className="text-xs font-mono mt-2" style={{ color: "#00D4FF" }}>
          KUN FAYAKUN × ∞ — IT IS. AND SO IT IS.
        </div>
      </footer>
    </div>
  );
}
