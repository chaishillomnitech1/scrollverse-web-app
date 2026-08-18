import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCheck, Copy, FileText, Film, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ProductionRecord = {
  id: string;
  title: string;
  treatment: string;
  tone: string;
};

const PRODUCTION_RECORDS: ProductionRecord[] = [
  { id: "SV-CAT-001", title: "CHAIS X", treatment: "Multi-panel self-portrait through original city-light, archive, and future-world imagery.", tone: "#00D4FF" },
  { id: "SV-CAT-002", title: "LETTER", treatment: "Written-message and memory-object visual essay.", tone: "#FF9CC4" },
  { id: "SV-CAT-003", title: "Ghetto Gospel", treatment: "Community-rise visual poem using original environments and cast.", tone: "#FFCC4D" },
  { id: "SV-CAT-004", title: "Bama", treatment: "Route, landscape, and personal-growth visual journey.", tone: "#B98CFF" },
  { id: "SV-CAT-005", title: "No Recipe", treatment: "Rule-breaking creative laboratory and performance study.", tone: "#00FF88" },
  { id: "SV-CAT-006", title: "Walk It Talk It", treatment: "Movement-led street-to-stage performance film.", tone: "#9DEBFF" },
  { id: "SV-CAT-007", title: "Just a Friend (Premix)", treatment: "Intimate correspondence and relationship-memory visual story.", tone: "#FFB8D1" },
  { id: "SV-CAT-008", title: "Chase Too Fast", treatment: "Kinetic pace-and-reflection visual narrative.", tone: "#D6C4FF" },
  { id: "SV-CAT-009", title: "Never Giving Up", treatment: "Persistence, craft, and homecoming visual documentary-poem.", tone: "#B5F7CC" },
  { id: "SV-CAT-010", title: "The Goat You Just Met", treatment: "Original hero-entry performance world with no third-party team marks or likenesses.", tone: "#FFDEA0" },
  { id: "SV-CAT-011", title: "PNB Vibez", treatment: "Night-color, texture, and mood-driven performance film.", tone: "#00D4FF" },
  { id: "SV-CAT-012", title: "Road to the Riches", treatment: "City-grid, work, and legacy journey visual essay.", tone: "#FF9CC4" },
];

const RELEASE_GATES = [
  { label: "Exact source and version", detail: "Final master, title/version, creator credit, and source location belong in the owner-controlled item record.", color: "#00D4FF" },
  { label: "Rights and contributors", detail: "Composition, master, artwork, footage, performers, samples, marks, likenesses, and contributors require item-specific context.", color: "#FFCC4D" },
  { label: "Accessible presentation", detail: "Captions, lyric sheet, transcript, audio-description plan, alt text, non-flashing review, and youth-safety guidance are prepared per item.", color: "#B5F7CC" },
  { label: "Destination and owner release", detail: "Destination, free/paid decision, territory, metadata, date, and final owner release require a separate item decision.", color: "#B98CFF" },
] as const;

