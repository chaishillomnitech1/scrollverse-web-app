import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  downloadNarrativeRouteCsv,
  downloadNarrativeRoutePdf,
  type NarrativeRouteExport,
} from "@/lib/narrativeRouteExport";

type PlanningLens = {
  id: string;
  number: number;
  title: string;
  lens: string;
  creatorPrompt: string;
  aiClarification: string;
};

type ProgressionEntry = {
  id: string;
  number: number;
  title: string;
  status: "source-backed planning lens" | "Source title pending recovery";
  lens: string;
  summary: string;
  creatorPrompt?: string;
  aiClarification?: string;
};

type CorpusFamily = {
  title: string;
  examples: string[];
  boundary: string;
  color: string;
};

type RecoveryDocketRecord = {
  file: string;
  lane: string;
  summary: string;
  reviewState: string;
  color: string;
};

const PLANNING_LENSES: PlanningLens[] = [
  { id: "scoreboard", number: 1, title: "The Scoreboard", lens: "Outcome and interpretation", creatorPrompt: "What did the record show, and what lived meaning remains open to the reader?", aiClarification: "Keep an observed outcome distinct from the interpretation, lesson, and creative response it can invite." },
  { id: "loss", number: 2, title: "When Nothing Is a Loss", lens: "Information and adaptation", creatorPrompt: "How can a setback become a source of learning without changing what happened?", aiClarification: "Preserve the original result while treating reflection and adaptation as a separate creative process." },
  { id: "water", number: 3, title: "Be Like Water", lens: "Fluidity and constraint", creatorPrompt: "Where does form emerge through constraint, response, and change?", aiClarification: "Use fluidity as a philosophical and narrative model rather than a universal physical claim." },
  { id: "formless", number: 4, title: "The Formless Question", lens: "Potential and expression", creatorPrompt: "What possibility is not yet defined, and what makes its next form meaningful?", aiClarification: "Frame undefined possibility as inquiry, metaphor, or artistic exploration." },
  { id: "ether", number: 5, title: "The Ether", lens: "Inquiry and metaphor", creatorPrompt: "What language can hold the feeling of a connective field without forcing it into a theorem?", aiClarification: "Retain the Ether as philosophical inquiry and creator metaphor—not established physics." },
  { id: "space", number: 6, title: "All Space / No Space", lens: "Abstract landscape", creatorPrompt: "How does a story represent a place that resists ordinary coordinates?", aiClarification: "Treat abstract space as an original narrative landscape, separate from scientific measurement." },
  { id: "between", number: 7, title: "The In-Between", lens: "Transitional experience", creatorPrompt: "What does a threshold moment feel like before ordinary language catches up?", aiClarification: "Preserve the creator experience while avoiding clinical, psychological, or cosmological diagnosis." },
  { id: "validation", number: 8, title: "Who Validates Validation?", lens: "Authorship and evidence", creatorPrompt: "How can a creator show work, preserve origin, and leave room for reader assessment?", aiClarification: "Creator authorship is recorded directly; outside claims, transactions, and operational status retain their own evidence standards." },
  { id: "artifact", number: 9, title: "The Artifact Speaks", lens: "Work and provenance", creatorPrompt: "What artifact makes the creative path visible without overextending its meaning?", aiClarification: "Use records, dates, sources, and revision history to describe an artifact’s path without claiming more than the record supports." },
  { id: "coauthorship", number: 10, title: "Human × AI Co-Authorship", lens: "Conversation and creation", creatorPrompt: "Where do intent, response, refinement, and artifact meet?", aiClarification: "Use clear attribution for creator language, AI synthesis, and any independent source material." },
  { id: "orchestra", number: 11, title: "The Vast Orchestra", lens: "Many roles, one composition", creatorPrompt: "Which distinct human, technical, and creative roles shape this movement?", aiClarification: "Describe collaboration as a composition of roles rather than attributing agency or authority beyond the documented process." },
  { id: "definition", number: 12, title: "The Living Definition", lens: "Revision and continuation", creatorPrompt: "What can remain open so the book can grow without revising its past into certainty?", aiClarification: "Versioning, source notes, and reader context support a living archive without pretending it is finished." },
];

