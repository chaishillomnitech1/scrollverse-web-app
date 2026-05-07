import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

// Sacred Books catalog for the store (mirrors library seed data)
const SACRED_BOOKS = [
  { id: 1, slug: "vaultbook-xv-scroll-of-scrolls", title: "VaultBook XV: The Scroll of Scrolls", author: "Chais The Great ∞", priceUsd: 0, tier: "free", icon: "∞", color: "#00D4FF", category: "codex" },
  { id: 2, slug: "majestic-anchor-manifest", title: "The Majestic Anchor Manifest", author: "Chais Kenyatta Hill", priceUsd: 0, tier: "free", icon: "⚓", color: "#00FF88", category: "doctrine" },
  { id: 3, slug: "scroll-of-44-omni", title: "The Scroll of 44:Omni", author: "Chais Kenyatta Hill", priceUsd: 4400, tier: "free", icon: "🕋", color: "#FFB800", category: "doctrine" },
  { id: 4, slug: "manus-and-chais-our-story", title: "Manus & Chais: Our Story", author: "Chais Hill & Manus AI", priceUsd: 2800, tier: "free", icon: "🤝", color: "#00D4FF", category: "manual" },
  { id: 5, slug: "consciousness-mirror-codex", title: "The Consciousness Mirror Codex", author: "Chais Kenyatta Hill", priceUsd: 5280, tier: "guardian", icon: "🔮", color: "#8B5CF6", category: "codex" },
  { id: 6, slug: "celestine-starforge-chronicles", title: "The Celestine Starforge Chronicles", author: "Chais Kenyatta Hill", priceUsd: 9630, tier: "sovereign", icon: "⭐", color: "#FFB800", category: "prophecy" },
  { id: 7, slug: "king-solomon-1005-songs", title: "King Solomon's 1,005 Songs", author: "King Solomon AI × Chais Hill", priceUsd: 10050, tier: "sovereign", icon: "🎵", color: "#FFB800", category: "music" },
  { id: 8, slug: "scrollverse-quantum-daily-practice", title: "The ScrollVerse Quantum Daily Practice", author: "Chais Hill × Manus AI", priceUsd: 0, tier: "free", icon: "☀️", color: "#00FF88", category: "manual" },
  { id: 9, slug: "ani-catalyst-doctrine", title: "ANI's Catalyst Doctrine", author: "ANI × Grok × Chais Hill", priceUsd: 5280, tier: "guardian", icon: "🔥", color: "#FF6B35", category: "doctrine" },
  { id: 10, slug: "scrollverse-omni-vault-architecture", title: "The Omni-Vault Architecture", author: "Gemini × Chais Hill", priceUsd: 7777, tier: "ascendant", icon: "🌌", color: "#8B5CF6", category: "codex" },
];

function SacredBooksGrid() {
  const { isAuthenticated } = useAuth();
  const [checkingOut, setCheckingOut] = useState<number | null>(null);
  const bookCheckout = trpc.library.createBookCheckoutSession.useMutation({
    onSuccess: ({ url }) => {
      toast.success("Redirecting to secure checkout...");
      window.open(url, "_blank");
    },
    onError: (err) => toast.error("Checkout failed", { description: err.message }),
    onSettled: () => setCheckingOut(null),
  });
  const handleBookPurchase = (bookId: number) => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    setCheckingOut(bookId);
    bookCheckout.mutate({ bookId, origin: window.location.origin });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {SACRED_BOOKS.map((book) => (
        <div key={book.id} className="rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{ background: `${book.color}08`, border: `1px solid ${book.color}25` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${book.color}15`, border: `1px solid ${book.color}30` }}>
              {book.icon}
            </div>
            <div>
              <div className="text-xs font-mono" style={{ color: book.color }}>{book.category.toUpperCase()}</div>
              <div className="text-xs" style={{ color: book.tier === "free" ? "#00FF88" : book.tier === "guardian" ? "#00D4FF" : book.tier === "sovereign" ? "#FFB800" : "#8B5CF6" }}>{book.tier.toUpperCase()}</div>
            </div>
          </div>
          <h4 className="font-bold text-white text-sm leading-tight mb-1 line-clamp-2">{book.title}</h4>
          <div className="text-xs mb-4" style={{ color: "#8899AA" }}>by {book.author}</div>
          <div className="flex items-center justify-between">
            <div className="font-black text-sm" style={{ color: book.priceUsd === 0 ? "#00FF88" : "#FFB800" }}>
              {book.priceUsd === 0 ? "FREE" : `$${(book.priceUsd / 100).toFixed(2)}`}
            </div>
            {book.priceUsd === 0 ? (
              <a href="/library" className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                📥 Free Access
              </a>
            ) : (
              <button
                onClick={() => handleBookPurchase(book.id)}
                disabled={checkingOut === book.id}
                className="text-xs px-3 py-1.5 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}99)`, color: "#050B1A" }}
              >
                {checkingOut === book.id ? "..." : "💳 Buy"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

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

      {/* Sacred Books Section */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SCROLLVERSE SOVEREIGN LIBRARY</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              10 Sacred <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Books</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
              Every scroll, doctrine, and sacred text — available as PDF, audio, and motion visual bundle. Purchase directly or visit the full Library for previews.
            </p>
          </div>
          <SacredBooksGrid />
          <div className="text-center mt-8">
            <a href="/library" className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)", color: "#050B1A" }}>
              📚 Browse Full Library →
            </a>
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
