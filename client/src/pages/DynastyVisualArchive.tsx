import { useMemo, useState } from "react";
import { Archive, ArrowRight, BookOpenCheck, Download, Eye, FileWarning, Film, Images, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ArchiveAsset = {
  id: string;
  title: string;
  category: "still" | "coin";
  src: string;
  alt: string;
  sourceLabel: string;
  creativeUse: string;
  recordNote: string;
  accent: string;
};

type MotionSource = {
  id: string;
  filename: string;
  title: string;
  planningUse: string;
};

const ARCHIVE_ASSETS: readonly ArchiveAsset[] = [
  {
    id: "titanium-reader",
    title: "Black Titanium Reader",
    category: "still",
    src: "/manus-storage/black_titanium_card_5ce351ff.jpg",
    alt: "Creator-supplied black titanium concept card with copper-tone edge details and printed graphic elements.",
    sourceLabel: "Creator-supplied still · 1920 × 1280",
    creativeUse: "Archive-object concept for a Dynasty visual sequence.",
    recordNote: "Printed wording, numbers, symbols, and QR-like imagery are shown as supplied artwork, not as proof of a working card, linked account, technical system, or payment function.",
    accent: "#FFB36B",
  },
  {
    id: "seal-artwork",
    title: "Sovereign Seal Artwork",
    category: "still",
    src: "/manus-storage/prophet_seal_chais_sabir_allah_311068a2.jpg",
    alt: "Creator-supplied circular black, copper, and gold seal artwork with ornamental typography and small guardian figures.",
    sourceLabel: "Creator-supplied still · 1600 × 1600",
    creativeUse: "Symbolic crest treatment for the archive and original fiction planning.",
    recordNote: "This is a creator-supplied symbolic artwork. It is not displayed as an identity verification badge, historical credential, legal seal, or external authorization.",
    accent: "#FFD27E",
  },
  {
    id: "pyramid-storm",
    title: "Golden Pyramid Storm",
    category: "still",
    src: "/manus-storage/golden-pyramid-storm-massive-golden-pyramid-in-des_917d5228.webp",
    alt: "Creator-supplied panoramic golden pyramid concept artwork beneath a stormy sky with lightning and radiant light.",
    sourceLabel: "Creator-supplied still · panoramic concept art",
    creativeUse: "Environment reference for original, creator-directed episode development.",
    recordNote: "The image is an original visual reference in this archive. It does not document an actual location, event, scientific effect, or production release.",
    accent: "#9DEBFF",
  },
  {
    id: "coin-paul-cuffe",
    title: "Coin Asset · Paul Cuffe",
    category: "coin",
    src: "/manus-storage/paul_cuffe_coin_transparent_e77f10e2.png",
    alt: "Creator-supplied transparent coin artwork labelled Paul Cuffe.",
    sourceLabel: "Creator-supplied transparent coin artwork",
    creativeUse: "Coin-set visual reference for a non-transactional Dynasty vault scene.",
    recordNote: "The supplied label is retained for source identification only. This archive does not make a historical, commercial, token, or endorsement claim.",
    accent: "#E8DFFF",
  },
  {
    id: "coin-mansa-musa",
    title: "Coin Asset · Mansa Musa",
    category: "coin",
    src: "/manus-storage/mansa_musa_coin_transparent_01666340.png",
    alt: "Creator-supplied transparent coin artwork labelled Mansa Musa.",
    sourceLabel: "Creator-supplied transparent coin artwork",
    creativeUse: "Coin-set visual reference for a non-transactional Dynasty vault scene.",
    recordNote: "The supplied label is retained for source identification only. This archive does not make a historical, commercial, token, or endorsement claim.",
    accent: "#FFCC4D",
  },
  {
    id: "coin-king-solomon",
    title: "Coin Asset · King Solomon",
    category: "coin",
    src: "/manus-storage/king_solomon_coin_transparent_05f3776b.png",
    alt: "Creator-supplied transparent coin artwork labelled King Solomon.",
    sourceLabel: "Creator-supplied transparent coin artwork",
    creativeUse: "Coin-set visual reference for a non-transactional Dynasty vault scene.",
    recordNote: "The supplied label is retained for source identification only. This archive does not make a historical, commercial, token, or endorsement claim.",
    accent: "#FF8F70",
  },
  {
    id: "coin-dna-helix",
    title: "Coin Asset · DNA Helix",
    category: "coin",
    src: "/manus-storage/dna_helix_coin_transparent_5a2194e1.png",
    alt: "Creator-supplied transparent coin artwork labelled DNA Helix.",
    sourceLabel: "Creator-supplied transparent coin artwork",
    creativeUse: "Symbolic visual reference for creator-directed Digital DNA story context.",
    recordNote: "The asset is presented as a creator-supplied symbolic design, not as a scientific, genetic, biometric, or identity record.",
    accent: "#00FF88",
  },
  {
    id: "coin-kofi-war",
    title: "Coin Asset · Kofi War",
    category: "coin",
    src: "/manus-storage/kofi_war_coin_transparent_fa9ef5e2.png",
    alt: "Creator-supplied transparent coin artwork labelled Kofi War.",
    sourceLabel: "Creator-supplied transparent coin artwork",
    creativeUse: "Coin-set visual reference for an original archive sequence.",
    recordNote: "The supplied label is retained for source identification only. This archive does not make a historical, commercial, token, or endorsement claim.",
    accent: "#00D4FF",
  },
] as const;

const MOTION_SOURCES: readonly MotionSource[] = [
  { id: "royal-portrait", filename: "afrofuturist_royal_portrait.mp4", title: "Afrofuturist Royal Portrait", planningUse: "Filename-derived source reference for a future original portrait-sequence brief." },
  { id: "celestial-keeper", filename: "celestial_keeper_temple.mp4", title: "Celestial Keeper Temple", planningUse: "Filename-derived source reference for a future original environment or keeper-sequence brief." },
  { id: "pyramid-storm", filename: "golden_pyramid_storm.mp4", title: "Golden Pyramid Storm", planningUse: "Filename-derived source reference for an original storm-environment brief." },
  { id: "generated-image", filename: "generated_image.mp4", title: "Generated Image Motion Reference", planningUse: "Filename-derived source reference awaiting a creator-approved description before any creative reuse decision." },
  { id: "pyramid-chamber-a", filename: "afrofuturist_pyramid_chamber.mp4", title: "Afrofuturist Pyramid Chamber A", planningUse: "Filename-derived source reference for an original chamber-sequence brief." },
  { id: "pyramid-chamber-b", filename: "afrofuturist_pyramid_chamber(1).mp4", title: "Afrofuturist Pyramid Chamber B", planningUse: "Second supplied filename variant retained as a separate source record until a creator review identifies its intended use." },
  { id: "king-mirror", filename: "afrofuturist_king_mirror.mp4", title: "Afrofuturist King Mirror", planningUse: "Filename-derived source reference for a creator-directed Mirror sequence brief." },
  { id: "museum-gallery", filename: "afrofuturist_museum_gallery.mp4", title: "Afrofuturist Museum Gallery", planningUse: "Filename-derived source reference for an original gallery-sequence brief." },
  { id: "royal-storm", filename: "afrofuturist_royal_storm.mp4", title: "Afrofuturist Royal Storm", planningUse: "Filename-derived source reference for an original portrait-and-environment brief." },
  { id: "golden-coins", filename: "sovereign_golden_coins.mp4", title: "Sovereign Golden Coins", planningUse: "Filename-derived source reference for a non-transactional visual-object sequence brief." },
  { id: "civic-seal", filename: "episode-4-the-civic-seal---dutch-angle-low-angle-o.mp4", title: "Episode 4 · The Civic Seal", planningUse: "Filename-derived source reference associated by supplied name with Episode 4; its footage and narrative use remain unreviewed in this record." },
] as const;

const EXTERNAL_SOURCE_REFERENCE = {
  title: "Infinite Insights · Public YouTube Reference",
  url: "https://youtu.be/0_oCySkU4Jc",
  sourceLabel: "External source · public YouTube link",
  planningNote: "The source’s cosmic imagery, collective-rebuilding tone, and speculative future-market visual language may be discussed as a creative reference. Its alternative financial, systemic, spiritual, and behind-the-scenes implementation narratives remain assertions made by the source, not ScrollVerse facts or operational plans.",
} as const;

function exportLocalArchive(record: unknown) {
  const href = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "scrollverse-dynasty-visual-archive-local-record.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

function exportLocalMotionBrief(record: unknown) {
  const href = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "scrollverse-dynasty-next-motion-brief.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function DynastyVisualArchive() {
  useSovereignHeartbeat({ page: "dynasty-visual-archive" });
  const [selectedId, setSelectedId] = useState("titanium-reader");
  const [selectedMotionId, setSelectedMotionId] = useState("royal-portrait");
  const [curationNote, setCurationNote] = useState("");
  const [motionBriefDuration, setMotionBriefDuration] = useState("");
  const [motionBriefSound, setMotionBriefSound] = useState("");
  const [motionBriefText, setMotionBriefText] = useState("");
  const [motionBriefContinuity, setMotionBriefContinuity] = useState("");
  const [motionBriefTarget, setMotionBriefTarget] = useState("");
  const [creatorApprovedReference, setCreatorApprovedReference] = useState(false);
  const selected = useMemo(() => ARCHIVE_ASSETS.find((asset) => asset.id === selectedId) ?? ARCHIVE_ASSETS[0], [selectedId]);
  const selectedMotion = useMemo(() => MOTION_SOURCES.find((source) => source.id === selectedMotionId) ?? MOTION_SOURCES[0], [selectedMotionId]);
  const heroAssets = ARCHIVE_ASSETS.filter((asset) => asset.category === "still");
  const coinAssets = ARCHIVE_ASSETS.filter((asset) => asset.category === "coin");
  const motionBriefReady = [motionBriefDuration, motionBriefSound, motionBriefText, motionBriefContinuity, motionBriefTarget].every((value) => value.trim().length > 0) && creatorApprovedReference;

  const exportArchive = () => {
    exportLocalArchive({
      recordType: "ScrollVerse source-labeled Dynasty Visual Archive local curation record",
      createdAt: new Date().toISOString(),
      selectedAsset: selected,
      assetInventory: ARCHIVE_ASSETS,
      selectedMotionReference: selectedMotion,
      motionReferenceInventory: MOTION_SOURCES,
      externalSourceReference: EXTERNAL_SOURCE_REFERENCE,
      curationNote,
      notice: "This local export records creator-supplied visual materials, motion-file metadata, and optional curation notes. The motion references are not embedded, played, or content-verified in this archive. The export does not verify claims, activate a QR code, create a wallet, mint a token, list an item, connect a marketplace, process a payment, generate media, or publish a release.",
    });
    toast.success("Local Dynasty archive record exported. No external action was created.");
  };

  const exportMotionBrief = () => {
    if (!motionBriefReady) return;
    exportLocalMotionBrief({
      recordType: "ScrollVerse Dynasty next-motion production brief",
      createdAt: new Date().toISOString(),
      sourceReference: selectedMotion,
      duration: motionBriefDuration,
      sound: motionBriefSound,
      onScreenText: motionBriefText,
      continuity: motionBriefContinuity,
      exactUseTarget: motionBriefTarget,
      creatorApprovedReference,
      notice: "Browser-local planning record only. No generation, playback, upload, wallet, payment, external release, or publication occurs from this brief.",
    });
    toast.success("Next-motion brief exported locally. No external action was created.");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050913] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#FFB36B]/25 bg-[radial-gradient(circle_at_84%_10%,rgba(255,179,107,.22),transparent_27%),radial-gradient(circle_at_8%_78%,rgba(0,212,255,.14),transparent_30%),#050913]">
        <div className="container py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/seven-episode-series" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SEVEN-EPISODE SERIES</Link>
            <span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#FFE09A]">CREATOR-SUPPLIED · SOURCE-LABELED · NON-TRANSACTIONAL</span>
          </div>
          <div className="mt-12 grid gap-9 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
            <div>
              <p className="text-[10px] font-mono tracking-[.22em] text-[#FFDEA0]">SCROLLVERSE · DYNASTY VISUAL ARCHIVE</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-[-.04em] md:text-7xl">A visual source lane<br /><span className="text-[#FFDEA0]">for the next original scene.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This first-party archive organizes the supplied titanium-reader, seal, pyramid, and coin visuals as creator-directed source material for gallery curation and original episode planning. It does not present visual narrative as independent verification, nor does it activate a financial, marketplace, social, or technical system.</p>
            </div>
            <aside className="rounded-[2rem] border border-[#FFB36B]/35 bg-[#FFB36B]/[.06] p-7">
              <Archive className="h-9 w-9 text-[#FFDEA0]" />
              <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">ARCHIVE STATUS</p>
              <p className="mt-3 text-2xl font-black">Eight visual assets and eleven motion-file records are ready for local planning.</p>
              <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The motion inventory retains user-supplied filenames and MP4 container metadata only; it does not embed, play, or describe unreviewed footage. A separately labelled public YouTube reference can inform visual planning without being treated as evidence of any financial, technical, legal, or spiritual claim. The linked Copilot artifact is recorded as inaccessible in the current browser session and is not reproduced here.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <Link href="/episode-brief-builder?foundation=dynasty" className="inline-flex items-center gap-2 rounded-xl border border-[#E8DFFF]/45 bg-[#E8DFFF]/[.07] px-5 py-3 text-sm font-black text-[#E8DFFF] transition hover:-translate-y-0.5">Carry Dynasty context into a local brief <BookOpenCheck className="h-4 w-4" /></Link>
      </section>

      <section className="container py-4" id="dynasty-motion-source-inventory">
        <div className="rounded-[2rem] border border-[#9DEBFF]/30 bg-[radial-gradient(circle_at_92%_5%,rgba(0,212,255,.16),transparent_30%),rgba(0,212,255,.035)] p-6 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-[10px] font-mono tracking-[.17em] text-[#9DEBFF]">DYNASTY MOTION SOURCE INVENTORY · METADATA ONLY</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Eleven supplied motion references, held for the next brief.</h2></div><span className="rounded-full border border-[#9DEBFF]/40 bg-[#00D4FF]/10 px-3 py-1 text-xs font-black text-[#9DEBFF]">NO PLAYBACK · NO RELEASE · NO CONTENT CLAIM</span></div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Each record below identifies an available creator-supplied MP4 file by filename and a cautious planning use. No video is embedded or played here, and no runtime, spoken content, character appearance, quality assessment, authorship beyond the supplied-source label, or release status is inferred from a filename.</p>
          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{MOTION_SOURCES.map((source) => { const active = source.id === selectedMotion.id; return <button key={source.id} type="button" aria-pressed={active} onClick={() => setSelectedMotionId(source.id)} className="rounded-2xl border p-4 text-left transition active:scale-[.99]" style={{ borderColor: active ? "rgba(157,235,255,.7)" : "rgba(255,255,255,.10)", background: active ? "rgba(0,212,255,.11)" : "rgba(3,9,20,.30)" }}><span className="text-[10px] font-mono tracking-[.12em] text-[#9DEBFF]">SUPPLIED MP4 · METADATA RECORD</span><span className="mt-2 block text-base font-black">{source.title}</span><span className="mt-2 block break-all font-mono text-[10px] leading-5 text-[#B8C7D6]">{source.filename}</span></button>; })}</div>
          <div className="mt-6 rounded-2xl border border-[#9DEBFF]/25 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">SELECTED PLANNING RECORD</p><h3 className="mt-2 text-xl font-black">{selectedMotion.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selectedMotion.planningUse}</p><p className="mt-3 text-xs leading-6 text-[#B8C7D6]">Before any new video generation or public use, a completed creator-approved brief must specify the exact reference selection, permitted use, duration, aspect ratio, story, original-character direction, on-screen text, audio, accessibility, destination, and release decision.</p></div>
          <div id="dynasty-motion-production-brief" className="mt-6 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.045] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">MOTION BRIEF · BROWSER-LOCAL ONLY</p><h3 className="mt-2 text-2xl font-black">Define the next motion before making it.</h3></div><span className="rounded-full border border-[#FFCC4D]/35 bg-black/20 px-3 py-1 text-[10px] font-mono text-[#FFE09A]">NO GENERATION · NO RELEASE</span></div>
            <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Complete the creator decisions for this selected filename. No generation, playback, upload, or release occurs from this planning form.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label><span className="text-xs font-black text-white">Duration</span><input value={motionBriefDuration} onChange={(event) => setMotionBriefDuration(event.target.value)} placeholder="Example: 10 seconds" className="mt-2 w-full rounded-xl border border-white/15 bg-[#071426] px-3 py-2 text-sm text-white outline-none focus:border-[#FFCC4D]" /></label>
              <label><span className="text-xs font-black text-white">Sound / audio direction</span><input value={motionBriefSound} onChange={(event) => setMotionBriefSound(event.target.value)} placeholder="Example: instrumental only; no spoken claim" className="mt-2 w-full rounded-xl border border-white/15 bg-[#071426] px-3 py-2 text-sm text-white outline-none focus:border-[#FFCC4D]" /></label>
              <label><span className="text-xs font-black text-white">On-screen text</span><textarea value={motionBriefText} onChange={(event) => setMotionBriefText(event.target.value)} rows={3} placeholder="Exact text, or write: none" className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#071426] px-3 py-2 text-sm text-white outline-none focus:border-[#FFCC4D]" /></label>
              <label><span className="text-xs font-black text-white">Continuity / story direction</span><textarea value={motionBriefContinuity} onChange={(event) => setMotionBriefContinuity(event.target.value)} rows={3} placeholder="What must remain consistent across the shot?" className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#071426] px-3 py-2 text-sm text-white outline-none focus:border-[#FFCC4D]" /></label>
              <label className="md:col-span-2"><span className="text-xs font-black text-white">Exact use target</span><input value={motionBriefTarget} onChange={(event) => setMotionBriefTarget(event.target.value)} placeholder="Example: original Episode 4 concept trailer, private review" className="mt-2 w-full rounded-xl border border-white/15 bg-[#071426] px-3 py-2 text-sm text-white outline-none focus:border-[#FFCC4D]" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#D6E2EE]"><input type="checkbox" checked={creatorApprovedReference} onChange={(event) => setCreatorApprovedReference(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this exact selected filename is the creator-approved reference for this local planning record.</label>
            <div aria-live="polite" className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-[#B8C7D6]">{motionBriefReady ? "Brief ready for a local JSON export." : "Complete duration, sound, on-screen text, continuity, exact use target, and the creator-approved reference checkbox to enable export."}</div>
            <button type="button" disabled={!motionBriefReady} onClick={exportMotionBrief} className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-45" style={{ background: "#FFCC4D", color: "#071426" }} title="Export the completed browser-local production brief"> <Download className="h-4 w-4" />Export next-motion brief</button>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-6 xl:grid-cols-[.76fr_1.24fr]">
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
              <p className="text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">VISUAL SOURCE SELECTOR</p>
              <div className="mt-5 grid gap-2">
                {ARCHIVE_ASSETS.map((asset) => {
                  const active = asset.id === selected.id;
                  return <button type="button" key={asset.id} aria-pressed={active} onClick={() => setSelectedId(asset.id)} className="flex items-center gap-3 rounded-2xl border p-3 text-left transition active:scale-[.99]" style={{ borderColor: active ? `${asset.accent}9C` : "rgba(255,255,255,.10)", background: active ? `${asset.accent}14` : "rgba(3,9,20,.34)" }}>
                    <img src={asset.src} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    <span className="min-w-0"><span className="block truncate text-sm font-black">{asset.title}</span><span className="mt-1 block text-[10px] font-mono tracking-[.11em] text-[#B8C7D6]">{asset.category.toUpperCase()} · SOURCE ASSET</span></span>
                  </button>;
                })}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.045] p-6">
              <ShieldCheck className="h-7 w-7 text-[#B5F7CC]" />
              <p className="mt-4 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">SOURCE + CLAIM BOUNDARY</p>
              <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Creator-supplied artwork can guide an original visual language. It does not, by itself, establish identity, history, ownership, scientific effect, asset valuation, legal status, wallet status, payment capability, or marketplace availability.</p>
            </div>
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_90%_8%,rgba(255,204,77,.18),transparent_30%),#071426] p-6 md:p-10">
            <div className="absolute right-6 top-5 text-8xl font-black leading-none opacity-10" style={{ color: selected.accent }}>SV</div>
            <div className="relative grid gap-7 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25">
                <img src={selected.src} alt={selected.alt} className="aspect-square w-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: selected.accent }}>{selected.sourceLabel.toUpperCase()}</p>
                <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{selected.title}</h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-[#D6E2EE]">
                  <p><strong className="text-white">Creative lane:</strong> {selected.creativeUse}</p>
                  <p><strong className="text-white">Record note:</strong> {selected.recordNote}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/episode-brief-builder" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5" style={{ background: selected.accent, color: "#071426" }}>Open Episode Brief Builder <BookOpenCheck className="h-4 w-4" /></Link>
                  <Link href="/seven-episode-series" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white">Open Season One <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="container py-4">
        <div className="rounded-[2rem] border border-[#FFCC4D]/30 bg-[linear-gradient(135deg,rgba(255,204,77,.08),rgba(255,179,107,.04))] p-6 md:p-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-[10px] font-mono tracking-[.17em] text-[#FFE09A]">THE DYNASTY COIN SET · VISUAL ASSET LANE</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Five supplied designs. One non-transactional gallery.</h2></div>
            <span className="rounded-full border border-[#FFCC4D]/35 bg-black/20 px-3 py-1 text-xs font-black text-[#FFE09A]">NO TOKEN, CHECKOUT, WALLET, OR LISTING ACTION</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {coinAssets.map((asset) => <button key={asset.id} type="button" onClick={() => setSelectedId(asset.id)} className="group rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-left transition hover:-translate-y-1 hover:border-[#FFCC4D]/50 active:scale-[.99]" aria-label={`View source note for ${asset.title}`}><div className="rounded-2xl bg-[radial-gradient(circle_at_50%_42%,rgba(255,204,77,.14),transparent_58%),#071426] p-3"><img src={asset.src} alt={asset.alt} className="aspect-square w-full object-contain transition duration-300 group-hover:scale-[1.04]" /></div><p className="mt-4 text-sm font-black">{asset.title}</p><p className="mt-2 text-xs leading-5 text-[#B8C7D6]">{asset.creativeUse}</p></button>)}
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-6 xl:grid-cols-[.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-[#DCC8FF]/30 bg-[#DCC8FF]/[.045] p-7 md:p-8">
            <Sparkles className="h-8 w-8 text-[#E8DFFF]" />
            <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#E8DFFF]">ORIGINAL EPISODE PLANNING</p>
            <h2 className="mt-3 text-3xl font-black">Bring the visual language into a brief—without guessing the rest.</h2>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The archive can inform a scene’s tone, environment, and symbolic objects. The next production brief must still make its own original character design, dialogue, sound authorization, accessibility, rights, and release decisions explicit.</p>
            <div className="mt-7 grid gap-3">
              <Link href="/seven-episode-series" className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm font-black text-white transition hover:border-[#9DEBFF]/55">Season One planning board <ArrowRight className="ml-2 inline h-4 w-4 text-[#9DEBFF]" /></Link>
              <Link href="/episode-brief-builder" className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm font-black text-white transition hover:border-[#E8DFFF]/55">Original Episode Brief Builder <ArrowRight className="ml-2 inline h-4 w-4 text-[#E8DFFF]" /></Link>
              <Link href="/creator-digital-dna" className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm font-black text-white transition hover:border-[#00FF88]/55">Creator Digital DNA context <ArrowRight className="ml-2 inline h-4 w-4 text-[#B5F7CC]" /></Link>
            </div>
            <a href={EXTERNAL_SOURCE_REFERENCE.url} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-2xl border border-[#9DEBFF]/30 bg-[#00D4FF]/[.045] p-5 transition hover:border-[#9DEBFF]/65">
              <p className="text-[10px] font-mono tracking-[.15em] text-[#9DEBFF]">EXTERNAL SOURCE · YOUTUBE</p>
              <h3 className="mt-2 text-lg font-black">{EXTERNAL_SOURCE_REFERENCE.title}</h3>
              <p className="mt-3 text-xs leading-6 text-[#D6E2EE]">{EXTERNAL_SOURCE_REFERENCE.planningNote}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">Open labelled external source <ArrowRight className="h-4 w-4" /></span>
            </a>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">BROWSER-LOCAL CURATION NOTE</p><h2 className="mt-3 text-3xl font-black">Save a handoff without publishing it.</h2></div><Eye className="h-8 w-8 text-[#FFE09A]" /></div>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Capture how the selected still or motion-file record may be used in a future creator review. This note stays in the browser until you export it; it does not add an asset to a release, authorize reuse, send a request, or change an external account.</p>
            <label className="mt-6 block"><span className="text-sm font-black text-white">Local curation note</span><textarea value={curationNote} onChange={(event) => setCurationNote(event.target.value)} rows={6} placeholder="Example: use the selected source as a lighting and material reference for an original scene; keep all new character, sound, and rights choices separate." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#071426] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#76899C] focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/25" /></label>
            <div aria-live="polite" className="mt-6 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.045] p-4 text-xs leading-6 text-[#D6E2EE]"><FileWarning className="mr-2 inline h-4 w-4 text-[#FFE09A]" /><strong className="text-[#FFE09A]">SOURCE RECORD, NOT A RELEASE.</strong> The separate motion-production brief remains required before any new video generation or public release review.</div>
            <button type="button" onClick={exportArchive} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426] transition hover:brightness-110 active:scale-[.97]"><Download className="h-4 w-4" />Export local archive record</button>
          </article>
        </div>
      </section>

      <section className="container py-8"><div className="grid gap-4 md:grid-cols-3"><Link href="/special-repository" className="rounded-[1.6rem] border border-[#FFB36B]/35 bg-[#FFB36B]/[.05] p-6 transition hover:-translate-y-0.5"><Archive className="h-8 w-8 text-[#FFDEA0]" /><h2 className="mt-5 text-2xl font-black">Special Repository</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Return to source records, provenance context, and owner-controlled materials.</p></Link><Link href="/omniland-cinematic-gateway" className="rounded-[1.6rem] border border-[#9DEBFF]/35 bg-[#9DEBFF]/[.05] p-6 transition hover:-translate-y-0.5"><Film className="h-8 w-8 text-[#9DEBFF]" /><h2 className="mt-5 text-2xl font-black">Cinematic Gateway</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Explore original film, animation, comic, game, and world-building pathways.</p></Link><Link href="/episode-brief-builder" className="rounded-[1.6rem] border border-[#E8DFFF]/35 bg-[#E8DFFF]/[.05] p-6 transition hover:-translate-y-0.5"><Images className="h-8 w-8 text-[#E8DFFF]" /><h2 className="mt-5 text-2xl font-black">Episode Brief Builder</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Turn a selected source direction into a complete original production record.</p></Link></div></section>
    </main>
  );
}
