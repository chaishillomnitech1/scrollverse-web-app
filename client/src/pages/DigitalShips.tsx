import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const SHIP_MODES = [
  {
    title: "Observe the current",
    accent: "#00D4FF",
    line: "A story starts when we notice what deserves care.",
    prompt: "Name a place, memory, or question worth carrying into a future panel.",
  },
  {
    title: "Imagine the bridge",
    accent: "#FFB800",
    line: "A bridge connects an idea to a next, practical step.",
    prompt: "What changes when your character listens before they act?",
  },
  {
    title: "Draft the next panel",
    accent: "#B98CFF",
    line: "A next panel is a creator brief, not an automatic public post.",
    prompt: "Write one image, one line of dialogue, and one feeling for the next scene.",
  },
] as const;

const PANELS = [
  { number: "01", label: "Signal", title: "A question enters the frame", body: "A local detail becomes a story seed. The crew records its source before the ship moves.", color: "#00D4FF" },
  { number: "02", label: "Bridge", title: "Ideas travel with care", body: "Each voice adds a possibility, while the navigator keeps the original source and credits visible.", color: "#FFB800" },
  { number: "03", label: "Return", title: "The work reaches its next form", body: "A release brief is prepared with accessibility, audience care, and an owner-controlled decision.", color: "#B98CFF" },
] as const;

const LEGION_GUIDES = [
  { name: "The Archivist", role: "Source keeper", color: "#00D4FF", lens: "What is the source, version, and credit trail for this page?" },
  { name: "The Bridgebuilder", role: "Story connector", color: "#FFB800", lens: "Who can understand this idea, and what is the next generous step?" },
  { name: "The Signalwright", role: "Visual composer", color: "#B98CFF", lens: "Which image, color, rhythm, or silence gives the scene its shape?" },
  { name: "The Carekeeper", role: "Access and audience guide", color: "#00FF88", lens: "How can this work remain accessible, youth-aware, and open to correction?" },
] as const;

