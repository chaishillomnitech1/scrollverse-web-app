/*
 * ADMIN CHX RESERVATIONS DASHBOARD
 * View all CHX pre-sale reservations, payment status, total CHX reserved, revenue summary
 * Admin-only route — requires role === "admin"
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Coins,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Users,
  BarChart3,
} from "lucide-react";

type Reservation = {
  id: number;
  userId: number;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  chxAmount: number;
  usdAmount: string;
  status: string;
  email: string | null;
  convertedAt: Date | null;
  createdAt: Date;
};

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  pending: {
    color: "#FFB800",
    bg: "rgba(255,184,0,0.1)",
    icon: <Clock className="w-3 h-3" />,
    label: "Pending",
  },
  confirmed: {
    color: "#00FF88",
    bg: "rgba(0,255,136,0.1)",
    icon: <CheckCircle className="w-3 h-3" />,
    label: "Confirmed",
  },
  cancelled: {
    color: "#FF4444",
    bg: "rgba(255,68,68,0.1)",
    icon: <XCircle className="w-3 h-3" />,
    label: "Cancelled",
  },
  converted: {
    color: "#A855F7",
    bg: "rgba(168,85,247,0.1)",
    icon: <Coins className="w-3 h-3" />,
    label: "Converted",
  },
};

function StatCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex items-start gap-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}25`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#8899AA" }}>
          {label}
        </div>
        <div className="text-2xl font-black" style={{ color }}>
          {value}
        </div>
        {sub && (
          <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminCHXReservations() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: reservations, isLoading, refetch } = trpc.chx.getAllReservations.useQuery();
  const { data: stats } = trpc.chx.getStats.useQuery();

  if (!user || user.role !== "admin") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A" }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Sovereign Access Required</h1>
          <p style={{ color: "#8899AA" }}>
            This dashboard is restricted to ScrollVerse administrators.
          </p>
        </div>
      </div>
    );
  }

  const all = reservations ?? [];
  const filtered =
    statusFilter === "all" ? all : all.filter((r: Reservation) => r.status === statusFilter);

  // Compute summary stats
  const totalCHX = all.reduce((sum: number, r: Reservation) => sum + r.chxAmount, 0);
  const totalUSD = all.reduce((sum: number, r: Reservation) => sum + parseFloat(r.usdAmount), 0);
  const confirmedCount = all.filter((r: Reservation) => r.status === "confirmed").length;
  const pendingCount = all.filter((r: Reservation) => r.status === "pending").length;
  const uniqueUsers = new Set(all.map((r: Reservation) => r.userId)).size;

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "User ID", "Email", "CHX Amount", "USD Amount", "Status", "Session ID", "Created At"];
    const rows = all.map((r: Reservation) => [
      r.id,
      r.userId,
      r.email ?? "",
      r.chxAmount,
      r.usdAmount,
      r.status,
      r.stripeSessionId ?? "",
      new Date(r.createdAt).toISOString(),
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chx-reservations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(0,212,255,0.05)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div className="container py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div
                className="text-xs font-mono tracking-widest mb-1"
                style={{ color: "#00D4FF" }}
              >
                ADMIN SOVEREIGN PANEL
              </div>
              <h1 className="text-3xl font-black text-white">CHX Pre-Sale Reservations</h1>
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
                Monitor all CHX token reservations · Payment status · Revenue analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-2"
                style={{
                  borderColor: "rgba(0,212,255,0.3)",
                  color: "#00D4FF",
                  background: "transparent",
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportCSV}
                className="gap-2"
                style={{
                  borderColor: "rgba(0,255,136,0.3)",
                  color: "#00FF88",
                  background: "transparent",
                }}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="TOTAL CHX RESERVED"
            value={totalCHX.toLocaleString()}
            sub="CHX tokens"
            icon={<Coins className="w-5 h-5" />}
            color="#00D4FF"
          />
          <StatCard
            label="TOTAL REVENUE"
            value={`$${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub="USD collected"
            icon={<DollarSign className="w-5 h-5" />}
            color="#00FF88"
          />
          <StatCard
            label="CONFIRMED ORDERS"
            value={confirmedCount}
            sub={`${pendingCount} pending`}
            icon={<CheckCircle className="w-5 h-5" />}
            color="#FFB800"
          />
          <StatCard
            label="UNIQUE BUYERS"
            value={uniqueUsers}
            sub={`${all.length} total orders`}
            icon={<Users className="w-5 h-5" />}
            color="#A855F7"
          />
        </div>

        {/* Progress bar: CHX sold vs 144,000 cap */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#8899AA" }}>
                PRE-SALE PROGRESS
              </div>
              <div className="font-bold text-white">
                {totalCHX.toLocaleString()} / 144,000 CHX Reserved
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>
                {((totalCHX / 144000) * 100).toFixed(2)}%
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                of total supply
              </div>
            </div>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((totalCHX / 144000) * 100, 100)}%`,
                background: "linear-gradient(90deg, #00D4FF, #00FF88)",
              }}
            />
          </div>
        </div>

        {/* Status breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["all", "pending", "confirmed", "cancelled", "converted"].map(s => {
            const count = s === "all" ? all.length : all.filter((r: Reservation) => r.status === s).length;
            const cfg = s === "all" ? null : STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="rounded-lg px-4 py-3 text-left transition-all duration-200"
                style={{
                  background:
                    statusFilter === s
                      ? cfg
                        ? cfg.bg
                        : "rgba(0,212,255,0.1)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${statusFilter === s ? (cfg ? cfg.color : "#00D4FF") : "rgba(255,255,255,0.08)"}40`,
                }}
              >
                <div
                  className="text-xs font-mono tracking-widest mb-1"
                  style={{ color: cfg ? cfg.color : "#00D4FF" }}
                >
                  {s.toUpperCase()}
                </div>
                <div className="text-xl font-black text-white">{count}</div>
              </button>
            );
          })}
        </div>

        {/* Reservations Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" style={{ color: "#00D4FF" }} />
              <span className="font-bold text-white">
                {filtered.length} Reservation{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
                  style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }}
                />
                <div style={{ color: "#8899AA" }}>Loading reservations...</div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Coins className="w-12 h-12 mx-auto mb-3" style={{ color: "#8899AA" }} />
                <div className="text-white font-bold mb-1">No reservations found</div>
                <div style={{ color: "#8899AA" }}>
                  {statusFilter !== "all" ? `No ${statusFilter} reservations yet.` : "The pre-sale hasn't started yet."}
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["ID", "User", "Email", "CHX Amount", "USD Paid", "Status", "Stripe Session", "Date"].map(
                      col => (
                        <th
                          key={col}
                          className="text-left px-4 py-3 text-xs font-mono tracking-widest"
                          style={{ color: "#8899AA" }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r: Reservation, i: number) => {
                    const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG["pending"];
                    return (
                      <tr
                        key={r.id}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                        }}
                      >
                        <td className="px-4 py-3 text-sm font-mono" style={{ color: "#8899AA" }}>
                          #{r.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-white font-mono">
                          U{r.userId}
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: "#8899AA" }}>
                          {r.email ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold" style={{ color: "#00D4FF" }}>
                            {r.chxAmount.toLocaleString()} CHX
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold" style={{ color: "#00FF88" }}>
                            ${r.usdAmount}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: cfg.bg, color: cfg.color }}
                          >
                            {cfg.icon}
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: "#8899AA" }}>
                          {r.stripeSessionId ? (
                            <span title={r.stripeSessionId}>
                              {r.stripeSessionId.slice(0, 16)}...
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "#8899AA" }}>
                          {new Date(r.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Revenue breakdown by status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["pending", "confirmed", "converted"].map(s => {
            const group = all.filter((r: Reservation) => r.status === s);
            const groupUSD = group.reduce(
              (sum: number, r: Reservation) => sum + parseFloat(r.usdAmount),
              0
            );
            const groupCHX = group.reduce((sum: number, r: Reservation) => sum + r.chxAmount, 0);
            const cfg = STATUS_CONFIG[s];
            return (
              <div
                key={s}
                className="rounded-xl p-5"
                style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}
              >
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{ color: cfg.color }}
                >
                  {cfg.icon}
                  <span className="text-xs font-mono tracking-widest">{s.toUpperCase()} REVENUE</span>
                </div>
                <div className="text-2xl font-black text-white mb-1">
                  ${groupUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm" style={{ color: "#8899AA" }}>
                  {groupCHX.toLocaleString()} CHX · {group.length} order{group.length !== 1 ? "s" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
