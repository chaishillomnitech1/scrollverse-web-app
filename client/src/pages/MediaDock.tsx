import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const MEDIA_KINDS = ["IMAGE", "AUDIO", "VIDEO", "DOCUMENT", "OTHER"] as const;
const VISIBILITY = ["PRIVATE", "THINK_SPACE_DRAFT", "PUBLIC_PENDING_REVIEW"] as const;
const SUPPORTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "video/mp4", "video/webm", "video/quicktime", "application/pdf", "text/plain"] as const;
type SupportedMimeType = (typeof SUPPORTED_MIME_TYPES)[number];

type MediaEntry = {
  id: number;
  title: string;
  mediaKind: string;
  visibility: string;
  originalFileName: string | null;
  assetUrl: string | null;
  byteSize: number | null;
  distributionStatus: string;
  updatedAt: Date | string;
};

function formatBytes(size: number | null) {
  if (!size) return "File not staged";
  return `${(size / 1024 / 1024).toFixed(size > 1024 * 1024 ? 1 : 2)} MB`;
}

function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The selected file could not be read."));
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result.split(",")[1] ?? reader.result) : reject(new Error("The selected file could not be read."));
    reader.readAsDataURL(file);
  });
}

function detectMime(file: File): SupportedMimeType | null {
  const mime = file.type;
  return SUPPORTED_MIME_TYPES.includes(mime as SupportedMimeType) ? mime as SupportedMimeType : null;
}

