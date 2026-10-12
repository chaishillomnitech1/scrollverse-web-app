import { useState } from "react";
import { Link } from "wouter";

type Lane = "black-batman" | "flamecourt";

const chapters: Record<Lane, {
  number: string; title: string; subtitle: string; accent: string; logline: string;
  beats: string[]; nextQuestion: string; source: string;
}> = {
  "black-batman": {
    number: "01", title: "The Black Batman", subtitle: "Curtis Bordley · Divine Override",
    accent: "#A5DFF5", logline: "A creator-authored vigilante figure moves through a Black Atlantic city, facing the choice between inherited myth, living memory, and the systems he can change.",
    beats: ["Character profile · Curtis Bordley", "Tech Soul + Divine Override · story motifs", "Motion-cartoon brief · shot and sound direction"],
    nextQuestion: "Which first scene establishes Curtis's own purpose before introducing the machinery around him?",
    source: "Referenced Black Batman / FlameCourt Manus task",
  },
  flamecourt: {
    number: "02", title: "FlameCourt", subtitle: "Ceremony · InitiativeSigil",
    accent: "#FFC88D", logline: "The ceremony becomes a scene of witness and choice: a seal, a gathering, and an invitation to determine what is carried forward.",
    beats: ["818 coordinate · creator story marker", "FlameCourtSeal · supplied visual concept", "OmniExplorer · proposed story pathway"],
    nextQuestion: "Whose point of view makes the ceremony meaningful, and what visible action closes the sequence?",
    source: "Referenced Black Batman / FlameCourt Manus task",
  },
};

