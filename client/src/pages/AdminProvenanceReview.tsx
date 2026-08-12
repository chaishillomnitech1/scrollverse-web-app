import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

type ReviewRecord = {
  id: number;
  title: string;
  recordType: string;
  summary: string;
  sourceCategory: string;
  sourceReference: string | null;
  ownerAttestation: boolean;
  reviewStatus: string;
  createdAt: Date;
  owner: { id: number; name: string | null } | null;
  events: Array<{ id: number; action: string; note: string; createdAt: Date }>;
};

function statusColor(status: string) {
  if (status === "ACKNOWLEDGED") return "#00FF88";
  if (status === "NEEDS_INFO") return "#FFB800";
  return "#00D4FF";
}

export default function AdminProvenanceReview() {
  useSovereignHeartbeat({ page: "admin-provenance-review" });
  const { user, loading, isAuthenticated } = useAuth();
  const queue = trpc.creatorGovernance.getProvenanceReviewQueue.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const review = trpc.creatorGovernance.reviewProvenanceRecord.useMutation();
  const [notes, setNotes] = useState<Record<number, string>>({});

  const runReview = async (id: number, decision: "ACKNOWLEDGED" | "NEEDS_INFO") => {
    const note = notes[id]?.trim();
    if (!note || note.length < 3) return toast.error("Add a clear completeness note before saving the review.");
    try {
      await review.mutateAsync({ id, decision, note });
      toast.success(decision === "ACKNOWLEDGED" ? "Record acknowledged for completeness only." : "Information request recorded.");
      setNotes(current => ({ ...current, [id]: "" }));
      await queue.refetch();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Review could not be saved."); }
  };

  if (loading) return <main className="min-h-screen grid place-items-center text-white" style={{ background: "#050B1A" }}><span className="font-mono text-sm" style={{ color: "#00D4FF" }}>LOADING REVIEW CONSOLE…</span></main>;
  if (!isAuthenticated) return <main className="min-h-screen grid place-items-center px-5 text-white" style={{ background: "#050B1A" }}><section className="max-w-lg rounded-3xl border p-8 text-center" style={{ borderColor: "rgba(0,212,255,0.24)" }}><h1 className="text-2xl font-black">Protected provenance review</h1><p className="mt-3 text-sm" style={{ color: "#B8C7D6" }}>Sign in with an administrator account to review submitted completeness records.</p><button onClick={() => { window.location.href = getLoginUrl(); }} className="mt-6 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in</button></section></main>;
  if (user?.role !== "admin") return <main className="min-h-screen grid place-items-center px-5 text-white" style={{ background: "#050B1A" }}><section className="max-w-lg rounded-3xl border p-8 text-center" style={{ borderColor: "rgba(255,184,0,0.28)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>ADMINISTRATION REQUIRED</div><h1 className="mt-3 text-2xl font-black">This review queue is protected.</h1><p className="mt-3 text-sm" style={{ color: "#B8C7D6" }}>Only project administrators can record completeness feedback. Creator records remain private to their owner and authorized reviewers.</p><Link href="/creator-workspace" className="mt-6 inline-block rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}>Return to Workspace</Link></section></main>;

  return <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}><section className="border-b" style={{ borderColor: "rgba(0,255,136,0.18)", background: "radial-gradient(circle at 85% 0%, rgba(0,255,136,0.13), transparent 31%), #050B1A" }}><div className="max-w-6xl mx-auto px-5 pt-28 pb-14"><div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00FF88" }}>PROTECTED PROVENANCE REVIEW · COMPLETENESS ONLY</div><div className="mt-5 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-4xl font-black leading-none sm:text-5xl">Review the record.<br /><span style={{ color: "#00FF88" }}>Do not overstate the result.</span></h1><p className="mt-5 max-w-3xl text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>This console records whether a submitted provenance note has enough information for its stated internal purpose. It does not decide ownership, grant a license, value an asset, create a contract, approve commerce, or make a legal conclusion.</p></div><Link href="/creator-workspace" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}>Creator Workspace</Link></div></div></section><section className="max-w-6xl mx-auto px-5 py-12"><div className="flex items-center justify-between gap-4"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>REVIEW QUEUE</div><h2 className="mt-2 text-2xl font-black">Submitted and active records</h2></div><span className="text-sm" style={{ color: "#95A6B8" }}>{queue.data?.length ?? 0} records</span></div><div className="mt-7 space-y-5">{queue.isLoading ? <div className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>Loading protected queue…</div> : queue.data?.length ? queue.data.map((record: ReviewRecord) => { const color = statusColor(record.reviewStatus); return <article key={record.id} className="rounded-3xl border p-6" style={{ borderColor: `${color}35`, background: "rgba(255,255,255,0.025)" }}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[10px] font-mono" style={{ color }}>{record.reviewStatus.replaceAll("_", " ")}</div><h3 className="mt-2 text-xl font-black">{record.title}</h3><p className="mt-1 text-xs" style={{ color: "#A9B9C9" }}>Owner: {record.owner?.name ?? "Private creator"} · {record.recordType} · {record.sourceCategory.replaceAll("_", " ")}</p></div><span className="rounded-full px-3 py-1 text-xs font-black" style={{ color, background: `${color}12` }}>{record.ownerAttestation ? "ATTESTED" : "NO ATTESTATION"}</span></div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>{record.summary}</p>{record.sourceReference ? <p className="mt-3 break-all text-xs" style={{ color: "#00D4FF" }}>Reference: {record.sourceReference}</p> : null}<div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]"><div><label className="text-xs font-bold" style={{ color: "#B8C7D6" }}>Completeness note<textarea value={notes[record.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [record.id]: event.target.value }))} maxLength={1500} placeholder="Explain what is complete or what information is still needed. Do not state legal or commercial conclusions." className="mt-2 min-h-24 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label></div><div className="flex flex-row flex-wrap gap-2 self-end lg:flex-col"><button disabled={review.isPending} onClick={() => runReview(record.id, "ACKNOWLEDGED")} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-60" style={{ background: "#00FF88", color: "#050B1A" }}>Acknowledge completeness</button><button disabled={review.isPending} onClick={() => runReview(record.id, "NEEDS_INFO")} className="rounded-xl border px-4 py-3 text-xs font-black disabled:opacity-60" style={{ borderColor: "rgba(255,184,0,0.42)", color: "#FFB800" }}>Request information</button></div></div>{record.events.length ? <div className="mt-5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}><div className="text-[10px] font-mono" style={{ color: "#A9B9C9" }}>AUDIT TIMELINE</div><div className="mt-3 space-y-2">{record.events.map(event => <p key={event.id} className="text-xs leading-relaxed" style={{ color: "#C1D0DE" }}><span style={{ color: "#00D4FF" }}>{event.action.replaceAll("_", " ")}</span> · {event.note}</p>)}</div></div> : null}</article>; }) : <article className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>No submitted provenance records require review.</article>}</div></section></main>;
}