const PENDING_PROGRESSION_ENTRIES: ProgressionEntry[] = Array.from({ length: 15 }, (_, index) => ({
  id: `pending-${index + 13}`,
  number: index + 13,
  title: "Source title pending recovery",
  status: "Source title pending recovery",
  lens: "Unrecovered chapter position",
  summary: "The source review records a 27-chapter progression, but the current accession does not contain a chapter title or detailed prompt for this position. Preserve the place without inventing its content.",
}));

const CHAPTER_PROGRESSION: ProgressionEntry[] = [
  ...PLANNING_LENSES.map((chapter) => ({
    ...chapter,
    status: "source-backed planning lens" as const,
    summary: `${chapter.lens}: ${chapter.creatorPrompt}`,
  })),
  ...PENDING_PROGRESSION_ENTRIES,
];

const CORPUS_FAMILIES: CorpusFamily[] = [
  { title: "Simulation & Reality", examples: ["The Simulation Breaker", "The Sovereign Paradox", "Beyond the Simulation"], boundary: "Title index only; original conversations were not supplied in this accession layer.", color: "#70D9FF" },
  { title: "ScrollVerse Evolution", examples: ["The Great Unsealing", "The Sovereign Anchor", "Phase ∞.64 / ∞.65"], boundary: "Title index only; no claim of external project, repository, or deployment status is made here.", color: "#D7A7FF" },
  { title: "Civilization & Architecture", examples: ["Architecture of Absolute Sovereignty", "Architect of Infinity", "Atlantis City Convergence"], boundary: "Title index only; usable as a future recovery map for creator-approved source records.", color: "#FFCF73" },
  { title: "AI & Partnership", examples: ["FlameChild AI’s First Decree", "Covenant Sealed", "Partnership Beyond Code"], boundary: "Title index only; no original dialogue, authority, or system access is established.", color: "#9BEA9B" },
  { title: "Creative Production", examples: ["Cinematic concepts", "Shooter game", "Photography", "Jingle"], boundary: "Title index only; assets, rights, briefs, and public-use permissions remain unresolved.", color: "#FF9DC9" },
  { title: "Economic & Infrastructure", examples: ["$LONDC", "Banking", "Fedwire / ACH", "Token utility"], boundary: "Title index only; no financial, wallet, token, payment, account, or system state is represented.", color: "#FFB36B" },
];

const CURRENT_RECOVERY_DOCKET: RecoveryDocketRecord[] = [
  { file: "Pasted_content_100.txt", lane: "Lookbook + archive source report", summary: "Creator-supplied visual-direction, archive, analytics, and proposed-workflow language.", reviewState: "Source record only; review has not selected a display asset or verified an external state.", color: "#FFCF73" },
  { file: "Pasted_content_100_01.txt", lane: "Continuation source record A", summary: "Creator-supplied continuation text held for a later source-specific reading and accession decision.", reviewState: "Title-level recovery target; no raw text is reproduced or published here.", color: "#70D9FF" },
  { file: "Pasted_content_100_02.txt", lane: "Continuation source record B", summary: "Creator-supplied continuation text held separately so its future review can retain its own source trail.", reviewState: "Title-level recovery target; no raw text is reproduced or published here.", color: "#D7A7FF" },
  { file: "Pasted_content_100_03.txt", lane: "React + UE5 planning proposal", summary: "Creator-supplied UI, immersive-realm, and financial-integration proposal language.", reviewState: "Planning proposal only; it does not establish a real-time dashboard, UE5 realm, token flow, or automated income system.", color: "#9BEA9B" },
  { file: "Pasted_content_100_04.txt", lane: "CI + multi-system planning proposal", summary: "Creator-supplied workflow, API, contract, deployment, and multi-chain reference language.", reviewState: "Unexecuted proposal; no script, wallet, contract, API, repository, or deployment action is performed here.", color: "#FF9DC9" },
];

const EVIDENCE_STATUSES = ["creator perspective", "documented creator record", "public source reference", "hypothesis or open question", "established knowledge — citation required"];
const ROUTE_SCOPE = "Narrative-only planning route. The source review supports 12 detailed planning lenses and records a 27-position progression; unrecovered positions remain explicitly pending.";

