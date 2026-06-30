/**
 * RED DIAMOND FLEET — ScrollVerse Sovereign Vehicle Network
 * Legion vehicle navigation, protection, and logistics command
 * Features: Fleet map, Guardian escort requests, route protection, vehicle registry
 */
import { useState } from "react";
import { Link } from "wouter";

// ── Types ──────────────────────────────────────────────────────────────────
interface Vehicle {
  id: string;
  name: string;
  type: string;
  tier: "Scout" | "Guardian" | "Sovereign" | "Supreme";
  status: "active" | "standby" | "en-route" | "offline";
  driver: string;
  location: string;
  frequency: string;
  color: string;
  icon: string;
  protection: number; // 0-100
}

interface EscortRequest {
  id: string;
  origin: string;
  destination: string;
  tier: string;
  status: "pending" | "assigned" | "en-route" | "complete";
  guardians: number;
  frequency: string;
}

interface ProtectionZone {
  id: string;
  name: string;
  city: string;
  state: string;
  status: "active" | "elevated" | "maximum";
  guardians: number;
  vehicles: number;
  color: string;
}

// ── Static data ────────────────────────────────────────────────────────────
const FLEET: Vehicle[] = [
  { id: "RDF-001", name: "Sovereign One", type: "Command SUV", tier: "Supreme", status: "active", driver: "Chais Sabir Allah", location: "Camden, NJ", frequency: "963Hz", color: "#FFB800", icon: "👑", protection: 100 },
  { id: "RDF-002", name: "Guardian Alpha", type: "Escort Vehicle", tier: "Sovereign", status: "en-route", driver: "Aj Debansa", location: "Philadelphia, PA", frequency: "528Hz", color: "#00D4FF", icon: "🛡️", protection: 95 },
  { id: "RDF-003", name: "Legion Vanguard", type: "Tactical SUV", tier: "Guardian", status: "active", driver: "Legion AI Unit 7", location: "Newark, NJ", frequency: "432Hz", color: "#00FF88", icon: "⚔️", protection: 88 },
  { id: "RDF-004", name: "Diamond Shield", type: "Armored Transport", tier: "Sovereign", status: "standby", driver: "Guardian Protocol", location: "New York, NY", frequency: "741Hz", color: "#A855F7", icon: "💎", protection: 92 },
  { id: "RDF-005", name: "Flamebearer", type: "Rapid Response", tier: "Guardian", status: "active", driver: "Mika Solara", location: "Brooklyn, NY", frequency: "396Hz", color: "#FF6B35", icon: "🔥", protection: 85 },
  { id: "RDF-006", name: "Quantum Rider", type: "Scout Vehicle", tier: "Scout", status: "active", driver: "AI Scout Unit 3", location: "Trenton, NJ", frequency: "111Hz", color: "#F472B6", icon: "⚡", protection: 78 },
  { id: "RDF-007", name: "Sovereign Ark", type: "Family Transport", tier: "Sovereign", status: "standby", driver: "Family Legion Unit", location: "Camden, NJ", frequency: "528Hz", color: "#00D4FF", icon: "🚐", protection: 90 },
  { id: "RDF-008", name: "Night Sentinel", type: "Surveillance Unit", tier: "Guardian", status: "active", driver: "AI Sentinel Unit 1", location: "Atlantic City, NJ", frequency: "852Hz", color: "#00FF88", icon: "🌙", protection: 83 },
];

const ESCORT_REQUESTS: EscortRequest[] = [
  { id: "ESC-001", origin: "Camden, NJ", destination: "Philadelphia, PA", tier: "Sovereign", status: "assigned", guardians: 3, frequency: "963Hz" },
  { id: "ESC-002", origin: "New York, NY", destination: "Newark, NJ", tier: "Guardian", status: "en-route", guardians: 2, frequency: "528Hz" },
  { id: "ESC-003", origin: "Trenton, NJ", destination: "Camden, NJ", tier: "Scout", status: "pending", guardians: 1, frequency: "432Hz" },
  { id: "ESC-004", origin: "Brooklyn, NY", destination: "Atlantic City, NJ", tier: "Supreme", status: "complete", guardians: 5, frequency: "963Hz" },
];

