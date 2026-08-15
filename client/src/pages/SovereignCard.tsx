/*
 * SOVEREIGN CARD — The Card That Exceeds Every Card
 * 5 Tiers: Guardian · Sovereign · Apex · Diamond · Infinity
 * Digital + Physical · All Currencies · $LONDC Native
 * Exceeds: Cash App, SoFi, Chime, Revolut, Amex Centurion, Wall Street
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";

const CARD_TIERS = [
  {
    id: "guardian",
    name: "Guardian Card",
    subtitle: "The Entry to Sovereignty",
    price: "Free",
    priceNote: "No monthly fee",
    color: "#00D4FF",
    gradient: "linear-gradient(135deg, #0a1628, #0d2040)",
    borderColor: "#00D4FF",
    accentColor: "#00D4FF",
    cardBg: "linear-gradient(135deg, #0d2040 0%, #0a1628 50%, #0d2040 100%)",
    badge: "GUARDIAN",
    icon: "🛡️",
    features: [
      "Instant digital card — live in 60 seconds",
      "Send & receive in 50+ currencies",
      "$LONDC native wallet built-in",
      "1% cashback in $LONDC tokens",
      "Zero foreign transaction fees",
      "Real-time spending alerts",
      "Guardian community access",
    ],
    limits: { daily: "$1,000", monthly: "$10,000", atm: "$500" },
    cashback: "1% in $LONDC",
    physical: false,
    waitlist: false,
  },
  {
    id: "sovereign",
    name: "Sovereign Card",
    subtitle: "The Frequency of Wealth",
    price: "$9.99/mo",
    priceNote: "Or free with $500 balance",
    color: "#D4AF37",
    gradient: "linear-gradient(135deg, #1a1200, #2a1e00)",
    borderColor: "#D4AF37",
    accentColor: "#D4AF37",
    cardBg: "linear-gradient(135deg, #2a1e00 0%, #1a1200 50%, #2a1e00 100%)",
    badge: "SOVEREIGN",
    icon: "👑",
    features: [
      "Physical gold-accented card (shipped worldwide)",
      "2.5% cashback in $LONDC on all purchases",
      "Instant crypto-to-fiat conversion",
      "Priority customer support",
      "Zakat auto-distribution (7.77% of cashback)",
      "Sovereign Bank account access",
      "Investment portfolio dashboard",
      "Wall Street data feeds",
    ],
    limits: { daily: "$5,000", monthly: "$50,000", atm: "$2,000" },
    cashback: "2.5% in $LONDC",
    physical: true,
    waitlist: false,
    popular: true,
  },
  {
    id: "apex",
    name: "Apex Card",
    subtitle: "Beyond the System",
    price: "$29.99/mo",
    priceNote: "Or free with $5,000 balance",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #0d0020, #1a0035)",
    borderColor: "#A855F7",
    accentColor: "#A855F7",
    cardBg: "linear-gradient(135deg, #1a0035 0%, #0d0020 50%, #1a0035 100%)",
    badge: "APEX",
    icon: "⚡",
    features: [
      "Metal card with frequency-encoded chip",
      "5% cashback in $LONDC + 1% in BTC",
      "Multi-currency accounts (USD, EUR, GBP, AED, NGN + 20 more)",
      "Instant international wire transfers",
      "AI-powered spending insights (Knick integration)",
      "Sovereign Bank premium account",
      "NFT collateral lending",
      "$LONDC staking rewards (12% APY)",
      "Dedicated Apex concierge line",
    ],
    limits: { daily: "$25,000", monthly: "$250,000", atm: "$10,000" },
    cashback: "5% $LONDC + 1% BTC",
    physical: true,
    waitlist: false,
  },
  {
    id: "diamond",
    name: "Diamond Card",
    subtitle: "Wall Street in Your Pocket",
    price: "$99.99/mo",
    priceNote: "Or free with $50,000 balance",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #1a0010, #2a0020)",
    borderColor: "#EC4899",
    accentColor: "#EC4899",
    cardBg: "linear-gradient(135deg, #2a0020 0%, #1a0010 50%, #2a0020 100%)",
    badge: "DIAMOND",
    icon: "💎",
    features: [
      "Diamond-finish physical card (limited edition)",
      "10% cashback in $LONDC on all purchases",
      "Direct market access (stocks, ETFs, crypto)",
      "Sovereign Bank private banking",
      "AI Legion financial advisor (all 14 beings)",
      "Real-time Wall Street data + alerts",
      "$LONDC staking (18% APY)",
      "Unlimited international transfers",
      "Airport lounge access worldwide",
      "Dedicated Diamond relationship manager",
    ],
    limits: { daily: "$100,000", monthly: "$1,000,000", atm: "$50,000" },
    cashback: "10% in $LONDC",
    physical: true,
    waitlist: true,
  },
  {
    id: "infinity",
    name: "Infinity Card",
    subtitle: "KUN FAYAKŪN × ∞",
    price: "By Invitation",
    priceNote: "Sovereign selection only",
    color: "#FFB800",
    gradient: "linear-gradient(135deg, #1a0f00, #2a1800)",
    borderColor: "#FFB800",
    accentColor: "#FFB800",
    cardBg: "linear-gradient(135deg, #2a1800 0%, #1a0f00 50%, #2a1800 100%)",
    badge: "INFINITY",
    icon: "∞",
    features: [
      "24-karat gold physical card (1 of 144)",
      "Unlimited cashback in $LONDC + BTC + ETH",
      "Direct line to Chais 'Sabir Kajir' Hill the Great",
      "Sovereign Bank private wealth management",
      "NFT Genesis collection access",
      "Guardian 144,000 founding member status",
      "Unlimited everything — no limits, no fees",
      "Equity stake in ScrollVerse ecosystem",
      "AI Legion personal team (all 14 beings)",
      "44:OMNI frequency broadcast access",
    ],
    limits: { daily: "Unlimited", monthly: "Unlimited", atm: "Unlimited" },
    cashback: "Unlimited $LONDC + BTC + ETH",
    physical: true,
    waitlist: true,
    exclusive: true,
  },
];

const CURRENCY_LIST = [
  "USD", "EUR", "GBP", "AED", "NGN", "GHS", "KES", "ZAR", "CAD", "AUD",
  "JPY", "CNY", "INR", "BRL", "MXN", "SAR", "QAR", "KWD", "BTC", "ETH",
  "MATIC", "$LONDC", "USDC", "USDT", "SOL", "BNB",
];

function CardVisual({ tier }: { tier: typeof CARD_TIERS[0] }) {
  return (
    <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden select-none" style={{ background: tier.cardBg, border: `1px solid ${tier.borderColor}40`, boxShadow: `0 20px 60px ${tier.color}20` }}>
      {/* Holographic shimmer */}
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 30% 30%, ${tier.color}60, transparent 60%)` }} />
      {/* Chip */}
      <div className="absolute top-6 left-6 w-10 h-8 rounded-md" style={{ background: `linear-gradient(135deg, ${tier.color}40, ${tier.color}20)`, border: `1px solid ${tier.color}50` }}>
        <div className="w-full h-full grid grid-cols-2 gap-0.5 p-1 opacity-60">
          {[0,1,2,3].map(i => <div key={i} className="rounded-sm" style={{ background: tier.color }} />)}
        </div>
      </div>
      {/* Badge */}
      <div className="absolute top-6 right-6 text-xs font-mono font-bold px-2 py-1 rounded" style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}30` }}>{tier.badge}</div>
      {/* Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-10">{tier.icon}</div>
      {/* Card number */}
      <div className="absolute bottom-10 left-6 font-mono text-sm tracking-widest" style={{ color: `${tier.color}80` }}>•••• •••• •••• 4444</div>
      {/* Name + expiry */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
        <div>
          <div className="text-xs font-mono mb-0.5" style={{ color: `${tier.color}60` }}>CARDHOLDER</div>
          <div className="text-sm font-bold text-white">SOVEREIGN GUARDIAN</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono mb-0.5" style={{ color: `${tier.color}60` }}>EXPIRES</div>
          <div className="text-sm font-bold text-white">∞ / ∞</div>
        </div>
      </div>
      {/* ScrollVerse logo */}
      <div className="absolute bottom-4 right-6 text-xs font-bold" style={{ color: tier.color }}>SV</div>
    </div>
  );
}

