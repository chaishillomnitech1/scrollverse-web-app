import { Link } from "wouter";
import { useState } from "react";
import { IP_ASSET_KINDS } from "@shared/ipReadiness";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const MARKS = [
  { name: "Aegis Aperture", fallback: "◌", url: "/manus-storage/scrollverse-aegis-aperture-mark_976b0425.png", color: "#FFB800", meaning: "A visible gateway for clear routes, reviewed decisions, and a forward path.", use: "Manus Hero, guides, route maps, and documentation." },
  { name: "Source Thread", fallback: "⋮", url: "/manus-storage/scrollverse-source-thread-mark_63a4fa13.png", color: "#00FF88", meaning: "Context stays attached to the work: origin, author, source, and evidence.", use: "Creator provenance, source notes, and contribution records." },
  { name: "Commons Beacon", fallback: "✦", url: "/manus-storage/scrollverse-commons-beacon-mark_9378d8d9.png", color: "#B98CFF", meaning: "An invitation to participate with transparent activity and consent states.", use: "Legion Commons, collaboration, and onboarding." },
  { name: "Signal Window", fallback: "╱", url: "/manus-storage/scrollverse-signal-window-mark_919a0f43.png", color: "#00D4FF", meaning: "A clear view of creator pathways and optional distribution routes.", use: "Signalworks, release checklists, and media navigation." },
] as const;

function ConceptMark({ mark }: { mark: (typeof MARKS)[number] }) {
  const [unavailable, setUnavailable] = useState(false);
  if (unavailable) return <div aria-label={`${mark.name} first-party fallback concept mark`} className="grid h-32 w-32 place-items-center rounded-full border text-6xl font-thin" style={{ borderColor: `${mark.color}77`, color: mark.color, boxShadow: `0 0 42px ${mark.color}20` }}>{mark.fallback}</div>;
  return <img src={mark.url} alt={`${mark.name} original concept mark`} onError={() => setUnavailable(true)} className="h-32 w-32 object-contain" />;
}

export default function IdentitySystem() {
  useSovereignHeartbeat({ page: "identity-system" });

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(255,184,0,0.2)", background: "radial-gradient(circle at 76% 8%, rgba(255,184,0,0.15), transparent 30%), radial-gradient(circle at 17% 60%, rgba(0,212,255,0.16), transparent 37%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-16">
          <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#FFB800" }}>SCROLLVERSE IDENTITY SYSTEM · CONCEPT MATERIAL</div>
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-black leading-[0.86] tracking-tight sm:text-7xl">Marks that carry<br /><span style={{ color: "#FFB800" }}>meaning in use.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>ScrollVerse identity is being built as a consistent first-party language for clarity, attribution, invitation, and responsible distribution. Every mark has an operational purpose; no concept mark is presented as a registered trademark, provider endorsement, or legal certification.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/manus-hero" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#FFB800", color: "#050B1A" }}>Open Manus Hero</Link><Link href="/creator-workspace" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88" }}>Open Creator Workspace</Link></div>
            </div>
            <aside className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(255,184,0,0.26)", background: "rgba(3,14,31,0.72)" }}>
              <div className="text-[10px] font-mono tracking-widest" style={{ color: "#FFB800" }}>IDENTITY PROMISE</div>
              <p className="mt-4 text-2xl font-black leading-tight">Distinct at a glance. Clear in context. Responsible in release.</p>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>The concept set is deliberately separate from legal rights clearance. Inventory, source records, external clearance, and qualified legal review come before formal registration or commercial rollout.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>THE FIRST MARK FAMILY</div>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">Four roles. One coherent visual grammar.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {MARKS.map(mark => <article key={mark.name} className="overflow-hidden rounded-3xl border" style={{ borderColor: `${mark.color}42`, background: "rgba(255,255,255,0.025)" }}><div className="grid h-48 place-items-center" style={{ background: `radial-gradient(circle, ${mark.color}18, transparent 66%)` }}><ConceptMark mark={mark} /></div><div className="p-5"><div className="text-[10px] font-mono tracking-widest" style={{ color: mark.color }}>ORIGINAL CONCEPT MARK</div><h3 className="mt-3 text-xl font-black">{mark.name}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{mark.meaning}</p><p className="mt-4 border-t pt-4 text-xs leading-relaxed" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#95A6B8" }}><strong style={{ color: mark.color }}>Use:</strong> {mark.use}</p></div></article>)}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}><div className="max-w-7xl mx-auto px-5 py-16"><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>IP READINESS MAP</div><h2 className="mt-3 text-3xl font-black">What the identity package needs to protect.</h2><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{IP_ASSET_KINDS.map(item => <article key={item.kind} className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.22)", background: "rgba(4,14,30,0.5)" }}><div className="text-[10px] font-mono" style={{ color: "#00FF88" }}>{item.kind.replaceAll("_", " ")}</div><h3 className="mt-3 text-lg font-black">{item.label}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{item.purpose}</p></article>)}</div></div></section>

      <section className="max-w-7xl mx-auto grid gap-6 px-5 py-16 lg:grid-cols-2"><article className="rounded-3xl border p-7" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(0,212,255,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOURCE · RECORD · REVIEW</div><h2 className="mt-4 text-3xl font-black">A mark is not proof by itself.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Each proposed name, sigil, visual, and code asset should carry a source note, steward, origin record, and release status before it is treated as a formal business asset.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/creator-workspace" className="text-sm font-black" style={{ color: "#00D4FF" }}>Open provenance workspace →</Link><Link href="/evidence-standards" className="text-sm font-black" style={{ color: "#00FF88" }}>View evidence standards →</Link></div></article><article className="rounded-3xl border p-7" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(185,140,255,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>SYSTEM CONNECTIONS</div><h2 className="mt-4 text-3xl font-black">One identity, many first-party paths.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>The Aegis Scribe uses clarity. Creator Workspace uses source. Legion Commons uses consent. Signalworks uses a visible route. The system stays coherent because each mark is tied to a real behavior.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/legion-commons" className="text-sm font-black" style={{ color: "#B98CFF" }}>Legion Commons →</Link><Link href="/signalworks" className="text-sm font-black" style={{ color: "#FFB800" }}>Signalworks →</Link></div></article></section>
    </main>
  );
}
