import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Eye, FileImage, Layers3, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const visualBoards = [
  {
    id: "SV-VIS-490-001",
    title: "Sovereign Form Studies",
    eyebrow: "PERSONAL-BRAND VISUAL STUDY",
    image: "/manus-storage/chais_bust_gold_transparent_4f1b33be.png",
    accent: "#FFCC4D",
    state: "Display-ready reference",
    note: "Three owner-provided bust variants establish a visual anchor for future editorial, identity, and lookbook direction.",
    next: "Item-specific visual treatment, accessibility text, and owner release",
  },
  {
    id: "SV-VIS-490-002",
    title: "Sticker Edition Language",
    eyebrow: "GRAPHIC ARTIFACT BOARD",
    image: "/manus-storage/chais_sticker_pack_88fa05cd.png",
    accent: "#00FF88",
    state: "Display-ready reference",
    note: "An owner-provided sticker pack and variant language for future packaging, digital artifact, and creator-world exploration.",
    next: "Selected-variant review, display context, and exact release record",
  },
  {
    id: "SV-VIS-490-003",
    title: "Holographic Signal Pack",
    eyebrow: "MOTION-READY CONCEPT",
    image: "/manus-storage/chais_holographic_pack_8e1ce73d.png",
    accent: "#DCC8FF",
    state: "Display-ready reference",
    note: "A holographic owner-brand reference that can inform movement, shimmer, typography, and future interactive visual direction.",
    next: "Motion treatment brief, contrast review, and approved destination",
  },
  {
    id: "SV-VIS-490-004",
    title: "Black & Gold World Poster",
    eyebrow: "WORLD-BUILDING POSTER",
    image: "/manus-storage/scrollverse_black_gold_poster_8f8560c4.webp",
    accent: "#FFB800",
    state: "Display-ready reference",
    note: "An owner-provided ScrollVerse poster reference for lookbook atmosphere, campaign world-building, and first-party visual discovery.",
    next: "Campaign context, rights record, and owner-approved publishing destination",
  },
] as const;

const lookbookLanes = [
  { title: "Look Concept", detail: "Silhouette, color, material language, and visual story—presented as a concept record before a garment claim.", icon: Sparkles, accent: "#FFCC4D" },
  { title: "Display Reference", detail: "Owner-cleared visual references appear with accession IDs, accessibility notes, and their present display state.", icon: Eye, accent: "#00D4FF" },
  { title: "Release Record", detail: "A public look, product, license, campaign, or commerce pathway needs its own source, rights, terms, destination, and approval record.", icon: CheckCircle2, accent: "#00FF88" },
] as const;