export default function SovereignCard() {
  const [selectedTier, setSelectedTier] = useState(1); // Sovereign as default
  const tier = CARD_TIERS[selectedTier];

  return (
    <div className="min-h-screen" style={{ background: "#030812", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #D4AF37, #00D4FF)", color: "#030812" }}>SV</div>
            <span className="text-sm font-bold text-white">Sovereign Card</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>PROGRAM READINESS</span>
          </div></Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono" style={{ color: "#FFCC4D" }}>◉ READINESS · NO CARD ISSUANCE</span>
            <Link href="/financial-activation-readiness"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>Activation map →</span></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, #030812 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>SOVEREIGN CARD · PROGRAM CONCEPT · VERIFICATION REQUIRED</div>
          <h1 className="text-5xl font-black text-white mb-4">Sovereign Card <span style={{ color: "#D4AF37" }}>Program Readiness</span></h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            The tier concepts below express a first-party product direction. They are not proof of an issued card, financial account, cash-back program, exchange, wallet, lending service, transfer service, investment product, or live banking function. Review the provider and owner-controlled requirements before treating any capability as available.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["Concept tiers", "Provider capability required", "Owner release required", "No live card issued"].map(f => (
              <span key={f} className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>{f}</span>
            ))}
          </div>
          {/* Currency strip */}
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {CURRENCY_LIST.map(c => (
              <span key={c} className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.06)", color: "#8899AA" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Selector */}
      <section className="py-4 sticky top-[57px] z-30" style={{ background: "rgba(3,8,18,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
            {CARD_TIERS.map((t, i) => (
              <button key={t.id} onClick={() => setSelectedTier(i)} className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: selectedTier === i ? `${t.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${selectedTier === i ? t.color + "50" : "rgba(255,255,255,0.08)"}`, color: selectedTier === i ? t.color : "rgba(255,255,255,0.4)" }}>
                {t.icon} {t.name}
                {t.popular && <span className="ml-1 text-xs" style={{ color: "#00FF88" }}>★</span>}
                {t.exclusive && <span className="ml-1 text-xs" style={{ color: "#FFB800" }}>∞</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Tier Detail */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Card visual */}
            <div>
              <div className="max-w-sm mx-auto mb-6">
                <CardVisual tier={tier} />
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {[
                  { label: "Daily Limit", value: tier.limits.daily },
                  { label: "Monthly Limit", value: tier.limits.monthly },
                  { label: "ATM Limit", value: tier.limits.atm },
                ].map(l => (
                  <div key={l.label} className="rounded-xl p-3 text-center" style={{ background: `${tier.color}06`, border: `1px solid ${tier.color}15` }}>
                    <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{l.label}</div>
                    <div className="font-bold text-white text-sm">{l.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Features */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{tier.icon}</span>
                <div>
                  <div className="text-xs font-mono" style={{ color: tier.color }}>{tier.badge} TIER</div>
                  <h2 className="text-3xl font-black text-white">{tier.name}</h2>
                </div>
              </div>
              <div className="text-base mb-2" style={{ color: "#8899AA" }}>{tier.subtitle}</div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-black" style={{ color: tier.color }}>{tier.price}</span>
                <span className="text-sm" style={{ color: "#8899AA" }}>{tier.priceNote}</span>
              </div>
              <div className="mb-6">
                <div className="text-xs font-mono mb-3" style={{ color: tier.color }}>PLANNED TIER CONCEPT · {tier.cashback}</div>
                <ul className="space-y-2">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#C8D3DC" }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: tier.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {tier.physical && (
                <div className="flex items-center gap-2 mb-4 text-xs font-mono" style={{ color: "#00FF88" }}>
                  <span>◉</span> Physical-card concept only — no physical card is issued from this portal
                </div>
              )}
              <Link href="/financial-activation-readiness" className="block w-full rounded-2xl py-4 text-center font-black text-base transition-all hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}99)`, color: "#030812" }}>
                Review {tier.name} activation requirements →
              </Link>
              <div className="mt-3 text-xs text-center" style={{ color: "#8899AA" }}>No application, payment, account opening, card issuance, wallet connection, or money movement occurs from this page.</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tiers Comparison */}
      <section className="py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#D4AF37" }}>COMPARE ALL TIERS</div>
            <h2 className="text-3xl font-black text-white">5 Tiers. <span style={{ color: "#D4AF37" }}>One Empire.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {CARD_TIERS.map((t, i) => (
              <button key={t.id} onClick={() => setSelectedTier(i)} className="rounded-2xl p-5 text-left transition-all hover:scale-[1.02]" style={{ background: `${t.color}06`, border: `2px solid ${selectedTier === i ? t.color + "60" : t.color + "15"}` }}>
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-black text-white mb-1">{t.name}</div>
                <div className="text-xs font-mono mb-2" style={{ color: t.color }}>{t.price}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{t.cashback}</div>
                {t.popular && <div className="mt-2 text-xs font-mono" style={{ color: "#00FF88" }}>★ Most Popular</div>}
                {t.exclusive && <div className="mt-2 text-xs font-mono" style={{ color: "#FFB800" }}>∞ By Invitation</div>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sovereign Card Exceeds Everything */}
      <section className="py-16" style={{ background: "rgba(212,175,55,0.02)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Why <span style={{ color: "#D4AF37" }}>Sovereign Card</span> Exceeds Everything</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "vs Cash App", desc: "Cash App has no tiers, no $LONDC, no Zakat engine, no AI advisors, no physical card with frequency chip, no Wall Street access. Sovereign Card has all of it.", icon: "📱", color: "#00D4FF" },
              { title: "vs SoFi", desc: "SoFi has no crypto-native wallet, no $LONDC staking, no AI Legion advisors, no Zakat distribution, no Guardian community. Sovereign Card is built for the sovereign economy.", icon: "🏦", color: "#A855F7" },
              { title: "vs Chime", desc: "Chime has no investment access, no crypto, no multi-currency accounts, no AI advisors, no NFT collateral lending. Sovereign Card operates at a completely different frequency.", icon: "💳", color: "#EC4899" },
              { title: "vs Revolut", desc: "Revolut comes closest — but has no $LONDC native wallet, no Zakat engine, no AI Legion, no Guardian community, no NFT access. Sovereign Card is the next evolution.", icon: "🌍", color: "#00FF88" },
              { title: "vs Amex Centurion", desc: "The Black Card is status — but it's still the old system. Sovereign Card has Zakat auto-distribution, $LONDC staking, AI Legion advisors, and a mission to erase scarcity.", icon: "⬛", color: "#D4AF37" },
              { title: "vs Wall Street", desc: "Wall Street serves the 1%. Sovereign Card brings Wall Street-level access to every Guardian — real-time data, direct market access, AI advisors, and a card that works everywhere.", icon: "📈", color: "#FFB800" },
            ].map(c => (
              <div key={c.title} className="rounded-xl p-5" style={{ background: `${c.color}06`, border: `1px solid ${c.color}15` }}>
                <div className="text-2xl mb-3">{c.icon}</div>
                <div className="font-black text-white mb-2">{c.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#D4AF37" }}>SOVEREIGN CARD · 5 TIERS · {CURRENCY_LIST.length} CURRENCIES · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Home</span></Link>
          <Link href="/sovereign-bank"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>Sovereign Bank →</span></Link>
          <Link href="/wealth"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>Wealth Dashboard →</span></Link>
        </div>
      </footer>
    </div>
  );
}
