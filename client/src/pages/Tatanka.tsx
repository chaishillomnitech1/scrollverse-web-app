/*
 * TATANKA PROTOCOL — Sovereign Land Restoration Tracker
 * Every CHX staked = 1 sq ft of sovereign land restored.
 * Design: Earth-toned dark palette, Afrofuturism meets ecological sovereignty.
 */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { Link } from "wouter";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const CHX_TO_SQFT = 1; // 1 CHX compounded = 1 sq ft restored
const SQFT_TO_ACRES = 1 / 43560;

// Restoration zones — sovereign land territories
const RESTORATION_ZONES = [
  {
    id: "south-jersey",
    name: "South Jersey Corridor",
    lat: 39.9, lng: -75.1,
    status: "active" as const,
    sqft: 14400,
    description: "Urban soil restoration and community garden network",
    color: "#00FF88",
  },
  {
    id: "philadelphia",
    name: "Philadelphia Sovereign Block",
    lat: 39.95, lng: -75.17,
    status: "active" as const,
    sqft: 7200,
    description: "Historic district green corridor and food forest",
    color: "#00D4FF",
  },
  {
    id: "miami-brickell",
    name: "Miami Brickell Node",
    lat: 25.76, lng: -80.19,
    status: "active" as const,
    sqft: 14400,
    description: "Coastal mangrove restoration and sovereign garden",
    color: "#FFB800",
  },
  {
    id: "new-york",
    name: "New York Empire Node",
    lat: 40.71, lng: -74.0,
    status: "growing" as const,
    sqft: 4320,
    description: "Rooftop sovereignty network and urban forest",
    color: "#FF6B35",
  },
  {
    id: "london",
    name: "London Sovereign Outpost",
    lat: 51.51, lng: -0.12,
    status: "growing" as const,
    sqft: 2880,
    description: "Community land trust and heritage seed bank",
    color: "#9B59B6",
  },
  {
    id: "dubai",
    name: "Dubai Desert Reclamation",
    lat: 25.2, lng: 55.27,
    status: "planned" as const,
    sqft: 0,
    description: "Desert greening initiative — Phase 2 activation",
    color: "#E74C3C",
  },
  {
    id: "west-africa",
    name: "West Africa Ancestral Land",
    lat: 6.37, lng: 2.39,
    status: "planned" as const,
    sqft: 0,
    description: "Ancestral land reclamation — Phase 3 activation",
    color: "#27AE60",
  },
];

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────
function AnimatedCounter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      ref.current = current;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return (
    <span>
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

// ── ZONE CARD ──────────────────────────────────────────────────────────────
function ZoneCard({ zone, selected, onClick }: {
  zone: typeof RESTORATION_ZONES[0];
  selected: boolean;
  onClick: () => void;
}) {
  const statusLabel = { active: "🟢 ACTIVE", growing: "🟡 GROWING", planned: "⚪ PLANNED" }[zone.status];
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all duration-300"
      style={{
        background: selected ? `${zone.color}12` : "rgba(255,255,255,0.03)",
        border: `1px solid ${selected ? zone.color + "60" : "rgba(255,255,255,0.08)"}`,
        transform: selected ? "scale(1.02)" : "scale(1)",
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs font-mono" style={{ color: zone.color }}>{statusLabel}</div>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          {zone.sqft > 0 ? `${zone.sqft.toLocaleString()} sq ft` : "Pending"}
        </div>
      </div>
      <div className="font-bold text-white text-sm mb-1">{zone.name}</div>
      <div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{zone.description}</div>
      {zone.sqft > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min((zone.sqft / 14400) * 100, 100)}%`,
                background: `linear-gradient(90deg, ${zone.color}, ${zone.color}80)`,
              }}
            />
          </div>
          <span className="text-xs font-mono" style={{ color: zone.color }}>
            {(zone.sqft * SQFT_TO_ACRES).toFixed(3)} ac
          </span>
        </div>
      )}
    </div>
  );
}

// ── SVG MAP ────────────────────────────────────────────────────────────────
function RestorationMap({ zones, selectedZone, onSelectZone }: {
  zones: typeof RESTORATION_ZONES;
  selectedZone: string | null;
  onSelectZone: (id: string) => void;
}) {
  // Simple Mercator projection for world map
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(0,10,20,0.8)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <svg viewBox="0 0 800 400" className="w-full" style={{ height: "320px" }}>
        {/* World outline — simplified continents */}
        <rect width="800" height="400" fill="rgba(0,5,15,0.9)" />
        {/* Grid lines */}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="rgba(0,212,255,0.05)" strokeWidth="0.5" />
        ))}
        {[0, 100, 200, 300, 400].map(y => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(0,212,255,0.05)" strokeWidth="0.5" />
        ))}
        {/* Equator */}
        <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        {/* Tropic lines */}
        <line x1="0" y1="153" x2="800" y2="153" stroke="rgba(255,184,0,0.08)" strokeWidth="0.5" strokeDasharray="2,6" />
        <line x1="0" y1="247" x2="800" y2="247" stroke="rgba(255,184,0,0.08)" strokeWidth="0.5" strokeDasharray="2,6" />

        {/* Zone nodes */}
        {zones.map(zone => {
          const { x, y } = project(zone.lat, zone.lng);
          const isSelected = selectedZone === zone.id;
          const isActive = zone.status === "active";
          return (
            <g key={zone.id} style={{ cursor: "pointer" }} onClick={() => onSelectZone(zone.id)}>
              {/* Pulse ring */}
              {isActive && (
                <circle cx={x} cy={y} r={isSelected ? 20 : 14} fill="none" stroke={zone.color} strokeWidth="1" strokeOpacity="0.3">
                  <animate attributeName="r" values={isSelected ? "16;24;16" : "10;18;10"} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Main dot */}
              <circle
                cx={x} cy={y}
                r={isSelected ? 8 : 5}
                fill={zone.color}
                fillOpacity={zone.status === "planned" ? 0.3 : 0.9}
                style={{ filter: isSelected ? `drop-shadow(0 0 8px ${zone.color})` : "none" }}
              />
              {/* Label */}
              {isSelected && (
                <text x={x + 12} y={y + 4} fill={zone.color} fontSize="9" fontFamily="monospace">
                  {zone.name.split(" ")[0]}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(16, 360)">
          <circle cx="6" cy="6" r="4" fill="#00FF88" />
          <text x="14" y="10" fill="#8899AA" fontSize="8" fontFamily="monospace">ACTIVE</text>
          <circle cx="66" cy="6" r="4" fill="#FFB800" />
          <text x="74" y="10" fill="#8899AA" fontSize="8" fontFamily="monospace">GROWING</text>
          <circle cx="130" cy="6" r="4" fill="rgba(255,255,255,0.3)" />
          <text x="138" y="10" fill="#8899AA" fontSize="8" fontFamily="monospace">PLANNED</text>
        </g>
      </svg>
      <div className="absolute top-3 left-4 text-xs font-mono" style={{ color: "#00D4FF" }}>
        🌍 TATANKA RESTORATION GRID — {zones.filter(z => z.status === "active").length} ACTIVE ZONES
      </div>
    </div>
  );
}

// ── LEADERBOARD ROW ────────────────────────────────────────────────────────
function LeaderboardRow({ rank, entry }: {
  rank: number;
  entry: { code: string; creatorName: string | null; tier: string | null; conversions: number; rewardTokens: number | null };
}) {
  const medals = ["🥇", "🥈", "🥉"];
  const medal = rank <= 3 ? medals[rank - 1] : `#${rank}`;
  const acresRestored = (entry.conversions * 144 * SQFT_TO_ACRES).toFixed(4);
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200"
      style={{
        background: rank <= 3 ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${rank <= 3 ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)"}`,
      }}
    >
      <div className="w-8 text-center text-sm font-bold">{medal}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">
          {entry.creatorName || `Guardian ${entry.code}`}
        </div>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          {entry.tier || "Guardian"} · {entry.conversions} conversions
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold" style={{ color: "#00FF88" }}>🌿 {acresRestored} ac</div>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          {(entry.conversions * 144).toLocaleString()} sq ft
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Tatanka() {
  useSovereignHeartbeat({ page: "tatanka" });
  const [selectedZone, setSelectedZone] = useState<string | null>("miami-brickell");

  const { data: poolStats } = trpc.staking.getPoolStats.useQuery();
  const { data: leaderboard } = trpc.referral.getLeaderboard.useQuery();

  // Compute empire-wide totals
  const totalCHX = poolStats?.pools?.reduce((sum, p) => sum + p.tvl, 0) ?? 0;
  const totalSqFt = totalCHX * CHX_TO_SQFT;
  const totalAcres = totalSqFt * SQFT_TO_ACRES;
  const zoneSqFt = RESTORATION_ZONES.reduce((sum, z) => sum + z.sqft, 0);
  const activeZones = RESTORATION_ZONES.filter(z => z.status === "active").length;
  const selectedZoneData = RESTORATION_ZONES.find(z => z.id === selectedZone);

  return (
    <div className="min-h-screen" style={{ background: "#030A06", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(3,10,6,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,136,0.1)" }}>
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#030A06" }}>
              SV
            </div>
            <span className="font-bold text-white">ScrollVerse</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
              TATANKA
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/staking">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "#8899AA" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00FF88")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8899AA")}>
              Stake CHX
            </span>
          </Link>
          <Link href="/guardian-dashboard">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "#8899AA" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00FF88")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8899AA")}>
              Dashboard
            </span>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden px-6 pt-16 pb-12 text-center">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full opacity-20"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: "#00FF88",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00FF88" }}>
          🌿 TATANKA PROTOCOL — SOVEREIGN LAND RESTORATION
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
          Every CHX Staked<br />
          <span style={{ color: "#00FF88" }}>Restores Sovereign Land</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
          1 CHX compounded = 1 sq ft of sovereign land restored. The empire grows in the digital realm
          and the physical world simultaneously. KUN FAYAKŪN × ∞
        </p>

        {/* Empire-wide stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "CHX Staked Empire-Wide", value: totalCHX, suffix: " CHX", color: "#00D4FF" },
            { label: "Sq Ft Restored", value: totalSqFt + zoneSqFt, suffix: " sq ft", color: "#00FF88" },
            { label: "Acres Restored", value: (totalSqFt + zoneSqFt) * SQFT_TO_ACRES, decimals: 3, suffix: " ac", color: "#FFB800" },
            { label: "Active Zones", value: activeZones, suffix: " zones", color: "#FF6B35" },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-4 text-center"
              style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
              <div className="text-2xl font-black" style={{ color: stat.color, fontFamily: "'Space Mono', monospace" }}>
                <AnimatedCounter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAP + ZONES ── */}
      <div className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Map */}
          <div className="md:col-span-2">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
              RESTORATION ZONE MAP
            </div>
            <RestorationMap
              zones={RESTORATION_ZONES}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
            />
            {selectedZoneData && (
              <div className="mt-4 rounded-xl p-4"
                style={{ background: `${selectedZoneData.color}08`, border: `1px solid ${selectedZoneData.color}30` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-white">{selectedZoneData.name}</div>
                  <div className="text-xs font-mono px-2 py-1 rounded"
                    style={{ background: `${selectedZoneData.color}20`, color: selectedZoneData.color }}>
                    {selectedZoneData.status.toUpperCase()}
                  </div>
                </div>
                <div className="text-sm mb-3" style={{ color: "#8899AA" }}>{selectedZoneData.description}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: selectedZoneData.color }}>
                      {selectedZoneData.sqft.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: selectedZoneData.color }}>
                      {(selectedZoneData.sqft * SQFT_TO_ACRES).toFixed(4)}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Acres</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: selectedZoneData.color }}>
                      {selectedZoneData.sqft > 0 ? "LIVE" : "Q3 2026"}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Status</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zone list */}
          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
              ALL ZONES ({RESTORATION_ZONES.length})
            </div>
            <div className="space-y-3">
              {RESTORATION_ZONES.map(zone => (
                <ZoneCard
                  key={zone.id}
                  zone={zone}
                  selected={selectedZone === zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GUARDIAN LEADERBOARD ── */}
      <div className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>
            GUARDIAN RESTORATION LEADERBOARD
          </div>
          <h2 className="text-3xl font-black text-white">Ranked by Land Restored</h2>
          <p className="text-sm mt-2" style={{ color: "#8899AA" }}>
            Each Guardian referral conversion = 144 sq ft of land restored. The more you grow the empire, the more land is healed.
          </p>
        </div>

        {leaderboard && leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.slice(0, 10).map((entry: any, i: number) => (
              <LeaderboardRow key={entry.id} rank={i + 1} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl"
            style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}>
            <div className="text-4xl mb-4">🌱</div>
            <div className="text-white font-bold mb-2">The Restoration Begins</div>
            <div className="text-sm" style={{ color: "#8899AA" }}>
              Be the first Guardian to restore sovereign land. Share your referral code and watch the acres grow.
            </div>
            <Link href="/referral">
              <button className="mt-4 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#030A06" }}>
                Get Your Referral Code →
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="px-6 pb-16 text-center">
        <div className="max-w-2xl mx-auto rounded-2xl p-10"
          style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>
            STAKE CHX → RESTORE LAND
          </div>
          <h3 className="text-3xl font-black text-white mb-3">
            Every Stake is a Seed
          </h3>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Join the Sovereign Pool. Compound your CHX. Watch the acres grow.
            The empire is not just digital — it is rooted in the earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/staking">
              <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#030A06" }}>
                🌿 Stake CHX Now
              </button>
            </Link>
            <Link href="/guardian-dashboard">
              <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
                style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
                View My Restoration
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="px-6 py-8 text-center border-t" style={{ borderColor: "rgba(0,255,136,0.1)" }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          TATANKA PROTOCOL · SCROLLVERSE TRINITY · SOVEREIGN LAND RESTORATION
          <span className="mx-2">·</span>
          <span style={{ color: "#00FF88" }}>KUN FAYAKŪN × ∞</span>
        </div>
      </div>
    </div>
  );
}
