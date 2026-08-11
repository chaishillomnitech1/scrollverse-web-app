import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";
import type { CatalogAssetAuditEvent, CatalogAssetRecord } from "../../../drizzle/schema";

const SKU_OPTIONS = [
  "XLVIII-ATL-POSEIDON-01",
  "XLVIII-ATL-NEPTUNE-02",
  "XLVIII-ATL-TRIDENT-03",
  "XLVIII-ATL-MARIANA-04",
  "XLVIII-ATL-OCEANIC-05",
  "XLVIII-ATL-ABYSSAL-06",
  "XLVIII-ATL-METATRON-07",
] as const;

type RightsStatus = "UNVERIFIED" | "OWNER_ATTESTED" | "LICENSED" | "REJECTED";
type ReviewStatus = "APPROVED" | "REJECTED";

function colorFor(status?: string) {
  if (status === "APPROVED" || status === "LICENSED") return "#00FF88";
  if (status === "REJECTED") return "#FF5D5D";
  if (status === "OWNER_ATTESTED") return "#00D4FF";
  return "#FFB800";
}

function Pill({ value }: { value: string }) {
  const color = colorFor(value);
  return <span className="rounded-full px-2 py-1 text-[10px] font-mono font-bold" style={{ color, background: `${color}12`, border: `1px solid ${color}38` }}>{value.replaceAll("_", " ")}</span>;
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

  const operations = trpc.atlantisCatalog.getOperations.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const upload = trpc.atlantisCatalog.uploadAsset.useMutation();
  const review = trpc.atlantisCatalog.reviewAsset.useMutation();
  const addNote = trpc.atlantisCatalog.addAssetAuditNote.useMutation();
  const busy = upload.isPending || review.isPending || addNote.isPending;

  const auditsByAsset = useMemo(() => {
    const entries = new Map<number, CatalogAssetAuditEvent[]>();
    for (const event of (operations.data?.auditEvents ?? []) as CatalogAssetAuditEvent[]) {
      const current = entries.get(event.assetId) ?? [];
      current.push(event);
      entries.set(event.assetId, current);
    }
    Array.from(entries.values()).forEach(list => list.sort((a: CatalogAssetAuditEvent, b: CatalogAssetAuditEvent) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    return entries;
  }, [operations.data?.auditEvents]);

  const complete = async (run: () => Promise<unknown>, success: string) => {
    try {
      await run();
      toast.success(success);
      await operations.refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Review action could not be completed.");
    }
  };

  const submitUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return toast.error("Choose a browser-deliverable image before uploading.");
    if (selectedFile.size > 8 * 1024 * 1024) return toast.error("Use an image smaller than 8 MB.");
    const allowed = ["image/jpeg", "image/png", "image/webp"] as const;
    if (!allowed.includes(selectedFile.type as (typeof allowed)[number])) return toast.error("Use a JPEG, PNG, or WebP image.");
    const reader = new FileReader();
    reader.onload = () => complete(() => upload.mutateAsync({ sku, assetKind, originalFileName: selectedFile.name, mimeType: selectedFile.type as (typeof allowed)[number], base64Data: String(reader.result), sourceReference: sourceReference.trim() || null }), "Protected asset uploaded as pending source and rights review.");
    reader.onerror = () => toast.error("The selected file could not be read by the browser.");
    reader.readAsDataURL(selectedFile);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A", color: "#8FA0B1" }}>Verifying review-console access…</div>;
  if (!isAuthenticated) return <main className="min-h-screen flex items-center justify-center px-5" style={{ background: "#050B1A", color: "white" }}><div className="max-w-md text-center"><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>FASHION ASSET REVIEW</div><h1 className="mt-3 text-3xl font-black">Sign in to open the protected review console.</h1><a href={getLoginUrl()} className="inline-block mt-6 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in</a></div></main>;
  if (user?.role !== "admin") return <main className="min-h-screen flex items-center justify-center px-5" style={{ background: "#050B1A", color: "white" }}><div className="max-w-md text-center"><div className="text-xs font-mono" style={{ color: "#FF5D5D" }}>ADMIN ACCESS REQUIRED</div><h1 className="mt-3 text-3xl font-black">Asset source and rights review is restricted to catalog administrators.</h1><Link href="/fashion-portfolio" className="inline-block mt-6 rounded-xl px-5 py-3 text-sm font-black border" style={{ color: "#00D4FF", borderColor: "rgba(0,212,255,0.3)" }}>Return to Fashion Portfolio</Link></div></main>;

  const assets = (operations.data?.assets ?? []) as CatalogAssetRecord[];
  const counts = {
    total: assets.length,
    pending: assets.filter(asset => asset.reviewStatus === "PENDING").length,
    licensed: assets.filter(asset => asset.rightsStatus === "LICENSED").length,
    approved: assets.filter(asset => asset.reviewStatus === "APPROVED").length,
  };

  return <main className="min-h-screen pb-20" style={{ background: "#050B1A", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
    <header className="border-b" style={{ borderColor: "rgba(255,107,53,.24)", background: "radial-gradient(circle at 15% 0%, rgba(255,107,53,.15), transparent 30%), #050B1A" }}>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4"><div className="text-xs font-mono tracking-widest" style={{ color: "#FF6B35" }}>ADMIN / FASHION / ASSET REVIEW CONSOLE</div><Link href="/admin/atlantis-catalog" className="rounded-xl px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(0,212,255,.3)", color: "#00D4FF" }}>Catalog operations</Link></div>
        <h1 className="mt-5 text-4xl md:text-6xl font-black">Source. rights. <span style={{ color: "#FF6B35" }}>decision.</span></h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#A5B7C6" }}>Upload browser-deliverable evidence to a real Atlantis SKU, record a source reference, and append every approval, rejection, or note to the asset timeline. Only licensed assets can be approved; an approved asset is still only one requirement in the separate commerce gate.</p>
      </div>
    </header>

    <section className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {([{ label: "Stored assets", value: counts.total, color: "#00D4FF" }, { label: "Pending review", value: counts.pending, color: "#FFB800" }, { label: "Licensed records", value: counts.licensed, color: "#00FF88" }, { label: "Approved evidence", value: counts.approved, color: "#9E8CFF" }] as Array<{ label: string; value: number; color: string }>).map(({ label, value, color }) => <div key={label} className="rounded-2xl p-5 border" style={{ borderColor: `${color}35`, background: `${color}08` }}><div className="text-2xl font-black" style={{ color }}>{value}</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider" style={{ color: "#A5B7C6" }}>{label}</div></div>)}
    </section>

    <section className="max-w-7xl mx-auto px-5 grid xl:grid-cols-[.82fr_1.18fr] gap-6">
      <form onSubmit={submitUpload} className="rounded-3xl p-6 border h-fit" style={{ borderColor: "rgba(0,212,255,.22)", background: "#071120" }}>
        <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>PROTECTED BROWSER UPLOAD</div><h2 className="mt-2 text-2xl font-black">Attach cleared evidence to an SKU.</h2>
        <p className="mt-3 text-sm" style={{ color: "#A5B7C6" }}>New uploads always begin as pending and unverified. Use the review notes below to record license or ownership evidence before approval.</p>
        <div className="mt-5 grid gap-3">
          <select value={sku} onChange={event => setSku(event.target.value as (typeof SKU_OPTIONS)[number])} className="rounded-xl p-3 text-sm" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}>{SKU_OPTIONS.map(value => <option key={value} value={value}>{value}</option>)}</select>
          <select value={assetKind} onChange={event => setAssetKind(event.target.value as "HERO" | "DETAIL" | "ON_BODY")} className="rounded-xl p-3 text-sm" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="HERO">Hero image</option><option value="DETAIL">Detail image</option><option value="ON_BODY">On-body image</option></select>
          <input value={sourceReference} onChange={event => setSourceReference(event.target.value)} placeholder="Source / rights reference, license ID, or provenance note" className="rounded-xl p-3 text-sm outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} />
          <label className="rounded-xl p-5 border border-dashed cursor-pointer" style={{ borderColor: "rgba(0,212,255,.38)", color: "#00D4FF" }}><input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={event => setSelectedFile(event.currentTarget.files?.[0] ?? null)} /><div className="text-sm font-black">{selectedFile ? selectedFile.name : "Choose a cleared image file"}</div><div className="mt-1 text-[11px]" style={{ color: "#91A9B9" }}>JPEG, PNG, or WebP · maximum 8 MB · stored privately</div></label>
          <button disabled={busy} className="rounded-xl p-3 text-sm font-black disabled:opacity-40" style={{ background: "#00D4FF", color: "#050B1A" }}>Upload as pending review</button>
        </div>
      </form>

      <div className="space-y-4">
        {assets.length === 0 && <div className="rounded-3xl p-10 text-center border" style={{ borderColor: "rgba(255,184,0,.24)", background: "rgba(255,184,0,.04)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>NO REVIEW-READY ASSETS</div><h2 className="mt-3 text-2xl font-black">Start with a cleared browser-deliverable image.</h2><p className="mt-3 text-sm" style={{ color: "#A5B7C6" }}>The candidate ledgers remain metadata-only until an administrator selects a real SKU and uploads a reviewable file here.</p></div>}
        {assets.map(asset => {
          const assetNotes = auditsByAsset.get(asset.id) ?? [];
          const selectedRights = rights[asset.id] ?? asset.rightsStatus;
          const selectedDecision = decisions[asset.id] ?? (asset.reviewStatus === "PENDING" ? "APPROVED" : asset.reviewStatus);
          const note = notes[asset.id] ?? "";
          return <article key={asset.id} className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,.12)", background: "#071120" }}>
            <div className="grid md:grid-cols-[190px_1fr]"><div className="min-h-48 bg-[#020712] flex items-center justify-center overflow-hidden">{asset.assetUrl ? <img src={asset.assetUrl} alt={`${asset.sku} ${asset.assetKind} review candidate`} className="h-full w-full object-cover" /> : <span className="text-xs" style={{ color: "#94A8B9" }}>Asset unavailable</span>}</div><div className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>{asset.sku} · {asset.assetKind}</div><div className="mt-2 flex flex-wrap gap-2"><Pill value={asset.reviewStatus} /><Pill value={asset.rightsStatus} /></div></div><a href={asset.assetUrl} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "#00D4FF" }}>Open protected file</a></div><p className="mt-4 text-xs leading-relaxed" style={{ color: "#A5B7C6" }}><strong style={{ color: "white" }}>Source record:</strong> {asset.sourceReference || "No source reference recorded."}</p><p className="mt-2 text-[11px]" style={{ color: "#8193A3" }}>Uploaded {new Date(asset.createdAt).toLocaleString()} · file key retained in protected storage.</p></div></div>
            <div className="border-t p-5" style={{ borderColor: "rgba(255,255,255,.09)" }}><div className="grid lg:grid-cols-[150px_150px_1fr_auto] gap-3"><select value={selectedRights} onChange={event => setRights(current => ({ ...current, [asset.id]: event.target.value as RightsStatus }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="UNVERIFIED">Rights unverified</option><option value="OWNER_ATTESTED">Owner attested</option><option value="LICENSED">Licensed / cleared</option><option value="REJECTED">Rights rejected</option></select><select value={selectedDecision} onChange={event => setDecisions(current => ({ ...current, [asset.id]: event.target.value as ReviewStatus }))} className="rounded-xl p-3 text-xs" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }}><option value="APPROVED">Approve asset</option><option value="REJECTED">Reject asset</option></select><input value={note} onChange={event => setNotes(current => ({ ...current, [asset.id]: event.target.value }))} placeholder="Decision or audit note (minimum 3 characters)" className="rounded-xl p-3 text-xs outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><button disabled={busy || note.trim().length < 3} onClick={() => complete(() => review.mutateAsync({ id: asset.id, decision: selectedDecision, rightsStatus: selectedRights, reviewNotes: note.trim() }), selectedDecision === "APPROVED" ? "Asset approval recorded." : "Asset rejection recorded.")} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: selectedDecision === "APPROVED" ? "#00FF88" : "#FF5D5D", color: "#050B1A" }}>Record decision</button></div>
              <div className="mt-3 flex gap-3"><input value={note} onChange={event => setNotes(current => ({ ...current, [asset.id]: event.target.value }))} placeholder="Add timeline note without changing status" className="flex-1 rounded-xl p-3 text-xs outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,.12)", color: "white" }} /><button disabled={busy || note.trim().length < 3} onClick={() => complete(() => addNote.mutateAsync({ id: asset.id, note: note.trim() }), "Audit note appended to asset timeline.")} className="rounded-xl px-4 py-3 text-xs font-black disabled:opacity-40" style={{ background: "rgba(158,140,255,.2)", color: "#C9BEFF" }}>Append note</button></div>
              <div className="mt-4 space-y-2">{assetNotes.length === 0 ? <div className="text-[11px]" style={{ color: "#8193A3" }}>No audit events yet.</div> : assetNotes.map(event => <div key={event.id} className="rounded-xl px-3 py-2 text-xs" style={{ background: "rgba(255,255,255,.035)", color: "#D4E1EB" }}><span className="font-mono" style={{ color: colorFor(event.action) }}>{event.action}</span><span style={{ color: "#8598AA" }}> · {new Date(event.createdAt).toLocaleString()} · </span>{event.note}</div>)}</div>
            </div>
          </article>;
        })}
      </div>
    </section>
  </main>;
}