export default function CatalogProductionDesk() {
  useSovereignHeartbeat({ page: "catalog-production-desk" });
  const [selectedId, setSelectedId] = useState(PRODUCTION_RECORDS[0].id);
  const selected = useMemo(() => PRODUCTION_RECORDS.find((record) => record.id === selectedId) ?? PRODUCTION_RECORDS[0], [selectedId]);

  const copyResearchBrief = async () => {
    const brief = [
      "SCROLLVERSE CATALOG PRODUCTION DESK — RESEARCH BRIEF",
      `Packet: ${selected.id}`,
      `Locally indexed title: ${selected.title}`,
      `Original visual treatment: ${selected.treatment}`,
      "Current operating state: research / requires owner release.",
      "Required before any production or release: exact source/version; rights and contributor records; accessibility and youth-safety plan; destination and free/paid decision; explicit owner release.",
      "This browser-local brief does not create a video, product, checkout, token, payment, public release, or distribution action.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Browser-local research brief copied. No release or commercial action was created.");
    } catch {
      toast.error("Copy was unavailable in this browser. The research fields remain visible on this page.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b border-[#FF6B9A]/25 bg-[radial-gradient(circle_at_88%_15%,rgba(255,107,154,.18),transparent_28%),radial-gradient(circle_at_9%_78%,rgba(0,212,255,.17),transparent_30%),#050B1A]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <div className="container relative py-12 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/direct-fan-catalog" className="text-xs font-mono tracking-[.16em] text-[#FFB8D1]">← RETURN TO DIRECT-TO-FAN CATALOG</Link><span className="rounded-full border border-[#FF6B9A]/45 bg-[#FF6B9A]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFB8D1]">ORIGINAL PRODUCTION · RELEASE-GATED</span></div>
        <div className="mt-12 grid gap-8 xl:grid-cols-[1.14fr_.86fr] xl:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#FF9CC4]">SCROLLVERSE CATALOG PRODUCTION DESK</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Every title gets a <span className="text-[#FFCC4D]">production record.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A reader-directed visual-production desk for the twelve locally indexed catalog titles. Choose a record, inspect its original treatment lane, and keep the source, rights, accessibility, contributor, destination, and owner-release work visible before any production or release decision.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#production-records" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Open production records</a><Link href="/scrollverse-atlas" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open the ScrollVerse Atlas</Link></div></div><aside className="relative overflow-hidden rounded-[2rem] border border-[#FF6B9A]/40 bg-[linear-gradient(145deg,rgba(255,107,154,.15),rgba(7,20,38,.95)_56%)] p-7"><Sparkles className="absolute -right-7 -top-7 h-36 w-36 text-[#FF6B9A]/10" /><div className="relative"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFB8D1]">OPERATING STATE</p><p className="mt-3 text-3xl font-black leading-tight">Research first. Release one item at a time.</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">This desk is available now as planning and discovery. It does not play, download, publish, sell, distribute, mint, or otherwise activate a catalog asset.</p><p className="mt-6 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">KUN FAYAKŪN × ∞</p></div></aside></div>
      </div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Catalog Production Desk" source="Twelve locally indexed titles in the Direct-to-Fan Catalog; the owner-provided Spotify artist URL recorded in the local production slate; and local per-song planning packets." readiness="Available now as a free production-planning and discovery route. Every packet remains research until its item-specific source, rights, accessibility, destination, and owner-release fields are complete." boundary="This desk does not fetch, embed, or distribute external catalog media; create a video, product, checkout, price, token, wallet action, license, or release; or treat a planning packet as a public availability or rights-clearance record." /></section>

    <section id="production-records" className="container scroll-mt-10 py-4"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">TWELVE LOCALLY INDEXED RECORDS</p><h2 className="mt-2 text-3xl font-black">Choose a record. Keep the conditions in frame.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">The selected record changes the browser-local planning display only. It does not change asset, media, release, or commercial state.</p></div><Headphones className="h-10 w-10 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-5 xl:grid-cols-[.78fr_1.22fr]"><div className="grid max-h-[740px] gap-2 overflow-y-auto pr-1" aria-label="Catalog production records">{PRODUCTION_RECORDS.map((record) => { const active = selected.id === record.id; return <button key={record.id} type="button" onClick={() => setSelectedId(record.id)} aria-current={active ? "true" : undefined} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: active ? record.tone : "rgba(255,255,255,.12)", background: active ? `${record.tone}14` : "rgba(255,255,255,.02)" }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: record.tone }}>{record.id} · RESEARCH</p><p className="mt-2 text-base font-black text-white">{record.title}</p></button>; })}</div><article className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${selected.tone}77`, background: `radial-gradient(circle at 88% 12%, ${selected.tone}20, transparent 26%), linear-gradient(145deg, rgba(255,255,255,.06), rgba(5,11,26,.96) 58%)` }}><Film className="absolute right-7 top-7 h-32 w-32 text-white/[.045]" /><div className="relative max-w-3xl"><p className="text-xs font-mono tracking-[.18em]" style={{ color: selected.tone }}>{selected.id} · ORIGINAL TREATMENT LANE</p><h3 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{selected.title}</h3><p className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-base leading-8 text-[#E4EDF5]">{selected.treatment}</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">CURRENT STATE</p><p className="mt-2 text-lg font-black" style={{ color: selected.tone }}>RESEARCH · ITEM-SPECIFIC</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The production packet is a planning record. The exact source, media, rights, and final version remain part of the owner-controlled release record.</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">CORRECTION PATH</p><p className="mt-2 text-lg font-black text-white">SOURCE, CREDIT, RIGHTS, VERSION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Add corrections through the item release packet before any publication or delivery decision.</p></div></div><button type="button" onClick={copyResearchBrief} className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ background: selected.tone }}><Copy className="h-4 w-4" />Copy browser-local research brief</button></div></article></div></section>

    <section className="mt-10 border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">RELEASE-GATE MATRIX</p><h2 className="mt-2 text-3xl font-black">Four conditions stay visible for every production record.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The desk carries forward the per-item record so a visual concept never gets separated from the evidence, accessibility, contributor, and release decision that must travel with it.</p></div><ShieldCheck className="h-10 w-10 text-[#B5F7CC]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{RELEASE_GATES.map((gate, index) => <article key={gate.label} className="rounded-3xl border bg-[#071426]/85 p-6" style={{ borderColor: `${gate.color}55` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: gate.color }}>0{index + 1} · REQUIRES OWNER RELEASE</p><h3 className="mt-3 text-xl font-black">{gate.label}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{gate.detail}</p></article>)}</div></div></section>

    <section className="container py-12"><div className="grid gap-5 lg:grid-cols-[1.12fr_.88fr]"><div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_86%_14%,rgba(0,212,255,.14),transparent_24%),#071426] p-7 sm:p-10"><ClipboardCheck className="h-8 w-8 text-[#9DEBFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">NEXT PREPARATION PATH</p><h2 className="mt-3 text-3xl font-black">Open the catalog. Then inspect the release work.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Return to Music Discovery for the wider source-labeled catalog, use the Direct-to-Fan Catalog for browser-local item briefs, or move through the Atlas to keep this work connected to the wider ScrollVerse record.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/music" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Music Discovery</Link><Link href="/direct-fan-catalog" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Direct-to-Fan Catalog</Link><Link href="/scrollverse-atlas" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">ScrollVerse Atlas</Link></div></div><aside className="rounded-[2rem] border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.07] p-7 sm:p-10"><FileText className="h-8 w-8 text-[#FFDEA0]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">SOURCE OR CORRECTION</p><h2 className="mt-3 text-2xl font-black">A stronger record is always welcome.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A source, credit, rights correction, accessibility note, contributor context, or production detail can be added to the ongoing record before a release decision is considered.</p><Link href="/co-creation-navigator" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#FFDEA0]">Open the Co-Creation Navigator <ArrowRight className="h-4 w-4" /></Link></aside></div></section>
  </main>;
}
