import { useMemo, useState } from "react";
import { Link } from "wouter";

const SOURCE_URL = "https://github.com/chaishillomnitech1/infininillionaire-film-foundation-phase-66-omega";

type FilmChapter = {
  id: "queensbridge" | "mansion" | "veil" | "world" | "thothibis";
  title: string;
  act: string;
  color: string;
  premise: string;
  planningQuestion: string;
  developmentFocus: string;
};

type LearningModule = {
  id: string;
  title: string;
  status: "ready" | "building" | "planned";
  detail: string;
  accent: string;
};

const LEARNING_MODULES: LearningModule[] = [
  { id: "source-led", title: "Source-Led Storycraft", status: "ready", detail: "Provenance labels, creator context, and review questions are mapped locally.", accent: "#9BEA9B" },
  { id: "world-building", title: "Quantum World-Building", status: "building", detail: "Rooms, thresholds, and accessibility prompts are being assembled as a local draft.", accent: "#D7A7FF" },
  { id: "release-readiness", title: "Release Readiness", status: "planned", detail: "A future checklist for captions, rights notes, destinations, and owner review.", accent: "#FFCF73" },
];

function LearningModuleDashboard() {
  const [moduleStatusFilter, setModuleStatusFilter] = useState<"all" | LearningModule["status"]>("all");
  const filteredModules = useMemo(
    () => moduleStatusFilter === "all" ? LEARNING_MODULES : LEARNING_MODULES.filter(module => module.status === moduleStatusFilter),
    [moduleStatusFilter],
  );

  return (
    <section aria-labelledby="learning-module-dashboard-title" className="mt-8 rounded-[2rem] border border-[#9BEA9B]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(155,234,155,.12),transparent_32%),rgba(155,234,155,.035)] p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono tracking-[.18em] text-[#B9F4B9]">BLACK MANSION · BROWSER-LOCAL STATUS</p>
          <h2 id="learning-module-dashboard-title" className="mt-2 text-3xl font-black text-white">Learning Module Dashboard</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#E2DEEF]">Auto-generated learning modules are tracked as local planning records. Nothing is published, scheduled, or deployed from this dashboard.</p>
        </div>
        <div role="group" aria-label="Filter learning modules by status" className="flex flex-wrap gap-2">
          {(["all", "ready", "building", "planned"] as const).map(status => (
            <button key={status} type="button" aria-pressed={moduleStatusFilter === status} onClick={() => setModuleStatusFilter(status)} className="min-h-10 rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B9F4B9]" style={{ borderColor: moduleStatusFilter === status ? "rgba(185,244,185,.7)" : "rgba(255,255,255,.15)", background: moduleStatusFilter === status ? "rgba(155,234,155,.15)" : "rgba(255,255,255,.03)", color: moduleStatusFilter === status ? "#B9F4B9" : "#B9C7D6" }}>{status}</button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3" aria-live="polite">
        {filteredModules.map(module => (
          <article key={module.id} className="rounded-2xl border border-white/10 bg-[#070611]/65 p-5 transition hover:-translate-y-1" style={{ boxShadow: `0 14px 30px ${module.accent}12` }}>
            <div className="flex items-center justify-between gap-3"><span className="h-3 w-3 rounded-full" aria-hidden="true" style={{ background: module.accent, boxShadow: `0 0 14px ${module.accent}` }} /><span className="text-[10px] font-mono uppercase tracking-[.14em]" style={{ color: module.accent }}>{module.status}</span></div>
            <h3 className="mt-4 text-lg font-black text-white">{module.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#E2DEEF]">{module.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs font-mono text-[#B9C7D6]">Showing {filteredModules.length} of {LEARNING_MODULES.length} local module records.</p>
    </section>
  );
}

const FILM_CHAPTERS: FilmChapter[] = [
  {
    id: "queensbridge",
    title: "Queensbridge",
    act: "ACT I · THE FIRST SIGNAL",
    color: "#8AE8FF",
    premise: "An original neighborhood-scale opening where memory, ambition, and the first creative signal meet.",
    planningQuestion: "What does the audience need to see, hear, and understand before the world opens beyond familiar streets?",
    developmentFocus: "Character stakes, place research, dialogue intent, and rights-safe visual references.",
  },
  {
    id: "mansion",
    title: "Quantum Mansion",
    act: "ACT II · THE HOUSE OF POSSIBILITIES",
    color: "#D7A7FF",
    premise: "An original speculative estate where rooms function as choices, memories, and future-facing creative thresholds.",
    planningQuestion: "Which room changes the protagonist’s understanding of what can be built—and what must remain human-led?",
    developmentFocus: "Production design, interaction rules, accessibility, and original-world visual language.",
  },
  {
    id: "veil",
    title: "Beyond the Veil",
    act: "ACT III · THE SOURCE CROSSING",
    color: "#9BEA9B",
    premise: "A source-aware passage that asks how personal myth, creator memory, and documented record can coexist without becoming one another.",
    planningQuestion: "What source trail stays visible when a symbolic experience changes the direction of the story?",
    developmentFocus: "Provenance design, creator-context labels, review roles, and visual continuity.",
  },
  {
    id: "world",
    title: "Before the World Blows",
    act: "ACT IV · THE CHOICE WINDOW",
    color: "#FFCF73",
    premise: "An original urgency chapter focused on care, responsibility, and the cost of choosing a future before pressure turns into spectacle.",
    planningQuestion: "Which character decision turns a grand vision into a specific, accountable act of care?",
    developmentFocus: "Conflict, consequence, community perspective, and grounded resolution beats.",
  },
  {
    id: "thothibis",
    title: "THOTHIBIS",
    act: "ACT V · THE MEMORY KEEPER",
    color: "#FF9DC9",
    premise: "A final original world-state where memory, art, and future-making are carried forward through an accountable record.",
    planningQuestion: "What does the film leave behind for the next creator, character, or community to question and build upon?",
    developmentFocus: "Legacy image, sound motif, source archive, access notes, and an honest ending state.",
  },
];

function downloadFilmRecord(chapter: FilmChapter) {
  const record = {
    recordType: "scrollverse_infininillionaire_film_foundation_planning_record",
    status: "creator_authored_browser_local_draft",
    sourceLabel: "INFININILLIONAIRE Film Foundation — Phase-66-Omega",
    publicRepository: SOURCE_URL,
    selectedChapter: {
      title: chapter.title,
      act: chapter.act,
      premise: chapter.premise,
      planningQuestion: chapter.planningQuestion,
      developmentFocus: chapter.developmentFocus,
    },
    sourceScope: "Public repository supplies a high-level creative arc only; it does not supply a screenplay, production bible, rights packet, schedule, or budget.",
    actionBoundary: "No production, rights clearance, financial, token, account, or release action occurs here.",
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `infininillionaire-${chapter.id}-planning-record.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function InfininillionaireFilmFoundation() {
  const [activeChapterId, setActiveChapterId] = useState<FilmChapter["id"]>("queensbridge");
  const activeChapter = useMemo(
    () => FILM_CHAPTERS.find((chapter) => chapter.id === activeChapterId) ?? FILM_CHAPTERS[0],
    [activeChapterId],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050C] text-white">
      <section className="relative border-b border-[#D7A7FF]/25 bg-[radial-gradient(circle_at_12%_16%,rgba(138,232,255,.17),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(215,167,255,.16),transparent_30%),radial-gradient(circle_at_70%_100%,rgba(255,207,115,.10),transparent_34%),#090811]">
        <div className="container relative py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#B6EEFF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#FFCF73]">PUBLIC SOURCE · CREATOR-LED CINEMATIC PLANNING</p>
          <h1 className="mt-4 max-w-6xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">INFININILLIONAIRE<br/><span className="text-[#D7A7FF]">Film Foundation</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#E2DEEF]">A creator-authored cinematic planning record built from the reviewed public project label and its high-level five-part arc. This workspace develops original story structure and source-aware production questions; it does not represent a completed screenplay, a live production, or a release package.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-mono tracking-[.14em]">
            <span className="rounded-full border border-[#B6EEFF]/45 bg-[#B6EEFF]/10 px-3 py-2 text-[#C9F3FF]">PUBLIC SOURCE LABEL</span>
            <span className="rounded-full border border-[#D7A7FF]/45 bg-[#D7A7FF]/10 px-3 py-2 text-[#EBDFFF]">FIVE-PART ARC</span>
            <span className="rounded-full border border-[#FFCF73]/45 bg-[#FFCF73]/10 px-3 py-2 text-[#FFE7B3]">LOCAL RECORD · NO RELEASE ACTION</span>
          </div>
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-xl border border-[#B6EEFF]/45 bg-[#B6EEFF]/[.07] px-5 py-3 text-sm font-black text-[#C9F3FF] transition hover:brightness-125">View public source repository ↗</a>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.74fr_1.26fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#FFCF73]">CHAPTER CONSTELLATION</p>
            <div className="mt-5 space-y-3">
              {FILM_CHAPTERS.map((chapter, index) => {
                const active = chapter.id === activeChapter.id;
                return (
                  <button key={chapter.id} type="button" onClick={() => setActiveChapterId(chapter.id)} aria-pressed={active} className="w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? `${chapter.color}A6` : "rgba(255,255,255,.13)", background: active ? `${chapter.color}15` : "rgba(255,255,255,.025)", boxShadow: active ? `0 16px 36px ${chapter.color}13` : "none" }}>
                    <span className="text-[10px] font-mono tracking-[.16em]" style={{ color: chapter.color }}>0{index + 1} · {chapter.act}</span>
                    <span className="mt-2 block text-lg font-black text-white">{chapter.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.06] p-4">
              <p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">ACTION BOUNDARY</p>
              <p className="mt-2 text-sm leading-6 text-[#EEEAF6]">No production, rights clearance, financial, token, account, or release action occurs here.</p>
            </div>
          </aside>

          <section className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: `${activeChapter.color}66`, background: `radial-gradient(circle_at_88%_8%, ${activeChapter.color}17, transparent 34%), rgba(255,255,255,.025)` }}>
            <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeChapter.color }}>{activeChapter.act}</p>
            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">{activeChapter.title}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#070611]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeChapter.color }}>ORIGINAL STORY PREMISE</p><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">{activeChapter.premise}</p></div>
              <div className="rounded-2xl border border-white/10 bg-[#070611]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeChapter.color }}>DEVELOPMENT QUESTION</p><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">{activeChapter.planningQuestion}</p></div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#070611]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeChapter.color }}>PLANNING FOCUS</p><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">{activeChapter.developmentFocus}</p></div>
            <button type="button" onClick={() => downloadFilmRecord(activeChapter)} className="mt-6 rounded-xl px-5 py-3 text-sm font-black text-[#080611] transition hover:brightness-110 active:scale-[.98]" style={{ background: activeChapter.color }}>Export local {activeChapter.title} record ↓</button>
          </section>
        </div>
        <LearningModuleDashboard />
      </section>

      <section className="border-y border-white/10 bg-[#0A0913]">
        <div className="container py-12 md:py-16">
          <p className="text-[10px] font-mono tracking-[.18em] text-[#D7A7FF]">FROM ARC TO ACCOUNTABLE CREATIVE WORK</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">Keep the cinematic energy. Keep the source trail.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link href="/seven-episode-series" className="group rounded-[1.6rem] border border-[#B6EEFF]/35 bg-[#B6EEFF]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">01 · SEASON DESIGN</p><h3 className="mt-3 text-2xl font-black text-white">Seven-Episode Series</h3><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">Translate a chapter into an original season structure without filling in unconfirmed production facts.</p><span className="mt-5 inline-flex text-sm font-black text-[#C9F3FF]">Open the season board →</span></Link>
            <Link href="/episode-brief-builder?foundation=filmFoundation" className="group rounded-[1.6rem] border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">02 · BRIEF DEVELOPMENT</p><h3 className="mt-3 text-2xl font-black text-white">Brief the Film Foundation</h3><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">Carry the selected chapter’s narrative and source context forward, then complete visual, sound, rights, accessibility, destination, and release fields before any production consideration.</p><span className="mt-5 inline-flex text-sm font-black text-[#EBDFFF]">Open local brief builder →</span></Link>
            <Link href="/special-repository" className="group rounded-[1.6rem] border border-[#FFCF73]/35 bg-[#FFCF73]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">03 · SOURCE REVIEW</p><h3 className="mt-3 text-2xl font-black text-white">Special Repository</h3><p className="mt-3 text-sm leading-7 text-[#E2DEEF]">Preserve source context, authorship notes, access status, and corrections without making a source record a live system claim.</p><span className="mt-5 inline-flex text-sm font-black text-[#FFE7B3]">Open source records →</span></Link>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-[2rem] border border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_92%_10%,rgba(215,167,255,.13),transparent_30%),rgba(215,167,255,.035)] p-6 md:p-8">
          <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">SOURCE SCOPE</p>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-[#EEEAF6]">The reviewed public repository provides a project identity and high-level arc. It does not itself supply a full screenplay, production bible, rights clearance packet, budget, schedule, casting record, technical deployment, or release evidence. Those records stay separately owner-controlled if and when a production advances.</p>
        </div>
      </section>
    </main>
  );
}
