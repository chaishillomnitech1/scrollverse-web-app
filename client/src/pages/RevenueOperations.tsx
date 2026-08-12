import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const STATUS_COLORS: Record<string, string> = {
  NOT_STARTED: "#95A6B8",
  IN_PROGRESS: "#00D4FF",
  AWAITING_OWNER: "#FFB800",
  BLOCKED: "#FF6B7A",
  READY: "#00FF88",
};

const CATEGORIES = ["PAYMENT", "BOOKING", "COMMERCE", "CREATOR", "GITHUB", "SECURITY"] as const;
const STATUSES = ["NOT_STARTED", "IN_PROGRESS", "AWAITING_OWNER", "BLOCKED", "READY"] as const;

function timestamp(value: Date | string | null | undefined) {
  return value ? new Date(value).toLocaleString() : "Not yet recorded";
}

export default function RevenueOperations() {
  useSovereignHeartbeat({ page: "revenue-operations" });
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const utils = trpc.useUtils();
  const workspace = trpc.revenueOperations.getWorkspace.useQuery(undefined, { enabled: Boolean(isAdmin) });
  const createRecord = trpc.revenueOperations.createReadinessRecord.useMutation({
    onSuccess: () => { toast.success("Readiness record saved. No external activation was performed."); utils.revenueOperations.getWorkspace.invalidate(); },
    onError: error => toast.error(error.message),
  });
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    operationKey: "",
    title: "",
    category: "PAYMENT" as (typeof CATEGORIES)[number],
    readinessStatus: "NOT_STARTED" as (typeof STATUSES)[number],
    evidenceSummary: "",
    evidenceUrl: "",
    nextOwnerAction: "",
    ownerAttestation: false,
  });
  const records = workspace.data?.records ?? [];
  const grouped = useMemo(() => CATEGORIES.map(category => ({ category, records: records.filter(record => record.category === category) })).filter(group => group.records.length), [records]);

  const submit = () => {
    createRecord.mutate({ ...form, evidenceUrl: form.evidenceUrl || null });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen rounded-[2rem] p-1 text-white" style={{ background: "radial-gradient(circle at 92% 7%, rgba(0,212,255,0.16), transparent 27%), radial-gradient(circle at 3% 85%, rgba(255,184,0,0.12), transparent 29%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-5"><div><Link href="/github-ops" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← GITHUB-TO-OPERATIONS</Link><div className="mt-5 text-xs font-mono tracking-[0.24em]" style={{ color: "#00FF88" }}>OWNER-CONTROLLED READINESS WORKSPACE</div><h1 className="mt-3 text-4xl font-black leading-none sm:text-5xl">Revenue Operations<br /><span style={{ color: "#FFB800" }}>without invented results.</span></h1><p className="mt-5 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "#C8D8E7" }}>Record evidence, see dependencies, and prepare the next owner action across payment, booking, commerce, creator, GitHub, and security paths. The workspace never starts charges, payouts, token actions, or deployments.</p></div><Link href="/" className="rounded-xl border px-4 py-2 text-xs font-black" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E7EEF7" }}>SCROLLVERSE HOME</Link></div>

          {loading ? <div className="mt-12 rounded-3xl border p-8" style={{ borderColor: "rgba(0,212,255,0.2)" }}>Checking owner workspace access…</div> : !isAdmin ? <div className="mt-12 rounded-[2rem] border p-8" style={{ borderColor: "rgba(255,184,0,0.35)", background: "rgba(255,184,0,0.06)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>OWNER WORKSPACE</div><h2 className="mt-3 text-2xl font-black">Administrator access is required.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "#D5C9AB" }}>This route deliberately protects operational readiness notes and their audit history. Public visitors can explore the source-to-review map, creator routes, and published standards without seeing private owner records.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/github-ops" className="rounded-xl px-4 py-2.5 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Open GitHub Operations</Link><Link href="/evidence-standards" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.45)", color: "#FFB800" }}>Open Evidence Standards</Link></div></div> : <>
            <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
              ["Records", workspace.data?.summary.total ?? 0, "#00D4FF"],
              ["Ready records", workspace.data?.summary.ready ?? 0, "#00FF88"],
              ["Awaiting owner", workspace.data?.summary.awaitingOwner ?? 0, "#FFB800"],
              ["Blocked", workspace.data?.summary.blocked ?? 0, "#FF6B7A"],
            ].map(([label, value, color]) => <div key={String(label)} className="rounded-3xl border p-5" style={{ borderColor: `${String(color)}45`, background: "rgba(4,14,30,0.7)" }}><div className="text-xs font-mono" style={{ color: String(color) }}>{label}</div><div className="mt-2 text-4xl font-black">{value}</div></div>)}</section>

            <section className="mt-7 rounded-[2rem] border p-6" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(4,14,30,0.7)" }}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>CURRENT BOUNDARY</div><p className="mt-2 max-w-4xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{workspace.data?.summary.boundary}</p></div><button type="button" onClick={() => setFormOpen(value => !value)} className="rounded-xl px-4 py-2.5 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>{formOpen ? "Close form" : "Add readiness record"}</button></div>
              {formOpen && <div className="mt-6 grid gap-4 border-t pt-6 md:grid-cols-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>OPERATION KEY<input value={form.operationKey} onChange={event => setForm({ ...form, operationKey: event.target.value })} placeholder="revenue-readiness-digest" className="mt-2 w-full rounded-xl border bg-transparent px-3 py-3 text-sm text-white outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>TITLE<input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Revenue readiness review" className="mt-2 w-full rounded-xl border bg-transparent px-3 py-3 text-sm text-white outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>CATEGORY<select value={form.category} onChange={event => setForm({ ...form, category: event.target.value as typeof form.category })} className="mt-2 w-full rounded-xl border bg-[#081224] px-3 py-3 text-sm text-white" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{CATEGORIES.map(category => <option key={category}>{category}</option>)}</select></label><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>READINESS STATE<select value={form.readinessStatus} onChange={event => setForm({ ...form, readinessStatus: event.target.value as typeof form.readinessStatus })} className="mt-2 w-full rounded-xl border bg-[#081224] px-3 py-3 text-sm text-white" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{STATUSES.map(status => <option key={status}>{status}</option>)}</select></label><label className="text-xs font-mono md:col-span-2" style={{ color: "#AEBFD0" }}>EVIDENCE SUMMARY<textarea value={form.evidenceSummary} onChange={event => setForm({ ...form, evidenceSummary: event.target.value })} placeholder="Describe the source-labelled evidence available now. Do not enter credentials, payment details, or private keys." className="mt-2 min-h-24 w-full rounded-xl border bg-transparent px-3 py-3 text-sm text-white outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>EVIDENCE LINK (OPTIONAL)<input value={form.evidenceUrl} onChange={event => setForm({ ...form, evidenceUrl: event.target.value })} placeholder="https://…" className="mt-2 w-full rounded-xl border bg-transparent px-3 py-3 text-sm text-white outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-xs font-mono" style={{ color: "#AEBFD0" }}>NEXT OWNER ACTION<input value={form.nextOwnerAction} onChange={event => setForm({ ...form, nextOwnerAction: event.target.value })} placeholder="Name the explicit next decision or artifact." className="mt-2 w-full rounded-xl border bg-transparent px-3 py-3 text-sm text-white outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="flex items-start gap-3 text-sm md:col-span-2" style={{ color: "#C8D8E7" }}><input type="checkbox" checked={form.ownerAttestation} onChange={event => setForm({ ...form, ownerAttestation: event.target.checked })} className="mt-1" />I confirm this is an honest internal readiness record. It does not create or authorize a payment, payout, token action, contract deployment, or provider activation.</label><div className="md:col-span-2"><button type="button" disabled={createRecord.isPending} onClick={submit} className="rounded-xl px-5 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#FFB800", color: "#050B1A" }}>{createRecord.isPending ? "Saving…" : "Save internal readiness record"}</button></div></div>}</section>

            <section className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.7)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>READINESS RECORDS</div><h2 className="mt-2 text-2xl font-black">Evidence, status, and next action.</h2>{workspace.isLoading ? <p className="mt-6 text-sm" style={{ color: "#AEBFD0" }}>Loading readiness records…</p> : records.length === 0 ? <div className="mt-6 rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#C8D8E7" }}>No owner readiness records exist yet. Begin with an evidence-led path such as Stripe live-mode readiness, SaferWay operations, approved fashion commerce evidence, a creator release package, GitHub test evidence, or Universal Nexus research.</div> : <div className="mt-6 space-y-6">{grouped.map(group => <div key={group.category}><div className="text-[10px] font-mono tracking-widest" style={{ color: "#95A6B8" }}>{group.category}</div><div className="mt-3 space-y-3">{group.records.map(record => <article key={record.id} className="rounded-2xl border p-4" style={{ borderColor: `${STATUS_COLORS[record.readinessStatus]}40`, background: "rgba(255,255,255,0.018)" }}><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-black">{record.title}</h3><div className="mt-1 text-[10px] font-mono" style={{ color: "#95A6B8" }}>{record.operationKey} · last reviewed {timestamp(record.lastReviewedAt)}</div></div><span className="rounded-full px-3 py-1 text-[10px] font-mono" style={{ color: STATUS_COLORS[record.readinessStatus], background: `${STATUS_COLORS[record.readinessStatus]}16` }}>{record.readinessStatus.replaceAll("_", " ")}</span></div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{record.evidenceSummary}</p><div className="mt-4 rounded-xl p-3 text-sm" style={{ background: "rgba(255,184,0,0.06)", color: "#EBD8A6" }}><span className="font-black">Next owner action: </span>{record.nextOwnerAction}</div>{record.evidenceUrl && <a href={record.evidenceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-black" style={{ color: "#00D4FF" }}>Open linked evidence ↗</a>}{record.events[0] && <p className="mt-3 text-xs leading-relaxed" style={{ color: "#95A6B8" }}>Latest internal note: {record.events[0].note}</p>}</article>)}</div></div>)}</div>}</div>
              <div className="space-y-6"><article className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(0,255,136,0.24)", background: "rgba(4,14,30,0.7)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>NON-TRANSACTIONAL REVIEW SCHEDULES</div><div className="mt-5 space-y-4">{workspace.data?.schedules.map(schedule => <div key={schedule.key} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}><div className="flex items-center justify-between gap-3"><h3 className="font-black">{schedule.label}</h3><span className="text-[10px] font-mono" style={{ color: schedule.state === "ACTIVE" ? "#00FF88" : "#FFB800" }}>{schedule.state}</span></div><p className="mt-2 text-xs font-mono" style={{ color: "#00D4FF" }}>{schedule.cadence}</p><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{schedule.scope}</p></div>)}</div></article><article className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(185,140,255,0.3)", background: "rgba(185,140,255,0.05)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>MULTIPLE PATHS, ONE CONTROL PLANE</div><div className="mt-4 grid gap-3">{[["Creator releases", "/creator-operations"], ["Signalworks", "/signalworks"], ["Evidence standards", "/evidence-standards"], ["Systems map", "/systems-map"], ["GitHub operations", "/github-ops"]].map(([label, href]) => <Link key={href} href={href} className="rounded-xl border px-4 py-3 text-sm font-black transition-transform hover:-translate-y-0.5" style={{ borderColor: "rgba(185,140,255,0.28)", color: "#E7D9FF" }}>{label} →</Link>)}</div></article></div></section>
          </>}
        </div>
      </div>
    </DashboardLayout>
  );
}
