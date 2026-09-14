import { useMemo, useState } from "react";
import { Link } from "wouter";

type RebirthLane = {
  id: "tree" | "water" | "knowledge";
  label: string;
  subtitle: string;
  accent: string;
  source: string;
  sourceLabel: string;
  creatorIntent: string;
  planningPrompt: string;
  safeguards: string[];
};

const LANES: RebirthLane[] = [
  {
    id: "tree",
    label: "Tree",
    subtitle: "Land, native systems, and regenerative story craft",
    accent: "#9BEA9B",
    source: "https://www.fao.org/forestry/our-focus/forest-management/assisted-natural-regeneration/en",
    sourceLabel: "FAO · Assisted natural regeneration",
    creatorIntent: "The creator-supplied Rebirth record frames trees as a bridge between restoration, community care, and an original ScrollVerse world language.",
    planningPrompt: "What original scene, character choice, or local research record makes regeneration visible without claiming a real-world restoration outcome?",
    safeguards: ["Choose a real location only with local context and permission.", "Match any ecological method to qualified local partners and site conditions.", "Record source, consent, and intended outcome before calling a project active."],
  },
  {
    id: "water",
    label: "Water",
    subtitle: "Rivers, coasts, wetlands, and dignity for living systems",
    accent: "#70D9FF",
    source: "https://www.unep.org/news-and-stories/story/beginners-guide-ecosystem-restoration",
    sourceLabel: "UNEP · Ecosystem restoration guide",
    creatorIntent: "The creator-supplied Water Guardian concept treats clean water, aquatic life, and community wellbeing as connected narrative priorities.",
    planningPrompt: "Which water-life relationship belongs in the story, and what evidence would distinguish a cinematic concept from a field project?",
    safeguards: ["Do not portray cleanup, treatment, or restoration as complete without measured records.", "Keep ecological, public-health, and local-community decisions with qualified human partners.", "Separate visual symbolism from environmental measurements or permits."],
  },
  {
    id: "knowledge",
    label: "Knowledge",
    subtitle: "Provenance, source review, and human-governed memory",
    accent: "#DCC8FF",
    source: "https://iucn.org/our-work/topic/ecosystem-restoration-and-land-degradation",
    sourceLabel: "IUCN · Ecosystem restoration and land degradation",
    creatorIntent: "The creator-supplied Living Codex and ScrollChain concepts treat authorship, sources, access choices, and correction paths as part of the work itself.",
    planningPrompt: "Which sources, permissions, review roles, and release decisions make this story record durable enough to revisit?",
    safeguards: ["Keep source records, creator narrative, and external verification distinguishable.", "Keep AI in a research and synthesis role; human review owns consequential decisions.", "Do not turn a planning record into a governance vote, signature, or release action."],
  },
];

