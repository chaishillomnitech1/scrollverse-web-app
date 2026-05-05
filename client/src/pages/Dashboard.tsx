import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const SOVEREIGN_WALLET = "0x377956c1471d9ce142df6932895839243da23a2c";

function useTreasuryBalance() {
  const [balance, setBalance] = useState("···");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("https://polygon-rpc.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", method: "eth_getBalance", params: [SOVEREIGN_WALLET, "latest"], id: 1 }),
        });
        const data = await res.json();
        if (data.result) {
          const matic = Number(BigInt(data.result)) / 1e18;
          setBalance(matic.toFixed(4) + " MATIC");
        }
      } catch { setBalance("—"); }
      finally { setLoading(false); }
    };
    fetchBalance();
    const iv = setInterval(fetchBalance, 30000);
    return () => clearInterval(iv);
  }, []);
  return { balance, loading };
}

const TIER_COLORS: Record<string, string> = {
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#8B5CF6",
};

function MetricCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: string;
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}25`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: color }}
        />
      </div>
      <div
        className="text-3xl font-black font-mono mb-1"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-sm font-semibold text-white">{label}</div>
      {sub && (
        <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function RevenueBar({
  tier,
  amount,
  maxAmount,
}: {
  tier: string;
  amount: number;
  maxAmount: number;
}) {
  const color = TIER_COLORS[tier ?? "guardian"] ?? "#00D4FF";
  const pct = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono capitalize" style={{ color }}>
          {tier ?? "Unknown"} Tier
        </span>
        <span className="text-sm font-mono text-white">
          ${(amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const { balance: treasuryBalance, loading: treasuryLoading } = useTreasuryBalance();
  const { data: metrics, isLoading } = trpc.store.getDashboardMetrics.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchInterval: 30000, // refresh every 30s
  });
  const { data: guardianData } = trpc.guardian.getCount.useQuery(undefined, {
    refetchInterval: 60000,
  });

  const totalRevenueDollars = useMemo(() => {
    return ((metrics?.totalRevenueCents ?? 0) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [metrics?.totalRevenueCents]);

  const maxTierRevenue = useMemo(() => {
    return Math.max(...(metrics?.byTier?.map((t: any) => Number(t.total)) ?? [0]));
  }, [metrics?.byTier]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A" }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }}
          />
          <div className="text-sm font-mono" style={{ color: "#8899AA" }}>
            Initializing SCCC...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A" }}
      >
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-6">🔐</div>
          <h1 className="text-2xl font-black text-white mb-3">
            SCCC Access Required
          </h1>
          <p className="mb-6" style={{ color: "#8899AA" }}>
            The Supreme Commander Control Core is restricted to authenticated
            Guardians. Sign in to access real-time empire metrics.
          </p>
          <a
            href={getLoginUrl()}
            className="inline-block px-8 py-3 rounded-xl font-bold"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #0066FF)",
              color: "white",
            }}
          >
            Sign In to Access SCCC
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(5,11,26,0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(0,212,255,0.1)",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #FFB800)",
                  color: "#050B1A",
                }}
              >
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  color: "#8B5CF6",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                SCCC
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 text-xs font-mono"
              style={{ color: "#00FF88" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#00FF88" }}
              />
              LIVE
            </div>
            <div className="text-sm" style={{ color: "#8899AA" }}>
              {user?.name ?? "Guardian"}
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-10">
        {/* Header */}
        <div className="mb-10">
          <div
            className="text-xs font-mono tracking-widest mb-2"
            style={{ color: "#8B5CF6" }}
          >
            SUPREME COMMANDER CONTROL CORE
          </div>
          <h1
            className="text-4xl font-black text-white mb-2"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Empire Dashboard
          </h1>
          <p style={{ color: "#8899AA" }}>
            Real-time metrics for the ScrollVerse Trinity sovereign ecosystem.
            Updates every 30 seconds.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-6 animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)", height: "140px" }}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Key metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <MetricCard
                icon="💰"
                label="Total Revenue"
                value={totalRevenueDollars}
                sub="All-time Stripe payments"
                color="#00FF88"
              />
              <MetricCard
                icon="🛡️"
                label="Total Guardians"
                value={(guardianData?.dbCount ?? metrics?.guardianCount ?? 0).toLocaleString()}
                sub={guardianData?.isLive ? "On-chain verified" : "Platform users"}
                color="#00D4FF"
              />
              <MetricCard
                icon="📦"
                label="Orders Completed"
                value={(metrics?.orderCount ?? 0).toLocaleString()}
                sub="Successful $LONDC purchases"
                color="#FFB800"
              />
              <MetricCard
                icon="🌌"
                label="Ecosystem Status"
                value="LIVE"
                sub="Portal · Academy · Store"
                color="#8B5CF6"
              />
            </div>

            {/* On-chain treasury */}
            <div className="rounded-xl p-5 mb-6 flex items-center justify-between" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: treasuryLoading ? "#8899AA" : "#00FF88" }} />
                <div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>SOVEREIGN TREASURY · POLYGON MAINNET · LIVE</div>
                  <div className="text-xl font-black font-mono" style={{ color: "#00FF88" }}>{treasuryBalance}</div>
                </div>
              </div>
              <a href={`https://polygonscan.com/address/${SOVEREIGN_WALLET}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono underline" style={{ color: "#00FF88" }}>View on Polygonscan →</a>
            </div>

            {/* Revenue by tier */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 className="font-bold text-white mb-6">Revenue by Tier</h2>
                {metrics?.byTier && metrics.byTier.length > 0 ? (
                  metrics.byTier.map((t: any) => (
                    <RevenueBar
                      key={t.tier}
                      tier={t.tier ?? "unknown"}
                      amount={Number(t.total)}
                      maxAmount={maxTierRevenue}
                    />
                  ))
                ) : (
                  <div
                    className="text-center py-8 text-sm font-mono"
                    style={{ color: "#8899AA" }}
                  >
                    No revenue events yet. Share the portal to attract Guardians.
                  </div>
                )}
              </div>

              {/* Recent activity */}
              <div
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 className="font-bold text-white mb-6">Recent Activity</h2>
                {metrics?.recentEvents && metrics.recentEvents.length > 0 ? (
                  <div className="space-y-3">
                    {metrics.recentEvents.map((ev: any) => (
                      <div
                        key={ev.id}
                        className="flex items-center justify-between py-2 border-b"
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      >
                        <div>
                          <div className="text-sm text-white capitalize">
                            {ev.eventType.replace(/_/g, " ")}
                          </div>
                          <div
                            className="text-xs font-mono"
                            style={{ color: "#8899AA" }}
                          >
                            {ev.productTier ?? "—"} ·{" "}
                            {new Date(ev.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div
                          className="text-sm font-mono font-bold"
                          style={{ color: "#00FF88" }}
                        >
                          +${(ev.amountCents / 100).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center py-8 text-sm font-mono"
                    style={{ color: "#8899AA" }}
                  >
                    Activity will appear here as Guardians join.
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/token", icon: "🪙", label: "$LONDC Store", color: "#FFB800" },
            { href: "/academy", icon: "🎓", label: "Academy", color: "#00D4FF" },
            { href: "/wallet", icon: "🔗", label: "Wallet Connect", color: "#8B5CF6" },
            { href: "/guardians", icon: "🛡️", label: "Guardians", color: "#00FF88" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className="rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-[1.03]"
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}25`,
                }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-bold" style={{ color: item.color }}>
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
