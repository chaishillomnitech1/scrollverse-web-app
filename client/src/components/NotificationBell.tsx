/*
 * NotificationBell — Real-time Guardian notification bell for nav bar
 * Uses trpc.notifications.getUnreadCount + getMyNotifications
 */
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Bell } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  info: "#00D4FF",
  success: "#00FF88",
  warning: "#FFB800",
  jackpot: "#FFB800",
  guardian: "#00D4FF",
  system: "#8899AA",
};

const TYPE_ICONS: Record<string, string> = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  jackpot: "🎰",
  guardian: "🛡️",
  system: "⚙️",
};

export default function NotificationBell() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data: countData, refetch: refetchCount } = trpc.notifications.getUnreadCount.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchInterval: 30000,
  });

  const { data: notifications, refetch: refetchList } = trpc.notifications.getMyNotifications.useQuery(
    { limit: 20 },
    { enabled: isAuthenticated && open }
  );

  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => { refetchCount(); refetchList(); },
  });

  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => { refetchCount(); refetchList(); },
  });

  const deleteNotif = trpc.notifications.deleteNotification.useMutation({
    onSuccess: () => { refetchCount(); refetchList(); },
  });

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!isAuthenticated) return null;

  const unreadCount = countData?.count ?? 0;

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg transition-all duration-200"
        style={{
          background: open ? "rgba(0,212,255,0.1)" : "transparent",
          border: `1px solid ${open ? "rgba(0,212,255,0.3)" : "transparent"}`,
          color: "#8899AA",
        }}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-black"
            style={{ background: "#FFB800", color: "#050B1A", fontSize: "10px" }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden z-50"
          style={{
            background: "#0A1628",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <Bell size={14} style={{ color: "#00D4FF" }} />
              <span className="text-sm font-bold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800" }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead.mutate()}
                className="text-xs transition-colors"
                style={{ color: "#00D4FF" }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {!notifications || notifications.length === 0 ? (
              <div className="py-8 text-center">
                <div className="text-2xl mb-2">🔔</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>No notifications yet</div>
              </div>
            ) : (
              notifications.map((n: { id: number; title: string; message: string; type: string; link: string | null; readAt: Date | null; createdAt: Date }) => {
                const isUnread = !n.readAt;
                const color = TYPE_COLORS[n.type] ?? "#8899AA";
                const icon = TYPE_ICONS[n.type] ?? "ℹ️";
                return (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 cursor-pointer transition-all duration-150 border-b"
                    style={{
                      background: isUnread ? "rgba(0,212,255,0.04)" : "transparent",
                      borderColor: "rgba(255,255,255,0.04)",
                    }}
                    onClick={() => {
                      if (isUnread) markRead.mutate({ id: n.id });
                      if (n.link) window.location.href = n.link;
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: `${color}15` }}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-white truncate">{n.title}</div>
                        {isUnread && (
                          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: color }} />
                        )}
                      </div>
                      <div className="text-xs mt-0.5 line-clamp-2" style={{ color: "#8899AA" }}>
                        {n.message}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#4A5568" }}>
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotif.mutate({ id: n.id });
                      }}
                      className="text-xs flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity"
                      style={{ color: "#8899AA" }}
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-3 border-t text-center"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-xs" style={{ color: "#4A5568" }}>
              ScrollVerse Guardian Alerts · Issued in the ScrollVerse site · Confirm transaction status in your account or provider record
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