export default function MetaAIArtifactsLookbooks() {
  useSovereignHeartbeat({ page: "meta-ai-artifacts-lookbooks" });
  const [selectedId, setSelectedId] = useState<string>(visualBoards[0].id);
  const selected = visualBoards.find((board) => board.id === selectedId) ?? visualBoards[0];

  const selectBoard = (id: string) => {
    setSelectedId(id);
    toast.success("Local lookbook board selected. No media, product, checkout, or publishing action was created.");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#DCC8FF]/25 bg-[radial-gradient(circle_at_82%_10%,rgba(185,140,255,.22),transparent_30%),radial-gradient(circle_at_7%_88%,rgba(255,184,0,.16),transparent_28%),#050B1A]">
        <div className="container py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">← RETURN TO SCROLLVERSE</Link>
            <span className="rounded-full border border-[#DCC8FF]/40 bg-[#DCC8FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#E8DFFF]">OWNER-BRAND VISUAL DISCOVERY · DISPLAY-READY REFERENCES</span>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-mono tracking-[.2em] text-[#DCC8FF]">META AI ARTIFACTS & LOOKBOOKS</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.92] md:text-7xl">Visual worlds, <span className="text-[#FFCC4D]">easy to enter.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A living discovery room for source-labeled owner-brand artifacts, visual concept boards, and future lookbook direction. Browse what is available now, then see the exact record needed before a concept becomes a released image set, motion work, product, campaign, or playable media piece.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/asset-registry" className="inline-flex items-center gap-2 rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Open Asset Registry <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/fashion-artifact-atlas" className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open Fashion Atlas <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/fashion-lookbook-experience" className="inline-flex items-center gap-2 rounded-xl border border-[#FF8A4C]/45 bg-[#FF8A4C]/10 px-5 py-3 text-sm font-black text-[#FFB26F]">Enter immersive lookbook <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-7">
              <Layers3 className="h-9 w-9 text-[#B5F7CC]" />
              <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">LOOKBOOK OPERATING STATE</p>
              <p className="mt-3 text-2xl font-black">Visual discovery is available now.</p>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">These are owner-authorized display references. They are not listings, product claims, price records, licenses, reproductions, lookbook publications, media players, or checkout flows.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens lane="Meta AI Artifacts & Lookbooks" source="Phase 490 owner-brand visual catalog; accessions SV-VIS-490-001 through SV-VIS-490-004." readiness="Four owner-authorized visual display references are available for browser-local discovery and concept direction." boundary="This page does not create a product, garment, license, campaign, media publication, player, checkout, payment, token, listing, or provider action." />
      </section>

      <section className="container py-8">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">SELECT A VISUAL BOARD</p><h2 className="mt-3 text-4xl font-black">The artifact room.</h2></div><p className="max-w-lg text-sm leading-7 text-[#B8C7D6]">Use the board selector to explore an existing owner-provided visual direction in this browser. Selection is not a request, release, or media action.</p></div>
        <div className="mt-7 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{visualBoards.map((board) => <button key={board.id} type="button" onClick={() => selectBoard(board.id)} className="rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5" style={{ borderColor: selectedId === board.id ? `${board.accent}AA` : `${board.accent}40`, background: selectedId === board.id ? `${board.accent}14` : "rgba(255,255,255,0.025)" }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: board.accent }}>{board.eyebrow}</p><h3 className="mt-2 text-lg font-black text-white">{board.title}</h3><p className="mt-2 text-xs leading-5 text-[#B8C7D6]">{board.state}</p></button>)}</div>
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.025] p-6 md:p-8"><div className="grid gap-7 md:grid-cols-[.85fr_1.15fr]"><div className="flex min-h-72 items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/30 p-6"><img src={selected.image} alt={`${selected.title} — selected owner-provided visual reference`} className="max-h-80 w-full object-contain" /></div><div><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: selected.accent }}>{selected.id} · {selected.eyebrow}</p><h3 className="mt-4 text-3xl font-black">{selected.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{selected.note}</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">NEXT LOOKBOOK RECORD</p><p className="mt-2 text-sm font-black text-white">{selected.next}</p><p className="mt-3 text-xs leading-6 text-[#B8C7D6]">The visual concept remains a display reference until its selected use, accessibility treatment, rights context, public destination, terms, and exact owner release are recorded.</p></div></div></div></article>
        </div>
      </section>

      <section className="container py-8"><div className="grid gap-5 md:grid-cols-3">{lookbookLanes.map((lane) => { const Icon = lane.icon; return <article key={lane.title} className="rounded-[1.8rem] border p-6" style={{ borderColor: `${lane.accent}45`, background: `${lane.accent}08` }}><Icon className="h-8 w-8" style={{ color: lane.accent }} /><h3 className="mt-5 text-2xl font-black">{lane.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{lane.detail}</p></article>; })}</div></section>

      <section className="container py-8"><div className="grid gap-5 lg:grid-cols-5"><Link href="/fashion-lookbook-experience" className="rounded-[1.8rem] border border-[#FF8A4C]/35 bg-[#FF8A4C]/[.05] p-6 transition-transform hover:-translate-y-0.5"><Sparkles className="h-8 w-8 text-[#FFB26F]" /><h3 className="mt-5 text-2xl font-black">Immersive Lookbook</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Move through interactive original fashion worlds with source and release state visible.</p></Link><Link href="/fashion-empire" className="rounded-[1.8rem] border border-[#FFB800]/35 bg-[#FFB800]/[.05] p-6 transition-transform hover:-translate-y-0.5"><Sparkles className="h-8 w-8 text-[#FFDEA0]" /><h3 className="mt-5 text-2xl font-black">Fashion Empire</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Explore original fashion worlds and separately gated brand pathways.</p></Link><Link href="/episodic-production-slate" className="rounded-[1.8rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.05] p-6 transition-transform hover:-translate-y-0.5"><BookOpen className="h-8 w-8 text-[#E8DFFF]" /><h3 className="mt-5 text-2xl font-black">Episodic Production Slate</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Develop source-labeled episode records before any script, performance, player, or release.</p></Link><Link href="/media-world-evidence-packets" className="rounded-[1.8rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.05] p-6 transition-transform hover:-translate-y-0.5"><FileImage className="h-8 w-8 text-[#9DEBFF]" /><h3 className="mt-5 text-2xl font-black">Media Evidence Packets</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Prepare individual source and release records before any media publication.</p></Link><Link href="/creator-media-packet" className="rounded-[1.8rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-6 transition-transform hover:-translate-y-0.5"><BookOpen className="h-8 w-8 text-[#B5F7CC]" /><h3 className="mt-5 text-2xl font-black">Creator Media Packet</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Build a local concept, source, access, and release packet for the next approved work.</p></Link></div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.05] p-7 md:p-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">PROTECTED SOURCE BOUNDARY</p><h2 className="mt-3 text-3xl font-black">More visual work enters through a record, not an assumption.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Social images, photo candidates, third-party likenesses, unseen look concepts, and unapproved episode media remain protected until the relevant source, purpose, rights, privacy, accessibility, and release record is complete.</p></div><LockKeyhole className="h-10 w-10 text-[#E8DFFF]" /></div></div></section>
    </main>
  );
}
