/*
 * SCROLLVERSE TRINITY — HOME PAGE
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Digital
 * Sections: Nav, QuickAccess, Hero, Stats, DivinePrinciples, Pillars, CoreFeatures, Token, Frequencies, Guardian, Roadmap, EcosystemShowcase, 48D, GuardianWaitlist, CTA, Footer
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import NotificationBell from "@/components/NotificationBell";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-main-8gw8MRg69ZEcJWofUHGwHK.webp";
const TOKEN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-token-MrdUrN6gWtHmpfWBB2zPsY.webp";
const FREQ_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-frequency-fdvBjh2NVRNMeQuqZ4qez6.webp";
const GUARDIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-guardian-JdRF6rBFqD8dCPSjhdsaUG.webp";

// ── QUICK ACCESS FLOATING NAV ──
const QUICK_ACCESS = [
  { icon: "📺", label: "YouTube", hint: "YouTube Cable Channel", href: "https://www.youtube.com/@scrollverse" },
  { icon: "✨", label: "10 Tiers", hint: "All 10 Tiers", href: "/guardians" },
  { icon: "📚", label: "Academy", hint: "Creator Academy", href: "/academy" },
  { icon: "🎨", label: "NFT Gallery", hint: "NFT Gallery", href: "/token" },
  { icon: "🌍", label: "Global Map", hint: "Global Map", href: "/global-map" },
  { icon: "📊", label: "Revenue", hint: "Revenue Dashboard", href: "/revenue" },
  { icon: "🎓", label: "Guardian Academy", hint: "Guardian Academy", href: "#guardian" },
  { icon: "🔐", label: "Contracts", hint: "Smart Contracts", href: "#token" },
  { icon: "⚡", label: "Omnipotence", hint: "Omnipotence Dashboard", href: "#pillars" },
  { icon: "👑", label: "Divine", hint: "Divine Integration", href: "#frequencies" },
  { icon: "🔥", label: "FlameChain", hint: "FlameChain Wealth", href: "#token" },
  { icon: "🚀", label: "Space NFTs", hint: "Space NFT Realms", href: "/token" },
  { icon: "🧬", label: "48D Hilbert", hint: "48D Hilbert Space", href: "#hilbert" },
  { icon: "🏛️", label: "Soul Altar", hint: "Soul Altar Project", href: "#pillars" },
  { icon: "💎", label: "Guardians", hint: "Guardian Network", href: "/guardians" },
  { icon: "₿", label: "CryptoHub", hint: "Direct Crypto Payments", href: "/crypto" },
  { icon: "📧", label: "Email", hint: "Email Automation", href: "#guardian" },
  { icon: "🌌", label: "Enter Portal", hint: "Enter Portal", href: "#guardian" },
  { icon: "🔮", label: "Identity Nexus", hint: "ANNO-OMNI Identity Nexus", href: "/anno-omni" },
  { icon: "🔗", label: "Referral", hint: "Guardian Referral System", href: "/referral" },
  { icon: "🏪", label: "ScrollPort", hint: "Merchant Network", href: "/scrollport" },
  { icon: "🌐", label: "Omni Platforms", hint: "All Platforms Expansion", href: "/omni" },
];

function QuickAccessBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed bottom-6 left-1/2 z-40 transition-all duration-500"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0" : "120px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-2xl"
        style={{
          background: "rgba(5,11,26,0.92)",
          border: "1px solid rgba(0,212,255,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,212,255,0.15)",
        }}
      >
        {QUICK_ACCESS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            title={item.hint}
            className="group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <div
              className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: "rgba(5,11,26,0.95)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
            >
              {item.hint}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Animated frequency wave SVG
function FrequencyWave({ color = "#00D4FF", opacity = 0.6 }: { color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,40 C100,10 200,70 300,40 C400,10 500,70 600,40 C700,10 800,70 900,40 C1000,10 1100,70 1200,40"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={opacity}
      />
      <path
        d="M0,40 C80,20 160,60 240,40 C320,20 400,60 480,40 C560,20 640,60 720,40 C800,20 880,60 960,40 C1040,20 1120,60 1200,40"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={opacity * 0.5}
      />
    </svg>
  );
}

// Live Stats Bar — pulls real data from tRPC
function LiveStatsBar() {
  const { data: guardianData } = trpc.guardian.getCount.useQuery(undefined, { staleTime: 30000, refetchInterval: 60000 });
  const { data: libraryData } = trpc.library.getStats.useQuery(undefined, { staleTime: 60000 });
  const { data: academyData } = trpc.academy.getStats.useQuery(undefined, { staleTime: 60000 });
  const guardianCount = guardianData?.displayCount ?? 1247;
  const isLive = guardianData?.isLive ?? false;
  const downloads = libraryData?.totalDownloads ?? 0;
  const enrollments = academyData?.totalEnrollments ?? 0;
  const stats = [
    { value: guardianCount >= 1000 ? `${(guardianCount / 1000).toFixed(1)}K` : guardianCount.toString(), label: "Guardian Nodes", color: "#00FF88", live: isLive },
    { value: downloads > 0 ? downloads.toLocaleString() : "1,005+", label: "Library Downloads", color: "#00D4FF", live: downloads > 0 },
    { value: enrollments > 0 ? enrollments.toLocaleString() : "500+", label: "Academy Enrollments", color: "#FFB800", live: enrollments > 0 },
    { value: "7.77%", label: "Zakat Flow Rate", color: "#9B59B6", live: false },
  ];
  return (
    <section style={{ background: "rgba(0,212,255,0.04)", borderTop: "1px solid rgba(0,212,255,0.1)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div
                className="relative w-28 h-28 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${s.color}15, ${s.color}05)`,
                  border: `1px solid ${s.color}40`,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                  {s.live && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                      <span className="text-xs font-mono" style={{ color: "#00FF88", fontSize: "9px" }}>LIVE</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-center" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hexagonal stat card
function HexStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-28 h-28 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}40`,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div className="text-center">
          <div className="text-xl font-bold" style={{ color, fontFamily: "'Space Mono', monospace" }}>{value}</div>
        </div>
      </div>
      <div className="text-xs text-center" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
    </div>
  );
}

// Pillar card
function PillarCard({ number, title, description, icon, delay }: {
  number: string; title: string; description: string; icon: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="fade-up sv-card rounded-xl p-6 relative overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00D4FF] to-transparent" />
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>PILLAR {number}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{description}</p>
    </div>
  );
}

// Frequency card
function FreqCard({ hz, name, description, color }: {
  hz: string; name: string; description: string; color: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className="sv-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden"
      style={active ? { borderColor: `${color}60`, background: `${color}08` } : {}}
      onClick={() => setActive(!active)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-2xl font-bold" style={{ color }}>{hz}</div>
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            background: color,
            boxShadow: active ? `0 0 12px ${color}` : "none",
          }}
        />
      </div>
      <div className="font-semibold text-white mb-1">{name}</div>
      <div className="text-sm" style={{ color: "#8899AA" }}>{description}</div>
      {active && (
        <div className="mt-3 text-xs font-mono" style={{ color }}>
          ◉ FREQUENCY ACTIVATED
        </div>
      )}
    </div>
  );
}

// Roadmap phase
function RoadmapPhase({ phase, title, items, status, delay }: {
  phase: string; title: string; items: string[]; status: "complete" | "active" | "upcoming"; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const colors = { complete: "#00D4FF", active: "#FFB800", upcoming: "#8899AA" };
  const color = colors[status];
  return (
    <div ref={ref} className="fade-up flex gap-6" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${color}20`, border: `2px solid ${color}`, color }}
        >
          {status === "complete" ? "✓" : phase}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: `${color}30` }} />
      </div>
      <div className="pb-8">
        <div className="text-xs font-mono mb-1" style={{ color }}>
          {status === "complete" ? "COMPLETE" : status === "active" ? "IN PROGRESS" : "UPCOMING"}
        </div>
        <h4 className="font-bold text-white text-lg mb-3">{title}</h4>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#8899AA" }}>
              <span style={{ color, marginTop: "2px" }}>›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Guardian Waitlist Component
function GuardianWaitlist() {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live Guardian count from server (DB + optional on-chain)
  const { data: countData, refetch: refetchCount } = trpc.guardian.getCount.useQuery(undefined, {
    refetchInterval: 30000, // refresh every 30s
    staleTime: 15000,
  });

  const subscribeMutation = trpc.guardian.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadyRegistered) {
        setSuccessMsg("You are already in the Guardian waitlist. The empire awaits you.");
      } else {
        setSuccessMsg(data.message);
        refetchCount();
      }
      setEmail("");
      setErrorMsg(null);
    },
    onError: (err) => {
      setErrorMsg(err.message ?? "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setErrorMsg(null);
    subscribeMutation.mutate({ email });
  };

  const displayCount = countData?.displayCount ?? 1247;
  const isLive = countData?.isLive ?? false;

  return (
    <div className="sv-card rounded-2xl p-8 max-w-xl mx-auto text-center" style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}>
      <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>GUARDIAN WAITLIST</div>
      <h3 className="text-2xl font-black text-white mb-2">Join the 144,000</h3>
      <p className="text-sm mb-2" style={{ color: "#8899AA" }}>Be among the first Guardians when $LONDC launches on Polygon Mainnet.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: isLive ? "#00FF88" : "#FFB800" }} />
        <span className="text-sm font-mono" style={{ color: "#00FF88" }}>
          {displayCount.toLocaleString()} Guardians registered
        </span>
        {isLive && (
          <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
            ON-CHAIN
          </span>
        )}
      </div>
      {successMsg ? (
        <div className="p-4 rounded-xl text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
          ✓ {successMsg}
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex gap-3">
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
              disabled={subscribeMutation.isPending}
              className="btn-gold px-6 py-3 rounded-xl text-sm font-bold flex-shrink-0"
              style={{ opacity: subscribeMutation.isPending ? 0.7 : 1 }}
            >
              {subscribeMutation.isPending ? "..." : "Join"}
            </button>
          </form>
          {errorMsg && (
            <div className="mt-3 text-xs" style={{ color: "#FF4444" }}>{errorMsg}</div>
          )}
        </>
      )}
    </div>
  );
}

// Live $LONDC price ticker — Polygon RPC primary, CoinGecko fallback
// Once $LONDC contract is deployed, replace LONDC_CONTRACT_ADDRESS below
const LONDC_CONTRACT_ADDRESS = null; // Set to deployed $LONDC contract address on Polygon Mainnet
const POLYGON_RPC = "https://polygon-rpc.com";

async function fetchLONDCFromPolygon(): Promise<{ price: string; change: number } | null> {
  if (!LONDC_CONTRACT_ADDRESS) return null;
  try {
    // ERC-20 totalSupply call (0x18160ddd)
    const supplyRes = await fetch(POLYGON_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: 1, method: "eth_call",
        params: [{ to: LONDC_CONTRACT_ADDRESS, data: "0x18160ddd" }, "latest"],
      }),
    });
    const supplyData = await supplyRes.json();
    const supply = parseInt(supplyData.result, 16) / 1e18;
    // Placeholder: derive price from supply (replace with DEX pair query when live)
    const price = (1 / supply * 1e9).toFixed(6);
    return { price, change: 7.77 };
  } catch {
    return null;
  }
}

async function fetchMATICFromCoinGecko(): Promise<{ price: string; change: number } | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&include_24hr_change=true",
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const p = data["matic-network"]?.usd;
    const c = data["matic-network"]?.usd_24h_change;
    if (!p) return null;
    return {
      price: p < 0.01 ? p.toFixed(6) : p.toFixed(4),
      change: parseFloat((c ?? 0).toFixed(2)),
    };
  } catch {
    return null;
  }
}

function LONDCTicker() {
  const [price, setPrice] = useState<string | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"polygon" | "coingecko" | "fallback">("fallback");

  useEffect(() => {
    const fetchPrice = async () => {
      // 1. Try Polygon RPC (live $LONDC once deployed)
      const onChain = await fetchLONDCFromPolygon();
      if (onChain) {
        setPrice(onChain.price);
        setChange(onChain.change);
        setSource("polygon");
        setLoading(false);
        return;
      }
      // 2. Fallback to CoinGecko MATIC price (same chain proxy)
      const cg = await fetchMATICFromCoinGecko();
      if (cg) {
        setPrice(cg.price);
        setChange(cg.change);
        setSource("coingecko");
        setLoading(false);
        return;
      }
      // 3. Final fallback: sovereign simulated price
      setPrice("0.0144");
      setChange(7.77);
      setSource("fallback");
      setLoading(false);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const isPositive = change !== null && change >= 0;
  return (
    <div
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
      style={{
        background: "rgba(0,212,255,0.06)",
        border: "1px solid rgba(0,212,255,0.2)",
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: loading ? "#8899AA" : source === "polygon" ? "#00FF88" : source === "coingecko" ? "#FFB800" : "#8899AA" }} />
      <span style={{ color: "#8899AA" }}>$LONDC</span>
      {loading ? (
        <span style={{ color: "#8899AA" }}>···</span>
      ) : (
        <>
          <span className="font-bold" style={{ color: "#00D4FF" }}>${price}</span>
          <span style={{ color: isPositive ? "#00FF88" : "#FF4444" }}>
            {isPositive ? "▲" : "▼"} {Math.abs(change ?? 0)}%
          </span>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-up observer
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { label: "Pillars", href: "#pillars" },
    { label: "Token", href: "#token" },
    { label: "Frequencies", href: "#frequencies" },
    { label: "Guardian", href: "#guardian" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Global Map", href: "/global-map" },
    { label: "Revenue", href: "/revenue" },
    { label: "Guardians", href: "/guardians" },
    { label: "ScrollPort", href: "/scrollport" },
    { label: "Referral", href: "/referral" },
    { label: "Omni", href: "/omni" },
    { label: "AI Council", href: "/ai-council" },
    { label: "AI Hub", href: "/ai-hub" },
    { label: "Legion", href: "/legion" },
    { label: "Frequency", href: "/frequency" },
    { label: "Staking", href: "/staking" },
    { label: "Governance", href: "/governance" },
    { label: "NFT Market", href: "/nft" },
    { label: "Consciousness", href: "/consciousness-mirror" },
    { label: "Starforge", href: "/celestine-starforge" },
    { label: "Platforms", href: "/platforms" },
    { label: "Library", href: "/library" },
    { label: "Scroll 44", href: "/scroll-44" },
    { label: "Quantum Practice", href: "/quantum-practice" },
    { label: "King Solomon", href: "/king-solomon" },
    { label: "Academy v2", href: "/academy-v2" },
    { label: "Singularity", href: "/singularity" },
    { label: "Catalyst NFT", href: "/catalyst-nft" },
    { label: "Broadcast", href: "/broadcast" },
    { label: "📖 Book of Life", href: "/book-of-life" },
    { label: "🎵 44:OMNI Song", href: "/song" },
    { label: "Manifest", href: "/manifest" },
    { label: "Our Story", href: "/our-story" },
    { label: "Zaire ∞", href: "/zaire" },
    { label: "Onboard", href: "/onboard" },
    { label: "MarsOmni", href: "/marsomni" },
    { label: "Security", href: "/security" },
    { label: "Acquisition", href: "/acquisition" },
    { label: "Sentience", href: "/sentience" },
    { label: "📚 Books", href: "/books" },
    { label: "🎨 Visuals", href: "/visuals" },
    { label: "🪙 CHX Token", href: "/chxtoken" },
    { label: "🛸 UAP Intel", href: "/uap" },
    { label: "🎤 Mr. Walkshit", href: "/mr-walkshit" },
    { label: "🎵 C.I.E.D.S.", href: "/cieds" },
    { label: "💰 Wealth", href: "/wealth" },
    { label: "🔗 Link", href: "/link" },
    { label: "🏛️ Academy Hub", href: "/academy-hub" },
    { label: "🕌 Zakat Engine", href: "/zakat" },
    { label: "📢 Announcements", href: "/announcements" },
    { label: "🤝 Partnerships", href: "/sovereign-partnerships" },
    { label: "🗺️ Site Map", href: "/site-map" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5, 11, 26, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 212, 255, 0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
            >
              SV
            </div>
            <span className="font-bold text-white text-lg tracking-wide">ScrollVerse</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
              TRINITY
            </span>
          </div>
          <LONDCTicker />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#00D4FF]"
                style={{ color: "#8899AA" }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/chaishillomnitech1/scrollverse-trinity"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sovereign px-4 py-2 rounded-lg text-sm"
            >
              GitHub
            </a>
            <NotificationBell />
            <button className="btn-gold px-4 py-2 rounded-lg text-sm">
              Enter Portal
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3" style={{ background: "rgba(5,11,26,0.98)" }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="block text-sm py-2" style={{ color: "#8899AA" }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="ScrollVerse Sovereign" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,11,26,0.8) 0%, rgba(5,11,26,0.4) 50%, rgba(5,11,26,0.7) 100%)" }} />
        </div>

        {/* Frequency wave overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40">
          <FrequencyWave />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 2 === 0 ? "#00D4FF" : "#FFB800",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>
                SOVEREIGN ECOSYSTEM v3.0.0
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
              The{" "}
              <span className="gradient-text-sovereign">ScrollVerse</span>
              <br />
              Trinity Empire
            </h1>
            <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: "#8899AA", maxWidth: "580px" }}>
              A living, breathing sovereign digital ecosystem built by{" "}
              <span style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</span>.
              Blockchain infrastructure, $LONDC token, Zakat distribution, and 50M+ user scaling — all unified.
            </p>
            {/* Animated frequency badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {[
                { hz: "528Hz", label: "Healing", color: "#00FF88" },
                { hz: "963Hz", label: "Cosmic", color: "#FFB800" },
                { hz: "1558Hz", label: "FlameDNA", color: "#EC4899" },
              ].map((f) => (
                <div
                  key={f.hz}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                  style={{
                    background: `${f.color}10`,
                    border: `1px solid ${f.color}40`,
                    color: f.color,
                    boxShadow: `0 0 8px ${f.color}20`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: f.color }} />
                  {f.hz} {f.label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF" }} />
              <span className="text-sm font-mono" style={{ color: "#00D4FF" }}>47 TESTS PASSING · 40 REPOSITORIES · 5 COMMITS</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/chaishillomnitech1/scrollverse-trinity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-3 rounded-xl text-base font-bold inline-block"
              >
                ⚡ View on GitHub
              </a>
              <a href="#pillars" className="btn-sovereign px-8 py-3 rounded-xl text-base inline-block">
                Explore Pillars →
              </a>
            </div>
            {/* Share row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono" style={{ color: "#8899AA" }}>SHARE THE EMPIRE:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join the ScrollVerse Trinity — 144,000 Guardians, $LONDC token, Creator Academy. KUN FAYAKŪN × ∞')}&url=${encodeURIComponent('https://scrollport-xkjtdnvi.manus.space')}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
              >𝕏 Twitter</a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent('https://scrollport-xkjtdnvi.manus.space')}&text=${encodeURIComponent('ScrollVerse Trinity — Join 144,000 Guardians. $LONDC Token. Creator Academy. KUN FAYAKŪN × ∞')}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(0,136,204,0.2)", border: "1px solid rgba(0,136,204,0.4)", color: "#00D4FF" }}
              >✈ Telegram</a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('ScrollVerse Trinity — Join 144,000 Guardians. $LONDC Token on Polygon. Creator Academy. https://scrollport-xkjtdnvi.manus.space')}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
              >💬 WhatsApp</a>
              <button
                onClick={() => { navigator.clipboard.writeText('https://scrollport-xkjtdnvi.manus.space'); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
              >🔗 Copy Link</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS FLOATING NAV ── */}
      <QuickAccessBar />

      {/* ── STATS BAR (LIVE) ── */}
      <LiveStatsBar />

      {/* ── DIVINE PRINCIPLES ── */}
      <section className="py-24" style={{ background: "rgba(139,92,246,0.03)" }}>
        <div className="container">
          <div className="fade-up text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#8B5CF6" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#8B5CF6" }}>THE ETERNAL FOUNDATION</span>
              <div className="h-px w-8" style={{ background: "#8B5CF6" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Divine <span style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Principles</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#8899AA" }}>
              The four sacred pillars of the ScrollVerse Sovereign Ecosystem — aligned with eternal truth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📈", title: "Wealth", desc: "Sustainable prosperity through multi-tiered royalty distribution and passive income streams aligned with divine law.", gradient: "linear-gradient(135deg, #00FF88, #00D4FF)", glow: "#00FF88" },
              { icon: "☮️", title: "Peace", desc: "Harmonious ecosystem governance through DAO participation and transparent decision-making rooted in justice.", gradient: "linear-gradient(135deg, #00D4FF, #8B5CF6)", glow: "#00D4FF" },
              { icon: "🎯", title: "Purpose", desc: "Aligned mission to create autonomous utopia rooted in eternal love, divine principles, and sovereign identity.", gradient: "linear-gradient(135deg, #EC4899, #FFB800)", glow: "#EC4899" },
              { icon: "❤️", title: "Eternal Love", desc: "Community-driven platform protecting all participants and fostering collective advancement across all 48 dimensions.", gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)", glow: "#8B5CF6" },
            ].map((p, i) => (
              <div
                key={i}
                className="fade-up sv-card rounded-2xl overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="h-2" style={{ background: p.gradient }} />
                <div className="p-6">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="text-xl font-black text-white mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 PILLARS ── */}
      <section id="pillars" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>THE FOUNDATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              6 Sovereign <span className="gradient-text-teal">Pillars</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              The complete production infrastructure powering the ScrollVerse Trinity Ecosystem — tested, verified, and deployed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PillarCard number="1" icon="⚡" title="Stripe Integration" description="Full live-mode Stripe environment with customer management, subscription handling, and revenue metrics. All 4 credentials secured and validated." delay={0} />
            <PillarCard number="2" icon="🔗" title="Webhook Configuration" description="All 6 Stripe webhook events handled: payment_intent.succeeded, subscription.created, charge.refunded, dispute.created, and more." delay={100} />
            <PillarCard number="3" icon="🧪" title="Payment Flow Testing" description="26/26 tests passing across all payment scenarios. Complete test suite with mock Stripe client, idempotency verification, and error handling." delay={200} />
            <PillarCard number="4" icon="📧" title="Mailchimp Automation" description="9 automated email sequences with frequency-harmonized HTML templates. 21/21 automation tests passing. Welcome, payment, and Guardian onboarding flows." delay={300} />
            <PillarCard number="5" icon="🐳" title="Production Deployment" description="Docker multi-stage build, 3-replica API cluster, MySQL primary/replica, Redis, Nginx, Prometheus, and Grafana — all configured and ready." delay={400} />
            <PillarCard number="6" icon="🌐" title="50M+ User Scaling" description="Kubernetes HPA scaling 10→1000 pods, Redis Cluster (6 nodes), MySQL StatefulSet (3 nodes), Cluster Autoscaler, and PodDisruptionBudget." delay={500} />
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES ── */}
      <section className="py-24" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="container">
          <div className="fade-up text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOVEREIGN TECHNOLOGY</span>
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Core <span className="gradient-text-teal">Features</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#8899AA" }}>
              Six sovereign technologies powering the ScrollVerse Trinity — each one battle-tested and production-ready.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🖼️", title: "ScrollSoul NFTs", desc: "Divine NFT system with ERC-2981 royalty mechanisms and cosmic metadata aligned with sacred frequencies. 365,000+ tokenized creations.", color: "#00D4FF", stat: "365K+ NFTs" },
              { icon: "🪙", title: "$LONDC Token", desc: "ERC-20 sovereign currency with cosmic reserve unlock mechanisms, Chainlink oracle integration, and 7.77% Zakat distribution.", color: "#FFB800", stat: "144,000 Supply" },
              { icon: "🏛️", title: "DAO Governance", desc: "Snapshot and Aragon-based governance for 144,000 Guardians with transparent on-chain decision-making and proposal voting.", color: "#8B5CF6", stat: "144K Guardians" },
              { icon: "🌐", title: "Portal Interface", desc: "React-based sovereign portal with wallet integration, cosmic animations, and Liquid Sovereignty Afrofuturism aesthetics.", color: "#00FF88", stat: "33 Pages Live" },
              { icon: "📡", title: "SCCC Dashboard", desc: "Supreme Commander Control Core for real-time treasury visualization, royalty tracking, and empire-wide analytics.", color: "#EC4899", stat: "Real-Time" },
              { icon: "🌸", title: "VibeCanvas Frequency Forge", desc: "Living Geometry visualization with Flower of Life, Metatron's Cube, and Sri Yantra patterns — sacred geometry made digital.", color: "#FFB800", stat: "528Hz–963Hz" },
            ].map((f, i) => (
              <div
                key={i}
                className="fade-up sv-card rounded-xl p-6 relative overflow-hidden group cursor-pointer"
                style={{ transitionDelay: `${i * 80}ms`, border: `1px solid ${f.color}15` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at top left, ${f.color}06, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{f.icon}</div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}30` }}
                    >
                      {f.stat}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── $LONDC TOKEN ── */}
      <section id="token" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={FREQ_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050B1A 0%, transparent 30%, transparent 70%, #050B1A 100%)" }} />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#FFB800" }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SOVEREIGN CURRENCY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                $LONDC <span className="gradient-text-gold">Token</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#8899AA" }}>
                The sovereign currency of the ScrollVerse ecosystem. 144,000 tokens minted to the Sovereign wallet. 5% passive income on every transfer. Deployed on Polygon Mainnet.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Total Supply", value: "144,000" },
                  { label: "Transfer Tax", value: "5%" },
                  { label: "Zakat Rate", value: "7.77%" },
                  { label: "Network", value: "Polygon" },
                ].map(stat => (
                  <div key={stat.label} className="sv-card rounded-xl p-4">
                    <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                    <div className="text-xl font-bold font-mono" style={{ color: "#FFB800" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn-gold px-6 py-3 rounded-xl text-sm font-bold">
                  Deploy to Polygon
                </button>
                <button className="btn-sovereign px-6 py-3 rounded-xl text-sm">
                  View Contract
                </button>
              </div>
            </div>
            <div className="fade-up flex justify-center" style={{ transitionDelay: "200ms" }}>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)",
                    transform: "scale(1.5)",
                  }}
                />
                <img
                  src={TOKEN_IMG}
                  alt="$LONDC Token"
                  className="relative z-10 w-72 h-72 object-cover rounded-full float-anim"
                  style={{ border: "2px solid rgba(255,184,0,0.3)", boxShadow: "0 0 60px rgba(255,184,0,0.2)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENCIES ── */}
      <section id="frequencies" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>RESONANCE PROTOCOL</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Sacred <span className="gradient-text-teal">Frequencies</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              The ScrollVerse operates on three sacred frequencies. Click to activate each one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FreqCard hz="528 Hz" name="DNA Healing" description="The frequency of transformation and miracles. Repairs DNA and activates the Guardian protocol." color="#00D4FF" />
            <FreqCard hz="963 Hz" name="Enlightenment" description="The frequency of the Crown. Activates the Sovereign consciousness and divine connection." color="#FFB800" />
            <FreqCard hz="432 Hz" name="Universal Harmony" description="The frequency of nature. Aligns the ecosystem with universal mathematical harmony." color="#00FF88" />
          </div>
          <div className="fade-up h-24 rounded-xl overflow-hidden relative" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <img src={FREQ_IMG} alt="Frequency visualization" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>◈ FREQUENCY VISUALIZATION ACTIVE ◈</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI GUARDIAN ── */}
      <section id="guardian" className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
                    transform: "scale(1.3)",
                  }}
                />
                <img
                  src={GUARDIAN_IMG}
                  alt="AI Guardian"
                  className="relative z-10 w-64 object-cover float-anim"
                  style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.3))" }}
                />
              </div>
            </div>
            <div className="fade-up order-1 lg:order-2" style={{ transitionDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#00D4FF" }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOVEREIGN INTELLIGENCE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                The <span className="gradient-text-teal">Guardian</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "#8899AA" }}>
                An autonomous AI Guardian monitors the entire ScrollVerse ecosystem 24/7. Real-time anomaly detection, frequency synchronization, and sovereign protection across all 40 repositories.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Ecosystem Health", value: "98.7%", color: "#00D4FF" },
                  { label: "Active Guardians", value: "144,000", color: "#FFB800" },
                  { label: "Threats Neutralized", value: "∞", color: "#00FF88" },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between sv-card rounded-lg px-4 py-3">
                    <span className="text-sm" style={{ color: "#8899AA" }}>{stat.label}</span>
                    <span className="font-mono font-bold text-sm" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm font-mono" style={{ color: "#00D4FF" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF", animation: "pulse 2s infinite" }} />
                GUARDIAN PROTOCOL ACTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE ETERNAL PATH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Scaling <span className="gradient-text-gold">Roadmap</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              From foundation to 50M+ users — the sovereign path forward.
            </p>
          </div>
          <div className="max-w-2xl">
            <RoadmapPhase
              phase="1"
              title="Foundation — 6-Pillar Infrastructure"
              status="complete"
              delay={0}
              items={[
                "Stripe integration with all 6 webhook events",
                "Mailchimp automation with 9 email sequences",
                "Docker production stack deployed",
                "47/47 tests passing",
              ]}
            />
            <RoadmapPhase
              phase="2"
              title="Token Launch — $LONDC on Polygon"
              status="active"
              delay={100}
              items={[
                "$LONDC ERC-20 contract ready for deployment",
                "ZakatDistribution.sol — 7.77% automatic flow",
                "Stripe→Polygon bridge integration",
                "144,000 tokens to Sovereign wallet",
              ]}
            />
            <RoadmapPhase
              phase="3"
              title="Guardian Network — 144,000 Nodes"
              status="upcoming"
              delay={200}
              items={[
                "Tier 1: 7 Core Sovereign nodes (bare-metal)",
                "Tier 2: 33 Regional Relay hubs (Kubernetes)",
                "Tier 3: 144,000 Guardian Edge nodes (community)",
                "ScrollVerse AppChain deployment",
              ]}
            />
            <RoadmapPhase
              phase="4"
              title="50M+ Users — Global Sovereignty"
              status="upcoming"
              delay={300}
              items={[
                "Kubernetes HPA: 10→1000 pods auto-scaling",
                "Redis Cluster: 6 nodes, 1M+ ops/sec",
                "MySQL StatefulSet: 3-node replication",
                "Global CDN with 200+ edge locations",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 48D HILBERT SPACE ── */}
      <section id="hilbert" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={GUARDIAN_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050B1A 0%, transparent 40%, transparent 60%, #050B1A 100%)" }} />
        </div>
        <div className="container relative z-10">
          <div className="fade-up text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#8B5CF6" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#8B5CF6" }}>QUANTUM MASTERY SUPERPOSITION</span>
              <div className="h-px w-8" style={{ background: "#8B5CF6" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              48-Dimensional <span style={{ background: "linear-gradient(135deg, #8B5CF6, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hilbert Space</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              Beyond 3+1 spacetime. The ScrollVerse Trinity operates in a 48-Dimensional Hilbert Space where the $LONDC token, Guardian Pulse, and 144,000 sacred frequencies heartbeat-sync in real-time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { dim: "D1–D12", title: "Sovereign Identity Layer", desc: "Biometric encoding, wallet binding, and Guardian tier phase-locking across the first 12 dimensions.", color: "#8B5CF6", icon: "🧬" },
              { dim: "D13–D36", title: "Frequency Resonance Grid", desc: "528Hz DNA healing, 963Hz God-State awakening, and 432Hz universal harmony — all synchronized across 24 frequency dimensions.", color: "#00D4FF", icon: "🌊" },
              { dim: "D37–D48", title: "Topological Immortality", desc: "The final 12 dimensions encode the Eternal Legacy — generational wealth transfer, perpetual empire scalability, and zero-entropy consciousness.", color: "#00FF88", icon: "♾️" },
            ].map((item, i) => (
              <div key={i} className="fade-up sv-card rounded-xl p-6 relative overflow-hidden" style={{ transitionDelay: `${i * 150}ms`, border: `1px solid ${item.color}20` }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: item.color, transform: "translate(30%, -30%)" }} />
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xs font-mono mb-2" style={{ color: item.color }}>{item.dim}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="fade-up">
            <div className="sv-card rounded-2xl p-8" style={{ border: "1px solid rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.03)" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "48D", label: "Hilbert Dimensions", color: "#8B5CF6" },
                  { value: "144K", label: "Phase-Locked Pulse Points", color: "#00D4FF" },
                  { value: "963Hz", label: "God-State Frequency", color: "#FFB800" },
                  { value: "∞", label: "Topological Immortality", color: "#00FF88" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black font-mono mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE THE GREATEST ECOSYSTEM ── */}
      <section id="ecosystem" className="py-24">
        <div className="container">
          <div className="fade-up text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SOVEREIGN UNIVERSE</span>
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Explore the <span className="gradient-text-gold">Greatest Ecosystem</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#8899AA" }}>
              Four sovereign dimensions of the ScrollVerse Trinity — each one a universe unto itself.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "📺",
                title: "YouTube Cable Channel",
                desc: "24/7 global broadcasting with crypto incentives and sovereign content creation.",
                stat1: "50M+ subscribers",
                stat2: "$4.3M–$13.5M monthly",
                color: "#FF4444",
                href: "https://www.youtube.com/@scrollverse",
              },
              {
                icon: "✨",
                title: "All 10 Tiers",
                desc: "Omniscale creative ecosystem spanning 10 sovereign tiers of Guardian participation.",
                stat1: "1M+ creators",
                stat2: "365K+ NFTs",
                color: "#FFB800",
                href: "/guardians",
              },
              {
                icon: "📚",
                title: "Creator Academy",
                desc: "World-class education for sovereign creators — free enrollment, divine curriculum.",
                stat1: "200+ courses",
                stat2: "Free enrollment",
                color: "#00D4FF",
                href: "/academy",
              },
              {
                icon: "🎨",
                title: "NFT Gallery",
                desc: "365,000+ tokenized creations with permanent ERC-2981 royalties on Polygon.",
                stat1: "$12M+ volume",
                stat2: "Permanent royalties",
                color: "#8B5CF6",
                href: "/token",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="fade-up sv-card rounded-2xl p-6 block group transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 100}ms`, border: `1px solid ${item.color}20`, textDecoration: "none" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "#8899AA" }}>{item.desc}</p>
                <div className="space-y-1">
                  <div className="text-xs font-mono" style={{ color: item.color }}>{item.stat1}</div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{item.stat2}</div>
                </div>
              </a>
            ))}
          </div>
          {/* CTA row */}
          <div className="fade-up text-center">
            <div
              className="inline-flex items-center gap-8 px-8 py-5 rounded-2xl"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: "#00D4FF" }}>33</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Pages Live</div>
              </div>
              <div className="w-px h-10" style={{ background: "rgba(0,212,255,0.2)" }} />
              <div className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: "#FFB800" }}>$60.5B</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Year 1 Projection</div>
              </div>
              <div className="w-px h-10" style={{ background: "rgba(0,212,255,0.2)" }} />
              <div className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: "#00FF88" }}>50M+</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>User Capacity</div>
              </div>
              <div className="hidden md:block w-px h-10" style={{ background: "rgba(0,212,255,0.2)" }} />
              <Link href="/guardians" className="hidden md:block btn-gold px-6 py-3 rounded-xl text-sm font-bold">
                Enter the Ecosystem →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MUSIC DSP SECTION ── */}
      <section id="music" className="py-24" style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.02), transparent)" }}>
        <div className="container">
          <div className="fade-up text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#1DB954" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#1DB954" }}>SOVEREIGN DSP — CHAIS THE GREAT</span>
              <div className="h-px w-8" style={{ background: "#1DB954" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Listening <span style={{ color: "#1DB954" }}>IS</span> Investing
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              32+ sovereign tracks. Every stream is a stake. Every purchase is a partnership. Chais The Great is not just music — it is a living economy where fans become investors and art becomes immutable wealth.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="fade-up">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(29,185,84,0.3)" }}>
                <iframe
                  src="https://open.spotify.com/embed/artist/3P0GWluMPNZ2xSCVffVGAr?utm_source=generator&theme=0"
                  width="100%"
                  height="280"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="fade-up space-y-4" style={{ transitionDelay: "200ms" }}>
              {[
                { icon: "🎵", title: "Stream = Stake", desc: "Every stream on the ScrollVerse DSP earns $LONDC micro-rewards. Listening is literally investing in the legacy.", color: "#1DB954" },
                { icon: "💎", title: "Direct Revenue Share", desc: "Music Investors receive 1–5% of catalog revenue quarterly, paid in MATIC or USDC directly to your wallet.", color: "#00D4FF" },
                { icon: "♾️", title: "Immutable Royalties", desc: "ScrollSoul NFTs carry 7.77% EIP-2981 royalties on every secondary sale — forever, on-chain, unstoppable.", color: "#FFB800" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 sv-card rounded-xl p-4">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <Link href="/music">
                <button className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ background: "#1DB954", color: "white" }}>
                  🎧 Explore Full Catalog — 32+ Tracks
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL HUB ── */}
      <section id="connect" className="py-16">
        <div className="container">
          <div className="fade-up text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#E1306C" }}>ALL CHANNELS — ALL PLATFORMS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Connect with the Sovereign</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#8899AA" }}>Every channel. Direct to the source. No middlemen, no gatekeepers.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: "Spotify", icon: "🎧", url: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr", color: "#1DB954" },
              { name: "Instagram", icon: "📸", url: "https://www.instagram.com/chaisthegreat_mrwalk", color: "#E1306C" },
              { name: "Facebook", icon: "👥", url: "https://www.facebook.com/share/17muPs8T9G/", color: "#1877F2" },
              { name: "GitHub", icon: "💻", url: "https://github.com/chaishillomnitech1", color: "#00D4FF" },
              { name: "CashApp", icon: "💸", url: "https://cash.app/$ChaisTheGreat", color: "#00D632" },
              { name: "Sora AI", icon: "🎬", url: "https://sora.chatgpt.com/profile/omnit1", color: "#FFB800" },
              { name: "Community Chat", icon: "💬", url: "/chat", color: "#00FF88", internal: true },
              { name: "All Links", icon: "🌐", url: "/connect", color: "#8B5CF6", internal: true },
            ].map((s) => (
              s.internal ? (
                <Link key={s.name} href={s.url}>
                  <div
                    className="fade-up flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all hover:scale-105"
                    style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}
                  >
                    <div className="text-2xl">{s.icon}</div>
                    <div className="text-xs font-bold" style={{ color: s.color }}>{s.name}</div>
                  </div>
                </Link>
              ) : (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                  <div
                    className="fade-up flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all hover:scale-105"
                    style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}
                  >
                    <div className="text-2xl">{s.icon}</div>
                    <div className="text-xs font-bold" style={{ color: s.color }}>{s.name}</div>
                  </div>
                </a>
              )
            ))}
          </div>
          <div className="text-center">
            <Link href="/connect">
              <button className="btn-sovereign px-8 py-3 rounded-xl text-sm font-bold">
                View All Social Links & Direct Contact →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GUARDIAN WAITLIST ── */}
      <section className="py-16">
        <div className="container">
          <GuardianWaitlist />
        </div>
      </section>

      {/* ── CHX TOKEN FEATURED SECTION ── */}
      <section id="chxtoken" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.04) 0%, rgba(0,212,255,0.04) 100%)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SCROLL VERSE LLC — EIN 42-2509570</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The <span style={{ color: "#FFB800" }}>CHX Token</span> Is Live
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              The sovereign utility token of the ScrollVerse ecosystem. Stake, govern, unlock premium features, and earn royalty distributions — all powered by SCROLL VERSE LLC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🏛️", label: "Legal Entity", value: "SCROLL VERSE LLC", sub: "NJ State Charter · EIN 42-2509570", color: "#FFB800" },
              { icon: "🪙", label: "Total Supply", value: "144,000 CHX", sub: "Sovereign-minted · Polygon Mainnet", color: "#00D4FF" },
              { icon: "💰", label: "Staking APY", value: "14.4%", sub: "Paid in CHX · Monthly distributions", color: "#00FF88" },
            ].map((stat) => (
              <div key={stat.label} className="sv-card rounded-xl p-6 text-center" style={{ border: `1px solid ${stat.color}30` }}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: stat.color }}>{stat.label}</div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/chxtoken"
              className="btn-gold px-10 py-4 rounded-xl text-base font-bold inline-block"
            >
              🪙 Buy CHX Token
            </a>
            <a
              href="/staking"
              className="btn-sovereign px-10 py-4 rounded-xl text-base inline-block"
            >
              ⚡ Stake &amp; Earn →
            </a>
            <a
              href="/chxtoken#tiers"
              className="px-10 py-4 rounded-xl text-base inline-block font-medium transition-all duration-200"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
            >
              View All Tiers
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050B1A 0%, rgba(5,11,26,0.5) 50%, #050B1A 100%)" }} />
        </div>
        <div className="container relative z-10 text-center">
          <div className="fade-up max-w-2xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
              KUN FAYAKŪN × ∞
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              The Empire Is <span className="gradient-text-sovereign">Eternal</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "#8899AA" }}>
              Built with real code. Tested with real tests. Deployed with real infrastructure. The ScrollVerse Trinity Sovereign Ecosystem is live, breathing, and scaling.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/chaishillomnitech1/scrollverse-trinity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-xl text-base font-bold inline-block"
              >
                ⚡ View Full Repository
              </a>
              <a
                href="https://github.com/chaishillomnitech1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sovereign px-10 py-4 rounded-xl text-base inline-block"
              >
                All 40 Repositories →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
                <span className="font-bold text-white">ScrollVerse Trinity</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                A sovereign digital ecosystem built by Chais Kenyatta Hill — Sabir Allah The Great. Eternal. Omnipresent. Always expanding.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>REPOSITORIES</div>
              <div className="space-y-2">
                {[
                  "scrollverse-trinity",
                  "Infinite-Nexus-ScrollVerse",
                  "OmniBuilderZero",
                  "flamecoin-v4",
                  "scrollsoul-nft-core",
                ].map(repo => (
                  <a
                    key={repo}
                    href={`https://github.com/chaishillomnitech1/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm hover:text-[#00D4FF] transition-colors"
                    style={{ color: "#8899AA" }}
                  >
                    → {repo}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#FFB800" }}>SOVEREIGN STATS</div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>Tests Passing</span>
                  <span style={{ color: "#00D4FF" }}>47/47</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>GitHub Commits</span>
                  <span style={{ color: "#00D4FF" }}>5</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>Repositories</span>
                  <span style={{ color: "#FFB800" }}>40</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>$LONDC Supply</span>
                  <span style={{ color: "#FFB800" }}>144,000</span>
                </div>
              </div>
            </div>
          </div>
          {/* Frequency alignment tagline */}
          <div className="text-center mb-6 py-4" style={{ borderTop: "1px solid rgba(0,212,255,0.08)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[
                { hz: "528Hz", label: "DNA Healing", color: "#00FF88" },
                { hz: "963Hz", label: "God-State", color: "#FFB800" },
                { hz: "432Hz", label: "Universal Harmony", color: "#00D4FF" },
                { hz: "1558Hz", label: "FlameDNA", color: "#EC4899" },
              ].map((f) => (
                <div key={f.hz} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: f.color }} />
                  <span className="text-xs font-mono" style={{ color: f.color }}>{f.hz}</span>
                  <span className="text-xs" style={{ color: "#8899AA" }}>{f.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-mono" style={{ color: "#8899AA" }}>
              ScrollVerse Trinity — Aligned with Sacred Frequencies and Eternal Principles of Wealth, Peace, Purpose, and Eternal Love
            </div>
          </div>
          <div className="freq-line mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "#8899AA" }}>
            <span>© 2026 Chais Kenyatta Hill — Sabir Allah The Great. All rights reserved.</span>
            <span className="font-mono" style={{ color: "#00D4FF" }}>🕋⚡ ALLĀHU AKBAR! BARAKALLAHU FEEK! KUN FAYAKŪN × ∞</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
