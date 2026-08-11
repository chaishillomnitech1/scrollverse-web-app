import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";
import type { CatalogAssetAuditEvent, CatalogAssetRecord } from "../../../drizzle/schema";

const SKU_OPTIONS = [
  "XLVIII-ATL-POSEIDON-01", "XLVIII-ATL-NEPTUNE-02", "XLVIII-ATL-TRIDENT-03",
  "XLVIII-ATL-MARIANA-04", "XLVIII-ATL-OCEANIC-05", "XLVIII-ATL-ABYSSAL-06", "XLVIII-ATL-METATRON-07",
] as const;

type RightsStatus = "UNVERIFIED" | "OWNER_ATTESTED" | "LICENSED" | "REJECTED";
type ReviewStatus = "APPROVED" | "REJECTED";
type Reviewer = { id: number; name: string | null; email: string | null };
type EvidenceQueueItem = { id: number; sku: string; assetKind: string; evidenceState: string };

function colorFor(status?: string) {
  if (status === "APPROVED" || status === "LICENSED" || status === "CURRENT") return "#00FF88";
  if (status === "REJECTED" || status === "EXPIRED") return "#FF5D5D";
  if (status === "OWNER_ATTESTED" || status === "DUE_SOON") return "#00D4FF";
  return "#FFB800";
}

function Pill({ value }: { value: string }) {
  const color = colorFor(value);
  return <span className="rounded-full px-2 py-1 text-[10px] font-mono font-bold" style={{ color, background: `${color}12`, border: `1px solid ${color}38` }}>{value.replaceAll("_", " ")}</span>;
}

function toDateInput(value: Date | null | undefined) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

