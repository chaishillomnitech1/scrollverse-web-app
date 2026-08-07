/*
 * ADMIN SAFERWAY DASHBOARD
 * /admin/saferway — Protected (admin role required)
 * Real DB bookings via saferway.listBookings
 * Status mutation: PENDING → CONFIRMED → COMPLETED → CANCELLED
 * Revenue summary with tier breakdown
 */
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import type { SaferwayBooking } from "../../../drizzle/schema";

// ── Tier pricing map ──────────────────────────────────────────────────────────
const TIER_PRICES: Record<string, number> = {
  detail: 299,
  express: 89,
  signature: 499,
  fleet: 1250,
};

const TIER_LABELS: Record<string, string> = {
  detail: "Full Detail",
  express: "Express Wash",
  signature: "Signature Package",
  fleet: "Fleet Service",
};

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; border: string; color: string }> = {
    PENDING: { bg: "rgba(255,184,0,0.06)", border: "rgba(255,184,0,0.25)", color: "#FFB800" },
    CONFIRMED: { bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.25)", color: "#00D4FF" },
    COMPLETED: { bg: "rgba(0,255,136,0.06)", border: "rgba(0,255,136,0.25)", color: "#00FF88" },
    CANCELLED: { bg: "rgba(255,68,68,0.06)", border: "rgba(255,68,68,0.25)", color: "#FF4444" },
  };
  const s = styles[status] ?? styles.PENDING;
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-mono font-bold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {status}
    </span>
  );
}

