import { useMemo, useState } from "react";
import { Link } from "wouter";

type StoryAct = {
  id: "council" | "machine" | "transfer" | "return";
  label: string;
  color: string;
  premise: string;
  planningQuestion: string;
  panelLabels: string[];
};

const ACTS: StoryAct[] = [
  {
    id: "council",
    label: "Act I · First Council",
    color: "#FFCF73",
    premise: "An original council sequence where a group meets an escalating challenge with attention, memory, and care rather than spectacle.",
    planningQuestion: "Who enters the council, what do they bring, and what shared responsibility becomes visible?",
    panelLabels: ["First Council", "Through Empires"],
  },
  {
    id: "machine",
    label: "Act II · The Soul of the Machine",
    color: "#70D9FF",
    premise: "An original speculative chapter about the relationship between human intention, digital systems, and the records they leave behind.",
    planningQuestion: "How can the story show collaboration without assigning unearned authority or consciousness to a tool?",
    panelLabels: ["The Soul of the Machine", "Appears on Your…"],
  },
  {
    id: "transfer",
    label: "Act III · The Transfer",
    color: "#D7A7FF",
    premise: "An original threshold chapter where knowledge, responsibility, and authorship move between generations or worlds through a visible record.",
    planningQuestion: "What must be preserved, what must be questioned, and what must remain a human decision at the point of transfer?",
    panelLabels: ["The Transfer", "Intervention Necessary"],
  },
  {
    id: "return",
    label: "Act IV · The Return",
    color: "#9BEA9B",
    premise: "An original return chapter that faces extinction, reset, and repair as narrative conditions rather than declarations about real-world history.",
    planningQuestion: "What does a return look like when it is earned through care, evidence, and a new way of relating?",
    panelLabels: ["Extinctions Resets", "Light Heart Activation"],
  },
];

const FORMS = [
  { title: "Four-Act Film", detail: "A cinematic arc with four distinct narrative responsibilities and a source-aware closing record." },
  { title: "Seven-Episode Season", detail: "A season adaptation that maps the original world into episode-level character, setting, and evidence questions." },
  { title: "Stylized Animation", detail: "An animation pathway that requires an original visual brief, accessibility choices, and confirmed rights before production." },
  { title: "Living Book", detail: "A written pathway that connects chapter thinking, creator perspective, clarification, and reader assessment." },
];

