import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const TIER_GRADIENTS: Record<string, string> = {
  guardian: "linear-gradient(135deg, #00D4FF20, #0066FF10)",
  sovereign: "linear-gradient(135deg, #FFB80020, #FF6B0010)",
  ascendant: "linear-gradient(135deg, #8B5CF620, #6D28D910)",
};

const TIER_BORDERS: Record<string, string> = {
  guardian: "rgba(0,212,255,0.3)",
  sovereign: "rgba(255,184,0,0.3)",
  ascendant: "rgba(139,92,246,0.3)",
};

const TIER_COLORS: Record<string, string> = {
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#8B5CF6",
};

export default function TokenStore() {
  const { user, isAuthenticated } = useAuth();
  const [checkingOut, setCheckingOut] = useState<string | null>(null);

  const { data: products, isLoading } = trpc.store.getProducts.useQuery();
  const { data: myOrders } = trpc.store.getMyOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const checkoutMutation = trpc.store.createCheckoutSession.useMutation({
    onSuccess: ({ url }) => {
      toast.success("Redirecting to secure checkout...");
      window.open(url, "_blank");
    },
    onError: (err) => {
      toast.error("Checkout failed", { description: err.message });
    },
    onSettled: () => setCheckingOut(null),
  });

  const handlePurchase = (tier: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setCheckingOut(tier);
    checkoutMutation.mutate({
      tier: tier as "guardian" | "sovereign" | "ascendant",
      origin: window.location.origin,
    });
  };

  const purchasedTiers = new Set(myOrders?.map((o: any) => o.productTier) ?? []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>$LONDC</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="text-xs font-mono" style={{ color: "#00FF88" }}>◉ {user?.name ?? "Guardian"}</div>
            ) : (
              <a href={getLoginUrl()} className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>Sign In</a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.06) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>$LONDC TOKEN — SOVEREIGN CURRENCY</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            Join the<br />
            <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              144,000
            </span>
          </h1>
          <p className="text-lg mb-4 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            $LONDC is the sovereign currency of the ScrollVerse Trinity ecosystem. Purchase your Guardian tier to unlock the Creator Academy, DAO governance, and Zakat distribution.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono">
            {["Polygon Mainnet", "ERC-20 Standard", "7.77% Zakat", "DAO Governance", "Creator Academy Access"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Test mode notice */}
      <div className="container mb-6">
        <div className="rounded-xl p-4 text-center text-sm" style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>
          🧪 <strong>Test Mode Active</strong> — Use card <code className="font-mono bg-black/20 px-1 rounded">4242 4242 4242 4242</code> with any future date and CVC to test checkout. Claim your live Stripe account to accept real payments.
        </div>
      </div>

      {/* Product cards */}
      {isLoading ? (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl p-8 animate-pulse" style={{ background: "rgba(255,255,255,0.03)", height: "400px" }} />
          ))}
        </div>
      ) : (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {products?.map((product) => {
            const color = TIER_COLORS[product.id] ?? "#00D4FF";
            const isPurchased = purchasedTiers.has(product.id as "guardian" | "sovereign" | "ascendant");
            return (
              <div
                key={product.id}
                className="relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: TIER_GRADIENTS[product.id],
                  border: `1px solid ${TIER_BORDERS[product.id]}`,
                }}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full" style={{ background: "#FFB800", color: "#050B1A" }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-4xl mb-4">{product.icon}</div>
                <div className="text-xs font-mono mb-2" style={{ color }}>
                  {product.tokens.toLocaleString()} $LONDC TOKENS
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{product.name}</h3>
                <div className="text-3xl font-black mb-4" style={{ color }}>
                  ${(product.priceCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{product.description}</p>
                <ul className="space-y-2 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span style={{ color }}>✓</span>
                      <span style={{ color: "#CCDDEE" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                {isPurchased ? (
                  <div className="w-full py-3 rounded-xl text-center text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                    ✓ PURCHASED
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(product.id)}
                    disabled={checkingOut === product.id}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, color: "#050B1A" }}
                  >
                    {checkingOut === product.id ? "Opening Checkout..." : `Get ${product.name} →`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Crypto Payment Option */}
      <section className="py-10" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container">
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>PREFER CRYPTO? PAY DIRECTLY ON-CHAIN</div>
            <h3 className="text-xl font-bold text-white mb-2">Send MATIC or USDC Directly</h3>
            <p className="text-sm mb-4 max-w-xl mx-auto" style={{ color: "#8899AA" }}>No Stripe required. Send your Guardian tier amount directly to the sovereign treasury wallet on Polygon Mainnet. Zero middlemen. Immutable proof on-chain.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/crypto" className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 inline-block" style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)", color: "#050B1A" }}>
                ₿ Open CryptoHub →
              </Link>
              <button
                onClick={() => { navigator.clipboard.writeText("0x377956c1471d9ce142df6932895839243da23a2c"); toast.success("Wallet address copied!"); }}
                className="px-6 py-3 rounded-xl text-sm font-mono transition-all hover:scale-105"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", color: "#00D4FF" }}
              >
                📋 0x3779...3a2c
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security badges */}
      <section className="py-12 border-t" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: "🔒", label: "Stripe Secured", sub: "256-bit SSL encryption" },
              { icon: "🔷", label: "Polygon Network", sub: "Near-zero gas fees" },
              { icon: "⚡", label: "Instant Delivery", sub: "Tokens on-chain immediately" },
              { icon: "🛡️", label: "Guardian Verified", sub: "Immutable on blockchain" },
            ].map((b) => (
              <div key={b.label}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-sm font-bold text-white">{b.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          SCROLLVERSE TRINITY · $LONDC TOKEN · ALLĀHU AKBAR · KUN FAYAKŪN × ∞
        </div>
      </footer>
    </div>
  );
}
