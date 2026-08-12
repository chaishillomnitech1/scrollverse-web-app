import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const PATHS = [
  { icon: "✦", title: "Create a Signal", body: "Start an original thought, media study, design direction, or research thread in the creator commons.", href: "/think-space", cta: "Open Think Space", color: "#00D4FF" },
  { icon: "⌘", title: "Build a Signature", body: "Turn an independent brand language into a clear origin, palette, material, and story system before any optional fusion.", href: "/fashion-studio", cta: "Open Brand Studio", color: "#FFB800" },
  { icon: "◌", title: "Find a Constellation", body: "Meet the ScrollVerse AI Legion and community surfaces that can help people locate the right next learning or building path.", href: "/ai-legion-apex", cta: "Meet the Legion", color: "#00FF88" },
  { icon: "✧", title: "Enter the Legion Commons", body: "Share an opt-in reflection, learning signal, or build note with transparent human, system, and awaiting-interaction states.", href: "/legion-commons", cta: "Open Legion Commons", color: "#00FF88" },
  { icon: "↗", title: "Move a Signal", body: "Study source-labelled official pathways for film, music, livestream, social publishing, and creator tools without claiming a provider partnership.", href: "/signalworks", cta: "Open Signalworks", color: "#FFB800" },
  { icon: "⌁", title: "Preserve the Work", body: "Use protected source, rights, asset, and archive review paths when an original creation is ready for accountable stewardship.", href: "/fashion-portfolio", cta: "Review the Portfolio", color: "#B98CFF" },
] as const;

const SIGNATURES = [
  { label: "Origin", detail: "Your starting point, chosen context, and creative intention." },
  { label: "Language", detail: "A distinct palette, symbol vocabulary, material direction, and narrative rhythm." },
  { label: "Provenance", detail: "A clear record of what is yours, what is sourced, and what still needs review." },
  { label: "Invitation", detail: "A collaboration can be proposed without erasing independent authorship." },
] as const;

export default function ConvergenceCommons() {
  useSovereignHeartbeat({ page: "convergence-commons" });

  return (
    <main className="min-h-screen text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,212,255,0.2)", background: "radial-gradient(circle at 84% 6%, rgba(0,212,255,0.16), transparent 29%), radial-gradient(circle at 18% 40%, rgba(185,140,255,0.13), transparent 34%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-16">
          <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00D4FF" }}>SCROLLVERSE CONVERGENCE COMMONS · ORIGINAL CONNECTIONS</div>
          <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-9 items-end">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black leading-[0.92] tracking-tight">Create the signal.<br /><span style={{ color: "#00D4FF" }}>Keep the signature.</span></h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "#B8C7D6" }}>A public starting point for creators, designers, thinkers, and builders to discover original ScrollVerse paths. Begin with intent, preserve authorship, and choose a responsible next step before any partnership, asset claim, commerce, or exchange layer.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/journey" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Find Your Journey</Link>
                <Link href="/think-space" className="rounded-xl px-5 py-3 text-sm font-black border" style={{ borderColor: "rgba(255,184,0,0.45)", color: "#FFB800" }}>Enter Think Space</Link>
              </div>
            </div>
            <aside className="rounded-3xl border p-6" style={{ background: "rgba(4,14,30,0.78)", borderColor: "rgba(0,255,136,0.24)" }}>
              <div className="text-[10px] font-mono tracking-widest" style={{ color: "#00FF88" }}>ASSISTIVE GOVERNANCE</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>The Legion can explain paths, surface policies, and route requests. It does not act as a court, bank, exchange, or autonomous legal authority. High-impact decisions stay accountable to documented human review.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="flex flex-wrap justify-between gap-5 items-end"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>CHOOSE A DIRECTION</div><h2 className="mt-2 text-3xl sm:text-4xl font-black">One world. Clear next steps.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#95A6B8" }}>Each route opens an existing ScrollVerse experience. None creates ownership, a partnership, a product listing, a payment obligation, or a financial instrument.</p></div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PATHS.map(path => <article key={path.title} className="rounded-3xl border p-5 flex flex-col" style={{ borderColor: `${path.color}33`, background: "rgba(255,255,255,0.025)" }}><div className="text-2xl" style={{ color: path.color }}>{path.icon}</div><h3 className="mt-5 text-xl font-black">{path.title}</h3><p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "#A6B5C6" }}>{path.body}</p><Link href={path.href} className="mt-6 text-xs font-black" style={{ color: path.color }}>{path.cta} →</Link></article>)}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-9">
          <div><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>PERSONAL SIGNATURE SYSTEM</div><h2 className="mt-3 text-3xl font-black">Personal touches are the architecture.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>An original signature makes room for infinite colorways and evolving looks without needing an outside mark. It gives collaborators something clear to respect rather than something vague to overwrite.</p></div>
          <div className="grid sm:grid-cols-2 gap-4">{SIGNATURES.map((item, index) => <article key={item.label} className="rounded-2xl p-5 border" style={{ borderColor: "rgba(185,140,255,0.2)", background: "rgba(185,140,255,0.04)" }}><div className="text-[10px] font-mono" style={{ color: "#B98CFF" }}>0{index + 1}</div><h3 className="mt-3 font-black">{item.label}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: "#A6B5C6" }}>{item.detail}</p></article>)}</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="rounded-3xl border p-7 sm:p-9" style={{ borderColor: "rgba(255,184,0,0.25)", background: "linear-gradient(130deg, rgba(255,184,0,0.08), rgba(0,212,255,0.045))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>FUTURE EXCHANGE BOUNDARY</div>
          <h2 className="mt-3 text-3xl font-black">Build the world first. Activate exchange only when it is ready.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>Marketplace, payment, banking, token, real-estate, custody, and exchange functions require separate security, identity, consumer-protection, tax, and legal work. This Commons prepares discovery and provenance now without activating those regulated functions.</p>
        </div>
      </section>
    </main>
  );
}
