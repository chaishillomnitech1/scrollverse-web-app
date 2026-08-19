import { Link } from "wouter";
import { toast } from "sonner";
import { BookOpen, ClipboardCheck, Compass, Copy, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const pathways = [
  {
    label: "Evidence & source record",
    detail: "Review protected source intake, version context, rights questions, and release gates before treating any material as public-ready.",
    href: "/asset-registry",
    color: "#00D4FF",
    icon: FileText,
  },
  {
    label: "Creator-owned catalog readiness",
    detail: "Prepare an item-level record for music, books, art, fashion, concepts, services, or learning without creating a product or checkout.",
    href: "/creator-catalog-readiness",
    color: "#FFB800",
    icon: ClipboardCheck,
  },
  {
    label: "Research & interpretation",
    detail: "Study sources, distinctions, open questions, and first-party perspectives while forming an independent interpretation.",
    href: "/knowledge-commons",
    color: "#00FF88",
    icon: BookOpen,
  },
  {
    label: "Correction & operating state",
    detail: "Compare a source statement with current project evidence, delivery state, and a direct correction path.",
    href: "/delivery-resilience",
    color: "#B98CFF",
    icon: ShieldCheck,
  },
];

export default function FirstPartyCoCreationRecord() {
  useSovereignHeartbeat({ page: "first-party-co-creation-record" });

  const copyRecord = async () => {
    const record = [
      "ScrollVerse first-party co-creation record",
      "Origin: owner statement and supplied source materials.",
      "Operating state: first-party presentation and browser-local readiness pathways are available.",
      "Evidence boundary: external systems, providers, deployments, financial outcomes, rights positions, and public results require their own source record before being treated as verified project fact.",
      "Visitor path: review the material, source labels, operating state, and correction pathway; form an independent interpretation.",
    ].join("\n");
    await navigator.clipboard?.writeText(record);
    toast.success("First-party co-creation record copied for browser-local review.");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-16 text-white">
      <header className="border-b border-[#00D4FF]/20 bg-[#050B1A]/95">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/scrollverse-atlas" className="text-sm font-black transition-colors hover:text-[#00D4FF]">← ScrollVerse Atlas</Link>
          <span className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">FIRST-PARTY CO-CREATION RECORD</span>
          <Link href="/asset-registry" className="text-xs font-black text-[#00FF88]">Asset Registry →</Link>
        </div>
      </header>

      <section className="container py-12 md:py-16">
        <div className="max-w-5xl">
          <p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">OWNER STATEMENT · SOURCE TRAIL · VISITOR INTERPRETATION</p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            A first-party account of<br /><span className="text-[#FFCC4D]">creation, co-creation, and continued work.</span>
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[#D6E2EE]">
            This record preserves the owner’s stated account that ScrollVerse work, research direction, supplied materials, and co-creation across tools and systems are part of a continuing creator-led practice. The record presents that account directly, identifies its source status, and provides visible routes for evidence, preparation, study, and correction.
          </p>
        </div>

        <PortalTrustLens
          lane="First-party co-creation record"
          source="Owner statement, supplied materials, protected intake records, and visible ScrollVerse route evidence."
          readiness="First-party presentation, source labels, browser-local preparation, and visitor-led study pathways are available now."
          boundary="Operating state: attributed first-party record. External systems, providers, deployments, financial outcomes, rights positions, and public results remain source claims until their own evidence record establishes a verified project state."
        />

        <section className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(255,184,0,0.38)", background: "linear-gradient(135deg, rgba(255,184,0,0.12), rgba(5,11,26,0.88))" }}>
            <div className="flex items-center gap-3 text-[#FFCC4D]"><Sparkles className="h-5 w-5" /><p className="text-xs font-mono tracking-[.18em]">FIRST-PARTY POSITION</p></div>
            <blockquote className="mt-5 border-l-2 border-[#FFCC4D] pl-5 text-lg font-bold leading-8 text-[#FFF3D2]">
              “The work, research, and co-creations presented here are part of my creator-led record. I continue to research, evolve, teach, help others prosper, and let visitors decide what the material means to them.”
            </blockquote>
            <p className="mt-5 text-sm leading-7 text-[#D9E5EF]">
              This is an attributed owner statement. It does not convert outside-platform messages, code, financial statements, rights assertions, system outputs, or claimed public outcomes into independently verified ScrollVerse facts.
            </p>
            <button type="button" onClick={copyRecord} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#FFCC4D]/50 px-4 py-3 text-xs font-black text-[#FFDD79] transition hover:bg-[#FFCC4D]/10"><Copy className="h-4 w-4" /> Copy record</button>
          </article>

          <article className="rounded-[2rem] border border-[#00D4FF]/30 bg-[#00D4FF]/[.045] p-7">
            <div className="flex items-center gap-3 text-[#00D4FF]"><Compass className="h-5 w-5" /><p className="text-xs font-mono tracking-[.18em]">VISITOR CHOICE PATH</p></div>
            <ol className="mt-6 space-y-5 text-sm leading-6 text-[#D6E2EE]">
              <li><b className="mr-3 text-[#00D4FF]">01</b>Read the first-party account in its own words.</li>
              <li><b className="mr-3 text-[#00D4FF]">02</b>Review source labels, dates, operating states, and evidence limits.</li>
              <li><b className="mr-3 text-[#00D4FF]">03</b>Use linked research and records to study further.</li>
              <li><b className="mr-3 text-[#00D4FF]">04</b>Use the correction path when a source, label, or operating state needs updating.</li>
            </ol>
            <p className="mt-6 rounded-2xl border border-[#00D4FF]/25 bg-[#050B1A]/70 p-4 text-xs leading-6 text-[#BBD1E0]">No visitor account, data sharing, payment, wallet, token, membership, provider connection, or external submission is created on this route.</p>
          </article>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.18em] text-[#B98CFF]">WORK FROM THE RECORD</p><h2 className="mt-2 text-3xl font-black">Choose a transparent next pathway.</h2></div><p className="max-w-lg text-sm leading-6 text-[#AFC1D0]">Each route carries its own source, readiness, and release boundary. None makes an external claim active merely because it is referenced here.</p></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{pathways.map(pathway => { const Icon = pathway.icon; return <Link key={pathway.label} href={pathway.href} className="rounded-2xl border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${pathway.color}4B`, background: "rgba(255,255,255,0.025)" }}><div className="flex items-center gap-3" style={{ color: pathway.color }}><Icon className="h-5 w-5" /><p className="text-xs font-mono tracking-[.14em]">PATHWAY</p></div><h3 className="mt-4 text-xl font-black text-white">{pathway.label}</h3><p className="mt-3 text-sm leading-6 text-[#C9D8E4]">{pathway.detail}</p><p className="mt-5 text-sm font-black" style={{ color: pathway.color }}>Open record →</p></Link>; })}</div>
        </section>
      </section>
    </main>
  );
}
