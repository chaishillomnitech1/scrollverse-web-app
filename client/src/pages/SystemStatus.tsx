/**
 * ScrollVerse Trinity — /status
 * Evidence-first service status: only configured, observable checks receive
 * an operational label. Unprobed providers and settlement rails remain unverified.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const ACCENT = "#00D4FF";
const GREEN = "#00FF88";
const AMBER = "#FFB800";
const RED = "#FF4444";
const MUTED = "#9AAFC2";
const BG = "#050B1A";
const CARD = "rgba(0,212,255,0.04)";
const BORDER = "rgba(0,212,255,0.15)";

type ServiceStatus = "operational" | "degraded" | "down" | "unverified" | "checking";

interface ServiceCheck {
  name: string;
  status: ServiceStatus;
  description: string;
  evidence: string;
  lastChecked?: string;
  icon: string;
}

const STATUS_COLORS: Record<ServiceStatus, string> = {
  operational: GREEN,
  degraded: AMBER,
  down: RED,
  unverified: MUTED,
  checking: ACCENT,
};

function StatusBadge({ status }: { status: ServiceStatus }) {
  const color = STATUS_COLORS[status];
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-2 w-2 rounded-full ${status === "checking" ? "animate-pulse" : ""}`}
        style={{ background: color, boxShadow: status === "checking" ? `0 0 6px ${color}` : undefined }}
      />
      <span className="text-xs font-mono font-bold" style={{ color }}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceCheck }) {
  return (
    <article className="rounded-xl border p-5" style={{ background: CARD, borderColor: BORDER }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{service.icon}</span>
          <div>
            <h3 className="text-sm font-bold text-white">{service.name}</h3>
            <p className="text-xs" style={{ color: MUTED }}>{service.description}</p>
          </div>
        </div>
        <StatusBadge status={service.status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{service.evidence}</p>
      <p className="mt-3 text-[11px] font-mono" style={{ color: MUTED }}>
        Last successful query: {service.lastChecked ?? "No successful check recorded"}
      </p>
    </article>
  );
}

function MetricCard({ label, value, color, icon, note }: {
  label: string;
  value: string | number;
  color: string;
  icon: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border p-5 text-center" style={{ background: CARD, borderColor: BORDER }}>
      <div className="mb-2 text-2xl" aria-hidden="true">{icon}</div>
      <div className="font-mono text-2xl font-black" style={{ color }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: MUTED }}>{label}</div>
      {note ? <div className="mt-2 text-[10px] leading-4" style={{ color: MUTED }}>{note}</div> : null}
    </div>
  );
}

function formatTimestamp(timestamp?: number) {
  return timestamp && Number.isFinite(timestamp)
    ? new Date(timestamp).toLocaleTimeString()
    : undefined;
}

export default function SystemStatus() {
  const [now, setNow] = useState(new Date());

  const {
    data: guardianStats,
    isSuccess: guardianQuerySuccess,
    isError: guardianQueryError,
    dataUpdatedAt: guardianUpdatedAt,
  } = trpc.guardian.getCount.useQuery(undefined, { refetchInterval: 30000 });

  const {
    data: revenueData,
    isSuccess: revenueQuerySuccess,
    isError: revenueQueryError,
    dataUpdatedAt: revenueUpdatedAt,
  } = trpc.revenue.getStreamsData.useQuery(undefined, { refetchInterval: 30000 });

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const revenueStatus: ServiceStatus = revenueQuerySuccess
    ? "operational"
    : revenueQueryError
      ? "down"
      : "checking";

  const guardianContractStatus: ServiceStatus = guardianQueryError
    ? "down"
    : guardianQuerySuccess && guardianStats?.isLive && guardianStats.onChainCount !== null
      ? "operational"
      : guardianQuerySuccess
        ? "unverified"
        : "checking";

  const services: ServiceCheck[] = [
    {
      name: "Revenue ledger query (application API + database)",
      status: revenueStatus,
      description: "A read-only query of the application's recorded distribution ledger.",
      evidence: revenueQuerySuccess
        ? "The ledger query returned successfully. Its totals are application records, not independent confirmation of Stripe settlement, bank receipt, or on-chain transfers."
        : revenueQueryError
          ? "The ledger query failed. This does not identify whether the cause is the API, database, or query; inspect the protected application logs."
          : "Waiting for the first query result.",
      lastChecked: formatTimestamp(revenueUpdatedAt),
      icon: "📚",
    },
    {
      name: "Configured Guardian contract read",
      status: guardianContractStatus,
      description: "Optional read-only contract count through the configured Polygon RPC endpoint.",
      evidence: guardianStats?.isLive && guardianStats.onChainCount !== null
        ? `The configured contract read returned a count of ${guardianStats.onChainCount.toLocaleString()}. This confirms that specific read only; it does not verify other contracts, token balances, or treasury activity.`
        : guardianQueryError
          ? "The Guardian count API query failed."
          : "No configured on-chain Guardian count has been confirmed. Database fallback values are not labelled as on-chain verification.",
      lastChecked: formatTimestamp(guardianUpdatedAt),
      icon: "⛓️",
    },
    {
      name: "Stripe payment processing",
      status: "unverified",
      description: "Payment-provider health and settlement are not probed by this dashboard.",
      evidence: "No live Stripe health check or settlement reconciliation is connected here.",
      icon: "💳",
    },
    {
      name: "Manus OAuth",
      status: "unverified",
      description: "Authentication-provider health is not probed by this dashboard.",
      evidence: "No provider status endpoint or authenticated round-trip is connected here.",
      icon: "🔐",
    },
    {
      name: "Object storage / CDN",
      status: "unverified",
      description: "Media storage and content delivery are not probed by this dashboard.",
      evidence: "No read-after-write storage check or CDN probe is connected here.",
      icon: "☁️",
    },
    {
      name: "Zakat distribution settlement",
      status: "unverified",
      description: "Distribution configuration is distinct from settlement evidence.",
      evidence: "The application ledger alone cannot establish that funds reached a designated recipient or vault. A reconciled payment or chain receipt is required.",
      icon: "☪️",
    },
    {
      name: "Guardian waitlist records",
      status: "unverified",
      description: "The current count endpoint can return fallback values when its database read fails.",
      evidence: "This page does not treat the fallback/display count as a verified database total. A dedicated database health result is needed before showing a confirmed waitlist count.",
      icon: "🛡️",
    },
  ];

  const operationalCount = services.filter(service => service.status === "operational").length;
  const unverifiedCount = services.filter(service => service.status === "unverified").length;
  const downCount = services.filter(service => service.status === "down").length;
  const checkingCount = services.filter(service => service.status === "checking").length;

  const overallStatus: ServiceStatus = downCount > 0
    ? "down"
    : checkingCount > 0
      ? "checking"
      : operationalCount > 0
        ? "operational"
        : "unverified";

  const overallMessage: Record<ServiceStatus, string> = {
    operational: "Configured checks responded; unprobed integrations remain unverified.",
    degraded: "One or more configured checks are degraded.",
    down: `${downCount} configured check${downCount === 1 ? "" : "s"} failed — inspect application logs.`,
    unverified: "No independently verified service checks are available.",
    checking: "Waiting for configured checks to return.",
  };

  const totalRecordedCents = revenueData?.totals.totalRevenue;
  const onChainGuardianCount = guardianStats?.isLive ? guardianStats.onChainCount : null;

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav
        className="fixed left-0 right-0 top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: BORDER }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: BG }}>SV</span>
            <span className="font-bold text-white">ScrollVerse</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono" style={{ background: `${STATUS_COLORS[overallStatus]}15`, border: `1px solid ${STATUS_COLORS[overallStatus]}40` }}>
              <StatusBadge status={overallStatus} />
            </div>
            <span className="text-xs font-mono" style={{ color: MUTED }}>{now.toLocaleTimeString()}</span>
          </div>
        </div>
      </nav>

      <main className="container pb-16 pt-28">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-mono tracking-widest" style={{ color: ACCENT }}>EVIDENCE-BASED SYSTEM STATUS</p>
          <h1 className="mb-3 text-4xl font-black text-white">ScrollVerse Trinity</h1>
          <p className="mx-auto max-w-3xl text-sm leading-6 text-slate-300">
            Only checks with observable results receive an operational label. Unprobed services are marked UNVERIFIED—not assumed healthy. Uptime history and incident tracking are not connected to this dashboard.
          </p>
          <div className="mx-auto mt-6 inline-flex max-w-3xl items-center gap-3 rounded-xl px-6 py-3 text-sm font-bold" style={{ background: `${STATUS_COLORS[overallStatus]}10`, border: `1px solid ${STATUS_COLORS[overallStatus]}40`, color: STATUS_COLORS[overallStatus] }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[overallStatus] }} />
            {overallMessage[overallStatus]}
          </div>
        </header>

        <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Verified system metrics">
          <MetricCard
            label="Guardian contract count"
            value={onChainGuardianCount === null ? "Not verified" : onChainGuardianCount.toLocaleString()}
            color={onChainGuardianCount === null ? MUTED : ACCENT}
            icon="🛡️"
            note="Shown only when the configured contract read succeeds."
          />
          <MetricCard
            label="Ledger-recorded volume"
            value={totalRecordedCents === undefined ? "Unavailable" : `$${(totalRecordedCents / 100).toFixed(2)}`}
            color={totalRecordedCents === undefined ? MUTED : GREEN}
            icon="💎"
            note="Application ledger records; not proof of processor or bank settlement."
          />
          <MetricCard label="Checks responding" value={operationalCount} color={GREEN} icon="⚡" />
          <MetricCard label="Integrations unverified" value={unverifiedCount} color={AMBER} icon="◌" />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white"><span style={{ color: ACCENT }}>◈</span> Service evidence</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map(service => <ServiceCard key={service.name} service={service} />)}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-white"><span style={{ color: GREEN }}>◈</span> Revenue stream ledger</h2>
          <p className="mb-4 text-xs leading-5" style={{ color: MUTED }}>
            These figures are read from the application's revenue-distribution records. Configured rates and ledger entries do not independently prove completed payment settlement or recipient receipt.
          </p>
          {revenueQueryError ? (
            <p role="alert" className="rounded-xl border p-5 text-sm text-amber-200" style={{ borderColor: `${AMBER}55`, background: `${AMBER}10` }}>
              Revenue ledger data could not be loaded. No live distribution total is shown.
            </p>
          ) : revenueQuerySuccess && revenueData ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {revenueData.streams.map(stream => (
                <article key={stream.name} className="rounded-xl border p-4" style={{ background: CARD, borderColor: BORDER }}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2"><span aria-hidden="true">{stream.icon}</span><span className="text-sm font-bold text-white">{stream.name}</span></div>
                    <span className="text-xs font-mono font-bold" style={{ color: stream.color }}>{stream.rate} configured</span>
                  </div>
                  <p className="mb-2 text-xs" style={{ color: MUTED }}>{stream.description}</p>
                  <p className="font-mono font-bold" style={{ color: stream.color }}>${(stream.totalDistributed / 100).toFixed(2)} recorded</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border p-5 text-sm" style={{ borderColor: BORDER, color: MUTED }}>Waiting for the revenue ledger query.</p>
          )}
        </section>

        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white"><span style={{ color: AMBER }}>◈</span> Incident history</h2>
          <div className="rounded-xl border p-6" style={{ background: CARD, borderColor: BORDER }}>
            <p className="font-bold text-white">No incident ledger is connected.</p>
            <p className="mt-2 text-sm leading-6" style={{ color: MUTED }}>
              This dashboard cannot confirm whether incidents occurred in any period. Connect a dated incident source before reporting incident counts or uptime history.
            </p>
          </div>
        </section>

        <footer className="text-center">
          <p className="text-xs font-mono" style={{ color: MUTED }}>
            UI clock: {now.toLocaleString()} · Configured tRPC queries refresh every 30 seconds · {downCount} failed checks · {unverifiedCount} unverified integrations
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/" className="text-sm transition-colors hover:text-white" style={{ color: ACCENT }}>← Back to Home</Link>
            <Link href="/family" className="text-sm transition-colors hover:text-white" style={{ color: MUTED }}>Family Portal →</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