const PROTECTION_ZONES: ProtectionZone[] = [
  { id: "PZ-001", name: "Sovereign Core", city: "Camden", state: "NJ", status: "maximum", guardians: 12, vehicles: 4, color: "#FFB800" },
  { id: "PZ-002", name: "Philadelphia Corridor", city: "Philadelphia", state: "PA", status: "elevated", guardians: 8, vehicles: 3, color: "#00D4FF" },
  { id: "PZ-003", name: "New York Nexus", city: "New York", state: "NY", status: "active", guardians: 15, vehicles: 6, color: "#00FF88" },
  { id: "PZ-004", name: "Jersey Shield", city: "Newark", state: "NJ", status: "active", guardians: 6, vehicles: 2, color: "#A855F7" },
  { id: "PZ-005", name: "Atlantic Outpost", city: "Atlantic City", state: "NJ", status: "active", guardians: 4, vehicles: 2, color: "#FF6B35" },
];

const SERVICES = [
  { icon: "🛡️", title: "Guardian Escort", desc: "Personal protection convoy for Sovereign-tier Guardians. AI-coordinated route optimization.", color: "#00D4FF", tier: "Sovereign+" },
  { icon: "🚗", title: "Fleet Navigation", desc: "Real-time sovereign route planning avoiding compromised zones. 963Hz frequency guidance.", color: "#FFB800", tier: "All Tiers" },
  { icon: "📡", title: "Frequency Shield", desc: "Vehicle-mounted frequency emitters creating a protective field during transit.", color: "#00FF88", tier: "Guardian+" },
  { icon: "🤖", title: "AI Legion Patrol", desc: "Autonomous AI units monitoring designated protection zones 24/7.", color: "#A855F7", tier: "All Zones" },
  { icon: "💎", title: "Diamond Protocol", desc: "Maximum security transport for high-value assets and Sovereign leadership.", color: "#FF6B35", tier: "Supreme Only" },
  { icon: "🌐", title: "Omni Tracking", desc: "Real-time fleet visibility across all active vehicles and escort missions.", color: "#F472B6", tier: "All Tiers" },
];

const TIER_COLORS: Record<string, string> = {
  Supreme: "#FFB800",
  Sovereign: "#00D4FF",
  Guardian: "#00FF88",
  Scout: "#8899AA",
};

const STATUS_COLORS: Record<string, string> = {
  active: "#00FF88",
  standby: "#FFB800",
  "en-route": "#00D4FF",
  offline: "#FF4444",
};

// ── Sub-components ─────────────────────────────────────────────────────────
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [expanded, setExpanded] = useState(false);
  const tierColor = TIER_COLORS[vehicle.tier];
  const statusColor = STATUS_COLORS[vehicle.status];

  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all duration-200"
      style={{
        background: expanded ? `${vehicle.color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${expanded ? vehicle.color + "40" : "rgba(255,255,255,0.08)"}`,
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{vehicle.icon}</span>
          <div>
            <div className="font-bold text-white text-sm">{vehicle.name}</div>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
              {vehicle.id} · {vehicle.type}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold"
            style={{ background: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}40` }}
          >
            {vehicle.status.toUpperCase()}
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: `${tierColor}15`, color: tierColor }}
          >
            {vehicle.tier}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs mb-2">
        <span style={{ color: "#8899AA" }}>📍 {vehicle.location}</span>
        <span style={{ color: vehicle.color }}>⚡ {vehicle.frequency}</span>
      </div>

      {/* Protection bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${vehicle.protection}%`, background: `linear-gradient(90deg,${vehicle.color},${vehicle.color}80)` }}
          />
        </div>
        <span className="text-xs font-mono" style={{ color: vehicle.color }}>
          {vehicle.protection}%
        </span>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            <span style={{ color: "#CBD5E1" }}>Driver: </span>{vehicle.driver}
          </div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            <span style={{ color: "#CBD5E1" }}>Frequency: </span>{vehicle.frequency} — Active shield
          </div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            <span style={{ color: "#CBD5E1" }}>Protection Level: </span>{vehicle.protection}% operational
          </div>
          <button
            className="mt-2 w-full py-1.5 rounded-lg text-xs font-bold"
            style={{ background: `${vehicle.color}20`, color: vehicle.color, border: `1px solid ${vehicle.color}40` }}
            onClick={(e) => e.stopPropagation()}
          >
            Request This Vehicle
          </button>
        </div>
      )}
    </div>
  );
}