// ── Revenue card ──────────────────────────────────────────────────────────────
function RevenueCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span className="text-xs font-mono" style={{ color: "rgba(136,153,170,0.8)" }}>
        {label}
      </span>
      <span className="text-xl font-bold font-mono" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminSaferWay() {
  const { user, loading, isAuthenticated } = useAuth();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const { data, isLoading, refetch } = trpc.saferway.listBookings.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
    refetchInterval: 30_000,
  });

  const updateStatus = trpc.saferway.updateBookingStatus.useMutation({
    onMutate: ({ bookingId }) => setUpdatingId(bookingId),
    onSettled: () => {
      setUpdatingId(null);
      refetch();
    },
  });

  // ── Auth guard ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A" }}
      >
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          Verifying credentials...
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
        <div className="text-center">
          <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
            Authentication required
          </div>
          <a
            href={getLoginUrl()}
            className="px-4 py-2 rounded-lg text-xs font-mono"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A" }}
      >
        <div className="text-center">
          <div className="text-2xl mb-3">🔒</div>
          <div className="text-sm font-mono mb-2" style={{ color: "#FF4444" }}>
            ADMIN ACCESS REQUIRED
          </div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            This terminal is restricted to sovereign administrators.
          </div>
          <Link href="/saferway">
            <a
              className="inline-block mt-4 px-4 py-2 rounded-lg text-xs font-mono"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00D4FF",
              }}
            >
              ← Return to SaferWay
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const bookings = data?.bookings ?? [];

  // ── Revenue calculations ────────────────────────────────────────────────────
  const totalRevenue = bookings
    .filter((b: SaferwayBooking) => b.status === "COMPLETED")
    .reduce((sum: number, b: SaferwayBooking) => sum + (TIER_PRICES[b.serviceTier] ?? 0), 0);

  const pendingRevenue = bookings
    .filter((b: SaferwayBooking) => b.status === "PENDING" || b.status === "CONFIRMED")
    .reduce((sum: number, b: SaferwayBooking) => sum + (TIER_PRICES[b.serviceTier] ?? 0), 0);

  const countByStatus = (s: string) => bookings.filter((b: SaferwayBooking) => b.status === s).length;

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered: SaferwayBooking[] =
    filterStatus === "ALL" ? bookings : bookings.filter((b: SaferwayBooking) => b.status === filterStatus);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(5,11,26,0.95)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/saferway">
            <a className="text-xs font-mono" style={{ color: "rgba(0,212,255,0.5)" }}>
              ← SaferWay
            </a>
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <span className="text-xs font-mono font-bold" style={{ color: "#FFB800" }}>
            ADMIN TERMINAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#00FF88" }}
          />
          <span className="text-xs font-mono" style={{ color: "#00FF88" }}>
            LIVE
          </span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* ── Header ── */}
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: "rgba(0,212,255,0.5)" }}>
            SAFERWAY · VINELAND TERMINAL
          </div>
          <h1
            className="text-2xl font-black tracking-wide"
            style={{ color: "#E8EDF2" }}
          >
            Booking Control Center
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
            Manage all SaferWay auto detail bookings — update status, track revenue, monitor the pipeline.
          </p>
        </div>

        {/* ── Revenue summary ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <RevenueCard
            label="Settled Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            color="#00FF88"
          />
          <RevenueCard
            label="Pipeline Value"
            value={`$${pendingRevenue.toLocaleString()}`}
            color="#FFB800"
          />
          <RevenueCard
            label="Total Bookings"
            value={String(bookings.length)}
            color="#00D4FF"
          />
          <RevenueCard
            label="Pending / Confirmed"
            value={`${countByStatus("PENDING")} / ${countByStatus("CONFIRMED")}`}
            color="#8899AA"
          />
        </div>

        {/* ── View Toggle ── */}
        <div className="flex gap-2 mb-2">
          {(["list", "calendar"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
              style={{
                background: activeView === v ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeView === v ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: activeView === v ? "#00D4FF" : "#8899AA",
              }}
            >
              {v === "list" ? "☰ List View" : "📅 Calendar View"}
            </button>
          ))}
        </div>

        {/* ── Calendar View ── */}
        {activeView === "calendar" && (() => {
          const { year, month } = calendarMonth;
          const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long", year: "numeric" });
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const confirmedBookings = bookings.filter((b: SaferwayBooking) =>
            b.status === "CONFIRMED" && b.serviceDate?.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)
          );
          const bookingsByDay: Record<number, SaferwayBooking[]> = {};
          confirmedBookings.forEach((b: SaferwayBooking) => {
            if (!b.serviceDate) return;
            const day = parseInt(b.serviceDate.split("-")[2] ?? "0", 10);
            if (!bookingsByDay[day]) bookingsByDay[day] = [];
            bookingsByDay[day].push(b);
          });
          return (
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
                <button onClick={() => setCalendarMonth(({ year: y, month: m }) => m === 0 ? { year: y - 1, month: 11 } : { year: y, month: m - 1 })} className="text-sm font-mono" style={{ color: "#00D4FF" }}>← Prev</button>
                <span className="font-bold text-white">{monthName}</span>
                <button onClick={() => setCalendarMonth(({ year: y, month: m }) => m === 11 ? { year: y + 1, month: 0 } : { year: y, month: m + 1 })} className="text-sm font-mono" style={{ color: "#00D4FF" }}>Next →</button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs font-mono py-2" style={{ background: "rgba(255,255,255,0.02)", color: "#8899AA" }}>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-px p-2" style={{ background: "rgba(0,212,255,0.03)" }}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="h-16 rounded" style={{ background: "rgba(255,255,255,0.01)" }} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const dayBookings = bookingsByDay[day] ?? [];
                  const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
                  return (
                    <div key={day} className="h-16 rounded p-1 relative" style={{ background: isToday ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${isToday ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.04)"}` }}>
                      <div className="text-xs font-mono mb-1" style={{ color: isToday ? "#00D4FF" : "#8899AA" }}>{day}</div>
                      {dayBookings.slice(0, 2).map((b: SaferwayBooking, bi: number) => (
                        <div key={bi} className="text-xs truncate rounded px-1" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", fontSize: "10px" }}>
                          {b.guardianName.split(" ")[0]}
                        </div>
                      ))}
                      {dayBookings.length > 2 && <div className="text-xs" style={{ color: "#FFB800", fontSize: "10px" }}>+{dayBookings.length - 2}</div>}
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-3 text-xs font-mono" style={{ color: "#8899AA", borderTop: "1px solid rgba(0,212,255,0.1)" }}>
                {confirmedBookings.length} confirmed booking{confirmedBookings.length !== 1 ? "s" : ""} this month · Only CONFIRMED bookings with a service date are shown
              </div>
            </div>
          );
        })()}

        {/* ── Status filter ── */}
        {activeView === "list" && (
          <div className="flex flex-wrap gap-2">
            {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
                style={{
                  background:
                    filterStatus === s
                      ? "rgba(0,212,255,0.12)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${filterStatus === s ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.07)"}`,
                  color: filterStatus === s ? "#00D4FF" : "#8899AA",
                }}
              >
                {s}
                {s !== "ALL" && (
                  <span className="ml-1.5 opacity-60">({countByStatus(s)})</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Bookings table ── */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(0,212,255,0.1)" }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-3 px-5 py-3 text-xs font-mono font-bold"
            style={{
              background: "rgba(0,212,255,0.04)",
              borderBottom: "1px solid rgba(0,212,255,0.1)",
              color: "#8899AA",
            }}
          >
            <span>TICKET / CLIENT</span>
            <span>SERVICE</span>
            <span>VEHICLE</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-xs font-mono" style={{ color: "#8899AA" }}>
              Loading bookings from sovereign database...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-2xl mb-3">📋</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                {filterStatus === "ALL"
                  ? "No bookings yet. The empire awaits its first client."
                  : `No ${filterStatus} bookings.`}
              </div>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(0,212,255,0.06)" }}>
              {filtered.map((booking: SaferwayBooking) => {
                const ticketRef = `SFW-${String(booking.id).padStart(6, "0")}`;
                const isUpdating = updatingId === booking.id;
                const createdAt = booking.createdAt
                  ? new Date(booking.createdAt).toLocaleDateString()
                  : "—";

                return (
                  <div
                    key={booking.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 px-5 py-4 items-center text-sm transition-colors"
                    style={{
                      background: isUpdating ? "rgba(0,212,255,0.02)" : "transparent",
                    }}
                  >
                    {/* Ticket / Client */}
                    <div>
                      <div className="font-bold" style={{ color: "#E8EDF2" }}>
                        {booking.guardianName}
                      </div>
                      <div
                        className="text-xs font-mono mt-0.5"
                        style={{ color: "#FFB800" }}
                      >
                        {ticketRef}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>
                        {booking.email}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#445566" }}>
                        {createdAt}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <div className="text-sm" style={{ color: "#E8EDF2" }}>
                        {TIER_LABELS[booking.serviceTier] ?? booking.serviceTier}
                      </div>
                      <div
                        className="text-xs font-mono mt-0.5"
                        style={{ color: "#00FF88" }}
                      >
                        ${TIER_PRICES[booking.serviceTier] ?? "—"}
                      </div>
                    </div>

                    {/* Vehicle */}
                    <div
                      className="text-xs"
                      style={{ color: booking.vehicleInfo ? "#8899AA" : "#445566" }}
                    >
                      {booking.vehicleInfo ?? "Not specified"}
                      {booking.notes && (
                        <div className="mt-1 italic" style={{ color: "#445566" }}>
                          "{booking.notes.slice(0, 60)}
                          {booking.notes.length > 60 ? "…" : ""}"
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <StatusBadge status={booking.status ?? "PENDING"} />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-1.5 md:justify-end">
                      {booking.status !== "CONFIRMED" &&
                        booking.status !== "COMPLETED" &&
                        booking.status !== "CANCELLED" && (
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus.mutate({
                                bookingId: booking.id,
                                status: "CONFIRMED",
                              })
                            }
                            className="px-2.5 py-1 rounded text-xs font-mono font-bold transition-all disabled:opacity-40"
                            style={{
                              background: "rgba(0,212,255,0.06)",
                              border: "1px solid rgba(0,212,255,0.25)",
                              color: "#00D4FF",
                            }}
                          >
                            Confirm
                          </button>
                        )}
                      {booking.status !== "COMPLETED" &&
                        booking.status !== "CANCELLED" && (
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus.mutate({
                                bookingId: booking.id,
                                status: "COMPLETED",
                              })
                            }
                            className="px-2.5 py-1 rounded text-xs font-mono font-bold transition-all disabled:opacity-40"
                            style={{
                              background: "rgba(0,255,136,0.06)",
                              border: "1px solid rgba(0,255,136,0.25)",
                              color: "#00FF88",
                            }}
                          >
                            Complete
                          </button>
                        )}
                      {booking.status !== "CANCELLED" && (
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            updateStatus.mutate({
                              bookingId: booking.id,
                              status: "CANCELLED",
                            })
                          }
                          className="px-2.5 py-1 rounded text-xs font-mono font-bold transition-all disabled:opacity-40"
                          style={{
                            background: "rgba(255,68,68,0.04)",
                            border: "1px solid rgba(255,68,68,0.15)",
                            color: "#FF4444",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Tier breakdown ── */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="text-xs font-mono font-bold mb-4"
            style={{ color: "#8899AA" }}
          >
            REVENUE BY SERVICE TIER
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(TIER_LABELS).map(([tier, label]) => {
              const count = bookings.filter((b: SaferwayBooking) => b.serviceTier === tier).length;
              const completed = bookings.filter(
                (b: SaferwayBooking) => b.serviceTier === tier && b.status === "COMPLETED"
              ).length;
              const revenue = completed * (TIER_PRICES[tier] ?? 0);
              return (
                <div
                  key={tier}
                  className="rounded-lg p-3"
                  style={{
                    background: "rgba(0,212,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.08)",
                  }}
                >
                  <div className="text-xs font-bold mb-1" style={{ color: "#E8EDF2" }}>
                    {label}
                  </div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                    {count} total · {completed} completed
                  </div>
                  <div
                    className="text-sm font-bold font-mono mt-1"
                    style={{ color: "#00FF88" }}
                  >
                    ${revenue.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
