import { useMemo, useState } from "react";
import { Archive, ArrowRight, BookOpenCheck, CheckCircle2, Compass, Frame, Landmark, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Artwork = {
  id: string;
  accession: string;
  title: string;
  attribution: string;
  description: string;
  ownerMeaning: string;
  evidence: string;
  state: string;
  color: string;
  imageState: string;
  nextEvidence: string;
};

const ARTWORKS: Artwork[] = [
  {
    id: "bridge-of-faith",
    accession: "SV-PHYS-ART-001",
    title: "Bridge of Faith",
    attribution: "Thomas Kinkade · Library Edition",
    description: "Owner-held framed landscape record with a stone bridge, flowing water, trees, flowering vegetation, and a luminous sky.",
    ownerMeaning: "A physical collection piece preserved with its acquisition statement, plaque context, condition trail, and digital evidence record.",
    evidence: "Full-object, close-up artwork, and clear plaque photographs are present. The visible plaque reads: Bridge of Faith / by Thomas Kinkade / Library Edition.",
    state: "Owner-held collection record available",
    color: "#FFCC4D",
    imageState: "Public image review required",
    nextEvidence: "Add back-of-frame, dimensions, certificate or edition documentation, and a dated condition note when available.",
  },
  {
    id: "cosmic-knowledge",
    accession: "SV-PHYS-ART-002",
    title: "Cosmic Knowledge Artwork",
    attribution: "Visible copyright context: 1990 · partial ‘By Kamal J.’ transcription",
    description: "Owner-held framed artwork showing a seated figure, books, supporting hands, planets, and a celestial field.",
    ownerMeaning: "Owner-authored interpretation: “This feels like me to me. I love this piece.”",
    evidence: "Full-object and close-up attribution photographs are present. The exact title, full artist name, edition, and medium remain research fields until clearer documentation is added.",
    state: "Owner-held collection record available",
    color: "#B98CFF",
    imageState: "Public image review required",
    nextEvidence: "Add a clear full signature/copyright photo, back-of-frame, dimensions, and any certificate or edition information.",
  },
];

const COLLECTION_RULES = [
  "Accession evidence stays linked to the specific physical object.",
  "The owner’s relationship to a work is visible as an owner-authored interpretation.",
  "Public display, reproduction, appraisal, compensation, sale, and tokenization remain separate item-level decisions.",
] as const;

export default function ArtMuseum() {
  useSovereignHeartbeat({ page: "art-museum" });
  const [activeId, setActiveId] = useState(ARTWORKS[0].id);
  const [intakeTitle, setIntakeTitle] = useState("");
  const [intakeAttribution, setIntakeAttribution] = useState("");
  const [intakeEvidence, setIntakeEvidence] = useState("");
  const [intakeNote, setIntakeNote] = useState("");
  const active = useMemo(() => ARTWORKS.find((artwork) => artwork.id === activeId) ?? ARTWORKS[0], [activeId]);
  const intakeDraft = useMemo(() => `SCROLLVERSE ART MUSEUM — LOCAL ACCESSION DRAFT\n\nWorking title: ${intakeTitle || "[Add title or descriptive working name]"}\nVisible attribution: ${intakeAttribution || "[Add plaque, signature, edition, or unknown status]"}\nEvidence available: ${intakeEvidence || "[Add front, label, back, dimensions, certificate, or condition evidence]"}\nOwner note: ${intakeNote || "[Add acquisition context or first-person interpretation]"}\n\nRequired before public display or token consideration: source photographs, object/condition fields, public-image rights decision, and a separate owner release.\n\nBoundary: This is browser-local preparation. It creates no public collection record, storage upload, artist contact, compensation, appraisal, listing, payment, wallet, token, or external provider action.`, [intakeAttribution, intakeEvidence, intakeNote, intakeTitle]);
  const copyIntakeDraft = async () => { try { await navigator.clipboard.writeText(intakeDraft); toast.success("Local accession draft copied."); } catch { toast.error("Copy is unavailable in this browser."); } };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#FFCC4D]/25 bg-[radial-gradient(circle_at_82%_9%,rgba(255,204,77,.20),transparent_23%),radial-gradient(circle_at_15%_82%,rgba(185,140,255,.18),transparent_34%),#050B1A]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:46px_46px]" aria-hidden="true" />
        <div className="container relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/scrollverse-atlas" className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">← RETURN TO SCROLLVERSE ATLAS</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">OWNER-HELD · SOURCE-LABELED · EVOLVING COLLECTION</span></div>
          <div className="mt-12 grid gap-8 xl:grid-cols-[1.08fr_.92fr] xl:items-end">
            <div><p className="text-xs font-mono tracking-[.22em] text-[#FFDEA0]">SCROLLVERSE ART MUSEUM</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Hold the object. <span className="text-[#DCC8FF]">Keep the story open.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A living museum for owner-held physical artworks. Each accession preserves the visible object, source evidence, provenance trail, owner-authored relationship, and the next record needed as the collection grows.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/scrollverse-atlas" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Explore the wider archive</Link><Link href="/source-study-library" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Open Source Study Library</Link></div></div>
            <aside className="rounded-[2rem] border border-[#FFCC4D]/40 bg-[linear-gradient(145deg,rgba(255,204,77,.14),rgba(7,20,38,.95)_58%)] p-7"><Landmark className="h-9 w-9 text-[#FFDEA0]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">COLLECTION STATUS</p><p className="mt-3 text-2xl font-black leading-tight">Two owner-held physical works are accessioned.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The museum evolves one evidence packet at a time. A new object can begin locally, then move through its own public-display, appraisal, licensing, artist-compensation, sale, or tokenization pathway when the collection record is ready.</p></aside>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="ScrollVerse Art Museum" source="Owner-provided physical-object photographs, visible plaque or attribution context, owner-held acquisition statements, and dated collection records." readiness="Two owner-held physical artworks are accessioned as source-labeled collection records. The museum can prepare future object records locally as the collection grows." boundary="The Museum keeps physical-object evidence, provenance context, and owner-authored interpretation together; authenticity, appraisal, market value, permissions, licensing, compensation, sale, payment, tokenization, wallet, and provider records each follow their dedicated collection path." /></section>

      <section className="container py-4"><div className="grid gap-5 xl:grid-cols-[.78fr_1.22fr]"><aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#AFC0CF]"><Archive className="h-4 w-4 text-[#FFCC4D]" />ACCESSED OBJECTS</div><div className="mt-5 space-y-3" role="tablist" aria-label="Art Museum collection"><button type="button" role="tab" aria-selected={activeId === ARTWORKS[0].id} onClick={() => setActiveId(ARTWORKS[0].id)} className="w-full rounded-2xl border p-5 text-left transition" style={{ borderColor: activeId === ARTWORKS[0].id ? ARTWORKS[0].color : "rgba(255,255,255,.10)", background: activeId === ARTWORKS[0].id ? "rgba(255,204,77,.10)" : "rgba(0,0,0,.12)" }}><p className="text-[10px] font-mono tracking-[.15em] text-[#FFDEA0]">{ARTWORKS[0].accession}</p><p className="mt-2 text-lg font-black">{ARTWORKS[0].title}</p><p className="mt-2 text-xs leading-5 text-[#AFC0CF]">{ARTWORKS[0].attribution}</p></button><button type="button" role="tab" aria-selected={activeId === ARTWORKS[1].id} onClick={() => setActiveId(ARTWORKS[1].id)} className="w-full rounded-2xl border p-5 text-left transition" style={{ borderColor: activeId === ARTWORKS[1].id ? ARTWORKS[1].color : "rgba(255,255,255,.10)", background: activeId === ARTWORKS[1].id ? "rgba(185,140,255,.11)" : "rgba(0,0,0,.12)" }}><p className="text-[10px] font-mono tracking-[.15em] text-[#DCC8FF]">{ARTWORKS[1].accession}</p><p className="mt-2 text-lg font-black">{ARTWORKS[1].title}</p><p className="mt-2 text-xs leading-5 text-[#AFC0CF]">{ARTWORKS[1].attribution}</p></button></div></aside>
        <article className="overflow-hidden rounded-[2rem] border p-7 sm:p-9" style={{ borderColor: `${active.color}66`, background: `radial-gradient(circle at 91% 8%, ${active.color}22, transparent 28%), #071426` }}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-mono tracking-[.16em]" style={{ color: active.color }}>{active.accession} · OWNER-HELD OBJECT</p><h2 className="mt-3 text-4xl font-black leading-tight">{active.title}</h2><p className="mt-2 text-sm font-black" style={{ color: active.color }}>{active.attribution}</p></div><span className="rounded-full border px-3 py-1.5 text-[10px] font-black tracking-[.12em]" style={{ borderColor: `${active.color}80`, color: active.color }}>{active.state.toUpperCase()}</span></div><div className="mt-7 grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><div><p className="text-base leading-8 text-[#D6E2EE]">{active.description}</p><div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.15em] text-[#AFC0CF]">OWNER RELATIONSHIP</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{active.ownerMeaning}</p></div></div><div className="rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.15em] text-[#AFC0CF]">VISIBLE EVIDENCE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{active.evidence}</p><p className="mt-5 text-[10px] font-mono tracking-[.15em]" style={{ color: active.color }}>{active.imageState.toUpperCase()}</p></div></div><div className="mt-5 rounded-2xl border p-5" style={{ borderColor: `${active.color}44`, background: `${active.color}0D` }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: active.color }}>NEXT EVIDENCE</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{active.nextEvidence}</p></div></article></div></section>

      <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.055] p-7 sm:p-9"><Frame className="h-8 w-8 text-[#9DEBFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">COLLECTION IN MOTION</p><h2 className="mt-3 text-3xl font-black">Every added work begins with its story and record.</h2><div className="mt-6 space-y-3">{COLLECTION_RULES.map((rule, index) => <div key={rule} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9DEBFF]" /><div><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">0{index + 1}</p><p className="mt-1 text-sm leading-6 text-[#D6E2EE]">{rule}</p></div></div>)}</div></article><aside className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#B98CFF]/[.06] p-7 sm:p-9"><Sparkles className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">FUTURE ACQUISITION PATH</p><h2 className="mt-3 text-3xl font-black">The next object can arrive with its own source trail.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Prepare a full front image, label or signature detail, back/frame detail, dimensions, acquisition context, and an owner-authored note. The next Museum update then begins with a rich evidence trail and living collection memory.</p><Link href="/co-creation-navigator" className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#B98CFF]/55 px-5 py-3 text-sm font-black text-[#DCC8FF] transition hover:bg-[#B98CFF] hover:text-[#071426]">Open collection preparation path <ArrowRight className="h-4 w-4" /></Link></aside></div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#DCC8FF]/35 bg-[radial-gradient(circle_at_94%_8%,rgba(185,140,255,.18),transparent_30%),#071426] p-7 sm:p-9"><div className="grid gap-7 xl:grid-cols-[.9fr_1.1fr]"><div><Compass className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">BROWSER-LOCAL ACCESSION DRAFT</p><h2 className="mt-3 text-3xl font-black">Prepare the next object before it enters the record.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Use this desk for the first museum note when a new work arrives. Copy the draft into an owner archive, then attach source photographs and documentation in a later evidence review. Nothing here is stored or published automatically.</p><div className="mt-6 rounded-2xl border border-[#DCC8FF]/25 bg-[#B98CFF]/[.07] p-5"><p className="text-[10px] font-mono tracking-[.15em] text-[#DCC8FF]">EVIDENCE CHECK</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Front view · label/signature · frame/back · dimensions · acquisition context · condition note · public-display decision.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono tracking-[.14em] text-[#AFC0CF]">WORKING TITLE<input value={intakeTitle} onChange={(event) => setIntakeTitle(event.target.value)} placeholder="e.g. Cosmic Knowledge Artwork" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#DCC8FF]/70" /></label><label className="text-xs font-mono tracking-[.14em] text-[#AFC0CF]">VISIBLE ATTRIBUTION<input value={intakeAttribution} onChange={(event) => setIntakeAttribution(event.target.value)} placeholder="Plaque, signature, edition, or unknown" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#DCC8FF]/70" /></label><label className="sm:col-span-2 text-xs font-mono tracking-[.14em] text-[#AFC0CF]">EVIDENCE AVAILABLE<textarea value={intakeEvidence} onChange={(event) => setIntakeEvidence(event.target.value)} rows={3} placeholder="Front photo, close-up label, back, dimensions, certificate, condition note…" className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-[#DCC8FF]/70" /></label><label className="sm:col-span-2 text-xs font-mono tracking-[.14em] text-[#AFC0CF]">OWNER NOTE<textarea value={intakeNote} onChange={(event) => setIntakeNote(event.target.value)} rows={3} placeholder="What this object means to you or how it entered the collection…" className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-[#DCC8FF]/70" /></label><button type="button" onClick={copyIntakeDraft} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCC8FF]/55 px-5 py-3 text-sm font-black text-[#DCC8FF] transition hover:bg-[#DCC8FF] hover:text-[#071426]"><ShieldCheck className="h-4 w-4" />Copy local accession draft</button></div></div></div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#00FF88]/30 bg-[#00FF88]/[.05] p-7 sm:p-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><BookOpenCheck className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">CONNECTIONS</p><h2 className="mt-3 text-3xl font-black">The Museum belongs to a living archive, not a locked room.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Source study, provenance, original creation, public display, and future release each retain their own operating record. The Art Museum provides a stable home for the physical object inside that wider network.</p></div><div className="flex flex-wrap gap-3"><Link href="/art-learning-studio" className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#071426]">Art Learning Studio</Link><Link href="/scrollverse-atlas" className="rounded-xl border border-[#00FF88]/45 px-5 py-3 text-sm font-black text-[#B5F7CC]">ScrollVerse Atlas</Link><Link href="/source-study-library" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-black text-[#D6E2EE]">Source Study Library</Link></div></div></div></section>
    </main>
  );
}
