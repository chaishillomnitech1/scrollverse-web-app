import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";
import { CREATOR_CHANNEL_HANDOFFS } from "@/data/creatorChannelHandoffs";
import { canSubmitReleaseAssetForFeedback } from "@shared/creatorOperationsPolicy";

const SUPPORT_CATEGORIES = ["ACCESS", "CREATOR_WORKSPACE", "RELEASE_PLANNING", "PROVENANCE", "OTHER"] as const;
const ASSET_KINDS = ["APP_ICON", "SCREENSHOT", "STORE_COPY", "PRIVACY_COPY", "RELEASE_NOTE", "SUPPORT_POLICY", "OTHER"] as const;

type SupportEvent = { note: string | null };
type SupportRequestEntry = {
  id: number;
  category: string;
  subject: string;
  details: string;
  status: string;
  events: SupportEvent[];
};
type ReleaseAssetEntry = {
  id: number;
  assetKind: string;
  title: string;
  description: string;
  reviewStatus: string;
  storageKey: string | null;
  assetUrl: string | null;
  originalFileName: string | null;
  mimeType: string | null;
  byteSize: number | null;
  assignedReviewerUserId: number | null;
  events: SupportEvent[];
};
type ProvenanceCandidate = { id: number; title: string; reviewStatus: string };
type BundleReadiness = { totalRecords: number; uploadedFiles: number; provenanceLinked: number; submittedForCompleteness: number; assignedToReviewer: number; boundary: string };

function statusColor(status: string) {
  if (["RESOLVED", "ACKNOWLEDGED"].includes(status)) return "#00FF88";
  if (["CLOSED", "EXCLUDED"].includes(status)) return "#FF7575";
  if (["AWAITING_CREATOR", "NEEDS_INFO"].includes(status)) return "#FFB800";
  return "#00D4FF";
}

