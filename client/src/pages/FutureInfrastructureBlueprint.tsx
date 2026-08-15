import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ResearchLane = {
  id: string;
  number: string;
  title: string;
  color: string;
  status: string;
  question: string;
  established: string;
  practical: string;
  boundary: string;
  sources: { label: string; href: string }[];
};

const LANES: ResearchLane[] = [
  {
    id: "pqc", number: "01", title: "Post-quantum security", color: "#00D4FF", status: "PUBLIC STANDARDS RESEARCH",
    question: "How can systems inventory current cryptography and plan a standards-based migration without overstating security?",
    established: "NIST has released post-quantum standards and recommends organizations identify vulnerable algorithms and plan transitions. FIPS 203 specifies ML-KEM, a module-lattice-based key-encapsulation mechanism.",
    practical: "Study cryptographic inventory, interoperability, migration sequencing, key lifecycle, and test evidence before selecting or deploying any implementation.",
    boundary: "Operating state: public standards research and migration study. Product selection, cryptographic implementation, certification, and security assurance each move through their own evidence and owner-release path.",
    sources: [{ label: "NIST PQC", href: "https://www.nist.gov/pqc" }, { label: "NIST FIPS 203", href: "https://csrc.nist.gov/pubs/fips/203/final" }],
  },
  {
    id: "finance", number: "02", title: "Financial-service categories", color: "#FFB800", status: "REGULATORY RESEARCH",
    question: "Which activities are ordinary creator-commerce preparation and which can become regulated financial-service categories?",
    established: "FinCEN describes money transmission, currency exchange, check cashing, and certain stored-value activities in its money-services-business framework. Consumer-finance rules and policy are maintained through public regulatory processes.",
    practical: "Research jurisdiction, product characterization, consumer disclosures, provider eligibility, privacy, support, dispute handling, and compliance review before any real money movement.",
    boundary: "Operating state: research and creator-commerce planning. Bank, MSB, lending, exchange, custody, card, brokerage, investment, payment, and money-transmission functions each require their own authorized operating model and release path.",
    sources: [{ label: "FinCEN MSB registration", href: "https://www.fincen.gov/resources/money-services-business-msb-registration" }, { label: "CFPB rules and policy", href: "https://www.consumerfinance.gov/rules-policy/" }],
  },
  {
    id: "ip", number: "03", title: "IP research pathways", color: "#B98CFF", status: "PUBLIC RESEARCH TOOLS",
    question: "What kind of intellectual-property question is being explored: brand, invention, or original expression?",
    established: "USPTO distinguishes trademark, patent, and copyright categories; its public tools support research into U.S. patents and published applications.",
    practical: "Use a source trail, record the work’s origin and contributors, identify the protection category being researched, and obtain qualified review before taking any legal step.",
    boundary: "Operating state: public IP research and source recording. Clearance, filing, registration, assignment, ownership, and enforcement steps move through qualified review and the applicable formal process.",
    sources: [{ label: "USPTO IP categories", href: "https://www.uspto.gov/trademarks/basics/trademark-patent-copyright" }, { label: "USPTO Patent Public Search", href: "https://www.uspto.gov/patents/search/patent-public-search" }],
  },
  {
    id: "domains", number: "04", title: "Domain research and stewardship", color: "#00FF88", status: "REGISTRANT EDUCATION",
    question: "How can a domain research plan preserve owner control, accurate records, renewal awareness, and transfer readiness?",
    established: "ICANN explains that domain registrants contract with registrars and have rights and responsibilities related to management, transfer, renewal, restoration, and registration data.",
    practical: "Track intended names, registrar relationship, renewal date, contacts, DNS plan, brand research, and owner review—then use a separately authorized registrar workflow if a real action is approved.",
    boundary: "Operating state: registrant education and owner planning. Availability, purchase, transfer, DNS, registrar access, and ownership records move through the relevant registrar and owner-controlled process.",
    sources: [{ label: "ICANN registrant information", href: "https://www.icann.org/registrants" }, { label: "ICANN registration process", href: "https://www.icann.org/resources/pages/domain-name-registration-process-2023-11-02-en" }],
  },
  {
    id: "creator", number: "05", title: "Creator-controlled infrastructure", color: "#FF6B9A", status: "FIRST-PARTY READINESS",
    question: "How can creators make rights, source, accessibility, contributor, distribution, and release decisions visible before they build an external offering?",
    established: "ScrollVerse already includes local catalog evidence, creator planning, research, and readiness routes that preserve source and review states.",
    practical: "Start with the Creator Media Packet and Workstation, prepare an evidence record, then move into external provider or commercial workflows only with the matching rights, product, provider, and owner gates complete.",
    boundary: "Operating state: first-party catalog and release preparation. Distribution, licensing, payment, provider connection, tokenization, wallet use, and asset transfer each require their own cleared release record.",
    sources: [{ label: "Creator Media Packet", href: "/creator-media-packet" }, { label: "Owner Workstation", href: "/owner-workstation" }],
  },
];

