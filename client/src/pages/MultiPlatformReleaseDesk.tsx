import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Copy, FileVideo2, LockKeyhole, Radio, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type DestinationId = "scrollverse" | "youtube" | "instagram" | "tiktok" | "dsp" | "podcast";

const assetTypes = [
  "Original episode / visual",
  "Music single or album",
  "Book or reading edition",
  "Fashion look or artifact",
  "Community update",
  "Educational reference",
];

const destinations: Array<{
  id: DestinationId;
  label: string;
  tone: string;
  state: string;
  summary: string;
  assetNeeds: string[];
  externalGate: string;
}> = [
  {
    id: "scrollverse",
    label: "ScrollVerse release route",
    tone: "#00D4FF",
    state: "Local route prepared",
    summary: "Use a registered ScrollVerse route for the asset’s source, accessibility, and release record after managed publication synchronization.",
    assetNeeds: ["Final title/version", "Source and rights record", "Accessible text/captions/alt text", "Destination route", "Owner release decision"],
    externalGate: "The public ScrollVerse domain and release route are verified. This exact asset still requires its final source, rights, accessibility record, owner release, public destination, result record, and correction path before it is represented as published.",
  },
  {
    id: "youtube",
    label: "YouTube video or channel",
    tone: "#FF4F64",
    state: "No inspected active connector/account",
    summary: "Prepare a final original video, title, description, thumbnail, chapters, captions, and audience setting as one packet.",
    assetNeeds: ["Final video master", "Original/cleared music and visuals", "Title, description, tags, and thumbnail", "Captions and chapters", "Audience setting and owner release"],
    externalGate: "No YouTube connector or authorized account was established in the inspected current task configuration.",
  },
  {
    id: "instagram",
    label: "Instagram post, Reel, or Story",
    tone: "#FF6B9A",
    state: "Connector present but disabled",
    summary: "Prepare one approved original asset with a caption, alt text, destination lane, and a result-link field.",
    assetNeeds: ["Approved original media", "Caption and alt text", "Format choice: post, Reel, or Story", "Authorized account", "Actual permalink/result"],
    externalGate: "The inspected Instagram connector is disabled and has no active authorized account, so preparation is not publication.",
  },
  {
    id: "tiktok",
    label: "Short-form video destination",
    tone: "#B98CFF",
    state: "No inspected active connector/account",
    summary: "Prepare a vertical original master, caption, accessibility text, rights context, and audience settings before a destination account is chosen.",
    assetNeeds: ["Vertical final master", "Caption and accessible description", "Music/visual rights record", "Audience and content settings", "Authorized account and result"],
    externalGate: "No active connector or account for this destination was identified in the inspected current task configuration.",
  },
  {
    id: "dsp",
    label: "DSP and music delivery",
    tone: "#00FF88",
    state: "Delivery account evidence required",
    summary: "Prepare a mastered original recording, artwork, metadata, credits, lyrics, rights, and distribution destination as a complete release bundle.",
    assetNeeds: ["Final master and cover", "Credits and rights splits", "Metadata and lyric sheet", "Explicit-content and territory choices", "Distributor account and delivery result"],
    externalGate: "No current distributor account or delivery result is represented by this local desk.",
  },
  {
    id: "podcast",
    label: "Podcast and spoken release",
    tone: "#FFB800",
    state: "Host account evidence required",
    summary: "Prepare the final episode audio, transcript, show notes, guest/voice record, cover art, and host destination for one episode.",
    assetNeeds: ["Final audio master", "Full transcript and show notes", "Voice/guest permissions", "Episode title and cover", "Host account and published episode result"],
    externalGate: "No active hosting account or external publication result is represented in the local portal.",
  },
];

