import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const EMPTY_FORM = {
  recordReference: "",
  assetLabel: "LONDC",
  networkLabel: "",
  submittedTransactionReference: "",
  counterpartyReference: "",
  declaredAmount: "",
  declaredUnit: "LONDC",
  sourceReference: "",
  sourceNote: "",
};

type RoyaltyRow = {
  id: number;
  recordReference: string;
  assetLabel: string;
  networkLabel: string | null;
  submittedTransactionReference: string | null;
  declaredAmount: string | null;
  declaredUnit: string;
  sourceReference: string | null;
  sourceNote: string;
  reviewStatus: string;
};

function statusColor(status: string) {
  if (status === "REFERENCE_REVIEWED") return "#00FF88";
  if (status === "NEEDS_INFO") return "#FFB800";
  if (status === "CLOSED") return "#8899AA";
  return "#00D4FF";
}

export default function AdminRoyaltyRecords() {
  useSovereignHeartbeat({ page: "admin-royalty-records" });
  const { user, loading, isAuthenticated } = useAuth();
  const enabled = isAuthenticated && user?.role === "admin";
  const utils = trpc.useUtils();
  const records = trpc.royaltyRecords.list.useQuery(undefined, { enabled });
  const record = trpc.royaltyRecords.record.useMutation();
  const [form, setForm] = useState(EMPTY_FORM);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.recordReference.trim() || form.sourceNote.trim().length < 8) {
      toast.error("Add a stable record reference and a factual source note.");
      return;
    }
    try {
      await record.mutateAsync({
        recordReference: form.recordReference.trim(),
        assetLabel: form.assetLabel.trim() || "LONDC",
        networkLabel: form.networkLabel.trim() || undefined,
        submittedTransactionReference: form.submittedTransactionReference.trim() || undefined,
        counterpartyReference: form.counterpartyReference.trim() || undefined,
        declaredAmount: form.declaredAmount.trim() || undefined,
        declaredUnit: form.declaredUnit.trim() || "LONDC",
        sourceReference: form.sourceReference.trim() || undefined,
        sourceNote: form.sourceNote.trim(),
      });
      setForm(EMPTY_FORM);
      toast.success("Local source record saved. No external action was sent.");
      await utils.royaltyRecords.list.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The local record could not be saved.");
    }
  };

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#050B1A] text-[#B5F7CC]">Loading protected local record desk…</main>;
  if (!isAuthenticated) return <main className="grid min-h-screen place-items-center bg-[#050B1A] px-5 text-center text-white"><div><p className="text-sm text-[#B8C7D6]">Sign in to reach the protected local royalty-record desk.</p><button type="button" onClick={() => { window.location.href = getLoginUrl(); }} className="mt-4 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#050B1A]">Sign in</button></div></main>;
  if (user?.role !== "admin") return <main className="grid min-h-screen place-items-center bg-[#050B1A] px-5 text-center text-white"><div className="max-w-xl rounded-3xl border border-[#FFB800]/30 p-8"><p className="text-xs font-mono text-[#FFE09A]">OWNER-SCOPED RECORD DESK</p><h1 className="mt-4 text-3xl font-black">This local record desk is restricted to administrators.</h1><p className="mt-4 text-sm leading-7 text-[#B8C7D6]">It keeps submitted reference records private to the owner workspace. It does not connect to a wallet, provider, or transfer flow.</p><Link href="/trinity-sovereign-portal" className="mt-6 inline-block text-sm font-black text-[#9DEBFF]">Return to Trinity Portal →</Link></div></main>;

  const rows = (records.data ?? []) as RoyaltyRow[];
  return <DashboardLayout><main className="min-h-full space-y-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="rounded-3xl border border-[#00FF88]/30 bg-[radial-gradient(circle_at_90%_0%,rgba(0,255,136,.15),transparent_38%),#071426] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#B5F7CC]">OWNER-SCOPED · LOCAL ONLY</p><div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-black">Local royalty-record desk</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-[#C1D0DE]">Capture an exact source reference for later review. This form saves a local database record only; it does not validate a chain, pull a wallet balance, submit a transaction, move value, calculate royalties, or connect to any provider.</p></div><Link href="/trinity-sovereign-portal" className="rounded-xl border border-[#00D4FF]/40 px-4 py-2.5 text-sm font-black text-[#9DEBFF]">Trinity Portal</Link></div></section>
    <section className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.05] p-5"><p className="text-3xl font-black text-[#9DEBFF]">{rows.length}</p><p className="mt-1 text-xs font-mono text-[#B8C7D6]">LOCAL RECORDS</p></div><div className="rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.05] p-5"><p className="text-3xl font-black text-[#FFE09A]">{rows.filter(row => row.reviewStatus === "DRAFT").length}</p><p className="mt-1 text-xs font-mono text-[#B8C7D6]">DRAFT REFERENCES</p></div><div className="rounded-2xl border border-[#00FF88]/25 bg-[#00FF88]/[.05] p-5"><p className="text-3xl font-black text-[#B5F7CC]">0</p><p className="mt-1 text-xs font-mono text-[#B8C7D6]">EXTERNAL CONNECTIONS</p></div></section>
    <section className="rounded-3xl border border-white/10 bg-[#071126] p-6"><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">ADD SOURCE RECORD</p><form onSubmit={submit} className="mt-5 grid gap-4 lg:grid-cols-2"><label className="text-xs text-[#B8C7D6]">Record reference<input required value={form.recordReference} onChange={event => setForm({ ...form, recordReference: event.target.value })} maxLength={160} placeholder="e.g. LONDC-ROYALTY-REFERENCE-001" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Declared asset label<input value={form.assetLabel} onChange={event => setForm({ ...form, assetLabel: event.target.value })} maxLength={32} className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Network label <span className="text-[#8090A0]">(optional)</span><input value={form.networkLabel} onChange={event => setForm({ ...form, networkLabel: event.target.value })} maxLength={64} placeholder="Record only when supplied" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Submitted transaction reference <span className="text-[#8090A0]">(optional)</span><input value={form.submittedTransactionReference} onChange={event => setForm({ ...form, submittedTransactionReference: event.target.value })} maxLength={160} placeholder="Paste exact reference; no chain lookup occurs" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Counterparty reference <span className="text-[#8090A0]">(optional)</span><input value={form.counterpartyReference} onChange={event => setForm({ ...form, counterpartyReference: event.target.value })} maxLength={160} className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Declared amount <span className="text-[#8090A0]">(optional text)</span><input value={form.declaredAmount} onChange={event => setForm({ ...form, declaredAmount: event.target.value })} maxLength={80} placeholder="Preserves a stated amount; no calculation occurs" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Declared unit<input value={form.declaredUnit} onChange={event => setForm({ ...form, declaredUnit: event.target.value })} maxLength={32} className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6]">Source URL <span className="text-[#8090A0]">(optional)</span><input type="url" value={form.sourceReference} onChange={event => setForm({ ...form, sourceReference: event.target.value })} maxLength={2048} placeholder="https://" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><label className="text-xs text-[#B8C7D6] lg:col-span-2">Factual source note<textarea required value={form.sourceNote} onChange={event => setForm({ ...form, sourceNote: event.target.value })} minLength={8} maxLength={2000} placeholder="Describe exactly what the supplied source says or shows. No external confirmation is implied." className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00D4FF]" /></label><div className="lg:col-span-2"><button type="submit" disabled={record.isPending} className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04120C] disabled:opacity-50">{record.isPending ? "Saving local record…" : "Save local source record"}</button></div></form></section>
    <section className="space-y-4">{records.isLoading ? <div className="rounded-3xl border border-white/10 p-6 text-sm text-[#B8C7D6]">Loading local records…</div> : rows.length ? rows.map(row => <article key={row.id} className="rounded-3xl border border-white/10 bg-white/[.03] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-mono text-[#9DEBFF]">{row.recordReference} · {row.assetLabel}</p><h2 className="mt-2 text-xl font-black">Submitted local reference</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C1D0DE]">{row.sourceNote}</p></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono font-black" style={{ color: statusColor(row.reviewStatus), borderColor: `${statusColor(row.reviewStatus)}66`, background: `${statusColor(row.reviewStatus)}15` }}>{row.reviewStatus.replaceAll("_", " ")}</span></div><div className="mt-5 grid gap-3 md:grid-cols-3 text-xs"><p className="rounded-xl border border-white/10 bg-black/20 p-3 text-[#B8C7D6]">Network: <span className="text-white">{row.networkLabel ?? "Not supplied"}</span></p><p className="rounded-xl border border-white/10 bg-black/20 p-3 text-[#B8C7D6]">Submitted ref: <span className="text-white">{row.submittedTransactionReference ?? "Not supplied"}</span></p><p className="rounded-xl border border-white/10 bg-black/20 p-3 text-[#B8C7D6]">Declared amount: <span className="text-white">{row.declaredAmount ? `${row.declaredAmount} ${row.declaredUnit}` : "Not supplied"}</span></p></div>{row.sourceReference ? <a href={row.sourceReference} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black text-[#9DEBFF]">Open submitted source →</a> : null}</article>) : <div className="rounded-3xl border border-dashed border-[#00D4FF]/30 p-8 text-center"><p className="text-sm text-[#C1D0DE]">No local royalty-reference records have been entered. The desk begins empty by design.</p></div>}</section>
  </main></DashboardLayout>;
}
