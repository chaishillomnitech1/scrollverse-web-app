/**
 * GLOBAL DASHBOARD — ScrollVerse Trinity Sovereign Command Center
 * Live stats from all DB tables, route map, and empire metrics
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const CATEGORY_COLORS: Record<string, string> = {
  Core: "#00D4FF",
  DeFi: "#FFB800",
  NFT: "#FF6B35",
  Education: "#00FF88",
  AI: "#9B59B6",
  Community: "#E74C3C",
  DAO: "#3498DB",
  Finance: "#2ECC71",
  Expansion: "#F39C12",
  Archive: "#95A5A6",
  Spiritual: "#8E44AD",
  Wallet: "#16A085",
  Compliance: "#C0392B",
  Growth: "#27AE60",
};

function StatCard({ label, value, icon, color, sublabel }: { label: string; value: string | number; icon: string; color: string; sublabel?: string }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}20` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{label}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
      {sublabel && <div className="text-xs" style={{ color: "#667788" }}>{sublabel}</div>}
    </div>
  );
}

function RouteCard({ path, label, category, icon }: { path: string; label: string; category: string; icon: string }) {
  const color = CATEGORY_COLORS[category] || "#8899AA";
  return (
    <Link href={path}>
      <div
        className="rounded-lg p-3 cursor-pointer transition-all duration-200 hover:scale-105"
        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}15` }}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <div>
            <div className="text-xs font-semibold text-white">{label}</div>
            <div className="text-xs" style={{ color }}>{category}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function GlobalDashboard() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: stats, isLoading: statsLoading } = trpc.globalDashboard.getStats.useQuery();
  const { data: routes } = trpc.globalDashboard.getRoutes.useQuery();

  const categories = routes ? Array.from(new Set(routes.map(r => r.category))) : [];
  const filteredRoutes = routes
    ? activeCategory
      ? routes.filter(r => r.category === activeCategory)
      : routes
    : [];

  const formatNumber = (n: number) => n.toLocaleString();
  const formatDollars = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,184,0,0.03) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>SOVEREIGN COMMAND CENTER</div>
            <h1 className="text-3xl font-black text-white">Global Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
              Live empire metrics — ScrollVerse Trinity v3.0
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>SCROLL VERSE LLC</div>
            <div className="text-xs font-mono" style={{ color: "#445566" }}>EIN 42-2509570</div>
            {stats && (
              <div className="text-xs font-mono mt-1" style={{ color: "#00FF88" }}>
                Updated {new Date(stats.timestamp).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Primary Revenue Stats */}
        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl p-4 animate-pulse" style={{ background: "rgba(255,255,255,0.03)", height: 100 }} />
            ))}
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Total Revenue" value={formatDollars(stats.totalRevenueDollars)} icon="💰" color="#00FF88" sublabel={`${formatNumber(stats.stripeOrders)} orders`} />
              <StatCard label="Guardians" value={formatNumber(stats.guardians)} icon="🛡️" color="#00D4FF" sublabel="Waitlist entries" />
              <StatCard label="CHX Reserved" value={formatDollars(stats.totalChxReservedUsdDollars)} icon="💎" color="#FFB800" sublabel={`${formatNumber(stats.chxReservations)} reservations`} />
              <StatCard label="Staking Positions" value={formatNumber(stats.stakingPositions)} icon="⚡" color="#FF6B35" sublabel="Active positions" />
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              <StatCard label="Users" value={formatNumber(stats.users)} icon="👤" color="#9B59B6" />
              <StatCard label="NFT Listings" value={formatNumber(stats.nftListings)} icon="🖼️" color="#E74C3C" />
              <StatCard label="Legion" value={formatNumber(stats.legionInvestors)} icon="⚔️" color="#3498DB" />
              <StatCard label="Creators" value={formatNumber(stats.creators)} icon="🎨" color="#2ECC71" />
              <StatCard label="Knowledge" value={formatNumber(stats.knowledgeEntries)} icon="🧠" color="#F39C12" />
              <StatCard label="Broadcasts" value={formatNumber(stats.broadcasts)} icon="📡" color="#16A085" />
              <StatCard label="Book Mints" value={formatNumber(stats.bookMints)} icon="📖" color="#8E44AD" />
              <StatCard label="Proposals" value={formatNumber(stats.governanceProposals)} icon="🗳️" color="#27AE60" />
              <StatCard label="Legion Posts" value={formatNumber(stats.legionPosts)} icon="📝" color="#C0392B" />
              <StatCard label="UAP Docs" value={formatNumber(stats.uapDocuments)} icon="🛸" color="#00D4FF" />
              <StatCard label="UAP Entities" value={formatNumber(stats.uapEntities)} icon="👽" color="#FFB800" />
              <StatCard label="Exchange Orders" value={formatNumber(stats.exchangeOrders)} icon="📈" color="#00FF88" />
            </div>
          </>
        ) : null}

        {/* Route Map */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Empire Route Map</h2>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{filteredRoutes.length} routes</div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCategory(null)}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all"
              style={{
                background: !activeCategory ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${!activeCategory ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: !activeCategory ? "#00D4FF" : "#8899AA",
              }}
            >
              All
            </button>
            {categories.map(cat => {
              const color = CATEGORY_COLORS[cat] || "#8899AA";
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className="px-3 py-1 rounded-full text-xs font-mono transition-all"
                  style={{
                    background: isActive ? `${color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? `${color}50` : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? color : "#8899AA",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredRoutes.map(route => (
              <RouteCard key={route.path} {...route} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            SCROLL VERSE LLC · EIN 42-2509570 · XLVIII BLOCKS LLC · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