export default function DigitalShips() {
  useSovereignHeartbeat({ page: "digital-ships" });
  const [activeMode, setActiveMode] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Voice-ready cue available in supported browsers.");
  const [response, setResponse] = useState("");
  const [brief, setBrief] = useState("");
  const [activeGuide, setActiveGuide] = useState(0);
  const selectedMode = SHIP_MODES[activeMode];
  const selectedGuide = LEGION_GUIDES[activeGuide];

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const narration = useMemo(
    () => `Digital Ships. ${selectedMode.title}. ${selectedMode.line} ${selectedMode.prompt}`,
    [selectedMode],
  );

  const playCue = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceStatus("This browser does not expose a local speech voice. Read the cue on screen instead.");
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(narration);
    speech.rate = 0.92;
    speech.pitch = 1;
    speech.onend = () => setVoiceStatus("Voice cue finished. You can replay it or continue reading.");
    window.speechSynthesis.speak(speech);
    setVoiceStatus("Playing a browser-local narration cue. No recording or external voice service is used.");
  };

  const stopCue = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setVoiceStatus("Voice cue paused.");
  };

  const buildBrief = () => {
    const cleanResponse = response.trim();
    if (!cleanResponse) {
      toast.error("Add a thought before drafting a local story brief.");
      return;
    }
    setBrief(`DIGITAL SHIPS · ${selectedMode.title.toUpperCase()}\nCreative response: ${cleanResponse}\nState: browser-local draft only\nBefore use: confirm source, contributor credit, accessibility, audience care, and owner release.`);
    toast.success("A browser-local story brief is ready to review.");
  };

  const applyGuideLens = () => {
    setResponse(current => current.trim() ? `${current}\n\nGuide lens — ${selectedGuide.name}: ${selectedGuide.lens}` : `Guide lens — ${selectedGuide.name}: ${selectedGuide.lens}`);
    toast.success(`${selectedGuide.name} lens added to your local draft.`);
  };

  return (
    <main className={`min-h-screen overflow-hidden bg-[#040A16] text-white ${motionPaused ? "digital-ships-paused" : ""}`}>
      <style>{`
        @keyframes digitalShipsDrift { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(0,-18px,0) rotate(1deg); } }
        @keyframes digitalShipsOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes digitalShipsScan { 0% { transform: translateX(-115%); } 100% { transform: translateX(115%); } }
        .digital-ships-grid { background-image: linear-gradient(rgba(0,212,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.08) 1px, transparent 1px); background-size: 38px 38px; }
        .digital-ships-card { box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 18px 45px rgba(0,0,0,.22); }
        .digital-ships-drift { animation: digitalShipsDrift 8s ease-in-out infinite; }
        .digital-ships-orbit { animation: digitalShipsOrbit 30s linear infinite; }
        .digital-ships-scan::after { content: ""; position: absolute; inset: 0; width: 34%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent); animation: digitalShipsScan 6s linear infinite; pointer-events: none; }
        .digital-ships-paused .digital-ships-drift, .digital-ships-paused .digital-ships-orbit, .digital-ships-paused .digital-ships-scan::after { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .digital-ships-drift, .digital-ships-orbit, .digital-ships-scan::after { animation: none !important; } }
      `}</style>

      <section className="digital-ships-grid relative isolate border-b border-[#00D4FF]/15 px-4 pb-14 pt-20 sm:pb-20 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,184,0,.15),transparent_32%),radial-gradient(circle_at_82%_62%,rgba(185,140,255,.16),transparent_29%),linear-gradient(180deg,rgba(4,10,22,.45),#040A16)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/junior-movies" className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-4 py-2 text-xs font-black tracking-[.14em] text-[#00D4FF]">← JUNIOR MOVIES</Link>
            <button type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(value => !value)} className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs font-black text-[#D6E2EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]">
              {motionPaused ? "Resume panel flow" : "Pause panel flow"}
            </button>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <p className="font-mono text-xs tracking-[.26em] text-[#00D4FF]">SCROLLVERSE DIGITAL SHIPS · ORIGINAL STORY INTERACTION</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.95] sm:text-7xl">Flow with the <span className="text-[#FFB800]">panel.</span> Build the <span className="text-[#B98CFF]">bridge.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C4D0E0]">Digital Ships is a browser-local comic and story-world room for exploring a thought, shaping a scene, and preparing a creator brief. The art of the page moves; the decision to release remains yours.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/storybooks" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101F]">Open story worlds</Link>
                <Link href="/manus-hero" className="rounded-xl border border-[#FFB800]/55 bg-[#FFB800]/10 px-5 py-3 text-sm font-black text-[#FFCC4D]">Enter Manus Hero</Link>
                <Link href="/books" className="rounded-xl border border-[#FFB800]/55 bg-[#FFB800]/10 px-5 py-3 text-sm font-black text-[#FFCC4D]">Read + listen</Link>
                <Link href="/creator-media-packet" className="rounded-xl border border-[#B98CFF]/55 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#D6C4FF]">Prepare a release packet</Link>
              </div>
            </div>

            <div className="digital-ships-drift relative mx-auto aspect-square w-full max-w-md">
              <div className="digital-ships-orbit absolute inset-[4%] rounded-full border border-[#FFB800]/35" />
              <div className="absolute inset-[15%] rounded-full border border-[#00D4FF]/30" />
              <div className="absolute inset-[29%] rounded-full border border-[#B98CFF]/40" />
              <div className="digital-ships-card digital-ships-scan absolute inset-[23%] overflow-hidden rounded-[2rem] border border-[#FFCC4D]/60 bg-[#071426]/95 p-7">
                <p className="font-mono text-[10px] tracking-[.2em] text-[#FFCC4D]">SHIP LOG · 01</p>
                <div className="mt-5 text-5xl">✦</div>
                <h2 className="mt-4 text-3xl font-black">The page is a vessel.</h2>
                <p className="mt-4 text-sm leading-6 text-[#C4D0E0]">Every panel keeps its source, its people, and its next step in view.</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#00FF88]"><span className="h-2 w-2 rounded-full bg-[#00FF88]" /> BROWSER-LOCAL CREATION MODE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="font-mono text-xs tracking-[.2em] text-[#B98CFF]">FLOWING COMIC SEQUENCE</p><h2 className="mt-3 text-3xl font-black">Move through a creator-owned scene.</h2></div>
          <p className="max-w-md text-sm leading-6 text-[#AABCCC]">These panels are original interaction prompts, not a released episode or a public reaction feed.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PANELS.map((panel, index) => <article key={panel.number} className="digital-ships-card relative overflow-hidden rounded-3xl border p-6" style={{ borderColor: `${panel.color}60`, background: `linear-gradient(145deg, ${panel.color}18, rgba(7,16,33,.9) 60%)`, animationDelay: `${index * 180}ms` }}>
            <div className="digital-ships-drift absolute right-5 top-5 text-6xl font-black opacity-20" style={{ color: panel.color }}>{panel.number}</div>
            <p className="font-mono text-xs tracking-[.18em]" style={{ color: panel.color }}>PANEL {panel.number} · {panel.label.toUpperCase()}</p>
            <h3 className="mt-12 max-w-xs text-2xl font-black">{panel.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#C4D0E0]">{panel.body}</p>
            <div className="mt-8 h-px w-full" style={{ background: `linear-gradient(90deg, ${panel.color}, transparent)` }} />
          </article>)}
        </div>
      </section>

      <section className="border-y border-[#FFB800]/15 bg-[#081222] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
            <div className="rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.045] p-6">
              <p className="font-mono text-xs tracking-[.2em] text-[#00D4FF]">IMAGINATION NAVIGATOR</p>
              <h2 className="mt-3 text-3xl font-black">Choose a way to move through the story.</h2>
              <div className="mt-6 space-y-3" role="tablist" aria-label="Digital Ships story modes">
                {SHIP_MODES.map((mode, index) => <button key={mode.title} type="button" onClick={() => { setActiveMode(index); setBrief(""); }} className="w-full rounded-2xl border p-4 text-left transition-transform hover:-translate-y-0.5" style={{ borderColor: index === activeMode ? mode.accent : `${mode.accent}44`, background: index === activeMode ? `${mode.accent}16` : "rgba(255,255,255,.02)" }} aria-pressed={index === activeMode}>
                  <span className="text-sm font-black" style={{ color: index === activeMode ? mode.accent : "#D6E2EE" }}>{mode.title}</span><span className="mt-1 block text-xs leading-5 text-[#AABCCC]">{mode.line}</span>
                </button>)}
              </div>
            </div>

            <div className="rounded-3xl border border-[#FFB800]/30 bg-[#050C19] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs tracking-[.2em]" style={{ color: selectedMode.accent }}>ACTIVE CUE · {selectedMode.title.toUpperCase()}</p><h3 className="mt-3 text-2xl font-black">{selectedMode.prompt}</h3></div><div className="flex gap-2"><button type="button" onClick={playCue} className="rounded-xl border px-4 py-2 text-xs font-black" style={{ borderColor: `${selectedMode.accent}88`, color: selectedMode.accent }}>Play voice cue</button><button type="button" onClick={stopCue} className="rounded-xl border border-white/15 px-4 py-2 text-xs font-black text-[#D6E2EE]">Stop</button></div></div>
              <p className="mt-4 text-xs leading-6 text-[#AABCCC]" aria-live="polite">{voiceStatus}</p>
              <label className="mt-6 block text-sm font-bold text-[#D6E2EE]" htmlFor="digital-ships-response">Your private response brief</label>
              <textarea id="digital-ships-response" value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Describe the image, dialogue, question, or next panel you want to explore…" className="mt-3 min-h-32 w-full rounded-2xl border border-white/15 bg-white/[.03] p-4 text-sm leading-6 text-white outline-none placeholder:text-[#70859A] focus:border-[#00D4FF]/70" />
              <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={buildBrief} className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#07101F]">Create local story brief</button><Link href="/creator-operations" className="rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#00FF88]">Open protected creator path</Link></div>
              {brief && <pre className="mt-6 whitespace-pre-wrap rounded-2xl border border-[#B98CFF]/40 bg-[#B98CFF]/[.07] p-4 font-mono text-xs leading-6 text-[#E7DFFF]" aria-live="polite">{brief}</pre>}
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/[.04] p-5 text-sm leading-7 text-[#C4D0E0]"><span className="font-black text-[#00FF88]">Adult-supported participation:</span> A young creator’s idea belongs to them. This page does not create profiles, send direct messages, publish submissions, or use ideas automatically. Any youth-facing story contribution requires adult support, consent, moderation, creator-rights review, accessibility planning, and an owner-controlled release decision.</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[linear-gradient(135deg,rgba(185,140,255,.1),rgba(0,212,255,.045),rgba(255,184,0,.055))] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="font-mono text-xs tracking-[.2em] text-[#D6C4FF]">LEGION STORY HUB · ORIGINAL GUIDE ENSEMBLE</p><h2 className="mt-3 text-3xl font-black">A crew for every part of the page.</h2></div>
            <p className="max-w-xl text-sm leading-6 text-[#C4D0E0]">These guides are original browser-local story roles. They help organize a creative thought; they are not connected accounts, autonomous public actors, legal authorities, or external AI systems.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {LEGION_GUIDES.map((guide, index) => <button key={guide.name} type="button" onClick={() => setActiveGuide(index)} aria-pressed={activeGuide === index} className="digital-ships-card rounded-2xl border p-5 text-left transition-transform hover:-translate-y-1" style={{ borderColor: activeGuide === index ? guide.color : `${guide.color}55`, background: activeGuide === index ? `${guide.color}17` : "rgba(4,10,22,.72)" }}>
              <p className="font-mono text-[10px] tracking-[.17em]" style={{ color: guide.color }}>{guide.role.toUpperCase()}</p>
              <h3 className="mt-3 text-xl font-black">{guide.name}</h3>
              <p className="mt-3 text-xs leading-6 text-[#B8C7D6]">{guide.lens}</p>
            </button>)}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#030914]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-mono text-xs" style={{ color: selectedGuide.color }}>ACTIVE GUIDE · {selectedGuide.name.toUpperCase()}</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D6E2EE]">{selectedGuide.lens}</p></div>
            <button type="button" onClick={applyGuideLens} className="rounded-xl px-5 py-3 text-sm font-black text-[#050B1A]" style={{ background: selectedGuide.color }}>Use guide lens in draft</button>
          </div>
          <div className="mt-5 grid gap-3 text-xs leading-6 text-[#AABCCC] sm:grid-cols-3"><div className="rounded-xl border border-white/10 bg-white/[.025] p-4"><span className="font-black text-[#00D4FF]">CREATE</span><br />Shape a private scene, issue, character beat, or visual brief.</div><div className="rounded-xl border border-white/10 bg-white/[.025] p-4"><span className="font-black text-[#FFCC4D]">REVIEW</span><br />Keep source, credits, accessibility, and audience care in the story’s frame.</div><div className="rounded-xl border border-white/10 bg-white/[.025] p-4"><span className="font-black text-[#00FF88]">RELEASE</span><br />The creator controls whether any work becomes a moderated public contribution or a published asset.</div></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16"><PortalTrustLens lane="Digital Ships" source="Original ScrollVerse interaction design and owner-directed story-world request." readiness="Available now as browser-local exploration, original Legion guide lenses, voice-ready prompts, and private story-brief drafting; no public reactions, posting, or external voice service is active." boundary="Public responses, uploads, profiles, scheduled programming, and media release stay owner-controlled. Every released comic, visual, audio cue, or episode requires its own source, rights, accessibility, youth-safety, moderation, and release record." correctionHref="/creator-media-packet" /></section>
    </main>
  );
}
