/**
 * 1587 CODEX — Physical + Digital Limited Drop
 * The Forbidden Map Fragments — Only 1587 Exist
 * ScrollVerse Trinity
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const TIERS = [
  {
    id: "fragment",
    name: "Fragment",
    price: 158,
    edition: "1587",
    items: ["Digital Codex PDF (144 pages)", "1587 NFT Certificate", "48D protection seal", "Guardian access code"],
    color: "#00D4FF",
    icon: "📜",
  },
  {
    id: "physical",
    name: "Physical Codex",
    price: 444,
    edition: "444",
    items: ["Hardcover physical book", "Digital Codex PDF", "1587 NFT Certificate", "Sacred geometry print (18x24)", "48D protection seal", "First batch ships from Vineland, NJ"],
    color: "#FFB800",
    icon: "📖",
    featured: true,
  },
  {
    id: "sovereign",
    name: "Sovereign Bundle",
    price: 1587,
    edition: "144",
    items: ["Everything in Physical", "Signed by Chais Kenyatta Hill", "Londyn Legacy Lullaby NFT (all 6)", "Guardian Legacy Stories premiere invite", "Direct line to Flame Council", "Eternal archive entry"],
    color: "#00FF88",
    icon: "👑",
  },
];

function CountdownTimer() {
  // Static display — real countdown would use a DB end date
  return (
    <div className="flex items-center gap-4 justify-center">
      {[["07", "DAYS"], ["14", "HRS"], ["33", "MIN"], ["44", "SEC"]].map(([val, label]) => (
        <div key={label} className="text-center">
          <div className="text-2xl font-black font-mono" style={{ color: "#FFB800" }}>{val}</div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function MapFragment() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {/* Animated map visualization */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,184,0,0.3)" }}>
        <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,184,0,0.08) 0%, rgba(5,11,26,0.95) 70%)" }}>
          {/* Grid lines */}
          {[20, 40, 60, 80].map(pct => (
            <div key={`h${pct}`} className="absolute w-full" style={{ top: `${pct}%`, height: 1, background: "rgba(255,184,0,0.08)" }} />
          ))}
          {[20, 40, 60, 80].map(pct => (
            <div key={`v${pct}`} className="absolute h-full" style={{ left: `${pct}%`, width: 1, background: "rgba(255,184,0,0.08)" }} />
          ))}
          {/* Center seal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🗺️</div>
              <div className="text-sm font-mono font-bold" style={{ color: "#FFB800" }}>1587 A.D.</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>THE FORBIDDEN MAP</div>
            </div>
          </div>
          {/* Corner markers */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(pos => (
            <div key={pos} className={`absolute ${pos} w-4 h-4`} style={{ border: "1px solid rgba(255,184,0,0.4)" }} />
          ))}
        </div>
      </div>
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "0 0 60px rgba(255,184,0,0.1)" }} />
    </div>
  );
}

export default function Codex1587() {
  const [selectedTier, setSelectedTier] = useState("physical");
  
  const { isAuthenticated } = useAuth();

  const checkoutMutation = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
      toast("Redirecting to checkout...", { description: "Complete your Codex order on Stripe." });
    },
    onError: () => toast.error("Checkout error", { description: "Please try again." }),
  });

  const handleClaim = (tierId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    const tier = TIERS.find(t => t.id === tierId);
    if (!tier) return;
    checkoutMutation.mutate({
      nftId: `codex_1587_${tierId}`,
      nftName: `1587 Codex — ${tier.name}`,
      nftDescription: "The Forbidden Map fragment. Sacred geometry. 48D protection seal. Limited to 1587.",
      priceCents: tier.price * 100,
      origin: window.location.origin,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,184,0,0.05) 0%, transparent 60%)" }} />

      <div className="relative z-10 container py-8">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>LIMITED PHYSICAL + DIGITAL DROP</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            The 1587 Codex
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The Forbidden Map fragments, transformed into tangible legacy artifacts. Each piece carries 48D protection, sacred geometry, and direct connection to the ScrollVerse legacy. Only 1587 exist.
          </p>

          {/* Countdown */}
          <div className="inline-block rounded-2xl px-8 py-4 mb-6" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>FIRST BATCH SHIPS FROM VINELAND, NJ</div>
            <CountdownTimer />
          </div>

          {/* Supply indicators */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[["1587", "Total Fragments", "#FFB800"], ["444", "Physical Copies", "#00D4FF"], ["144", "Sovereign Bundles", "#00FF88"]].map(([num, label, color]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color }}>{num}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Map visual + description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <MapFragment />
          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>THE FORBIDDEN MAP</div>
            <h2 className="text-2xl font-black text-white mb-4">Ancient Wisdom. Sovereign Legacy.</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
              In 1587, a map was created that was never supposed to exist — one that revealed the true geography of consciousness, the hidden pathways of sovereign power, and the sacred coordinates of humanity's highest potential.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#8899AA" }}>
              The ScrollVerse has decoded these fragments and transformed them into a 144-page Codex — part ancient wisdom, part modern sovereignty blueprint, part NFT-backed legacy artifact.
            </p>
            <div className="space-y-2">
              {["48D quantum protection seal on every copy", "Sacred geometry patterns throughout", "NFT certificate of authenticity on Polygon", "Direct connection to ScrollVerse Guardian network"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#AABBCC" }}>
                  <span style={{ color: "#FFB800" }}>◈</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white text-center mb-8">Choose Your Fragment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map(tier => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className="rounded-2xl p-6 cursor-pointer transition-all duration-300 relative"
                style={{
                  background: selectedTier === tier.id ? `${tier.color}08` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedTier === tier.id ? `${tier.color}40` : "rgba(255,255,255,0.06)"}`,
                  transform: tier.featured ? "scale(1.02)" : "scale(1)",
                }}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-mono px-3 py-1 rounded-full" style={{ background: "#FFB800", color: "#050B1A" }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-3xl mb-3">{tier.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: tier.color }}>{tier.edition} EDITIONS</div>
                <h3 className="text-lg font-black text-white mb-1">{tier.name}</h3>
                <div className="text-3xl font-black mb-4" style={{ color: tier.color }}>${tier.price}</div>
                <ul className="space-y-1.5 mb-6">
                  {tier.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#AABBCC" }}>
                      <span style={{ color: tier.color, marginTop: 2 }}>›</span> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full font-bold rounded-xl"
                  onClick={(e) => { e.stopPropagation(); handleClaim(tier.id); }}
                  disabled={checkoutMutation.isPending}
                  style={{ background: `linear-gradient(135deg, ${tier.color}25, ${tier.color}10)`, border: `1px solid ${tier.color}40`, color: tier.color }}
                >
                  {checkoutMutation.isPending ? "Processing..." : `Claim ${tier.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            SCROLL VERSE LLC · EIN 42-2509570 · First batch ships from Vineland, NJ 08360 · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
