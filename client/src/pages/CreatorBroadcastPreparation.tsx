import { useMemo, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, ClipboardCheck, FileDown, RadioTower, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Track = {
  id: string;
  label: string;
  source: string;
  purpose: string;
  record: string;
  destination: string;
  destinationLabel: string;
};

const TRACKS: Track[] = [
  {
    id: "catalog",
    label: "Catalog reference intake",
    source: "Viral Empire replay",
    purpose: "Turn a creator-owned master, official lyric text, and optional timed lyric cues into an item-specific preparation record.",
    record: "Artist-owned master reference · official lyric text · timed-cue file (optional) · owner release decision",
    destination: "/creator-media-packet",
    destinationLabel: "Creator Media Packet",
  },
  {
    id: "treatments",
    label: "Track visual treatments",
    source: "Portal Copy replay",
    purpose: "Build concise visual treatment and production-specification briefs for selected music or story releases.",
    record: "Track title · visual world · duration · format · language · narration direction · source links",
    destination: "/visual-story-worlds",
    destinationLabel: "Visual Story Worlds",
  },
  {
    id: "channel",
    label: "Channel reference review",
    source: "Top-3 YouTube replay",
    purpose: "Keep owner-identified source channels and videos in a browser-local research index before deciding any original distribution plan.",
    record: "Source URL · owner identification · review note · intended learning or discovery use · original-content separation",
    destination: "/creator-media-packet",
    destinationLabel: "Creator Media Packet",
  },
  {
    id: "royalty",
    label: "Creator royalty readiness",
    source: "Royalty transformation replay",
    purpose: "Prepare an item-specific record for any future creator royalty or distribution review without representing a live payout or transfer state.",
    record: "Asset ID · creator attribution · destination · payment route · exact approval · relevant external evidence",
    destination: "/activation-dossier",
    destinationLabel: "Activation Dossier",
  },
];

export default function CreatorBroadcastPreparation() {
  useSovereignHeartbeat({ page: "creator-broadcast-preparation" });
  const [selected, setSelected] = useState<string>("catalog");
  const active = useMemo(() => TRACKS.find(track => track.id === selected) ?? TRACKS[0], [selected]);

  const copyRecord = () => {
    const text = `${active.label}\nSource: ${active.source}\nPurpose: ${active.purpose}\nRequired record: ${active.record}`;
    navigator.clipboard?.writeText(text).then(() => toast.success("Local preparation record copied.")).catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  const exportWorkbook = () => {
    const text = ["SCROLLVERSE — CREATOR BROADCAST PREPARATION", "Browser-local preparation workbook", "", ...TRACKS.flatMap(track => [track.label, `Source: ${track.source}`, `Purpose: ${track.purpose}`, `Required record: ${track.record}`, ""])].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scrollverse-creator-broadcast-preparation.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Local preparation workbook exported.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
    <section className="border-b border-cyan-300/15 bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,.18),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(185,140,255,.16),transparent_25%)]">
      <div className="container py-16 md:py-24">
        <p className="font-mono text-xs tracking-[.24em] text-[#00D4FF]">CREATOR BROADCAST PREPARATION</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Build the signal.<br /><span className="text-[#B98CFF]">Keep every source clear.</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A browser-local preparation desk for creator catalogs, visual treatments, channel research, and future royalty review. Each lane starts with the record that makes the next move useful.</p>
        <button onClick={exportWorkbook} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#050B1A] hover:bg-[#D5BDFF]"><FileDown className="h-4 w-4" />Export preparation workbook</button>
      </div>
    </section>

    <section className="container py-10">
      <PortalTrustLens lane="Creator broadcast preparation" source="Six supplied replay references and the Phase 613 source consolidation record" readiness="Browser-local preparation available now" boundary="This workspace does not connect a channel, upload a master, publish lyrics, distribute media, create a royalty payment, or execute a financial or provider action." />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {TRACKS.map(track => <button key={track.id} onClick={() => setSelected(track.id)} className={`rounded-3xl border p-5 text-left transition ${selected === track.id ? "border-[#00D4FF]/70 bg-[#00D4FF]/10" : "border-white/10 bg-white/[.025] hover:border-white/25"}`}>
          <p className="font-mono text-[10px] tracking-widest text-[#00D4FF]">{track.source.toUpperCase()}</p>
          <h2 className="mt-3 text-lg font-black">{track.label}</h2>
          <p className="mt-3 text-xs leading-5 text-slate-400">{track.purpose}</p>
        </button>)}
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-white/[.035] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="font-mono text-xs tracking-widest text-[#00FF88]">SELECTED PREPARATION LANE</p><h2 className="mt-3 text-3xl font-black">{active.label}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{active.purpose}</p></div>
          <RadioTower className="h-9 w-9 text-[#FFB800]" />
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto]">
          <div className="rounded-2xl bg-[#050B1A] p-5"><p className="text-xs font-black text-[#B5F7CC]">BUILD THIS RECORD</p><p className="mt-3 text-sm leading-6 text-slate-300">{active.record}</p></div>
          <div className="flex flex-wrap content-start gap-3">
            <Link href={active.destination} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Sparkles className="h-4 w-4" />{active.destinationLabel}</Link>
            <button onClick={copyRecord} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-black hover:bg-white/15"><ClipboardCheck className="h-4 w-4" />Copy record</button>
          </div>
        </div>
      </article>

      <aside className="mt-8 rounded-3xl border border-[#FFB800]/25 bg-[#FFB800]/[.045] p-6"><div className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#FFB800]" /><div><h2 className="font-black">From preparation to release, one decision at a time</h2><p className="mt-2 text-sm leading-6 text-slate-300">The source records show an expanding creative system. This desk keeps its working sequence clear: collect the correct creator record, prepare the relevant brief, and move only the specific item that has its own release decision.</p></div></div></aside>
    </section>
  </main>;
}
