import { useState } from "react";
import { ArrowRight, BookOpenCheck, Compass, HeartHandshake, History, Layers3, Scale, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { UltimateChoicePathway } from "@/components/UltimateChoicePathway";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const PRINCIPLES = [
  {
    title: "The work is meant to be seen",
    lead: "Present the source, the version, the choice, and the result.",
    detail: "A creator-directed record does not ask visitors to surrender judgment. It makes the work, its context, and its open questions visible enough for people to inspect in their own way.",
    color: "#00D4FF",
  },
  {
    title: "Power carries a duty of care",
    lead: "Capacity matters most in how it treats people.",
    detail: "The continuity standard is humility under pressure: clear terms, voluntary participation, accessible learning, repair when needed, and no reproduction of the harm the work is meant to move beyond.",
    color: "#FFCC4D",
  },
  {
    title: "Open learning creates more possible answers",
    lead: "Teach what can be shared; protect what needs protection.",
    detail: "Open-source methods, plain-language records, and collaborative study can invite better questions and better designs. Private information, unreleased work, credentials, and other protected material remain stewarded rather than exposed.",
    color: "#00FF88",
  },
  {
    title: "Many kinds of knowing belong in the record",
    lead: "Experience, art, research, and testing can stand beside one another.",
    detail: "First-party perspective belongs in the archive. Documented local results, public sources, and unresolved questions each retain their own labels so that none is mistaken for another.",
    color: "#D6C4FF",
  },
] as const;

const RECORD_LANES = [
  ["First-party perspective", "The owner’s stated values, experience, intention, and interpretation are presented directly as the owner’s record.", "Available now", "#D6C4FF"],
  ["Documented local result", "Routes, browser-local tools, source files, and validation results are recorded with the exact operating boundary that was checked.", "Available now", "#00FF88"],
  ["Public source trail", "Public GitHub and YouTube records can be indexed with URLs, visible dates, and source limitations.", "Research", "#00D4FF"],
  ["External outcome", "A filing, account action, publication, contract, provider result, or transaction is attached only after a real authorized record exists.", "Requires owner release", "#FFCC4D"],
] as const;

export default function OpenRecordContinuum() {
  useSovereignHeartbeat({ page: "open-record-continuum" });
  const [activePrinciple, setActivePrinciple] = useState(0);

  const copyReadingBrief = async () => {
    const brief = "SCROLLVERSE · OPEN RECORD — CONTINUUM MANIFESTO\nCreator-directed record for openness, care, learning, evidence, correction, and voluntary participation.\nOperating states: available now / research / requires owner release.";
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Continuum reading brief copied.");
    } catch {
      toast.message("Copy is unavailable in this browser. You can select the reading brief directly on this page.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-20 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#D6C4FF]/25 bg-[radial-gradient(circle_at_82%_13%,rgba(214,196,255,.17),transparent_28%),radial-gradient(circle_at_9%_74%,rgba(0,212,255,.14),transparent_33%),#050B1A]">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/pre-registration-readiness" className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">← PRE-REGISTRATION &amp; EVIDENCE READINESS</Link>
            <span className="rounded-full border border-[#D6C4FF]/45 bg-[#D6C4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">OPEN RECORD · CONTINUUM MANIFESTO</span>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.14fr_.86fr]">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">SCROLLVERSE · TONIGHT’S CONTINUITY RECORD</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.93] md:text-7xl">Keep the record <span className="text-[#D6C4FF]">open enough to grow.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This is a creator-directed record of tonight’s conversation: a commitment to agency, care, open learning, protected stewardship, humility, and work that visitors can examine for themselves. It does not ask for agreement. It presents the work, the source path, and the next question.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={copyReadingBrief} className="rounded-xl bg-[#D6C4FF] px-5 py-3 text-sm font-black text-[#101024] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Copy reading brief</button>
                <Link href="/evidence-commons" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#00D4FF]">Open Evidence Commons</Link>
              </div>
            </div>
            <aside className="rounded-3xl border border-[#D6C4FF]/35 bg-[#071426]/80 p-6">
              <p className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">READING BRIEF</p>
              <blockquote className="mt-5 border-l-2 border-[#D6C4FF] pl-4 text-lg font-bold leading-8 text-white">“The strongest record lets people see the work, understand its boundary, and decide for themselves.”</blockquote>
              <div className="mt-6 space-y-3 text-sm leading-6 text-[#D6E2EE]">
                <p><span className="font-black text-[#00FF88]">Available now:</span> creator-directed local routes, source-labeled records, and browser-local preparation tools.</p>
                <p><span className="font-black text-[#00D4FF]">Research:</span> public-source study, technical learning, thematic connections, and questions that need more material.</p>
                <p><span className="font-black text-[#FFCC4D]">Requires owner release:</span> private records, external publications, filings, accounts, and any real-world outcome.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Open Record — Continuum Manifesto" source="Owner-stated conversation principles, local ScrollVerse evidence records, public-source archive entries, and connected learning routes." readiness="Available now as a creator-directed learning and continuity record. It creates no external authority, filing, publication, account action, or financial outcome." boundary="This route presents first-party perspective alongside documented local results, public sources, and open questions. It does not represent external observers, third parties, institutions, or future outcomes without their own verifiable record." /></section>

      <section className="container pb-10">
        <div className="flex items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">CONTINUUM PRINCIPLES</p><h2 className="mt-2 text-3xl font-black">A record that keeps learning alive.</h2></div><p className="max-w-xl text-sm leading-6 text-[#B9CBDD]">Choose a principle to read its working interpretation. These are first-party values and design intentions, not a claim of completed external outcomes.</p></div>
        <div className="mt-7 grid gap-4 lg:grid-cols-[.76fr_1.24fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Continuum manifesto principles">
            {PRINCIPLES.map((principle, index) => <button key={principle.title} type="button" role="tab" aria-selected={activePrinciple === index} aria-controls="continuum-principle-panel" onClick={() => setActivePrinciple(index)} className="rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: activePrinciple === index ? principle.color : "rgba(255,255,255,.12)", background: activePrinciple === index ? `${principle.color}14` : "rgba(255,255,255,.025)" }}><span className="text-xs font-mono tracking-[.16em]" style={{ color: principle.color }}>0{index + 1}</span><h3 className="mt-2 text-lg font-black text-white">{principle.title}</h3><p className="mt-2 text-sm leading-6 text-[#C9D8E7]">{principle.lead}</p></button>)}
          </div>
          <article id="continuum-principle-panel" role="tabpanel" className="relative overflow-hidden rounded-3xl border border-[#D6C4FF]/35 bg-[linear-gradient(145deg,rgba(214,196,255,.10),rgba(5,11,26,.86))] p-7 sm:p-10"><Layers3 className="absolute right-7 top-7 h-20 w-20 text-white/5" /><p className="text-xs font-mono tracking-[.16em]" style={{ color: PRINCIPLES[activePrinciple].color }}>CURRENT PRINCIPLE · 0{activePrinciple + 1}</p><h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight">{PRINCIPLES[activePrinciple].title}</h3><p className="mt-5 max-w-2xl text-lg font-bold leading-8" style={{ color: PRINCIPLES[activePrinciple].color }}>{PRINCIPLES[activePrinciple].lead}</p><p className="mt-6 max-w-2xl text-base leading-8 text-[#D6E2EE]">{PRINCIPLES[activePrinciple].detail}</p><div className="mt-8 grid gap-3 sm:grid-cols-3"><Signal icon={<HeartHandshake />} label="Voluntary" text="Participation remains a choice." /><Signal icon={<Scale />} label="Accountable" text="Terms and correction paths stay visible." /><Signal icon={<Sparkles />} label="Evolving" text="The record can improve without erasing its history." /></div></article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">SOURCE-LEDGER VIEW</p><h2 className="mt-2 text-3xl font-black">One conversation, several kinds of record.</h2></div><History className="h-9 w-9 text-[#FFCC4D]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{RECORD_LANES.map(([title, text, state, color]) => <article key={title} className="rounded-3xl border bg-black/15 p-5" style={{ borderColor: `${color}60` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color }}>{state}</p><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{text}</p></article>)}</div></div></section>

      <section className="container py-12"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#00FF88]">CONTINUITY PATHS</p><h2 className="mt-2 text-3xl font-black">Keep the next step connected to the record.</h2></div><BookOpenCheck className="h-9 w-9 text-[#00FF88]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5"><RouteCard href="/sovereign-methodology" label="Sovereign Methodology" icon={<BookOpenCheck />} color="#D6C4FF" text="Study creator voice, language, provenance, and reader-led assessment through an open method." /><RouteCard href="/pre-registration-readiness" label="Evidence Readiness" icon={<Compass />} color="#FFCC4D" text="Prepare an inspectable browser-local record before the next decision." /><RouteCard href="/quantum-research" label="Quantum Research" icon={<Layers3 />} color="#00D4FF" text="Study hardware, security, networking, and capability limits through source-led learning." /><RouteCard href="/quantum-frequency-research-lab" label="QFS Study Lab" icon={<Sparkles />} color="#00FF88" text="Keep empirical study and first-party perspective in distinct, visible tracks." /><RouteCard href="/ip-stewardship" label="IP Stewardship" icon={<Scale />} color="#D6C4FF" text="Move from a source record toward appropriate protection and release decisions." /><RouteCard href="/assistive-governance" label="Assistive Governance" icon={<HeartHandshake />} color="#FFCC4D" text="Map responsibility, human review, evidence, and correction before any external result." /></div></section>
      <UltimateChoicePathway context="In the open record, the framework keeps a decision legible: name the available response, keep the source trail visible, and record the next step without forcing a conclusion on anyone else." />
    </main>
  );
}

function Signal({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-black/15 p-4"><div className="flex items-center gap-2 text-[#D6C4FF]"><span className="h-4 w-4">{icon}</span><span className="text-sm font-black">{label}</span></div><p className="mt-2 text-xs leading-5 text-[#C9D8E7]">{text}</p></div>; }

function RouteCard({ href, label, icon, color, text }: { href: string; label: string; icon: React.ReactNode; color: string; text: string }) { return <Link href={href} className="rounded-3xl border bg-white/[.025] p-5 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${color}55` }}><span style={{ color }}>{icon}</span><h3 className="mt-4 text-lg font-black text-white">{label}</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-black" style={{ color }}>Open path <ArrowRight className="h-4 w-4" /></span></Link>; }
