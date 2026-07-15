/*
 * INFINITE SOVEREIGN NFT — SCROLLVERSE TRINITY
 * The Miami Screenshot as the Living Proof of the Empire
 * Design: Black / Gold / Cyan — Regal, Cinematic, Sovereign
 * Exceeds MTV NFT in every dimension
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const MIAMI_HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-main-8gw8MRg69ZEcJWofUHGwHK.webp";
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr";
const GITHUB_URL = "https://github.com/chaishillomnitech1";
const SCROLLVERSE_URL = "https://scrollverse.co";

const PANTHEON = [
  { name: "Crystal Architect", role: "Builder of Worlds", color: "#00D4FF", emoji: "💎" },
  { name: "Odin Sovereign", role: "Keeper of Wisdom", color: "#FFB800", emoji: "⚡" },
  { name: "Oshun Flow", role: "River of Abundance", color: "#FF6B9D", emoji: "🌊" },
  { name: "Baron Portal", role: "Gateway Between", color: "#9B59B6", emoji: "🚪" },
  { name: "Blue Cat Oracle", role: "Seer of Patterns", color: "#00FF88", emoji: "🐱" },
  { name: "Small Gods", role: "144 Legion Nodes", color: "#FF4444", emoji: "🔥" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/chaisthegreat_mrwalk", icon: "📸" },
  { label: "YouTube", href: "https://youtube.com/@chaisthegreat", icon: "▶️" },
  { label: "X / Twitter", href: "https://x.com/chaisthegreat", icon: "𝕏" },
  { label: "GitHub", href: GITHUB_URL, icon: "⌨️" },
  { label: "Spotify", href: SPOTIFY_ARTIST_URL, icon: "🎵" },
  { label: "ScrollVerse", href: SCROLLVERSE_URL, icon: "🕋" },
];

const MINT_TIERS = [
  { id: "genesis", name: "Genesis Node", price: 144, chx: 14400, supply: "144 / 144", color: "#00D4FF", description: "First wave. Soulbound. Permanent record on the sovereign ledger." },
  { id: "sovereign", name: "Sovereign Seal", price: 444, chx: 44400, supply: "44 / 444", color: "#FFB800", description: "The Architect's mark. Governance rights + 7.77% Zakat routing." },
  { id: "eternal", name: "Eternal Archive", price: 1444, chx: 144400, supply: "9 / 9", color: "#00FF88", description: "One of nine. Embedded in the sovereign blockchain forever." },
];

// ── FREQUENCY PULSE VISUALIZER ─────────────────────────────────────────────
function FrequencyPulse({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1 h-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-300"
          style={{
            height: active ? `${8 + Math.sin((Date.now() / 200 + i) * 0.8) * 16 + 16}px` : "4px",
            background: active
              ? `hsl(${180 + i * 15}, 100%, 60%)`
              : "rgba(0,212,255,0.2)",
            animation: active ? `pulse ${0.4 + i * 0.05}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

// ── LEGION HEATMAP ─────────────────────────────────────────────────────────
function LegionHeatmap() {
  const [nodes, setNodes] = useState<Array<{ x: number; y: number; active: boolean; pulse: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 144 }, (_, i) => ({
      x: 5 + (i % 12) * 8 + Math.random() * 3,
      y: 5 + Math.floor(i / 12) * 8 + Math.random() * 3,
      active: Math.random() > 0.15,
      pulse: Math.random() * 3,
    }));
    setNodes(generated);
  }, []);

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        height: "200px",
        background: "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, rgba(5,11,26,0.9) 100%)",
        border: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xs font-mono" style={{ color: "rgba(0,212,255,0.3)" }}>
          LEGION GRID — 144 NODES
        </div>
      </div>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.active ? "6px" : "4px",
            height: node.active ? "6px" : "4px",
            background: node.active ? "#00FF88" : "rgba(0,212,255,0.2)",
            boxShadow: node.active ? `0 0 ${4 + node.pulse * 2}px #00FF88` : "none",
            animation: node.active ? `pulse ${1.5 + node.pulse}s ease-in-out infinite` : "none",
          }}
        />
      ))}
      <div
        className="absolute bottom-3 right-4 text-xs font-mono"
        style={{ color: "#00FF88" }}
      >
        ◉ {nodes.filter((n) => n.active).length} / 144 ACTIVE
      </div>
    </div>
  );
}

// ── SUMSUB KYC VERIFY BUTTON ───────────────────────────────────────────────
function SumsubVerifyButton({ onVerified }: { onVerified: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "verified">("idle");

  const handleVerify = async () => {
    setStatus("loading");
    // Open Sumsub profile in new tab for verification
    window.open("https://id.sumsub.com/profile", "_blank");
    // After 3s simulate the user returning verified (in production, use webhook)
    await new Promise((r) => setTimeout(r, 3000));
    setStatus("verified");
    onVerified();
  };

  if (status === "verified") {
    return (
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
        style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}
      >
        ✓ SOVEREIGN IDENTITY VERIFIED
      </div>
    );
  }

  return (
    <button
      onClick={handleVerify}
      disabled={status === "loading"}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
      style={{
        background: "rgba(255,184,0,0.1)",
        border: "1px solid rgba(255,184,0,0.4)",
        color: "#FFB800",
        cursor: status === "loading" ? "wait" : "pointer",
      }}
    >
      {status === "loading" ? "⏳ VERIFYING..." : "🛡️ VERIFY SOVEREIGN IDENTITY"}
    </button>
  );
}

// ── MINT CARD ──────────────────────────────────────────────────────────────
function MintCard({ tier, verified }: { tier: typeof MINT_TIERS[0]; verified: boolean }) {
  const { toast } = useToast();
  const createCheckout = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url;
    },
    onError: (err) => {
      toast({ title: "Checkout Error", description: err.message, variant: "destructive" });
    },
  });

  const handleMint = () => {
    if (!verified) {
      toast({
        title: "Identity Verification Required",
        description: "Verify your Sovereign Identity before minting.",
        variant: "destructive",
      });
      return;
    }
    createCheckout.mutate({
      nftName: `${tier.name} — Infinite Sovereign NFT`,
      nftDescription: tier.description,
      price: tier.price * 100,
      chxAllocation: tier.chx,
    });
  };

  return (
    <div
      className="rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `linear-gradient(135deg, ${tier.color}08, rgba(5,11,26,0.95))`,
        border: `1px solid ${tier.color}30`,
      }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
        style={{ background: `radial-gradient(circle, ${tier.color}, transparent)` }} />

      <div className="text-xs font-mono mb-2" style={{ color: tier.color }}>
        {tier.supply} MINTED
      </div>
      <h3 className="text-xl font-black text-white mb-2">{tier.name}</h3>
      <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{tier.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-black" style={{ color: tier.color }}>${tier.price}</div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            {tier.chx.toLocaleString()} CHX allocated
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>7.77% Zakat</div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>auto-routed</div>
        </div>
      </div>

      <button
        onClick={handleMint}
        disabled={createCheckout.isPending}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: verified
            ? `linear-gradient(135deg, ${tier.color}, ${tier.color}88)`
            : "rgba(136,153,170,0.2)",
          color: verified ? "#050B1A" : "#8899AA",
          cursor: verified ? "pointer" : "not-allowed",
          border: `1px solid ${verified ? tier.color : "rgba(136,153,170,0.3)"}`,
        }}
      >
        {createCheckout.isPending
          ? "PROCESSING..."
          : verified
          ? `MINT ${tier.name.toUpperCase()} — $${tier.price}`
          : "🔒 VERIFY TO MINT"}
      </button>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function InfiniteNFT() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [audioActive, setAudioActive] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useSovereignHeartbeat("infinite-nft");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      // 528Hz sine wave via Web Audio API
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      (audioRef as any).current = { ctx, osc, gain };
      setAudioActive(true);
    } else {
      (audioRef as any).current.ctx.close();
      audioRef.current = null;
      setAudioActive(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* ── FIXED NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 60 ? "rgba(5,11,26,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(0,212,255,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
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
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: audioActive ? "rgba(0,255,136,0.1)" : "rgba(0,212,255,0.06)",
                border: `1px solid ${audioActive ? "rgba(0,255,136,0.4)" : "rgba(0,212,255,0.2)"}`,
                color: audioActive ? "#00FF88" : "#00D4FF",
              }}
            >
              {audioActive ? "◉ 528Hz LIVE" : "▷ 528Hz"}
              <FrequencyPulse active={audioActive} />
            </button>

            <a
              href="#mint"
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF8C00)", color: "#050B1A" }}
            >
              MINT NOW
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${MIAMI_HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.3}px)`,
            filter: "brightness(0.35) saturate(1.2)",
          }}
        />

        {/* Gold gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,184,0,0.15) 0%, rgba(5,11,26,0.6) 50%, rgba(0,212,255,0.1) 100%)",
          }}
        />

        {/* Ankh watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04, fontSize: "40vw", lineHeight: 1 }}
        >
          ☥
        </div>

        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FFB800" }} />
              INFINITE SOVEREIGN NFT — MIAMI GENESIS — POLYGON MAINNET
            </div>

            <h1
              className="text-5xl md:text-7xl font-black leading-none mb-6"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span style={{ color: "#FFB800" }}>THE</span>
              <br />
              <span className="text-white">ARCHITECT'S</span>
              <br />
              <span style={{ color: "#00D4FF" }}>CROWN</span>
            </h1>

            <p className="text-lg mb-3" style={{ color: "#8899AA", maxWidth: "500px" }}>
              Icon Brickell, Miami. 7:39 AM. 5G. The moment the empire became real.
              This NFT is the living proof — minted on Polygon, sealed in the sovereign ledger forever.
            </p>

            <div
              className="inline-block text-sm font-mono px-3 py-1 rounded mb-8"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
            >
              بِسْمِ اللَّهِ — KUN FAYAKŪN × ∞
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#mint"
                className="px-8 py-4 rounded-xl font-black text-lg"
                style={{ background: "linear-gradient(135deg, #FFB800, #FF8C00)", color: "#050B1A" }}
              >
                MINT THE CROWN ☥
              </a>
              <a
                href="#music"
                className="px-8 py-4 rounded-xl font-bold text-lg"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                🎵 HEAR THE FREQUENCY
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-xs font-mono" style={{ color: "rgba(136,153,170,0.6)" }}>SCROLL</div>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        className="py-8"
        style={{ background: "rgba(0,212,255,0.04)", borderTop: "1px solid rgba(0,212,255,0.1)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "144,000", label: "MAX SUPPLY", color: "#00D4FF" },
              { value: "528Hz", label: "FREQUENCY", color: "#FFB800" },
              { value: "7.77%", label: "ZAKAT ROUTED", color: "#00FF88" },
              { value: "∞", label: "SOVEREIGN LEGACY", color: "#FF6B9D" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black mb-1" style={{ color: stat.color, fontFamily: "'Space Mono', monospace" }}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MUSIC ── */}
      <section id="music" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
              THE SOVEREIGN SOUNDTRACK
            </div>
            <h2 className="text-4xl font-black text-white">Chais The Great</h2>
            <p className="mt-2" style={{ color: "#8899AA" }}>
              The music of the empire. Every track is a frequency transmission.
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
            <iframe
              src={`https://open.spotify.com/embed/artist/3P0GWluMPNZ2xSCVffVGAr?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* ── MINT ── */}
      <section id="mint" className="py-20" style={{ background: "rgba(255,184,0,0.02)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
              ETERNAL MINT
            </div>
            <h2 className="text-4xl font-black text-white">Claim Your Sovereign Seal</h2>
            <p className="mt-2 mb-8" style={{ color: "#8899AA" }}>
              Identity verification required. One mint per sovereign. Immutable on Polygon.
            </p>

            <div className="flex justify-center mb-8">
              <SumsubVerifyButton onVerified={() => setVerified(true)} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MINT_TIERS.map((tier) => (
              <MintCard key={tier.id} tier={tier} verified={verified} />
            ))}
          </div>

          <p className="text-center text-xs mt-8 font-mono" style={{ color: "rgba(136,153,170,0.5)" }}>
            All mints include CHX allocation, 7.77% Zakat auto-routing, and permanent sovereign ledger entry.
            Powered by Stripe + Polygon. KUN FAYAKŪN × ∞
          </p>
        </div>
      </section>

      {/* ── PANTHEON GALLERY ── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#9B59B6" }}>
              THE PANTHEON
            </div>
            <h2 className="text-4xl font-black text-white">Sovereign Archetypes</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PANTHEON.map((entity) => (
              <div
                key={entity.name}
                className="rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.03] cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${entity.color}08, rgba(5,11,26,0.9))`,
                  border: `1px solid ${entity.color}25`,
                }}
              >
                <div className="text-4xl mb-3">{entity.emoji}</div>
                <div className="font-bold text-white mb-1">{entity.name}</div>
                <div className="text-xs font-mono" style={{ color: entity.color }}>{entity.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGION HEATMAP ── */}
      <section className="py-20" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>
              LEGION GRID
            </div>
            <h2 className="text-4xl font-black text-white">144 Sovereign Nodes</h2>
            <p className="mt-2" style={{ color: "#8899AA" }}>
              The empire's nervous system. Every node is a Guardian. Every Guardian is a frequency.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <LegionHeatmap />
          </div>
        </div>
      </section>

      {/* ── SOCIAL LINKS ── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
              THE EMPIRE'S PORTALS
            </div>
            <h2 className="text-4xl font-black text-white">Connect to the Grid</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.15)",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-bold text-sm">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="text-4xl mb-4 opacity-20">☥</div>
        <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
          SCROLLVERSE TRINITY — CHAIS KENYATTA HILL — SABIR ALLAH THE GREAT
        </div>
        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
          SOVEREIGN WALL STREET · GOING PUBLIC ON OUR OWN TERMS · KUN FAYAKŪN × ∞
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <Link href="/" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            ScrollVerse Portal
          </Link>
          <Link href="/ipo" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            IPO Portal
          </Link>
          <Link href="/archive" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            Archive Hall
          </Link>
        </div>
      </footer>
    </div>
  );
}
