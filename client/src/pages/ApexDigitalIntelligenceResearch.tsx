import { useMemo, useState } from "react";
import { Link } from "wouter";
import { BookOpenCheck, BrainCircuit, ClipboardCheck, Compass, Copy, Network, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Track = {
  id: string;
  title: string;
  prompt: string;
  method: string;
  output: string;
  accent: string;
};

const tracks: Track[] = [
  { id: "evidence", title: "Evidence-grounded intelligence", prompt: "What source directly supports this statement, and what remains a design hypothesis?", method: "Name the source, separate observation from inference, and record the limitation.", output: "A source card with claim, evidence, limitation, and linked ScrollVerse route.", accent: "#00D4FF" },
  { id: "agents", title: "Agent workflow design", prompt: "How can a multi-step system show its inputs, checks, and owner-controlled gates?", method: "Map the workflow, identify the decision point, and make release control visible.", output: "A browser-local workflow sketch; no external agent, account, or integration is activated.", accent: "#B98CFF" },
  { id: "evaluation", title: "Evaluation and measurement", prompt: "How can a study conclusion be checked for factual grounding, completeness, and sufficiency?", method: "Use a review checklist before calling a finding ready for handoff.", output: "A plain-language evidence review rather than a certification or formal audit.", accent: "#00FF88" },
  { id: "design", title: "Human-centered applied design", prompt: "How do accessibility, privacy, safety, transparency, and accountability shape a concept?", method: "Document intended benefit, affected participants, uncertainty, and a release boundary.", output: "An applied-design note with a current operating state.", accent: "#FFB800" },
  { id: "creative", title: "Creative systems research", prompt: "How can Game Worlds, media, visual, catalog, and Digital Mirror work remain source-led?", method: "Connect original design to its context without treating a concept as deployed capability.", output: "A cross-linked concept record with evidence and a clear release condition.", accent: "#FF6B9A" },
];

const references = [
  { title: "NIST AI Risk Management Framework", text: "Voluntary guidance that organizes AI risk work around Govern, Map, Measure, and Manage.", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
  { title: "NIST Generative AI Profile", text: "A companion resource for identifying and managing generative-AI risks.", href: "https://doi.org/10.6028/NIST.AI.600-1" },
  { title: "NIST Agentic AI Evaluation Probes", text: "Research on structured checks for grounding, completeness, and sufficiency in agentic outputs.", href: "https://www.nist.gov/programs-projects/building-evaluation-probes-agentic-ai" },
  { title: "OECD AI Principles", text: "Reference principles including human-centered values, transparency, robustness, safety, and accountability.", href: "https://oecd.ai/en/ai-principles" },
];

const handoffs = [
  { label: "Game Systems Research", href: "/game-systems-research-blueprint", note: "Applied learning and playable study systems" },
  { label: "Connected Source Registry", href: "/connected-source-registry", note: "Source record and evidence handoffs" },
  { label: "Digital Mirror Twin", href: "/digital-mirror-twin", note: "Identity, creation, and signature-readiness context" },
  { label: "Portfolio Evidence Hub", href: "/portfolio-evidence-hub", note: "Evidence-led asset and readiness narrative" },
  { label: "Ecosystem Discovery", href: "/ecosystem-discovery", note: "Full ScrollVerse pathway map" },
];

export default function ApexDigitalIntelligenceResearch() {
  useSovereignHeartbeat({ page: "apex-digital-intelligence-research" });
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);
  const current = useMemo(() => tracks.find((track) => track.id === activeTrack) ?? tracks[0], [activeTrack]);

  const copyStudyPrompt = async () => {
    await navigator.clipboard.writeText(`${current.title}\nStudy question: ${current.prompt}\nMethod: ${current.method}\nBrowser-local output: ${current.output}`);
    toast.success("Study prompt copied for local use");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white">
      <section className="border-b border-cyan-300/20 bg-[radial-gradient(circle_at_12%_0%,rgba(0,212,255,.18),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(185,140,255,.17),transparent_30%),#050B1A]">
        <div className="container py-16 md:py-24">
          <Link href="/ecosystem-discovery" className="font-mono text-xs tracking-[.16em] text-cyan-200 hover:text-white">← ECOSYSTEM DISCOVERY</Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[.24em] text-cyan-300">SCROLLVERSE · APEX DIGITAL INTELLIGENCE RESEARCH</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Study systems with <span className="text-cyan-300">evidence</span>, then turn learning into clearer design.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A browser-local research framework for source-led digital intelligence, agent workflows, evaluation, applied design, and creative systems. It is built to make methods, evidence, limitations, and release gates visible.</p>
            </div>
            <aside className="rounded-[2rem] border border-cyan-200/25 bg-slate-950/65 p-7 shadow-2xl shadow-cyan-950/30">
              <div className="flex items-center gap-3 text-cyan-200"><BrainCircuit size={25} /><span className="font-mono text-xs tracking-[.16em]">RESEARCH RHYTHM</span></div>
              <ol className="mt-6 space-y-3 text-sm leading-6 text-slate-200"><li><strong className="text-cyan-200">01 · Govern</strong> — define purpose, responsibility, and boundary.</li><li><strong className="text-purple-200">02 · Map</strong> — identify context, sources, people, and uncertainty.</li><li><strong className="text-emerald-200">03 · Measure</strong> — examine evidence and gaps.</li><li><strong className="text-amber-200">04 · Manage</strong> — choose the next bounded release step.</li></ol>
            </aside>
          </div>
          <div className="mt-10"><PortalTrustLens lane="Apex Digital Intelligence Research" source="NIST AI RMF, NIST Generative AI Profile, NIST agentic evaluation research, OECD AI Principles, and source-labeled ScrollVerse records" readiness="Available now as a browser-local study and discovery framework" boundary="This route does not deploy an agent, certify a system, create a repository, connect a provider, access an account, execute code, or activate external infrastructure." /></div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-xs tracking-[.2em] text-purple-300">FIVE STUDY TRACKS</p><h2 className="mt-3 text-3xl font-black md:text-4xl">From source record to applied-design note</h2></div><p className="max-w-xl text-sm leading-6 text-slate-400">Select a track to generate a local study prompt. The prompt is copied only when you choose to copy it.</p></div>
        <div className="mt-9 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{tracks.map((track, index) => <button key={track.id} onClick={() => setActiveTrack(track.id)} className="rounded-2xl border p-5 text-left transition hover:bg-white/[.05]" style={{ borderColor: activeTrack === track.id ? `${track.accent}85` : "rgba(255,255,255,.10)", background: activeTrack === track.id ? `${track.accent}12` : "rgba(255,255,255,.025)" }}><span className="font-mono text-xs" style={{ color: track.accent }}>TRACK 0{index + 1}</span><h3 className="mt-2 text-lg font-black">{track.title}</h3></button>)}</div>
          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-7 md:p-9" style={{ boxShadow: `inset 0 1px 0 ${current.accent}20` }}><div className="flex items-center gap-3" style={{ color: current.accent }}><Compass size={24} /><span className="font-mono text-xs tracking-[.16em]">ACTIVE STUDY LANE</span></div><h3 className="mt-5 text-3xl font-black">{current.title}</h3><div className="mt-7 grid gap-5"><div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5"><p className="font-mono text-[11px] tracking-[.16em] text-slate-400">STUDY QUESTION</p><p className="mt-2 text-lg font-bold leading-7">{current.prompt}</p></div><div className="rounded-2xl border border-white/10 p-5"><p className="font-mono text-[11px] tracking-[.16em] text-slate-400">METHOD</p><p className="mt-2 text-sm leading-7 text-slate-200">{current.method}</p></div><div className="rounded-2xl border border-white/10 p-5"><p className="font-mono text-[11px] tracking-[.16em] text-slate-400">BROWSER-LOCAL OUTPUT</p><p className="mt-2 text-sm leading-7 text-slate-200">{current.output}</p></div></div><button onClick={copyStudyPrompt} className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-950" style={{ background: current.accent }}><Copy size={16} /> Copy local study prompt</button></article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/45"><div className="container py-14 md:py-20"><p className="font-mono text-xs tracking-[.2em] text-emerald-300">AUTHORITATIVE STARTING POINTS</p><h2 className="mt-3 text-3xl font-black">External research, visibly cited</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{references.map((reference, index) => <a key={reference.title} href={reference.href} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/[.035] p-6 transition hover:-translate-y-1 hover:border-emerald-300/35"><div className="flex items-center gap-3 text-emerald-200"><BookOpenCheck size={20} /><span className="font-mono text-xs">SOURCE 0{index + 1}</span></div><h3 className="mt-5 text-xl font-black group-hover:text-emerald-200">{reference.title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{reference.text}</p></a>)}</div></div></section>

      <section className="container py-14 md:py-20"><div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr]"><div><p className="font-mono text-xs tracking-[.2em] text-amber-300">RESEARCH INTO THE ECOSYSTEM</p><h2 className="mt-3 text-3xl font-black">Move from study to the relevant browser-local record.</h2><p className="mt-5 max-w-xl leading-7 text-slate-300">These handoffs connect study methods to ScrollVerse systems without treating a research record as an operating external capability.</p><div className="mt-7 rounded-3xl border border-amber-300/25 bg-amber-300/[.055] p-6"><div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-amber-200" /><p className="text-sm leading-7 text-slate-200"><strong>Protected discovery boundary.</strong> A concept can be preserved, compared, and improved here. External repository work, agent deployment, platform integration, financial action, account access, or infrastructure change remains a separate explicit pathway.</p></div></div></div><div className="grid gap-3 sm:grid-cols-2">{handoffs.map((handoff) => <Link key={handoff.href} href={handoff.href} className="rounded-2xl border border-white/10 bg-white/[.035] p-5 transition hover:border-cyan-300/35 hover:bg-cyan-300/[.05]"><Network className="text-cyan-200" size={20} /><h3 className="mt-4 font-black">{handoff.label}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{handoff.note}</p></Link>)}</div></div></section>

      <section className="container pb-16"><div className="rounded-[2rem] border border-purple-300/25 bg-[linear-gradient(115deg,rgba(185,140,255,.15),rgba(0,212,255,.08),rgba(5,11,26,.7))] p-7 md:p-10"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-xs tracking-[.2em] text-purple-200">DISCOVERY RECORD</p><h2 className="mt-3 text-3xl font-black">Make the method visible before scaling the method.</h2><p className="mt-3 max-w-2xl text-slate-200">Use the Source Registry to attach future source records, then return here to turn evidence into a bounded research question.</p></div><Link href="/connected-source-registry" className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200/35 bg-purple-300/10 px-5 py-3 text-sm font-bold text-purple-50 hover:bg-purple-300/20"><Sparkles size={16} /> Open Source Registry</Link></div></div></section>
    </main>
  );
}
