import { useMemo, useState } from "react";
import { Link } from "wouter";

type WorkflowNode = {
  id: "dynasty" | "rebirth" | "film" | "series" | "brief" | "review";
  stage: "SOURCE" | "STORY" | "BRIEF" | "REVIEW";
  title: string;
  route: string;
  action: string;
  color: string;
  description: string;
  handoff: string;
  boundary: string;
};

const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: "dynasty",
    stage: "SOURCE",
    title: "Dynasty Visual Archive",
    route: "/dynasty-visual-archive",
    action: "Open visual source lane",
    color: "#FFB36B",
    description: "Review creator-supplied Dynasty visual records, preserve their source labels, and select an original-world direction without treating the material as a released campaign or marketplace asset.",
    handoff: "Carries selected source context into a browser-local brief only.",
    boundary: "Asset permission, visual treatment, audio, production, and release decisions remain unfilled.",
  },
  {
    id: "rebirth",
    stage: "SOURCE",
    title: "Rebirth & Living Codex",
    route: "/rebirth-living-codex",
    action: "Open Tree, Water, Knowledge lanes",
    color: "#9BEA9B",
    description: "Shape creator-authored ecological-storytelling and provenance concepts through Tree, Water, and Knowledge lenses with human-governed safeguards.",
    handoff: "Carries care-centered narrative and source context into a browser-local brief only.",
    boundary: "No field activity, ecological intervention, funding, or governance action is authorized here.",
  },
  {
    id: "film",
    stage: "SOURCE",
    title: "INFININILLIONAIRE Film Foundation",
    route: "/infininillionaire-film-foundation",
    action: "Open five-part cinematic arc",
    color: "#D7A7FF",
    description: "Develop original cinematic choices through the public high-level chapter arc—from Queensbridge through THOTHIBIS—while maintaining source scope.",
    handoff: "Carries chapter-level narrative and source context into a browser-local brief only.",
    boundary: "No screenplay clearance, production, casting, budget, token, account, or release claim is made here.",
  },
  {
    id: "series",
    stage: "STORY",
    title: "Seven-Episode Series",
    route: "/seven-episode-series",
    action: "Open season board",
    color: "#70D9FF",
    description: "Place a creator-led concept inside a seven-episode original season with an explicit world, narrative focus, and source lane.",
    handoff: "Carries the selected season context into a browser-local brief only.",
    boundary: "Episode selection is a narrative decision, not a production greenlight.",
  },
  {
    id: "brief",
    stage: "BRIEF",
    title: "Episode Brief Builder",
    route: "/episode-brief-builder",
    action: "Open local brief workspace",
    color: "#FFCF73",
    description: "Gather narrative, visual, sound, rights, accessibility, destination, and release fields in a single local planning record.",
    handoff: "Receives source foundation context, then makes the remaining creator decisions visible.",
    boundary: "No media is generated, no field activity is authorized, and no financial, account, or release action occurs here.",
  },
  {
    id: "review",
    stage: "REVIEW",
    title: "Special Repository",
    route: "/special-repository",
    action: "Open provenance review",
    color: "#FF9DC9",
    description: "Keep source context, creator narrative, access status, and future correction paths together before work moves beyond planning.",
    handoff: "Returns a source-aware record to the creator for later review and exact next-step decisions.",
    boundary: "A repository entry is not an external verification, signature, release, transaction, or deployment record.",
  },
];

const STAGES: WorkflowNode["stage"][] = ["SOURCE", "STORY", "BRIEF", "REVIEW"];