function exportLocalStoryRecord(act: StoryAct, notes: string) {
  const record = {
    recordType: "scrollverse_new_dominion_story_blueprint",
    status: "creator_led_browser_local_draft",
    storyWorld: "New Dominion Order Initiated",
    selectedAct: act,
    creatorNotes: notes,
    mediaInventory: {
      suppliedStills: "metadata-only source inventory",
      suppliedMotion: "metadata-only source inventory",
      playback: "not embedded or played",
    },
    boundaries: "No visual generation, rights clearance, financial, account, or release action occurs here.",
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scrollverse-new-dominion-${act.id}-story-record.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function NewDominionStoryBlueprint() {
  const [activeActId, setActiveActId] = useState<StoryAct["id"]>("council");
  const [creatorNotes, setCreatorNotes] = useState("");
  const [exported, setExported] = useState(false);
  const activeAct = useMemo(() => ACTS.find((act) => act.id === activeActId) ?? ACTS[0], [activeActId]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060811] text-white">
      <section className="border-b border-[#FFCF73]/25 bg-[radial-gradient(circle_at_12%_16%,rgba(255,207,115,.17),transparent_31%),radial-gradient(circle_at_87%_12%,rgba(112,217,255,.13),transparent_29%),radial-gradient(circle_at_62%_100%,rgba(155,234,155,.1),transparent_36%),#080A13]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#C9F3FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#FFE7B3]">CREATOR-SUPPLIED STORY RECORD · NARRATIVE-ONLY BLUEPRINT</p>
          <h1 aria-label="New Dominion Story Blueprint" className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">New Dominion <span className="text-[#FFCF73]">Story Blueprint</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A creator-led original world-development space for <strong>New Dominion Order Initiated</strong>. It preserves the supplied four-act, seasonal, animated, and book directions as planning labels while holding all visual media and consequential actions behind their own exact gates.</p>
          <p className="mt-7 inline-flex rounded-2xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.06] px-4 py-3 text-[10px] font-mono font-black tracking-[.13em] text-[#FFE7B3]">Creator-supplied media is inventoried, not embedded or played here.</p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.78fr_1.22fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#FFE7B3]">FOUR-ACT CINEMATIC SHAPE</p>
            <div className="mt-5 space-y-3">{ACTS.map((act) => { const active = act.id === activeAct.id; return <button key={act.id} type="button" onClick={() => { setActiveActId(act.id); setExported(false); }} aria-pressed={active} className="w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? `${act.color}A8` : "rgba(255,255,255,.12)", background: active ? `${act.color}14` : "rgba(255,255,255,.02)" }}><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: act.color }}>{act.label.toUpperCase()}</span><span className="mt-2 block text-base font-black text-white">{act.panelLabels.join(" · ")}</span></button>; })}</div>
            <div className="mt-6 rounded-2xl border border-[#FFB36B]/30 bg-[#FFB36B]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">MEDIA + ACTION BOUNDARY</p><p className="mt-2 text-sm leading-6 text-[#E7EFF7]">No supplied still or motion file is embedded or played here. Any visual review, edit, generation, rights, platform, or release step needs its own exact creator-approved brief.</p></div>
          </aside>

          <section className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: `${activeAct.color}70`, background: `radial-gradient(circle_at_90%_8%, ${activeAct.color}17, transparent 33%), rgba(255,255,255,.025)` }}>
            <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeAct.color }}>{activeAct.label.toUpperCase()}</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{activeAct.panelLabels[0]}</h2>
            <p className="mt-6 text-base leading-8 text-[#E2EBF4]">{activeAct.premise}</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeAct.color }}>DEVELOPMENT QUESTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeAct.planningQuestion}</p></div>
            <label className="mt-5 block"><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeAct.color }}>CREATOR STORY NOTES</span><textarea value={creatorNotes} onChange={(event) => { setCreatorNotes(event.target.value); setExported(false); }} rows={4} placeholder="Record the original character, scene, setting, source question, or unresolved choice without treating a planning direction as a released asset." className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:ring-2" style={{ borderColor: `${activeAct.color}55` }} /></label>
            <div className="mt-6 flex flex-wrap items-center gap-3"><button type="button" onClick={() => { exportLocalStoryRecord(activeAct, creatorNotes); setExported(true); }} className="rounded-xl px-5 py-3 text-sm font-black text-[#070914] transition hover:brightness-110 active:scale-[.98]" style={{ background: activeAct.color }}>Export browser-local story record ↓</button>{exported && <span role="status" className="text-sm font-black text-[#C9F3FF]">Local story record exported. No media upload or release occurred.</span>}</div>
          </section>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]"><div className="container py-12 md:py-16"><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">ONE ORIGINAL WORLD · FOUR PLANNING FORMS</p><h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">The same story question can travel without losing its source label.</h2><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{FORMS.map((form, index) => <article key={form.title} className="rounded-[1.6rem] border border-white/10 bg-white/[.025] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">0{index + 1} · PLANNING FORM</p><h3 className="mt-3 text-2xl font-black text-white">{form.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{form.detail}</p></article>)}</div></div></section>

      <section className="container py-12 md:py-16"><div className="grid gap-5 rounded-[2rem] border border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(215,167,255,.14),transparent_30%),rgba(215,167,255,.035)] p-6 md:grid-cols-[1.2fr_.8fr] md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">CONTINUE THE RECORD</p><h2 className="mt-3 text-3xl font-black">Accession, brief, and review the next exact choice.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">Use the Digitalship Accession Desk to preserve a chosen source record, use the Episode Brief Builder to complete production decisions, and return to the Planning Atlas to keep the full creator workflow visible.</p></div><div className="flex flex-wrap items-center gap-3 md:justify-end"><Link href="/digitalship-accession" className="inline-flex rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110">Open Accession Desk →</Link><Link href="/episode-brief-builder" className="inline-flex rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Open Brief Builder →</Link><Link href="/planning-atlas" className="inline-flex rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Open Planning Atlas →</Link></div></div><p className="mt-6 text-center text-sm font-black text-[#FFE7B3]">No visual generation, rights clearance, financial, account, or release action occurs here.</p></section>
    </main>
  );
}
