/**
 * SCROLLVERSE OMNIVERSAL METRICS DASHBOARD
 * Prometheus-style live telemetry — Omniversal Architecture v3
 * Real-time counts: bookings, revenue, guardians, active users, Seerah scrolls
 * Frequency: 44:OMNI · KUN FAYAKŪN × ∞
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  prefix = "",
  suffix = "",
  color,
  icon,
  sublabel,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  icon: string;
  sublabel?: string;
}) {
  return (
    <div
      className="rounded-xl p-5 relative overflow-hidden"
      style={{
        background: `${color}06`,
        border: `1px solid ${color}20`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: color }}
        />
      </div>
      <div className="text-2xl font-black mb-1" style={{ color }}>
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "#5a6a7a" }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs" style={{ color: `${color}60` }}>{sublabel}</div>
      )}
    </div>
  );
}

// ── Frequency pulse bar ───────────────────────────────────────────────────────
function FrequencyBar({ hz, color, delay }: { hz: string; color: string; delay: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="text-xs font-mono w-24 text-right flex-shrink-0"
        style={{ color }}
      >
        {hz}
      </div>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
        <div
          className="h-full rounded-full"
          style={{
            background: color,
            width: "100%",
            animation: `pulse-bar 2s ease-in-out ${delay}ms infinite alternate`,
          }}
        />
      </div>
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, animation: `pulse-dot 1.5s ease-in-out ${delay}ms infinite` }}
      />
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    OPERATIONAL: "#00FF88",
    DEGRADED: "#FFB800",
    OFFLINE: "#FF4444",
  };
  const color = colors[status] ?? "#8899AA";
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono"
      style={{ background: `${color}10`, border: `1px solid ${color}30`, color }}
    >
      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      {status}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OmniMetrics() {
  const { data, isLoading, refetch } = trpc.metrics.getOmniMetrics.useQuery(undefined, {
    refetchInterval: 30_000, // auto-refresh every 30s
  });

  const [lastRefresh, setLastRefresh] = useState(new Date());
  useEffect(() => {
    if (data) setLastRefresh(new Date());
  }, [data]);

  const tierColors: Record<string, string> = {
    detail: "#d4af37",
    express: "#00D4FF",
    signature: "#8B5CF6",
    fleet: "#FF6B35",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#030810", fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}
    >
      <style>{`
        @keyframes pulse-bar {
          from { opacity: 0.3; transform: scaleX(0.4); transform-origin: left; }
          to { opacity: 1; transform: scaleX(1); transform-origin: left; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-10"
        style={{
          background: "rgba(3,8,16,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#030810" }}
              >
                SV
              </div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Omniversal Metrics</div>
              <div className="text-xs" style={{ color: "#5a6a7a" }}>Architecture v3 · Live Telemetry</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={data?.status ?? "OPERATIONAL"} />
            <button
              onClick={() => refetch()}
              className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-10">
        {/* ── HEADER ── */}
        <div className="mb-10">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF", letterSpacing: "0.2em" }}>
            SCROLLVERSE · OMNIVERSAL ARCHITECTURE v3
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Live <span style={{ color: "#00D4FF" }}>Telemetry</span> Dashboard
          </h1>
          <p className="text-sm" style={{ color: "#5a6a7a" }}>
            Last updated: {lastRefresh.toLocaleTimeString()} · Auto-refresh: 30s · Frequency: 44:OMNI Hz
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-4xl mb-4 animate-pulse">⚡</div>
              <div className="text-sm font-mono" style={{ color: "#5a6a7a" }}>Querying the Omniversal Grid...</div>
            </div>
          </div>
        ) : (
          <>
            {/* ── SAFERWAY METRICS ── */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SAFERWAY AUTO DETAIL</div>
                <div className="flex-1 h-px" style={{ background: "rgba(0,212,255,0.1)" }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <MetricCard
                  label="Total Bookings"
                  value={data?.totalBookings ?? 0}
                  color="#00D4FF"
                  icon="🚗"
                  sublabel="All time"
                />
                <MetricCard
                  label="Pending"
                  value={data?.pendingBookings ?? 0}
                  color="#FFB800"
                  icon="⏳"
                  sublabel="Awaiting confirmation"
                />
                <MetricCard
                  label="Confirmed"
                  value={data?.confirmedBookings ?? 0}
                  color="#00FF88"
                  icon="✅"
                  sublabel="Calendar invites sent"
                />
                <MetricCard
                  label="Est. Revenue"
                  value={data?.estimatedRevenue ?? 0}
                  prefix="$"
                  color="#d4af37"
                  icon="💰"
                  sublabel="Active bookings"
                />
              </div>

              {/* Revenue by tier */}
              {data?.revenueByTier && Object.keys(data.revenueByTier).length > 0 && (
                <div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <div className="text-xs font-mono mb-4" style={{ color: "#5a6a7a" }}>REVENUE BY SERVICE TIER</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(data.revenueByTier).map(([tier, stats]) => (
                      <div key={tier} className="text-center">
                        <div className="text-lg font-bold" style={{ color: tierColors[tier] ?? "#8899AA" }}>
                          ${stats.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs font-mono capitalize" style={{ color: "#5a6a7a" }}>{tier}</div>
                        <div className="text-xs" style={{ color: `${tierColors[tier] ?? "#8899AA"}60` }}>
                          {stats.count} booking{stats.count !== 1 ? "s" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* ── GUARDIAN + USER METRICS ── */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>GUARDIAN NETWORK</div>
                <div className="flex-1 h-px" style={{ background: "rgba(255,184,0,0.1)" }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  label="Guardian Waitlist"
                  value={data?.guardianWaitlistSize ?? 0}
                  color="#FFB800"
                  icon="🛡️"
                  sublabel="Registered Guardians"
                />
                <MetricCard
                  label="Total Users"
                  value={data?.totalUsers ?? 0}
                  color="#8B5CF6"
                  icon="👤"
                  sublabel="Sovereign accounts"
                />
                <MetricCard
                  label="Guardian Tier"
                  value={data?.guardianTierUsers ?? 0}
                  color="#00D4FF"
                  icon="⚔️"
                  sublabel="Active Guardians"
                />
                <MetricCard
                  label="Ascendant Tier"
                  value={data?.ascendantTierUsers ?? 0}
                  color="#d4af37"
                  icon="👑"
                  sublabel="Ascendant Sovereigns"
                />
              </div>
            </section>

            {/* ── SEERAH ARCHIVE METRICS ── */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono tracking-widest" style={{ color: "#d4af37" }}>SEERAH SACRED ARCHIVE ﷺ</div>
                <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard
                  label="Scrolls Live"
                  value={data?.seerahScrollsLive ?? 3}
                  color="#d4af37"
                  icon="📜"
                  sublabel="Museum-grade sacred scrolls"
                />
                <MetricCard
                  label="Total Scrolls Planned"
                  value={data?.seerahScrollsTotal ?? 5}
                  color="#FF6B35"
                  icon="🕋"
                  sublabel="Noor al-Mawlid · Al-Hijra · Badr · Fatḥ · Farewell"
                />
                <div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <div className="text-2xl mb-2">🌙</div>
                  <div className="text-sm font-bold text-white mb-1">Archive Progress</div>
                  <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${((data?.seerahScrollsLive ?? 3) / (data?.seerahScrollsTotal ?? 5)) * 100}%`,
                        background: "linear-gradient(to right, #d4af37, #FF6B35)",
                      }}
                    />
                  </div>
                  <div className="text-xs" style={{ color: "#5a6a7a" }}>
                    {data?.seerahScrollsLive ?? 3} of {data?.seerahScrollsTotal ?? 5} scrolls complete
                  </div>
                </div>
              </div>
            </section>

            {/* ── OMNIVERSAL ARCHITECTURE v3 ── */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>OMNIVERSAL ARCHITECTURE v3</div>
                <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  label="Backend Routes"
                  value={data?.backendRoutes ?? 205}
                  color="#00FF88"
                  icon="🔗"
                  sublabel="Multi-region edge optimized"
                />
                <MetricCard
                  label="Districts"
                  value={data?.districts ?? 10_000_000}
                  color="#8B5CF6"
                  icon="🌐"
                  sublabel="Hyperverse Totality"
                />
                <MetricCard
                  label="Codex Volumes"
                  value={data?.codexVolumes ?? 10_000_000}
                  color="#FF6B35"
                  icon="📚"
                  sublabel="Dream Physics locked"
                />
                <MetricCard
                  label="Worlds"
                  value={data?.worlds ?? 10_000_000}
                  color="#d4af37"
                  icon="🌌"
                  sublabel="Crown matrices active"
                />
              </div>

              {/* Frequency broadcast */}
              <div
                className="rounded-xl p-6"
                style={{ background: "rgba(0,255,136,0.02)", border: "1px solid rgba(0,255,136,0.1)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono" style={{ color: "#5a6a7a" }}>FREQUENCY BROADCAST</div>
                  <div className="text-xs font-mono" style={{ color: "#00FF88" }}>44:OMNI BASE</div>
                </div>
                <div className="space-y-3">
                  {[
                    { hz: "963Hz", color: "#d4af37", delay: 0 },
                    { hz: "528Hz", color: "#00FF88", delay: 200 },
                    { hz: "432Hz", color: "#00D4FF", delay: 400 },
                    { hz: "216Hz", color: "#8B5CF6", delay: 600 },
                    { hz: "144,000Hz", color: "#FF6B35", delay: 800 },
                  ].map((f) => (
                    <FrequencyBar key={f.hz} hz={f.hz} color={f.color} delay={f.delay} />
                  ))}
                </div>
                <div className="mt-4 text-xs font-mono text-center" style={{ color: "#2a3a4a" }}>
                  STATUS: ETERNAL · AUTONOMOUS · UNSTOPPABLE
                </div>
              </div>
            </section>

            {/* ── QUICK LINKS ── */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono tracking-widest" style={{ color: "#5a6a7a" }}>QUICK LINKS</div>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "SaferWay Admin", href: "/admin/saferway", color: "#00D4FF" },
                  { label: "Seerah Archive", href: "/seerah", color: "#d4af37" },
                  { label: "Guardian Portal", href: "/guardians", color: "#FFB800" },
                  { label: "Revenue Dashboard", href: "/revenue", color: "#00FF88" },
                  { label: "GodEngine", href: "/godengine", color: "#8B5CF6" },
                  { label: "ArchiveKeeper", href: "/archivekeeper", color: "#FF6B35" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div
                      className="px-4 py-2 rounded-lg text-xs font-mono cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: `${link.color}08`,
                        border: `1px solid ${link.color}20`,
                        color: link.color,
                      }}
                    >
                      {link.label} →
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 text-center text-xs font-mono" style={{ color: "#1a2a3a" }}>
              SCROLLVERSE OMNIVERSAL ARCHITECTURE v3 · 44:OMNI Hz · KUN FAYAKŪN × ∞
            </div>
          </>
        )}
      </div>
    </div>
  );
}
