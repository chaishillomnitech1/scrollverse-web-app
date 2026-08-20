import { useMemo, useState } from "react";
import { ArrowRight, Copy, Film, Image, Music2, Sparkles, Waves } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const COVER_RECORDS = [
  {
    id: "COVER-001",
    title: "Pnb Rock Vibes",
    type: "CONFIRMED PUBLIC RECORD",
    asset: "/manus-storage/pnb-rock-vibes-spotify-cover_63f56cb7.jpg",
    alt: "Sepia cover portrait of a smiling person with glasses inside a glowing gold sunburst above dark mountains, titled PNB VIBEZ.",
    source: "Public Spotify oEmbed track metadata and Apple Music artist-page listing",
    world: "The Golden Frequency Overlook",
    cartoon: "A traveler follows a gold sound path across an evening mountain range until the sun-shaped signal becomes a shared beacon.",
    motion: "Slow halo expansion, horizon parallax, drifting dust, and a visitor-controlled visual pulse.",
    state: "AVAILABLE NOW",
    color: "#FFE09A",
  },
  {
    id: "COVER-002",
    title: "Throwing Stones",
    type: "OWNER-SUPPLIED DISCOVERY LEAD",
    asset: null,
    alt: "No cover source has been supplied for this catalog candidate yet.",
    source: "Owner-supplied catalog attachment and public smart-link context; visible cover source pending",
    world: "Ripple Constellation",
    cartoon: "One stone opens rings of light that turn a city path into a star map.",
    motion: "A single impact becomes expanding rings, then scene panels; final cover art will guide the visual system.",
    state: "RESEARCH",
    color: "#9DEBFF",
  },
] as const;