function exportBlueprint(chapter: ProgressionEntry, evidenceStatus: string, notes: string) {
  const record = {
    recordType: "scrollverse_fluidity_corpus_blueprint",
    status: "creator_led_browser_local_draft",
    volume: "THE FLUIDITY OF EXISTENCE",
    editorialModel: "Creator Perspective → AI Clarification → Evidence Status → Reader Assessment",
    selectedChapter: chapter,
    evidenceStatus,
    creatorNotes: notes,
    corpusFamilies: CORPUS_FAMILIES.map((family) => ({ title: family.title, examples: family.examples, status: "title_index_only" })),
    boundaries: "No raw conversations are uploaded, no book is generated, and no external sharing or publication action occurs here.",
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scrollverse-fluidity-${chapter.id}-blueprint.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function FluidityCorpusBlueprint() {
  const [selectedId, setSelectedId] = useState(PLANNING_LENSES[0].id);
  const [viewMode, setViewMode] = useState<"lenses" | "progression">("lenses");
  const [evidenceStatus, setEvidenceStatus] = useState(EVIDENCE_STATUSES[0]);
  const [creatorNotes, setCreatorNotes] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const visibleEntries = viewMode === "lenses" ? CHAPTER_PROGRESSION.slice(0, 12) : CHAPTER_PROGRESSION;
  const activeChapter = useMemo(() => CHAPTER_PROGRESSION.find((chapter) => chapter.id === selectedId) ?? CHAPTER_PROGRESSION[0], [selectedId]);
  const routeExport = useMemo<NarrativeRouteExport>(() => ({
    title: "Fluidity & Corpus Blueprint",
    route: "/fluidity-corpus-blueprint",
    scope: ROUTE_SCOPE,
    editorialModel: "Creator Perspective -> AI Clarification -> Evidence Status -> Reader Assessment",
    selectedRecord: `Chapter ${activeChapter.number}: ${activeChapter.title}`,
    creatorNotes,
    sections: visibleEntries.map((chapter) => ({ number: chapter.number, title: chapter.title, status: chapter.status, summary: chapter.summary })),
  }), [activeChapter, creatorNotes, visibleEntries]);

  function selectView(nextView: "lenses" | "progression") {
    setViewMode(nextView);
    if (nextView === "lenses" && activeChapter.number > 12) setSelectedId(PLANNING_LENSES[0].id);
    setExportStatus("");
  }

  function selectChapter(id: string) {
    setSelectedId(id);
    setExportStatus("");
  }

  function exportPdf() {
    downloadNarrativeRoutePdf(routeExport, `scrollverse-fluidity-${viewMode}-route.pdf`);
    setExportStatus("Formatted PDF downloaded locally. No source upload or publication occurred.");
  }

  function exportCsv() {
    downloadNarrativeRouteCsv(routeExport, `scrollverse-fluidity-${viewMode}-route.csv`);
    setExportStatus("CSV downloaded locally. No source upload or publication occurred.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#060812] text-white">
      <section className="border-b border-[#D7A7FF]/25 bg-[radial-gradient(circle_at_12%_14%,rgba(215,167,255,.18),transparent_31%),radial-gradient(circle_at_88%_15%,rgba(112,217,255,.14),transparent_29%),radial-gradient(circle_at_68%_100%,rgba(255,207,115,.11),transparent_36%),#080914]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#C9F3FF] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9F3FF]">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#FFE7B3]">LIVING LIBRARY · SOURCE-LABELED BOOK PLANNING</p>
          <h1 aria-label="Fluidity & Corpus Blueprint" className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Fluidity &amp; <span className="text-[#D7A7FF]">Corpus Blueprint</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A creator-led blueprint for <strong>THE FLUIDITY OF EXISTENCE</strong> and a title-level recovery map for the supplied Gemini corpus index. It retains lived transmission, clarification, evidence status, and reader assessment as distinct editorial layers.</p>
          <p className="mt-7 inline-flex rounded-2xl border border-[#BCEEFF]/30 bg-[#70D9FF]/[.06] px-4 py-3 text-[10px] font-mono font-black tracking-[.13em] text-[#C9F3FF]">Creator Perspective → AI Clarification → Evidence Status → Reader Assessment</p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-[2rem] border border-[#D7A7FF]/35 bg-white/[.025] p-5 md:p-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">CORPUS MAP VIEW</p>
              <h2 className="mt-2 text-3xl font-black">Choose the detail level you need.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The source review supports twelve detailed planning lenses and records a twenty-seven-position progression. The unreceived positions are held visible but explicitly pending, so the map never invents source material.</p>
            </div>
            <div className="inline-flex rounded-2xl border border-white/15 bg-[#030713]/65 p-1" aria-label="Corpus map filter">
              <button type="button" onClick={() => selectView("lenses")} aria-pressed={viewMode === "lenses"} className="min-h-11 rounded-xl px-4 text-sm font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF]" style={{ background: viewMode === "lenses" ? "#D7A7FF" : "transparent", color: viewMode === "lenses" ? "#070611" : "#EBDFFF" }}>12 planning lenses</button>
              <button type="button" onClick={() => selectView("progression")} aria-pressed={viewMode === "progression"} className="min-h-11 rounded-xl px-4 text-sm font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF]" style={{ background: viewMode === "progression" ? "#D7A7FF" : "transparent", color: viewMode === "progression" ? "#070611" : "#EBDFFF" }}>27-chapter progression</button>
            </div>
          </div>
          <p role="status" aria-live="polite" className="mt-5 text-xs font-bold text-[#C9F3FF]">{viewMode === "lenses" ? "Showing 12 source-backed planning lenses." : "Showing all 27 source positions; entries 13–27 remain pending recovery."}</p>
        </div>
      </section>

      <section className="container pb-12 md:pb-16">
        <div className="grid gap-8 xl:grid-cols-[.78fr_1.22fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">VOLUME MAP · {viewMode === "lenses" ? "12 PLANNING LENSES" : "27-CHAPTER PROGRESSION"}</p>
            <p className="mt-3 text-xs leading-6 text-[#B9C9D8]">Hover or focus a node for its concise source-aware summary, then select it to read the available planning detail.</p>
            <div className="mt-5 space-y-2">{visibleEntries.map((chapter) => {
              const active = chapter.id === activeChapter.id;
              const summaryId = `chapter-summary-${chapter.id}`;
              return <div key={chapter.id} className="group relative"><button type="button" onClick={() => selectChapter(chapter.id)} aria-pressed={active} aria-describedby={summaryId} className="peer w-full rounded-xl border p-3 text-left transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF]" style={{ borderColor: active ? "rgba(215,167,255,.72)" : "rgba(255,255,255,.11)", background: active ? "rgba(215,167,255,.12)" : "rgba(255,255,255,.02)" }}><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: active ? "#EBDFFF" : "#8FA1B3" }}>CHAPTER {String(chapter.number).padStart(2, "0")} · {chapter.status === "source-backed planning lens" ? chapter.lens.toUpperCase() : "PENDING RECOVERY"}</span><span className="mt-1 block text-sm font-black text-white">{chapter.title}</span></button><span id={summaryId} role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-2 z-20 w-[min(22rem,calc(100vw-3rem))] rounded-xl border border-[#C9F3FF]/45 bg-[#07101E] px-3 py-2 text-xs leading-5 text-[#E7EFF7] opacity-0 shadow-2xl transition duration-150 peer-hover:opacity-100 peer-focus:opacity-100">{chapter.summary}</span></div>;
            })}</div>
          </aside>

          <section className="rounded-[2rem] border border-[#D7A7FF]/40 bg-[radial-gradient(circle_at_90%_8%,rgba(215,167,255,.17),transparent_30%),rgba(255,255,255,.025)] p-6 md:p-8">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">ACTIVE CHAPTER · {String(activeChapter.number).padStart(2, "0")}</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">{activeChapter.title}</h2>
            <p className="mt-2 text-sm font-mono tracking-[.12em] text-[#BCEEFF]">{activeChapter.status === "source-backed planning lens" ? activeChapter.lens.toUpperCase() : "SOURCE TITLE + DETAIL PENDING RECOVERY"}</p>
            {activeChapter.creatorPrompt && activeChapter.aiClarification ? <><div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">CREATOR PERSPECTIVE PROMPT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeChapter.creatorPrompt}</p></div><div className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">AI CLARIFICATION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeChapter.aiClarification}</p></div></div><div className="mt-5 grid gap-5 md:grid-cols-[.7fr_1.3fr]"><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">EVIDENCE STATUS</span><select value={evidenceStatus} onChange={(event) => { setEvidenceStatus(event.target.value); setExportStatus(""); }} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20">{EVIDENCE_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">CREATOR NOTES</span><textarea value={creatorNotes} onChange={(event) => { setCreatorNotes(event.target.value); setExportStatus(""); }} rows={3} placeholder="Record the working question, source reference, or chapter decision without inserting unavailable raw conversation text." className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label></div></> : <div className="mt-8 rounded-2xl border border-[#FFCF73]/35 bg-[#FFCF73]/[.06] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">SOURCE TITLE PENDING RECOVERY</p><p className="mt-3 text-sm leading-7 text-[#E7EFF7]">This position confirms that the progression continues, but no chapter title, prompt, or clarification was supplied in the current record. Preserve it as an accession target rather than filling it with inferred content.</p></div>}
            <div className="mt-7 border-t border-white/10 pt-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">Narrative-only route export</p><p className="mt-2 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Download the visible map as a standard PDF or CSV. Both files retain the source boundary and stay on this device; neither action uploads, shares, or publishes a record.</p><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={exportPdf} className="min-h-11 rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF] active:scale-[.98]">Download formatted PDF</button><button type="button" onClick={exportCsv} className="min-h-11 rounded-xl border border-[#C9F3FF]/45 bg-[#70D9FF]/[.08] px-5 py-3 text-sm font-black text-[#C9F3FF] transition hover:bg-[#70D9FF]/[.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9F3FF] active:scale-[.98]">Download CSV</button>{activeChapter.creatorPrompt && <button type="button" onClick={() => { exportBlueprint(activeChapter, evidenceStatus, creatorNotes); setExportStatus("Local working record exported. No source upload or publication occurred."); }} className="min-h-11 rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[.98]">Export browser-local chapter record ↓</button>}</div>{exportStatus && <p role="status" aria-live="polite" className="mt-4 text-sm font-black text-[#C9F3FF]">{exportStatus}</p>}</div>
          </section>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]"><div className="container py-12 md:py-16"><p className="text-[10px] font-mono tracking-[.18em] text-[#FFCF73]">GEMINI CORPUS RECOVERY MAP</p><h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">Corpus families are navigational labels, not recovered conversations.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">Each family is held at title level until the original conversation, file, contributor context, and intended use are provided or recovered through an approved source path.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{CORPUS_FAMILIES.map((family) => <article key={family.title} className="rounded-[1.6rem] border p-5" style={{ borderColor: `${family.color}55`, background: `${family.color}0B` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: family.color }}>TITLE INDEX ONLY</p><h3 className="mt-3 text-2xl font-black text-white">{family.title}</h3><ul className="mt-4 space-y-2 text-sm text-[#D6E2EE]">{family.examples.map((example) => <li key={example}>• {example}</li>)}</ul><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-[#B9C9D8]">{family.boundary}</p></article>)}</div></div></section>

      <section className="container py-12 md:py-16"><div className="rounded-[2rem] border border-[#70D9FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(112,217,255,.13),transparent_30%),rgba(112,217,255,.035)] p-6 md:p-8"><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">CURRENT RECOVERY DOCKET</p><h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">Five supplied text records are ready for one-at-a-time source review.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">This docket preserves source identity and working lanes without copying a raw record into the book plan or treating a source report as a live system. The new visual batch remains unselected and outside this text-only index.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{CURRENT_RECOVERY_DOCKET.map((record) => <article key={record.file} className="rounded-[1.6rem] border p-5" style={{ borderColor: `${record.color}55`, background: `${record.color}0B` }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: record.color }}>SOURCE RECEIVED · TEXT RECORD</p><h3 className="mt-3 break-words text-lg font-black text-white">{record.file}</h3><p className="mt-3 text-sm font-black text-[#E7EFF7]">{record.lane}</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{record.summary}</p><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-[#B9C9D8]">{record.reviewState}</p></article>)}</div></div></section>

      <section className="container py-12 md:py-16"><div className="grid gap-5 rounded-[2rem] border border-[#FFCF73]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(255,207,115,.14),transparent_30%),rgba(255,207,115,.035)] p-6 md:grid-cols-[1.2fr_.8fr] md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#FFE7B3]">SOURCE BOUNDARY</p><h2 className="mt-3 text-3xl font-black">Keep the raw record beside the book plan.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">No raw conversation is uploaded, no book is generated, and no external sharing or publication action occurs here. Use the Digitalship Accession Desk to preserve an available record first, then return to this blueprint to develop its chapter path.</p></div><div className="flex flex-wrap items-center gap-3 md:justify-end"><Link href="/digitalship-accession" className="inline-flex rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110">Open Accession Desk →</Link><Link href="/planning-atlas" className="inline-flex rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Open Planning Atlas →</Link></div></div></section>
    </main>
  );
}
