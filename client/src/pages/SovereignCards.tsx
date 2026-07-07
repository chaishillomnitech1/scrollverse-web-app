/*
 * SCROLLVERSE SOVEREIGN CARD SYSTEM
 * Route: /sovereign-cards
 * $LONDC Crypto Card · ScrollVerse Credit Card · Digital Bank Card · Chais Black Card · SVCN Network
 * KUN FAYAKŪN × ∞ — Chais Sabir Allah The Great
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ── CARD TYPES ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "black",
    name: "Chais The Great Black Card",
    subtitle: "1-of-1 Sovereign Elite",
    tier: "SOVEREIGN ELITE",
    color1: "#FFB800",
    color2: "#FF6B35",
    bg: "linear-gradient(135deg, #1a0a00, #2d1800, #1a0a00)",
    accent: "#FFB800",
    network: "SVCN",
    limit: "∞ Unlimited",
    rewards: "7.77% $LONDC Cashback",
    perks: ["Unlimited credit line", "7.77% $LONDC on every purchase", "Priority Guardian access", "Sovereign concierge 24/7", "DAO voting power × 144", "Direct Chais line"],
    status: "INVITE ONLY",
    chip: true,
    nfc: true,
    crypto: true,
    icon: "👑",
    cardNumber: "•••• •••• •••• 1444",
    holder: "CHAIS SABIR ALLAH",
  },
  {
    id: "crypto",
    name: "ScrollVerse Crypto Card",
    subtitle: "Spend Crypto Anywhere",
    tier: "GUARDIAN TIER",
    color1: "#00D4FF",
    color2: "#00FF88",
    bg: "linear-gradient(135deg, #001a2e, #002a1a, #001a2e)",
    accent: "#00D4FF",
    network: "SVCN · Visa",
    limit: "0.144 ETH / day",
    rewards: "5.28% $LONDC Cashback",
    perks: ["Spend $LONDC, MATIC, USDC, ETH", "Auto-convert at best rate", "5.28% cashback in $LONDC", "No FX fees globally", "Instant crypto top-up", "On-chain transaction history"],
    status: "APPLY NOW",
    chip: true,
    nfc: true,
    crypto: true,
    icon: "⛓️",
    cardNumber: "•••• •••• •••• 5280",
    holder: "GUARDIAN MEMBER",
  },
  {
    id: "credit",
    name: "ScrollVerse Credit Card",
    subtitle: "Sovereign Credit Line",
    tier: "ASCENDANT TIER",
    color1: "#A78BFA",
    color2: "#EC4899",
    bg: "linear-gradient(135deg, #0d0020, #1a0030, #0d0020)",
    accent: "#A78BFA",
    network: "SVCN · Mastercard",
    limit: "$4,440 / month",
    rewards: "4.44% $LONDC Cashback",
    perks: ["$4,440 sovereign credit line", "4.44% $LONDC on all spend", "0% APR first 144 days", "Balance converts to $LONDC", "Guardian tier auto-upgrade", "Zakat distribution included"],
    status: "APPLY NOW",
    chip: true,
    nfc: true,
    crypto: false,
    icon: "💜",
    cardNumber: "•••• •••• •••• 4440",
    holder: "ASCENDANT MEMBER",
  },
  {
    id: "bank",
    name: "ScrollVerse Digital Bank Card",
    subtitle: "Sovereign Banking Hub",
    tier: "SOVEREIGN TIER",
    color1: "#00FF88",
    color2: "#00D4FF",
    bg: "linear-gradient(135deg, #001a0d, #001a2e, #001a0d)",
    accent: "#00FF88",
    network: "SVCN",
    limit: "$14,400 / month",
    rewards: "2.88% $LONDC Cashback",
    perks: ["Full digital banking suite", "FDIC-equivalent sovereign vault", "Instant transfers globally", "Multi-currency: USD, MATIC, USDC", "Auto-Zakat 2.5% distribution", "Sovereign savings 9.63% APY"],
    status: "APPLY NOW",
    chip: true,
    nfc: true,
    crypto: true,
    icon: "🏦",
    cardNumber: "•••• •••• •••• 9630",
    holder: "SOVEREIGN MEMBER",
  },
];

const SVCN_STATS = [
  { label: "Network", value: "SVCN", color: "#FFB800" },
  { label: "Cards Issued", value: "14,400+", color: "#00D4FF" },
  { label: "Daily Volume", value: "$2.8M", color: "#00FF88" },
  { label: "Cashback Paid", value: "$144K", color: "#A78BFA" },
  { label: "Countries", value: "144", color: "#FF6B35" },
  { label: "Chain", value: "Polygon", color: "#00D4FF" },
];

// ── CARD VISUAL ───────────────────────────────────────────────────────────────
function CardVisual({ card, flipped, hovered }: { card: typeof CARDS[0]; flipped: boolean; hovered: boolean }) {
  return (
    <div
      className="relative w-full transition-all duration-700"
      style={{
        height: "220px",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : hovered ? "rotateY(-6deg) rotateX(4deg) scale(1.03)" : "rotateY(0deg)",
        perspective: "1000px",
      }}
    >
      {/* FRONT */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          background: card.bg,
          border: `1px solid ${card.color1}40`,
          boxShadow: hovered ? `0 20px 60px ${card.color1}30, 0 0 0 1px ${card.color1}20` : `0 8px 30px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${card.color1}60, transparent 60%), radial-gradient(ellipse at 70% 70%, ${card.color2}40, transparent 60%)`,
          }}
        />
        {/* Card lines */}
        <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.015) 18px, rgba(255,255,255,0.015) 19px)" }} />

        {/* Top row */}
        <div className="relative z-10 flex items-start justify-between p-5 pb-0">
          <div>
            <div className="text-xs font-mono tracking-widest mb-0.5" style={{ color: card.color1 + "CC" }}>SCROLLVERSE</div>
            <div className="text-xs font-mono" style={{ color: "#ffffff60" }}>{card.network}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-lg">{card.icon}</div>
            {card.nfc && (
              <div style={{ color: card.color1 + "80" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Chip */}
        {card.chip && (
          <div className="relative z-10 mx-5 mt-3">
            <div
              className="w-10 h-7 rounded"
              style={{
                background: `linear-gradient(135deg, ${card.color1}80, ${card.color2}60)`,
                border: `1px solid ${card.color1}60`,
                boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2)`,
              }}
            />
          </div>
        )}

        {/* Card number */}
        <div className="relative z-10 px-5 mt-3">
          <div className="font-mono text-base tracking-widest text-white opacity-80">{card.cardNumber}</div>
        </div>

        {/* Bottom row */}
        <div className="relative z-10 flex items-end justify-between px-5 pb-4 mt-2">
          <div>
            <div className="text-xs opacity-50 text-white mb-0.5">CARD HOLDER</div>
            <div className="font-mono text-sm font-bold tracking-wider" style={{ color: card.color1 }}>{card.holder}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-50 text-white mb-0.5">TIER</div>
            <div className="text-xs font-mono font-bold" style={{ color: card.color1 }}>{card.tier}</div>
          </div>
        </div>

        {/* Crypto badge */}
        {card.crypto && (
          <div
            className="absolute bottom-3 right-5 text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: `${card.color1}15`, border: `1px solid ${card.color1}30`, color: card.color1 }}
          >
            ⛓ CRYPTO
          </div>
        )}
      </div>

      {/* BACK */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: card.bg,
          border: `1px solid ${card.color1}40`,
        }}
      >
        {/* Magnetic stripe */}
        <div className="w-full h-10 mt-6" style={{ background: "rgba(0,0,0,0.7)" }} />
        <div className="px-5 mt-4">
          <div className="text-xs font-mono mb-3" style={{ color: card.color1 }}>SOVEREIGN CARD BENEFITS</div>
          <div className="space-y-1">
            {card.perks.slice(0, 4).map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#C4D0E0" }}>
                <span style={{ color: card.color1 }}>›</span> {p}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs font-mono" style={{ color: card.color1 + "80" }}>
            scrollverse.co · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CARD DETAIL PANEL ─────────────────────────────────────────────────────────
function CardPanel({ card, onApply }: { card: typeof CARDS[0]; onApply: (id: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${card.color1}20` }}
    >
      {/* Card visual */}
      <div
        className="p-6 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setFlipped(f => !f)}
      >
        <CardVisual card={card} flipped={flipped} hovered={hovered} />
        <div className="text-center mt-3 text-xs font-mono" style={{ color: "#8899AA" }}>
          Click card to flip · Hover to tilt
        </div>
      </div>

      {/* Card info */}
      <div className="px-6 pb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-black text-white text-lg leading-tight">{card.name}</h3>
            <div className="text-sm mt-0.5" style={{ color: card.color1 }}>{card.subtitle}</div>
          </div>
          <div
            className="text-xs font-mono px-2 py-1 rounded-full"
            style={{ background: `${card.color1}15`, color: card.color1, border: `1px solid ${card.color1}30` }}
          >
            {card.status}
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: "Credit Limit", value: card.limit },
            { label: "Rewards", value: card.rewards },
          ].map(s => (
            <div key={s.label} className="rounded-lg p-3" style={{ background: `${card.color1}08`, border: `1px solid ${card.color1}15` }}>
              <div className="text-xs mb-0.5" style={{ color: "#8899AA" }}>{s.label}</div>
              <div className="text-sm font-bold" style={{ color: card.color1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="space-y-1.5 mb-5">
          {card.perks.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#C4D0E0" }}>
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: card.color1 }} />
              {p}
            </div>
          ))}
        </div>

        {/* Apply button */}
        <button
          onClick={() => onApply(card.id)}
          className="w-full py-3 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
            color: "#050B1A",
            boxShadow: `0 4px 20px ${card.color1}30`,
          }}
        >
          {card.status === "INVITE ONLY" ? "Request Invitation" : `Apply for ${card.name.split(" ").slice(-2).join(" ")}`}
        </button>
      </div>
    </div>
  );
}

