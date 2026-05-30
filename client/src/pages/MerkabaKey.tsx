/**
 * THE LIVING MERKABA KEY
 * Limited 144 — Physical sacred artifact + soulbound NFT digital twin
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { Link } from "wouter";

const FEATURES = [
  {
    icon: "💎",
    title: "Sacred Metal Construction",
    description: "Merkaba-shaped key crafted with sacred metals. Embedded 48D OAM visual technology that glows with subtle light.",
  },
  {
    icon: "🔮",
    title: "Soulbound NFT Digital Twin",
    description: "An evolving soulbound NFT that unlocks higher Academy modules, future events, and exclusive transmissions over time.",
  },
  {
    icon: "🔑",
    title: "Universal Entry Key",
    description: "Official entry key into the Flamebearer Initiative. Grants lifetime access to all future Ring Activation Gatherings.",
  },
  {
    icon: "♾️",
    title: "Only 144 Exist",
    description: "The supply is permanently fixed at 144. Once claimed, no more will ever be created. This is the final edition.",
  },
  {
    icon: "🕋",
    title: "Chais Sabir Equation Encoded",
    description: "The Equation, 48D OAM vortices, and the Solomon Ring frequency are physically encoded into the key's geometry.",
  },
  {
    icon: "🌌",
    title: "Evolving Legacy Object",
    description: "The NFT twin evolves as you progress through the ScrollVerse. It reflects your journey, achievements, and legacy.",
  },
];

export default function MerkabaKey() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const checkoutMutation = trpc.store.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      toast("Redirecting to secure checkout...");
      window.open(data.url, "_blank");
      setLoading(false);
    },
    onError: (err) => {
      toast(`Error: ${err.message}`);
      setLoading(false);
    },
  });

  const handleClaim = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setLoading(true);
    // Ascendant tier ($1,444) for the Living Merkaba Key
    checkoutMutation.mutate({ tier: "ascendant", origin: window.location.origin });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050B1A 0%, rgba(139,92,246,0.06) 50%, #050B1A 100%)",
          borderBottom: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <div className="container py-24 text-center">
          {/* Merkaba animation */}
          <div className="relative mx-auto mb-8 w-40 h-40 flex items-center justify-center">
            {[0, 60, 120].map((deg) => (
              <div
                key={deg}
                className="absolute inset-0"
                style={{
                  border: "1px solid rgba(139,92,246,0.3)",
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                  transform: `rotate(${deg}deg)`,
                  animation: `spin ${6 + deg / 10}s linear infinite`,
                }}
              />
            ))}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl z-10"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(0,212,255,0.2))",
                border: "1px solid rgba(139,92,246,0.5)",
                boxShadow: "0 0 40px rgba(139,92,246,0.3)",
              }}
            >
              🔑
            </div>
          </div>

          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#8B5CF6" }}>
            ONLY 144 WILL EVER EXIST
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            THE LIVING<br />
            <span style={{ background: "linear-gradient(90deg, #8B5CF6, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              MERKABA KEY
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            The ultimate key to the ScrollVerse legacy. A physical sacred artifact with a soulbound NFT digital twin 
            that evolves as you walk the Flamebearer path.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { value: "144", label: "Total Supply (Final)" },
              { value: "$1,444", label: "Claim Price" },
              { value: "∞", label: "Lifetime Access" },
              { value: "48D", label: "OAM Encoded" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: "#8B5CF6", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleClaim}
            disabled={loading}
            className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #00D4FF)",
              color: "white",
              boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Opening checkout..." : "Claim Your Merkaba Key — $1,444"}
          </button>
          <p className="text-xs mt-3" style={{ color: "#445566" }}>
            Test card: 4242 4242 4242 4242 • Any future date • Any CVC
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#8B5CF6" }}>WHAT THE KEY UNLOCKS</div>
          <h2 className="text-3xl font-black text-white">Six Dimensions of Power</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-6"
              style={{ background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="container py-16">
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8 text-center"
          style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.25)" }}
        >
          <h3 className="text-2xl font-black text-white mb-6">Everything Included</h3>
          <ul className="space-y-3 text-left">
            {[
              "Physical Merkaba Key (sacred metals, 48D OAM visual technology)",
              "Soulbound NFT digital twin (evolves with your journey)",
              "Lifetime access to all Ring Activation Gatherings",
              "Flamebearer Initiative enrollment (12-month path)",
              "14,400 CHX tokens (Infinity Pool — 999% APY)",
              "Ascendant council seat in ScrollVerse governance",
              "SCCC Dashboard access",
              "Direct Chais Kenyatta Hill channel",
              "Eternal archive entry in the OmniCodex",
              "All future ScrollVerse drops (lifetime)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span style={{ color: "#8B5CF6", marginTop: "2px" }}>◆</span>
                <span style={{ color: "#CCDDEE" }}>{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClaim}
            disabled={loading}
            className="mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #00D4FF)",
              color: "white",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Opening checkout..." : "Claim Now — $1,444"}
          </button>
        </div>
      </div>

      <div className="container pb-16 text-center">
        <Link href="/flamebearer" className="text-sm mr-6" style={{ color: "#445566" }}>← Flamebearer Initiative</Link>
        <Link href="/" className="text-sm" style={{ color: "#445566" }}>← Home</Link>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