function downloadLocalRecord(lane: RebirthLane) {
  const record = {
    recordType: "scrollverse_rebirth_living_codex_planning_record",
    status: "creator_led_browser_local_draft",
    selectedLane: lane.label,
    creatorIntent: lane.creatorIntent,
    planningPrompt: lane.planningPrompt,
    externalResearchReference: {
      label: lane.sourceLabel,
      url: lane.source,
      reviewStatus: "external_reference_only",
    },
    safeguards: lane.safeguards,
    actionBoundary: "No field intervention, funding, token, DAO, or release action occurs here.",
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scrollverse-rebirth-${lane.id}-planning-record.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function RebirthLivingCodex() {
  const [activeLaneId, setActiveLaneId] = useState<RebirthLane["id"]>("tree");
  const activeLane = useMemo(
    () => LANES.find((lane) => lane.id === activeLaneId) ?? LANES[0],
    [activeLaneId],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#030914] text-white">
      <section className="relative border-b border-[#8DE0FF]/20 bg-[radial-gradient(circle_at_14%_12%,rgba(112,217,255,.17),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(155,234,155,.12),transparent_28%),#050B16]">
        <div className="container relative py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#9DEBFF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#9BEA9B]">REBIRTH PROTOCOL · SOURCE-LABELED PLANNING</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.91] tracking-tight md:text-7xl">Rebirth &amp; <span className="text-[#9DEBFF]">Living Codex</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A creator-led planning record for original Tree, Water, and Knowledge story lanes. It preserves an ecological and provenance-centered vision without presenting a concept board as a field program, a funding mechanism, or an external release.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-mono tracking-[.14em]">
            <span className="rounded-full border border-[#9BEA9B]/45 bg-[#9BEA9B]/10 px-3 py-2 text-[#C8F7C8]">CREATOR-LED PLANNING RECORD</span>
            <span className="rounded-full border border-[#70D9FF]/45 bg-[#70D9FF]/10 px-3 py-2 text-[#BCEEFF]">THREE CONNECTED LANES</span>
            <span className="rounded-full border border-[#DCC8FF]/45 bg-[#DCC8FF]/10 px-3 py-2 text-[#E8DFFF]">LOCAL EXPORT · NO EXTERNAL ACTION</span>
          </div>
          <Link href="/episode-brief-builder?foundation=rebirth" className="mt-7 inline-flex rounded-xl border border-[#DCC8FF]/45 bg-[#DCC8FF]/[.08] px-5 py-3 text-sm font-black text-[#E8DFFF] transition hover:-translate-y-0.5">Carry Rebirth context into a local brief →</Link>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.78fr_1.22fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#9DEBFF]">CHOOSE A LENS</p>
            <div className="mt-5 space-y-3">
              {LANES.map((lane) => {
                const active = lane.id === activeLane.id;
                return (
                  <button key={lane.id} type="button" onClick={() => setActiveLaneId(lane.id)} aria-pressed={active} className="w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? `${lane.accent}99` : "rgba(255,255,255,.13)", background: active ? `${lane.accent}14` : "rgba(255,255,255,.025)", boxShadow: active ? `0 16px 36px ${lane.accent}13` : "none" }}>
                    <span className="text-[10px] font-mono tracking-[.16em]" style={{ color: lane.accent }}>LANE · {lane.label.toUpperCase()}</span>
                    <span className="mt-2 block text-lg font-black text-white">{lane.subtitle}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4">
              <p className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">ACTION BOUNDARY</p>
              <p className="mt-2 text-sm leading-6 text-[#E7EFF7]">No field intervention, funding, token, DAO, or release action occurs here.</p>
            </div>
          </aside>

          <section className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: `${activeLane.accent}66`, background: `radial-gradient(circle_at_88%_8%, ${activeLane.accent}17, transparent 34%), rgba(255,255,255,.025)` }}>
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeLane.accent }}>ACTIVE LENS · {activeLane.label.toUpperCase()}</p>
                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{activeLane.subtitle}</h2>
              </div>
              <a href={activeLane.source} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-4 py-3 text-xs font-black transition hover:brightness-125" style={{ borderColor: `${activeLane.accent}70`, background: `${activeLane.accent}12`, color: activeLane.accent }}>Read {activeLane.sourceLabel} ↗</a>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#020817]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeLane.accent }}>CREATOR CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeLane.creatorIntent}</p></div>
              <div className="rounded-2xl border border-white/10 bg-[#020817]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeLane.accent }}>SCENE QUESTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeLane.planningPrompt}</p></div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#020817]/55 p-5">
              <p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeLane.accent }}>HUMAN-GOVERNED SAFEGUARDS</p>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">{activeLane.safeguards.map((item) => <li key={item} className="rounded-xl bg-white/[.035] px-4 py-3 text-xs leading-6 text-[#D6E2EE]">{item}</li>)}</ul>
            </div>

            <button type="button" onClick={() => downloadLocalRecord(activeLane)} className="mt-6 rounded-xl px-5 py-3 text-sm font-black text-[#06101D] transition hover:brightness-110 active:scale-[.98]" style={{ background: activeLane.accent }}>Export local {activeLane.label} planning record ↓</button>
          </section>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101D]">
        <div className="container py-12 md:py-16">
          <p className="text-[10px] font-mono tracking-[.18em] text-[#DCC8FF]">STORY → RECORD → REVIEW</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">Move a vision through the ScrollVerse without losing its source.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link href="/seven-episode-series" className="group rounded-[1.6rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">01 · NARRATIVE</p><h3 className="mt-3 text-2xl font-black text-white">Seven-Episode Series</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Place a Rebirth scene inside an original season structure, then keep its source lane and creative status legible.</p><span className="mt-5 inline-flex text-sm font-black text-[#9DEBFF]">Open the season board →</span></Link>
            <Link href="/episode-brief-builder" className="group rounded-[1.6rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#E8DFFF]">02 · PRODUCTION</p><h3 className="mt-3 text-2xl font-black text-white">Episode Brief Builder</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Specify visual, sound, rights, accessibility, destination, and release fields before any media work is considered.</p><span className="mt-5 inline-flex text-sm font-black text-[#E8DFFF]">Open local brief builder →</span></Link>
            <Link href="/special-repository" className="group rounded-[1.6rem] border border-[#9BEA9B]/35 bg-[#9BEA9B]/[.055] p-6 transition hover:-translate-y-1"><p className="text-[10px] font-mono tracking-[.16em] text-[#C8F7C8]">03 · PROVENANCE</p><h3 className="mt-3 text-2xl font-black text-white">Special Repository</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Keep original records, source context, access status, and future correction paths together without turning a reference into a result.</p><span className="mt-5 inline-flex text-sm font-black text-[#C8F7C8]">Open source records →</span></Link>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-[2rem] border border-[#FFCC4D]/30 bg-[radial-gradient(circle_at_90%_10%,rgba(255,204,77,.13),transparent_30%),rgba(255,204,77,.035)] p-6 md:p-8">
          <p className="text-[10px] font-mono tracking-[.18em] text-[#FFE09A]">RESTORATION RESEARCH IS A STARTING POINT, NOT A FIELD AUTHORIZATION</p>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-[#E7EFF7]">The creator’s Rebirth vision can be developed as original story, knowledge, and planning work here. Any real ecological initiative needs locally appropriate methods, qualified partners, community participation, lawful permissions, measurable objectives, funding clarity, and accountable human review.</p>
        </div>
      </section>
    </main>
  );
}