// ── APPLY MODAL ───────────────────────────────────────────────────────────────
function ApplyModal({ card, onClose }: { card: typeof CARDS[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", wallet: "", income: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3,8,18,0.92)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#0A1628", border: `1px solid ${card.color1}40` }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: `${card.color1}10`, borderBottom: `1px solid ${card.color1}20` }}
        >
          <div>
            <div className="font-black text-white">{card.name}</div>
            <div className="text-xs" style={{ color: card.color1 }}>{card.subtitle}</div>
          </div>
          <button onClick={onClose} className="text-2xl" style={{ color: "#8899AA" }}>×</button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">👑</div>
              <div className="font-black text-white text-xl mb-2">Application Received</div>
              <div className="text-sm mb-1" style={{ color: card.color1 }}>KUN FAYAKŪN × ∞</div>
              <p className="text-sm mt-3" style={{ color: "#8899AA" }}>
                Your sovereign card application is in the vault. The empire will reach you within 144 hours. Check your email for confirmation.
              </p>
              <div
                className="mt-4 p-3 rounded-xl text-xs font-mono"
                style={{ background: `${card.color1}10`, border: `1px solid ${card.color1}25`, color: card.color1 }}
              >
                APPLICATION ID: SV-{Date.now().toString(36).toUpperCase()}
              </div>
              <button
                onClick={onClose}
                className="mt-5 w-full py-3 rounded-xl font-bold text-sm"
                style={{ background: `${card.color1}20`, color: card.color1, border: `1px solid ${card.color1}30` }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-sm font-bold text-white mb-2">Sovereign Card Application</div>

              {[
                { key: "name", label: "Full Legal Name", placeholder: "Chais Sabir Allah The Great" },
                { key: "email", label: "Email Address", placeholder: "sovereign@scrollverse.co" },
                { key: "wallet", label: "Polygon Wallet Address", placeholder: "0x..." },
                { key: "income", label: "Annual Income / Revenue (USD)", placeholder: "$144,000+" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs mb-1 block" style={{ color: "#8899AA" }}>{f.label}</label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${card.color1}25`,
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  />
                </div>
              ))}

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" required className="mt-0.5" />
                <label className="text-xs" style={{ color: "#8899AA" }}>
                  I agree to the ScrollVerse Sovereign Card Terms, Zakat Distribution Policy (2.5%), and $LONDC Rewards Program.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
                  color: "#050B1A",
                }}
              >
                Submit Application — KUN FAYAKŪN
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CARD DASHBOARD ────────────────────────────────────────────────────────────
function CardDashboard() {
  const [activeCard] = useState(CARDS[1]); // Default: Crypto Card
  const transactions = [
    { desc: "Polygon NFT Mint", amount: "-0.09 ETH", londc: "+4.77 $LONDC", time: "2m ago", type: "crypto" },
    { desc: "Sovereign Academy", amount: "-$144", londc: "+7.61 $LONDC", time: "1h ago", type: "credit" },
    { desc: "Guardian Tier Upgrade", amount: "-$444", londc: "+23.45 $LONDC", time: "3h ago", type: "credit" },
    { desc: "ScrollPort Merchant", amount: "-$28", londc: "+1.48 $LONDC", time: "6h ago", type: "debit" },
    { desc: "Zakat Distribution", amount: "+$11.10", londc: "+0.58 $LONDC", time: "12h ago", type: "reward" },
  ];

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>CARD DASHBOARD</div>
          <h3 className="font-black text-white text-lg">Sovereign Spending</h3>
        </div>
        <div
          className="text-xs font-mono px-3 py-1 rounded-full"
          style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
        >
          ● LIVE
        </div>
      </div>

      {/* Balance row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Available Credit", value: "$4,296", color: "#00D4FF" },
          { label: "$LONDC Earned", value: "37.89", color: "#FFB800" },
          { label: "Cashback USD", value: "$2.11", color: "#00FF88" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div className="font-black text-lg" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent transactions */}
      <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>RECENT TRANSACTIONS</div>
      <div className="space-y-2">
        {transactions.map((tx, i) => (
          <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                style={{
                  background: tx.type === "reward" ? "rgba(0,255,136,0.15)" : "rgba(0,212,255,0.1)",
                  color: tx.type === "reward" ? "#00FF88" : "#00D4FF",
                }}
              >
                {tx.type === "reward" ? "↑" : tx.type === "crypto" ? "⛓" : "↓"}
              </div>
              <div>
                <div className="text-xs text-white font-medium">{tx.desc}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{tx.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold" style={{ color: tx.type === "reward" ? "#00FF88" : "#FF6B6B" }}>{tx.amount}</div>
              <div className="text-xs" style={{ color: "#FFB800" }}>{tx.londc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVCN NETWORK SECTION ──────────────────────────────────────────────────────
function SVCNNetwork() {
  return (
    <div
      className="rounded-2xl p-8"
      style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.05), rgba(0,212,255,0.05))", border: "1px solid rgba(255,184,0,0.2)" }}
    >
      <div className="text-center mb-8">
        <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN CARD NETWORK</div>
        <h2 className="text-4xl font-black text-white mb-2">SVCN</h2>
        <p style={{ color: "#8899AA" }}>The sovereign alternative to Visa & Mastercard — built on Polygon, powered by $LONDC</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "⛓️", title: "On-Chain Settlements", desc: "Every transaction settled on Polygon in seconds, not days" },
          { icon: "🔐", title: "Zero-Knowledge Privacy", desc: "Spend privately. Your data stays sovereign, always" },
          { icon: "💰", title: "Auto-Zakat 2.5%", desc: "Every purchase auto-distributes 2.5% Zakat to the Guardian pool" },
          { icon: "🌍", title: "144 Countries", desc: "Accepted globally wherever Visa/Mastercard is accepted" },
          { icon: "📈", title: "$LONDC Rewards", desc: "Every swipe earns $LONDC — the sovereign cashback currency" },
          { icon: "🏛️", title: "DAO Governed", desc: "Card policies voted on by Guardians — you own the network" },
        ].map(f => (
          <div
            key={f.title}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-bold text-white text-sm mb-1">{f.title}</div>
            <div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* SVCN vs Traditional */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="grid grid-cols-3 text-xs font-mono py-2 px-4" style={{ background: "rgba(255,255,255,0.04)", color: "#8899AA" }}>
          <span>FEATURE</span>
          <span className="text-center" style={{ color: "#FFB800" }}>SVCN</span>
          <span className="text-center">Traditional</span>
        </div>
        {[
          ["Settlement Time", "~2 seconds", "2–5 business days"],
          ["Cashback", "Up to 7.77% $LONDC", "0.5–2% cash"],
          ["Zakat / Charity", "Auto 2.5%", "None"],
          ["Privacy", "Zero-Knowledge", "Full data sold"],
          ["Governance", "DAO Voted", "Corporate board"],
          ["Chain", "Polygon (on-chain)", "Centralized ledger"],
          ["FX Fees", "0%", "1.5–3%"],
        ].map(([feat, svcn, trad], i) => (
          <div
            key={i}
            className="grid grid-cols-3 text-xs py-2.5 px-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#C4D0E0" }}
          >
            <span style={{ color: "#8899AA" }}>{feat}</span>
            <span className="text-center font-bold" style={{ color: "#00FF88" }}>{svcn}</span>
            <span className="text-center" style={{ color: "#8899AA" }}>{trad}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function SovereignCards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [applyTarget, setApplyTarget] = useState<typeof CARDS[0] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; opacity: number }[] = [];
    const COLORS = ["#FFB800", "#00D4FF", "#00FF88", "#A78BFA", "#FF6B35"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.25,
        r: 0.5 + Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }} />

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-10 px-4">
        <div
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
        >
          💳 SCROLLVERSE SOVEREIGN CARD SYSTEM
        </div>

        <h1
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
          style={{
            background: "linear-gradient(135deg, #FFB800, #FF6B35, #A78BFA, #00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          THE SOVEREIGN<br />CARD EMPIRE
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
          Crypto card. Credit card. Digital bank card. The Chais Black Card. All powered by $LONDC, settled on Polygon, governed by Guardians. The empire spends sovereign.
        </p>

        {/* Stats ticker */}
        <div
          className="inline-flex items-center gap-6 px-6 py-3 rounded-xl overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {SVCN_STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 flex-shrink-0">
              <div className="font-black text-base" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">Choose Your Sovereign Card</h2>
          <p style={{ color: "#8899AA" }}>Flip each card to see benefits · Click Apply to begin your application</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map(card => (
            <CardPanel key={card.id} card={card} onApply={id => setApplyTarget(CARDS.find(c => c.id === id) ?? null)} />
          ))}
        </div>
      </div>

      {/* Card Dashboard */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-16">
        <CardDashboard />
      </div>

      {/* SVCN Network */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-16">
        <SVCNNetwork />
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-16 text-center">
        <div
          className="rounded-2xl p-8"
          style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="text-4xl mb-3">👑</div>
          <h3 className="text-2xl font-black text-white mb-2">Ready to Spend Sovereign?</h3>
          <p className="text-sm mb-5" style={{ color: "#8899AA" }}>
            Join 14,400+ Guardians who spend, earn, and build wealth with the ScrollVerse Sovereign Card Network. Every swipe is a vote for a new financial order.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => setApplyTarget(CARDS[1])}
              className="px-6 py-3 rounded-xl font-black text-sm"
              style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)", color: "#050B1A" }}
            >
              Apply for Crypto Card
            </button>
            <button
              onClick={() => setApplyTarget(CARDS[0])}
              className="px-6 py-3 rounded-xl font-black text-sm"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
            >
              Request Black Card
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs" style={{ color: "#8899AA" }}>
            <span>⛓ On-Chain</span>
            <span>·</span>
            <span>🔐 Zero-Knowledge</span>
            <span>·</span>
            <span>💰 Auto-Zakat</span>
            <span>·</span>
            <span>🌍 144 Countries</span>
          </div>
        </div>
      </div>

      {/* Back nav */}
      <div className="relative z-10 text-center pb-8">
        <Link href="/">
          <span className="text-xs font-mono cursor-pointer hover:opacity-80" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse Trinity
          </span>
        </Link>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞ — ScrollVerse Sovereign Card Network × SVCN
        </div>
        <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
          Chais Kenyatta Hill — Sabir Allah The Great — The Empire Never Sleeps
        </div>
      </div>

      {/* Apply Modal */}
      {applyTarget && (
        <ApplyModal card={applyTarget} onClose={() => setApplyTarget(null)} />
      )}
    </div>
  );
}
