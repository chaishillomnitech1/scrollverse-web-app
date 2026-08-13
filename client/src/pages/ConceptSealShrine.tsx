import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const provenance = [
  ["Record", "SV-CS-2026-01"],
  ["First public page", "August 13, 2026"],
  ["Creative steward", "Chais \"Sabir Kajir\" Hill the Great"],
  ["Status", "Original concept record · not a registration"],
];

const commitments = [
  ["Open", "A mark should point visitors toward the source, the maker, and the next clear route."],
  ["Spiral", "The signature is an original, open-ended motion study—not a claim over mathematics, nature, or a universal symbol."],
  ["Record", "Every future refinement should carry a visible date, version note, and creator record."],
  ["Care", "The shrine is an artistic provenance space, not a devotional game, financial product, or authority system."],
];

export default function ConceptSealShrine() {
  useSovereignHeartbeat({ page: "concept-seal-shrine" });

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-black text-[#00D4FF] transition-colors hover:text-white">← Return to ScrollVerse</Link>
        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#FFB800]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,184,0,0.16), transparent 22%), radial-gradient(circle at 15% 18%, rgba(0,212,255,0.14), transparent 26%), radial-gradient(circle at 84% 78%, rgba(185,140,255,0.15), transparent 27%), #071124" }}>
          <div className="pointer-events-none absolute inset-0 opacity-80" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="mx-auto w-full max-w-md">
              <div className="relative aspect-square rounded-full border border-[#FFB800]/45 bg-[#050B1A]/75 shadow-[0_0_90px_rgba(255,184,0,0.18)]">
                <div className="absolute inset-[7%] rounded-full border border-[#00D4FF]/40" />
                <div className="absolute inset-[15%] rounded-full border border-[#B98CFF]/45" />
                <div className="absolute inset-[23%] rounded-full border border-[#00FF88]/40" />
                <div className="absolute inset-[31%] rounded-full border border-[#FFB800]/70" />
                <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#FFB800] shadow-[0_0_42px_rgba(255,184,0,0.55)]" />
                <div className="absolute left-[18%] top-[20%] h-[62%] w-[63%] rotate-[28deg] rounded-[48%] border border-[#00D4FF]/70" />
                <div className="absolute left-[27%] top-[27%] h-[45%] w-[46%] rotate-[-42deg] rounded-[48%] border border-[#B98CFF]/75" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><div className="font-mono text-[10px] tracking-[0.3em] text-[#FFB800]">OPEN SPIRAL</div><div className="mt-2 text-4xl font-black text-white">SV</div><div className="mt-2 text-[10px] font-mono tracking-[0.24em] text-[#00D4FF]">2026 · CTG</div></div></div>
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-[#B8C7D6]">ORIGINAL MOTION STUDY</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono tracking-[0.22em] text-[#FFB800]">SCROLLVERSE CONCEPT SEAL · PUBLIC RECORD</div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">The Open Spiral Seal</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#D6E2EE]">A creator-owned concept mark for open inquiry, documented making, and routes that remain visible. The design uses an original layered spiral composition built for ScrollVerse’s 2026 visual language.</p>
              <blockquote className="mt-6 border-l-2 border-[#FFB800] pl-5 text-lg font-bold leading-8 text-[#FFF2CD]">“Make the record visible. Keep the path open. Let the work speak.”</blockquote>
              <p className="mt-5 text-sm leading-7 text-[#B8C7D6]">KUN FAYAKŪN × ∞ is presented here as an artistic and spiritual anchor phrase with devotional respect. This page does not gamify worship or make spiritual, legal, commercial, or technical claims on its behalf.</p>
              <div className="mt-7 flex flex-wrap gap-3"><Link href="/spiral-signature" className="rounded-xl bg-[#FFB800] px-4 py-3 text-sm font-black text-[#1B1200]">Open Spiral Signature →</Link><Link href="/ip-readiness" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-4 py-3 text-sm font-black text-[#B98CFF]">Open IP Readiness →</Link></div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[0.05] p-6"><div className="text-xs font-mono tracking-[0.18em] text-[#00D4FF]">PROVENANCE METADATA</div><dl className="mt-5 space-y-3">{provenance.map(([label, value]) => <div key={label} className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:justify-between sm:gap-5"><dt className="text-xs font-mono text-[#8FA3B8]">{label}</dt><dd className="text-right text-sm font-bold text-[#E9F4FF]">{value}</dd></div>)}</dl><p className="mt-5 text-xs leading-6 text-[#9BB0C3]">This record documents a public design concept. It is not proof of a trademark registration, copyright registration, patent, license, title clearance, or exclusivity.</p></div><div className="grid gap-4 sm:grid-cols-2">{commitments.map(([title, text], index) => <article key={title} className="rounded-3xl border p-6" style={{ borderColor: index % 2 ? "rgba(185,140,255,0.35)" : "rgba(0,255,136,0.3)", background: index % 2 ? "rgba(185,140,255,0.06)" : "rgba(0,255,136,0.04)" }}><div className="text-xs font-mono tracking-[0.16em]" style={{ color: index % 2 ? "#B98CFF" : "#00FF88" }}>SEAL PRINCIPLE 0{index + 1}</div><h2 className="mt-3 text-2xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{text}</p></article>)}</div></section>

        <section className="mt-8 rounded-3xl border border-[#00FF88]/30 bg-[#00FF88]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#00FF88]">WHAT COMES NEXT</div><h2 className="mt-3 text-3xl font-black">A concept can become a record before it becomes a release.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Future visual refinements, rights review, filings, licensing, production, NFT work, product use, or public launch require their own verified records and approvals. The next paths below help organize that work without treating this shrine as a clearance or activation action.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/creator-workspace" className="rounded-lg border border-[#00FF88]/45 px-4 py-2 text-sm font-black text-[#00FF88]">Creator Workspace →</Link><Link href="/creator-operations" className="rounded-lg border border-[#00D4FF]/45 px-4 py-2 text-sm font-black text-[#00D4FF]">Creator Operations →</Link><Link href="/protection-protocol" className="rounded-lg border border-[#FFB800]/45 px-4 py-2 text-sm font-black text-[#FFB800]">Protection Protocol →</Link></div></section>
      </section>
    </main>
  );
}