export default function CoverArtStoryworlds() {
  useSovereignHeartbeat({ page: "cover-art-storyworlds" });
  const [selectedId, setSelectedId] = useState<string>(COVER_RECORDS[0].id);
  const selected = useMemo(() => COVER_RECORDS.find(record => record.id === selectedId) ?? COVER_RECORDS[0], [selectedId]);

  const copyDirection = async () => {
    await navigator.clipboard.writeText(`${selected.title}\nWorld: ${selected.world}\nCartoon: ${selected.cartoon}\nMotion: ${selected.motion}\nState: ${selected.state}`);
    toast.success("Cover storyworld direction copied locally.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_17%_11%,rgba(255,184,0,.18),transparent_25%),radial-gradient(circle_at_83%_14%,rgba(185,140,255,.18),transparent_25%),#050B1A]">
      <div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/scrollverse-story-worlds" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← STORY WORLDS</Link><span className="rounded-full border border-[#FFE09A]/40 bg-[#FFB800]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">COVER-LED CATALOG WORLDS</span></div><p className="mt-12 text-xs font-mono tracking-[.22em] text-[#FFE09A]">SCROLLVERSE MUSIC + VISUAL CATALOG</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Every cover opens a <span className="text-[#DCC8FF]">world.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Cover Art Storyworlds turns visible catalog sources into browser-local narrative, cartoon, motion-art, legacy, and release-preparation records. Each record keeps its cover source and operating state clear so new catalog material can enter the same connected system.</p></div>
    </section>
    <section className="container py-8"><PortalTrustLens lane="Cover Art Storyworlds" source="Public Spotify and Apple Music metadata, owner-supplied catalog context, and browser-local visual direction records." readiness="The current cover records and visual directions are available now; additional covers enter through source-led intake." boundary="This page does not distribute music, use audio, publish animation, list a product, mint an NFT, set rarity, connect a wallet, or activate a marketplace." /></section>
    <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]"><div className="space-y-3">{COVER_RECORDS.map(record => <button key={record.id} onClick={() => setSelectedId(record.id)} className="w-full rounded-[1.5rem] border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === record.id ? `${record.color}75` : "rgba(255,255,255,.1)", background: selectedId === record.id ? `${record.color}12` : "rgba(255,255,255,.025)" }}><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.id}</p><span className="text-[9px] font-mono" style={{ color: record.color }}>{record.state}</span></div><h2 className="mt-4 text-2xl font-black">{record.title}</h2><p className="mt-2 text-sm text-[#B8C7D6]">{record.world}</p></button>)}</div><article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-6 md:p-8"><div className="grid gap-7 md:grid-cols-[.8fr_1.2fr]">{selected.asset ? <img src={selected.asset} alt={selected.alt} className="aspect-square w-full rounded-2xl border border-[#FFE09A]/30 object-cover" /> : <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-[#9DEBFF]/35 bg-[#00D4FF]/[.05] p-6 text-center"><div><Image className="mx-auto h-9 w-9 text-[#9DEBFF]" /><p className="mt-4 text-xs font-mono tracking-[.14em] text-[#9DEBFF]">COVER SOURCE PENDING</p><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">The story direction is ready to receive the visible cover.</p></div></div>}<div><p className="text-xs font-mono tracking-[.16em]" style={{ color: selected.color }}>{selected.state}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><p className="mt-3 text-sm leading-7 text-[#B8C7D6]">Source: {selected.source}</p><div className="mt-6 space-y-4"><div><p className="text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">STORY WORLD</p><p className="mt-2 font-bold text-white">{selected.world}</p></div><div><p className="text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">CARTOON DIRECTION</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{selected.cartoon}</p></div><div><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">MOTION DIRECTION</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{selected.motion}</p></div></div><button onClick={copyDirection} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#DCC8FF]/40 bg-[#B98CFF]/10 px-4 py-3 text-xs font-black text-[#E8DFFF]"><Copy className="h-4 w-4" /> COPY LOCAL DIRECTION</button></div></div></article></div></section>
    <section className="container py-8"><div className="grid gap-4 md:grid-cols-3">{[{ icon: Film, title: "Film + cartoon", text: "A concise scene path that grows from the cover’s visible world instead of replacing it.", color: "#DCC8FF" }, { icon: Waves, title: "Motion art", text: "A visitor-controlled visual rhythm brief for future animated interpretation.", color: "#9DEBFF" }, { icon: Music2, title: "Catalog stewardship", text: "A source, platform, cover, and owner-review record that can travel with each release.", color: "#FFE09A" }].map(item => { const Icon = item.icon; return <article key={item.title} className="rounded-[1.7rem] border border-white/10 bg-white/[.025] p-6"><Icon className="h-8 w-8" style={{ color: item.color }} /><h2 className="mt-5 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p></article> })}</div></section>
    <section className="container py-8"><div className="grid gap-4 lg:grid-cols-3"><Link href="/catalog-stewardship" className="rounded-[1.7rem] border border-[#FFE09A]/35 bg-[#FFB800]/[.05] p-6 transition hover:-translate-y-1"><Sparkles className="h-8 w-8 text-[#FFE09A]" /><h2 className="mt-5 text-2xl font-black">Catalog Stewardship</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Trace public release sources, cover records, distributor references, and local review fields.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#FFE09A]">Open catalog record <ArrowRight className="h-4 w-4" /></span></Link><Link href="/public-footprint" className="rounded-[1.7rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.05] p-6 transition hover:-translate-y-1"><Music2 className="h-8 w-8 text-[#9DEBFF]" /><h2 className="mt-5 text-2xl font-black">Public footprint</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Review platform records, source links, visible titles, dates, and correction paths.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">Open source trail <ArrowRight className="h-4 w-4" /></span></Link><Link href="/fair-practice" className="rounded-[1.7rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-6 transition hover:-translate-y-1"><Sparkles className="h-8 w-8 text-[#B5F7CC]" /><h2 className="mt-5 text-2xl font-black">Fair Practice Navigator</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use creator-first review questions before a release, correction, or next-step decision.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#B5F7CC]">Open review guide <ArrowRight className="h-4 w-4" /></span></Link></div></section>
  </main>;
}