function StatusPill({ status }: { status: string }) {
  const color = statusColor(status);
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px] font-mono font-bold"
      style={{ color, background: `${color}14`, border: `1px solid ${color}3d` }}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default function CreatorOperations() {
  useSovereignHeartbeat({ page: "creator-operations" });
  const { loading, isAuthenticated, user } = useAuth();
  const utils = trpc.useUtils();
  const operations = trpc.creatorOperations.getMyOperations.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const createSupport = trpc.creatorOperations.createSupportRequest.useMutation();
  const addSupportNote = trpc.creatorOperations.addSupportNote.useMutation();
  const createAsset = trpc.creatorOperations.createReleaseAsset.useMutation();
  const uploadAsset = trpc.creatorOperations.uploadReleaseAssetFile.useMutation();
  const submitAsset = trpc.creatorOperations.submitReleaseAsset.useMutation();

  const [category, setCategory] = useState<(typeof SUPPORT_CATEGORIES)[number]>("CREATOR_WORKSPACE");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [supportAttestation, setSupportAttestation] = useState(false);
  const [assetKind, setAssetKind] = useState<(typeof ASSET_KINDS)[number]>("SCREENSHOT");
  const [assetTitle, setAssetTitle] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [sourceReference, setSourceReference] = useState("");
  const [provenanceRecordId, setProvenanceRecordId] = useState("");
  const [assetAttestation, setAssetAttestation] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [assetFiles, setAssetFiles] = useState<Record<number, File | null>>({});

  const supportRequests = (operations.data?.supportRequests ?? []) as SupportRequestEntry[];
  const releaseAssets = (operations.data?.releaseAssets ?? []) as ReleaseAssetEntry[];
  const provenanceCandidates = (operations.data?.provenanceCandidates ?? []) as ProvenanceCandidate[];
  const bundleReadiness = operations.data?.bundleReadiness as BundleReadiness | undefined;
  const busy = createSupport.isPending || addSupportNote.isPending || createAsset.isPending || uploadAsset.isPending || submitAsset.isPending;

  const refresh = async () => {
    await utils.creatorOperations.getMyOperations.invalidate();
  };

  const signIn = () => {
    window.location.href = getLoginUrl();
  };

  const submitSupport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createSupport.mutateAsync({
        category,
        subject,
        details,
        requesterAttestation: supportAttestation,
      });
      toast.success("Private support request opened.");
      setSubject("");
      setDetails("");
      setSupportAttestation(false);
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Support request could not be opened.");
    }
  };

  const submitAssetRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createAsset.mutateAsync({
        assetKind,
        title: assetTitle,
        description: assetDescription,
        sourceReference: sourceReference || null,
        provenanceRecordId: provenanceRecordId ? Number(provenanceRecordId) : null,
        ownerAttestation: assetAttestation,
      });
      toast.success("Private release-material record created.");
      setAssetTitle("");
      setAssetDescription("");
      setSourceReference("");
      setProvenanceRecordId("");
      setAssetAttestation(false);
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Release-material record could not be created.");
    }
  };

  const addNote = async (requestId: number) => {
    const note = notes[requestId]?.trim();
    if (!note || note.length < 3) {
      toast.error("Add a short clarification first.");
      return;
    }
    try {
      await addSupportNote.mutateAsync({ id: requestId, note });
      setNotes(current => ({ ...current, [requestId]: "" }));
      toast.success("Private clarification added.");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Note could not be added.");
    }
  };

  const submitForFeedback = async (assetId: number) => {
    try {
      await submitAsset.mutateAsync({ id: assetId });
      toast.success("Release record submitted for protected completeness feedback.");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Record could not be submitted.");
    }
  };

  const readFileAsBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The selected file could not be read."));
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("The selected file could not be read."));
        return;
      }
      resolve(reader.result.split(",")[1] ?? reader.result);
    };
    reader.readAsDataURL(file);
  });

  const uploadAssetFile = async (assetId: number) => {
    const file = assetFiles[assetId];
    if (!file) {
      toast.error("Choose a PNG, JPEG, or WebP image first.");
      return;
    }
    if (!(["image/png", "image/jpeg", "image/webp"] as string[]).includes(file.type)) {
      toast.error("Use a PNG, JPEG, or WebP image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Release images must be 8 MB or smaller.");
      return;
    }
    try {
      const base64Data = await readFileAsBase64(file);
      await uploadAsset.mutateAsync({
        id: assetId,
        originalFileName: file.name,
        mimeType: file.type as "image/png" | "image/jpeg" | "image/webp",
        base64Data,
      });
      setAssetFiles(current => ({ ...current, [assetId]: null }));
      toast.success("Private release image uploaded. It is ready for your own provenance and completeness workflow.");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Release image could not be uploaded.");
    }
  };

  if (loading) {
    return <main className="min-h-screen grid place-items-center text-white" style={{ background: "#050B1A" }}><div className="font-mono text-sm" style={{ color: "#B98CFF" }}>LOADING CREATOR OPERATIONS…</div></main>;
  }

  if (!isAuthenticated) {
    return <main className="min-h-screen grid place-items-center px-5 text-white" style={{ background: "#050B1A" }}><section className="max-w-xl rounded-3xl border p-8 text-center" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(255,255,255,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>PRIVATE CREATOR OPERATIONS</div><h1 className="mt-4 text-3xl font-black">Keep support, release notes, and provenance handoffs together.</h1><p className="mt-4 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Sign in to open a private support request, prepare release-material records, and link only your own provenance notes. This space never asks for passwords, payment data, or identity documents.</p><button onClick={signIn} className="mt-7 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#B98CFF", color: "#050B1A" }}>Sign in to continue</button></section></main>;
  }

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(185,140,255,0.2)", background: "radial-gradient(circle at 86% 0%, rgba(185,140,255,0.18), transparent 32%), radial-gradient(circle at 12% 72%, rgba(0,212,255,0.12), transparent 38%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#B98CFF" }}>CREATOR OPERATIONS · PRIVATE INTAKE &amp; RELEASE MATERIALS</div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black leading-none sm:text-5xl">Prepare the release.<br /><span style={{ color: "#B98CFF" }}>Keep the record.</span></h1>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>Use this authenticated workspace to open private operational support requests and prepare release-material notes. Statuses show first-party workflow progress only; they are never legal clearance, platform approval, payment activation, or a promise of response timing.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-workspace" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}>Creator Workspace</Link>
              <Link href="/specialist-constellation" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88" }}>Specialist Team</Link>
              <Link href="/release-readiness" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.4)", color: "#FFB800" }}>Release Readiness</Link>
              {user?.role === "admin" ? <Link href="/admin/creator-operations" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.42)", color: "#B98CFF" }}>Operations review</Link> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid gap-7 px-5 py-12 lg:grid-cols-2">
        <form onSubmit={submitSupport} className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(185,140,255,0.035)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>MONITORED SUPPORT INTAKE</div>
          <h2 className="mt-3 text-2xl font-black">Open a focused operational request.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Use one request for one clear question about access, your creator workspace, release planning, or provenance. Do not include credentials, payment data, emergency details, or government IDs.</p>
          <div className="mt-6 grid gap-3">
            <select value={category} onChange={event => setCategory(event.target.value as (typeof SUPPORT_CATEGORIES)[number])} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{SUPPORT_CATEGORIES.map(item => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select>
            <input value={subject} onChange={event => setSubject(event.target.value)} required minLength={3} maxLength={180} placeholder="What do you need help with?" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} />
            <textarea value={details} onChange={event => setDetails(event.target.value)} required minLength={12} maxLength={2000} placeholder="Give only the context needed for an operations review." className="min-h-32 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} />
            <label className="flex items-start gap-3 text-xs" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={supportAttestation} onChange={event => setSupportAttestation(event.target.checked)} className="mt-0.5" />I confirm this request contains no credentials, payment data, government IDs, or emergency information.</label>
            <button disabled={busy} className="rounded-xl px-5 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#B98CFF", color: "#050B1A" }}>{createSupport.isPending ? "Opening…" : "Open private support request"}</button>
          </div>
        </form>

        <form onSubmit={submitAssetRecord} className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.03)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>RELEASE-MATERIAL RECORD</div>
          <h2 className="mt-3 text-2xl font-black">Prepare a reviewable release bundle.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Record what exists, its source context, and any related private provenance note. A submission receives completeness feedback only; it does not create a store listing or determine rights.</p>
          <div className="mt-6 grid gap-3">
            <select value={assetKind} onChange={event => setAssetKind(event.target.value as (typeof ASSET_KINDS)[number])} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{ASSET_KINDS.map(item => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select>
            <input value={assetTitle} onChange={event => setAssetTitle(event.target.value)} required minLength={3} maxLength={180} placeholder="Asset or copy title" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} />
            <textarea value={assetDescription} onChange={event => setAssetDescription(event.target.value)} required minLength={10} maxLength={2000} placeholder="What is this material, what is it for, and what still needs review?" className="min-h-28 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} />
            <input value={sourceReference} onChange={event => setSourceReference(event.target.value)} maxLength={2048} placeholder="Optional source reference or secure-record pointer" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} />
            <select value={provenanceRecordId} onChange={event => setProvenanceRecordId(event.target.value)} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}><option value="">No linked provenance record</option>{provenanceCandidates.map((record: ProvenanceCandidate) => <option key={record.id} value={record.id}>{record.title} · {record.reviewStatus.replaceAll("_", " ")}</option>)}</select>
            <label className="flex items-start gap-3 text-xs" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={assetAttestation} onChange={event => setAssetAttestation(event.target.checked)} className="mt-0.5" />I confirm this is an honest private release-material note and contains no sensitive credentials or private personal data.</label>
            <button disabled={busy} className="rounded-xl px-5 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#00FF88", color: "#050B1A" }}>{createAsset.isPending ? "Creating…" : "Create private release record"}</button>
          </div>
        </form>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-3">
        <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.26)", background: "linear-gradient(130deg, rgba(0,212,255,0.07), rgba(185,140,255,0.04))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>YOUR BUNDLE READINESS</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Records", bundleReadiness?.totalRecords ?? 0, "#B98CFF"],
              ["Files uploaded", bundleReadiness?.uploadedFiles ?? 0, "#00D4FF"],
              ["Provenance linked", bundleReadiness?.provenanceLinked ?? 0, "#00FF88"],
              ["Submitted", bundleReadiness?.submittedForCompleteness ?? 0, "#FFB800"],
              ["Reviewer assigned", bundleReadiness?.assignedToReviewer ?? 0, "#FF8BCB"],
            ].map(([label, value, color]) => (
              <div key={String(label)} className="rounded-2xl border p-4" style={{ borderColor: `${color}33`, background: "rgba(4,14,30,0.54)" }}>
                <div className="text-2xl font-black" style={{ color: String(color) }}>{value}</div>
                <div className="mt-1 text-[10px] font-mono uppercase" style={{ color: "#A9B9C9" }}>{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed" style={{ color: "#C1D0DE" }}>{bundleReadiness?.boundary}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid gap-7 px-5 py-3 lg:grid-cols-2">
        <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.24)", background: "rgba(4,14,30,0.7)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>YOUR SUPPORT THREADS</div>
          <h2 className="mt-3 text-2xl font-black">Clear status, private context.</h2>
          <div className="mt-6 space-y-4">{supportRequests.length ? supportRequests.map((request: SupportRequestEntry) => <article key={request.id} className="rounded-2xl border p-4" style={{ borderColor: "rgba(185,140,255,0.18)" }}><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-black">{request.subject}</h3><p className="mt-1 text-[10px] font-mono" style={{ color: "#B98CFF" }}>{request.category.replaceAll("_", " ")}</p></div><StatusPill status={request.status} /></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{request.details}</p>{request.events.length ? <p className="mt-3 text-xs" style={{ color: "#A9B9C9" }}>Latest update: {request.events[0]?.note}</p> : null}{request.status !== "CLOSED" ? <div className="mt-4 flex gap-2"><input value={notes[request.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [request.id]: event.target.value }))} maxLength={1500} placeholder="Add a private clarification" className="min-w-0 flex-1 rounded-lg border bg-transparent px-3 py-2 text-xs outline-none" style={{ borderColor: "rgba(255,255,255,0.14)" }} /><button type="button" onClick={() => addNote(request.id)} disabled={busy} className="rounded-lg px-3 py-2 text-xs font-black disabled:opacity-60" style={{ background: "#B98CFF", color: "#050B1A" }}>Add note</button></div> : null}</article>) : <p className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>No support requests yet. Open a focused request when you need an operational handoff.</p>}</div>
        </section>

        <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.23)", background: "rgba(4,14,30,0.7)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>YOUR RELEASE MATERIALS</div>
          <h2 className="mt-3 text-2xl font-black">Submit only when the record is ready.</h2>
          <div className="mt-6 space-y-4">
            {releaseAssets.length ? releaseAssets.map((asset: ReleaseAssetEntry) => {
              const acceptsImage = ["APP_ICON", "SCREENSHOT", "OTHER"].includes(asset.assetKind);
              return (
                <article key={asset.id} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,255,136,0.18)" }}>
                  <div className="flex flex-wrap justify-between gap-3">
                    <div><h3 className="font-black">{asset.title}</h3><p className="mt-1 text-[10px] font-mono" style={{ color: "#00FF88" }}>{asset.assetKind.replaceAll("_", " ")}</p></div>
                    <StatusPill status={asset.reviewStatus} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{asset.description}</p>
                  {asset.assetUrl ? <a href={asset.assetUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-black" style={{ color: "#00D4FF" }}>Open private file: {asset.originalFileName ?? "release material"} →</a> : null}
                  {acceptsImage ? (
                    <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "rgba(0,212,255,0.18)", background: "rgba(0,212,255,0.035)" }}>
                      <label className="block text-[10px] font-mono uppercase" style={{ color: "#00D4FF" }}>Private image intake · PNG, JPEG, or WebP · 8 MB maximum</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => setAssetFiles(current => ({ ...current, [asset.id]: event.target.files?.[0] ?? null }))} className="max-w-full text-xs" />
                        <button type="button" onClick={() => uploadAssetFile(asset.id)} disabled={busy || !assetFiles[asset.id]} className="rounded-lg px-3 py-2 text-xs font-black disabled:opacity-50" style={{ background: "#00D4FF", color: "#050B1A" }}>{uploadAsset.isPending ? "Uploading…" : asset.assetUrl ? "Replace private file" : "Upload private file"}</button>
                      </div>
                    </div>
                  ) : null}
                  {asset.events.length ? <p className="mt-3 text-xs" style={{ color: "#A9B9C9" }}>Latest update: {asset.events[0]?.note}</p> : null}
                  {canSubmitReleaseAssetForFeedback(asset.reviewStatus) ? <button type="button" onClick={() => submitForFeedback(asset.id)} disabled={busy} className="mt-4 text-xs font-black disabled:opacity-60" style={{ color: "#00FF88" }}>Submit for completeness feedback →</button> : null}
                </article>
              );
            }) : <p className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>No release-material records yet. Start with one asset, one source note, and one honest attestation.</p>}
          </div>
        </section>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="rounded-3xl border p-7" style={{ borderColor: "rgba(255,184,0,0.28)", background: "linear-gradient(130deg, rgba(255,184,0,0.09), rgba(0,212,255,0.035))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>CREATOR-PROVIDED CHANNEL HANDOFFS</div>
          <h2 className="mt-3 text-3xl font-black">Keep your public destinations within reach.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>These links were supplied by the ScrollVerse creator. They remain external destinations with their own access and policy rules; this workspace does not manage any of the associated accounts.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{CREATOR_CHANNEL_HANDOFFS.map(channel => <a key={channel.url} href={channel.url} target="_blank" rel="noreferrer" className="rounded-2xl border p-4 transition-transform hover:-translate-y-0.5" style={{ borderColor: `${channel.color}38`, background: "rgba(4,14,30,0.5)" }}><div className="text-lg" style={{ color: channel.color }}>{channel.icon}</div><h3 className="mt-3 text-sm font-black">{channel.title}</h3><p className="mt-2 text-[10px] font-mono" style={{ color: channel.color }}>{channel.lane.toUpperCase()}</p></a>)}</div>
        </div>
      </section>
    </main>
  );
}
