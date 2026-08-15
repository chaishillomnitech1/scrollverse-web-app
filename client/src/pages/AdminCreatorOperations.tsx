import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

type Person = { id: number; name: string | null; email: string | null };
type AssetEvent = { action: string; note: string; createdAt: Date };
type ReviewAsset = {
  id: number;
  assetKind: string;
  title: string;
  description: string;
  sourceReference: string | null;
  reviewStatus: string;
  assetUrl: string | null;
  originalFileName: string | null;
  byteSize: number | null;
  owner: Person | null;
  assignedReviewer: Person | null;
  events: AssetEvent[];
};

const DECISIONS = ["ACKNOWLEDGED", "NEEDS_INFO", "EXCLUDED"] as const;

function statusColor(status: string) {
  if (status === "ACKNOWLEDGED") return "#00FF88";
  if (status === "NEEDS_INFO") return "#FFB800";
  if (status === "EXCLUDED") return "#FF7575";
  return "#00D4FF";
}

function StatusPill({ status }: { status: string }) {
  const color = statusColor(status);
  return <span className="rounded-full px-2.5 py-1 text-[10px] font-mono font-bold" style={{ color, background: `${color}14`, border: `1px solid ${color}3d` }}>{status.replaceAll("_", " ")}</span>;
}

export default function AdminCreatorOperations() {
  useSovereignHeartbeat({ page: "admin-creator-operations" });
  const { user, loading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const enabled = isAuthenticated && user?.role === "admin";
  const queue = trpc.creatorOperations.getReleaseAssetReviewQueue.useQuery(undefined, { enabled });
  const reviewers = trpc.creatorOperations.getEligibleReleaseReviewers.useQuery(undefined, { enabled });
  const assign = trpc.creatorOperations.assignReleaseAssetReviewer.useMutation();
  const review = trpc.creatorOperations.reviewReleaseAsset.useMutation();
  const [reviewerSelections, setReviewerSelections] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const busy = assign.isPending || review.isPending;
  const assets = (queue.data ?? []) as ReviewAsset[];
  const reviewerOptions = (reviewers.data ?? []) as Person[];

  const refresh = async () => {
    await Promise.all([
      utils.creatorOperations.getReleaseAssetReviewQueue.invalidate(),
      utils.creatorOperations.getMyOperations.invalidate(),
    ]);
  };

  const assignReviewer = async (asset: ReviewAsset) => {
    const reviewerUserId = Number(reviewerSelections[asset.id] ?? asset.assignedReviewer?.id ?? 0);
    if (!reviewerUserId) {
      toast.error("Choose an eligible administrator before assigning this review.");
      return;
    }
    try {
      await assign.mutateAsync({
        id: asset.id,
        reviewerUserId,
        note: `Internal completeness-review coordination assigned for ${asset.title}.`,
      });
      toast.success("Internal reviewer assigned.");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reviewer assignment could not be saved.");
    }
  };

  const recordDecision = async (asset: ReviewAsset, decision: (typeof DECISIONS)[number]) => {
    const note = notes[asset.id]?.trim();
    if (!note || note.length < 3) {
      toast.error("Add a short, factual completeness note first.");
      return;
    }
    try {
      await review.mutateAsync({ id: asset.id, decision, note });
      setNotes(current => ({ ...current, [asset.id]: "" }));
      toast.success("Completeness status recorded.");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Completeness feedback could not be saved.");
    }
  };

  if (loading) return <main className="min-h-screen grid place-items-center" style={{ background: "#050B1A", color: "#B98CFF" }}>Loading protected operations review…</main>;
  if (!isAuthenticated) return <main className="min-h-screen grid place-items-center px-5 text-center" style={{ background: "#050B1A", color: "white" }}><div><p className="text-sm" style={{ color: "#B8C7D6" }}>Sign in to reach protected Creator Operations review.</p><button onClick={() => { window.location.href = getLoginUrl(); }} className="mt-4 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#B98CFF", color: "#050B1A" }}>Sign in</button></div></main>;
  if (user?.role !== "admin") return <main className="min-h-screen grid place-items-center px-5 text-center" style={{ background: "#050B1A", color: "white" }}><div className="max-w-xl rounded-3xl border p-8" style={{ borderColor: "rgba(255,184,0,0.3)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>ADMINISTRATOR ACCESS REQUIRED</div><h1 className="mt-4 text-3xl font-black">Creator review remains protected.</h1><p className="mt-4 text-sm" style={{ color: "#B8C7D6" }}>Use your Creator Operations workspace to upload and submit your own materials. Internal reviewer coordination is restricted to authorized administrators.</p><Link href="/creator-operations" className="mt-6 inline-block text-sm font-black" style={{ color: "#00D4FF" }}>Return to Creator Operations →</Link></div></main>;

  return (
    <DashboardLayout>
      <div className="min-h-full space-y-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <section className="rounded-3xl border p-7" style={{ borderColor: "rgba(185,140,255,0.3)", background: "radial-gradient(circle at 85% 0%, rgba(185,140,255,0.14), transparent 38%), #071126" }}>
          <div className="text-xs font-mono tracking-[0.2em]" style={{ color: "#B98CFF" }}>PROTECTED CREATOR OPERATIONS REVIEW</div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-black">Coordinate completeness.<br /><span style={{ color: "#B98CFF" }}>Do not overstate approval.</span></h1><p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>Assign an internal administrator, inspect the submitted record, and leave factual completeness feedback. This console does not grant legal clearance, platform acceptance, rights approval, payment activation, or commercial authorization.</p></div><div className="flex flex-wrap gap-3"><Link href="/owner-workstation" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.42)", color: "#D2B4FF" }}>Owner Workstation</Link><Link href="/creator-operations" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.42)", color: "#00D4FF" }}>Creator workspace</Link></div></div>
        </section>

        <section className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.05)" }}><div className="text-3xl font-black" style={{ color: "#00D4FF" }}>{assets.length}</div><div className="mt-1 text-xs font-mono" style={{ color: "#B8C7D6" }}>OPEN REVIEWABLE RECORDS</div></div><div className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,184,0,0.25)", background: "rgba(255,184,0,0.05)" }}><div className="text-3xl font-black" style={{ color: "#FFB800" }}>{assets.filter(asset => !asset.assignedReviewer).length}</div><div className="mt-1 text-xs font-mono" style={{ color: "#B8C7D6" }}>UNASSIGNED</div></div><div className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.05)" }}><div className="text-3xl font-black" style={{ color: "#00FF88" }}>{assets.filter(asset => Boolean(asset.assetUrl)).length}</div><div className="mt-1 text-xs font-mono" style={{ color: "#B8C7D6" }}>PRIVATE FILES ATTACHED</div></div></section>

        <section className="space-y-4">{assets.length ? assets.map(asset => <article key={asset.id} className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(4,14,30,0.72)" }}><div className="flex flex-wrap justify-between gap-4"><div><div className="text-[10px] font-mono" style={{ color: "#00FF88" }}>{asset.assetKind.replaceAll("_", " ")} · OWNER: {asset.owner?.name ?? asset.owner?.email ?? "Private creator"}</div><h2 className="mt-2 text-xl font-black">{asset.title}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{asset.description}</p></div><StatusPill status={asset.reviewStatus} /></div>{asset.sourceReference ? <p className="mt-4 text-xs" style={{ color: "#A9B9C9" }}>Source reference: {asset.sourceReference}</p> : null}{asset.assetUrl ? <a href={asset.assetUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black" style={{ color: "#00D4FF" }}>Open protected file: {asset.originalFileName ?? "release asset"}{asset.byteSize ? ` · ${(asset.byteSize / 1024).toFixed(1)} KB` : ""} →</a> : <p className="mt-4 text-xs" style={{ color: "#FFB800" }}>No file attached to this record.</p>}<div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]"><select value={reviewerSelections[asset.id] ?? String(asset.assignedReviewer?.id ?? "")} onChange={event => setReviewerSelections(current => ({ ...current, [asset.id]: event.target.value }))} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}><option value="">Select internal reviewer</option>{reviewerOptions.map(reviewer => <option key={reviewer.id} value={reviewer.id}>{reviewer.name ?? reviewer.email ?? `Admin ${reviewer.id}`}</option>)}</select><button type="button" onClick={() => assignReviewer(asset)} disabled={busy} className="rounded-xl px-4 py-2 text-sm font-black disabled:opacity-50" style={{ background: "#B98CFF", color: "#050B1A" }}>{assign.isPending ? "Assigning…" : asset.assignedReviewer ? "Reassign reviewer" : "Assign reviewer"}</button></div>{asset.assignedReviewer ? <p className="mt-3 text-xs" style={{ color: "#B98CFF" }}>Assigned internal reviewer: {asset.assignedReviewer.name ?? asset.assignedReviewer.email ?? `Admin ${asset.assignedReviewer.id}`}</p> : null}<div className="mt-5"><label className="text-[10px] font-mono uppercase" style={{ color: "#FFB800" }}>Factual completeness note</label><textarea value={notes[asset.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [asset.id]: event.target.value }))} maxLength={1500} placeholder="Describe what is present, missing, or excluded. Do not make legal, platform, or commercial claims." className="mt-2 min-h-24 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.15)" }} /><div className="mt-3 flex flex-wrap gap-2">{DECISIONS.map(decision => <button key={decision} type="button" onClick={() => recordDecision(asset, decision)} disabled={busy || asset.assignedReviewer?.id !== user.id} className="rounded-lg border px-3 py-2 text-xs font-black disabled:opacity-40" style={{ borderColor: `${statusColor(decision)}55`, color: statusColor(decision) }}>{decision.replaceAll("_", " ")}</button>)}</div></div>{asset.events.length ? <div className="mt-5 rounded-xl border p-3" style={{ borderColor: "rgba(255,255,255,0.09)" }}><div className="text-[10px] font-mono" style={{ color: "#A9B9C9" }}>LATEST INTERNAL EVENT</div><p className="mt-2 text-xs" style={{ color: "#C1D0DE" }}>{asset.events[0]?.note}</p></div> : null}</article>) : <div className="rounded-3xl border p-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.12)", color: "#A9B9C9" }}>No submitted release-material records are awaiting protected completeness feedback.</div>}</section>
      </div>
    </DashboardLayout>
  );
}
