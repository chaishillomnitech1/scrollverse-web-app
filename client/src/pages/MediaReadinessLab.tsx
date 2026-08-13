import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type MediaFacts = {
  fileName: string;
  mimeType: string;
  byteSize: number;
  sha256: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  inspectedAt: string;
};

const TARGETS = ["FIRST_PARTY_RECORD", "YOUTUBE_PREP", "SPOTIFY_PREP", "APPLE_MUSIC_PREP", "LIVE_STREAM_PREP"] as const;

const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(bytes >= 1024 * 1024 ? 1 : 2)} MB`;
const formatDuration = (seconds?: number) => seconds === undefined ? "Not available" : `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

async function sha256(file: File) {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function readVisualFacts(file: File, objectUrl: string): Promise<Pick<MediaFacts, "width" | "height" | "durationSeconds">> {
  return new Promise(resolve => {
    if (file.type.startsWith("image/")) {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => resolve({});
      image.src = objectUrl;
      return;
    }
    if (file.type.startsWith("video/") || file.type.startsWith("audio/")) {
      const media = document.createElement(file.type.startsWith("video/") ? "video" : "audio");
      media.preload = "metadata";
      media.onloadedmetadata = () => resolve({ width: media instanceof HTMLVideoElement ? media.videoWidth : undefined, height: media instanceof HTMLVideoElement ? media.videoHeight : undefined, durationSeconds: Number.isFinite(media.duration) ? media.duration : undefined });
      media.onerror = () => resolve({});
      media.src = objectUrl;
      return;
    }
    resolve({});
  });
}

export default function MediaReadinessLab() {
  useSovereignHeartbeat({ page: "media-readiness-lab" });
  const [file, setFile] = useState<File | null>(null);
  const [facts, setFacts] = useState<MediaFacts | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inspecting, setInspecting] = useState(false);
  const [target, setTarget] = useState<(typeof TARGETS)[number]>("FIRST_PARTY_RECORD");
  const [rightsChecked, setRightsChecked] = useState(false);
  const [metadataChecked, setMetadataChecked] = useState(false);
  const [provenanceChecked, setProvenanceChecked] = useState(false);
  const [accessibilityChecked, setAccessibilityChecked] = useState(false);
  const [aiDisclosure, setAiDisclosure] = useState("NOT_REVIEWED");
  const [notes, setNotes] = useState("");

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    if (!next) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const objectUrl = URL.createObjectURL(next);
    setFile(next); setPreviewUrl(objectUrl); setFacts(null); setInspecting(true);
    try {
      const [hash, visual] = await Promise.all([sha256(next), readVisualFacts(next, objectUrl)]);
      setFacts({ fileName: next.name, mimeType: next.type || "application/octet-stream", byteSize: next.size, sha256: hash, inspectedAt: new Date().toISOString(), ...visual });
      toast.success("Local media facts inspected. No file was uploaded.");
    } catch { toast.error("The selected file could not be inspected locally."); }
    finally { setInspecting(false); }
  };

  const checks = useMemo(() => {
    if (!file || !facts) return [];
    const video = file.type.startsWith("video/");
    const audio = file.type.startsWith("audio/");
    const image = file.type.startsWith("image/");
    return [
      { label: "Integrity record", ok: facts.sha256.length === 64, detail: "SHA-256 generated locally for this selected file." },
      { label: "Video wrapper readiness", ok: !video || file.type === "video/mp4", detail: video ? (file.type === "video/mp4" ? "MP4 wrapper detected; codec and bitrate still need mastering/export verification." : "YouTube guidance identifies MP4/H.264 as a recommended path; this file needs a provider-targeted export review.") : "Not a video asset." },
      { label: "Audio master readiness", ok: !audio || ["audio/flac", "audio/wav", "audio/x-wav"].includes(file.type), detail: audio ? (["audio/flac", "audio/wav", "audio/x-wav"].includes(file.type) ? "Lossless-master candidate detected; sample rate, bit depth, and stereo channels require mastering-software confirmation." : "A delivery-safe master may require a native FLAC or qualifying WAV; this browser cannot inspect sample rate or bit depth.") : "Not an audio asset." },
      { label: "Visual asset facts", ok: !image || Boolean(facts.width && facts.height), detail: image ? `${facts.width ?? "?"} × ${facts.height ?? "?"} pixels detected locally.` : "Not an image asset." },
      { label: "Rights and credits", ok: rightsChecked && metadataChecked, detail: "Creator confirms that rights/permissions and public-facing credits/metadata were reviewed." },
      { label: "Provenance and accessibility", ok: provenanceChecked && accessibilityChecked, detail: "Creator confirms provenance context plus captions, lyrics, or alt-text readiness as applicable." },
      { label: "AI transparency review", ok: aiDisclosure !== "NOT_REVIEWED", detail: "Record whether material AI generation was reviewed for the selected release path; this is a disclosure record, not an external provider decision." },
    ];
  }, [accessibilityChecked, aiDisclosure, facts, file, metadataChecked, provenanceChecked, rightsChecked]);

  const readiness = checks.length ? Math.round((checks.filter(check => check.ok).length / checks.length) * 100) : 0;
  const exportPackage = () => {
    if (!facts) return;
    const record = { format: "scrollverse-provider-preparation/v1", target, facts, review: { rightsChecked, metadataChecked, provenanceChecked, accessibilityChecked, aiDisclosure, notes }, readinessPercent: readiness, boundary: "This locally exported preparation record does not upload media, grant rights, create a distributor delivery, publish a release, start a stream, or connect an external provider account." };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${facts.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}.scrollverse-release-readiness.json`; anchor.click(); URL.revokeObjectURL(url);
    localStorage.setItem("scrollverse-media-readiness-last", JSON.stringify(record));
    toast.success("Local provider-preparation package exported.");
  };

  return <main className="min-h-screen pb-16 text-white" style={{ background: "radial-gradient(circle at 85% 8%, rgba(0,212,255,0.17), transparent 27%), radial-gradient(circle at 10% 60%, rgba(255,184,0,0.11), transparent 30%), #050B1A" }}>
    <header className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "rgba(5,11,26,0.9)" }}><div className="container flex items-center justify-between py-4"><Link href="/creator-media-studio" className="font-black text-white hover:text-[#00D4FF]">ScrollVerse Creator Media</Link><Link href="/media-dock" className="text-xs font-mono" style={{ color: "#00FF88" }}>PRIVATE MEDIA DOCK</Link></div></header>
    <section className="container py-12 md:py-16"><p className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>FIRST-PARTY PROVIDER-PREPARATION LAB</p><h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Inspect the master.<br /><span style={{ color: "#FFB800" }}>Carry the record with it.</span></h1><p className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "#C8D8E7" }}>A browser-local readiness workspace for images, video, and music. Inspect file facts, create an integrity record, review rights and metadata, preview the selected asset, and export a provider-preparation package before you stage a file privately or choose an external delivery route.</p>
      <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.28)", background: "rgba(0,255,136,0.04)" }}><p className="text-sm leading-relaxed" style={{ color: "#CBE6DE" }}>Privacy boundary: inspection happens in this browser. Selecting a file here does not upload it, create a server record, contact a platform, or expose it to another visitor. Use Media Dock only when you choose to stage the selected work in your authenticated creator record.</p></div>
      <div className="mt-10 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]"><section className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(4,14,30,0.7)" }}><p className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>01 · LOCAL INSPECTION</p><input type="file" onChange={selectFile} accept="image/*,audio/*,video/*" className="mt-5 w-full text-sm" /><p className="mt-3 text-xs leading-relaxed" style={{ color: "#94A9BA" }}>For privacy and reliability, inspect one file at a time. The lab can inspect browser-visible file facts; it cannot certify codecs, sample rate, bit depth, ownership, or provider acceptance.</p>{file ? <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.25)", background: "rgba(255,184,0,0.04)" }}><p className="font-black">{file.name}</p><p className="mt-2 text-xs" style={{ color: "#C9D7E4" }}>{file.type || "Unknown type"} · {formatBytes(file.size)}</p>{inspecting ? <p className="mt-3 text-sm" style={{ color: "#FFB800" }}>Inspecting locally…</p> : null}</div> : null}<label className="mt-6 block text-xs font-mono" style={{ color: "#A9BDCC" }}>PREPARATION TARGET<select value={target} onChange={event => setTarget(event.target.value as (typeof TARGETS)[number])} className="mt-2 w-full rounded-xl border px-3 py-3 text-sm" style={{ background: "#071426", borderColor: "rgba(255,255,255,0.12)", color: "white" }}>{TARGETS.map(option => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}</select></label></section>
        <section className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(255,184,0,0.3)", background: "rgba(255,184,0,0.035)" }}><p className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>02 · PREVIEW + FACTS</p>{!facts ? <p className="mt-6 text-sm leading-relaxed" style={{ color: "#AABECE" }}>Choose an image, audio file, or video file to create a local facts panel and preview.</p> : <div className="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr]"><div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.1)", background: "#020713" }}>{file?.type.startsWith("image/") && previewUrl ? <img src={previewUrl} alt="Local selected media preview" className="h-56 w-full object-contain" /> : null}{file?.type.startsWith("video/") && previewUrl ? <video src={previewUrl} controls className="h-56 w-full object-contain" /> : null}{file?.type.startsWith("audio/") && previewUrl ? <div className="flex h-56 items-center justify-center p-5"><audio src={previewUrl} controls className="w-full" /></div> : null}</div><div className="space-y-3 text-sm"><p><span style={{ color: "#FFB800" }}>SHA-256</span><br /><span className="break-all font-mono text-xs" style={{ color: "#D1E0EA" }}>{facts.sha256}</span></p><p><span style={{ color: "#FFB800" }}>Detected facts</span><br /><span style={{ color: "#D1E0EA" }}>{facts.mimeType} · {formatBytes(facts.byteSize)} · {facts.width && facts.height ? `${facts.width}×${facts.height}` : "dimensions unavailable"} · {formatDuration(facts.durationSeconds)}</span></p><p className="text-xs leading-relaxed" style={{ color: "#95ABBC" }}>The hash and facts are generated locally. They are not registered on a chain, submitted to a provider, or treated as a rights certificate.</p></div></div>}</section></div>
      {facts ? <section className="mt-8 rounded-[2rem] border p-6" style={{ borderColor: "rgba(185,140,255,0.3)", background: "rgba(185,140,255,0.04)" }}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>03 · PROVIDER-PREPARATION RECORD</p><h2 className="mt-2 text-3xl font-black">Readiness: <span style={{ color: readiness === 100 ? "#00FF88" : "#FFB800" }}>{readiness}%</span></h2></div><button onClick={exportPackage} className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#B98CFF", color: "#050B1A" }}>Export local package</button></div><div className="mt-6 grid gap-3 md:grid-cols-2">{checks.map(check => <div key={check.label} className="rounded-xl border p-4" style={{ borderColor: check.ok ? "rgba(0,255,136,0.35)" : "rgba(255,184,0,0.35)", background: check.ok ? "rgba(0,255,136,0.04)" : "rgba(255,184,0,0.035)" }}><p className="text-sm font-black" style={{ color: check.ok ? "#00FF88" : "#FFB800" }}>{check.ok ? "READY" : "REVIEW"} · {check.label}</p><p className="mt-2 text-xs leading-relaxed" style={{ color: "#C7D6E3" }}>{check.detail}</p></div>)}</div><div className="mt-7 grid gap-4 md:grid-cols-2"><label className="flex items-start gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)" }}><input type="checkbox" checked={rightsChecked} onChange={event => setRightsChecked(event.target.checked)} />I reviewed ownership, contributor permissions, samples, and public-use rights.</label><label className="flex items-start gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)" }}><input type="checkbox" checked={metadataChecked} onChange={event => setMetadataChecked(event.target.checked)} />I reviewed title, credits, territory, public description, and delivery identifiers where assigned.</label><label className="flex items-start gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)" }}><input type="checkbox" checked={provenanceChecked} onChange={event => setProvenanceChecked(event.target.checked)} />I have a provenance note or source record for this selected asset.</label><label className="flex items-start gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)" }}><input type="checkbox" checked={accessibilityChecked} onChange={event => setAccessibilityChecked(event.target.checked)} />I reviewed captions, lyrics, transcript, or alt text as applicable.</label></div><div className="mt-4 grid gap-4 md:grid-cols-[0.7fr_1.3fr]"><label className="text-sm" style={{ color: "#C8D8E7" }}>AI transparency review<select value={aiDisclosure} onChange={event => setAiDisclosure(event.target.value)} className="mt-2 w-full rounded-xl border px-3 py-3" style={{ background: "#071426", borderColor: "rgba(255,255,255,0.12)", color: "white" }}><option value="NOT_REVIEWED">Not reviewed</option><option value="NO_MATERIAL_AI">No material AI generation identified</option><option value="MATERIAL_AI_DISCLOSED">Material AI generation reviewed and disclosed</option></select></label><label className="text-sm" style={{ color: "#C8D8E7" }}>Private preparation note<textarea value={notes} onChange={event => setNotes(event.target.value)} maxLength={2000} rows={3} placeholder="What still needs review before a provider handoff?" className="mt-2 w-full resize-none rounded-xl border px-3 py-3" style={{ background: "#071426", borderColor: "rgba(255,255,255,0.12)", color: "white" }} /></label></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/media-dock" className="rounded-xl px-4 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Stage privately in Media Dock</Link><Link href="/creator-operations" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.42)", color: "#00FF88" }}>Open review workflow</Link><Link href="/signalworks" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.42)", color: "#FFB800" }}>Choose delivery research</Link></div></section> : null}
    </section>
  </main>;
}