export default function AdminFashionReview() {
  useSovereignHeartbeat({ page: "admin-fashion-review" });
  const { user, loading, isAuthenticated } = useAuth();
  const [sku, setSku] = useState<(typeof SKU_OPTIONS)[number]>(SKU_OPTIONS[0]);
  const [assetKind, setAssetKind] = useState<"HERO" | "DETAIL" | "ON_BODY">("HERO");
  const [sourceReference, setSourceReference] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [rights, setRights] = useState<Record<number, RightsStatus>>({});
  const [decisions, setDecisions] = useState<Record<number, ReviewStatus>>({});
  const [evidenceFiles, setEvidenceFiles] = useState<Record<number, File | null>>({});
  const [reviewerAssignments, setReviewerAssignments] = useState<Record<number, string>>({});
  const [expiryDates, setExpiryDates] = useState<Record<number, string>>({});

  const operations = trpc.atlantisCatalog.getOperations.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const evidenceQueue = trpc.atlantisCatalog.getEvidenceQueue.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const upload = trpc.atlantisCatalog.uploadAsset.useMutation();
  const uploadEvidence = trpc.atlantisCatalog.uploadAssetEvidence.useMutation();
  const updateGovernance = trpc.atlantisCatalog.updateAssetGovernance.useMutation();
  const review = trpc.atlantisCatalog.reviewAsset.useMutation();
  const addNote = trpc.atlantisCatalog.addAssetAuditNote.useMutation();
  const busy = upload.isPending || uploadEvidence.isPending || updateGovernance.isPending || review.isPending || addNote.isPending;

  const auditsByAsset = useMemo(() => {
    const entries = new Map<number, CatalogAssetAuditEvent[]>();
    for (const event of (operations.data?.auditEvents ?? []) as CatalogAssetAuditEvent[]) {
      const current = entries.get(event.assetId) ?? [];
      current.push(event);
      entries.set(event.assetId, current);
    }
    Array.from(entries.values()).forEach((list: CatalogAssetAuditEvent[]) => list.sort((a: CatalogAssetAuditEvent, b: CatalogAssetAuditEvent) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    return entries;
  }, [operations.data?.auditEvents]);

  const complete = async (run: () => Promise<unknown>, success: string) => {
    try {
      await run();
      toast.success(success);
      await Promise.all([operations.refetch(), evidenceQueue.refetch()]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Review action could not be completed.");
    }
  };

  const readFile = (file: File, onReady: (data: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onReady(String(reader.result));
    reader.onerror = () => toast.error("The selected file could not be read by the browser.");
    reader.readAsDataURL(file);
  };

  const submitUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return toast.error("Choose a browser-deliverable image before uploading.");
    const allowed = ["image/jpeg", "image/png", "image/webp"] as const;
    if (selectedFile.size > 8 * 1024 * 1024 || !allowed.includes(selectedFile.type as (typeof allowed)[number])) return toast.error("Use a JPEG, PNG, or WebP image smaller than 8 MB.");
    readFile(selectedFile, data => complete(() => upload.mutateAsync({ sku, assetKind, originalFileName: selectedFile.name, mimeType: selectedFile.type as (typeof allowed)[number], base64Data: data, sourceReference: sourceReference.trim() || null }), "Protected asset uploaded as pending source and rights review."));
  };

  const submitEvidence = (assetId: number) => {
    const evidenceFile = evidenceFiles[assetId];
    if (!evidenceFile) return toast.error("Choose a license or ownership evidence file first.");
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"] as const;
    if (evidenceFile.size > 8 * 1024 * 1024 || !allowed.includes(evidenceFile.type as (typeof allowed)[number])) return toast.error("Use a PDF, JPEG, PNG, or WebP evidence file smaller than 8 MB.");
    readFile(evidenceFile, data => complete(() => uploadEvidence.mutateAsync({ id: assetId, originalFileName: evidenceFile.name, mimeType: evidenceFile.type as (typeof allowed)[number], base64Data: data }), "Evidence document attached to protected asset review."));
  };

  const saveGovernance = (asset: CatalogAssetRecord) => {
    const reviewerValue = reviewerAssignments[asset.id] ?? String(asset.assignedReviewerUserId ?? "");
    const expiryValue = expiryDates[asset.id] ?? toDateInput(asset.evidenceExpiresAt);
    const evidenceExpiresAt = expiryValue ? new Date(`${expiryValue}T12:00:00.000Z`) : null;
    if (evidenceExpiresAt && (Number.isNaN(evidenceExpiresAt.getTime()) || evidenceExpiresAt <= new Date())) return toast.error("Evidence expiry must be a future date.");
    complete(() => updateGovernance.mutateAsync({ id: asset.id, assignedReviewerUserId: reviewerValue ? Number(reviewerValue) : null, evidenceExpiresAt }), "Reviewer assignment and evidence expiry recorded.");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A", color: "#8FA0B1" }}>Verifying review-console access…</div>;
  if (!isAuthenticated) return <main className="min-h-screen flex items-center justify-center px-5" style={{ background: "#050B1A", color: "white" }}><div className="max-w-md text-center"><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>FASHION ASSET REVIEW</div><h1 className="mt-3 text-3xl font-black">Sign in to open the protected review console.</h1><a href={getLoginUrl()} className="inline-block mt-6 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in</a></div></main>;
  if (user?.role !== "admin") return <main className="min-h-screen flex items-center justify-center px-5" style={{ background: "#050B1A", color: "white" }}><div className="max-w-md text-center"><div className="text-xs font-mono" style={{ color: "#FF5D5D" }}>ADMIN ACCESS REQUIRED</div><h1 className="mt-3 text-3xl font-black">Asset source and rights review is restricted to catalog administrators.</h1><Link href="/fashion-portfolio" className="inline-block mt-6 rounded-xl px-5 py-3 text-sm font-black border" style={{ color: "#00D4FF", borderColor: "rgba(0,212,255,0.3)" }}>Return to Fashion Portfolio</Link></div></main>;

  const assets = (operations.data?.assets ?? []) as CatalogAssetRecord[];
  const reviewers = (operations.data?.reviewers ?? []) as Reviewer[];
  const queueItems = (evidenceQueue.data?.items ?? []) as EvidenceQueueItem[];
  const counts = { total: assets.length, pending: assets.filter(asset => asset.reviewStatus === "PENDING").length, licensed: assets.filter(asset => asset.rightsStatus === "LICENSED").length, approved: assets.filter(asset => asset.reviewStatus === "APPROVED").length };

  return <main className="min-h-screen pb-20" style={{ background: "#050B1A", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
    <header className="border-b" style={{ borderColor: "rgba(255,107,53,.24)", background: "radial-gradient(circle at 15% 0%, rgba(255,107,53,.15), transparent 30%), #050B1A" }}><div className="max-w-7xl mx-auto px-5 py-12"><div className="flex flex-wrap items-center justify-between gap-4"><div className="text-xs font-mono tracking-widest" style={{ color: "#FF6B35" }}>ADMIN / FASHION / ASSET REVIEW CONSOLE</div><Link href="/admin/atlantis-catalog" className="rounded-xl px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(0,212,255,.3)", color: "#00D4FF" }}>Catalog operations</Link></div><h1 className="mt-5 text-4xl md:text-6xl font-black">Source. rights. <span style={{ color: "#FF6B35" }}>decision.</span></h1><p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#A5B7C6" }}>Link a browser-deliverable image to a real Atlantis SKU, attach license or ownership evidence, assign a reviewer, and preserve every decision in the audit timeline. Only licensed assets can be approved; approval also requires current evidence and a future expiry.</p></div></header>

    <section className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 lg:grid-cols-4 gap-3">{([{ label: "Stored assets", value: counts.total, color: "#00D4FF" }, { label: "Pending review", value: counts.pending, color: "#FFB800" }, { label: "Licensed records", value: counts.licensed, color: "#00FF88" }, { label: "Approved evidence", value: counts.approved, color: "#9E8CFF" }] as Array<{ label: string; value: number; color: string }>).map(({ label, value, color }) => <div key={label} className="rounded-2xl p-5 border" style={{ borderColor: `${color}35`, background: `${color}08` }}><div className="text-2xl font-black" style={{ color }}>{value}</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider" style={{ color: "#A5B7C6" }}>{label}</div></div>)}</section>

    <section className="max-w-7xl mx-auto px-5 pb-8"><div className="rounded-3xl p-5 border" style={{ borderColor: "rgba(255,184,0,.26)", background: "linear-gradient(90deg, rgba(255,184,0,.08), rgba(255,107,53,.04))" }}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>EVIDENCE DUE-SOON QUEUE</div><h2 className="mt-2 text-xl font-black">{queueItems.length} assets need a reviewer, document, or current expiry.</h2><p className="mt-2 text-xs" style={{ color: "#A5B7C6" }}>Admin-only governance queue. It cannot publish an asset or change commerce status.</p></div><span className="rounded-full px-3 py-2 text-xs font-mono" style={{ color: "#FFB800", background: "rgba(255,184,0,.12)" }}>30-DAY WINDOW</span></div><div className="mt-4 flex flex-wrap gap-2">{queueItems.slice(0, 8).map(item => <span key={item.id} className="rounded-xl px-3 py-2 text-xs border" style={{ color: "#E4EDF4", borderColor: "rgba(255,255,255,.12)", background: "rgba(5,11,26,.55)" }}>{item.sku} · {item.assetKind} · <strong style={{ color: colorFor(item.evidenceState) }}>{item.evidenceState.replaceAll("_", " ")}</strong></span>)}{queueItems.length > 8 && <span className="rounded-xl px-3 py-2 text-xs" style={{ color: "#A5B7C6" }}>+{queueItems.length - 8} more</span>}</div></div></section>

    <section className="max-w-7xl mx-auto px-5 grid xl:grid-cols-[.82fr_1.18fr] gap-6"><form onSubmit={submitUpload} className="rounded-3xl p-6 border h-fit" style={{ borderColor: "rgba(0,212,255,.22)", background: "#071120" }}><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>PROTECTED BROWSER UPLOAD</div><h2 className="mt-2 text-2xl font-black">Attach an image to an SKU.</h2><p className="mt-3 text-sm" style={{ color: "#A5B7C6" }}>New images start pending and unverified. Upload evidence and set its expiry before attempting approval.</p><div className="mt-5 grid gap-3"><select value={sku} onChange={event => setSku(event.target.value as (typeof SKU_OPTIONS)[number])} className="rounded-xl p-3 text-sm" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}>{SKU_OPTIONS.map(value => <option key={value} value={value}>{value}</option>)}</select><select value={assetKind} onChange={event => setAssetKind(event.target.value as "HERO" | "DETAIL" | "ON_BODY")} className="rounded-xl p-3 text-sm" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="HERO">Hero image</option><option value="DETAIL">Detail image</option><option value="ON_BODY">On-body image</option></select><input value={sourceReference} onChange={event => setSourceReference(event.target.value)} placeholder="Source / rights reference, license ID, or provenance note" className="rounded-xl p-3 text-sm outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><label className="rounded-xl p-5 border border-dashed cursor-pointer" style={{ borderColor: "rgba(0,212,255,.38)", color: "#00D4FF" }}><input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={event => setSelectedFile(event.currentTarget.files?.[0] ?? null)} /><div className="text-sm font-black">{selectedFile ? selectedFile.name : "Choose a browser-deliverable image file"}</div><div className="mt-1 text-[11px]" style={{ color: "#91A9B9" }}>JPEG, PNG, or WebP · maximum 8 MB · stored privately</div></label><button disabled={busy} className="rounded-xl p-3 text-sm font-black disabled:opacity-40" style={{ background: "#00D4FF", color: "#050B1A" }}>Upload as pending review</button></div></form>

      <div className="space-y-4">{assets.length === 0 && <div className="rounded-3xl p-10 text-center border" style={{ borderColor: "rgba(255,184,0,.24)", background: "rgba(255,184,0,.04)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>NO REVIEW-READY ASSETS</div><h2 className="mt-3 text-2xl font-black">Start with a cleared browser-deliverable image.</h2><p className="mt-3 text-sm" style={{ color: "#A5B7C6" }}>Candidate ledgers remain metadata-only until an administrator selects a real SKU and uploads a reviewable file here.</p></div>}
        {assets.map(asset => {
          const assetNotes = auditsByAsset.get(asset.id) ?? [];
          const selectedRights = rights[asset.id] ?? asset.rightsStatus;
          const selectedDecision = decisions[asset.id] ?? (asset.reviewStatus === "PENDING" ? "APPROVED" : asset.reviewStatus);
          const note = notes[asset.id] ?? "";
          const reviewerValue = reviewerAssignments[asset.id] ?? String(asset.assignedReviewerUserId ?? "");
          const expiryValue = expiryDates[asset.id] ?? toDateInput(asset.evidenceExpiresAt);
          return <article key={asset.id} className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,.12)", background: "#071120" }}><div className="grid md:grid-cols-[190px_1fr]"><div className="min-h-48 bg-[#020712] flex items-center justify-center overflow-hidden">{asset.assetUrl ? <img src={asset.assetUrl} alt={`${asset.sku} ${asset.assetKind} review candidate`} className="h-full w-full object-cover" /> : <span className="text-xs" style={{ color: "#94A8B9" }}>Asset unavailable</span>}</div><div className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>{asset.sku} · {asset.assetKind}</div><div className="mt-2 flex flex-wrap gap-2"><Pill value={asset.reviewStatus} /><Pill value={asset.rightsStatus} /></div></div><a href={asset.assetUrl} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "#00D4FF" }}>Open protected image</a></div><p className="mt-4 text-xs leading-relaxed" style={{ color: "#A5B7C6" }}><strong style={{ color: "white" }}>Source record:</strong> {asset.sourceReference || "No source reference recorded."}</p><p className="mt-2 text-[11px]" style={{ color: "#8193A3" }}>Uploaded {new Date(asset.createdAt).toLocaleString()} · protected storage key retained.</p></div></div>
            <div className="border-t p-5 space-y-4" style={{ borderColor: "rgba(255,255,255,.09)" }}><div className="grid lg:grid-cols-[1fr_1fr_auto] gap-3"><select value={reviewerValue} onChange={event => setReviewerAssignments(current => ({ ...current, [asset.id]: event.target.value }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="">Unassigned reviewer</option>{reviewers.map(reviewer => <option key={reviewer.id} value={reviewer.id}>{reviewer.name || reviewer.email || `Admin ${reviewer.id}`}</option>)}</select><input type="date" value={expiryValue} onChange={event => setExpiryDates(current => ({ ...current, [asset.id]: event.target.value }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><button disabled={busy} onClick={() => saveGovernance(asset)} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: "rgba(0,212,255,.18)", color: "#00D4FF" }}>Save governance</button></div>
              <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3 items-center rounded-2xl p-3" style={{ background: "rgba(255,184,0,.045)", border: "1px solid rgba(255,184,0,.15)" }}><label className="cursor-pointer text-xs" style={{ color: "#FFB800" }}><input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" className="sr-only" onChange={event => setEvidenceFiles(current => ({ ...current, [asset.id]: event.currentTarget.files?.[0] ?? null }))} /><span className="font-black">{evidenceFiles[asset.id]?.name || asset.evidenceDocumentUrl ? "Evidence document available" : "Choose license or ownership evidence"}</span><span className="block mt-1" style={{ color: "#A5B7C6" }}>PDF, JPEG, PNG, or WebP · maximum 8 MB</span></label>{asset.evidenceDocumentUrl && <a href={asset.evidenceDocumentUrl} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "#00D4FF" }}>Open evidence</a>}<button disabled={busy || !evidenceFiles[asset.id]} onClick={() => submitEvidence(asset.id)} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: "rgba(255,184,0,.2)", color: "#FFB800" }}>Attach evidence</button></div>
              <div className="grid lg:grid-cols-[150px_150px_1fr_auto] gap-3"><select value={selectedRights} onChange={event => setRights(current => ({ ...current, [asset.id]: event.target.value as RightsStatus }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="UNVERIFIED">Rights unverified</option><option value="OWNER_ATTESTED">Owner attested</option><option value="LICENSED">Licensed / cleared</option><option value="REJECTED">Rights rejected</option></select><select value={selectedDecision} onChange={event => setDecisions(current => ({ ...current, [asset.id]: event.target.value as ReviewStatus }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="APPROVED">Approve asset</option><option value="REJECTED">Reject asset</option></select><input value={note} onChange={event => setNotes(current => ({ ...current, [asset.id]: event.target.value }))} placeholder="Decision or audit note (minimum 3 characters)" className="rounded-xl p-3 text-xs outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><button disabled={busy || note.trim().length < 3} onClick={() => complete(() => review.mutateAsync({ id: asset.id, decision: selectedDecision, rightsStatus: selectedRights, reviewNotes: note.trim() }), selectedDecision === "APPROVED" ? "Asset approval recorded." : "Asset rejection recorded.")} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: selectedDecision === "APPROVED" ? "#00FF88" : "#FF5D5D", color: "#050B1A" }}>Record decision</button></div>
              <div className="flex gap-3"><input value={note} onChange={event => setNotes(current => ({ ...current, [asset.id]: event.target.value }))} placeholder="Add timeline note without changing status" className="flex-1 rounded-xl p-3 text-xs outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><button disabled={busy || note.trim().length < 3} onClick={() => complete(() => addNote.mutateAsync({ id: asset.id, note: note.trim() }), "Audit note appended to asset timeline.")} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: "rgba(158,140,255,.2)", color: "#C9BEFF" }}>Append note</button></div><div className="space-y-2">{assetNotes.length === 0 ? <div className="text-[11px]" style={{ color: "#8193A3" }}>No audit events yet.</div> : assetNotes.map(event => <div key={event.id} className="rounded-xl px-3 py-2 text-xs" style={{ background: "rgba(255,255,255,.035)", color: "#D4E1EB" }}><span className="font-mono" style={{ color: colorFor(event.action) }}>{event.action}</span><span style={{ color: "#8598AA" }}> · {new Date(event.createdAt).toLocaleString()} · </span>{event.note}</div>)}</div></div>
          </article>;
        })}</div></section>
  </main>;
}
