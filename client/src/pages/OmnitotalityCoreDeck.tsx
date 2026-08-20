import { useMemo, useState } from "react";
import { ArrowRight, Box, Clapperboard, Copy, Download, FileWarning, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type DeckRecord = {
  id: string;
  lane: string;
  title: string;
  source: string;
  preparation: string;
  visualCue: string;
  operatingBoundary: string;
  color: string;
  icon: typeof Box;
};

const DECK_RECORDS: readonly DeckRecord[] = [
  {
    id: "apparel",
    lane: "APPAREL PREPARATION",
    title: "Tactical Mantle Visual System",
    source: "Owner-supplied Omnitotality Core Deck HTML/CSS and supplied screenshots.",
    preparation: "Translate the deck’s monochrome card hierarchy and evidence-first item display into a browser-local apparel concept record.",
    visualCue: "Obsidian field, cyan inspection line, amber source tag, and a clear creator-controlled artifact route.",
    operatingBoundary: "The source’s price, ETH value, physical claim, QR, product, and payout language is not a live ScrollVerse product, checkout, inventory, or transaction state.",
    color: "#9DEBFF",
    icon: Box,
  },
  {
    id: "guardian",
    lane: "ARTIFACT PREPARATION",
    title: "Guardian Array Release Record",
    source: "Owner-supplied Omnitotality Core Deck card and action-script example.",
    preparation: "Use the card’s compact status-and-boundary pattern to prepare source-led creator artifact records and future release gates.",
    visualCue: "A green integrity signal beside an amber release gate, never a simulated wallet or broadcast control.",
    operatingBoundary: "No mint, contract, wallet, biometric record, Polygon zkEVM broadcast, token, or blockchain node is active from this route.",
    color: "#B5F7CC",
    icon: ShieldCheck,
  },
  {
    id: "media",
    lane: "MEDIA PREPARATION",
    title: "Master IP Reel Direction",
    source: "Owner-supplied Omnitotality Core Deck media-vault card and script example.",
    preparation: "Turn master audio/video reel ideas into source-labeled visual treatment, narration, and release-record preparation.",
    visualCue: "A dark media bay with a visible source state, treatment brief, and direct path to the creator broadcast workspace.",
    operatingBoundary: "No master track, reel, 4K media file, streaming player, IPFS hub, frequency claim, or broadcast is active from this route.",
    color: "#DCC8FF",
    icon: Clapperboard,
  },
  {
    id: "episode24",
    lane: "NARRATIVE SOURCE",
    title: "Episode 24: Absolute Expansion",
    source: "Owner-supplied screenshot sequence containing a Google/Gemini narrative draft.",
    preparation: "Preserve the runtime-vault setting, draft roles, and evidence-loop imagery as an episodic source record for future creator-controlled development.",
    visualCue: "Amber telemetry across an obsidian operations room, paired with a source and scope label.",
    operatingBoundary: "The visible characters, dialogue, configuration, product, bank, provider, contract, ledger, deployment, and test-count statements are draft source material, not active operating state or released production.",
    color: "#FFCC4D",
    icon: Sparkles,
  },
];

function downloadJson(value: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function OmnitotalityCoreDeck() {
  useSovereignHeartbeat({ page: "omnitotality-core-deck" });
  const [selectedId, setSelectedId] = useState("apparel");
  const [reviewNote, setReviewNote] = useState("");
  const selected = useMemo(() => DECK_RECORDS.find((record) => record.id === selectedId) ?? DECK_RECORDS[0], [selectedId]);
  const output = { ...selected, reviewNote, sourceState: "protected-reference", externalAction: "none" };

  return <main className="min-h-screen bg-[#020202] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00FF88]/20 bg-[radial-gradient(circle_at_10%_15%,rgba(0,229,255,.14),transparent_26%),radial-gradient(circle_at_85%_5%,rgba(0,255,102,.13),transparent_25%),#020202]">
      <div className="container py-16 md:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episode-37-ledger-sync" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← EPISODE 37 REFERENCE</Link><span className="rounded-sm border border-[#00FF88]/45 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">SOURCE DECK · LOCAL PREPARATION ONLY</span></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE · OMNITOTALITY CORE DECK</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Design signals.<br/><span className="text-[#00FF88]">Source boundaries.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This protected-reference workspace turns the supplied card-grid, terminal, episodic, and media-vault ideas into source-led preparation records. Its interactions are browser-local review tools—not checkout, mint, stream, or deployment controls.</p></div><aside className="rounded-sm border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-7"><Layers3 className="h-9 w-9 text-[#B5F7CC]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CURRENT STATE</p><p className="mt-3 text-2xl font-black">Interface and production preparation available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No physical asset claim, checkout, mint, wallet, token, media stream, ledger write, contract, or runtime configuration is active from this page.</p></aside></div>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Omnitotality Core Deck Protected Reference" source="Owner-supplied Google/Gemini HTML/CSS/JavaScript deck and screenshots, including Episode 24 scene material." readiness="Inspect source cards, add a browser-local review note, copy/export a preparation record, and open connected verified local routes now." boundary="The supplied text does not establish live apparel commerce, an active mint, media broadcast, IPFS stream, banking configuration, ledger pin, smart contract, network deployment, or external runtime." /></section>

    <section className="container py-5"><div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div className="grid gap-3">{DECK_RECORDS.map((record) => { const Icon = record.icon; const active = selected.id === record.id; return <button key={record.id} type="button" onClick={() => { setSelectedId(record.id); toast.success("Protected deck record selected."); }} className="rounded-sm border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? `${record.color}AA` : `${record.color}35`, background: active ? `${record.color}14` : "rgba(255,255,255,.025)" }}><Icon className="h-7 w-7" style={{ color: record.color }}/><p className="mt-4 text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.lane}</p><h2 className="mt-2 text-xl font-black">{record.title}</h2></button>; })}</div><article className="rounded-sm border border-white/10 bg-[#070707] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.color }}>{selected.lane}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><div className="mt-6 grid gap-4"><div className="border p-5" style={{ borderColor: `${selected.color}4A`, background: `${selected.color}08` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>SOURCE CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p></div><div className="border border-[#00E5FF]/30 bg-[#00E5FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#9DEBFF]">PREPARATION PATH</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.preparation}</p><p className="mt-3 text-sm leading-7 text-[#B8C7D6]"><span className="font-mono text-[#9DEBFF]">VISUAL CUE · </span>{selected.visualCue}</p></div><div className="border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.05] p-5"><div className="flex gap-3"><FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-[#FFE09A]"/><div><p className="text-[10px] font-mono text-[#FFE09A]">OPERATING-STATE BOUNDARY</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.operatingBoundary}</p></div></div></div></div><textarea value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} placeholder="Browser-local design, narrative, or preparation note" className="mt-5 min-h-28 w-full rounded-sm border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(output, null, 2)); toast.success("Local protected deck record copied."); }} className="inline-flex items-center gap-2 rounded-sm border border-[#9DEBFF]/50 bg-[#9DEBFF]/10 px-4 py-3 text-xs font-black text-[#C8F5FF]"><Copy className="h-4 w-4"/> COPY RECORD</button><button type="button" onClick={() => { downloadJson(output, `scrollverse-omnitotality-${selected.id}-preparation.json`); toast.success("Local deck record exported."); }} className="inline-flex items-center gap-2 rounded-sm border px-4 py-3 text-xs font-black" style={{ borderColor: `${selected.color}77`, color: selected.color, background: `${selected.color}11` }}><Download className="h-4 w-4"/> JSON</button></div></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[{ href: "/episode-experience", title: "Episode Experience", text: "Open the current browser-local episodic development pathways.", color: "#DCC8FF", icon: Clapperboard }, { href: "/cover-art-storyworlds", title: "Cover Art Storyworlds", text: "Carry apparel and artifact visual cues into source-led creator visual records.", color: "#9DEBFF", icon: Box }, { href: "/creator-brand-registry", title: "Creator Registry", text: "Preserve names, visual identity, source context, and exact future action records.", color: "#B5F7CC", icon: ShieldCheck }, { href: "/sovereign-isolation-terminal", title: "Isolation Terminal", text: "Review local audit records and staged release gates.", color: "#FFE09A", icon: Layers3 }, { href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect this protected deck to the active workspace source trail.", color: "#FFB8E2", icon: FileWarning }, { href: "/creator-broadcast-preparation", title: "Broadcast Preparation", text: "Prepare media treatment and reference records without activating distribution.", color: "#DCC8FF", icon: ArrowRight }].map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="rounded-sm border p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${item.color}42`, background: `${item.color}07` }}><Icon className="h-8 w-8" style={{ color: item.color }}/><h2 className="mt-5 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: item.color }}>Open record <ArrowRight className="h-4 w-4"/></span></Link>; })}</div></section>
  </main>;
}
