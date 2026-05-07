/*
 * ADMIN CREATORS DASHBOARD
 * Review applications, approve creators, auto-generate referral codes, track earnings
 * Admin-only route — requires role === "admin"
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, Users, DollarSign, Link2, TrendingUp, Clock, Instagram } from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#00FF88",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#FFB800",
  approved: "#00FF88",
  rejected: "#FF4444",
};

export default function AdminCreators() {
  const { user } = useAuth();
  const [processingId, setProcessingId] = useState<number | null>(null);

  const { data: applications, refetch } = trpc.partners.getApplications.useQuery();
  const { data: stats } = trpc.partners.getStats.useQuery();

  const approveMutation = trpc.partners.approveCreator.useMutation({
    onSuccess: () => {
      toast.success("✅ Creator approved! Referral code activated.");
      refetch();
      setProcessingId(null);
    },
    onError: (err: { message: string }) => {
      toast.error(`Failed to approve: ${err.message}`);
      setProcessingId(null);
    },
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Sovereign Access Required</h1>
          <p style={{ color: "#8899AA" }}>This dashboard is restricted to ScrollVerse administrators.</p>
        </div>
      </div>
    );
  }

  const pending = (applications ?? []).filter((a: AppType) => a.status === "pending");
  const approved = (applications ?? []).filter((a: AppType) => a.status === "approved");

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>
                ADMIN SOVEREIGN PANEL
              </div>
              <h1 className="text-3xl font-black text-white">Creator Partnership Hub</h1>
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
                Review applications · Approve creators · Track referral earnings
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE ADMIN</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applications", value: (applications?.length ?? 0).toString(), icon: <Users size={18} />, color: "#00D4FF" },
            { label: "Approved Creators", value: (stats?.totalCreators ?? 0).toString(), icon: <CheckCircle size={18} />, color: "#00FF88" },
            { label: "Pending Review", value: pending.length.toString(), icon: <Clock size={18} />, color: "#FFB800" },
            { label: "Total Activations", value: (stats?.totalActivations ?? 0).toString(), icon: <DollarSign size={18} />, color: "#FF6B6B" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: s.color }}>
                {s.icon}
                <span className="text-xs font-mono">{s.label.toUpperCase()}</span>
              </div>
              <div className="text-2xl font-black text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Pending Applications */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white">Pending Applications</h2>
            {pending.length > 0 && (
              <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: "#FFB80020", color: "#FFB800" }}>
                {pending.length} awaiting review
              </span>
            )}
          </div>

          {pending.length === 0 ? (
            <div className="text-center py-10 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "#8899AA" }}>No pending applications. Share /partners to attract creators.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((app: AppType) => (
                <CreatorCard
                  key={app.id}
                  app={app}
                  processingId={processingId}
                  onApprove={(id) => {
                    setProcessingId(id);
                    approveMutation.mutate({ id });
                  }}
                  tierColors={TIER_COLORS}
                  statusColors={STATUS_COLORS}
                />
              ))}
            </div>
          )}
        </div>

        {/* Approved Creators */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Active Creators ({approved.length})</h2>
          {approved.length === 0 ? (
            <div className="text-center py-10 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "#8899AA" }}>No approved creators yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approved.map((app: AppType) => (
                <CreatorCard
                  key={app.id}
                  app={app}
                  processingId={processingId}
                  onApprove={(id) => {
                    setProcessingId(id);
                    approveMutation.mutate({ id });
                  }}
                  tierColors={TIER_COLORS}
                  statusColors={STATUS_COLORS}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type AppType = {
  id: number;
  name: string;
  email: string | null;
  instagram: string;
  followers: number | null;
  niche: string | null;
  tier: string | null;
  status: string | null;
  referralCode: string | null;
  activationsCount: number | null;
  loncEarned: string | null;
  createdAt: Date | null;
};

function CreatorCard({
  app,
  processingId,
  onApprove,
  tierColors,
  statusColors,
}: {
  app: AppType;
  processingId: number | null;
  onApprove: (id: number) => void;
  tierColors: Record<string, string>;
  statusColors: Record<string, string>;
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF" }}
            >
              {app.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-white">{app.name}</div>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#8899AA" }}>
                <Instagram size={12} />
                <span>@{app.instagram}</span>
                <span className="mx-1">·</span>
                <span>{Number(app.followers ?? 0).toLocaleString()} followers</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              className="text-xs font-mono"
              style={{
                background: `${tierColors[app.tier ?? "guardian"] ?? "#00D4FF"}15`,
                color: tierColors[app.tier ?? "guardian"] ?? "#00D4FF",
                border: `1px solid ${tierColors[app.tier ?? "guardian"] ?? "#00D4FF"}30`,
              }}
            >
              {(app.tier ?? "guardian").toUpperCase()} TIER
            </Badge>
            <Badge
              className="text-xs font-mono"
              style={{
                background: `${statusColors[app.status ?? "pending"] ?? "#FFB800"}15`,
                color: statusColors[app.status ?? "pending"] ?? "#FFB800",
                border: `1px solid ${statusColors[app.status ?? "pending"] ?? "#FFB800"}30`,
              }}
            >
              {(app.status ?? "pending").toUpperCase()}
            </Badge>
            {app.niche && (
              <Badge className="text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>
                {app.niche}
              </Badge>
            )}
          </div>

          {app.referralCode && (
            <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
              <Link2 size={14} style={{ color: "#00FF88" }} />
              <span className="text-xs font-mono" style={{ color: "#00FF88" }}>
                Code: {app.referralCode}
              </span>
              <span className="text-xs ml-auto" style={{ color: "#8899AA" }}>
                {Number(app.activationsCount ?? 0)} activations · {Number(app.loncEarned ?? 0).toLocaleString()} $LONDC
              </span>
            </div>
          )}

          <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
            Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"} · {app.email}
          </div>
        </div>

        {app.status === "pending" && (
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              disabled={processingId === app.id}
              onClick={() => onApprove(app.id)}
              className="font-bold"
              style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
            >
              <CheckCircle size={14} className="mr-1" />
              Approve
            </Button>
          </div>
        )}

        {app.status === "approved" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <TrendingUp size={14} style={{ color: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>ACTIVE CREATOR</span>
          </div>
        )}
      </div>
    </div>
  );
}