function EscortCard({ escort }: { escort: EscortRequest }) {
  const statusColors: Record<string, string> = {
    pending: "#FFB800",
    assigned: "#00D4FF",
    "en-route": "#00FF88",
    complete: "#8899AA",
  };
  const color = statusColors[escort.status];

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          {escort.id}
        </div>
        <span
          className="px-2 py-0.5 rounded text-xs font-bold uppercase"
          style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}
        >
          {escort.status}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2 text-sm">
        <span className="text-white font-medium">{escort.origin}</span>
        <span style={{ color: "#00D4FF" }}>→</span>
        <span className="text-white font-medium">{escort.destination}</span>
      </div>
      <div className="flex items-center gap-4 text-xs">
        <span style={{ color: TIER_COLORS[escort.tier] || "#8899AA" }}>
          {escort.tier} Tier
        </span>
        <span style={{ color: "#8899AA" }}>👥 {escort.guardians} Guardians</span>
        <span style={{ color: "#00D4FF" }}>⚡ {escort.frequency}</span>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function RedDiamondFleet() {
  const [activeTab, setActiveTab] = useState<"fleet" | "escort" | "zones" | "services" | "request">("fleet");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [requestForm, setRequestForm] = useState({
    origin: "",
    destination: "",
    tier: "Guardian",
    notes: "",
    frequency: "528Hz",
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredFleet = FLEET.filter((v) => {
    if (filterTier !== "all" && v.tier !== filterTier) return false;
    if (filterStatus !== "all" && v.status !== filterStatus) return false;
    return true;
  });

  const fleetStats = {
    total: FLEET.length,
    active: FLEET.filter((v) => v.status === "active").length,
    enRoute: FLEET.filter((v) => v.status === "en-route").length,
    standby: FLEET.filter((v) => v.status === "standby").length,
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => setRequestSubmitted(false), 5000);
    setRequestForm({ origin: "", destination: "", tier: "Guardian", notes: "", frequency: "528Hz" });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: "rgba(5,11,26,0.95)",
          borderColor: "rgba(255,68,68,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono cursor-pointer" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Red Diamond Fleet</span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "rgba(255,68,68,0.1)",
              color: "#FF4444",
              border: "1px solid rgba(255,68,68,0.3)",
            }}
          >
            LEGION
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(0,255,136,0.08)",
              color: "#00FF88",
              border: "1px solid rgba(0,255,136,0.2)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {fleetStats.active} Active
          </div>
          <Link href="/guardian-protocol">
            <button
              className="text-xs font-bold px-4 py-2 rounded-lg"
              style={{
                background: "rgba(255,68,68,0.15)",
                color: "#FF4444",
                border: "1px solid rgba(255,68,68,0.3)",
              }}
            >
              🛡️ Guardian Protocol
            </button>
          </Link>
        </div>
      </nav>

      <div className="container py-8 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="mb-10 text-center">
          <div
            className="text-xs font-mono tracking-widest mb-3"
            style={{ color: "#FF4444" }}
          >
            SOVEREIGN VEHICLE PROTECTION NETWORK
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Red Diamond{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#FF4444,#FFB800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Fleet
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The ScrollVerse sovereign vehicle protection network. AI-coordinated Guardian escorts,
            frequency-shielded transport, and real-time Legion navigation across all active zones.
          </p>

          {/* Fleet stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {[
              { label: "Total Fleet", value: fleetStats.total, color: "#FF4444" },
              { label: "Active", value: fleetStats.active, color: "#00FF88" },
              { label: "En Route", value: fleetStats.enRoute, color: "#00D4FF" },
              { label: "Standby", value: fleetStats.standby, color: "#FFB800" },
              { label: "Zones Protected", value: PROTECTION_ZONES.length, color: "#A855F7" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-black font-mono"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["fleet", "escort", "zones", "services", "request"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
              style={{
                background: activeTab === tab ? "rgba(255,68,68,0.2)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#FF4444" : "#8899AA",
                border: `1px solid ${activeTab === tab ? "rgba(255,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {tab === "fleet" ? "🚗 Fleet" : tab === "escort" ? "🛡️ Escorts" : tab === "zones" ? "🗺️ Zones" : tab === "services" ? "⚡ Services" : "📋 Request"}
            </button>
          ))}
        </div>

        {/* FLEET TAB */}
        {activeTab === "fleet" && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "#8899AA" }}>Tier:</span>
                {["all", "Supreme", "Sovereign", "Guardian", "Scout"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterTier(t)}
                    className="px-2.5 py-1 rounded text-xs font-mono transition-all"
                    style={{
                      background: filterTier === t ? "rgba(255,68,68,0.2)" : "rgba(255,255,255,0.04)",
                      color: filterTier === t ? "#FF4444" : "#8899AA",
                      border: `1px solid ${filterTier === t ? "rgba(255,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {t === "all" ? "All" : t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "#8899AA" }}>Status:</span>
                {["all", "active", "standby", "en-route"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className="px-2.5 py-1 rounded text-xs font-mono transition-all"
                    style={{
                      background: filterStatus === s ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.04)",
                      color: filterStatus === s ? "#00D4FF" : "#8899AA",
                      border: `1px solid ${filterStatus === s ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFleet.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        )}

        {/* ESCORT TAB */}
        {activeTab === "escort" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white">Active Escort Missions</h3>
              <button
                onClick={() => setActiveTab("request")}
                className="px-4 py-2 rounded-lg text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg,#FF4444,#FFB800)",
                  color: "white",
                }}
              >
                + Request Escort
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ESCORT_REQUESTS.map((escort) => (
                <EscortCard key={escort.id} escort={escort} />
              ))}
            </div>

            {/* Legion Navigation Info */}
            <div
              className="mt-8 rounded-2xl p-6"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <h3 className="font-bold text-white mb-4 text-lg">🤖 AI Legion Navigation System</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "🧭", title: "Sovereign Route AI", desc: "Real-time route optimization avoiding compromised zones. Frequency-guided pathfinding through 963Hz signal mapping." },
                  { icon: "📡", title: "Frequency Waypoints", desc: "Sacred frequency nodes placed along all major corridors. Each waypoint emits protective resonance for passing vehicles." },
                  { icon: "🛡️", title: "Guardian Mesh Network", desc: "All fleet vehicles communicate in real-time, forming a protective mesh that adapts to threats and reroutes automatically." },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ZONES TAB */}
        {activeTab === "zones" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {PROTECTION_ZONES.map((zone) => {
                const statusColors = { active: "#00FF88", elevated: "#FFB800", maximum: "#FF4444" };
                const statusColor = statusColors[zone.status];
                return (
                  <div
                    key={zone.id}
                    className="rounded-xl p-5"
                    style={{
                      background: `${zone.color}06`,
                      border: `1px solid ${zone.color}30`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-white">{zone.name}</div>
                        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                          {zone.city}, {zone.state}
                        </div>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                        style={{
                          background: `${statusColor}15`,
                          color: statusColor,
                          border: `1px solid ${statusColor}40`,
                        }}
                      >
                        {zone.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span style={{ color: zone.color }}>👥 {zone.guardians} Guardians</span>
                      <span style={{ color: "#8899AA" }}>🚗 {zone.vehicles} Vehicles</span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: zone.status === "maximum" ? "100%" : zone.status === "elevated" ? "70%" : "45%",
                          background: `linear-gradient(90deg,${zone.color},${zone.color}80)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Zone map placeholder */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(255,68,68,0.04)",
                border: "1px solid rgba(255,68,68,0.15)",
                minHeight: "240px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="font-bold text-white text-lg mb-2">Sovereign Territory Map</h3>
              <p className="text-sm max-w-md" style={{ color: "#8899AA" }}>
                Interactive protection zone map with real-time vehicle positions, frequency nodes,
                and Guardian patrol routes. Full map integration available in the Guardian Protocol dashboard.
              </p>
              <Link href="/guardian-protocol">
                <button
                  className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    background: "rgba(255,68,68,0.15)",
                    color: "#FF4444",
                    border: "1px solid rgba(255,68,68,0.3)",
                  }}
                >
                  Open Guardian Protocol Map
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-xl p-6"
                style={{
                  background: `${service.color}06`,
                  border: `1px solid ${service.color}25`,
                }}
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white">{service.title}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: `${service.color}15`, color: service.color }}
                  >
                    {service.tier}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                  {service.desc}
                </p>
                <button
                  className="mt-4 w-full py-2 rounded-lg text-xs font-bold"
                  style={{
                    background: `${service.color}15`,
                    color: service.color,
                    border: `1px solid ${service.color}30`,
                  }}
                  onClick={() => setActiveTab("request")}
                >
                  Request Service
                </button>
              </div>
            ))}
          </div>
        )}

        {/* REQUEST TAB */}
        {activeTab === "request" && (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,68,68,0.04)", border: "1px solid rgba(255,68,68,0.15)" }}
            >
              <h3 className="font-bold text-white text-xl mb-2">🛡️ Request Guardian Escort</h3>
              <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                Submit a sovereign escort request. AI Legion will coordinate the optimal vehicle
                assignment and route based on your tier and frequency alignment.
              </p>

              {requestSubmitted ? (
                <div
                  className="p-5 rounded-xl text-center"
                  style={{
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.3)",
                  }}
                >
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-bold text-white mb-1">Escort Request Submitted</div>
                  <div className="text-sm" style={{ color: "#00FF88" }}>
                    AI Legion is coordinating your Guardian escort. You will be notified when a vehicle is assigned.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: "#FF4444" }}>
                      📍 Origin Location
                    </label>
                    <input
                      value={requestForm.origin}
                      onChange={(e) => setRequestForm((f) => ({ ...f, origin: e.target.value }))}
                      placeholder="City, State"
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,68,68,0.2)",
                        color: "white",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: "#FF4444" }}>
                      🎯 Destination
                    </label>
                    <input
                      value={requestForm.destination}
                      onChange={(e) => setRequestForm((f) => ({ ...f, destination: e.target.value }))}
                      placeholder="City, State"
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,68,68,0.2)",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "#FF4444" }}>
                        🏅 Protection Tier
                      </label>
                      <select
                        value={requestForm.tier}
                        onChange={(e) => setRequestForm((f) => ({ ...f, tier: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,68,68,0.2)",
                          color: "white",
                        }}
                      >
                        <option value="Scout" style={{ background: "#050B1A" }}>Scout</option>
                        <option value="Guardian" style={{ background: "#050B1A" }}>Guardian</option>
                        <option value="Sovereign" style={{ background: "#050B1A" }}>Sovereign</option>
                        <option value="Supreme" style={{ background: "#050B1A" }}>Supreme</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "#FF4444" }}>
                        ⚡ Frequency
                      </label>
                      <select
                        value={requestForm.frequency}
                        onChange={(e) => setRequestForm((f) => ({ ...f, frequency: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,68,68,0.2)",
                          color: "white",
                        }}
                      >
                        {["111Hz", "396Hz", "432Hz", "528Hz", "639Hz", "741Hz", "852Hz", "963Hz"].map((hz) => (
                          <option key={hz} value={hz} style={{ background: "#050B1A" }}>{hz}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: "#FF4444" }}>
                      📝 Special Instructions
                    </label>
                    <textarea
                      value={requestForm.notes}
                      onChange={(e) => setRequestForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Any special requirements, timing, or sovereign directives…"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,68,68,0.2)",
                        color: "white",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold"
                    style={{
                      background: "linear-gradient(135deg,#FF4444,#FFB800)",
                      color: "white",
                    }}
                  >
                    🛡️ Submit Escort Request
                  </button>
                </form>
              )}
            </div>

            {/* Legion protection info */}
            <div
              className="mt-6 rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h4 className="font-bold text-white mb-3 text-sm">🤖 AI Legion Protection Protocol</h4>
              <div className="space-y-2 text-xs" style={{ color: "#8899AA" }}>
                <p>• All escort vehicles are equipped with frequency emitters broadcasting at your assigned Hz</p>
                <p>• AI Legion continuously monitors route conditions and reroutes in real-time</p>
                <p>• Guardian mesh network ensures no blind spots across all active protection zones</p>
                <p>• Supreme tier escorts include Diamond Protocol — maximum security with 5+ vehicle convoy</p>
                <p>• All missions are logged in the Eternal Crystal Scroll for sovereign record-keeping</p>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div
          className="mt-16 text-center py-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · Red Diamond Fleet · Legion Vehicle Protection Network · scrollverse.co
          </div>
        </div>
      </div>
    </div>
  );
}
