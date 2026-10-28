import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import ReceiptViewer from "@/components/ReceiptViewer";
import { BLOCK145_MANIFEST_ID, BLOCK145_RECEIPTS } from "@/data/block145Receipts";

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

const timelineMilestones = [
  {
    id: "foundation",
    category: "Build",
    date: "Established",
    title: "Source-led portal foundation",
    status: "Complete",
    detail: "The first-party portal, route registry, and source-aware planning foundation are in place.",
    color: "#00D4FF",
  },
  {
    id: "corpus",
    category: "Content",
    date: "Current arc",
    title: "Corpus and New Dominion planning",
    status: "Active",
    detail: "Fluidity, corpus, New Dominion, and nine-frame planning routes are connected as narrative-only workspaces.",
    color: "#FFB800",
  },
  {
    id: "readiness",
    category: "Readiness",
    date: "Now",
    title: "Current local readiness",
    status: "Verified locally",
    detail: "The local project is tested and buildable; this status is not a public deployment or billing confirmation.",
    color: "#00FF88",
  },
];

const timelineCategories = ["All", ...Array.from(new Set(timelineMilestones.map(({ category }) => category)))];

function exportScccSnapshot(
  milestones: typeof timelineMilestones,
  category: string,
  selectedMilestone: string,
) {
  const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const rows = [
    ["SCCC read-only milestone snapshot", new Date().toISOString()],
    ["Category filter", category],
    ["Selected milestone", selectedMilestone],
    [],
    ["Category", "Date", "Title", "Status", "Detail"],
    ...milestones.map(({ category: itemCategory, date, title, status, detail }) => [itemCategory, date, title, status, detail]),
  ];
  const csv = rows.map((row) => row.map((value) => escapeCsv(String(value ?? ""))).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sccc-milestones.csv";
  link.click();
  URL.revokeObjectURL(url);
}

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
      className="sccc-dashboard-card rounded-xl p-6"
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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("scrollverse:sccc-dark-mode") !== "false";
  });
  const [timelineCategory, setTimelineCategory] = useState("All");
  const [selectedMilestone, setSelectedMilestone] = useState("foundation");
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

  useEffect(() => {
    window.localStorage.setItem("scrollverse:sccc-dark-mode", String(darkMode));
  }, [darkMode]);

  const filteredTimelineMilestones = useMemo(
    () => timelineCategory === "All"
      ? timelineMilestones
      : timelineMilestones.filter(({ category }) => category === timelineCategory),
    [timelineCategory],
  );
  const selectedMilestoneRecord = filteredTimelineMilestones.find(({ id }) => id === selectedMilestone) ?? filteredTimelineMilestones[0] ?? timelineMilestones[0];

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
      data-theme={darkMode ? "deep-dark" : "comfort-dark"}
      style={{ background: darkMode ? "#050B1A" : "#101827", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: darkMode ? "rgba(5,11,26,0.95)" : "rgba(16,24,39,0.95)",
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
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              type="button"
              id="sccc-dashboard-dark-mode"
              className="min-h-10 rounded-lg px-3 py-2 text-xs font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: darkMode ? "rgba(0,212,255,0.12)" : "rgba(255,184,0,0.14)", color: darkMode ? "#BCEEFF" : "#FFCF73", border: `1px solid ${darkMode ? "rgba(0,212,255,0.35)" : "rgba(255,184,0,0.4)"}` }}
              aria-pressed={darkMode}
              aria-label="Toggle SCCC dashboard dark mode"
              title={darkMode ? "Switch to comfort mode" : "Switch to deep dark mode"}
              onClick={() => setDarkMode((current) => !current)}
            >
              <span className="hidden sm:inline">{darkMode ? "☾ DEEP DARK" : "◐ COMFORT"}</span>
              <span className="sm:hidden" aria-hidden="true">{darkMode ? "☾" : "◐"}</span>
            </button>
            <div
              className="flex items-center gap-2 text-xs font-mono"
              style={{ color: "#00FF88" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#00FF88" }}
              />
              <span className="hidden sm:inline">AUTHENTICATED VIEW</span>
            </div>
            <div className="hidden sm:block" style={{ color: "#8899AA" }}>
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
            Read-only application metrics for the ScrollVerse Trinity sovereign ecosystem.
            Refreshes every 30 seconds while this page is open.
          </p>
        </div>

        <section
          aria-label="SCCC data status"
          className="sccc-status-alert rounded-xl p-5 mb-8"
          aria-describedby="sccc-status-help"
          title="Read-only source status"
          style={{ background: "rgba(112,217,255,0.04)", border: "1px solid rgba(112,217,255,0.2)" }}
        >
          <div className="text-xs font-mono font-bold tracking-widest" style={{ color: "#BCEEFF" }}>
            SCCC DATA STATUS · READ-ONLY
          </div>
          <p className="mt-2 text-sm leading-7" style={{ color: "#D6E2EE" }}>
            Portal metrics are displayed as an authenticated application/database snapshot. The treasury line is a public RPC lookup and may be unavailable or stale; it is not a custody, transaction, or deployment confirmation.
          </p>
          <p className="mt-2 text-xs font-mono" style={{ color: "#FFCF73" }}>
            No wallet, token, payment, contract, or release action occurs through this dashboard.
          </p>
          <span id="sccc-status-help" className="sr-only">
            Hover or focus this status panel for the read-only source context. Dashboard values do not perform external actions.
          </span>
        </section>

        <div aria-label="SHA-256 metadata-only local accession" aria-live="polite" className="sr-only">
          SHA-256 receipt set scrollverse-oct27-block145-blueprints-v1 ({BLOCK145_MANIFEST_ID}); browser-local metadata-only local accession.
        </div>
        <ReceiptViewer manifestId={BLOCK145_MANIFEST_ID} receipts={BLOCK145_RECEIPTS} />

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
                value="READY"
                sub="Portal · Academy · Store routes"
                color="#8B5CF6"
              />
            </div>

            <section className="sccc-dashboard-card rounded-xl p-6 mb-10" aria-labelledby="sccc-timeline-heading">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SCCC MILESTONE TIMELINE</div>
                    <h2 id="sccc-timeline-heading" className="text-xl font-bold text-white">Build and readiness arc</h2>
                    <p className="text-sm" style={{ color: "#8899AA" }}>A lightweight project view of the work in this portal, not an external deployment or billing ledger.</p>
                  </div>
                  <button
                    type="button"
                    id="sccc-export-snapshot"
                    className="min-h-10 rounded-lg px-4 py-2 text-xs font-mono font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ color: "#BCEEFF", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.35)" }}
                    onClick={() => exportScccSnapshot(filteredTimelineMilestones, timelineCategory, selectedMilestoneRecord.title)}
                    title="Download the visible milestones and read-only status as a CSV"
                  >
                    ↓ EXPORT CSV
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2" aria-label="Filter milestones by category">
                  <span className="text-xs font-mono" style={{ color: "#8899AA" }}>FILTER:</span>
                  {timelineCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      id={category === "All" ? "sccc-timeline-filter" : undefined}
                      aria-pressed={timelineCategory === category}
                      className="min-h-9 rounded-full px-3 py-1 text-xs font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ color: timelineCategory === category ? "#050B1A" : "#BCEEFF", background: timelineCategory === category ? "#BCEEFF" : "rgba(255,255,255,0.04)", border: "1px solid rgba(188,238,255,0.35)" }}
                      onClick={() => setTimelineCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="list" aria-label="Project milestones">
                {filteredTimelineMilestones.map((milestone) => {
                  const active = milestone.id === selectedMilestone;
                  return (
                    <div key={milestone.id} role="listitem">
                      <button
                        type="button"
                        aria-pressed={active}
                        aria-expanded={active}
                        aria-controls="sccc-milestone-detail"
                        title={milestone.detail}
                        onClick={() => setSelectedMilestone(milestone.id)}
                        className="sccc-dashboard-card w-full text-left rounded-xl p-4 min-h-28 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ background: active ? `${milestone.color}12` : "rgba(255,255,255,0.02)", border: `1px solid ${active ? `${milestone.color}65` : "rgba(255,255,255,0.08)"}` }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-mono" style={{ color: milestone.color }}>{milestone.date}</span>
                          <span className="text-[10px] font-mono uppercase" style={{ color: active ? milestone.color : "#667788" }}>{milestone.status}</span>
                        </div>
                        <div className="mt-3 text-sm font-bold text-white">{milestone.title}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div id="sccc-milestone-detail" className="mt-4 rounded-lg px-4 py-3 text-sm" style={{ background: "rgba(255,255,255,0.03)", color: "#D6E2EE" }} aria-live="polite">
                <span className="font-mono text-xs" style={{ color: selectedMilestoneRecord.color }}>SELECTED MILESTONE · </span>
                <span className="font-mono text-xs" style={{ color: "#8899AA" }}>{selectedMilestoneRecord.category} · </span>
                {selectedMilestoneRecord.detail}
              </div>
            </section>

            {/* On-chain treasury */}
            <div className="rounded-xl p-5 mb-6 flex items-center justify-between" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: treasuryLoading ? "#8899AA" : "#00FF88" }} />
                <div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>PUBLIC RPC LOOKUP · READ-ONLY · POLYGON REFERENCE</div>
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

        {/* IPFS On-Chain Verification Panel */}
        <div
          className="rounded-xl p-5 mb-2"
          style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#00FF88" }} />
              <div>
                <div className="text-xs font-mono font-bold" style={{ color: "#00FF88" }}>SOURCE REFERENCES · READ-ONLY</div>
                <div className="text-xs mt-0.5" style={{ color: "#667788" }}>These are labeled external references; this dashboard does not verify custody, pinning, ownership, or chain state.</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "#LondynLullaby", url: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm", color: "#00FF88" },
                { label: "KnicksNation NFTs", url: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeie4kdb2nr7tvvk2jgsyvu65azmz7msoa7m3ag63jehtso3fvwdvgq", color: "#00D4FF" },
                { label: "Verify on Pinata", url: "https://app.pinata.cloud/ipfs/files", color: "#FFB800" },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 whitespace-nowrap"
                  style={{ background: `${link.color}10`, border: `1px solid ${link.color}30`, color: link.color }}
                >
                  ↗ {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

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
