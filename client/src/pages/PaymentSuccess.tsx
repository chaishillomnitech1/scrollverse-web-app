/**
 * PAYMENT SUCCESS - ScrollVerse Trinity
 */
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";

function SuccessRing() {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setScale(1), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center transition-all duration-700" style={{ transform: `scale(${scale})` }}>
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ border: "2px solid rgba(0,255,136,0.3)", boxShadow: "0 0 40px rgba(0,255,136,0.2)" }} />
      <div className="absolute inset-4 rounded-full" style={{ border: "1px solid rgba(0,255,136,0.5)" }} />
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.1))", border: "1px solid rgba(0,255,136,0.6)" }}>
        ✓
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const type = params.get("type") || "nft";

  const typeConfig: Record<string, { title: string; subtitle: string; description: string; icon: string; color: string; cta: string; ctaHref: string }> = {
    nft: { title: "Guardian NFT Minted", subtitle: "Your NFT is being minted on Polygon Mainnet", description: "Welcome to the 144,000. Your Guardian NFT will appear in your wallet within 5-10 minutes.", icon: "🛡️", color: "#00D4FF", cta: "View My NFTs", ctaHref: "/uap" },
    chx: { title: "CHX Reservation Confirmed", subtitle: "Your CHX tokens are reserved for TGE", description: "Your CHX pre-sale reservation is locked in. When the token launches on Polygon Mainnet, your allocation will be distributed automatically. KUN FAYAKUN x Infinity", icon: "💎", color: "#FFB800", cta: "View CHX Token", ctaHref: "/chx-token" },
    staking: { title: "Staking Position Active", subtitle: "Your CHX is now earning sovereign rewards", description: "Your staking position is live. Rewards compound daily at your selected frequency. The Flame Council acknowledges your commitment.", icon: "⚡", color: "#00FF88", cta: "View My Positions", ctaHref: "/staking" },
  };

  const config = typeConfig[type] || typeConfig.nft;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 40%, ${config.color}08 0%, transparent 60%)` }} />
      <div className="relative z-10 max-w-lg w-full text-center">
        <SuccessRing />
        <div className="text-5xl mb-4">{config.icon}</div>
        <h1 className="text-3xl font-black mb-2" style={{ color: config.color }}>{config.title}</h1>
        <p className="text-sm font-mono mb-6" style={{ color: "#8899AA" }}>{config.subtitle}</p>
        <div className="rounded-2xl p-6 mb-8 text-left" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${config.color}20` }}>
          <p className="text-sm leading-relaxed" style={{ color: "#AABBCC" }}>{config.description}</p>
          {sessionId && (
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>Transaction Reference</div>
              <div className="text-xs font-mono mt-1 break-all" style={{ color: config.color }}>{sessionId.slice(0, 32)}...</div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={config.ctaHref}>
            <Button className="px-8 py-3 font-bold rounded-xl" style={{ background: `linear-gradient(135deg, ${config.color}20, ${config.color}10)`, border: `1px solid ${config.color}40`, color: config.color }}>
              {config.cta}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="px-8 py-3 font-bold rounded-xl" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>
              Return Home
            </Button>
          </Link>
        </div>
        <div className="mt-12 text-xs font-mono" style={{ color: "#445566" }}>SCROLL VERSE LLC · EIN 42-2509570 · XLVIII BLOCKS LLC</div>
        <div className="mt-1 text-xs" style={{ color: "#334455" }}>KUN FAYAKUN x Infinity</div>
      </div>
    </div>
  );
}