export default function MultiPlatformReleaseDesk() {
  useSovereignHeartbeat({ page: "multi-platform-release-desk" });

  const [destinationId, setDestinationId] = useState<DestinationId>("scrollverse");
  const [assetType, setAssetType] = useState(assetTypes[0]);
  const [title, setTitle] = useState("");
  const [sourceReady, setSourceReady] = useState(false);
  const [accessibilityReady, setAccessibilityReady] = useState(false);
  const [ownerRelease, setOwnerRelease] = useState(false);
  const destination = useMemo(
    () => destinations.find((item) => item.id === destinationId) ?? destinations[0],
    [destinationId],
  );

  const checks = [
    { checked: sourceReady, setChecked: setSourceReady, label: "Source and rights context for this exact asset is ready" },
    { checked: accessibilityReady, setChecked: setAccessibilityReady, label: "Accessibility materials are ready for this destination" },
    { checked: ownerRelease, setChecked: setOwnerRelease, label: "Owner release decision is recorded for this destination" },
  ];
  const completedChecks = checks.filter((item) => item.checked).length;

  const copyManifest = async () => {
    const manifest = [
      `# ${title.trim() || "Untitled ScrollVerse asset"} — ${destination.label} release packet`,
      "",
      `Asset type: ${assetType}`,
      `Destination state: ${destination.state}`,
      "",
      "## Required packet",
      ...destination.assetNeeds.map((item) => `- [ ] ${item}`),
      "",
      "## Confirmed in this local draft",
      `- [${sourceReady ? "x" : " "}] Source and rights context ready`,
      `- [${accessibilityReady ? "x" : " "}] Accessibility materials ready`,
      `- [${ownerRelease ? "x" : " "}] Owner release decision ready`,
      "",
      "## External result gate",
      destination.externalGate,
      "",
      "## Result record",
      "- [ ] Destination URL / permalink / public network reference",
      "- [ ] Publication or delivery timestamp",
      "- [ ] Correction path",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(manifest);
      toast.success("Destination-specific release packet copied for this browser session.");
    } catch {
      toast.error("Clipboard access is unavailable. Select the release packet text manually.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/production-control" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Production Control</Link>
            <Link href="/creator-channel-hub" className="rounded-lg border border-[#FF6B9A]/40 px-3 py-2 text-xs font-black text-[#FF9EB9] transition hover:border-[#FF6B9A]">Creator Channels</Link>
          </div>
        </div>

        <header className="mt-8 overflow-hidden rounded-[2rem] border border-[#B98CFF]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 15% 12%, rgba(185,140,255,.18), transparent 32%), radial-gradient(circle at 86% 78%, rgba(0,212,255,.14), transparent 32%), #071124" }}>
          <div className="flex items-center gap-2 text-xs font-mono tracking-[.2em] text-[#D6C4FF]"><Send className="h-4 w-4" />MULTI-PLATFORM RELEASE DESK</div>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Prepare one original asset for the destination that will carry it.</h1>
              <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This desk builds a destination-specific release packet for ScrollVerse, YouTube, Instagram, short-form video, DSP delivery, or podcast distribution. It keeps source, accessibility, owner release, destination account, and actual outcome in the same record.</p>
            </div>
            <div className="rounded-3xl border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.08] p-6">
              <div className="text-[10px] font-mono tracking-[.16em] text-[#FF9EB9]">CURRENT ACCOUNT RESULT RECORD</div>
              <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The inspected Instagram connector is disabled and has no active authorized account. No inspected YouTube or other creator-platform connector/account is active in this task. This desk prepares the exact packet; it does not submit it.</p>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <PortalTrustLens lane="Multi-Platform Release" source="Current connector/account inspection, production-lane audits, platform-specific asset packet requirements, and the local Release Readiness route." readiness="A draft becomes ready for a destination only when its final source, rights, accessibility materials, owner release, account authorization, and real outcome record are complete." boundary="This page does not post, upload, schedule a platform action, create a channel, connect an account, deliver media, process payments, or activate providers." />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/[.025] p-4">
            <div className="px-3 py-2 text-xs font-mono tracking-[.18em] text-[#D6C4FF]">CHOOSE A DESTINATION</div>
            <div className="mt-2 grid gap-2">
              {destinations.map((item) => {
                const selected = item.id === destinationId;
                return (
                  <button key={item.id} type="button" aria-pressed={selected} onClick={() => setDestinationId(item.id)} className="rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: selected ? `${item.tone}99` : "rgba(255,255,255,.10)", background: selected ? `${item.tone}13` : "transparent" }}>
                    <div className="flex items-center justify-between gap-3"><span className="text-sm font-black" style={{ color: selected ? item.tone : "#FFFFFF" }}>{item.label}</span><ArrowRight className="h-4 w-4" style={{ color: selected ? item.tone : "#8495A8" }} /></div>
                    <p className="mt-1 text-xs text-[#B8C7D6]">{item.state}</p>
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="rounded-3xl border p-6 sm:p-8" style={{ borderColor: `${destination.tone}66`, background: `${destination.tone}09` }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><div className="text-xs font-mono tracking-[.2em]" style={{ color: destination.tone }}>{destination.label.toUpperCase()}</div><h2 className="mt-2 text-3xl font-black">Destination release packet</h2></div>
              <div className="rounded-full border px-3 py-2 text-xs font-black" style={{ borderColor: `${destination.tone}77`, color: destination.tone }}>{completedChecks}/3 LOCAL CHECKS</div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{destination.summary}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-[#D6E2EE]">Asset type
                <select value={assetType} onChange={(event) => setAssetType(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]">
                  {assetTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-bold text-[#D6E2EE]">Working title / version
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Name the exact asset version" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white placeholder:text-[#77899B] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]" />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#050B1A]/55 p-5">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[.16em]" style={{ color: destination.tone }}><FileVideo2 className="h-4 w-4" />DESTINATION-SPECIFIC REQUIRED PACKET</div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{destination.assetNeeds.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-[#D6E2EE]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: destination.tone }} />{item}</li>)}</ul>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#050B1A]/55 p-5">
              <div className="text-xs font-mono tracking-[.16em] text-[#00FF88]">LOCAL PACKET CONFIRMATIONS</div>
              <div className="mt-3 grid gap-3">
                {checks.map((item) => (
                  <label key={item.label} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#D6E2EE]">
                    <input type="checkbox" checked={item.checked} onChange={(event) => item.setChecked(event.target.checked)} className="mt-1 h-4 w-4 accent-[#00D4FF]" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[.06] p-5"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FF9EB9]"><LockKeyhole className="h-4 w-4" />EXTERNAL RESULT GATE</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{destination.externalGate}</p></div>
            <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={copyManifest} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#050B1A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ background: destination.tone }}><Copy className="h-4 w-4" />Copy release packet</button><Link href="/release-readiness" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-white/50">Open readiness map <ArrowRight className="h-4 w-4" /></Link></div>
          </article>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-[#00D4FF]/35 bg-[#00D4FF]/[.06] p-6"><Radio className="h-6 w-6 text-[#00D4FF]" /><h3 className="mt-4 text-lg font-black">Destination comes after the asset</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">The title, final source, rights context, accessible materials, and owner release stay specific to one exact asset version before its destination is selected.</p></article>
          <article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.06] p-6"><ShieldCheck className="h-6 w-6 text-[#00FF88]" /><h3 className="mt-4 text-lg font-black">One real outcome record</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">After a destination is authorized and completed, attach its actual permalink, delivery confirmation, public network reference, or store result to the same packet.</p></article>
          <article className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.06] p-6"><CheckCircle2 className="h-6 w-6 text-[#FFCC4D]" /><h3 className="mt-4 text-lg font-black">Cross-platform without duplication</h3><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Reuse the same source record across platforms, then create a destination-specific caption, format, accessibility, account, and outcome record for each actual release.</p></article>
        </section>
      </section>
    </main>
  );
}
