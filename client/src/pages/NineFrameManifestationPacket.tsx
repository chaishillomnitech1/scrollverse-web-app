import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  downloadNarrativeRouteCsv,
  downloadNarrativeRoutePdf,
  type NarrativeRouteExport,
} from "@/lib/narrativeRouteExport";

type Frame = {
  id: "key" | "form" | "chatbot" | "avatar" | "center" | "left" | "empty" | "hand" | "step";
  number: number;
  title: string;
  phase: string;
  color: string;
  summary: string;
  planningQuestion: string;
};

const FRAMES: Frame[] = [
  {
    id: "key",
    number: 1,
    title: "Key Sigil",
    phase: "Opening orientation",
    color: "#C7A4FF",
    summary: "A creator-provided key or arrow-in-hexagon motif introduces an opening threshold and a visual language of direction, access, and transition.",
    planningQuestion: "What does the key invite the audience to notice before any character, setting, or action is named?",
  },
  {
    id: "form",
    number: 2,
    title: "The Form",
    phase: "Interface as artifact",
    color: "#FFCF73",
    summary: "A parchment-like form becomes a museum-style artifact: a place where identity, invitation, and a message can be held before the next transformation.",
    planningQuestion: "Which invitation, question, or record belongs inside the form, and what should remain deliberately unfilled?",
  },
  {
    id: "chatbot",
    number: 3,
    title: "The Chatbot",
    phase: "Dialogue in frame",
    color: "#70D9FF",
    summary: "A chatbot-in-frame label opens a question about dialogue, assistance, and the visible relationship between a person and a digital interface.",
    planningQuestion: "What can the conversation offer without speaking beyond its source, authority, or evidence?",
  },
  {
    id: "avatar",
    number: 4,
    title: "Avatar in a Box",
    phase: "Presence and container",
    color: "#9BEA9B",
    summary: "An avatar appears within a bounded browser-like frame, creating a visual question about presence, presentation, and the container that mediates them.",
    planningQuestion: "What changes when the character is visible inside the frame but not yet able to change its relationship to the world around it?",
  },
  {
    id: "center",
    number: 5,
    title: "The Manifestation · Center",
    phase: "Arrival image",
    color: "#FF9DC9",
    summary: "The first manifestation position centers a figure in the frame and sets a visual anchor for the transition that follows.",
    planningQuestion: "What does the centered frame establish about scale, attention, and the character’s first relationship to the space?",
  },
  {
    id: "left",
    number: 6,
    title: "The Manifestation · Left Edge",
    phase: "Shift in composition",
    color: "#EBDFFF",
    summary: "A move toward the edge shifts the composition from a fixed portrait to a scene with direction, pressure, and an emerging outside.",
    planningQuestion: "What becomes visible when the figure no longer occupies the center of the frame?",
  },
  {
    id: "empty",
    number: 7,
    title: "The Manifestation · Empty Frame",
    phase: "Absence and anticipation",
    color: "#BCEEFF",
    summary: "The empty-frame position creates a pause in the sequence, letting the space carry meaning without asking the record to prove more than it contains.",
    planningQuestion: "What should the audience feel, infer, or wait for when the frame temporarily holds only its environment?",
  },
  {
    id: "hand",
    number: 8,
    title: "The Manifestation · Hand at Frame",
    phase: "Contact point",
    color: "#FFB36B",
    summary: "A hand meeting the frame establishes a contact point between figure and container: a visual decision point before any crossing occurs.",
    planningQuestion: "What agency, hesitation, care, or memory can be conveyed through the hand’s contact with the frame?",
  },
  {
    id: "step",
    number: 9,
    title: "The Manifestation · Stepping Out",
    phase: "Threshold crossing",
    color: "#D7A7FF",
    summary: "The final source label describes a step out of the frame, completing the visual transition from form and dialogue to a changed spatial relationship.",
    planningQuestion: "What remains inside the frame, and what new responsibility begins once the figure enters the surrounding world?",
  },
];