function exportNotes(lane: Lane, notes: string) {
  const record = {
    recordType: "scrollverse_story_crossroads_plan", version: 1,
    source: "User-referenced Black Batman / FlameCourt Manus task and supplied Grok share",
    selectedLane: lane, title: chapters[lane].title, creatorNotes: notes,
    scope: "Browser-local narrative planning. No media selection, license, production export or release.",
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scrollverse-${lane}-story-plan.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function StoryWorldCrossroads() {
  const [selected, setSelected] = useState<Lane>("black-batman");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const chapter = chapters[selected];
  return <main className="min-h-screen overflow-hidden bg-[#050A13] text-white">
    <section className="relative border-b border-[#91D6E6]/20 bg-[radial-gradient(circle_at_18%_20%,rgba(76,190,217,.2),transparent_33%),radial-gradient(circle_at_86%_70%,rgba(255,147,71,.16),transparent_38%),#07101C]">
      <div className="container relative py-14 md:py-24">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm font-bold text-[#B8E8F3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8E8F3]">← Back to ScrollVerse</Link>
        <p className="mt-9 text-[11px] font-mono uppercase tracking-[.23em] text-[#B8E8F3]">Source-led / a creator's story studio</p>
        <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] tracking-tight md:text-7xl">The city. <span className="text-[#A5DFF5]">The witness.</span><br /><span className="text-[#FFC88D]">The flame.</span></h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#D7E6ED]">Two connected development lanes for The Black Batman and FlameCourt. Select a story thread, shape its next beat, then carry an exact source decision into the existing creator workflow.</p>
        <div className="mt-10 flex flex-wrap gap-3"><span className="rounded-full border border-[#A5DFF5]/40 px-4 py-2 text-xs font-mono text-[#D5F4FF]">CHARACTER / WORLD</span><span className="rounded-full border border-[#FFC88D]/40 px-4 py-2 text-xs font-mono text-[#FFE0BC]">CEREMONY / CHOICE</span><span className="rounded-full border border-white/20 px-4 py-2 text-xs font-mono text-[#D6E2EE]">TEXT-LED PLAN</span></div>
      </div>
    </section>

    <section className="container grid gap-8 py-12 lg:grid-cols-[.77fr_1.23fr] lg:py-16" aria-label="Choose a creator story lane">
      <div className="space-y-4">
        <p className="text-xs font-mono tracking-[.2em] text-[#B8E8F3]">01 / THE SOURCE THREADS</p>
        {(Object.keys(chapters) as Lane[]).map((id) => {
          const item = chapters[id];
          return <button key={id} type="button" onClick={() => { setSelected(id); setMessage(""); }} aria-pressed={selected === id} className="min-h-32 w-full rounded-[1.5rem] border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5DFF5]" style={{ borderColor: selected === id ? item.accent : "rgba(255,255,255,.17)", background: selected === id ? `${item.accent}17` : "rgba(255,255,255,.025)" }}><span className="block text-[11px] font-mono tracking-[.15em]" style={{ color: item.accent }}>THREAD {item.number} · {item.source.toUpperCase()}</span><span className="mt-3 block text-2xl font-black text-white">{item.title}</span><span className="mt-2 block text-sm text-[#D6E2EE]">{item.subtitle}</span></button>;
        })}
        <div className="rounded-2xl border border-white/15 bg-white/[.035] p-5 text-xs leading-6 text-[#C8D8E7]">The earlier command-portal task describes its own cinematic export and localized captions. This room is a separate planning route; it does not transfer or play those assets.</div>
      </div>
      <article className="overflow-hidden rounded-[2rem] border p-6 md:p-9" style={{ borderColor: `${chapter.accent}70`, background: `radial-gradient(circle at 100% 0, ${chapter.accent}18, transparent 40%), #0A1524` }}>
        <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-xs font-mono tracking-[.18em]" style={{ color: chapter.accent }}>SELECTED STORY / {chapter.number}</p><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: `${chapter.accent}75`, color: chapter.accent }}>CREATOR-SUPPLIED CONCEPT</span></div>
        <h2 className="mt-6 text-4xl font-black md:text-5xl">{chapter.title}</h2>
        <p className="mt-3 text-base font-semibold" style={{ color: chapter.accent }}>{chapter.subtitle}</p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#E0EAF1]">{chapter.logline}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">{chapter.beats.map((beat, index) => <div key={beat} className="rounded-xl border border-white/15 bg-white/[.03] p-4"><p className="text-[10px] font-mono" style={{ color: chapter.accent }}>BEAT 0{index + 1}</p><p className="mt-2 text-sm leading-6 text-white">{beat}</p></div>)}</div>
        <div className="mt-8 rounded-2xl border border-white/15 bg-[#06101D] p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: chapter.accent }}>NEXT CREATOR DECISION</p><p className="mt-3 text-sm leading-7 text-[#E0EAF1]">{chapter.nextQuestion}</p></div>
        <label className="mt-7 block text-xs font-mono tracking-[.12em]" style={{ color: chapter.accent }}>YOUR SCENE NOTES<textarea value={notes} onChange={event => { setNotes(event.target.value); setMessage(""); }} rows={4} placeholder="Note the character, setting, scene action, or exact source to develop next." className="mt-3 block w-full rounded-xl border border-white/20 bg-[#06101D] p-4 text-sm leading-6 text-white placeholder:text-[#95A8BC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5DFF5]" /></label>
        <button type="button" onClick={() => { exportNotes(selected, notes); setMessage("Story plan downloaded to this device."); }} className="mt-5 min-h-11 rounded-xl bg-[#A5DFF5] px-5 py-3 text-sm font-black text-[#08121D] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Download local story plan ↓</button>
        {message && <p role="status" className="mt-3 text-sm text-[#B8E8F3]">{message}</p>}
      </article>
    </section>

    <section className="border-t border-[#FFC88D]/25 bg-[#0B1320]"><div className="container py-12 md:py-16"><p className="text-xs font-mono tracking-[.18em] text-[#FFC88D]">CROSSOVER / NEW DOMINION</p><h2 className="mt-3 text-3xl font-black md:text-4xl">with water but with fire</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The supplied Grok conversation offers this phrase, an Act III poster direction, four Starseed–Council panel beats and a 15–20s motion outline. They are creative directions here—not imported media or a completed film.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/new-dominion-story-blueprint" className="inline-flex min-h-11 items-center rounded-xl bg-[#FFC88D] px-5 text-sm font-black text-[#09101D]">Open New Dominion blueprint →</Link><Link href="/digitalship-accession" className="inline-flex min-h-11 items-center rounded-xl border border-white/30 px-5 text-sm font-black text-white">Accession an exact source →</Link><Link href="/episode-brief-builder" className="inline-flex min-h-11 items-center rounded-xl border border-white/30 px-5 text-sm font-black text-white">Build a scene brief →</Link></div></div></section>
    <section className="container py-12 md:py-16"><div className="grid gap-5 rounded-[2rem] border border-[#A5DFF5]/30 bg-[#A5DFF5]/[.04] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#B8E8F3]">AI LEGION / STORY-TO-GUIDE HANDOFF</p><h2 className="mt-3 text-3xl font-black">Put a guide beside the story.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#D6E2EE]">Choose a first-party Legion guide for narrative questions, trace the source in the Knowledge Base, or return to the Continuity Lab. A guide response does not edit this draft or release media.</p></div><div className="flex flex-wrap gap-3 md:justify-end"><Link href="/ai-legion-apex" className="inline-flex min-h-11 items-center rounded-xl bg-[#A5DFF5] px-5 text-sm font-black text-[#09101D]">Open Legion guides →</Link><Link href="/legion-knowledge-base" className="inline-flex min-h-11 items-center rounded-xl border border-[#A5DFF5]/40 px-5 text-sm font-black text-white">Knowledge Base →</Link><Link href="/legion-continuity-lab" className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 text-sm font-black text-white">Continuity Lab →</Link></div></div><p className="mt-8 text-xs leading-6 text-[#B6C8D7]">Sources: <span>Black Batman / FlameCourt referenced task <code className="break-all">rxwWRT5PcDJCiv7GU5i6hG</code></span> · <a href="https://grok.com/share/c2hhcmQtMw_55e17cfd-412e-46cd-8e2e-ed2b850e0362" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">creator-supplied Grok conversation ↗</a>. These sources describe proposals and earlier work, not an automatic deployment in this portal.</p></section>
  </main>;
}
