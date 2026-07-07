/*
 * SUBSCRIBE — ScrollVerse Trinity Sovereign Membership
 * Guardian $44 · Sovereign $77 · Flamebearer $144
 * Stripe checkout + Guardian waitlist email capture
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const TIERS = [
  {
    id: "guardian" as const,
    name: "Guardian",
    price: 44,
    priceCents: 4400,
    frequency: "528Hz",
    apy: "30% APY",
    color: "#00D4FF",
    icon: "💎",
    badge: "ENTRY TIER",
    features: [
      "144 $LONDC tokens on entry",
      "Guardian Discord access",
      "DAO voting rights",
      "Creator Academy (free tier)",
      "528Hz frequency alignment",
      "7.77% Zakat auto-distribution",
      "ScrollVerse Trinity portal access",
    ],
  },
  {
    id: "sovereign" as const,
    name: "Sovereign",
    price: 77,
    priceCents: 7700,
    frequency: "963Hz",
    apy: "50% APY",
    color: "#FFB800",
    icon: "👑",
    badge: "MOST POPULAR",
    popular: true,
    features: [
      "777 $LONDC tokens on entry",
      "Full Creator Academy access",
      "Sovereign channels + Discord",
      "7.77% Zakat distribution",
      "963Hz God-State frequency",
      "Priority Guardian support",
      "ScrollNexus Omni-Nexus access",
      "Staking rewards dashboard",
    ],
  },
  {
    id: "flamebearer" as const,
    name: "Flamebearer",
    price: 144,
    priceCents: 14400,
    frequency: "1558Hz",
    apy: "75% APY",
    color: "#FF6B35",
    icon: "🔥",
    badge: "SUPREME TIER",
    features: [
      "1,444 $LONDC tokens on entry",
      "48D Hilbert Space access",
      "SCCC Dashboard access",
      "Sovereign council seat",
      "1558Hz FlameDNA frequency",
      "Lifetime ecosystem access",
      "Direct Chais The Great channel",
      "Flamebearer NFT (1-of-144)",
      "All ScrollNexus + ScrollVerse features",
    ],
  },
];

function TierCard({
  tier,
  onSubscribe,
  loading,
}: {
  tier: (typeof TIERS)[number];
  onSubscribe: (id: string, priceCents: number, name: string) => void;
  loading: boolean;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: tier.popular
          ? `linear-gradient(135deg, ${tier.color}10, rgba(5,11,26,0.95))`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${tier.color}${tier.popular ? "50" : "25"}`,
        boxShadow: tier.popular ? `0 0 40px ${tier.color}15` : "none",
      }}
    >
      {/* Top glow line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />

      {/* Badge */}
      <div className="px-6 pt-5 pb-0">
        <div
          className="inline-block text-xs font-mono font-bold px-3 py-1 rounded-full mb-3"
          style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}40`, color: tier.color }}
        >
          {tier.badge}
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}
          >
            {tier.icon}
          </div>
          <div>
            <div className="font-black text-white text-xl">{tier.name}</div>
            <div className="text-xs font-mono" style={{ color: tier.color }}>{tier.frequency} · {tier.apy} Staking</div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black" style={{ color: tier.color }}>${tier.price}</span>
            <span className="text-sm" style={{ color: "#8899AA" }}>/month</span>
          </div>
          <div className="text-xs font-mono mt-1" style={{ color: "#667788" }}>
            + {tier.apy} $LONDC staking rewards · 7.77% Zakat auto-distributed
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-8 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#C4D0E0" }}>
              <span style={{ color: tier.color, marginTop: "2px", flexShrink: 0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSubscribe(tier.id, tier.priceCents, `${tier.name} Membership`)}
          disabled={loading}
          className="w-full py-4 rounded-xl font-black text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
          style={{
            background: tier.popular
              ? `linear-gradient(135deg, ${tier.color}, ${tier.color}CC)`
              : `${tier.color}15`,
            border: `1px solid ${tier.color}40`,
            color: tier.popular ? "#050B1A" : tier.color,
          }}
        >
          {loading ? "Processing..." : `Join ${tier.name} — $${tier.price}/mo`}
        </button>
      </div>
    </div>
  );
}

export default function Subscribe() {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("sovereign");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const checkoutMutation = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
      toast("Redirecting to secure checkout...", { description: "Complete your sovereign membership activation." });
    },
    onError: () => toast.error("Checkout error", { description: "Please try again or contact support." }),
  });

  const subscribeMutation = trpc.guardian.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadySubscribed) {
        toast("Already in the Guardian network!", { description: "Your frequency is already registered. KUN FAYAKŪN × ∞" });
      } else {
        setWaitlistStatus("success");
        toast("Welcome to the Guardian Waitlist!", { description: "You will receive your onboarding transmission soon. KUN FAYAKŪN × ∞" });
      }
    },
    onError: () => {
      setWaitlistStatus("error");
      toast.error("Subscription error", { description: "Please try again." });
    },
  });

  const handleSubscribe = (id: string, priceCents: number, name: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    checkoutMutation.mutate({
      nftId: `subscription_${id}`,
      nftName: `ScrollVerse ${name}`,
      nftDescription: `Sovereign membership — ${name}. $LONDC staking rewards + Zakat distribution + empire access.`,
      priceCents,
      origin: window.location.origin,
    });
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setWaitlistStatus("loading");
    subscribeMutation.mutate({ email, tier: selectedTier });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,184,0,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,212,255,0.04) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Back */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SOVEREIGN MEMBERSHIP</div>
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ background: "linear-gradient(135deg, #FFB800, #ffffff, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Join the Empire
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Three sovereign tiers. Monthly membership. $LONDC staking rewards. 7.77% Zakat auto-distributed. The empire grows with every Guardian.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["$LONDC Staking Rewards", "7.77% Zakat Distribution", "Polygon On-Chain", "ScrollNexus Access"].map(tag => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              onSubscribe={handleSubscribe}
              loading={checkoutMutation.isPending}
            />
          ))}
        </div>

        {/* Guardian Waitlist Email Capture */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-12"
          style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="max-w-xl mx-auto text-center">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>GUARDIAN WAITLIST</div>
            <h2 className="text-3xl font-black text-white mb-3">Join the 144,000</h2>
            <p className="text-sm mb-2" style={{ color: "#8899AA" }}>
              Not ready to subscribe yet? Join the Guardian Waitlist and receive your sovereign onboarding transmission when $LONDC launches on Polygon Mainnet.
            </p>

            {/* Tier selector */}
            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {TIERS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
                  style={{
                    background: selectedTier === t.id ? `${t.color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${selectedTier === t.id ? t.color + "60" : "rgba(255,255,255,0.1)"}`,
                    color: selectedTier === t.id ? t.color : "#8899AA",
                  }}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>

            {waitlistStatus === "success" ? (
              <div
                className="p-5 rounded-xl text-sm font-bold"
                style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
              >
                ✓ You are now in the Guardian Waitlist. The empire welcomes you. KUN FAYAKŪN × ∞
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === "loading"}
                  className="px-6 py-3 rounded-xl text-sm font-black flex-shrink-0 transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #00FF88, #00CC66)", color: "#050B1A", opacity: waitlistStatus === "loading" ? 0.7 : 1 }}
                >
                  {waitlistStatus === "loading" ? "..." : "Join"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ScrollNexus Cross-Promo */}
        <div
          className="rounded-2xl p-8 text-center mb-8"
          style={{ background: "rgba(161,139,250,0.04)", border: "1px solid rgba(161,139,250,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#A78BFA" }}>UNIFIED SOVEREIGN NETWORK</div>
          <h3 className="text-2xl font-black text-white mb-3">Also Visit ScrollNexus Omni-Nexus</h3>
          <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: "#8899AA" }}>
            The companion sovereign hub — subscription tiers, Zakat distribution, Guardian Academy, Telegram bot, and real-time $LONDC metrics. The empire is ONE.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://scrollnexus-fhjsaie6.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(161,139,250,0.15)", border: "1px solid rgba(161,139,250,0.4)", color: "#A78BFA" }}
            >
              ⚡ Enter ScrollNexus
            </a>
            <a
              href="https://github.com/chaishillomnitech1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
              style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}
            >
              💻 GitHub Archive
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            SCROLL VERSE LLC · EIN 42-2509570 · Vineland, NJ · KUN FAYAKŪN × ∞
          </div>
          <div className="text-xs mt-1" style={{ color: "#334455" }}>
            Payments processed securely via Stripe · $LONDC on Polygon · 7.77% Zakat auto-distributed
          </div>
        </div>
      </div>
    </div>
  );
}