export default function MediaDock() {
  useSovereignHeartbeat({ page: "media-dock" });
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const media = trpc.mediaIntake.getMyMedia.useQuery(undefined, { enabled: isAuthenticated });
  const createRecord = trpc.mediaIntake.createRecord.useMutation();
  const uploadFile = trpc.mediaIntake.uploadFile.useMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<(typeof MEDIA_KINDS)[number]>("IMAGE");
  const [visibility, setVisibility] = useState<(typeof VISIBILITY)[number]>("PRIVATE");
  const [provenance, setProvenance] = useState("");
  const [attested, setAttested] = useState(false);
  const [files, setFiles] = useState<Record<number, File | null>>({});

  const refresh = () => utils.mediaIntake.getMyMedia.invalidate();
  const busy = createRecord.isPending || uploadFile.isPending;
  const entries = (media.data ?? []) as MediaEntry[];

  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createRecord.mutateAsync({ title, description, mediaKind: kind, visibility, provenanceNote: provenance || null, consentAttestation: attested });
      toast.success("Creator-media record staged privately.");
      setTitle(""); setDescription(""); setProvenance(""); setAttested(false); setVisibility("PRIVATE");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Media record could not be created.");
    }
  };

  const upload = async (entry: MediaEntry) => {
    const file = files[entry.id];
    if (!file) { toast.error("Choose a file first."); return; }
    if (file.size > 12 * 1024 * 1024) { toast.error("For secure staging, choose a file no larger than 12 MB."); return; }
    const mimeType = detectMime(file);
    if (!mimeType) { toast.error("Use a supported image, audio, video, PDF, or text file."); return; }
    try {
      await uploadFile.mutateAsync({ id: entry.id, originalFileName: file.name, mimeType, base64Data: await readFileAsBase64(file) });
      toast.success("File staged in Creator Media Dock.");
      setFiles(current => ({ ...current, [entry.id]: null }));
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "File could not be staged.");
    }
  };

  if (loading) return <main className="min-h-screen" style={{ background: "#050B1A" }} />;
  if (!isAuthenticated) return <main className="min-h-screen px-5 py-28 text-white" style={{ background: "radial-gradient(circle at 76% 7%, rgba(0,212,255,0.14), transparent 30%), #050B1A" }}><div className="mx-auto max-w-3xl rounded-[2rem] border p-8" style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(4,14,30,0.8)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>CREATOR MEDIA DOCK</div><h1 className="mt-4 text-4xl font-black">Stage your work before you share it.</h1><p className="mt-5 max-w-2xl leading-relaxed" style={{ color: "#C8D8E7" }}>Sign in to securely stage supported images, audio, video, documents, and other creator materials with a consent and provenance record. Staging is private and does not publish, license, distribute, or claim rights.</p><button onClick={() => { window.location.href = getLoginUrl(); }} className="mt-7 rounded-xl px-5 py-3 font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in to use Media Dock</button><div className="mt-7 flex flex-wrap gap-3"><Link href="/think-space" className="text-sm font-bold" style={{ color: "#FFB800" }}>Think Space →</Link><Link href="/signalworks" className="text-sm font-bold" style={{ color: "#00FF88" }}>Signalworks →</Link><Link href="/specialist-constellation" className="text-sm font-bold" style={{ color: "#B98CFF" }}>Specialist Constellation →</Link></div></div></main>;

  return <main className="min-h-screen pb-20 text-white" style={{ background: "radial-gradient(circle at 90% 2%, rgba(0,212,255,0.16), transparent 28%), radial-gradient(circle at 4% 52%, rgba(185,140,255,0.13), transparent 35%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}><section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)" }}><div className="mx-auto max-w-7xl px-5 pb-14 pt-28"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/think-space" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← THINK SPACE</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88" }}>PRIVATE STAGING · CONSENT + PROVENANCE</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"><div><div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#B98CFF" }}>CREATOR-OWNED MEDIA INTAKE</div><h1 className="mt-5 text-5xl font-black leading-[0.9] sm:text-7xl">Make the record.<br /><span style={{ color: "#00D4FF" }}>Choose the next route.</span></h1><p className="mt-6 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>Media Dock accepts creator-selected images, audio, video, PDFs, and text materials up to 12 MB for secure staging. Every record keeps a clear visibility choice, consent attestation, provenance note, and external-distribution boundary.</p></div><aside className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(255,184,0,0.32)", background: "rgba(255,184,0,0.045)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>WHAT STAGING MEANS</div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#D8E3EF" }}>Files are held in your creator record. A staged file is not automatically public, approved, licensed, placed on a platform, or sent to a distributor. You choose whether to create a Think Space draft or pursue a separate creator-provided handoff.</p></aside></div></div></section><section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.88fr_1.12fr]"><form onSubmit={create} className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(4,14,30,0.72)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>01 · CREATE A MEDIA RECORD</div><input value={title} onChange={event => setTitle(event.target.value)} required minLength={3} maxLength={180} placeholder="Title" className="mt-5 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "white" }} /><textarea value={description} onChange={event => setDescription(event.target.value)} required minLength={10} maxLength={2000} rows={4} placeholder="What is this work, and what should a reviewer or future you know about it?" className="mt-3 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "white" }} /><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-xs" style={{ color: "#AEBFD0" }}>Media type<select value={kind} onChange={event => setKind(event.target.value as (typeof MEDIA_KINDS)[number])} className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm" style={{ background: "#071426", borderColor: "rgba(255,255,255,0.12)", color: "white" }}>{MEDIA_KINDS.map(item => <option key={item} value={item}>{item}</option>)}</select></label><label className="text-xs" style={{ color: "#AEBFD0" }}>Visibility<select value={visibility} onChange={event => setVisibility(event.target.value as (typeof VISIBILITY)[number])} className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm" style={{ background: "#071426", borderColor: "rgba(255,255,255,0.12)", color: "white" }}>{VISIBILITY.map(item => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label></div><textarea value={provenance} onChange={event => setProvenance(event.target.value)} rows={3} maxLength={2000} placeholder="Optional provenance note: your source, creation date, permission, or collaboration context" className="mt-3 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "white" }} /><label className="mt-4 flex items-start gap-3 text-xs leading-relaxed" style={{ color: "#C8D8E7" }}><input type="checkbox" checked={attested} onChange={event => setAttested(event.target.checked)} className="mt-0.5" />I own or have permission to stage this work. It does not contain credentials, government IDs, private health records, or emergency information.</label><button disabled={busy || !attested} className="mt-5 w-full rounded-xl py-3 text-sm font-black disabled:opacity-40" style={{ background: "#00D4FF", color: "#050B1A" }}>{createRecord.isPending ? "Creating record…" : "Create private media record"}</button></form><div><div className="flex items-end justify-between gap-4"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>02 · STAGE A FILE</div><h2 className="mt-2 text-2xl font-black">Your creator-media records</h2></div><span className="text-xs" style={{ color: "#AEBFD0" }}>{entries.length} record{entries.length === 1 ? "" : "s"}</span></div><div className="mt-5 space-y-4">{entries.length === 0 ? <div className="rounded-3xl border border-dashed p-7" style={{ borderColor: "rgba(0,255,136,0.28)", color: "#AEBFD0" }}>Create your first media record, then choose a supported file to stage. Nothing is public by default.</div> : entries.map(entry => <article key={entry.id} className="rounded-3xl border p-5" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(4,14,30,0.65)" }}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[10px] font-mono tracking-widest" style={{ color: "#B98CFF" }}>{entry.mediaKind} · {entry.visibility.replaceAll("_", " ")}</div><h3 className="mt-2 text-lg font-black">{entry.title}</h3><p className="mt-1 text-xs" style={{ color: "#AEBFD0" }}>{entry.originalFileName ?? "No file selected yet"} · {formatBytes(entry.byteSize)} · {entry.distributionStatus.replaceAll("_", " ")}</p></div>{entry.assetUrl ? <a href={entry.assetUrl} target="_blank" rel="noreferrer" className="rounded-xl border px-3 py-2 text-xs font-black" style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88" }}>Open staged file ↗</a> : null}</div>{!entry.assetUrl ? <div className="mt-4 flex flex-col gap-3 sm:flex-row"><input type="file" onChange={event => setFiles(current => ({ ...current, [entry.id]: event.target.files?.[0] ?? null }))} accept="image/jpeg,image/png,image/webp,image/gif,audio/mpeg,audio/wav,audio/ogg,audio/mp4,video/mp4,video/webm,video/quicktime,application/pdf,text/plain" className="min-w-0 flex-1 text-xs" /><button onClick={() => upload(entry)} disabled={busy || !files[entry.id]} className="rounded-xl px-4 py-2.5 text-xs font-black disabled:opacity-40" style={{ background: "#00FF88", color: "#050B1A" }}>{uploadFile.isPending ? "Staging…" : "Stage file"}</button></div> : <p className="mt-4 text-xs leading-relaxed" style={{ color: "#C8D8E7" }}>Next path: create a separately reviewed Think Space draft, preserve it in Creator Operations, or use a creator-provided distribution handoff. No external placement happens automatically.</p>}</article>)}</div></div></section><section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}><div className="mx-auto max-w-7xl px-5 py-12"><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>KEEP THE ROUTES CLEAR</div><div className="mt-5 grid gap-4 md:grid-cols-3"><Link href="/think-space" className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,184,0,0.32)" }}><h3 className="font-black" style={{ color: "#FFB800" }}>Think Space</h3><p className="mt-2 text-sm" style={{ color: "#C8D8E7" }}>Share text and verified links in the public conversation layer.</p></Link><Link href="/creator-operations" className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,212,255,0.32)" }}><h3 className="font-black" style={{ color: "#00D4FF" }}>Creator Operations</h3><p className="mt-2 text-sm" style={{ color: "#C8D8E7" }}>Prepare release records, support requests, provenance, and reviewer-ready materials.</p></Link><Link href="/signalworks" className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.32)" }}><h3 className="font-black" style={{ color: "#00FF88" }}>Signalworks</h3><p className="mt-2 text-sm" style={{ color: "#C8D8E7" }}>Use creator-provided official channel handoffs when you choose to distribute externally.</p></Link></div></div></section></main>;
}