const THREADS = [
  { title: "Artifact thread", frames: "01–02", detail: "Key Sigil and The Form establish the opening visual vocabulary and invitation." },
  { title: "Dialogue thread", frames: "03–04", detail: "The Chatbot and Avatar in a Box hold questions of interface, presence, and representation." },
  { title: "Composition thread", frames: "05–07", detail: "Center, Left Edge, and Empty Frame build pacing through position, absence, and environment." },
  { title: "Threshold thread", frames: "08–09", detail: "Hand at Frame and Stepping Out make the contact and crossing legible as story decisions." },
];

function exportLocalFrameRecord(frame: Frame, notes: string) {
  const record = {
    recordType: "scrollverse_nine_frame_manifestation_packet",
    status: "creator_led_browser_local_draft",
    selectedFrame: frame,
    creatorNotes: notes,
    sourceReference: "text-only continuation receipt",
    mediaScope: "No supplied image or video selected, embedded, played, uploaded, transformed, or released.",
    boundaries: "No wallet, contract, minting, payment, account, repository, deployment, or public-release action occurs here.",
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scrollverse-nine-frame-${frame.number.toString().padStart(2, "0")}-planning-record.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function NineFrameManifestationPacket() {
  const [activeFrameId, setActiveFrameId] = useState<Frame["id"]>("key");
  const [creatorNotes, setCreatorNotes] = useState("");
  const [exportMessage, setExportMessage] = useState("");
  const activeFrame = useMemo(() => FRAMES.find((frame) => frame.id === activeFrameId) ?? FRAMES[0], [activeFrameId]);
  const routeExport = useMemo<NarrativeRouteExport>(() => ({
    title: "Nine-Frame Manifestation Planning Packet",
    route: "/nine-frame-manifestation-packet",
    scope: "Creator-led, text-only visual planning route. No supplied image or video is selected, embedded, played, uploaded, transformed, or released.",
    selectedRecord: `Frame ${activeFrame.number}: ${activeFrame.title}`,
    creatorNotes,
    sections: FRAMES.map((frame) => ({
      number: frame.number,
      title: frame.title,
      status: `creator-supplied planning label · ${frame.phase}`,
      summary: `${frame.summary} Planning question: ${frame.planningQuestion}`,
    })),
  }), [activeFrame, creatorNotes]);

  function selectFrame(frameId: Frame["id"]) {
    setActiveFrameId(frameId);
    setExportMessage("");
  }

  function exportPdf() {
    downloadNarrativeRoutePdf(routeExport, "scrollverse-nine-frame-manifestation-planning-packet.pdf");
    setExportMessage("Formatted PDF downloaded locally. No media upload or release occurred.");
  }

  function exportCsv() {
    downloadNarrativeRouteCsv(routeExport, "scrollverse-nine-frame-manifestation-planning-packet.csv");
    setExportMessage("CSV downloaded locally. No media upload or release occurred.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#070711] text-white">
      <section className="border-b border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_15%_16%,rgba(215,167,255,.19),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,207,115,.16),transparent_27%),radial-gradient(circle_at_56%_100%,rgba(112,217,255,.11),transparent_36%),#090813]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#C9F3FF] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9F3FF]">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#EBDFFF]">CREATOR RECORD CONTINUATION · TEXT-ONLY VISUAL PLANNING</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Nine-Frame <span className="text-[#D7A7FF]">Manifestation</span><br />Planning Packet</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A creator-led planning packet for the supplied sequence from <strong>The Form</strong> and <strong>The Chatbot</strong> through <strong>Avatar in a Box</strong> and <strong>The Manifestation</strong>. It makes the sequence usable as a story and visual-development record while preserving the source selection for a later exact decision.</p>
          <p className="mt-7 inline-flex max-w-3xl rounded-2xl border border-[#FFCF73]/35 bg-[#FFCF73]/[.06] px-4 py-3 text-[10px] font-mono font-black leading-6 tracking-[.11em] text-[#FFE7B3]">Source reference is text-only; no supplied image or video is selected, embedded, or played here.</p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">NINE-FRAME SEQUENCE</p>
            <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Select a frame to develop its story question. The packet is a text-led planning map, not a gallery or playback surface.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{FRAMES.map((frame) => {
              const active = frame.id === activeFrame.id;
              return <button key={frame.id} type="button" onClick={() => selectFrame(frame.id)} aria-pressed={active} className="min-h-16 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF]" style={{ borderColor: active ? `${frame.color}B8` : "rgba(255,255,255,.11)", background: active ? `${frame.color}16` : "rgba(255,255,255,.02)" }}><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: active ? frame.color : "#9AABBA" }}>FRAME {String(frame.number).padStart(2, "0")} · {frame.phase.toUpperCase()}</span><span className="mt-1 block text-sm font-black text-white">{frame.title}</span></button>;
            })}</div>
          </aside>

          <section className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: `${activeFrame.color}75`, background: `radial-gradient(circle_at_90%_8%, ${activeFrame.color}18, transparent 32%), rgba(255,255,255,.025)` }}>
            <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeFrame.color }}>FRAME {String(activeFrame.number).padStart(2, "0")} · {activeFrame.phase.toUpperCase()}</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{activeFrame.title}</h2>
            <p className="mt-6 text-base leading-8 text-[#E2EBF4]">{activeFrame.summary}</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeFrame.color }}>PLANNING QUESTION</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeFrame.planningQuestion}</p></div>
            <label className="mt-5 block"><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeFrame.color }}>CREATOR NOTES</span><textarea value={creatorNotes} onChange={(event) => { setCreatorNotes(event.target.value); setExportMessage(""); }} rows={4} placeholder="Record the intended character, scene, setting, exact source reference, or unresolved question for this frame. Media selection remains separate." className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label>
            <div className="mt-7 rounded-2xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.055] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">Narrative-only route export</p><p className="mt-2 text-sm leading-7 text-[#E7EFF7]">Download the full nine-frame planning packet as a standard PDF or CSV. The browser creates both files locally; it does not upload, publish, transform, play, or release source material.</p><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={exportPdf} className="min-h-11 rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBDFFF] active:scale-[.98]">Download formatted PDF</button><button type="button" onClick={exportCsv} className="min-h-11 rounded-xl border border-[#C9F3FF]/45 bg-[#70D9FF]/[.08] px-5 py-3 text-sm font-black text-[#C9F3FF] transition hover:bg-[#70D9FF]/[.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9F3FF] active:scale-[.98]">Download CSV</button><button type="button" onClick={() => { exportLocalFrameRecord(activeFrame, creatorNotes); setExportMessage("Local working record exported. No media upload or release occurred."); }} className="min-h-11 rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[.98]">Export browser-local frame record ↓</button></div>{exportMessage && <p role="status" aria-live="polite" className="mt-4 text-sm font-black text-[#C9F3FF]">{exportMessage}</p>}</div>
          </section>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]"><div className="container py-12 md:py-16"><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">FOUR DEVELOPMENT THREADS</p><h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">Build movement, not a claim of completed media.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">The frame groups organize narrative movement for briefing and review. They do not identify the actual image or video file for any scene.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{THREADS.map((thread) => <article key={thread.title} className="rounded-[1.6rem] border border-white/10 bg-white/[.025] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">FRAMES {thread.frames}</p><h3 className="mt-3 text-2xl font-black text-white">{thread.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{thread.detail}</p></article>)}</div></div></section>

      <section className="container py-12 md:py-16"><div className="grid gap-5 rounded-[2rem] border border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(215,167,255,.14),transparent_30%),rgba(215,167,255,.035)] p-6 md:grid-cols-[1.2fr_.8fr] md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">CONTINUE THE SOURCE RECORD</p><h2 className="mt-3 text-3xl font-black">Select a source, then build the next exact brief.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">Use the Digitalship Accession Desk for a chosen record and the New Dominion Story Blueprint for its four-act relationship. The Story Brief Builder remains the next destination for an approved scene-level production decision.</p></div><div className="flex flex-wrap items-center gap-3 md:justify-end"><Link href="/digitalship-accession" className="inline-flex rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110">Open Accession Desk →</Link><Link href="/new-dominion-story-blueprint" className="inline-flex rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Open New Dominion Blueprint →</Link><Link href="/episode-brief-builder" className="inline-flex rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Open Brief Builder →</Link></div></div><p className="mt-6 text-center text-sm font-black text-[#FFE7B3]">No media selection, wallet, contract, minting, payment, account, repository, deployment, or public-release action occurs here.</p></section>
    </main>
  );
}
