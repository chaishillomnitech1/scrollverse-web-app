import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Atom, BookOpenCheck, Cpu, Network, ShieldCheck } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const RESEARCH_TRACKS = [
  {
    id: "hardware",
    index: "01",
    title: "Hardware & error correction",
    icon: Cpu,
    color: "#00D4FF",
    state: "Experimental research",
    summary: "Logical qubits are encoded across physical qubits. Recent experiments demonstrate important error-correction progress, while fault-tolerant computation still requires substantial scale, stability, decoding, and engineering work.",
    evidence: "Google’s 2025 Nature paper reports below-threshold surface-code memory experiments on Willow. IBM’s Starling timeline is a published roadmap target, not a completed public capability.",
    sources: [
      { label: "Nature: quantum error correction below threshold", href: "https://www.nature.com/articles/s41586-024-08449-y" },
      { label: "IBM: fault-tolerant roadmap", href: "https://www.ibm.com/quantum/blog/large-scale-ftqc" },
    ],
  },
  {
    id: "pqc",
    index: "02",
    title: "Post-quantum security",
    icon: ShieldCheck,
    color: "#B98CFF",
    state: "Standards and migration research",
    summary: "Post-quantum cryptography is classical cryptography designed to withstand future quantum attacks. It is a migration and cryptographic-agility practice, distinct from operating a quantum computer.",
    evidence: "NIST finalized FIPS 203, 204, and 205 in 2024. A responsible preparation path begins with an inventory of real algorithms, data lifetimes, vendors, certificates, and signing flows.",
    sources: [
      { label: "NIST: finalized PQC standards", href: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards" },
      { label: "NIST: migration to PQC", href: "https://www.nccoe.nist.gov/applied-cryptography/migration-to-pqc" },
    ],
  },
  {
    id: "network",
    index: "03",
    title: "Quantum networking",
    icon: Network,
    color: "#00FF88",
    state: "Infrastructure research",
    summary: "Quantum networks require physical components and protocols for communicating quantum states, including nonclassical light, single-photon detection, quantum memory, repeaters, transduction, and classical control.",
    evidence: "DOE and NIST frame quantum networking as a research and engineering frontier that complements classical networking. A normal website or blockchain connection is not a quantum network.",
    sources: [
      { label: "DOE: quantum networks", href: "https://www.energy.gov/science/doe-explainsquantum-networks" },
      { label: "NIST: quantum networks", href: "https://www.nist.gov/pml/productsservices/quantum-networks-nist" },
    ],
  },
  {
    id: "qfs",
    index: "04",
    title: "QFS perspective & coexistence",
    icon: Atom,
    color: "#FFCC4D",
    state: "First-party ScrollVerse perspective",
    summary: "ScrollVerse presents an open philosophical track about inclusion, coexistence, accountable systems, and the ways people may evaluate the roles of connected technologies in society.",
    evidence: "This is a first-party perspective alongside, not inside, the empirical research record. It does not establish a bank, a quantum financial system, a payment rail, a security guarantee, or authority for a digital system.",
    sources: [],
  },
] as const;

const READINESS_STEPS = [
  ["Inventory", "List actual cryptographic dependencies, public-key algorithms, signing flows, certificates, vendors, and long-lived data."],
  ["Assess", "Identify which assets need a durable transition path and which implementations are outside the local portal."],
  ["Design", "Choose a reviewed migration pattern and preserve algorithm agility rather than hard-coding a label as proof of security."],
  ["Validate", "Test a real implementation in a controlled environment, record the outcome, and keep the correction path visible."],
] as const;

export default function QuantumResearch() {
  useSovereignHeartbeat({ page: "quantum-research" });
  const [activeId, setActiveId] = useState<(typeof RESEARCH_TRACKS)[number]["id"]>("hardware");
  const activeTrack = useMemo(() => RESEARCH_TRACKS.find(track => track.id === activeId) ?? RESEARCH_TRACKS[0], [activeId]);
  const ActiveIcon = activeTrack.icon;

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← ScrollVerse</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/quantum-frequency-research-lab" className="rounded-lg border border-[#B98CFF]/50 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">QFS Research Lab</Link>
            <Link href="/capability-audit" className="rounded-lg border border-[#00D4FF]/50 px-3 py-2 text-xs font-black text-[#00D4FF] transition hover:border-[#00D4FF]">Capability Audit</Link>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 8% 12%, rgba(0,212,255,.16), transparent 30%), radial-gradient(circle at 92% 14%, rgba(185,140,255,.14), transparent 28%), radial-gradient(circle at 65% 98%, rgba(0,255,136,.1), transparent 35%), #071124" }}>
          <p className="text-xs font-mono tracking-[.2em] text-[#00D4FF]">SCROLLVERSE QUANTUM RESEARCH · FREE OPEN LEARNING</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.22fr_.78fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Quantum computing—<span className="text-[#B98CFF]">source by source,</span> with the next question visible.</h1>
              <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This open research destination packages quantum hardware, error correction, post-quantum security, quantum networking, and ScrollVerse’s first-party QFS perspective into distinct tracks. Visitors can follow what has been measured, what remains research, and what requires an owner-controlled external record.</p>
            </div>
            <div className="rounded-3xl border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.06] p-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FFCC4D]"><BookOpenCheck className="h-4 w-4" />READING STANDARD</div>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Every empirical track names its source, operating state, limitation, and next evidence needed. The QFS track is direct first-party philosophical context, held visibly separate from technical claims.</p>
            </div>
          </div>
        </section>

        <div className="mt-8"><PortalTrustLens lane="Quantum research and QFS learning" source="NIST, U.S. Department of Energy, peer-reviewed research, IBM’s published roadmap, and first-party ScrollVerse research records." readiness="Research tracks and browser-local route selection are available now. Cryptographic implementations, provider experiments, quantum hardware, networks, and financial operations each require their own evidenced release record." boundary="Operating state: research and free learning. This destination does not operate a quantum computer, issue security assurances, activate a QFS, bank interface, payment flow, wallet, contract, account, or network connection." /></div>

        <section className="mt-8" aria-labelledby="research-tracks-heading">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">FOUR RESEARCH TRACKS</p><h2 id="research-tracks-heading" className="mt-2 text-3xl font-black">Select one track to inspect its evidence record.</h2></div><p className="max-w-xl text-sm leading-7 text-[#B8CCDC]">The selection changes only this browser view. It does not connect an account or modify a security, financial, hardware, or network system.</p></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Select a quantum research track">
            {RESEARCH_TRACKS.map(track => {
              const Icon = track.icon;
              const selected = track.id === activeTrack.id;
              return <button key={track.id} type="button" aria-pressed={selected} onClick={() => setActiveId(track.id)} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: selected ? track.color : "rgba(255,255,255,.14)", background: selected ? `${track.color}14` : "rgba(255,255,255,.025)" }}><div className="flex items-center justify-between"><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: track.color }}>{track.index} · {track.state}</span><Icon className="h-5 w-5" style={{ color: track.color }} /></div><h3 className="mt-4 text-xl font-black">{track.title}</h3><p className="mt-3 text-xs leading-6 text-[#C7D7E5]">{track.summary}</p></button>;
            })}
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-3xl border p-7 sm:p-8" style={{ borderColor: `${activeTrack.color}66`, background: `linear-gradient(130deg, ${activeTrack.color}12, rgba(5,11,26,.86))` }}>
          <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${activeTrack.color}20`, color: activeTrack.color }}><ActiveIcon className="h-6 w-6" /></div><div><p className="text-xs font-mono tracking-[.18em]" style={{ color: activeTrack.color }}>{activeTrack.state.toUpperCase()}</p><h2 className="mt-2 text-3xl font-black">{activeTrack.title}</h2></div></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ color: activeTrack.color, borderColor: `${activeTrack.color}66` }}>SOURCE → LIMITATION → NEXT EVIDENCE</span></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2"><ResearchPanel label="WHAT THIS TRACK STUDIES" value={activeTrack.summary} color={activeTrack.color}/><ResearchPanel label="EVIDENCE AND LIMITATION" value={activeTrack.evidence} color="#00FF88" /></div>
          {activeTrack.sources.length > 0 ? <div className="mt-6 flex flex-wrap gap-3">{activeTrack.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-3 text-xs font-black transition hover:bg-white/5" style={{ borderColor: `${activeTrack.color}66`, color: activeTrack.color }}>{source.label} ↗</a>)}</div> : <div className="mt-6 rounded-2xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.05] p-5"><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">FIRST-PARTY CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The ScrollVerse perspective centers expansive coexistence, inclusive design, and accountable stewardship around networked technologies. It is provided so visitors can consider the creator’s vision alongside the empirical record and make their own assessment.</p></div>}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
          <article className="rounded-3xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#D6C4FF]">POST-QUANTUM PREPARATION PACK</p><h2 className="mt-3 text-3xl font-black">A real preparation path starts with inventory, not a label.</h2><div className="mt-6 space-y-4">{READINESS_STEPS.map(([title, detail], index) => <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/10 p-4"><span className="font-mono text-sm text-[#B98CFF]">0{index + 1}</span><div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-[#D6E2EE]">{detail}</p></div></div>)}</div><p className="mt-5 text-xs leading-6 text-[#AFC3D8]">Current state: an educational readiness map. No cryptographic key, hybrid envelope, security migration, wallet, or financial workflow is activated by this route.</p></article>
          <article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#00FF88]">QFS RESEARCH BRIDGE</p><h2 className="mt-3 text-3xl font-black">Connect the research destination to the QFS study lab.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The QFS study lab keeps quantum-information science, post-quantum migration, reproducible signal study, and cultural interpretation in separate lanes. This route supplies the expanded hardware, security, networking, and first-party context record behind that learning path.</p><div className="mt-6 space-y-3"><Link href="/quantum-frequency-research-lab" className="flex items-center justify-between rounded-2xl border border-[#00FF88]/40 p-4 text-sm font-black text-[#00FF88] transition hover:bg-[#00FF88]/[.06]">Open QFS Research Lab <ArrowRight className="h-4 w-4" /></Link><Link href="/creator-infrastructure" className="flex items-center justify-between rounded-2xl border border-[#00D4FF]/40 p-4 text-sm font-black text-[#00D4FF] transition hover:bg-[#00D4FF]/[.06]">Open Creator Infrastructure Map <ArrowRight className="h-4 w-4" /></Link><Link href="/capability-audit" className="flex items-center justify-between rounded-2xl border border-[#FFCC4D]/40 p-4 text-sm font-black text-[#FFCC4D] transition hover:bg-[#FFCC4D]/[.06]">Review Current Capability State <ArrowRight className="h-4 w-4" /></Link></div></article>
        </section>

        <section className="mt-8 rounded-3xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.045] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#FFCC4D]">LAWFUL EVIDENCE & GOVERNANCE READINESS</p><div className="mt-3 grid gap-6 lg:grid-cols-[1.08fr_.92fr]"><div><h2 className="text-3xl font-black">Turn the record into a reviewable path—one real asset, claim, or decision at a time.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">ScrollVerse can preserve dated source materials, version history, contributor context, research citations, accessibility records, decision notes, and correction paths. Those records support lawful readiness for original work and accountable governance; they do not by themselves create a registration, win a legal dispute, establish institutional authority, or determine a future public role.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><h3 className="font-black text-[#FFCC4D]">01 · Evidence packet</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Tie the exact source, date, version, accessible context, and correction path to the exact claim or created asset.</p></div><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><h3 className="font-black text-[#00D4FF]">02 · Protection readiness</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Classify created works, names, inventions, confidential methods, and permissions before considering a filing, release, or agreement.</p></div><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><h3 className="font-black text-[#00FF88]">03 · Accountable review</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Identify the accountable owner or organization, scope, consequence, authorization, and stop/correction path for a real decision.</p></div><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><h3 className="font-black text-[#B98CFF]">04 · Actual outcome</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Attach a filing, registration, agreement, provider result, or correction record only after the outcome genuinely exists.</p></div></div></div><aside className="rounded-3xl border border-[#FFCC4D]/40 bg-[#050B1A]/60 p-6"><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">CONNECTED WORKBENCHES</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use the existing local workbenches to prepare a reviewable record. External filings, legal outcomes, financial actions, and institutional decisions remain tied to their own authorized process and actual evidence.</p><div className="mt-5 space-y-3"><Link href="/pre-registration-readiness" className="flex items-center justify-between rounded-2xl border border-[#FFCC4D]/45 p-4 text-sm font-black text-[#FFCC4D] transition hover:bg-[#FFCC4D]/[.06]">Open Pre-Registration Readiness <ArrowRight className="h-4 w-4" /></Link><Link href="/ip-stewardship" className="flex items-center justify-between rounded-2xl border border-[#B98CFF]/45 p-4 text-sm font-black text-[#D6C4FF] transition hover:bg-[#B98CFF]/[.06]">Open IP Stewardship <ArrowRight className="h-4 w-4" /></Link><Link href="/assistive-governance" className="flex items-center justify-between rounded-2xl border border-[#00FF88]/45 p-4 text-sm font-black text-[#00FF88] transition hover:bg-[#00FF88]/[.06]">Open Assistive Governance <ArrowRight className="h-4 w-4" /></Link><Link href="/evidence-standards" className="flex items-center justify-between rounded-2xl border border-[#00D4FF]/45 p-4 text-sm font-black text-[#00D4FF] transition hover:bg-[#00D4FF]/[.06]">Open Evidence Standards <ArrowRight className="h-4 w-4" /></Link></div></aside></div></section>

        <section className="mt-8 rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.035] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">SOURCE TRAIL</p><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 text-sm leading-7 text-[#D6E2EE]"><p><span className="font-black text-white">[1]</span> Google Quantum AI, <a className="text-[#00D4FF] underline" href="https://www.nature.com/articles/s41586-024-08449-y" target="_blank" rel="noreferrer">Quantum error correction below the surface code threshold</a> (2025).</p><p><span className="font-black text-white">[2]</span> NIST, <a className="text-[#00D4FF] underline" href="https://www.nist.gov/quantum-information-science/quantum-computing-explained" target="_blank" rel="noreferrer">Quantum Computing Explained</a> (updated 2026).</p><p><span className="font-black text-white">[3]</span> NIST, <a className="text-[#00D4FF] underline" href="https://www.nist.gov/pqc" target="_blank" rel="noreferrer">Post-Quantum Cryptography</a>.</p><p><span className="font-black text-white">[4]</span> U.S. DOE, <a className="text-[#00D4FF] underline" href="https://www.energy.gov/science/doe-explainsquantum-networks" target="_blank" rel="noreferrer">DOE Explains: Quantum Networks</a>.</p><p><span className="font-black text-white">[5]</span> NIST, <a className="text-[#00D4FF] underline" href="https://www.nist.gov/pml/productsservices/quantum-networks-nist" target="_blank" rel="noreferrer">Quantum Networks at NIST</a>.</p><p><span className="font-black text-white">[6]</span> The complete local research record, protected-intake classification, and correction path are stored in <code className="rounded bg-black/25 px-1.5 py-0.5 text-xs text-[#D6C4FF]">docs/phase335-quantum-computing-research.md</code>.</p></div></section>
      </section>
    </main>
  );
}

function ResearchPanel({ label, value, color }: { label: string; value: string; color: string }) {
  return <div className="rounded-2xl border border-white/10 bg-[#050B1A]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color }}>{label}</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{value}</p></div>;
}