export default function FutureInfrastructureBlueprint() {
  useSovereignHeartbeat({ page: "future-infrastructure-blueprint" });
  const [activeId, setActiveId] = useState(LANES[0].id);
  const [localNote, setLocalNote] = useState("");
  const active = useMemo(() => LANES.find(lane => lane.id === activeId) ?? LANES[0], [activeId]);
  const copyNote = async () => {
    try {
      await navigator.clipboard.writeText(`Future Infrastructure Blueprint — ${active.title}\n\nResearch question: ${active.question}\n\nMy browser-local note:\n${localNote}`);
      toast.success("Research note copied locally.");
    } catch { toast.error("Copy is unavailable in this browser."); }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-16 text-white"><header className="border-b border-[#00D4FF]/20 bg-[#050B1A]/95"><div className="container flex flex-wrap items-center justify-between gap-3 py-4"><Link href="/" className="text-sm font-black transition hover:text-[#00D4FF]">← ScrollVerse</Link><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">FUTURE INFRASTRUCTURE BLUEPRINT</div><Link href="/financial-activation-readiness" className="text-xs font-black text-[#FFCC4D]">Financial readiness →</Link></div></header><section className="container py-12 md:py-16"><p className="text-xs font-mono tracking-[.2em] text-[#00D4FF]">FIRST-PARTY RESEARCH MAP · SOURCE → QUESTION → REVIEW → OWNER GATE</p><h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Study the systems ahead.<br /><span className="text-[#FFCC4D]">Present the work. Follow the record. Build with evidence.</span></h1><p className="mt-6 max-w-4xl text-base leading-8 text-[#D6E2EE]">This is ScrollVerse’s first-party learning blueprint for post-quantum security, financial-service categories, intellectual-property research, domain stewardship, and creator-controlled infrastructure. It presents the source trail, working questions, and current operating state so each visitor can examine the material and make an independent assessment.</p><PortalTrustLens lane="Future infrastructure research" source="NIST, FinCEN, CFPB, USPTO, ICANN, and first-party ScrollVerse readiness records; the full source trail is linked within each study lane." readiness="Research, browser-local notes, and existing ScrollVerse readiness routes are active. Filing, registration, provider, financial, wallet, contract, and network activities are individual owner-release lanes with their own evidence records." boundary="Operating state: public research and first-party preparation. Each regulated, provider-backed, financial, or on-chain capability advances through its matching formal, provider, and owner-controlled release path." /><section className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{LANES.map(lane => <button key={lane.id} type="button" onClick={() => setActiveId(lane.id)} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: active.id === lane.id ? lane.color : "rgba(255,255,255,0.14)", background: active.id === lane.id ? `${lane.color}14` : "rgba(255,255,255,0.025)" }}><span className="text-[10px] font-mono" style={{ color: lane.color }}>{lane.number} · {lane.status}</span><h2 className="mt-3 text-xl font-black">{lane.title}</h2><p className="mt-3 text-xs leading-5 text-[#BFD4E5]">{lane.question}</p></button>)}</section><section className="mt-6 rounded-3xl border p-7" style={{ borderColor: `${active.color}66`, background: `linear-gradient(135deg, ${active.color}0C, rgba(4,14,30,0.72))` }}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-mono tracking-[.18em]" style={{ color: active.color }}>{active.status}</p><h2 className="mt-2 text-3xl font-black">{active.title}</h2></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ color: active.color, borderColor: `${active.color}55` }}>RESEARCH LANE · CURRENT STATE</span></div><div className="mt-6 grid gap-5 lg:grid-cols-3"><InfoCard label="PUBLIC RECORD" text={active.established} color={active.color} /><InfoCard label="RESEARCH PRACTICE" text={active.practical} color="#00FF88" /><InfoCard label="OPERATING STATE" text={active.boundary} color="#FF7575" /></div><div className="mt-6 flex flex-wrap gap-3">{active.sources.map(source => source.href.startsWith("/") ? <Link key={source.label} href={source.href} className="rounded-xl border px-4 py-3 text-xs font-black" style={{ color: active.color, borderColor: `${active.color}66` }}>{source.label} →</Link> : <a key={source.label} href={source.href} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-3 text-xs font-black" style={{ color: active.color, borderColor: `${active.color}66` }}>{source.label} ↗</a>)}</div></section><section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.04] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#D6C4FF]">BROWSER-LOCAL STUDY NOTE</p><h2 className="mt-3 text-2xl font-black">Record the research question before the next action.</h2><textarea value={localNote} onChange={event => setLocalNote(event.target.value)} placeholder="What are you researching? What source is relevant? What needs qualified review or owner approval before any real-world step?" rows={8} maxLength={2800} className="mt-5 w-full resize-none rounded-2xl border border-white/15 bg-black/20 p-4 text-sm leading-6 outline-none" /><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={copyNote} className="rounded-xl bg-[#B98CFF] px-4 py-3 text-xs font-black text-[#050B1A]">Copy study note</button><button type="button" onClick={() => { setLocalNote(""); toast.success("Browser-local note cleared."); }} className="rounded-xl border border-white/15 px-4 py-3 text-xs font-black text-[#D6E2EE]">Clear note</button></div><p className="mt-4 text-xs leading-6 text-[#9FB2C5]">Operating state: this study note stays in the current browser session. Formal actions move through their relevant owner and provider release process.</p></div><div className="rounded-3xl border border-[#00FF88]/30 bg-[#00FF88]/[.035] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#00FF88]">OWNER-GATED NEXT STEPS</p><h2 className="mt-3 text-2xl font-black">Research first. Evidence second. Action when the release record is complete.</h2><ol className="mt-5 space-y-4 text-sm leading-6 text-[#D6E2EE]"><li><span className="font-mono text-[#00FF88]">01</span> Identify the exact question and its authoritative public source.</li><li><span className="font-mono text-[#00FF88]">02</span> Record origin, rights, jurisdiction, contributor, accessibility, and consumer-impact questions.</li><li><span className="font-mono text-[#00FF88]">03</span> Complete the professional, provider, and owner review appropriate to the specific activity.</li><li><span className="font-mono text-[#00FF88]">04</span> Advance through a separate, explicit release record for any irreversible filing, transfer, payment, wallet, provider, or network action.</li></ol><Link href="/owner-workstation" className="mt-6 inline-flex text-sm font-black text-[#00FF88]">Open the owner Workstation →</Link></div></section><section className="mt-6 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.04] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#FFCC4D]">PROTECTED REFERENCE INTAKE</p><p className="mt-3 max-w-5xl text-sm leading-7 text-[#D6E2EE]">Owner-supplied architecture material regarding biometric identity, lattice cryptography, zero-knowledge systems, payout allocation, domain/IP systems, wallets, private repositories, and broadcast statements is retained as protected reference. Its compatible lessons—documentation isolation, source records, review sequencing, and rest-state design—inform this research map. Public sources establish the factual research context; individual release records establish future operating state.</p></section></section></main>;
}

function InfoCard({ label, text, color }: { label: string; text: string; color: string }) {
  return <article className="rounded-2xl border border-white/10 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color }}>{label}</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{text}</p></article>;
}