export default function PlanningAtlas() {
  const [activeNodeId, setActiveNodeId] = useState<WorkflowNode["id"]>("dynasty");
  const activeNode = useMemo(
    () => WORKFLOW_NODES.find((node) => node.id === activeNodeId) ?? WORKFLOW_NODES[0],
    [activeNodeId],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      <section className="relative border-b border-[#70D9FF]/25 bg-[radial-gradient(circle_at_15%_18%,rgba(112,217,255,.18),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(215,167,255,.15),transparent_30%),radial-gradient(circle_at_62%_100%,rgba(255,179,107,.12),transparent_35%),#070C18]">
        <div className="container relative py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#BCEEFF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#FFCF73]">CREATOR WORKFLOW · FIRST-PARTY ROUTES</p>
          <h1 aria-label="Planning Atlas" className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Planning <span className="text-[#70D9FF]">Atlas</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">One interactive map for moving a creator-led concept from source context through story design and local brief preparation into provenance review. The workflow is designed to preserve authorship, visibility, and decision ownership at every handoff.</p>
          <div className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-[#BCEEFF]/30 bg-[#BCEEFF]/[.06] px-4 py-3 text-[10px] font-mono font-black tracking-[.16em] text-[#C9F3FF]">SOURCE → STORY → BRIEF → REVIEW</div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.92fr_1.08fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">WORKFLOW MAP</p><h2 className="mt-2 text-2xl font-black">Choose a creator lane</h2></div><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-mono text-[#B7C8D9]">6 FIRST-PARTY NODES</span></div>
            <div className="mt-7 space-y-6">
              {STAGES.map((stage, stageIndex) => (
                <div key={stage} className="relative">
                  {stageIndex < STAGES.length - 1 && <div className="absolute bottom-[-18px] left-4 top-8 w-px bg-gradient-to-b from-white/30 to-transparent" />}
                  <p className="mb-3 pl-10 text-[10px] font-mono tracking-[.2em] text-[#8398AC]">{stage}</p>
                  <div className="space-y-2">{WORKFLOW_NODES.filter((node) => node.stage === stage).map((node) => {
                    const active = node.id === activeNode.id;
                    return <button key={node.id} type="button" onClick={() => setActiveNodeId(node.id)} aria-pressed={active} className="relative w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? `${node.color}A8` : "rgba(255,255,255,.12)", background: active ? `${node.color}15` : "rgba(255,255,255,.02)", boxShadow: active ? `0 15px 30px ${node.color}12` : "none" }}><span className="absolute left-[-25px] top-5 h-3 w-3 rounded-full border-2 bg-[#050914]" style={{ borderColor: node.color }} /><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: node.color }}>{node.stage} NODE</span><span className="mt-2 block text-lg font-black text-white">{node.title}</span><span className="mt-1 block text-xs leading-5 text-[#B7C8D9]">{node.action}</span></button>;
                  })}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: `${activeNode.color}70`, background: `radial-gradient(circle_at_90%_8%, ${activeNode.color}18, transparent 33%), rgba(255,255,255,.025)` }}>
            <p className="text-[10px] font-mono tracking-[.18em]" style={{ color: activeNode.color }}>{activeNode.stage} · ACTIVE NODE</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">{activeNode.title}</h2>
            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeNode.color }}>WHAT THIS NODE HOLDS</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeNode.description}</p></div>
              <div className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeNode.color }}>NEXT HANDOFF</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{activeNode.handoff}</p></div>
              <div className="rounded-2xl border p-5" style={{ borderColor: `${activeNode.color}48`, background: `${activeNode.color}0B` }}><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: activeNode.color }}>BOUNDARY RETAINED</p><p className="mt-3 text-sm leading-7 text-[#E8EEF5]">{activeNode.boundary}</p></div>
            </div>
            <Link href={activeNode.route} className="mt-7 inline-flex items-center rounded-xl px-5 py-3 text-sm font-black text-[#050914] transition hover:brightness-110 active:scale-[.98]" style={{ background: activeNode.color }}>{activeNode.action} →</Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]">
        <div className="container grid gap-5 py-12 md:grid-cols-3 md:py-16">
          <article className="rounded-[1.6rem] border border-[#FFB36B]/35 bg-[#FFB36B]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">1 · PRESERVE THE ORIGIN</p><h3 className="mt-3 text-2xl font-black">Source is not decoration.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Creator-authored material, external reference, and unsupported assumption each need their own visible label before they influence a story decision.</p></article>
          <article className="rounded-[1.6rem] border border-[#70D9FF]/35 bg-[#70D9FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">2 · MAKE CHOICES LEGIBLE</p><h3 className="mt-3 text-2xl font-black">Story before spectacle.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The season and brief routes turn a source direction into an original arc, then make the still-unfilled creative decisions easy to see and own.</p></article>
          <article className="rounded-[1.6rem] border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">3 · REVIEW BEFORE RELEASE</p><h3 className="mt-3 text-2xl font-black">Records keep the door honest.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The repository path preserves context and correction room before a creator elects to pursue any external production, publication, or operational step.</p></article>
        </div>
      </section>

      <section className="container py-12 md:py-16"><div className="rounded-[2rem] border border-[#FFCF73]/30 bg-[radial-gradient(circle_at_90%_10%,rgba(255,207,115,.14),transparent_32%),rgba(255,207,115,.04)] p-6 md:p-8"><p className="text-[10px] font-mono tracking-[.18em] text-[#FFE7B3]">CREATOR CONTROL STAYS VISIBLE</p><p className="mt-4 max-w-4xl text-sm leading-8 text-[#E7EFF7]">No media is generated, no field activity is authorized, and no financial, account, or release action occurs here. The atlas is a first-party navigation and planning surface; each consequential action remains a separate, specific creator decision with its own evidence, permission, and confirmation path.</p></div></section>
    </main>
  );
}
